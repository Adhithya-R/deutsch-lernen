import Link from "next/link";
import { Suspense } from "react";
import FlashcardReview from "@/components/FlashcardReview";
import { cards, decks } from "@/content/vocab";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Flashcards · மொழி-Brücke" };

const NEW_PER_SESSION = 10;
const MAX_SESSION = 30;

export default function FlashcardsPage({ searchParams }: PageProps<"/flashcards">) {
  return (
    <main className="mx-auto w-full max-w-md px-4 pt-6 lg:pt-10">
      <Suspense fallback={<p className="text-muted">Loading…</p>}>
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
    `shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium ${on ? "border-pri bg-pill text-pri-dark" : "border-line bg-white"}`;

  const header = (
    <>
      <h1 className="text-3xl font-bold tracking-tight">{deck ? deck.en : "Flashcards"}</h1>
      <p lang="ta" className="mt-1 text-lg text-muted">{deck ? deck.ta : "சொல்லகராதி"}</p>
      <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1">
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
        <p className="mt-5 rounded-2xl bg-sand p-4 text-muted">
          <Link href="/login" className="font-semibold text-pri underline">Log in</Link> to study flashcards and save your progress.
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
      <p className="mt-4 text-sm text-muted">
        {due.length} due · {fresh.length} new · {started} / {pool.length} started
      </p>
      <FlashcardReview key={deck?.id ?? "all"} cards={queue} total={queue.length} />
    </>
  );
}
