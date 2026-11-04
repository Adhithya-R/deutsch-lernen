import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PageNav from "@/components/PageNav";
import Icon, { type IconName } from "@/components/Icon";
import ScreenTop from "@/components/ScreenTop";
import { levelOf } from "@/content/exam";

export function generateStaticParams() {
  return [{ level: "a1" }, { level: "a2" }];
}

export default function LevelPage({ params }: PageProps<"/exam/[level]">) {
  return (
    <Suspense fallback={<div className="mx-auto mt-6 h-40 w-full max-w-md animate-pulse rounded-3xl bg-white/70 px-4" aria-hidden="true" />}>
      <Inner params={params} />
    </Suspense>
  );
}

async function Inner({ params }: { params: PageProps<"/exam/[level]">["params"] }) {
  const { level } = await params;
  const e = levelOf(level);
  if (!e) notFound();

  const sections: { skill: string; title: string; sub: string; icon: IconName }[] = [
    { skill: "reading", title: "Reading", sub: `${e.reading.length} tasks`, icon: "doc" },
    { skill: "listening", title: "Listening", sub: `${e.listening.length} tasks with audio`, icon: "volume" },
    { skill: "writing", title: "Writing", sub: `${e.writing.tasks.length + (e.writing.form ? 1 : 0)} tasks with a coach`, icon: "pencil" },
    { skill: "speaking", title: "Speaking", sub: `${e.speaking.length} parts with model answers`, icon: "users" },
    { skill: "mock", title: "Mini mock test", sub: "Reading and listening, with a timer", icon: "grad" },
  ];

  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <ScreenTop tab="exam" kicker={e.exam} title={`${e.name} exam`} />
      <div className="flex flex-col gap-2.5 px-4 pt-4">
        <Link href="/exam" className="inline-flex w-fit items-center gap-1 py-1 text-sm font-extrabold text-muted"><Icon name="back" size={18} /> Exam</Link>

        {sections.map((s) => (
          <Link key={s.skill} href={`/exam/${e.level}/${s.skill}`} className="flex items-center gap-3 rounded-2xl border-2 border-line bg-white p-4 shadow-[0_3px_0_var(--color-line)] hover:border-pri">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-pill text-pri"><Icon name={s.icon} size={22} /></span>
            <span className="min-w-0 flex-1">
              <span className="block font-extrabold">{s.title}</span>
              <span className="block text-sm text-muted">{s.sub}</span>
            </span>
            <Icon name="chev" size={20} className="text-muted" />
          </Link>
        ))}

        <h2 className="mt-4 text-xl font-extrabold">What the exam looks like</h2>
        <div className="flex flex-col gap-2.5">
          {e.facts.map((f) => (
            <div key={f.skill} className="rounded-2xl bg-white p-3.5 shadow-[0_3px_0_var(--color-line)]">
              <p className="font-extrabold">{f.skill} <span className="font-semibold text-muted">· {f.time}</span></p>
              <p className="text-sm">{f.what}</p>
            </div>
          ))}
          <p className="text-xs text-muted">Times and details are approximate and can change. Check the current official sample test.</p>
        </div>

        <h2 className="mt-4 text-xl font-extrabold">Tips</h2>
        <ul className="flex flex-col gap-2">
          {e.tips.map((t) => (
            <li key={t} className="flex gap-2.5 rounded-2xl bg-white p-3.5 text-[15px] shadow-[0_3px_0_var(--color-line)]">
              <Icon name="checkc" size={20} className="mt-0.5 shrink-0 text-ok" /> {t}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted">Usually about 60% of the points are needed to pass.</p>
        <PageNav back={{ href: "/exam", label: "Exam" }} next={{ href: `/exam/${e.level}/reading`, label: "Reading" }} />
      </div>
    </main>
  );
}
