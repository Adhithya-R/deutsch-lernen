import { notFound } from "next/navigation";
import PageNav from "@/components/PageNav";
import Quiz from "@/components/Quiz";
import ScreenTop from "@/components/ScreenTop";
import SpeakButton from "@/components/SpeakButton";
import { topicById, topics } from "@/content/bruecke";

export function generateStaticParams() {
  return topics.map((t) => ({ topic: t.id }));
}

export default async function TopicPage({ params }: PageProps<"/bruecke/[topic]">) {
  const { topic: id } = await params;
  const topic = topicById(id);
  if (!topic) notFound();
  const n = topics.indexOf(topic);
  const prev = topics[n - 1];
  const next = topics[n + 1];

  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <ScreenTop tab="bruecke" kicker={`Topic ${n + 1} of ${topics.length}`} title={topic.en} ids={topic.sky} mood={topic.mood} height={140} />
      <div className="px-4 pb-6">
        <p lang="ta" className="ta-only mt-1 font-medium text-pri">{topic.ta}</p>
        <p className="mt-1 text-muted">{topic.blurb}</p>

        <nav aria-label="Sections" className="mt-4 flex flex-wrap gap-2">
          {topic.sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-full border-2 border-b-4 border-line bg-white px-3.5 py-1.5 text-sm font-extrabold text-pri-dark">{s.en}</a>
          ))}
        </nav>

        {topic.sections.map((s) => (
          <section key={s.id} id={s.id} className="mt-7 scroll-mt-20">
            <h2 className="text-xl font-extrabold">{s.en} <span lang="ta" className="ta-only text-base font-medium text-muted">· {s.ta}</span></h2>
            <div className="mt-3 overflow-hidden rounded-3xl shadow-[0_3px_0_var(--color-line)]">
              <div className="bg-pill p-4">
                <p className="text-[11.5px] font-extrabold uppercase tracking-wider text-pri-dark">Tamil Nadu</p>
                <ul className="mt-2 space-y-2.5">
                  {s.tn.map((it) => (
                    <li key={it.big}><p className="font-extrabold">{it.big}</p><p className="text-sm text-muted">{it.text}</p></li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-4">
                <p className="text-[11.5px] font-extrabold uppercase tracking-wider text-pri-dark">Germany</p>
                <ul className="mt-2 space-y-2.5">
                  {s.de.map((it) => (
                    <li key={it.big} className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-extrabold">{it.big}</p>
                        <p className="text-sm text-muted">{it.text}</p>
                        {it.ta && <p lang="ta" className="ta-only text-sm">{it.ta}</p>}
                      </div>
                      <SpeakButton text={it.big} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        <section className="mt-8">
          <h2 className="text-xl font-extrabold">Quick quiz</h2>
          <p className="mt-1 text-sm text-muted">Check every question. Your result is saved when you are logged in.</p>
          <div className="mt-3">
            <Quiz exercises={topic.quiz} refId={`bruecke-${topic.id}`} kind="culture" />
          </div>
        </section>

        <PageNav
          back={prev ? { href: `/bruecke/${prev.id}`, label: prev.en } : { href: "/bruecke", label: "All topics" }}
          next={next ? { href: `/bruecke/${next.id}`, label: next.en } : { href: "/bruecke", label: "All topics" }}
        />
      </div>
    </main>
  );
}
