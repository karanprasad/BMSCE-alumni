import type { AdminMetric } from "@/types/domain";

export function StatCard({ metric }: { metric: AdminMetric }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{metric.label}</p>
      <p className="mt-3 text-3xl font-bold text-slate-950">{metric.value}</p>
      <p className="mt-2 text-sm text-slate-500">{metric.helper}</p>
    </div>
  );
}
