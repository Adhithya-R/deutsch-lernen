import { buildExport, exportFileName } from "@/lib/export";
import { getSession } from "@/lib/supabase/session";

// Downloads the logged-in learner's own progress as a JSON file. Row-level security means only their rows are read.
export async function GET() {
  const { supabase, userId, email } = await getSession();
  if (!userId) return Response.json({ error: "Log in to download your progress." }, { status: 401 });

  const [profile, lessons, flashcards, activity, quizzes, drafts] = await Promise.all([
    supabase.from("profiles").select("display_name,level,created_at").maybeSingle(),
    supabase.from("lesson_progress").select("lesson_slug,status,position,updated_at"),
    supabase.from("flashcard_state").select("card_id,ease,interval_days,repetitions,due_at,updated_at"),
    supabase.from("daily_activity").select("day,xp").order("day"),
    supabase.from("quiz_results").select("kind,ref,score,total,attempts,updated_at"),
    supabase.from("writing_drafts").select("task_id,body,updated_at"),
  ]);

  const failed = [profile, lessons, flashcards, activity, quizzes, drafts].find((r) => r.error);
  if (failed?.error) {
    return Response.json({ error: "Could not read your progress. Run supabase/setup.sql, then try again." }, { status: 500 });
  }

  const body = buildExport(email, {
    profile: profile.data,
    lessons: lessons.data ?? [],
    flashcards: flashcards.data ?? [],
    activity: activity.data ?? [],
    quizzes: quizzes.data ?? [],
    drafts: drafts.data ?? [],
  });
  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="${exportFileName()}"`,
      "Cache-Control": "no-store",
    },
  });
}
