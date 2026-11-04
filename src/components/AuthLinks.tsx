import Link from "next/link";
import { logout } from "@/app/actions";
import { createClient } from "@/lib/supabase/server";

export default async function AuthLinks() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return (
      <div className="flex items-center gap-1 text-sm font-semibold">
        <Link href="/login" className="whitespace-nowrap rounded-full px-3 py-2 hover:bg-sand">Log in</Link>
        <Link href="/signup" className="whitespace-nowrap rounded-full bg-pri px-4 py-2 text-white hover:bg-pri-dark">
          Sign up
        </Link>
      </div>
    );
  }

  const { data: profile } = await supabase.from("profiles").select("display_name").maybeSingle();
  const initial = (profile?.display_name || data.user.email || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <form action={logout} className="hidden lg:block">
        <button className="rounded-full border border-line px-4 py-2 text-sm font-semibold hover:bg-sand">Log out</button>
      </form>
      <Link
        href="/more"
        aria-label="Account"
        className="grid h-9 w-9 place-items-center rounded-full bg-pri text-sm font-bold text-white"
      >
        {initial}
      </Link>
    </div>
  );
}
