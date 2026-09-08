import { NextResponse, type NextRequest } from "next/server";
import { mentorshipStatusSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const parsed = mentorshipStatusSchema.safeParse({
    requestId: formData.get("requestId"),
    status: formData.get("status")
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.redirect(new URL(`/mentorship?status=${parsed.data.status}&preview=true`, request.url), {
      status: 303
    });
  }

  const { error } = await supabase.rpc("respond_to_mentorship_request", {
    request_id: parsed.data.requestId,
    next_status: parsed.data.status
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.redirect(new URL(`/mentorship?status=${parsed.data.status}`, request.url), { status: 303 });
}
