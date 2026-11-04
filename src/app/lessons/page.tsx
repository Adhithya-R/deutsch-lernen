import { Suspense } from "react";
import { LessonRow, MenuRow } from "@/components/Rows";
import { lessons } from "@/content/lessons";
import { isLive, menu } from "@/content/menu";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Lessons · மொழி-Brücke" };

const upcoming = menu[0].groups.flatMap((g) => g.items.map((i) => ({ ...i, level: g.heading }))).filter((i) => !isLive(i));

export default function LessonsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-6 lg:px-8 lg:pt-10">
      <h1 className="text-3xl font-bold tracking-tight">Lessons</h1>
      <p lang="ta" className="mt-1 text-lg text-muted">பாடங்கள்</p>

      <h2 className="mt-6 text-sm font-bold uppercase tracking-wider text-pri">A1 · available now</h2>
      <Suspense fallback={<List done={[]} />}>
        <Loaded />
      </Suspense>

      <h2 className="mt-8 text-sm font-bold uppercase tracking-wider text-muted">Coming soon</h2>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {upcoming.map((i) => (
          <MenuRow key={i.level + i.en} item={{ ...i, en: `${i.level} · ${i.en}` }} />
        ))}
      </div>
    </main>
  );
}

function List({ done }: { done: string[] }) {
  const d = new Set(done);
  const next = lessons.find((l) => !d.has(l.slug));
  return (
    <div className="mt-3 grid gap-2">
      {lessons.map((l, i) => (
        <LessonRow key={l.slug} lesson={l} index={i + 1} done={d.has(l.slug)} current={l === next && done.length > 0} />
      ))}
    </div>
  );
}

async function Loaded() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  let done: string[] = [];
  if (auth.user) {
    const { data } = await supabase.from("lesson_progress").select("lesson_slug,status");
    done = (data ?? []).filter((r) => r.status === "completed").map((r) => r.lesson_slug as string);
  }
  return <List done={done} />;
}
