import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import DataTable from "@/components/DataTable";
import Icon from "@/components/Icon";
import PageNav from "@/components/PageNav";
import Quiz from "@/components/Quiz";
import SpeakButton from "@/components/SpeakButton";
import { lessons } from "@/content/lessons";
import { getSession } from "@/lib/supabase/session";

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export default async function LessonPage({ params }: PageProps<"/lessons/[slug]">) {
  const { slug } = await params;
  const lesson = lessons.find((l) => l.slug === slug);
  if (!lesson) notFound();
  const sameLevel = lessons.filter((l) => l.level === lesson.level);
  const index = sameLevel.indexOf(lesson);
  const prev = sameLevel[index - 1];
  const next = sameLevel[index + 1];

  return (
    <main className="mx-auto w-full max-w-md px-4 pt-4 lg:max-w-xl lg:pt-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted">
        <Link href="/grammar" className="inline-flex items-center gap-1 py-2 font-extrabold hover:text-ink">
          <Icon name="back" size={18} /> Grammar
        </Link>
        <span aria-hidden="true">·</span>
        <span>{lesson.level} · Lesson {index + 1} of {sameLevel.length}</span>
      </nav>

      <header className="mt-2">
        <h1 className="text-[28px] font-extrabold leading-tight">{lesson.title.en}</h1>
        <p lang="ta" className="ta-only mt-1 text-lg font-medium text-pri">{lesson.title.ta}</p>
        <Suspense fallback={<div className="mt-3 h-6 w-32 animate-pulse rounded-full bg-white/70" aria-hidden="true" />}>
          <Status slug={lesson.slug} />
        </Suspense>
      </header>

      <section className="mt-4 space-y-1 text-[16px] leading-relaxed">
        <p>{lesson.intro.en}</p>
        <p lang="ta" className="ta-only text-muted">{lesson.intro.ta}</p>
      </section>

      <div className="mt-5 space-y-4">
        {lesson.tables?.map((t) => <DataTable key={t.title} table={t} />)}
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-extrabold">Examples</h2>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {lesson.points.map((p) => (
            <li key={p.de} className="flex items-start justify-between gap-2 rounded-2xl border-2 border-line bg-white p-4 shadow-[0_3px_0_var(--color-line)]">
              <div>
                <p className="font-extrabold">{p.de}</p>
                <p className="text-sm text-muted">{p.en}</p>
                <p lang="ta" className="ta-only text-sm">{p.ta}</p>
              </div>
              <SpeakButton text={p.de} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-extrabold">Practice</h2>
        <p className="mt-1 text-sm text-muted">Answer every question and check it. Score 60% or more to complete the lesson.</p>
        <div className="mt-3">
          <Quiz exercises={lesson.exercises} refId={lesson.slug} />
        </div>
      </section>

      <PageNav
        back={prev ? { href: `/lessons/${prev.slug}`, label: prev.title.en } : { href: "/grammar", label: "Grammar" }}
        next={next ? { href: `/lessons/${next.slug}`, label: next.title.en } : { href: "/cheatsheets", label: "Cheat sheets" }}
      />
    </main>
  );
}

async function Status({ slug }: { slug: string }) {
  const { supabase, userId } = await getSession();
  if (!userId) return null;
  const { data } = await supabase.from("lesson_progress").select("status").eq("lesson_slug", slug).maybeSingle();
  if (data?.status !== "completed") return null;
  return (
    <p className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-ok-bg px-3 py-1 text-sm font-extrabold text-ok">
      <Icon name="checkc" size={18} /> Completed
    </p>
  );
}
