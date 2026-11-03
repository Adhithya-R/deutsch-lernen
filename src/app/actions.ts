"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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
