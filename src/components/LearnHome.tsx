import Link from "next/link";
import DailyGoal from "@/components/DailyGoal";
import LevelCard from "@/components/LevelCard";
import Icon, { type IconName } from "@/components/Icon";
import Skyline from "@/components/Skyline";
import { chapters, upcoming } from "@/content/chapters";
import { SKY_MOOD } from "@/lib/landmarks";

export type LearnData = {
  loggedIn: boolean;
  done: string[]; // chapter slugs passed
  learned: number; // flashcard words started
  words: number; // all flashcard words
  streak: number; // days in a row with activity
  xp: number; // total XP
  byDay?: Record<string, number>; // XP per day (recent days)
};

const X = Array.from({ length: 60 }, (_, i) => [50, 30, 70, 30, 50, 70][i % 6]); // zig-zag position of each stop, in % (60 stops)
const ROW = 152;

type Stop = { title: string; sub: string; state: "done" | "cur" | "lock"; href?: string };

function Chip({ icon, value, label, href }: { icon: IconName; value: string | number; label: string; href?: string }) {
  const body = (
    <>
      <Icon name={icon} size={22} className="shrink-0 text-pri" />
      <div className="min-w-0">
        <b className="block font-display text-xl font-extrabold leading-none">{value}</b>
        <small className="block text-[11.5px] font-semibold leading-tight text-muted">{label}</small>
      </div>
    </>
  );
  const cls = "flex flex-1 items-center gap-2 rounded-2xl bg-white px-3 py-2.5 text-left shadow-[0_3px_0_var(--color-line)]";
  return href
    ? <Link href={href} className={`${cls} transition-transform active:translate-y-0.5`} aria-label={`${value} ${label}. Open streak details.`}>{body}</Link>
    : <div className={cls}>{body}</div>;
}

/** `loading`: progress is still being fetched, so show neutral placeholders instead of the logged-out view. */
export default function LearnHome({ data, loading = false }: { data: LearnData; loading?: boolean }) {
  const done = new Set(data.done);
  const stops: Stop[] = [];
  let currentFound = false;
  let currentChapter: (typeof chapters)[number] | undefined;
  chapters.forEach((c) => {
    if (loading) stops.push({ title: c.title, sub: c.sub, state: "lock" });
    else if (done.has(c.slug)) stops.push({ title: c.title, sub: c.sub, state: "done", href: `/learn/${c.slug}` });
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
      <Skyline ids={["TN002", "DE009"]} mood={currentChapter?.mood ?? SKY_MOOD.learn} height={170} />
      <div className="px-4 pt-4">
        <p className="text-[13px] font-extrabold uppercase tracking-wider text-pri">
          Your journey · Chapter {Math.min(done.size + 1, chapters.length)} of {chapters.length}
        </p>
        <h1 className="text-3xl font-extrabold">{current ? current.title : "Alle Kapitel geschafft!"}</h1>

        {!loading && data.loggedIn && <LevelCard xp={data.xp} />}

        <div className="mt-3.5 flex gap-2">
          <Chip icon="flame" value={loading ? "–" : data.streak} label="day streak" href={loading ? undefined : "/streak"} />
          <Chip icon="star" value={loading ? "–" : data.xp} label="XP" />
          <Chip icon="cards" value={loading ? "–" : `${data.learned}/${data.words}`} label="words learned" />
        </div>

        {data.loggedIn && !loading && <DailyGoal byDay={data.byDay ?? {}} />}

        {current?.href && (
          <section className="learn-next mt-4 rounded-3xl p-4 shadow-[0_4px_0_var(--color-line)]" aria-label="Continue learning">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-pri-dark">Dein nächster Schritt</p>
                <h2 className="mt-1 font-display text-xl font-extrabold leading-tight">Kapitel {Math.min(done.size + 1, chapters.length)} · {current.title}</h2>
                <p className="mt-0.5 text-sm text-muted">{current.sub}</p>
                <p className="mt-1 text-xs text-muted">
                  <span className="en-only">Continue your story</span>
                  <span lang="ta" className="ta-only">உங்கள் கதையைத் தொடருங்கள்</span>
                </p>
              </div>
              <Link href={current.href} className="learn-next-button" aria-label={`Continue chapter ${current.title}`}><Icon name="play" size={22} /></Link>
            </div>
          </section>
        )}

        <section className="mt-5" aria-label="Chapter learning path">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-pri">Dein Lernweg</p>
              <h2 className="font-display text-2xl font-extrabold">Kapitelpfad</h2>
            </div>
            <p className="pb-1 text-xs font-bold text-muted">{done.size} / {chapters.length} geschafft</p>
          </div>
          <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold text-muted" aria-label="Path key">
            <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#2e9b4a]" />Geschafft</span>
            <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-pri" />Jetzt</span>
            <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#cdb89f]" />Gesperrt</span>
          </div>
        <div className={`relative ${loading ? "animate-pulse" : ""}`} aria-busy={loading}>
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 100 ${stops.length * ROW}`} preserveAspectRatio="none" aria-hidden="true">
            <path d={path} fill="none" stroke="var(--tab-band)" strokeWidth="6" strokeLinecap="round" strokeDasharray="1 14" vectorEffect="non-scaling-stroke" />
          </svg>
          {stops.map((s, i) => {
            const node = (
              <>
                {s.state === "cur" && (
                  <span className="absolute -top-[34px] left-1/2 -translate-x-1/2 rounded-xl bg-white px-3 py-0.5 font-display text-xs font-extrabold uppercase tracking-wider text-pri shadow-[0_3px_0_var(--color-line)]">
                    Jetzt
                  </span>
                )}
                <span
                  className={`learn-stop learn-stop--${s.state} grid h-[78px] w-[78px] place-items-center rounded-full border-b-[7px] ${
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
        </section>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <Link href="/grammar" className="flex items-center gap-2.5 rounded-2xl bg-white p-3.5 font-extrabold shadow-[0_3px_0_var(--color-line)]">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-pill text-pri"><Icon name="pencil" size={20} /></span>
            Grammar
          </Link>
          <Link href="/cheatsheets" className="flex items-center gap-2.5 rounded-2xl bg-white p-3.5 font-extrabold shadow-[0_3px_0_var(--color-line)]">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-pill text-pri"><Icon name="table" size={20} /></span>
            Cheat sheets
          </Link>
        </div>

        {!loading && !data.loggedIn && (
          <p className="mt-4 rounded-2xl bg-white p-3.5 text-sm shadow-[0_3px_0_var(--color-line)]">
            <Link href="/signup" className="font-extrabold text-pri underline">Create an account</Link> to save your progress and unlock new chapters.
          </p>
        )}
      </div>
    </main>
  );
}
