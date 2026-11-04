import { Suspense } from "react";
import HomeView from "@/components/HomeView";
import { cards } from "@/content/vocab";
import { createClient } from "@/lib/supabase/server";

const NEW_PER_SESSION = 10;

export default function Home() {
  return (
    <Suspense fallback={<HomeView data={{ name: null, done: [], due: 0, fresh: 0, started: 0 }} />}>
      <HomeLoader />
    </Suspense>
  );
}

async function HomeLoader() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return <HomeView data={{ name: null, done: [], due: 0, fresh: 0, started: 0 }} />;

  const [{ data: progress }, { data: profile }, { data: states }] = await Promise.all([
    supabase.from("lesson_progress").select("lesson_slug,status"),
    supabase.from("profiles").select("display_name").maybeSingle(),
    supabase.from("flashcard_state").select("card_id,due_at"),
  ]);

  const now = new Date();
  const known = new Map((states ?? []).map((s) => [s.card_id as string, new Date(s.due_at as string)]));
  const validIds = new Set(cards.map((c) => c.id));
  const started = [...known.keys()].filter((id) => validIds.has(id)).length;
  const due = [...known.entries()].filter(([id, d]) => validIds.has(id) && d <= now).length;

  return (
    <HomeView
      data={{
        name: profile?.display_name ?? "",
        done: (progress ?? []).filter((r) => r.status === "completed").map((r) => r.lesson_slug as string),
        due,
        fresh: Math.min(NEW_PER_SESSION, cards.length - started),
        started,
      }}
    />
  );
}
