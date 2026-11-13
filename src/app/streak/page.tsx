import Link from "next/link";
import { Suspense } from "react";
import Icon from "@/components/Icon";
import StreakWeek from "@/components/StreakWeek";
import { streakOf } from "@/lib/activity";
import { getSession } from "@/lib/supabase/session";

export const metadata = { title: "Lernserie · மொழி-Brücke" };

export default function StreakPage() {
  return (
    <Suspense fallback={<main className="streak-page mx-auto min-h-dvh max-w-md animate-pulse" aria-hidden="true" />}>
      <Content />
    </Suspense>
  );
}

async function Content() {
  const { supabase, userId } = await getSession();
  if (!userId) {
    return (
      <main className="streak-page mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-24 pt-5">
        <Link href="/" className="streak-back" aria-label="Back to Home"><Icon name="back" size={22} /></Link>
        <div className="my-auto text-center">
          <Icon name="flame" size={74} className="mx-auto text-[#ff554e]" />
          <h1 className="mt-4 font-display text-3xl font-extrabold text-white">Deine Lernserie</h1>
          <p className="mt-2 text-sm text-white/70"><span className="en-only">Log in to see your streak and weekly activity.</span><span lang="ta" className="ta-only">உங்கள் கற்றல் தொடரையும் வாரச் செயல்பாட்டையும் காண உள்நுழையுங்கள்.</span></p>
          <Link href="/login" className="btn3d streak-cta mt-6">Anmelden</Link>
        </div>
      </main>
    );
  }

  const { data } = await supabase.from("daily_activity").select("day,xp");
  const byDay = Object.fromEntries((data ?? []).map((r) => [String(r.day), Number(r.xp)]));
  const days = Object.keys(byDay).filter((day) => byDay[day] > 0);
  const streak = streakOf(days, new Date().toISOString().slice(0, 10));

  return (
    <main className="streak-page mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-24 pt-5">
      <div className="flex items-center justify-between">
        <Link href="/" className="streak-back" aria-label="Back to Home"><Icon name="back" size={22} /></Link>
        <Link href="/progress" className="text-sm font-extrabold text-white/65 underline underline-offset-4">Fortschritt</Link>
      </div>

      <section className="streak-count my-7 text-center" aria-label={`${streak} day streak`}>
        <span className="streak-flame"><Icon name="flame" size={76} /></span>
        <p className="mt-5 font-display text-7xl font-extrabold leading-none text-[#ff554e]">{streak}</p>
        <h1 className="mt-1 font-display text-2xl font-extrabold text-white">Tage am Stück</h1>
      </section>

      <StreakWeek byDay={byDay} streak={streak} />

      <div className="mt-auto pt-7">
        <p className="mb-3 text-center text-sm text-white/60"><span className="en-only">A small step every day builds a strong bridge.</span><span lang="ta" className="ta-only">ஒவ்வொரு நாளும் ஒரு சிறிய படி — வலுவான பாலம் கட்டும்.</span></p>
        <Link href="/" className="btn3d streak-cta"><Icon name="arrow" size={20} /> Weiterlernen</Link>
      </div>
    </main>
  );
}
