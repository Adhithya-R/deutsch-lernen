import Link from "next/link";
import { Suspense } from "react";
import { logout } from "@/app/actions";
import Icon from "@/components/Icon";
import LangToggle from "@/components/LangToggle";
import PageNav from "@/components/PageNav";
import ScreenTop from "@/components/ScreenTop";
import { getSession } from "@/lib/supabase/session";

export const metadata = { title: "Me · மொழி-Brücke" };

const card = "rounded-3xl bg-white p-4 shadow-[0_3px_0_var(--color-line)]";

export default function MePage() {
  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <ScreenTop tab="me" kicker="Your profile" title="Me" />
      <div className="flex flex-col gap-3.5 px-4 pt-4">
        <Suspense fallback={<div className="h-24 animate-pulse rounded-3xl bg-white/70" aria-hidden="true" />}>
          <Account />
        </Suspense>

        <section className={card}>
          <h2 className="text-lg font-extrabold">Language help</h2>
          <p className="mb-3 mt-1 text-sm text-muted">The app is in English. Tamil shows only as help: word meanings, translations and tips.</p>
          <LangToggle />
        </section>

        <Link href="/progress" className={`${card} flex items-center gap-3 font-extrabold`}>
          <Icon name="star" size={22} className="text-pri" />
          <span className="flex-1">My level &amp; progress</span>
          <Icon name="chev" size={20} className="text-muted" />
        </Link>
        <Link href="/cheatsheets" className={`${card} flex items-center gap-3 font-extrabold`}>
          <Icon name="table" size={22} className="text-pri" />
          <span className="flex-1">Cheat sheets &amp; grammar</span>
          <Icon name="chev" size={20} className="text-muted" />
        </Link>
        <Link href="/group" className={`${card} flex items-center gap-3 font-extrabold`}>
          <Icon name="users" size={22} className="text-pri" />
          <span className="flex-1">Study group</span>
          <Icon name="chev" size={20} className="text-muted" />
        </Link>
        <PageNav back={{ href: "/bruecke", label: "Brücke" }} />
      </div>
    </main>
  );
}

async function Account() {
  const { supabase, userId, email } = await getSession();

  if (!userId) {
    return (
      <section className={card}>
        <p className="text-muted">Log in to save your progress, flashcards and unlocked chapters.</p>
        <div className="mt-3 flex flex-col gap-3">
          <Link href="/login" className="btn3d">Log in</Link>
          <Link href="/signup" className="btn3d btn3d-ghost">Create account</Link>
        </div>
      </section>
    );
  }

  const { data: profile } = await supabase.from("profiles").select("display_name").maybeSingle();
  const name = profile?.display_name || "Learner";
  return (
    <section className={`${card} flex items-center gap-3`}>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-b-4 border-pri-dark bg-pri font-display text-xl font-extrabold text-white">
        {name.charAt(0).toUpperCase()}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-extrabold">{name}</p>
        <p className="truncate text-sm text-muted">{email}</p>
      </div>
      <form action={logout}>
        <button className="inline-flex h-11 items-center gap-2 rounded-xl border-2 border-line px-3 text-sm font-extrabold">
          <Icon name="out" size={18} /> Log out
        </button>
      </form>
    </section>
  );
}
