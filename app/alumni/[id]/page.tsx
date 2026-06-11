import Link from "next/link";
import { notFound } from "next/navigation";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { StatusPill } from "@/components/status-pill";
import { getProfile } from "@/lib/data";
import { initials } from "@/lib/utils";

type AlumniProfilePageProps = {
  params: Promise<{ id: string }>;
};

export default async function AlumniProfilePage({ params }: AlumniProfilePageProps) {
  const { id } = await params;
  const profile = await getProfile(id);

  if (!profile) {
    notFound();
  }

  return (
    <PageShell eyebrow="Alumni profile" title={profile.full_name} description={profile.headline}>
      <div className="grid gap-6 lg:grid-cols-[0.7fr_0.3fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-100 text-3xl font-bold text-blue-700">
              {initials(profile.full_name)}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                <StatusPill status={profile.verification_status} />
                {profile.open_to_mentorship ? <StatusPill status="accepted" /> : null}
              </div>
              <p className="mt-4 text-slate-600">{profile.bio}</p>
              <div className="mt-6 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                <span className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-blue-600" />
                  {profile.current_title} at {profile.current_company}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  {profile.location_city}, {profile.location_country}
                </span>
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                  {profile.department}, class of {profile.graduation_year}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        <aside className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">Connect</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Send a respectful, specific note. Alumni can manage availability and decline requests.
            </p>
            <div className="mt-5 grid gap-3">
              <Link
                href={`/mentorship?mentorId=${profile.id}`}
                className="rounded-2xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
              >
                Request mentorship
              </Link>
              <p className="rounded-2xl bg-slate-50 p-3 text-sm leading-6 text-slate-600">
                Messaging opens after this alumnus accepts your structured request.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
