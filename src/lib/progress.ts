import { chapters } from "@/content/chapters";
import { createClient } from "@/lib/supabase/server";

/** Which story chapters this user has passed (stored in lesson_progress as "chapter-<slug>"). */
export async function chapterProgress() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  const done = new Set<string>();
  if (!auth.user) return { loggedIn: false, done };

  const { data } = await supabase.from("lesson_progress").select("lesson_slug,status");
  (data ?? []).forEach((r) => {
    const slug = String(r.lesson_slug);
    if (r.status === "completed" && slug.startsWith("chapter-")) done.add(slug.slice("chapter-".length));
  });
  return { loggedIn: true, done };
}

/** A chapter is open when it is the first one, or the one before it has been passed. */
export function isUnlocked(slug: string, done: Set<string>) {
  const i = chapters.findIndex((c) => c.slug === slug);
  return i === 0 || (i > 0 && done.has(chapters[i - 1].slug));
}
