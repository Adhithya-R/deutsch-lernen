import Link from "next/link";
import { Suspense } from "react";
import FlashcardReview from "@/components/FlashcardReview";
import { cards } from "@/content/vocab";
import { createClient } from "@/lib/supabase/server";

const NEW_PER_SESSION = 10;
const MAX_SESSION = 30;

export default function FlashcardsPage() {
  return (
    <main className="mx-auto w-full max-w-md space-y-4 p-4">
      <Link href="/" className="text-sm underline">← Home</Link>
      <h1 className="text-2xl font-bold">Vocabulary / சொல்லகராதி</h1>
      <Suspense fallback={<p>Loading…</p>}>
        <Session />
      </Suspense>
    </main>
  );
}

async function Session() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return (
      <p>
        <Link href="/login" className="underline">Log in</Link> to study flashcards and save your progress.
      </p>
    );
  }

  const { data: rows } = await supabase.from("flashcard_state").select("card_id,due_at");
  const states = new Map((rows ?? []).map((r) => [r.card_id as string, new Date(r.due_at as string)]));
  const now = new Date();

  const due = cards
    .filter((c) => states.has(c.id) && states.get(c.id)! <= now)
    .sort((a, b) => states.get(a.id)!.getTime() - states.get(b.id)!.getTime());
  const fresh = cards.filter((c) => !states.has(c.id)).slice(0, NEW_PER_SESSION);
  const queue = [...due, ...fresh].slice(0, MAX_SESSION);

  return (
    <>
      <p className="text-sm text-slate-600">
        {due.length} due · {fresh.length} new · {states.size} / {cards.length} started
      </p>
      <FlashcardReview cards={queue} />
    </>
  );
}
