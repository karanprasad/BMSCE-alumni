"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { env, hasSupabaseEnv } from "@/lib/env";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const supabaseReady = hasSupabaseEnv();

  async function signInWithGoogle() {
    if (!supabaseReady) {
      setMessage("Add Supabase env vars to enable authentication.");
      return;
    }

    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${env.siteUrl}/auth/callback`
      }
    });
  }

  async function signInWithEmail() {
    if (!supabaseReady) {
      setMessage("Add Supabase env vars to enable authentication.");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(error.message);
      return;
    }

    window.location.href = "/directory";
  }

  async function signUpWithEmail() {
    if (!supabaseReady) {
      setMessage("Add Supabase env vars to enable authentication.");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${env.siteUrl}/auth/callback`
      }
    });

    setMessage(error ? error.message : "Check your email to verify your account.");
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <button
        onClick={signInWithGoogle}
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-300 hover:text-blue-700"
      >
        Continue with Google
      </button>
      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wide text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        or email
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="grid gap-3">
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="you@example.com"
          className="h-12 rounded-2xl border border-slate-200 px-4 outline-none ring-blue-500 transition focus:border-blue-500 focus:ring-2"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="Password"
          className="h-12 rounded-2xl border border-slate-200 px-4 outline-none ring-blue-500 transition focus:border-blue-500 focus:ring-2"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <button onClick={signInWithEmail} className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            Sign in
          </button>
          <button onClick={signUpWithEmail} className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
            Create account
          </button>
        </div>
      </div>
      {message ? <p className="mt-4 rounded-2xl bg-blue-50 p-3 text-sm text-blue-800">{message}</p> : null}
      {!supabaseReady ? (
        <p className="mt-4 text-xs text-slate-500">
          Authentication is disabled in preview mode until Supabase environment variables are configured.
        </p>
      ) : null}
    </div>
  );
}
