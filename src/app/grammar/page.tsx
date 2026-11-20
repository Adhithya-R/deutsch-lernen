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
      <ScreenTop tab="grammar" ids={["TN005", "DE002"]} mood="noon" kicker="Step by step · A1 and A2" title="Grammar" />
      <div className="px-4 pb-6 pt-3">
        <Link href="/practice" className="inline-flex items-center gap-1 py-2 text-sm font-extrabold text-muted hover:text-ink">
          <Icon name="back" size={18} /> All practice
        </Link>
        <p className="mt-2 text-muted">Learn each topic from the basics, then practise it. Pass the lesson practice with 60% to mark it complete.</p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <Link href="/bruecke" className="flex min-h-28 flex-col justify-between rounded-2xl border-2 border-line bg-white p-3.5 shadow-[0_3px_0_var(--color-line)] active:translate-y-0.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-pill text-pri"><Icon name="bridge" size={22} /></span>
            <span><b className="block">Brücke</b><small className="text-muted">Tamil Nadu and Germany</small></span>
          </Link>
          <Link href="/cheatsheets" className="flex min-h-28 flex-col justify-between rounded-2xl border-2 border-line bg-white p-3.5 shadow-[0_3px_0_var(--color-line)] active:translate-y-0.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-pill text-pri"><Icon name="table" size={22} /></span>
            <span><b className="block">Cheat Sheets</b><small className="text-muted">Quick grammar references</small></span>
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
  const completed = new Set(done);
  return (
    <>
      {(["A1", "A2"] as const).map((level) => (
        <section key={level}>
          <h2 className="mt-6 text-xl font-extrabold">{level} grammar</h2>
          <div className="mt-3 grid gap-2.5">
            {lessons.filter((lesson) => lesson.level === level).map((lesson, index) => (
              <LessonRow key={lesson.slug} lesson={lesson} index={index + 1} done={completed.has(lesson.slug)} />
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
    done = (data ?? []).filter((row) => row.status === "completed").map((row) => String(row.lesson_slug));
  }
  return <List done={done} />;
}
