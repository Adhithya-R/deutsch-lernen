import { Suspense } from "react";
import PageNav from "@/components/PageNav";
import { LessonRow } from "@/components/Rows";
import ScreenTop from "@/components/ScreenTop";
import { lessons } from "@/content/lessons";
import { getSession } from "@/lib/supabase/session";

export const metadata = { title: "Grammar · மொழி-Brücke" };

export default function GrammarPage() {
  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <ScreenTop tab="learn" ids={["TN005", "DE002"]} mood="noon" kicker="Short lessons with practice" title="Grammar" />
      <div className="px-4 pt-3">
        <p className="text-muted">Take the lessons in order. Pass the practice with 60% and the lesson is ticked off.</p>
        <Suspense fallback={<List done={[]} />}>
          <Loaded />
        </Suspense>
        <PageNav back={{ href: "/", label: "Home" }} next={{ href: "/cheatsheets", label: "Cheat sheets" }} />
      </div>
    </main>
  );
}

function List({ done }: { done: string[] }) {
  const d = new Set(done);
  return (
    <>
      {(["A1", "A2"] as const).map((level) => (
        <section key={level}>
          <h2 className="mt-6 text-xl font-extrabold">{level} grammar</h2>
          <div className="mt-3 grid gap-2.5">
            {lessons.filter((l) => l.level === level).map((l, i) => (
              <LessonRow key={l.slug} lesson={l} index={i + 1} done={d.has(l.slug)} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

async function Loaded() {
  const { supabase, userId } = await getSession();
  let done: string[] = [];
  if (userId) {
    const { data } = await supabase.from("lesson_progress").select("lesson_slug,status");
    done = (data ?? []).filter((r) => r.status === "completed").map((r) => String(r.lesson_slug));
  }
  return <List done={done} />;
}
