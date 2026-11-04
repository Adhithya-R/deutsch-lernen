"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, signup } from "@/app/actions";

const input = "h-12 w-full rounded-xl border border-line bg-white px-4 text-[16px] placeholder:text-muted/70";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [state, action, pending] = useActionState(mode === "login" ? login : signup, undefined);
  const isLogin = mode === "login";

  return (
    <main className="mx-auto w-full max-w-sm px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight">{isLogin ? "Welcome back" : "Create your account"}</h1>
      <p lang="ta" className="mt-1 text-muted">{isLogin ? "மீண்டும் வருக" : "புதிய கணக்கு உருவாக்குங்கள்"}</p>

      <form action={action} className="mt-6 space-y-3 rounded-3xl border border-line bg-white p-5">
        {!isLogin && (
          <>
            <label className="block text-sm font-semibold">
              Your name
              <input name="name" autoComplete="name" className={`${input} mt-1 font-normal`} required />
            </label>
            <label className="block text-sm font-semibold">
              Invite code
              <input name="invite" autoComplete="off" className={`${input} mt-1 font-normal`} required />
            </label>
          </>
        )}
        <label className="block text-sm font-semibold">
          Email
          <input name="email" type="email" autoComplete="email" className={`${input} mt-1 font-normal`} required />
        </label>
        <label className="block text-sm font-semibold">
          Password
          <input
            name="password"
            type="password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            minLength={8}
            className={`${input} mt-1 font-normal`}
            required
          />
        </label>
        {state?.error && <p role="alert" className="text-sm font-medium text-bad">{state.error}</p>}
        <button disabled={pending} className="h-12 w-full rounded-full bg-pri font-semibold text-white hover:bg-pri-dark disabled:opacity-50">
          {pending ? "Please wait…" : isLogin ? "Log in" : "Sign up"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        {isLogin ? (
          <>New here? <Link href="/signup" className="font-semibold text-pri underline">Create an account</Link></>
        ) : (
          <>Already have an account? <Link href="/login" className="font-semibold text-pri underline">Log in</Link></>
        )}
      </p>
    </main>
  );
}
