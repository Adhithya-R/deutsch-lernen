import Link from "next/link";
import { levelOf } from "@/lib/level";

/** The overall level: a badge with the level number, the title and the way to the next level. */
export default function LevelCard({ xp }: { xp: number }) {
  const l = levelOf(xp);
  return (
    <Link href="/progress" className="mt-3.5 flex items-center gap-3.5 rounded-2xl bg-white p-3.5 shadow-[0_3px_0_var(--color-line)] active:translate-y-0.5" aria-label={`Level ${l.level}, ${l.title.en}. ${l.toNext} XP to the next level. Open your progress.`}>
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-b-[5px] border-pri-dark bg-pri font-display text-2xl font-extrabold text-white">{l.level}</span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="font-display text-lg font-extrabold leading-tight">{l.title.de} <span className="text-sm font-semibold text-muted">· {l.title.en}</span></span>
        </span>
        <span className="mt-1.5 block h-3 overflow-hidden rounded-full bg-black/10" role="progressbar" aria-valuenow={l.pct} aria-valuemin={0} aria-valuemax={100}>
          <span className="block h-full rounded-full bg-pri" style={{ width: `${l.pct}%` }} />
        </span>
        <span className="mt-1 block text-xs font-semibold text-muted">{l.toNext} XP to level {l.level + 1}</span>
      </span>
    </Link>
  );
}
