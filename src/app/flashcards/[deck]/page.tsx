import { notFound } from "next/navigation";
import { Suspense } from "react";
import DeckStudy from "@/components/DeckStudy";
import Skyline from "@/components/Skyline";
import { cards, decks } from "@/content/vocab";
import { getSession } from "@/lib/supabase/session";

export function generateStaticParams() {
  return [...decks.map((d) => ({ deck: d.id })), { deck: "due" }];
}

export default async function DeckPage({ params }: PageProps<"/flashcards/[deck]">) {
  const { deck: slug } = await params;
  const deck = decks.find((d) => d.id === slug);
  if (!deck && slug !== "due") notFound();

  return (
    <main className="mx-auto w-full max-w-md pb-8 lg:max-w-xl">
      {deck && <Skyline ids={deck.sky} mood={deck.mood} height={110} />}
      <div className="px-4 pt-4">
        <Suspense fallback={<p className="rounded-2xl bg-white p-5 text-muted">Getting your words ready…</p>}>
          <Study slug={slug} />
        </Suspense>
      </div>
    </main>
  );
}

async function Study({ slug }: { slug: string }) {
  const { supabase, userId } = await getSession();
  const loggedIn = !!userId;
  if (slug === "due") {
    const { data } = loggedIn ? await supabase.from("flashcard_state").select("card_id,due_at").order("due_at") : { data: [] };
    const valid = new Set(cards.map((c) => c.id));
    const now = new Date().getTime();
    const ids = (data ?? [])
      .filter((r) => valid.has(String(r.card_id)) && new Date(String(r.due_at)).getTime() <= now)
      .map((r) => String(r.card_id))
      .slice(0, 20);
    return <DeckStudy key="due" ids={ids} title="Review" learn={false} loggedIn={loggedIn} back="/flashcards" />;
  }
  const deck = decks.find((d) => d.id === slug)!;
  const ids = cards.filter((c) => c.deck === deck.id).map((c) => c.id);
  return <DeckStudy key={deck.id} ids={ids} title={deck.en} learn loggedIn={loggedIn} back="/flashcards" />;
}
