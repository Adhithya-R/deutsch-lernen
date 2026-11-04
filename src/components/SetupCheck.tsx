"use client";

import { useState } from "react";
import { checkSetup } from "@/app/actions";
import Icon from "@/components/Icon";
import { localDay } from "@/lib/activity";

type Result = Awaited<ReturnType<typeof checkSetup>>;

/** A button that tests whether the database was set up with supabase/setup.sql. */
export default function SetupCheck() {
  const [res, setRes] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);

  async function run() {
    setBusy(true);
    setErr(false);
    try {
      setRes(await checkSetup(localDay()));
    } catch {
      setErr(true);
    }
    setBusy(false);
  }

  const missing = res?.items.filter((i) => !i.ok) ?? [];
  return (
    <section className="rounded-3xl bg-white p-4 shadow-[0_3px_0_var(--color-line)]">
      <h2 className="text-lg font-extrabold">Saving check</h2>
      <p className="mb-3 mt-1 text-sm text-muted">If XP, streak or words learned do not update, test that the database is ready.</p>
      <button onClick={run} disabled={busy} className="btn3d btn3d-ghost">{busy ? "Checking…" : "Check saving"}</button>
      {err && <p role="alert" className="mt-3 text-sm font-extrabold text-bad">Could not run the check. Try again.</p>}
      {res && !res.loggedIn && <p className="mt-3 text-sm text-muted">Log in first.</p>}
      {res?.loggedIn && (
        <>
          <p className={`mt-3 text-sm font-extrabold ${missing.length ? "text-bad" : "text-ok"}`} role="status">
            {missing.length ? `${missing.length} part(s) missing. Run supabase/setup.sql in the Supabase SQL editor.` : "Everything is ready. Your progress is saved."}
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {res.items.map((i) => (
              <li key={i.name} className="flex items-center gap-2">
                <Icon name={i.ok ? "checkc" : "x"} size={16} className={i.ok ? "text-ok" : "text-bad"} /> {i.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
