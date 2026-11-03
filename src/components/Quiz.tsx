"use client";

import { useState } from "react";
import type { Exercise } from "@/content/lessons";

const norm = (s: string) => s.trim().toLowerCase();

export default function Quiz({ exercises }: { exercises: Exercise[] }) {
  const [given, setGiven] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const correct = exercises.filter((e, i) => checked[i] && norm(given[i] ?? "") === norm(e.answer)).length;
  const allChecked = exercises.every((_, i) => checked[i]);

  return (
    <div className="space-y-4">
      {exercises.map((e, i) => {
        const isDone = checked[i];
        const ok = isDone && norm(given[i] ?? "") === norm(e.answer);
        return (
          <div key={i} className="rounded-lg border border-slate-200 p-3">
            <p className="font-medium">{i + 1}. {e.q}</p>
            {e.options ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {e.options.map((o) => (
                  <button
                    key={o}
                    disabled={isDone}
                    onClick={() => setGiven({ ...given, [i]: o })}
                    className={`rounded border px-3 py-1 text-sm ${
                      given[i] === o ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            ) : (
              <input
                disabled={isDone}
                value={given[i] ?? ""}
                onChange={(ev) => setGiven({ ...given, [i]: ev.target.value })}
                placeholder="Type your answer"
                className="mt-2 w-full rounded border border-slate-300 p-2 text-sm"
              />
            )}
            {!isDone ? (
              <button
                disabled={!given[i]}
                onClick={() => setChecked({ ...checked, [i]: true })}
                className="mt-2 rounded bg-slate-900 px-3 py-1 text-sm text-white disabled:opacity-40"
              >
                Check
              </button>
            ) : (
              <div className="mt-2 text-sm">
                <p className={ok ? "text-green-700" : "text-red-600"}>
                  {ok ? "✓ Richtig!" : `✗ Falsch. Answer: ${e.answer}`}
                </p>
                {e.tip && (
                  <p className="text-slate-600">
                    {e.tip.en} <span lang="ta">{e.tip.ta}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
      {allChecked && (
        <p className="rounded-lg bg-slate-100 p-3 font-semibold">
          Score: {correct} / {exercises.length}
        </p>
      )}
    </div>
  );
}
