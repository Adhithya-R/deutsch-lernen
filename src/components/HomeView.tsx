import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { LessonRow } from "@/components/Rows";
import { lessons } from "@/content/lessons";
import { isLive, menu } from "@/content/menu";

export type HomeData = {
  name: string | null; // null means logged out
  done: string[];
  due: number;
  fresh: number;
  started: number;
};

const cheats = menu
  .find((s) => s.id === "spickzettel")!
  .groups.flatMap((g) => g.items)
  .filter(isLive)
  .filter((i, idx, all) => all.findIndex((x) => x.en === i.en) === idx)
  .slice(0, 6);

const pill = "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold";

export default function HomeView({ data }: { data: HomeData }) {
  const done = new Set(data.done);
  const next = lessons.find((l) => !done.has(l.slug));
  const nextIndex = next ? lessons.indexOf(next) + 1 : lessons.length;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pt-6 lg:px-8 lg:pt-10">
      {data.name === null ? (
        <section className="flex flex-col items-center gap-6 rounded-3xl bg-sand p-6 text-center lg:flex-row lg:p-10 lg:text-left">
          <Image src="/logo.webp" alt="மொழி-Brücke logo" width={132} height={132} priority className="rounded-3xl" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Learn German A1 &amp; A2</h1>
            <p lang="ta" className="mt-1 text-lg font-medium text-pri">தமிழிலும் ஆங்கிலத்திலும் ஜெர்மன் கற்போம்</p>
            <p className="mt-3 max-w-xl text-muted">
              Lessons, cheat sheets, flashcards and exam practice, built for our study group. Your progress is saved so you can continue where you left off.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link href="/signup" className={`${pill} bg-pri text-white hover:bg-pri-dark`}>Create account</Link>
              <Link href="/login" className={`${pill} bg-pill text-pri-dark hover:bg-peach`}>Log in</Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          <h1 className="text-3xl font-bold tracking-tight">Guten Tag{data.name ? `, ${data.name}` : ""}</h1>
          <p className="mt-1 text-lg text-muted">Let&apos;s keep your German moving.</p>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <section className="rounded-3xl bg-peach p-5 text-peach-ink lg:p-7">
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">Continue learning</p>
              {next ? (
                <>
                  <h2 className="mt-2 text-2xl font-bold leading-tight">{next.title.en}</h2>
                  <p lang="ta" className="mt-0.5 opacity-90">{next.title.ta}</p>
                  <div className="mt-4 h-2 rounded-full bg-peach-ink/15" role="progressbar" aria-valuenow={done.size} aria-valuemin={0} aria-valuemax={lessons.length}>
                    <div className="h-2 rounded-full bg-pri" style={{ width: `${(done.size / lessons.length) * 100}%` }} />
                  </div>
                  <p className="mt-2 text-sm opacity-90">Lesson {nextIndex} of {lessons.length} · {done.size} completed</p>
                  <Link href={`/lessons/${next.slug}`} className={`${pill} mt-4 w-full bg-pri text-white hover:bg-pri-dark lg:w-auto`}>
                    Continue lesson <Icon name="arrow" size={18} />
                  </Link>
                </>
              ) : (
                <>
                  <h2 className="mt-2 text-2xl font-bold">All lessons completed</h2>
                  <p className="mt-1">Super! More A1 and A2 lessons are coming soon.</p>
                </>
              )}
            </section>

            <section className="flex flex-col rounded-3xl bg-butter p-5 text-butter-ink lg:p-7">
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">Flashcards</p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <p className="text-sm">
                  words due today
                  <br />
                  {data.fresh} new ready · {data.started} started
                </p>
                <p className="text-5xl font-bold leading-none">{data.due}</p>
              </div>
              <Link href="/flashcards" className={`${pill} mt-4 w-full bg-pri text-white hover:bg-pri-dark lg:mt-auto`}>
                Start review
              </Link>
            </section>
          </div>
        </>
      )}

      <section className="mt-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold">Lessons <span lang="ta" className="text-base font-medium text-muted">/ பாடங்கள்</span></h2>
          <Link href="/lessons" className="text-sm font-semibold text-pri">See all</Link>
        </div>
        <div className="mt-3 grid gap-2 lg:grid-cols-2">
          {lessons.slice(0, 4).map((l, i) => (
            <LessonRow key={l.slug} lesson={l} index={i + 1} done={done.has(l.slug)} current={l === next && data.name !== null} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Cheat sheets <span lang="ta" className="text-base font-medium text-muted">/ குறிப்புகள்</span></h2>
        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
          {cheats.map((c) => (
            <Link
              key={c.en}
              href={c.href!}
              className="flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border border-line bg-white px-4 text-sm font-medium hover:border-pri"
            >
              <Icon name="table" size={16} className="text-pri" />
              {c.en}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Exam preparation <span lang="ta" className="text-base font-medium text-muted">/ தேர்வு</span></h2>
        <Link href="/exam" className="mt-3 flex items-center gap-3 rounded-2xl border border-dashed border-line bg-sand p-4 text-muted">
          <Icon name="lock" size={20} />
          <span>
            <b className="text-ink">Start Deutsch 1 and Goethe A2</b>
            <br />
            Email writing guide and mock tests. Coming soon.
          </span>
        </Link>
      </section>
    </main>
  );
}
