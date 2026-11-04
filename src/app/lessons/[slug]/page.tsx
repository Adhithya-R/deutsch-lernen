import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import DataTable from "@/components/DataTable";
import Icon from "@/components/Icon";
import ProgressButton from "@/components/ProgressButton";
import Quiz from "@/components/Quiz";
import SpeakButton from "@/components/SpeakButton";
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
    <main className="mx-auto w-full max-w-2xl px-4 pt-4 lg:px-8 lg:pt-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted">
        <Link href="/lessons" className="inline-flex items-center gap-1 py-2 hover:text-ink">
          <Icon name="back" size={18} /> Lessons
        </Link>
        <span aria-hidden="true">·</span>
        <span>{lesson.level} · Lesson {index + 1} of {lessons.length}</span>
      </nav>

      <header className="mt-2">
        <h1 className="text-[28px] font-bold leading-tight tracking-tight">{lesson.title.en}</h1>
        <p lang="ta" className="mt-1 text-lg font-medium text-pri">{lesson.title.ta}</p>
      </header>

      <section className="mt-4 space-y-1 text-[16px] leading-relaxed">
        <p>{lesson.intro.en}</p>
        <p lang="ta" className="text-muted">{lesson.intro.ta}</p>
      </section>

      <div className="mt-5 space-y-4">
        {lesson.tables?.map((t) => <DataTable key={t.title} table={t} />)}
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Examples <span lang="ta" className="text-base font-medium text-muted">/ எடுத்துக்காட்டுகள்</span></h2>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {lesson.points.map((p) => (
            <li key={p.de} className="flex items-start justify-between gap-2 rounded-2xl border border-line bg-white p-4">
              <div>
                <p className="font-semibold">{p.de}</p>
                <p className="text-sm text-muted">{p.en}</p>
                <p lang="ta" className="text-sm">{p.ta}</p>
              </div>
              <SpeakButton text={p.de} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Practice <span lang="ta" className="text-base font-medium text-muted">/ பயிற்சி</span></h2>
        <div className="mt-3">
          <Quiz exercises={lesson.exercises} />
        </div>
      </section>

      <div className="mt-8 flex flex-col gap-3">
        <Suspense fallback={null}>
          <Progress slug={lesson.slug} />
        </Suspense>
        {next && (
          <Link
            href={`/lessons/${next.slug}`}
            className="flex items-center justify-between gap-3 rounded-3xl bg-peach p-5 font-semibold text-peach-ink"
          >
            <span>
              <span className="block text-xs font-bold uppercase tracking-wider opacity-80">Next lesson</span>
              {next.title.en}
            </span>
            <Icon name="arrow" size={22} />
          </Link>
        )}
      </div>
    </main>
  );
}

async function Progress({ slug }: { slug: string }) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return (
      <p className="rounded-2xl bg-sand p-4 text-sm text-muted">
        <Link href="/login" className="font-semibold text-pri underline">Log in</Link> to save your progress.
      </p>
    );
  }
  const { data } = await supabase.from("lesson_progress").select("status").eq("lesson_slug", slug).maybeSingle();
  return <ProgressButton slug={slug} completed={data?.status === "completed"} />;
}
