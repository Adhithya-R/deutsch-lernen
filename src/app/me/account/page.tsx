import Link from "next/link";
import { Suspense } from "react";
import { DeleteForm, NameForm, PasswordForm } from "@/components/AccountForms";
import Icon from "@/components/Icon";
import PageNav from "@/components/PageNav";
import { getSession } from "@/lib/supabase/session";

export const metadata = { title: "Account settings · மொழி-Brücke" };

export default function AccountPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 pb-8 pt-4 lg:max-w-xl lg:pt-8">
      <h1 className="text-3xl font-extrabold">Account settings</h1>
      <Suspense fallback={<div className="mt-5 h-64 animate-pulse rounded-3xl bg-white/70" aria-hidden="true" />}>
        <Body />
      </Suspense>
      <PageNav back={{ href: "/me", label: "Me" }} />
    </main>
  );
}

async function Body() {
  const { supabase, userId, email } = await getSession();
  if (!userId) {
    return <p className="mt-5 rounded-2xl bg-white p-4 text-muted shadow-[0_3px_0_var(--color-line)]"><Link href="/login" className="font-extrabold text-pri underline">Log in</Link> to change your account.</p>;
  }
  const { data: profile } = await supabase.from("profiles").select("display_name").maybeSingle();
  return (
    <div className="mt-5 space-y-6">
      <p className="flex items-center gap-2 text-sm text-muted"><Icon name="user" size={18} /> {email}</p>
      <section><h2 className="mb-2 text-xl font-extrabold">Name</h2><NameForm name={profile?.display_name ?? ""} /></section>
      <section><h2 className="mb-2 text-xl font-extrabold">Password</h2><PasswordForm /></section>
      <section><h2 className="mb-2 text-xl font-extrabold">Delete account</h2><DeleteForm /></section>
    </div>
  );
}
