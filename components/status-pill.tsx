import { cn } from "@/lib/utils";

const variants: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  accepted: "bg-emerald-50 text-emerald-700",
  declined: "bg-rose-50 text-rose-700",
  completed: "bg-blue-50 text-blue-700",
  cancelled: "bg-slate-100 text-slate-700",
  verified: "bg-emerald-50 text-emerald-700",
  rejected: "bg-rose-50 text-rose-700"
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-semibold capitalize", variants[status] ?? "bg-slate-100 text-slate-700")}>
      {status}
    </span>
  );
}
