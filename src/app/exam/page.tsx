import Link from "next/link";
import Icon from "@/components/Icon";
import PageNav from "@/components/PageNav";
import ScreenTop from "@/components/ScreenTop";
import { exams } from "@/content/exam";

export const metadata = { title: "Exam · மொழி-Brücke" };

const card = "flex items-center gap-3 rounded-2xl border-2 border-line bg-white p-4 shadow-[0_3px_0_var(--color-line)] hover:border-pri";

export default function ExamPage() {
  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <ScreenTop tab="exam" kicker="Goethe-Institut exams" title="Exam" />
      <div className="flex flex-col gap-3 px-4 pt-4">
        <p className="text-muted">Practise reading, listening, writing and speaking, then try a mini mock test.</p>

        {Object.values(exams).map((e) => (
          <Link key={e.level} href={`/exam/${e.level}`} className={card}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-pill font-display text-xl font-extrabold text-pri">{e.name}</span>
            <span className="min-w-0 flex-1">
              <span className="block font-extrabold">{e.exam}</span>
              <span className="block text-sm text-muted">{e.reading.length} reading, {e.listening.length} listening, {e.writing.tasks.length + (e.writing.form ? 1 : 0)} writing tasks</span>
            </span>
            <Icon name="chev" size={20} className="text-muted" />
          </Link>
        ))}

        <Link href="/exam/email-coach" className={card}>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-pill text-pri"><Icon name="pencil" size={24} /></span>
          <span className="min-w-0 flex-1">
            <span className="block font-extrabold">Email coach</span>
            <span className="block text-sm text-muted">The order of a good email, with phrases you can reuse</span>
          </span>
          <Icon name="chev" size={20} className="text-muted" />
        </Link>

        <p className="rounded-2xl bg-white p-3.5 text-sm text-muted shadow-[0_3px_0_var(--color-line)]">
          All practice texts here are written for this app in the style of the exams. For the official format and free sample tests, look for “Modelltest” on the Goethe-Institut website, and ask your teacher.
        </p>
        <PageNav back={{ href: "/flashcards", label: "Words" }} next={{ href: "/bruecke", label: "Brücke" }} />
      </div>
    </main>
  );
}
