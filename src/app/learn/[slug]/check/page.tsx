import { notFound } from "next/navigation";
import { Suspense } from "react";
import ChapterCheck from "@/components/ChapterCheck";
import Locked from "@/components/Locked";
import { chapterBySlug, chapters, upcoming } from "@/content/chapters";
import { chapterProgress, isUnlocked } from "@/lib/progress";

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export default function CheckPage({ params }: PageProps<"/learn/[slug]/check">) {
  return (
    <Suspense fallback={<p className="p-6 text-muted">Loading…</p>}>
      <Inner params={params} />
    </Suspense>
  );
}

async function Inner({ params }: { params: PageProps<"/learn/[slug]/check">["params"] }) {
  const { slug } = await params;
  const chapter = chapterBySlug(slug);
  if (!chapter) notFound();

  const { done, loggedIn } = await chapterProgress();
  if (!isUnlocked(slug, done)) return <Locked previous={chapters[chapter.n - 2].title} loggedIn={loggedIn} />;
  const nextTitle = chapters[chapter.n]?.title ?? upcoming[0]?.title;
  return <ChapterCheck chapter={chapter} nextTitle={nextTitle} />;
}
