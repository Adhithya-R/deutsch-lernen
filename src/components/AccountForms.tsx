"use client";

import Link from "next/link";
import { useActionState } from "react";
import { deleteAccount, requestReset, sendFeedback, updateName, updatePassword } from "@/app/actions";
import Icon from "@/components/Icon";

const input = "h-12 w-full rounded-xl border border-line bg-white px-4 text-[16px] placeholder:text-muted/70";
const label = "block text-sm font-semibold";
const box = "space-y-3 rounded-3xl bg-white p-5 shadow-[0_3px_0_var(--color-line)]";

function Msg({ error, notice }: { error?: string; notice?: string }) {
  if (error) return <p role="alert" className="flex items-start gap-2 text-sm font-bold text-bad"><Icon name="info" size={18} className="mt-0.5 shrink-0" />{error}</p>;
  if (notice) return <p role="status" className="flex items-start gap-2 text-sm font-bold text-ok"><Icon name="checkc" size={18} className="mt-0.5 shrink-0" />{notice}</p>;
  return null;
}

export function ForgotForm({ expired }: { expired?: boolean }) {
  const [state, action, pending] = useActionState(requestReset, undefined);
  return (
    <form action={action} className={box}>
      {expired && <p role="alert" className="rounded-2xl bg-butter p-3 text-sm text-butter-ink">That link has expired or was opened on another device. Please request a new one and open it on the same device.</p>}
      <label className={label}>
        Your email
        <input name="email" type="email" autoComplete="email" className={`${input} mt-1 font-normal`} required />
      </label>
      <Msg {...state} />
      <button disabled={pending} className="btn3d">{pending ? "Sending…" : "Send me a link"}</button>
    </form>
  );
}

export function PasswordForm({ reset = false }: { reset?: boolean }) {
  const [state, action, pending] = useActionState(updatePassword, undefined);
  return (
    <form action={action} className={box}>
      <label className={label}>
        New password
        <input name="password" type="password" autoComplete="new-password" minLength={8} maxLength={72} className={`${input} mt-1 font-normal`} required />
      </label>
      <label className={label}>
        Repeat the new password
        <input name="confirm" type="password" autoComplete="new-password" minLength={8} maxLength={72} className={`${input} mt-1 font-normal`} required />
      </label>
      <p className="text-xs text-muted">At least 8 characters.</p>
      <Msg {...state} />
      <button disabled={pending} className="btn3d">{pending ? "Saving…" : "Save the new password"}</button>
      {reset && state?.notice && <Link href="/" className="btn3d btn3d-ghost">Go to Home</Link>}
    </form>
  );
}

export function NameForm({ name }: { name: string }) {
  const [state, action, pending] = useActionState(updateName, undefined);
  return (
    <form action={action} className={box}>
      <label className={label}>
        Your name (shown in the study group ranking)
        <input name="name" defaultValue={name} maxLength={40} autoComplete="name" className={`${input} mt-1 font-normal`} required />
      </label>
      <Msg {...state} />
      <button disabled={pending} className="btn3d btn3d-ghost">{pending ? "Saving…" : "Save name"}</button>
    </form>
  );
}

export function DeleteForm() {
  const [state, action, pending] = useActionState(deleteAccount, undefined);
  return (
    <form action={action} className={`${box} border-2 border-[#f2b8b5]`}>
      <p className="text-sm">This deletes your account and <b>all</b> your progress, XP, flashcards, quiz results and drafts. It cannot be undone.</p>
      <label className={label}>
        Type DELETE to confirm
        <input name="confirm" autoComplete="off" autoCapitalize="characters" className={`${input} mt-1 font-normal`} required />
      </label>
      <Msg {...state} />
      <button disabled={pending} className="btn3d !border-[#8f2a2a] !bg-bad">{pending ? "Deleting…" : "Delete my account"}</button>
    </form>
  );
}

export function FeedbackForm({ page }: { page: string }) {
  const [state, action, pending] = useActionState(sendFeedback, undefined);
  return (
    <form action={action} className={box}>
      <input type="hidden" name="page" value={page} />
      <label className={label}>
        What went wrong, or what could be better?
        <textarea name="message" rows={6} maxLength={1000} className="mt-1 w-full rounded-xl border border-line bg-white p-3 text-[16px] font-normal" placeholder="For example: the audio in chapter 5 does not play, or a Tamil word is wrong." required />
      </label>
      {page && <p className="text-xs text-muted">Page: {page}</p>}
      <Msg {...state} />
      <button disabled={pending || !!state?.notice} className="btn3d">{pending ? "Sending…" : "Send report"}</button>
    </form>
  );
}
