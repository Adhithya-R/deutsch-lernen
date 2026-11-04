import Link from "next/link";
import PageNav from "@/components/PageNav";
import ScreenTop from "@/components/ScreenTop";
import { topics } from "@/content/bruecke";

export const metadata = { title: "Brücke · மொழி-Brücke" };

export default function BrueckePage() {
  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <ScreenTop tab="bruecke" kicker="Culture bridge" title="Brücke" height={150} />
      <div className="px-4 pb-6 pt-3">
        <p className="text-muted">Pick a topic. See Tamil Nadu and Germany side by side, hear the German words, then take a short quiz.</p>
        <ul className="mt-4 grid gap-3">
          {topics.map((t, n) => (
            <li key={t.id}>
              <Link href={`/bruecke/${t.id}`} className="flex items-center gap-3 rounded-2xl border-2 border-line bg-white p-4 shadow-[0_3px_0_var(--color-line)] active:translate-y-0.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-pill font-display text-lg font-extrabold text-pri-dark">{n + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-extrabold leading-tight">{t.en} <span lang="ta" className="ta-only text-sm font-medium text-muted">· {t.ta}</span></span>
                  <span className="block text-sm text-muted">{t.sections.map((s) => s.en).join(" · ")}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <PageNav back={{ href: "/exam", label: "Exam" }} next={{ href: "/me", label: "Me" }} />
      </div>
    </main>
  );
}
