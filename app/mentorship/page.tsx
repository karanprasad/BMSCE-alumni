import { PageShell } from "@/components/page-shell";
import { StatusPill } from "@/components/status-pill";
import { getAlumniProfiles, getMentorshipRequests } from "@/lib/data";

type MentorshipPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function MentorshipPage({ searchParams }: MentorshipPageProps) {
  const params = await searchParams;
  const selectedMentorId = first(params.mentorId);
  const [requests, mentors] = await Promise.all([
    getMentorshipRequests(),
    getAlumniProfiles({})
  ]);

  return (
    <PageShell
      eyebrow="Mentorship"
      title="Create structured mentorship requests."
      description="Students can request guidance from alumni, while alumni can accept, decline, or complete requests."
    >
      <div className="grid gap-6 lg:grid-cols-[0.4fr_0.6fr]">
        <form action="/api/mentorship" method="post" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">New request</h2>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Mentor
              <select
                name="mentorId"
                defaultValue={selectedMentorId}
                className="h-12 rounded-2xl border border-slate-200 px-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2"
                required
              >
                <option value="">Choose a mentor</option>
                {mentors
                  .filter((mentor) => mentor.open_to_mentorship)
                  .map((mentor) => (
                    <option key={mentor.id} value={mentor.id}>
                      {mentor.full_name} - {mentor.current_company}
                    </option>
                  ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Topic
              <input name="topic" className="h-12 rounded-2xl border border-slate-200 px-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2" required />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Goal
              <textarea name="goal" rows={3} className="rounded-2xl border border-slate-200 p-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2" required />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Message
              <textarea name="message" rows={4} className="rounded-2xl border border-slate-200 p-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2" required />
            </label>
            <button className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              Submit request
            </button>
          </div>
        </form>
        <section className="space-y-4">
          {requests.map((request) => (
            <article key={request.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-950">{request.topic}</h2>
                <StatusPill status={request.status} />
              </div>
              <p className="mt-2 text-sm text-slate-600">{request.goal}</p>
              <p className="mt-4 text-sm text-slate-500">
                {request.student_name} requested mentorship from {request.mentor_name}
              </p>
            </article>
          ))}
        </section>
      </div>
    </PageShell>
  );
}
