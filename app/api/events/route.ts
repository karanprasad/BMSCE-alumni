import { NextResponse, type NextRequest } from "next/server";
import { getEvents } from "@/lib/data";
import { eventSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const events = await getEvents();
  return NextResponse.json({ data: events });
}

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);
  const parsed = eventSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.json({ data: { preview: true } }, { status: 201 });
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("auth_user_id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("events")
    .insert({
      created_by_auth_user_id: user.id,
      title: parsed.data.title,
      description: parsed.data.description,
      starts_at: parsed.data.startsAt,
      ends_at: parsed.data.endsAt,
      location: parsed.data.location,
      virtual_url: parsed.data.virtualUrl,
      capacity: parsed.data.capacity,
      audience: ["student", "alumni"],
      status: "published",
      published_at: new Date().toISOString()
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
