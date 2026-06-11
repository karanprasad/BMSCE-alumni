import { NextResponse, type NextRequest } from "next/server";
import { getAlumniProfiles } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const profiles = await getAlumniProfiles({
    q: searchParams.get("q") ?? undefined,
    company: searchParams.get("company") ?? undefined,
    location: searchParams.get("location") ?? undefined,
    industry: searchParams.get("industry") ?? undefined,
    graduationYear: searchParams.get("graduationYear") ?? undefined,
    skills: searchParams.get("skills") ?? undefined
  });

  return NextResponse.json({ data: profiles });
}
