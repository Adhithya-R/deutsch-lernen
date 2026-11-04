import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { lessons } from "@/content/lessons";
import { isLive, menu } from "@/content/menu";
import { cards } from "@/content/vocab";
import { createClient } from "@/lib/supabase/server";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="mx-auto w-full max-w-5xl space-y-10 px-4 py-8">
        <Suspense fallback={<Personal done={new Set()} user={null} name="" />}>
          <PersonalLoader />
        </Suspense>
        <Sections />
      </div>
    </main>
  );
}

function Hero() {
  return (
    <section className="bg-gradient-to-b from-brand-800 to-brand-900 text-cream">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-10 text-center md:flex-row md:text-left">
        <Image src="/logo.webp" alt="மொழி-Brücke logo" width={220} height={220} priority className="rounded-2xl shadow-lg" />
        <div className="space-y-3">
          <h1 className="text-3xl font-bold md:text-4xl">
            Learn German A1 &amp; A2
          </h1>
          <p lang="ta" className="text-xl text-gold">தமிழிலும் ஆங்கிலத்திலும் ஜெர்மன் கற்போம்</p>
          <p className="max-w-xl opacity-90">
            Lessons, cheat sheets, vocabulary and exam practice, built by learners for learners. Your progress is saved so you can continue where you left off.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2 md:justify-start">
            <Link href="/lessons/pronouns" className="rounded bg-gold px-5 py-2.5 font-semibold text-brand-950">
              Start A1 →
            </Link>
            <Link href="/flashcards" className="rounded border border-cream/60 px-5 py-2.5 font-semibold">
              🃏 Flashcards
            </Link>
            <Link href="/cheatsheets/cases" className="rounded border border-cream/60 px-5 py-2.5 font-semibold">
              Cheat sheets
            </Link>
          </div>
        </div>
      </div>
      <div className="flex h-1.5">
        <span className="flex-1 bg-black" />
        <span className="flex-1 bg-flag-red" />
        <span className="flex-1 bg-gold" />
      </div>
    </section>
  );
}

async function PersonalLoader() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;
  const done = new Set<string>();
  let name = "";
  if (user) {
    const [{ data: rows }, { data: profile }] = await Promise.all([
      supabase.from("lesson_progress").select("lesson_slug,status"),
      supabase.from("profiles").select("display_name").maybeSingle(),
    ]);
    rows?.forEach((r) => r.status === "completed" && done.add(r.lesson_slug));
    name = profile?.display_name ?? "";
  }
  return <Personal done={done} user={user ? { id: user.id } : null} name={name} />;
}

function Personal({ done, user, name }: { done: Set<string>; user: { id: string } | null; name: string }) {
  const next = lessons.find((l) => !done.has(l.slug));
  return (
    <>
      {user ? (
        <section className="rounded-xl bg-brand-800 p-5 text-cream">
          <p className="text-lg">Hallo{name ? `, ${name}` : ""}! 👋</p>
          {next ? (
            <Link
              href={`/lessons/${next.slug}`}
              className="mt-3 inline-block rounded bg-gold px-4 py-2 font-semibold text-brand-950"
            >
              Continue: {next.title.en} →
            </Link>
          ) : (
            <p className="mt-1">All current lessons completed. Super! More are coming soon.</p>
          )}
        </section>
      ) : (
        <section className="rounded-xl border border-brand-700/30 bg-brand-100 p-4 text-sm">
          <Link href="/signup" className="font-semibold underline">Create an account</Link> to save your progress and continue where you left off.
        </section>
      )}

      <section id="lessons" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-bold text-brand-800">Lessons <span lang="ta" className="text-lg font-normal">/ பாடங்கள்</span></h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {lessons.map((l, i) => (
            <Link
              key={l.slug}
              href={`/lessons/${l.slug}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-brand-700/20 bg-white p-3 shadow-sm hover:border-brand-700"
            >
              <div>
                <span className="text-xs font-bold text-brand-700">{l.level} · {i + 1}</span>
                <div className="font-semibold">{l.title.en}</div>
                <div lang="ta" className="text-sm text-slate-600">{l.title.ta}</div>
              </div>
              <span className="text-xl">{done.has(l.slug) ? "✅" : "›"}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function Sections() {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-bold text-brand-800">Explore <span lang="ta" className="text-lg font-normal">/ ஆராய்க</span></h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {menu.map((s) => {
          const items = s.groups.flatMap((g) => g.items);
          const liveItems = items.filter(isLive);
          const soonCount = items.length - liveItems.length;
          return (
            <div key={s.id} className="rounded-xl border border-brand-700/20 bg-white p-4 shadow-sm">
              <h3 className="text-lg font-bold text-brand-800">{s.de}</h3>
              <p className="text-sm text-slate-600">{s.en} · <span lang="ta">{s.ta}</span></p>
              <ul className="mt-3 space-y-1 text-sm">
                {liveItems.slice(0, 5).map((i) => (
                  <li key={i.en + i.href}>
                    <Link href={i.href!} className="text-brand-700 underline-offset-2 hover:underline">
                      {i.en}
                    </Link>
                  </li>
                ))}
              </ul>
              {soonCount > 0 && (
                <p className="mt-3 text-xs text-slate-500">
                  {liveItems.length === 0 ? "Coming soon" : `+ ${soonCount} more coming soon`} ({soonCount})
                </p>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-xs text-slate-500">{cards.length} flashcard words · {lessons.length} lessons so far</p>
    </section>
  );
}
