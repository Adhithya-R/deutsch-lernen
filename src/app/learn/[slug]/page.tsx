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
    <Suspense fallback={<div className="mx-auto mt-10 h-48 max-w-md animate-pulse rounded-3xl bg-white/70" aria-hidden="true" />}>
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
