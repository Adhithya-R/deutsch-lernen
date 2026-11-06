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

      <form action={action} className="mt-6 space-y-3 rounded-3xl bg-white p-5 shadow-[0_3px_0_var(--color-line)]">
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
        {isLogin && (
          <p className="text-right text-sm"><Link href="/forgot-password" className="font-semibold text-pri underline">Forgot your password?</Link></p>
        )}
        {!isLogin && <p className="text-xs text-muted">By signing up you accept the notes on <Link href="/privacy" className="font-semibold text-pri underline">privacy and the learning material</Link>.</p>}
        {state?.error && <p role="alert" className="text-sm font-medium text-bad">{state.error}</p>}
        <button disabled={pending} className="btn3d">
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
