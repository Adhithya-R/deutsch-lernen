import Link from "next/link";
import { Suspense } from "react";
import Icon from "@/components/Icon";
import { LessonRow } from "@/components/Rows";
import { lessons } from "@/content/lessons";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Cheat sheets · மொழி-Brücke" };

export default function CheatSheetsPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 pt-4 lg:max-w-xl">
      <Link href="/" className="inline-flex items-center gap-1 py-2 text-sm font-extrabold text-muted">
        <Icon name="back" size={18} /> Learn
      </Link>
      <h1 className="mt-1 text-3xl font-extrabold">Cheat sheets &amp; grammar</h1>
      <p className="mt-1 text-muted">Quick tables to check, and short grammar lessons with practice.</p>

      <Link href="/cheatsheets/cases" className="mt-5 flex items-center gap-3 rounded-2xl border-2 border-line bg-white p-4 font-extrabold shadow-[0_3px_0_var(--color-line)] hover:border-pri">
        <Icon name="table" size={22} className="text-pri" />
        <span className="flex-1">Cases: Nominativ, Akkusativ, Dativ</span>
        <Icon name="chev" size={20} className="text-muted" />
      </Link>

      <h2 className="mt-7 text-xl font-extrabold">Grammar lessons</h2>
      <Suspense fallback={<List done={[]} />}>
        <Loaded />
      </Suspense>
    </main>
  );
}

function List({ done }: { done: string[] }) {
  const d = new Set(done);
  return (
    <div className="mt-3 grid gap-2.5">
      {lessons.map((l, i) => <LessonRow key={l.slug} lesson={l} index={i + 1} done={d.has(l.slug)} />)}
    </div>
  );
}

async function Loaded() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  let done: string[] = [];
  if (auth.user) {
    const { data } = await supabase.from("lesson_progress").select("lesson_slug,status");
    done = (data ?? []).filter((r) => r.status === "completed").map((r) => String(r.lesson_slug));
  }
  return <List done={done} />;
}
