import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { mentorshipRequestSchema } from "@/lib/schemas";

export async function GET() {
  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.json({ data: [] });
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("mentorship_requests")
    .select("*")
    .or(`student_auth_user_id.eq.${user.id},mentor_auth_user_id.eq.${user.id}`)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const parsed = mentorshipRequestSchema.safeParse({
    mentorId: formData.get("mentorId"),
    topic: formData.get("topic"),
    goal: formData.get("goal"),
    message: formData.get("message"),
    preferredMode: formData.get("preferredMode") || undefined
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.redirect(new URL("/mentorship?created=preview", request.url), { status: 303 });
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { data: mentor } = await supabase
    .from("profiles")
    .select("auth_user_id")
    .eq("id", parsed.data.mentorId)
    .eq("open_to_mentorship", true)
    .single();

  if (!mentor?.auth_user_id) {
    return NextResponse.json({ error: "Mentor is not available for mentorship." }, { status: 400 });
  }

  const { error } = await supabase.from("mentorship_requests").insert({
    mentor_id: parsed.data.mentorId,
    mentor_auth_user_id: mentor.auth_user_id,
    student_auth_user_id: user.id,
    topic: parsed.data.topic,
    goal: parsed.data.goal,
    message: parsed.data.message,
    preferred_mode: parsed.data.preferredMode
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.redirect(new URL("/mentorship?created=true", request.url), { status: 303 });
}
