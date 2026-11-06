import Link from "next/link";
import { Suspense } from "react";
import GoalPicker from "@/components/GoalPicker";
import Icon, { type IconName } from "@/components/Icon";
import PageNav from "@/components/PageNav";
import ScreenTop from "@/components/ScreenTop";
import WeekChart from "@/components/WeekChart";
import { chapters } from "@/content/chapters";
import { lessons } from "@/content/lessons";
import { cards } from "@/content/vocab";
import { streakOf } from "@/lib/activity";
import { levelOf } from "@/lib/level";
import { getSession } from "@/lib/supabase/session";
import { weakTopics, type QuizRow } from "@/lib/weak";

export const metadata = { title: "Your progress · மொழி-Brücke" };

const card = "rounded-3xl bg-white p-4 shadow-[0_3px_0_var(--color-line)]";

export default function ProgressPage() {
  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <ScreenTop tab="learn" ids={["TN001", "DE003"]} mood="sunset" kicker="Your journey" title="Progress" height={130} />
      <div className="px-4 pb-6 pt-3">
        <Suspense fallback={<div className="h-64 animate-pulse rounded-3xl bg-white/70" aria-hidden="true" />}>
          <Content />
        </Suspense>
        <PageNav back={{ href: "/", label: "Home" }} next={{ href: "/flashcards", label: "Words" }} />
      </div>
    </main>
  );
}

function Stat({ icon, value, label }: { icon: IconName; value: string | number; label: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl bg-white p-3.5 shadow-[0_3px_0_var(--color-line)]">
      <Icon name={icon} size={22} className="shrink-0 text-pri" />
      <div className="min-w-0">
        <b className="block font-display text-xl font-extrabold leading-none">{value}</b>
        <small className="block text-[11.5px] font-semibold leading-tight text-muted">{label}</small>
      </div>
    </div>
  );
}

async function Content() {
  const { supabase, userId } = await getSession();
  if (!userId) {
    return (
      <p className={`${card} text-muted`}>
        <Link href="/login" className="font-extrabold text-pri underline">Log in</Link> to see your level, streak and progress.
      </p>
    );
  }

  const [activity, states, lessonRows, quizRows] = await Promise.all([
    supabase.from("daily_activity").select("day,xp"),
    supabase.from("flashcard_state").select("card_id"),
    supabase.from("lesson_progress").select("lesson_slug,status"),
    supabase.from("quiz_results").select("kind,ref,score,total"),
  ]);

  const byDay: Record<string, number> = Object.fromEntries((activity.data ?? []).map((r) => [String(r.day), Number(r.xp)]));
  const xp = Object.values(byDay).reduce((a, b) => a + b, 0);
  const lvl = levelOf(xp);
  const streak = streakOf(Object.keys(byDay).filter((d) => byDay[d] > 0), new Date().toISOString().slice(0, 10));

  const valid = new Set(cards.map((c) => c.id));
  const learned = (states.data ?? []).filter((s) => valid.has(String(s.card_id))).length;
  const done = (lessonRows.data ?? []).filter((r) => r.status === "completed").map((r) => String(r.lesson_slug));
  const chaptersDone = chapters.filter((c) => done.includes(`chapter-${c.slug}`)).length;
  const lessonsDone = lessons.filter((l) => done.includes(l.slug)).length;
  const weak = weakTopics((quizRows.data ?? []) as QuizRow[]);

  return (
    <div className="space-y-4">
      <section className={`${card} flex items-center gap-4`}>
        <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-b-[6px] border-pri-dark bg-pri font-display text-4xl font-extrabold text-white">{lvl.level}</span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-extrabold uppercase tracking-wider text-pri">Your level</p>
          <p className="font-display text-2xl font-extrabold leading-tight">{lvl.title.de} <span className="text-base font-semibold text-muted">· {lvl.title.en}</span></p>
          <div className="mt-2 h-3.5 overflow-hidden rounded-full bg-black/10" role="progressbar" aria-valuenow={lvl.pct} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full rounded-full bg-pri" style={{ width: `${lvl.pct}%` }} />
          </div>
          <p className="mt-1 text-sm text-muted">{lvl.xp} XP · {lvl.toNext} XP to level {lvl.level + 1}</p>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-2.5">
        <Stat icon="flame" value={streak} label="day streak" />
        <Stat icon="star" value={xp} label="total XP" />
        <Stat icon="cards" value={`${learned}/${cards.length}`} label="words learned" />
        <Stat icon="book" value={`${chaptersDone}/${chapters.length}`} label="story chapters" />
        <Stat icon="pencil" value={`${lessonsDone}/${lessons.length}`} label="grammar lessons" />
        <Stat icon="checkc" value={(quizRows.data ?? []).length} label="quizzes done" />
      </div>

      <section className={card}>
        <h2 className="text-lg font-extrabold">Last 7 days</h2>
        <div className="mt-3"><WeekChart byDay={byDay} /></div>
      </section>

      <section className={card}>
        <h2 className="text-lg font-extrabold">Daily goal</h2>
        <p className="mb-3 mt-1 text-sm text-muted">How much XP do you want to earn each day? You can change it any time.</p>
        <GoalPicker />
      </section>

      <section className={card}>
        <h2 className="text-lg font-extrabold">Practise again</h2>
        {weak.length === 0 ? (
          <p className="mt-1 text-sm text-muted">Nothing to repeat right now. Keep going!</p>
        ) : (
          <ul className="mt-2 divide-y divide-line">
            {weak.map((w) => (
              <li key={w.href}>
                <Link href={w.href} className="flex items-center gap-3 py-3">
                  <span className="min-w-0 flex-1 font-extrabold leading-tight">{w.label}</span>
                  <span className="rounded-lg bg-bad-bg px-2 py-0.5 text-sm font-extrabold text-bad">{w.pct}%</span>
                  <Icon name="chev" size={18} className="text-muted" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
