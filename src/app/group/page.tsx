import Link from "next/link";
import { Suspense } from "react";
import Icon from "@/components/Icon";
import ScreenTop from "@/components/ScreenTop";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Study group · மொழி-Brücke" };

const GOAL = 100; // weekly challenge: earn this much XP

export default function GroupPage() {
  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <ScreenTop tab="me" ids={["TN017", "DE017"]} mood="rainbow" kicker="Learn together" title="Study group" />
      <div className="px-4 pt-4">
        <Link href="/me" className="inline-flex items-center gap-1 py-1 text-sm font-extrabold text-muted"><Icon name="back" size={18} /> Me</Link>
        <Suspense fallback={<p className="mt-4 text-muted">Loading…</p>}>
          <Board />
        </Suspense>
      </div>
    </main>
  );
}

type Row = { display_name: string; xp: number; is_me: boolean };

async function Board() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return (
      <p className="mt-4 rounded-2xl bg-white p-4 text-muted shadow-[0_3px_0_var(--color-line)]">
        <Link href="/login" className="font-extrabold text-pri underline">Log in</Link> to see how your study group is doing this week.
      </p>
    );
  }

  const { data, error } = await supabase.rpc("weekly_leaderboard");
  if (error) {
    return (
      <p className="mt-4 rounded-2xl bg-butter p-4 text-sm text-butter-ink" role="alert">
        The leaderboard is not set up yet. Run the group SQL script in Supabase (supabase/migrations/004_group.sql) and reload.
      </p>
    );
  }

  const rows = ((data ?? []) as Row[]).map((r) => ({ ...r, xp: Number(r.xp) }));
  const me = rows.find((r) => r.is_me);
  const mine = me?.xp ?? 0;
  const pct = Math.min(100, Math.round((mine / GOAL) * 100));

  return (
    <>
      <section className="mt-4 rounded-3xl bg-butter p-5 text-butter-ink">
        <p className="text-xs font-extrabold uppercase tracking-wider opacity-80">Weekly challenge</p>
        <h2 className="mt-1 text-2xl font-extrabold">Earn {GOAL} XP this week</h2>
        <div className="mt-3 h-3.5 overflow-hidden rounded-full bg-black/10" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-pri" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-sm font-extrabold">
          {mine >= GOAL ? `Challenge complete! ${mine} XP` : `${mine} / ${GOAL} XP`}
        </p>
        <p className="mt-1 text-sm">Pass chapter checks and review flashcards to earn XP. The week starts on Monday.</p>
      </section>

      <h2 className="mt-6 text-xl font-extrabold">This week&apos;s ranking</h2>
      {rows.length === 0 ? (
        <p className="mt-3 rounded-2xl bg-white p-4 text-muted shadow-[0_3px_0_var(--color-line)]">
          Nobody has earned XP yet this week. Be the first: review some flashcards.
        </p>
      ) : (
        <ol className="mt-3 flex flex-col gap-2">
          {rows.map((r, i) => (
            <li key={`${r.display_name}-${i}`} className={`flex items-center gap-3 rounded-2xl p-3.5 shadow-[0_3px_0_var(--color-line)] ${r.is_me ? "border-2 border-pri bg-pill" : "bg-white"}`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white font-display text-lg font-extrabold text-pri">{i + 1}</span>
              <span className="min-w-0 flex-1 truncate font-extrabold">{r.display_name}{r.is_me ? " (you)" : ""}</span>
              <span className="flex items-center gap-1 font-display text-lg font-extrabold"><Icon name="star" size={16} className="text-pri" /> {r.xp}</span>
            </li>
          ))}
        </ol>
      )}
      <p className="mt-3 text-xs text-muted">Only first names and weekly XP are shared with the group.</p>
    </>
  );
}
