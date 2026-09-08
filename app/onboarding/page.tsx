import { PageShell } from "@/components/page-shell";
import { getCurrentProfile } from "@/lib/data";

export default async function OnboardingPage() {
  const profile = await getCurrentProfile();

  return (
    <PageShell
      eyebrow="Onboarding"
      title="Complete the minimum profile needed to launch the network."
      description="Keep it lightweight: enough context for students to find alumni and enough verification data for admins to approve members."
    >
      <form action="/api/onboarding" method="post" className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Full name
          <input name="fullName" defaultValue={profile?.full_name} className="h-12 rounded-2xl border border-slate-200 px-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Role
          <select name="role" defaultValue={profile?.role ?? "student"} className="h-12 rounded-2xl border border-slate-200 px-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2">
            <option value="student">Current student</option>
            <option value="alumni">Alumni</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 lg:col-span-2">
          Headline
          <input name="headline" defaultValue={profile?.headline} placeholder="Senior engineer at Google, final-year CSE student, etc." className="h-12 rounded-2xl border border-slate-200 px-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 lg:col-span-2">
          Short bio
          <textarea name="bio" defaultValue={profile?.bio} rows={3} className="rounded-2xl border border-slate-200 p-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Department
          <input name="department" defaultValue={profile?.department} placeholder="Computer Science and Engineering" className="h-12 rounded-2xl border border-slate-200 px-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Graduation year
          <input name="graduationYear" defaultValue={profile?.graduation_year} inputMode="numeric" className="h-12 rounded-2xl border border-slate-200 px-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Current company
          <input name="currentCompany" defaultValue={profile?.current_company ?? ""} className="h-12 rounded-2xl border border-slate-200 px-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Current title
          <input name="currentTitle" defaultValue={profile?.current_title ?? ""} className="h-12 rounded-2xl border border-slate-200 px-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Industry
          <input name="industry" defaultValue={profile?.industry ?? ""} className="h-12 rounded-2xl border border-slate-200 px-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          LinkedIn URL
          <input name="linkedinUrl" defaultValue={profile?.linkedin_url ?? ""} className="h-12 rounded-2xl border border-slate-200 px-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          City
          <input name="locationCity" defaultValue={profile?.location_city ?? "Bengaluru"} className="h-12 rounded-2xl border border-slate-200 px-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Country
          <input name="locationCountry" defaultValue={profile?.location_country ?? "India"} className="h-12 rounded-2xl border border-slate-200 px-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 lg:col-span-2">
          Skills
          <input name="skills" defaultValue={profile?.skills.join(", ")} placeholder="React, Python, System Design" className="h-12 rounded-2xl border border-slate-200 px-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2" />
        </label>
        <div className="space-y-3 lg:col-span-2">
          <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
            <input name="openToMentorship" type="checkbox" defaultChecked={profile?.open_to_mentorship} className="h-4 w-4 rounded border-slate-300" />
            I am open to mentorship requests
          </label>
          <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
            <input name="openToReferrals" type="checkbox" defaultChecked={profile?.open_to_referrals} className="h-4 w-4 rounded border-slate-300" />
            I am open to referral advice
          </label>
        </div>
        <div className="lg:col-span-2">
          <button className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            Save profile
          </button>
        </div>
      </form>
    </PageShell>
  );
}
