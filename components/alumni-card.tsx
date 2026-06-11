import Link from "next/link";
import { Briefcase, MapPin, MessageCircle } from "lucide-react";
import { initials } from "@/lib/utils";
import type { Profile } from "@/types/domain";

export function AlumniCard({ profile }: { profile: Profile }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-700">
          {initials(profile.full_name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-slate-950">{profile.full_name}</h2>
            {profile.open_to_mentorship ? (
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                Mentor
              </span>
            ) : null}
            {profile.open_to_referrals ? (
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                Referrals
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm font-medium text-slate-700">{profile.headline}</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              {profile.current_company ?? "Company not listed"} - {profile.industry ?? "Industry not listed"}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {profile.location_city}, {profile.location_country} - Class of {profile.graduation_year}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {profile.skills.slice(0, 5).map((skill) => (
          <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <Link href={`/alumni/${profile.id}`} className="text-sm font-semibold text-blue-700 hover:text-blue-900">
          View profile
        </Link>
        <Link
          href={`/messages?recipient=${profile.id}`}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
        >
          <MessageCircle className="h-4 w-4" />
          Message
        </Link>
      </div>
    </article>
  );
}
