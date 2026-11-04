import Link from "next/link";
import { Suspense } from "react";
import { logout } from "@/app/actions";
import Icon from "@/components/Icon";
import { MenuRow } from "@/components/Rows";
import { menu } from "@/content/menu";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "More · மொழி-Brücke" };

const SECTIONS = ["spickzettel", "wortschatz", "ueben", "gruppe"];

export default function MorePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-6 lg:px-8 lg:pt-10">
      <h1 className="text-3xl font-bold tracking-tight">More</h1>
      <p lang="ta" className="mt-1 text-lg text-muted">மேலும்</p>

      <Suspense fallback={null}>
        <Account />
      </Suspense>

      {SECTIONS.map((id) => {
        const s = menu.find((m) => m.id === id)!;
        return (
          <section key={id} className="mt-7">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
              {s.en} <span lang="ta" className="font-medium normal-case tracking-normal">· {s.ta}</span>
            </h2>
            {s.groups.map((g) => (
              <div key={g.heading} className="mt-3 grid gap-2 sm:grid-cols-2">
                {g.items.map((i) => (
                  <MenuRow key={g.heading + i.en} item={i} />
                ))}
              </div>
            ))}
          </section>
        );
      })}
    </main>
  );
}

async function Account() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const pill = "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold";

  if (!data.user) {
    return (
      <div className="mt-5 flex flex-wrap gap-3 rounded-3xl bg-sand p-5">
        <p className="w-full text-muted">Log in to save your progress and flashcards.</p>
        <Link href="/login" className={`${pill} bg-pri text-white hover:bg-pri-dark`}>Log in</Link>
        <Link href="/signup" className={`${pill} bg-pill text-pri-dark`}>Sign up</Link>
      </div>
    );
  }
  const { data: profile } = await supabase.from("profiles").select("display_name").maybeSingle();
  return (
    <div className="mt-5 flex items-center justify-between gap-3 rounded-3xl bg-sand p-5">
      <div className="min-w-0">
        <p className="font-bold">{profile?.display_name || "Learner"}</p>
        <p className="truncate text-sm text-muted">{data.user.email}</p>
      </div>
      <form action={logout}>
        <button className={`${pill} border border-line bg-white`}>
          <Icon name="out" size={18} /> Log out
        </button>
      </form>
    </div>
  );
}
