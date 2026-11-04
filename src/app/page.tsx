import { Suspense } from "react";
import LearnHome from "@/components/LearnHome";
import { cards } from "@/content/vocab";
import { chapterProgress } from "@/lib/progress";
import { createClient } from "@/lib/supabase/server";

const EMPTY = { loggedIn: false, done: [], words: 0, due: 0 };

export default function Home() {
  return (
    <Suspense fallback={<LearnHome data={EMPTY} />}>
      <Loader />
    </Suspense>
  );
}

async function Loader() {
  const { loggedIn, done } = await chapterProgress();
  if (!loggedIn) return <LearnHome data={EMPTY} />;

  const supabase = await createClient();
  const { data: states } = await supabase.from("flashcard_state").select("card_id,due_at");
  const valid = new Set(cards.map((c) => c.id));
  const mine = (states ?? []).filter((s) => valid.has(String(s.card_id)));
  const now = new Date();

  return (
    <LearnHome
      data={{
        loggedIn: true,
        done: [...done],
        words: mine.length,
        due: mine.filter((s) => new Date(String(s.due_at)) <= now).length,
      }}
    />
  );
}
