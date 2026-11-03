"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cards } from "@/content/vocab";
import { NEW_CARD, review, type CardState, type Grade } from "@/lib/srs";
import { createClient } from "@/lib/supabase/server";

export type FormState = { error?: string } | undefined;

export async function signup(_: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const invite = String(formData.get("invite") ?? "").trim();

  if (!process.env.INVITE_CODE || invite !== process.env.INVITE_CODE) {
    return { error: "Wrong invite code. Ask Adhithya for the code." };
  }
  if (!name || !email || password.length < 8) {
    return { error: "Enter your name, email and a password of at least 8 characters." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: name } },
  });
  if (error) return { error: error.message };
  if (!data.session) {
    return { error: "Account created. Check your email to confirm it, then log in." };
  }
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

export async function saveProgress(slug: string, status: "in_progress" | "completed", position: number) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  await supabase.from("lesson_progress").upsert({
    user_id: data.user.id,
    lesson_slug: slug,
    status,
    position,
    updated_at: new Date().toISOString(),
  });
  revalidatePath("/");
}

export async function reviewCard(cardId: string, grade: number) {
  if (!cards.some((c) => c.id === cardId) || ![0, 1, 2, 3].includes(grade)) return;

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login");

  const { data: row } = await supabase
    .from("flashcard_state")
    .select("ease,interval_days,repetitions")
    .eq("card_id", cardId)
    .maybeSingle();

  const current: CardState = row
    ? { ease: row.ease, intervalDays: row.interval_days, repetitions: row.repetitions }
    : NEW_CARD;
  const next = review(current, grade as Grade, new Date());

  await supabase.from("flashcard_state").upsert({
    user_id: auth.user.id,
    card_id: cardId,
    ease: next.ease,
    interval_days: next.intervalDays,
    repetitions: next.repetitions,
    due_at: next.dueAt.toISOString(),
    updated_at: new Date().toISOString(),
  });
}
