import Link from "next/link";
import { Suspense } from "react";
import FlashcardReview from "@/components/FlashcardReview";
import { cards, decks } from "@/content/vocab";
import { createClient } from "@/lib/supabase/server";

const NEW_PER_SESSION = 10;
const MAX_SESSION = 30;

export default function FlashcardsPage({ searchParams }: PageProps<"/flashcards">) {
  return (
    <main className="mx-auto w-full max-w-md space-y-4 p-4">
      <Link href="/" className="text-sm underline">← Home</Link>
      <Suspense fallback={<p>Loading…</p>}>
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

  const title = (
    <div>
      <h1 className="text-2xl font-bold text-brand-800">{deck ? deck.en : "Vocabulary"}</h1>
      <p lang="ta" className="text-slate-700">{deck ? deck.ta : "சொல்லகராதி"}</p>
      <div className="mt-2 flex flex-wrap gap-1 text-xs">
        <Link href="/flashcards" className={`rounded-full border px-2 py-0.5 ${!deck ? "bg-brand-800 text-cream" : ""}`}>All</Link>
        {decks.map((d) => (
          <Link
            key={d.id}
            href={`/flashcards?deck=${d.id}`}
            className={`rounded-full border px-2 py-0.5 ${deck?.id === d.id ? "bg-brand-800 text-cream" : ""}`}
          >
            {d.en}
          </Link>
        ))}
      </div>
    </div>
  );

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return (
      <>
        {title}
        <p>
          <Link href="/login" className="underline">Log in</Link> to study flashcards and save your progress.
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
      {title}
      <p className="text-sm text-slate-600">
        {due.length} due · {fresh.length} new · {started} / {pool.length} started
      </p>
      <FlashcardReview key={deck?.id ?? "all"} cards={queue} />
    </>
  );
}
