import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import FormPractice from "@/components/FormPractice";
import FullMock from "@/components/FullMock";
import Icon from "@/components/Icon";
import PageNav from "@/components/PageNav";
import PracticeRunner, { type PTask } from "@/components/PracticeRunner";
import SpeakButton from "@/components/SpeakButton";
import WritingCoach from "@/components/WritingCoach";
import { clipKey, levelOf, type LevelContent } from "@/content/exam";
import { getSession } from "@/lib/supabase/session";

const SKILLS = ["reading", "listening", "writing", "speaking", "mock", "full"] as const;
const TITLES: Record<string, string> = { reading: "Reading", listening: "Listening", writing: "Writing", speaking: "Speaking", mock: "Mini mock test", full: "Full practice exam" };

export function generateStaticParams() {
  return ["a1", "a2"].flatMap((level) => SKILLS.map((skill) => ({ level, skill })));
}

export default function SkillPage({ params }: PageProps<"/exam/[level]/[skill]">) {
  return (
    <Suspense fallback={<div className="mx-auto mt-6 h-40 w-full max-w-md animate-pulse rounded-3xl bg-white/70 px-4" aria-hidden="true" />}>
      <Inner params={params} />
    </Suspense>
  );
}

const readingTasks = (e: LevelContent): PTask[] => e.reading.map((t) => ({ id: t.id, title: t.title, instruction: t.instruction, texts: t.texts, items: t.items }));
const listeningTasks = (e: LevelContent): PTask[] =>
  e.listening.map((t) => ({ id: t.id, title: t.title, instruction: t.instruction, clips: t.clips.map((c) => ({ key: clipKey(t.id, c.id), label: c.label })), items: t.items }));

async function Inner({ params }: { params: PageProps<"/exam/[level]/[skill]">["params"] }) {
  const { level, skill } = await params;
  const e = levelOf(level);
  if (!e || !(SKILLS as readonly string[]).includes(skill)) notFound();

  const skillIdx = SKILLS.indexOf(skill as (typeof SKILLS)[number]);
  return (
    <main className="mx-auto w-full max-w-md px-4 pt-4 lg:max-w-xl lg:pt-8">
      <Link href={`/exam/${e.level}`} className="inline-flex items-center gap-1 py-2 text-sm font-extrabold text-muted hover:text-ink">
        <Icon name="back" size={18} /> {e.name} exam
      </Link>
      <h1 className="mt-1 text-3xl font-extrabold">{TITLES[skill]}</h1>
      <p className="mb-4 mt-1 text-muted">{e.exam}</p>

      {skill === "reading" && <PracticeRunner tasks={readingTasks(e)} kind="exam" refId={`${e.level}-reading`} />}
      {skill === "listening" && (
        <>
          <p className="mb-4 rounded-2xl bg-butter p-3.5 text-sm text-butter-ink">Press a button to hear a recording. In the real exam you hear most texts twice. Read the answers first.</p>
          <PracticeRunner tasks={listeningTasks(e)} kind="exam" refId={`${e.level}-listening`} />
        </>
      )}
      {skill === "mock" && (
        <>
          <p className="mb-4 rounded-2xl bg-butter p-3.5 text-sm text-butter-ink">
            Reading and listening together, with a timer. Do it without looking at the tips. About 60% would be a pass.
          </p>
          <PracticeRunner tasks={[...readingTasks(e), ...listeningTasks(e)]} minutes={e.level === "a1" ? 40 : 55} kind="mock" refId={`${e.level}-mock`} />
        </>
      )}
      {skill === "full" && (
        <FullMock
          level={e.level}
          name={e.name}
          reading={readingTasks(e)}
          listening={listeningTasks(e)}
          writing={e.writing.tasks.find((t) => t.kind === "email") ?? e.writing.tasks[0]}
          speaking={e.speaking}
          minutes={e.level === "a1" ? { reading: 25, listening: 20, writing: 20 } : { reading: 30, listening: 30, writing: 30 }}
        />
      )}
      {skill === "writing" && (
        <div className="flex flex-col gap-5">
          <Link href="/exam/email-coach" className="rounded-2xl bg-white p-3.5 text-sm font-extrabold text-pri shadow-[0_3px_0_var(--color-line)]">
            Not sure how to start? Open the email coach →
          </Link>
          {e.writing.form && <FormPractice task={e.writing.form} />}
          <Drafts level={e} />
        </div>
      )}
      {skill === "speaking" && (
        <div className="flex flex-col gap-6">
          <p className="rounded-2xl bg-butter p-3.5 text-sm text-butter-ink">
            Try to say each answer yourself first, then open the model answer and listen. Practise with a friend from your study group.
          </p>
          {e.speaking.map((part) => (
            <section key={part.title}>
              <h2 className="text-xl font-extrabold">{part.title}</h2>
              <p className="mt-1 text-sm text-muted">{part.how}</p>
              <div className="mt-3 flex flex-col gap-2.5">
                {part.cards.map((c) => (
                  <details key={c.hint + c.say} className="rounded-2xl bg-white p-3.5 shadow-[0_3px_0_var(--color-line)]">
                    <summary className="cursor-pointer font-extrabold">{c.hint}</summary>
                    <div className="mt-2 flex items-start justify-between gap-2">
                      <p className="leading-relaxed">{c.say}</p>
                      <SpeakButton text={c.say} />
                    </div>
                    {c.reply && (
                      <div className="mt-1 flex items-start justify-between gap-2 rounded-xl bg-pill p-2.5">
                        <p className="leading-relaxed">{c.reply}</p>
                        <SpeakButton text={c.reply} />
                      </div>
                    )}
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
      <PageNav
        back={{ href: skillIdx > 0 ? `/exam/${e.level}/${SKILLS[skillIdx - 1]}` : `/exam/${e.level}`, label: skillIdx > 0 ? TITLES[SKILLS[skillIdx - 1]] : `${e.name} exam` }}
        next={skillIdx < SKILLS.length - 1 ? { href: `/exam/${e.level}/${SKILLS[skillIdx + 1]}`, label: TITLES[SKILLS[skillIdx + 1]] } : { href: "/exam", label: "Exam" }}
      />
    </main>
  );
}

// Writing tasks, each starting from the learner's saved draft
async function Drafts({ level }: { level: LevelContent }) {
  const { supabase, userId } = await getSession();
  const saved = new Map<string, string>();
  if (userId) {
    const { data } = await supabase.from("writing_drafts").select("task_id,body").in("task_id", level.writing.tasks.map((t) => t.id));
    (data ?? []).forEach((r) => saved.set(String(r.task_id), String(r.body)));
  }
  return (
    <>
      {level.writing.tasks.map((t) => (
        <WritingCoach key={t.id} task={t} initial={saved.get(t.id) ?? ""} loggedIn={!!userId} />
      ))}
    </>
  );
}
