import Link from "next/link";
import Icon from "@/components/Icon";
import SpeakButton from "@/components/SpeakButton";
import { emailSteps, phrases } from "@/content/exam";

export const metadata = { title: "Email coach · மொழி-Brücke" };

const groups = [...new Set(phrases.map((p) => p.group))];

export default function EmailCoachPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 pt-4 lg:max-w-xl lg:pt-8">
      <Link href="/exam" className="inline-flex items-center gap-1 py-2 text-sm font-extrabold text-muted hover:text-ink">
        <Icon name="back" size={18} /> Exam
      </Link>
      <h1 className="mt-1 text-3xl font-extrabold">Email coach</h1>
      <p className="mt-1 text-muted">Every exam email or message follows the same order. Learn it once, then fill it with the three points of the task.</p>

      <ol className="mt-5 flex flex-col gap-2.5">
        {emailSteps.map((s) => (
          <li key={s.n} className="flex gap-3 rounded-2xl bg-white p-3.5 shadow-[0_3px_0_var(--color-line)]">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-pill font-display text-lg font-extrabold text-pri">{s.n}</span>
            <span>
              <span className="block font-extrabold">{s.t}</span>
              <span className="block text-sm text-muted">{s.d}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-5 rounded-3xl bg-butter p-4 text-butter-ink">
        <p className="font-extrabold">Du or Sie?</p>
        <p className="mt-1 text-sm">Friends and family: du, “Liebe …”, “Viele Grüße”. Teachers, offices, landlords: Sie, “Sehr geehrte/r …”, “Mit freundlichen Grüßen”. Never mix them in one text.</p>
      </div>

      <h2 className="mt-7 text-xl font-extrabold">Phrase bank</h2>
      {groups.map((g) => (
        <section key={g} className="mt-3">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-pri">{g}</h3>
          <ul className="mt-1.5 flex flex-col gap-2">
            {phrases.filter((p) => p.group === g).map((p) => (
              <li key={p.de} className="flex items-start justify-between gap-2 rounded-2xl bg-white p-3.5 shadow-[0_3px_0_var(--color-line)]">
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
      ))}

      <div className="mt-6 flex flex-col gap-3 pb-4">
        <Link href="/exam/a1/writing" className="btn3d">Practise A1 writing</Link>
        <Link href="/exam/a2/writing" className="btn3d btn3d-ghost">Practise A2 writing</Link>
      </div>
    </main>
  );
}
