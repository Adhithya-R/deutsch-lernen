import Icon from "@/components/Icon";
import { MenuRow } from "@/components/Rows";
import { menu } from "@/content/menu";

export const metadata = { title: "Exam preparation · மொழி-Brücke" };

export default function ExamPage() {
  const exam = menu.find((s) => s.id === "pruefung")!;
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-6 lg:px-8 lg:pt-10">
      <h1 className="text-3xl font-bold tracking-tight">Exam preparation</h1>
      <p lang="ta" className="mt-1 text-lg text-muted">தேர்வுக்குத் தயாராதல்</p>

      <div className="mt-5 flex gap-3 rounded-2xl bg-butter p-4 text-butter-ink">
        <Icon name="lock" size={22} className="mt-0.5 shrink-0" />
        <p>
          <b>Being built next.</b> Practice for Goethe A1 (Start Deutsch 1) and A2: formats and tips, an email-writing guide, and original mock tests in the same style as the real exam.
        </p>
      </div>

      {exam.groups.map((g) => (
        <section key={g.heading} className="mt-7">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted">{g.heading}</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {g.items.map((i) => (
              <MenuRow key={i.en} item={i} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
