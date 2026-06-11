import { ShieldCheck, UserCheck, AlertTriangle, CalendarPlus } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { StatCard } from "@/components/stat-card";
import { getAdminMetrics, getEvents, getMentorshipRequests } from "@/lib/data";

export default async function AdminPage() {
  const [metrics, requests, events] = await Promise.all([
    getAdminMetrics(),
    getMentorshipRequests(),
    getEvents()
  ]);

  return (
    <PageShell
      eyebrow="Admin dashboard"
      title="Operate verification, mentorship, events, and moderation from one place."
      description="The dashboard is designed for role-based access, audit logging, and small-team operational workflows."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard key={metric.label} metric={metric} />
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <UserCheck className="h-6 w-6 text-blue-600" />
          <h2 className="mt-4 text-lg font-semibold text-slate-950">Verification queue</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Review pending student and alumni signups, approve valid BMSCE members, and reject suspicious accounts.
          </p>
          <button className="mt-5 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white">Review queue</button>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <AlertTriangle className="h-6 w-6 text-amber-600" />
          <h2 className="mt-4 text-lg font-semibold text-slate-950">Moderation</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Resolve reported conversations and content. Sensitive admin actions are recorded in audit logs.
          </p>
          <button className="mt-5 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">
            View reports
          </button>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <CalendarPlus className="h-6 w-6 text-emerald-600" />
          <h2 className="mt-4 text-lg font-semibold text-slate-950">Event management</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Create events, publish updates, monitor RSVPs, and trigger reminder emails for attendees.
          </p>
          <button className="mt-5 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">
            Create event
          </button>
        </section>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-950">Recent mentorship activity</h2>
          </div>
          <div className="mt-5 space-y-4">
            {requests.slice(0, 4).map((request) => (
              <div key={request.id} className="rounded-2xl bg-slate-50 p-4">
                <p className="font-medium text-slate-900">{request.topic}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {request.student_name} to {request.mentor_name} - {request.status}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Upcoming events</h2>
          <div className="mt-5 space-y-4">
            {events.slice(0, 4).map((event) => (
              <div key={event.id} className="rounded-2xl bg-slate-50 p-4">
                <p className="font-medium text-slate-900">{event.title}</p>
                <p className="mt-1 text-sm text-slate-500">{event.attendee_count} RSVPs</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
