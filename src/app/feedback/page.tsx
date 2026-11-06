import Link from "next/link";
import { Suspense } from "react";
import { FeedbackForm } from "@/components/AccountForms";
import { safeNext } from "@/lib/account";
import { getSession } from "@/lib/supabase/session";

export const metadata = { title: "Report a problem · மொழி-Brücke" };

export default function FeedbackPage({ searchParams }: PageProps<"/feedback">) {
  return (
    <main className="mx-auto w-full max-w-md px-4 pb-8 pt-4 lg:max-w-xl lg:pt-8">
      <h1 className="text-3xl font-extrabold">Report a problem</h1>
      <p className="mt-1 text-muted">Found a mistake, a broken page or a word that is wrong? Tell us and we will fix it.</p>
      <Suspense fallback={<div className="mt-5 h-64 animate-pulse rounded-3xl bg-white/70" aria-hidden="true" />}>
        <Body searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function Body({ searchParams }: { searchParams: PageProps<"/feedback">["searchParams"] }) {
  const sp = await searchParams;
  const from = safeNext(typeof sp.from === "string" ? sp.from : "", "");
  const { userId } = await getSession();
  if (!userId) {
    return <p className="mt-5 rounded-2xl bg-white p-4 text-muted shadow-[0_3px_0_var(--color-line)]"><Link href="/login" className="font-extrabold text-pri underline">Log in</Link> to send a report, so we can answer you.</p>;
  }
  return <div className="mt-5"><FeedbackForm page={from} /></div>;
}
