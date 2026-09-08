import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { messageSchema } from "@/lib/schemas";

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
    .from("conversation_summaries")
    .select("*")
    .order("last_message_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const recipientId = formData.get("recipientId") || formData.get("recipientIdVisible");
  const parsed = messageSchema.safeParse({
    recipientId,
    body: formData.get("body")
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.redirect(new URL("/messages?sent=preview", request.url), { status: 303 });
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { error } = await supabase.rpc("create_direct_message", {
    recipient_profile_id: parsed.data.recipientId,
    message_body: parsed.data.body
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.redirect(new URL("/messages?sent=true", request.url), { status: 303 });
}
