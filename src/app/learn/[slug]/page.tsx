import { notFound } from "next/navigation";
import { Suspense } from "react";
import Locked from "@/components/Locked";
import Story from "@/components/Story";
import { chapterBySlug, chapters } from "@/content/chapters";
import { chapterProgress, isUnlocked } from "@/lib/progress";

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export default function StoryPage({ params }: PageProps<"/learn/[slug]">) {
  return (
    <Suspense fallback={<p className="p-6 text-muted">Loading…</p>}>
      <Inner params={params} />
    </Suspense>
  );
}

async function Inner({ params }: { params: PageProps<"/learn/[slug]">["params"] }) {
  const { slug } = await params;
  const chapter = chapterBySlug(slug);
  if (!chapter) notFound();

  const { done, loggedIn } = await chapterProgress();
  if (!isUnlocked(slug, done)) return <Locked previous={chapters[chapter.n - 2].title} loggedIn={loggedIn} />;
  return <Story chapter={chapter} />;
}
