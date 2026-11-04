import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AuthLinks() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return (
      <div className="flex items-center gap-1 text-sm font-extrabold">
        <Link href="/login" className="whitespace-nowrap rounded-xl px-3 py-2 hover:bg-sand">Log in</Link>
        <Link href="/signup" className="btn3d !min-h-10 !w-auto whitespace-nowrap !rounded-xl !border-b-4 px-4 !text-sm">
          Sign up
        </Link>
      </div>
    );
  }

  const { data: profile } = await supabase.from("profiles").select("display_name").maybeSingle();
  const initial = (profile?.display_name || data.user.email || "?").trim().charAt(0).toUpperCase();

  return (
    <Link
      href="/me"
      aria-label="Your profile"
      className="grid h-10 w-10 place-items-center rounded-full border-b-4 border-pri-dark bg-pri font-display text-lg font-extrabold text-white"
    >
      {initial}
    </Link>
  );
}
