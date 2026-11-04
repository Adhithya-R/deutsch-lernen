"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import type { SaveResult } from "@/app/actions";

export type SaveState = null | "saving" | SaveResult;

/** A one-line message after something is saved: "+8 XP saved", or what went wrong. */
export default function SaveNote({ state, savedText = "Result saved" }: { state: SaveState; savedText?: string }) {
  if (!state) return null;
  if (state === "saving") return <p className="text-sm font-extrabold text-muted" role="status">Saving…</p>;
  if (!state.ok) {
    const login = /Log in/i.test(state.error ?? "");
    return (
      <p className="flex items-start gap-2 rounded-2xl bg-butter p-3 text-sm font-extrabold text-butter-ink" role="alert">
        <Icon name="info" size={18} className="mt-0.5 shrink-0" />
        <span>
          {login ? (
            <>
              <Link href="/login" className="underline">Log in</Link> to save your progress and earn XP.
            </>
          ) : (
            state.error
          )}
        </span>
      </p>
    );
  }
  return (
    <p className="flex items-center gap-2 text-sm font-extrabold text-ok" role="status">
      <Icon name="checkc" size={18} /> {state.xp > 0 ? `+${state.xp} XP saved` : savedText}
      {state.error ? <span className="font-normal text-bad"> · {state.error}</span> : null}
    </p>
  );
}
