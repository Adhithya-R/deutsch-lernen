import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import Skyline from "@/components/Skyline";
import { chapters, upcoming } from "@/content/chapters";
import { SKY_IDS } from "@/lib/landmarks";

export type LearnData = {
  loggedIn: boolean;
  done: string[]; // chapter slugs passed
  words: number; // flashcards started
  due: number; // flashcards due now
};

const X = [50, 30, 70, 30, 50]; // zig-zag position of each stop, in %
const ROW = 152;

type Stop = { title: string; sub: string; state: "done" | "cur" | "lock"; href?: string };

function Chip({ icon, value, label }: { icon: IconName; value: string | number; label: string }) {
  return (
    <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-[0_3px_0_var(--color-line)]">
      <Icon name={icon} size={22} className="shrink-0 text-pri" />
      <div className="min-w-0">
        <b className="block font-display text-xl font-extrabold leading-none">{value}</b>
        <small className="block text-[11.5px] font-semibold leading-tight text-muted">{label}</small>
      </div>
    </div>
  );
}

export default function LearnHome({ data }: { data: LearnData }) {
  const done = new Set(data.done);
  const total = chapters.length + upcoming.length;
  const stops: Stop[] = [];
  let currentFound = false;
  let currentChapter: (typeof chapters)[number] | undefined;
  chapters.forEach((c) => {
    if (done.has(c.slug)) stops.push({ title: c.title, sub: c.sub, state: "done", href: `/learn/${c.slug}` });
    else if (!currentFound) {
      currentFound = true;
      currentChapter = c;
      stops.push({ title: c.title, sub: c.sub, state: "cur", href: `/learn/${c.slug}` });
    } else stops.push({ title: c.title, sub: c.sub, state: "lock" });
  });
  upcoming.forEach((u) => stops.push({ title: u.title, sub: u.sub, state: "lock" }));

  const current = stops.find((s) => s.state === "cur");
  const path = stops.map((_, i) => `${i ? "L" : "M"}${X[i]} ${i * ROW + 46}`).join(" ");

  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <Skyline ids={currentChapter?.landmarks ?? SKY_IDS.learn} height={170} />
      <div className="px-4 pt-4">
        <p className="text-[13px] font-extrabold uppercase tracking-wider text-pri">
          Priya&apos;s Reise · Chapter {Math.min(done.size + 1, total)} of {total}
        </p>
        <h1 className="text-3xl font-extrabold">{current ? current.title : "Alle Kapitel geschafft!"}</h1>

        <div className="mt-3.5 flex gap-2">
          <Chip icon="book" value={`${done.size}/${total}`} label="chapters" />
          <Chip icon="cards" value={data.words} label="words started" />
          <Chip icon="star" value={data.due} label="cards due" />
        </div>

        {!data.loggedIn && (
          <p className="mt-4 rounded-2xl bg-white p-3.5 text-sm shadow-[0_3px_0_var(--color-line)]">
            <Link href="/signup" className="font-extrabold text-pri underline">Create an account</Link> to save your progress and unlock new chapters.
          </p>
        )}

        <div className="relative mt-5">
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 100 ${stops.length * ROW}`} preserveAspectRatio="none" aria-hidden="true">
            <path d={path} fill="none" stroke="var(--tab-band)" strokeWidth="6" strokeLinecap="round" strokeDasharray="1 14" vectorEffect="non-scaling-stroke" />
          </svg>
          {stops.map((s, i) => {
            const node = (
              <>
                {s.state === "cur" && (
                  <span className="absolute -top-[34px] left-1/2 -translate-x-1/2 rounded-xl bg-white px-3 py-0.5 font-display text-sm font-extrabold text-pri shadow-[0_3px_0_var(--color-line)]">
                    START
                  </span>
                )}
                <span
                  className={`grid h-[78px] w-[78px] place-items-center rounded-full border-b-[7px] ${
                    s.state === "done"
                      ? "border-[#1d6d33] bg-[#2e9b4a] text-white"
                      : s.state === "cur"
                        ? "border-pri-dark bg-pri text-white"
                        : "border-[#cdb89f] bg-[#ead7c1] text-[#9b8570]"
                  }`}
                  style={s.state === "cur" ? { animation: "node-pulse 1.6s ease-out infinite" } : undefined}
                >
                  <Icon name={s.state === "done" ? "check" : s.state === "cur" ? "play" : "lock"} size={s.state === "lock" ? 28 : 34} />
                </span>
                <span className="font-display text-[15.5px] font-bold leading-tight">{s.title}</span>
                <span className="-mt-1 text-[12.5px] leading-tight text-muted">{s.state === "lock" && i >= chapters.length ? `${s.sub} · soon` : s.sub}</span>
              </>
            );
            const cls = "absolute top-2 flex w-[150px] -translate-x-1/2 flex-col items-center gap-1.5 text-center";
            return (
              <div key={s.title} className="relative" style={{ height: ROW }}>
                {s.href ? (
                  <Link href={s.href} className={cls} style={{ left: `${X[i]}%` }} aria-label={`${s.title}: ${s.state === "done" ? "completed, play again" : "start"}`}>{node}</Link>
                ) : (
                  <div className={cls} style={{ left: `${X[i]}%` }} aria-label={`${s.title}: locked`}>{node}</div>
                )}
              </div>
            );
          })}
        </div>

        <Link href="/cheatsheets" className="btn3d btn3d-ghost mb-4 mt-2">Cheat sheets &amp; grammar</Link>
      </div>
    </main>
  );
}
