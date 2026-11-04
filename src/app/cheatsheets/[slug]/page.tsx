import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import DataTable from "@/components/DataTable";
import PageNav from "@/components/PageNav";
import { sheets } from "@/content/cheatsheets";
import { lessons } from "@/content/lessons";

export function generateStaticParams() {
  return sheets.map((s) => ({ slug: s.slug }));
}

export default function SheetPage({ params }: PageProps<"/cheatsheets/[slug]">) {
  return (
    <Suspense fallback={null}>
      <Inner params={params} />
    </Suspense>
  );
}

async function Inner({ params }: { params: PageProps<"/cheatsheets/[slug]">["params"] }) {
  const { slug } = await params;
  const index = sheets.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();
  const sheet = sheets[index];
  const prev = sheets[index - 1];
  const next = sheets[index + 1];

  return (
    <main className="mx-auto w-full max-w-md px-4 pt-4 lg:max-w-xl lg:pt-8">
      <h1 className="text-3xl font-extrabold">{sheet.title}</h1>
      <p className="mt-1 text-muted">{sheet.desc}</p>

      {sheet.lessons.map((ls) => {
        const lesson = lessons.find((l) => l.slug === ls);
        if (!lesson) return null;
        return (
          <section key={ls} className="mt-6">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-xl font-extrabold">{lesson.title.en}</h2>
              <Link href={`/lessons/${lesson.slug}`} className="shrink-0 text-sm font-extrabold text-pri">Full lesson</Link>
            </div>
            <div className="mt-3 flex flex-col gap-3">
              {lesson.tables?.map((t) => <DataTable key={t.title} table={t} />)}
            </div>
          </section>
        );
      })}

      <PageNav
        back={prev ? { href: `/cheatsheets/${prev.slug}`, label: prev.title } : { href: "/cheatsheets", label: "All sheets" }}
        next={next ? { href: `/cheatsheets/${next.slug}`, label: next.title } : { href: "/cheatsheets", label: "All sheets" }}
      />
    </main>
  );
}
