import { Suspense } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { LessonRow } from "@/components/Rows";
import ScreenTop from "@/components/ScreenTop";
import { lessons } from "@/content/lessons";
import { getSession } from "@/lib/supabase/session";

export const metadata = { title: "Grammar · மொழி-Brücke" };

export default function GrammarPage() {
  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <ScreenTop tab="grammar" ids={["TN005", "DE002"]} mood="noon" kicker="Short lessons with practice" title="Grammar" />
      <div className="px-4 pb-6 pt-3">
        <p className="text-muted">Take the lessons in order. Pass the practice with 60% and the lesson is ticked off.</p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <Link href="/bruecke" className="flex min-h-28 flex-col justify-between rounded-2xl border-2 border-line bg-white p-3.5 shadow-[0_3px_0_var(--color-line)] active:translate-y-0.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-pill text-pri"><Icon name="bridge" size={22} /></span>
            <span><b className="block">Brücke</b><small className="text-muted"><span className="en-only">Tamil Nadu and Germany</span><span lang="ta" className="ta-only">தமிழ்நாடும் ஜெர்மனியும்</span></small></span>
          </Link>
          <Link href="/cheatsheets" className="flex min-h-28 flex-col justify-between rounded-2xl border-2 border-line bg-white p-3.5 shadow-[0_3px_0_var(--color-line)] active:translate-y-0.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-pill text-pri"><Icon name="table" size={22} /></span>
            <span><b className="block">Cheat Sheets</b><small className="text-muted"><span className="en-only">Quick grammar references</span><span lang="ta" className="ta-only">விரைவு இலக்கணக் குறிப்புகள்</span></small></span>
          </Link>
        </div>
        <Suspense fallback={<List done={[]} />}>
          <Loaded />
        </Suspense>
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

