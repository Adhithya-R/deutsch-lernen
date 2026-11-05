import { Suspense } from "react";
import LearnHome from "@/components/LearnHome";
import { cards } from "@/content/vocab";
import { streakOf } from "@/lib/activity";
import { chapterProgress } from "@/lib/progress";
import { getSession } from "@/lib/supabase/session";

const EMPTY = { loggedIn: false, done: [], learned: 0, words: cards.length, streak: 0, xp: 0 };

export default function Home() {
  return (
    <Suspense fallback={<LearnHome data={EMPTY} loading />}>
      <Loader />
    </Suspense>
  );
}

async function Loader() {
  const { supabase, userId } = await getSession();
  if (!userId) return <LearnHome data={EMPTY} />;

  const [{ done }, { data: states }, activity] = await Promise.all([
    chapterProgress(),
    supabase.from("flashcard_state").select("card_id"),
    supabase.from("daily_activity").select("day,xp"), // returns nothing if the table does not exist yet
  ]);

  const valid = new Set(cards.map((c) => c.id));
  const learned = (states ?? []).filter((s) => valid.has(String(s.card_id))).length;
  const days = (activity.data ?? []).filter((r) => Number(r.xp) > 0).map((r) => String(r.day));

  return (
    <LearnHome
      data={{
        loggedIn: true,
        done: [...done],
        learned,
        words: cards.length,
        streak: streakOf(days, new Date().toISOString().slice(0, 10)),
        byDay: Object.fromEntries((activity.data ?? []).map((r) => [String(r.day), Number(r.xp)])),
        xp: (activity.data ?? []).reduce((sum, r) => sum + Number(r.xp), 0),
      }}
    />
  );
}
