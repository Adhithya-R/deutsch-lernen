import Link from "next/link";
import { Suspense } from "react";
import { ForgotForm } from "@/components/AccountForms";

export const metadata = { title: "Forgot password · மொழி-Brücke" };

export default function ForgotPasswordPage({ searchParams }: PageProps<"/forgot-password">) {
  return (
    <main className="mx-auto w-full max-w-sm px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Forgot your password?</h1>
      <p className="mt-2 text-sm text-muted">Enter your email. We send you a link to choose a new password.</p>
      <div className="mt-5">
        <Suspense fallback={<div className="h-40 animate-pulse rounded-3xl bg-white/70" aria-hidden="true" />}>
          <Form searchParams={searchParams} />
        </Suspense>
      </div>
      <p className="mt-5 text-center text-sm text-muted"><Link href="/login" className="font-semibold text-pri underline">Back to log in</Link></p>
    </main>
  );
}

async function Form({ searchParams }: { searchParams: PageProps<"/forgot-password">["searchParams"] }) {
  const sp = await searchParams;
  return <ForgotForm expired={sp.expired === "1"} />;
}
