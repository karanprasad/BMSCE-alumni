import { NextResponse, type NextRequest } from "next/server";
import { onboardingSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";

function parseSkills(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean)
    .slice(0, 20);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const parsed = onboardingSchema.safeParse({
    fullName: formData.get("fullName"),
    role: formData.get("role"),
    headline: formData.get("headline"),
    bio: formData.get("bio") || undefined,
    department: formData.get("department"),
    graduationYear: formData.get("graduationYear"),
    currentCompany: formData.get("currentCompany") || undefined,
    currentTitle: formData.get("currentTitle") || undefined,
    industry: formData.get("industry") || undefined,
    locationCity: formData.get("locationCity"),
    locationCountry: formData.get("locationCountry"),
    linkedinUrl: formData.get("linkedinUrl") || "",
    openToMentorship: formData.has("openToMentorship"),
    openToReferrals: formData.has("openToReferrals"),
    skills: formData.get("skills") || undefined
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.redirect(new URL("/directory?onboarded=preview", request.url), { status: 303 });
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const verificationStatus = parsed.data.role === "student" ? "verified" : "pending";
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .upsert(
      {
        auth_user_id: user.id,
        full_name: parsed.data.fullName,
        role: parsed.data.role,
        verification_status: verificationStatus,
        headline: parsed.data.headline,
        bio: parsed.data.bio ?? "",
        department: parsed.data.department,
        graduation_year: parsed.data.graduationYear,
        current_company: parsed.data.currentCompany,
        current_title: parsed.data.currentTitle,
        industry: parsed.data.industry,
        location_city: parsed.data.locationCity,
        location_country: parsed.data.locationCountry,
        linkedin_url: parsed.data.linkedinUrl || null,
        open_to_mentorship: parsed.data.openToMentorship,
        open_to_referrals: parsed.data.openToReferrals,
        allow_messages: true
      },
      { onConflict: "auth_user_id" }
    )
    .select("id")
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: profileError?.message ?? "Unable to save profile." }, { status: 400 });
  }

  const skills = parseSkills(parsed.data.skills);
  if (skills.length) {
    const { data: skillRows } = await supabase
      .from("skills")
      .upsert(skills.map((name) => ({ name })), { onConflict: "name" })
      .select("id");

    await supabase.from("profile_skills").delete().eq("profile_id", profile.id);

    if (skillRows?.length) {
      await supabase.from("profile_skills").insert(
        skillRows.map((skill) => ({
          profile_id: profile.id,
          skill_id: skill.id
        }))
      );
    }
  }

  const nextUrl = parsed.data.role === "alumni" ? "/directory?verification=pending" : "/directory?onboarded=true";
  return NextResponse.redirect(new URL(nextUrl, request.url), { status: 303 });
}
