import Link from "next/link";
import Icon from "@/components/Icon";
import PageNav from "@/components/PageNav";
import ScreenTop from "@/components/ScreenTop";
import { speakSets } from "@/content/speaking";

export const metadata = { title: "Speaking practice · மொழி-Brücke" };

export default function SpeakingPage() {
  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <ScreenTop tab="exam" ids={["TN002", "DE001"]} mood="noon" kicker="Say it out loud" title="Speaking practice" />
      <div className="px-4 pb-6 pt-3">
        <p className="text-muted">Listen to a sentence, then say it into the microphone. You see which words were understood. Works best in Chrome or Edge.</p>
        <ul className="mt-4 grid gap-3">
          {speakSets.map((s) => (
            <li key={s.id}>
              <Link href={`/speaking/${s.id}`} className="flex items-center gap-3 rounded-2xl border-2 border-line bg-white p-4 shadow-[0_3px_0_var(--color-line)] active:translate-y-0.5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-pill text-pri"><Icon name="mic" size={22} /></span>
                <span className="min-w-0 flex-1">
                  <span className="block font-extrabold leading-tight">{s.title}</span>
                  <span className="block text-sm text-muted">{s.sub} · {s.items.length} sentences</span>
                </span>
                <Icon name="chev" size={20} className="text-muted" />
              </Link>
            </li>
          ))}
        </ul>
        <PageNav back={{ href: "/exam", label: "Exam" }} next={{ href: "/bruecke", label: "Brücke" }} />
      </div>
    </main>
  );
}
