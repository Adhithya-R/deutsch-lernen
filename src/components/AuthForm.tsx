"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, signup } from "@/app/actions";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [state, action, pending] = useActionState(mode === "login" ? login : signup, undefined);
  const input = "w-full rounded border border-slate-300 p-2";

  return (
    <main className="mx-auto w-full max-w-sm space-y-4 p-4">
      <h1 className="text-2xl font-bold">{mode === "login" ? "Log in" : "Create account"}</h1>
      <form action={action} className="space-y-3">
        {mode === "signup" && (
          <>
            <input name="name" placeholder="Your name" className={input} required />
            <input name="invite" placeholder="Invite code" className={input} required />
          </>
        )}
        <input name="email" type="email" placeholder="Email" className={input} required />
        <input name="password" type="password" placeholder="Password" className={input} required minLength={8} />
        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
        <button disabled={pending} className="w-full rounded bg-slate-900 p-2 text-white disabled:opacity-50">
          {pending ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
        </button>
      </form>
      <p className="text-sm">
        {mode === "login" ? (
          <>New here? <Link href="/signup" className="underline">Create an account</Link></>
        ) : (
          <>Already have an account? <Link href="/login" className="underline">Log in</Link></>
        )}
      </p>
    </main>
  );
}
