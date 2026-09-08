import Link from "next/link";
import { ArrowRight, ClipboardCheck, MessageCircle, Search, ShieldCheck, Users } from "lucide-react";
import { getAdminMetrics } from "@/lib/data";
import { StatCard } from "@/components/stat-card";

const features = [
  {
    title: "Verified alumni directory",
    description: "Find alumni by company, location, industry, graduation year, department, and skills.",
    icon: Search
  },
  {
    title: "Mentorship requests",
    description: "Students can send structured requests and alumni can accept, decline, or complete them.",
    icon: Users
  },
  {
    title: "Accepted-request messaging",
    description: "Messaging opens only after an alumnus accepts a structured request, keeping outreach intentional.",
    icon: MessageCircle
  },
  {
    title: "Trust and verification",
    description: "Admins approve alumni, watch moderation queues, and track the request-to-response loop.",
    icon: ClipboardCheck
  }
];

export default async function HomePage() {
  const metrics = await getAdminMetrics();

  return (
    <main>
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#2563eb55,transparent_30%),radial-gradient(circle_at_bottom_left,#14b8a655,transparent_25%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100">
              <ShieldCheck className="h-4 w-4" />
              Trusted BMSCE career community
            </div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
              LinkedIn-style BMSCE alumni search with Lunchclub-style structured mentorship requests.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Launch fast with the smallest useful loop: verified alumni profiles, precise search, respectful requests,
              accepted-request messaging, and admin verification.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/directory"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Explore directory
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Join the network
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {metrics.map((metric) => (
              <StatCard key={metric.label} metric={metric} />
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <feature.icon className="h-6 w-6 text-blue-600" />
              <h2 className="mt-4 text-lg font-semibold text-slate-950">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
