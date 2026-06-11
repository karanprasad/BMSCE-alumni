import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { getCurrentProfile } from "@/lib/data";

const navItems = [
  { href: "/directory", label: "Directory" },
  { href: "/mentorship", label: "Mentorship" },
  { href: "/messages", label: "Messages" },
  { href: "/admin", label: "Admin" }
];

export async function SiteHeader() {
  const [user, profile] = await Promise.all([getCurrentUser(), getCurrentProfile()]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-950">
          <span className="rounded-2xl bg-blue-600 p-2 text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span>BMSCE Alumni</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-blue-700">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/onboarding"
              className="hidden rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 sm:inline-flex"
            >
              {profile ? "Edit profile" : "Complete profile"}
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-4 pb-3 text-sm font-medium text-slate-600 sm:px-6 md:hidden lg:px-8">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
