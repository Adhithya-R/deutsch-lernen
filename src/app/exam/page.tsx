import Icon from "@/components/Icon";
import ScreenTop from "@/components/ScreenTop";

export const metadata = { title: "Exam · மொழி-Brücke" };

const ITEMS = [
  { t: "A1 · Start Deutsch 1", d: "Reading, listening, writing and speaking, step by step." },
  { t: "A2 · Goethe-Zertifikat A2", d: "Original mock tests in the same style as the real exam." },
  { t: "Email coach", d: "Learn the order of a good email, with phrases you can reuse." },
];

export default function ExamPage() {
  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <ScreenTop tab="exam" kicker="Goethe-Institut exams" title="Exam" />
      <div className="flex flex-col gap-3 px-4 pt-4">
        <p className="text-muted">Exam practice is being built next. Here is what is coming.</p>
        {ITEMS.map((i) => (
          <div key={i.t} className="flex items-center gap-3 rounded-2xl border-2 border-line bg-white p-4 shadow-[0_3px_0_var(--color-line)]">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-pill text-pri"><Icon name="lock" size={22} /></span>
            <div>
              <p className="font-extrabold">{i.t}</p>
              <p className="text-sm text-muted">{i.d}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
