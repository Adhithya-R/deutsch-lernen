import Link from "next/link";
import { logout } from "@/app/actions";
import { createClient } from "@/lib/supabase/server";

export default async function AuthLinks() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return (
      <div className="flex items-center gap-1 text-sm sm:gap-2">
        <Link href="/login" className="whitespace-nowrap rounded px-2 py-1.5 hover:bg-white/10 sm:px-3">Log in</Link>
        <Link href="/signup" className="whitespace-nowrap rounded bg-gold px-2.5 py-1.5 font-semibold text-brand-950 sm:px-3">Sign up</Link>
      </div>
    );
  }

  return (
    <form action={logout}>
      <button className="whitespace-nowrap rounded border border-cream/40 px-3 py-1.5 text-sm hover:bg-white/10">Log out</button>
    </form>
  );
}
