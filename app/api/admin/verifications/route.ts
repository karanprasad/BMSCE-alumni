import { NextResponse, type NextRequest } from "next/server";
import { verificationActionSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const parsed = verificationActionSchema.safeParse({
    profileId: formData.get("profileId"),
    action: formData.get("action")
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.redirect(new URL(`/admin?action=${parsed.data.action}&preview=true`, request.url), {
      status: 303
    });
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { data: adminProfile } = await supabase
    .from("profiles")
    .select("role, verification_status")
    .eq("auth_user_id", user.id)
    .single();

  if (adminProfile?.role !== "admin" || adminProfile.verification_status !== "verified") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const nextStatus = parsed.data.action === "approve" ? "verified" : "rejected";
  const { error } = await supabase
    .from("profiles")
    .update({ verification_status: nextStatus })
    .eq("id", parsed.data.profileId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  await supabase.from("admin_audit_logs").insert({
    admin_auth_user_id: user.id,
    action: `verification_${parsed.data.action}`,
    target_type: "profile",
    target_id: parsed.data.profileId
  });

  return NextResponse.redirect(new URL(`/admin?action=${parsed.data.action}`, request.url), { status: 303 });
}
