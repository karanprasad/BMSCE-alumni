import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Authentication</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">Join the BMSCE alumni network.</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Sign in with Google or email to access the alumni directory, request mentorship, message members, and RSVP to events.
        </p>
        <div className="mt-6 rounded-3xl bg-blue-50 p-5 text-sm leading-6 text-blue-900">
          Production auth is powered by Supabase Auth with Google OAuth, email verification, and app-level role-based access.
        </div>
      </section>
      <AuthForm />
    </main>
  );
}
