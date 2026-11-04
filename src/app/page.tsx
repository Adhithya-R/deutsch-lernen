import { Suspense } from "react";
import LearnHome from "@/components/LearnHome";
import { cards } from "@/content/vocab";
import { streakOf } from "@/lib/activity";
import { chapterProgress } from "@/lib/progress";
import { createClient } from "@/lib/supabase/server";

const EMPTY = { loggedIn: false, done: [], words: 0, due: 0, streak: 0, xp: 0 };

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
  const [{ data: states }, activity] = await Promise.all([
    supabase.from("flashcard_state").select("card_id,due_at"),
    // If the activity table has not been created yet this simply returns nothing.
    supabase.from("daily_activity").select("day,xp"),
  ]);

  const valid = new Set(cards.map((c) => c.id));
  const mine = (states ?? []).filter((s) => valid.has(String(s.card_id)));
  const now = new Date();
  const days = (activity.data ?? []).filter((r) => Number(r.xp) > 0).map((r) => String(r.day));

  return (
    <LearnHome
      data={{
        loggedIn: true,
        done: [...done],
        words: mine.length,
        due: mine.filter((s) => new Date(String(s.due_at)) <= now).length,
        streak: streakOf(days, now.toISOString().slice(0, 10)),
        xp: (activity.data ?? []).reduce((sum, r) => sum + Number(r.xp), 0),
      }}
    />
  );
}
