import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import DataTable from "@/components/DataTable";
import ProgressButton from "@/components/ProgressButton";
import Quiz from "@/components/Quiz";
import { lessons } from "@/content/lessons";
import { createClient } from "@/lib/supabase/server";

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export default async function LessonPage({ params }: PageProps<"/lessons/[slug]">) {
  const { slug } = await params;
  const index = lessons.findIndex((l) => l.slug === slug);
  if (index === -1) notFound();
  const lesson = lessons[index];
  const next = lessons[index + 1];

  return (
    <main className="mx-auto w-full max-w-2xl space-y-6 p-4">
      <Link href="/" className="text-sm underline">← All lessons</Link>

      <header>
        <span className="text-xs font-bold text-slate-500">{lesson.level}</span>
        <h1 className="text-2xl font-bold">{lesson.title.en}</h1>
        <p lang="ta" className="text-lg text-slate-700">{lesson.title.ta}</p>
      </header>

      <section className="space-y-1">
        <p>{lesson.intro.en}</p>
        <p lang="ta" className="text-slate-700">{lesson.intro.ta}</p>
      </section>

      {lesson.tables?.map((t) => <DataTable key={t.title} table={t} />)}

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Examples / எடுத்துக்காட்டுகள்</h2>
        <ul className="space-y-2">
          {lesson.points.map((p) => (
            <li key={p.de} className="rounded bg-slate-50 p-2">
              <div className="font-medium">{p.de}</div>
              <div className="text-sm">{p.en}</div>
              <div lang="ta" className="text-sm">{p.ta}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Practice / பயிற்சி</h2>
        <Quiz exercises={lesson.exercises} />
      </section>

      <Suspense fallback={null}>
        <Progress slug={lesson.slug} />
      </Suspense>

      {next && (
        <Link href={`/lessons/${next.slug}`} className="block rounded-lg bg-slate-900 p-3 text-center text-white">
          Next: {next.title.en} →
        </Link>
      )}
    </main>
  );
}

async function Progress({ slug }: { slug: string }) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return (
      <p className="text-sm">
        <Link href="/login" className="underline">Log in</Link> to save your progress.
      </p>
    );
  }
  const { data } = await supabase.from("lesson_progress").select("status").eq("lesson_slug", slug).maybeSingle();
  return <ProgressButton slug={slug} completed={data?.status === "completed"} />;
}
