"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { chapterBySlug, doneKey, markChapter } from "@/content/chapters";
import { cards } from "@/content/vocab";
import { plausibleDay } from "@/lib/activity";
import { NEW_CARD, review, type CardState, type Grade } from "@/lib/srs";
import { createClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/supabase/session";

export type FormState = { error?: string } | undefined;

/** What every save reports back, so the screen can say "+3 XP" or explain what went wrong. */
export type SaveResult = { ok: boolean; xp: number; error?: string };

const NEEDS_LOGIN: SaveResult = { ok: false, xp: 0, error: "Log in to save your progress." };

function explain(error: { code?: string; message?: string } | null | undefined): string {
  if (!error) return "Could not save.";
  const text = `${error.code ?? ""} ${error.message ?? ""}`;
  if (/42P01|PGRST20[45]|does not exist|schema cache|Could not find/i.test(text)) {
    return "The database is not set up yet. Run supabase/setup.sql in Supabase, then check Me > Setup check.";
  }
  return "Could not save. Check your connection and try again.";
}

/* ---------------------------------- account ---------------------------------- */

export async function signup(_: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const invite = String(formData.get("invite") ?? "").trim();

  if (!process.env.INVITE_CODE || invite !== process.env.INVITE_CODE) {
    return { error: "Wrong invite code. Ask Adhi for the code." };
  }
  if (!name || !email || password.length < 8) {
    return { error: "Enter your name, email and a password of at least 8 characters." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: name } } });
  if (error) return { error: error.message };
  if (!data.session) return { error: "Account created. Check your email to confirm it, then log in." };
  redirect("/");
}

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  });
  if (error) return { error: "Wrong email or password." };
  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

/* ------------------------------------ XP ------------------------------------- */

type Supabase = Awaited<ReturnType<typeof createClient>>;

/** Adds XP for the learner's day. Returns an error text, or null when it worked. */
async function addXp(supabase: Supabase, day: string | undefined, xp: number): Promise<string | null> {
  if (xp <= 0) return null;
  if (!day || !plausibleDay(day)) return "Could not save today's XP (date problem).";
  const { error } = await supabase.rpc("add_xp", { p_day: day, p_xp: xp });
  return error ? explain(error) : null;
}

/* --------------------------------- flashcards -------------------------------- */

/**
 * Saves one answered flashcard from a test. grade: 0 = wrong, 1 = right on the second try,
 * 2 = right first time. The learner never rates themselves: the test decides.
 */
export async function reviewCard(cardId: string, grade: number, day?: string): Promise<SaveResult> {
  if (!cards.some((c) => c.id === cardId) || ![0, 1, 2].includes(grade)) return { ok: false, xp: 0, error: "Unknown card." };
  const { supabase, userId } = await getSession();
  if (!userId) return NEEDS_LOGIN;

  const { data: row, error: readError } = await supabase
    .from("flashcard_state")
    .select("ease,interval_days,repetitions")
    .eq("card_id", cardId)
    .maybeSingle();
  if (readError) return { ok: false, xp: 0, error: explain(readError) };

  const current: CardState = row ? { ease: row.ease, intervalDays: row.interval_days, repetitions: row.repetitions } : NEW_CARD;
  const next = review(current, grade as Grade, new Date());

  const { error } = await supabase.from("flashcard_state").upsert({
    user_id: userId,
    card_id: cardId,
    ease: next.ease,
    interval_days: next.intervalDays,
    repetitions: next.repetitions,
    due_at: next.dueAt.toISOString(),
    updated_at: new Date().toISOString(),
  });
  if (error) return { ok: false, xp: 0, error: explain(error) };

  const xp = grade === 2 ? 3 : grade === 1 ? 1 : 0;
  const xpError = await addXp(supabase, day, xp);
  revalidatePath("/");
  revalidatePath("/flashcards");
  return xpError ? { ok: true, xp: 0, error: xpError } : { ok: true, xp };
}

/* ----------------------------------- chapters -------------------------------- */

export async function submitChapter(slug: string, answers: string[], day?: string) {
  const chapter = chapterBySlug(slug);
  if (!chapter || !Array.isArray(answers)) return { score: 0, total: 0, passed: false, saved: false, xp: 0, error: "Unknown chapter." };

  const result = markChapter(chapter, answers.map(String));
  const { supabase, userId } = await getSession();
  if (!userId) return { ...result, saved: false, xp: 0, error: "Log in to save your progress and unlock the next chapter." };
  if (!result.passed) return { ...result, saved: false, xp: 0 };

  // XP only the first time a chapter is passed, so repeating it cannot be used to farm points.
  const { data: before } = await supabase.from("lesson_progress").select("status").eq("lesson_slug", doneKey(slug)).maybeSingle();
  const firstPass = before?.status !== "completed";
  const xp = firstPass ? result.score * 10 + 30 : 0;

  const { error } = await supabase.from("lesson_progress").upsert({
    user_id: userId,
    lesson_slug: doneKey(slug),
    status: "completed",
    position: result.score,
    updated_at: new Date().toISOString(),
  });
  if (error) return { ...result, saved: false, xp: 0, error: explain(error) };

  const xpError = await addXp(supabase, day, xp);
  revalidatePath("/");
  return { ...result, saved: true, xp: xpError ? 0 : xp, error: xpError ?? undefined };
}

/* ------------------------- quizzes, exam practice, culture ------------------- */

const KINDS = ["lesson", "exam", "mock", "culture", "weekly"] as const;
type Kind = (typeof KINDS)[number];

/**
 * Stores the best result of a quiz. XP is given only the first time you finish it.
 * A lesson counts as completed when you score at least 60%.
 */
export async function saveQuiz(kind: string, ref: string, score: number, total: number, day?: string): Promise<SaveResult> {
  if (!(KINDS as readonly string[]).includes(kind) || !/^[a-z0-9:_-]{1,80}$/i.test(ref)) return { ok: false, xp: 0, error: "Unknown quiz." };
  if (!Number.isInteger(score) || !Number.isInteger(total) || total < 1 || total > 60 || score < 0 || score > total) {
    return { ok: false, xp: 0, error: "Invalid score." };
  }
  const { supabase, userId } = await getSession();
  if (!userId) return NEEDS_LOGIN;

  const { data: old, error: readError } = await supabase.from("quiz_results").select("score,attempts").eq("kind", kind).eq("ref", ref).maybeSingle();
  if (readError) return { ok: false, xp: 0, error: explain(readError) };

  const perfect = score === total;
  const base: Record<Kind, number> = { lesson: score * 2 + (perfect ? 10 : 0), exam: score * 2, mock: score * 2, culture: score * 3 + (perfect ? 10 : 0), weekly: score * 3 + (perfect ? 15 : 0) };
  const xp = old ? 0 : base[kind as Kind];

  const { error } = await supabase.from("quiz_results").upsert({
    user_id: userId,
    kind,
    ref,
    score: Math.max(score, old?.score ?? 0),
    total,
    attempts: (old?.attempts ?? 0) + 1,
    updated_at: new Date().toISOString(),
  });
  if (error) return { ok: false, xp: 0, error: explain(error) };

  if (kind === "lesson" && score / total >= 0.6) {
    await supabase.from("lesson_progress").upsert({ user_id: userId, lesson_slug: ref, status: "completed", position: score, updated_at: new Date().toISOString() });
  }
  const xpError = await addXp(supabase, day, xp);
  revalidatePath("/");
  return xpError ? { ok: true, xp: 0, error: xpError } : { ok: true, xp };
}

/* ------------------------------- writing drafts ------------------------------ */

export async function saveDraft(taskId: string, body: string): Promise<SaveResult> {
  if (!/^[a-z0-9_-]{1,60}$/i.test(taskId) || typeof body !== "string" || body.length > 4000) return { ok: false, xp: 0, error: "Invalid draft." };
  const { supabase, userId } = await getSession();
  if (!userId) return NEEDS_LOGIN;
  const { error } = await supabase.from("writing_drafts").upsert({ user_id: userId, task_id: taskId, body, updated_at: new Date().toISOString() });
  return error ? { ok: false, xp: 0, error: explain(error) } : { ok: true, xp: 0 };
}

/* ---------------------------------- setup check ------------------------------ */

/** Tells the owner which parts of the database exist, so a missing script is easy to spot. */
export async function checkSetup(day: string) {
  const { supabase, userId } = await getSession();
  if (!userId) return { loggedIn: false, items: [] as { name: string; ok: boolean }[] };

  const tables = ["profiles", "lesson_progress", "flashcard_state", "daily_activity", "quiz_results", "writing_drafts"];
  const items: { name: string; ok: boolean }[] = [];
  for (const t of tables) {
    const { error } = await supabase.from(t).select("*", { head: true, count: "exact" });
    items.push({ name: `Table ${t}`, ok: !error });
  }
  const xp = await supabase.rpc("add_xp", { p_day: plausibleDay(day) ? day : new Date().toISOString().slice(0, 10), p_xp: 0 });
  items.push({ name: "Function add_xp (XP and streak)", ok: !xp.error });
  const board = await supabase.rpc("weekly_leaderboard");
  items.push({ name: "Function weekly_leaderboard (study group)", ok: !board.error });
  return { loggedIn: true, items };
}
