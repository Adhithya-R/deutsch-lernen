import Link from "next/link";
import { Suspense } from "react";
import Icon from "@/components/Icon";
import PageNav from "@/components/PageNav";
import ScreenTop from "@/components/ScreenTop";
import { cards, decks } from "@/content/vocab";
import { getSession } from "@/lib/supabase/session";

export const metadata = { title: "Words · மொழி-Brücke" };

type Stat = { started: number; due: number };

export default function FlashcardsPage() {
  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <ScreenTop tab="words" kicker="Flashcards" title="Words" />
      <div className="px-4 pb-6">
        <Suspense fallback={<Decks stats={null} loggedIn={false} dueTotal={0} />}>
          <Loader />
        </Suspense>
        <PageNav back={{ href: "/", label: "Home" }} next={{ href: "/exam", label: "Exam" }} />
      </div>
    </main>
  );
}

async function Loader() {
  const { supabase, userId } = await getSession();
  if (!userId) return <Decks stats={null} loggedIn={false} dueTotal={0} />;
  const { data } = await supabase.from("flashcard_state").select("card_id,due_at");
  const now = new Date().getTime();
  const stats: Record<string, Stat> = {};
  const deckOf = new Map(cards.map((c) => [c.id, c.deck]));
  let dueTotal = 0;
  for (const r of data ?? []) {
    const d = deckOf.get(String(r.card_id));
    if (!d) continue;
    const s = (stats[d] ??= { started: 0, due: 0 });
    s.started++;
    if (new Date(String(r.due_at)).getTime() <= now) {
      s.due++;
      dueTotal++;
    }
  }
  return <Decks stats={stats} loggedIn dueTotal={dueTotal} />;
}

function Decks({ stats, loggedIn, dueTotal }: { stats: Record<string, Stat> | null; loggedIn: boolean; dueTotal: number }) {
  return (
    <>
      {loggedIn ? (
        dueTotal > 0 ? (
          <Link href="/flashcards/due" className="mt-4 flex items-center justify-between rounded-3xl bg-pri p-4 text-white shadow-[0_4px_0_var(--color-pri-dark)]">
            <span>
              <span className="block text-lg font-extrabold">Review {dueTotal} {dueTotal === 1 ? "word" : "words"}</span>
              <span className="text-sm opacity-90">These are ready to be repeated now.</span>
            </span>
            <Icon name="arrow" size={24} />
          </Link>
        ) : (
          <p className="mt-4 rounded-2xl bg-white p-4 text-sm text-muted shadow-[0_3px_0_var(--color-line)]">
            No words to review right now. Learn a new deck below.
          </p>
        )
      ) : (
        <p className="mt-4 rounded-2xl bg-white p-4 text-sm text-muted shadow-[0_3px_0_var(--color-line)]">
          You can try every deck. <Link href="/login" className="font-extrabold text-pri underline">Log in</Link> to save progress and earn XP.
        </p>
      )}

      <h2 className="mt-6 text-xl font-extrabold">Choose a deck</h2>
      <ul className="mt-3 grid grid-cols-2 gap-3">
        {decks.map((d) => {
          const total = cards.filter((c) => c.deck === d.id).length;
          const s = stats?.[d.id];
          const pct = s ? Math.min(100, Math.round((s.started / total) * 100)) : 0;
          return (
            <li key={d.id}>
              <Link href={`/flashcards/${d.id}`} className="flex h-full flex-col justify-between rounded-2xl border-2 border-line bg-white p-3.5 shadow-[0_3px_0_var(--color-line)] active:translate-y-0.5">
                <span>
                  <span className="block font-extrabold leading-tight">{d.en}</span>
                  <span lang="ta" className="ta-only block text-sm text-muted">{d.ta}</span>
                </span>
                <span className="mt-3 block">
                  <span className="block h-2 overflow-hidden rounded-full bg-black/10"><span className="block h-full rounded-full bg-pri" style={{ width: `${pct}%` }} /></span>
                  <span className="mt-1 block text-xs font-bold text-muted">{loggedIn ? `${s?.started ?? 0} / ${total} learned` : `${total} words`}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
