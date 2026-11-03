import Link from "next/link";
import { Suspense } from "react";
import CaseTable from "@/components/CaseTable";
import { logout } from "@/app/actions";
import { definiteArticles, indefiniteArticles, lessons } from "@/content/lessons";
import { cards } from "@/content/vocab";
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
            <a href={`/lessons/${next.slug}`} className="mt-2 inline-block rounded bg-white px-3 py-1 font-medium text-slate-900">
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

      <Link href="/flashcards" className="block rounded-lg border border-slate-200 p-3">
        <div className="font-semibold">🃏 Vocabulary flashcards</div>
        <div lang="ta" className="text-sm text-slate-700">சொல்லகராதி அட்டைகள் · {cards.length} words</div>
      </Link>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Lessons / பாடங்கள்</h2>
        {lessons.map((l, i) => (
          <Link
            key={l.slug}
            href={`/lessons/${l.slug}`}
            className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-3"
          >
            <div>
              <span className="text-xs font-bold text-slate-500">{l.level} · {i + 1}</span>
              <div className="font-semibold">{l.title.en}</div>
              <div lang="ta" className="text-sm text-slate-700">{l.title.ta}</div>
            </div>
            <span className="text-xl">{done.has(l.slug) ? "✅" : "›"}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
