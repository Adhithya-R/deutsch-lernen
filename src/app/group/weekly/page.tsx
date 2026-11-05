import { Suspense } from "react";
import ScreenTop from "@/components/ScreenTop";
import WeeklyQuiz from "@/components/WeeklyQuiz";
import { cards } from "@/content/vocab";
import { getSession } from "@/lib/supabase/session";
import { pickForWeek, weekId } from "@/lib/weekly";
import Link from "next/link";

export const metadata = { title: "Weekly quiz · மொழி-Brücke" };

export default function WeeklyPage() {
  return (
    <main className="mx-auto w-full max-w-md pb-8 lg:max-w-xl">
      <ScreenTop tab="me" ids={["TN017", "DE017"]} mood="rainbow" kicker="Whole class, same words" title="Weekly quiz" />
      <div className="px-4 pt-4">
        <Suspense fallback={<div className="h-40 animate-pulse rounded-3xl bg-white/70" aria-hidden="true" />}>
          <Quiz />
        </Suspense>
      </div>
    </main>
  );
}

async function Quiz() {
  const { userId } = await getSession();
  const week = weekId(new Date());
  const ids = pickForWeek(week, cards).map((c) => c.id);
  return (
    <>
      {!userId && (
        <p className="mb-4 rounded-2xl bg-white p-4 text-sm text-muted shadow-[0_3px_0_var(--color-line)]">
          You can play, but <Link href="/login" className="font-extrabold text-pri underline">log in</Link> to save your score and earn XP.
        </p>
      )}
      <WeeklyQuiz key={week} ids={ids} week={week} />
    </>
  );
}
