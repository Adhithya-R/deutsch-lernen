import Link from "next/link";
import { Suspense } from "react";
import { PasswordForm } from "@/components/AccountForms";
import { getSession } from "@/lib/supabase/session";

export const metadata = { title: "New password · மொழி-Brücke" };

export default function ResetPasswordPage() {
  return (
    <main className="mx-auto w-full max-w-sm px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Choose a new password</h1>
      <div className="mt-5">
        <Suspense fallback={<div className="h-56 animate-pulse rounded-3xl bg-white/70" aria-hidden="true" />}>
          <Body />
        </Suspense>
      </div>
    </main>
  );
}

async function Body() {
  const { userId } = await getSession();
  if (!userId) {
    return (
      <p className="rounded-2xl bg-butter p-4 text-sm text-butter-ink">
        This link has expired or was opened on another device. <Link href="/forgot-password" className="font-extrabold underline">Request a new link</Link>.
      </p>
    );
  }
  return <PasswordForm reset />;
}
