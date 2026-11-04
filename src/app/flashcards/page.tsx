import Link from "next/link";
import { Suspense } from "react";
import FlashcardReview from "@/components/FlashcardReview";
import ScreenTop from "@/components/ScreenTop";
import { cards, decks } from "@/content/vocab";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Words · மொழி-Brücke" };

const NEW_PER_SESSION = 10;
const MAX_SESSION = 30;

export default function FlashcardsPage({ searchParams }: PageProps<"/flashcards">) {
  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <Suspense fallback={<ScreenTop tab="words" kicker="Flashcards" title="Words" />}>
        <Session searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function Session({ searchParams }: { searchParams: PageProps<"/flashcards">["searchParams"] }) {
  const sp = await searchParams;
  const deckParam = typeof sp.deck === "string" ? sp.deck : undefined;
  const deck = decks.find((d) => d.id === deckParam);
  const pool = deck ? cards.filter((c) => c.deck === deck.id) : cards;

  const chip = (on: boolean) =>
    `shrink-0 whitespace-nowrap rounded-full border-2 border-b-4 px-4 py-2 text-sm font-extrabold ${on ? "border-pri bg-pill text-pri-dark" : "border-line bg-white text-muted"}`;

  const header = (
    <>
      <ScreenTop tab="words" kicker={deck ? "Deck" : "Flashcards"} title={deck ? deck.en : "Words"} />
      <div className="mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
        <Link href="/flashcards" className={chip(!deck)}>All words</Link>
        {decks.map((d) => (
          <Link key={d.id} href={`/flashcards?deck=${d.id}`} className={chip(deck?.id === d.id)}>{d.en}</Link>
        ))}
      </div>
    </>
  );

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return (
      <>
        {header}
        <p className="mx-4 mt-5 rounded-2xl bg-white p-4 text-muted shadow-[0_3px_0_var(--color-line)]">
          <Link href="/login" className="font-extrabold text-pri underline">Log in</Link> to study flashcards and save your progress.
        </p>
      </>
    );
  }

  const { data: rows } = await supabase.from("flashcard_state").select("card_id,due_at");
  const states = new Map((rows ?? []).map((r) => [r.card_id as string, new Date(r.due_at as string)]));
  const now = new Date();

  const due = pool
    .filter((c) => states.has(c.id) && states.get(c.id)! <= now)
    .sort((a, b) => states.get(a.id)!.getTime() - states.get(b.id)!.getTime());
  const fresh = pool.filter((c) => !states.has(c.id)).slice(0, NEW_PER_SESSION);
  const queue = [...due, ...fresh].slice(0, MAX_SESSION);
  const started = pool.filter((c) => states.has(c.id)).length;

  return (
    <>
      {header}
      <div className="px-4">
        <p className="mt-4 text-sm font-semibold text-muted">
          {due.length} due · {fresh.length} new · {started} / {pool.length} started
        </p>
        <FlashcardReview key={deck?.id ?? "all"} cards={queue} total={queue.length} />
      </div>
    </>
  );
}
