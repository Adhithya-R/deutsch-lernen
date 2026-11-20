import { Suspense } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { LessonRow } from "@/components/Rows";
import ScreenTop from "@/components/ScreenTop";
import { lessons } from "@/content/lessons";
import { getSession } from "@/lib/supabase/session";

export const metadata = { title: "Practice · மொழி-Brücke" };

const areas = [
  {
    title: "Grammar",
    description: "Learn each topic from the basics, then practise it.",
    icon: "pencil" as const,
    links: [{ label: "Open lessons", href: "#grammar-lessons" }],
  },
  {
    title: "Writing",
    description: "Practise forms and short messages for the Goethe exam.",
    icon: "doc" as const,
    links: [{ label: "A1 writing", href: "/exam/a1/writing" }, { label: "A2 writing", href: "/exam/a2/writing" }],
  },
  {
    title: "Listening",
    description: "Hear everyday German and answer at your level.",
    icon: "volume" as const,
    links: [{ label: "A1 listening", href: "/exam/a1/listening" }, { label: "A2 listening", href: "/exam/a2/listening" }],
  },
  {
    title: "Speaking",
    description: "Say German sentences aloud or practise a conversation.",
    icon: "mic" as const,
    links: [{ label: "Speak aloud", href: "/speaking" }, { label: "Conversation", href: "/conversation" }],
  },
  {
    title: "Cheat Sheets",
    description: "Quick references for cases, articles, verbs and more.",
    icon: "table" as const,
    links: [{ label: "Browse cheat sheets", href: "/cheatsheets" }],
  },
  {
    title: "Brücke",
    description: "Explore Tamil Nadu and Germany side by side.",
    icon: "bridge" as const,
    links: [{ label: "Explore culture", href: "/bruecke" }],
  },
];

export default function GrammarPage() {
  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <ScreenTop tab="grammar" ids={["TN005", "DE002"]} mood="noon" kicker="Learn · write · listen · speak" title="Practice" />
      <div className="px-4 pb-6 pt-3">
        <p className="text-muted">Choose a skill to practise, or work through the grammar lessons step by step.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {areas.map((area) => (
            <section key={area.title} id={area.title === "Grammar" ? "grammar-area" : undefined} className="flex min-h-36 flex-col rounded-2xl border-2 border-line bg-white p-3.5 shadow-[0_3px_0_var(--color-line)]">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-pill text-pri"><Icon name={area.icon} size={22} /></span>
              <h2 className="mt-3 font-extrabold">{area.title}</h2>
              <p className="mt-1 flex-1 text-sm text-muted">{area.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {area.links.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-xl bg-pill px-3 py-2 text-sm font-extrabold text-pri hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pri">
                    {item.label}
                  </Link>
                ))}
              </div>
            </section>
          ))}
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
        <section key={level} id={level === "A1" ? "grammar-lessons" : undefined}>
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

