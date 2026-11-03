import CaseTable from "@/components/CaseTable";
import { definiteArticles, indefiniteArticles, lessons } from "@/content/lessons";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl space-y-8 p-4">
      <header>
        <h1 className="text-2xl font-bold">Deutsch A1 / A2</h1>
        <p className="text-slate-600">German for Tamil and English speakers · தமிழ் / English</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Cheat sheet: cases / வேற்றுமை</h2>
        <CaseTable title="Definite articles (der/die/das)" rows={definiteArticles} />
        <CaseTable title="Indefinite articles (ein/eine)" rows={indefiniteArticles} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Lessons</h2>
        {lessons.map((l) => (
          <article key={l.slug} className="rounded-lg border border-slate-200 p-4">
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
          </article>
        ))}
      </section>
    </main>
  );
}
