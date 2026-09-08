import { AlertTriangle, ShieldCheck, UserCheck } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { StatCard } from "@/components/stat-card";
import { StatusPill } from "@/components/status-pill";
import { getAdminMetrics, getMentorshipRequests, getPendingProfiles, getReports } from "@/lib/data";

export default async function AdminPage() {
  const [metrics, requests, pendingProfiles, reports] = await Promise.all([
    getAdminMetrics(),
    getMentorshipRequests(),
    getPendingProfiles(),
    getReports()
  ]);

  return (
    <PageShell
      eyebrow="Admin dashboard"
      title="Operate the launch loop: verify alumni, monitor requests, and handle trust issues."
      description="The MVP admin surface is intentionally small: verification, moderation, and request-response health."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard key={metric.label} metric={metric} />
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <UserCheck className="h-6 w-6 text-blue-600" />
          <h2 className="mt-4 text-lg font-semibold text-slate-950">Verification queue</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Approve valid alumni so students can trust search results. Keep the directory verified by default.
          </p>
          <div className="mt-5 space-y-4">
            {pendingProfiles.map((profile) => (
              <div key={profile.id} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-950">{profile.full_name}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {profile.headline} - {profile.department}, {profile.graduation_year}
                    </p>
                  </div>
                  <StatusPill status={profile.verification_status} />
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <form action="/api/admin/verifications" method="post">
                    <input type="hidden" name="profileId" value={profile.id} />
                    <input type="hidden" name="action" value="approve" />
                    <button className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                      Approve
                    </button>
                  </form>
                  <form action="/api/admin/verifications" method="post">
                    <input type="hidden" name="profileId" value={profile.id} />
                    <input type="hidden" name="action" value="reject" />
                    <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
                      Reject
                    </button>
                  </form>
                </div>
              </div>
            ))}
            {pendingProfiles.length === 0 ? <p className="text-sm text-slate-500">No pending profiles.</p> : null}
          </div>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <AlertTriangle className="h-6 w-6 text-amber-600" />
          <h2 className="mt-4 text-lg font-semibold text-slate-950">Moderation queue</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Resolve reported conversations and content. Sensitive admin actions are recorded in audit logs.
          </p>
          <div className="mt-5 space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-950">{report.reason}</p>
                  <StatusPill status={report.status} />
                </div>
                <p className="mt-1 text-sm text-slate-500">Target: {report.target_type}</p>
              </div>
            ))}
            {reports.length === 0 ? <p className="text-sm text-slate-500">No open reports.</p> : null}
          </div>
        </section>
      </div>
      <div className="mt-8 grid gap-6">
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
      </div>
    </PageShell>
  );
}
