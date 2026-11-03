import Link from "next/link";
import { Suspense } from "react";
import CaseTable from "@/components/CaseTable";
import ProgressButton from "@/components/ProgressButton";
import { logout } from "@/app/actions";
import { definiteArticles, indefiniteArticles, lessons } from "@/content/lessons";
import { createClient } from "@/lib/supabase/server";

export default function Home() {
  return (
    <Suspense fallback={<p className="p-4">Loading…</p>}>
      <HomeContent />
    </Suspense>
  );
}

async function HomeContent() {
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
  const next = lessons.find((l) => !done.has(l.slug));

  return (
    <main className="mx-auto w-full max-w-2xl space-y-8 p-4">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Deutsch A1 / A2</h1>
          <p className="text-slate-600">German for Tamil and English speakers · தமிழ் / English</p>
        </div>
        {user ? (
          <form action={logout}>
            <button className="text-sm underline">Log out</button>
          </form>
        ) : (
          <Link href="/login" className="text-sm underline">Log in</Link>
        )}
      </header>

      {user ? (
        <section className="rounded-lg bg-slate-900 p-4 text-white">
          <p>Hallo{name ? `, ${name}` : ""}! 👋</p>
          {next ? (
            <a href={`#${next.slug}`} className="mt-2 inline-block rounded bg-white px-3 py-1 font-medium text-slate-900">
              Continue: {next.title.en}
            </a>
          ) : (
            <p className="mt-1">All lessons completed. Super!</p>
          )}
        </section>
      ) : (
        <section className="rounded-lg border border-slate-200 p-4 text-sm">
          <Link href="/signup" className="underline">Create an account</Link> to save your progress and continue where you left off.
        </section>
      )}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Cheat sheet: cases / வேற்றுமை</h2>
        <CaseTable title="Definite articles (der/die/das)" rows={definiteArticles} />
        <CaseTable title="Indefinite articles (ein/eine)" rows={indefiniteArticles} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Lessons</h2>
        {lessons.map((l) => (
          <article id={l.slug} key={l.slug} className="rounded-lg border border-slate-200 p-4">
            <span className="text-xs font-bold text-slate-500">{l.level}</span>
            <h3 className="font-semibold">{l.title.en}</h3>
            <p lang="ta" className="text-slate-700">{l.title.ta}</p>
            <p className="mt-2">{l.intro.en}</p>
            <p lang="ta" className="text-slate-700">{l.intro.ta}</p>
            <ul className="mt-3 space-y-2">
              {l.points.map((p) => (
                <li key={p.de} className="rounded bg-slate-50 p-2">
                  <div className="font-medium">{p.de}</div>
                  <div className="text-sm">{p.en}</div>
                  <div lang="ta" className="text-sm">{p.ta}</div>
                </li>
              ))}
            </ul>
            {user && <ProgressButton slug={l.slug} completed={done.has(l.slug)} />}
          </article>
        ))}
      </section>
    </main>
  );
}
