"use client";

import { useState } from "react";
import { saveQuiz } from "@/app/actions";
import Icon from "@/components/Icon";
import SaveNote, { type SaveState } from "@/components/SaveNote";
import type { Exercise } from "@/content/lessons";
import { localDay } from "@/lib/activity";

const norm = (s: string) => s.trim().toLowerCase();

export default function Quiz({ exercises, refId, kind = "lesson" }: { exercises: Exercise[]; refId: string; kind?: "lesson" | "culture" }) {
  const [given, setGiven] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [note, setNote] = useState<SaveState>(null);

  const isOk = (i: number) => norm(given[i] ?? "") === norm(exercises[i].answer);
  const correct = exercises.filter((_, i) => checked[i] && isOk(i)).length;
  const allChecked = exercises.every((_, i) => checked[i]);

  function check(i: number) {
    const next = { ...checked, [i]: true };
    setChecked(next);
    if (exercises.every((_, j) => next[j])) {
      const total = exercises.length;
      const right = exercises.filter((e, j) => norm(given[j] ?? "") === norm(e.answer)).length;
      setNote("saving");
      saveQuiz(kind, refId, right, total, localDay())
        .then(setNote)
        .catch(() => setNote({ ok: false, xp: 0, error: "Could not save. Check your connection." }));
    }
  }

  return (
    <div className="space-y-3">
      {exercises.map((e, i) => {
        const done = checked[i];
        const ok = done && isOk(i);
        return (
          <div key={i} className="rounded-2xl border-2 border-line bg-white p-4 shadow-[0_3px_0_var(--color-line)]">
            <p className="font-semibold">{i + 1}. {e.q}</p>

            {e.options ? (
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Choose an answer">
                {e.options.map((o) => {
                  const sel = given[i] === o;
                  const state = !done
                    ? sel ? "border-pri bg-pill text-pri-dark font-semibold" : "border-line hover:border-pri"
                    : o === e.answer ? "border-ok bg-ok-bg text-ok font-semibold"
                    : sel ? "border-bad bg-bad-bg text-bad" : "border-line opacity-60";
                  return (
                    <button
                      key={o}
                      disabled={done}
                      aria-pressed={sel}
                      onClick={() => setGiven({ ...given, [i]: o })}
                      className={`min-h-11 rounded-full border px-5 text-[15px] ${state}`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            ) : (
              <input
                disabled={done}
                value={given[i] ?? ""}
                onChange={(ev) => setGiven({ ...given, [i]: ev.target.value })}
                placeholder="Type your answer"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                className="mt-3 h-12 w-full rounded-xl border border-line bg-white px-4 text-[16px] disabled:bg-sand"
              />
            )}

            {!done ? (
              <button
                disabled={!given[i]}
                onClick={() => check(i)}
                className="btn3d mt-3 !min-h-11 !w-auto !text-sm px-6 !border-b-4"
              >
                Check
              </button>
            ) : (
              <div className="mt-3 text-sm" role="status">
                <p className={`flex items-center gap-2 font-semibold ${ok ? "text-ok" : "text-bad"}`}>
                  <Icon name={ok ? "checkc" : "crossc"} size={18} />
                  {ok ? "Richtig!" : `Falsch. Answer: ${e.answer}`}
                </p>
                {e.tip && (
                  <p className="mt-1 text-muted">
                    {e.tip.en} <span lang="ta" className="ta-only">{e.tip.ta}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
      {allChecked && (
        <div className="flex flex-col gap-2 rounded-2xl bg-butter p-4 text-butter-ink">
          <p className="font-extrabold">Score: {correct} / {exercises.length}{correct / exercises.length >= 0.6 ? " · lesson completed" : " · 60% completes the lesson"}</p>
          <SaveNote state={note} />
        </div>
      )}
    </div>
  );
}
