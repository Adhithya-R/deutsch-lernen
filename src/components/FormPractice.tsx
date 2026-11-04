"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import type { FormTask } from "@/content/exam";
import { fieldOk } from "@/lib/writing";

// A1 writing part 1: fill in a form from the information given.
export default function FormPractice({ task }: { task: FormTask }) {
  const [values, setValues] = useState<string[]>(task.fields.map(() => ""));
  const [checked, setChecked] = useState(false);
  const good = task.fields.filter((f, i) => fieldOk(values[i], f)).length;

  return (
    <section className="rounded-3xl bg-white p-4 shadow-[0_3px_0_var(--color-line)]">
      <h2 className="text-xl font-extrabold">{task.title}</h2>
      <p className="mt-2 rounded-2xl bg-sand p-3.5 leading-relaxed">{task.situation}</p>
      <div className="mt-3 flex flex-col gap-3">
        {task.fields.map((f, i) => {
          const ok = checked && fieldOk(values[i], f);
          return (
            <div key={f.label}>
              <label htmlFor={`${task.id}-${i}`} className="text-sm font-extrabold">{f.label}</label>
              <input
                id={`${task.id}-${i}`}
                value={values[i]}
                disabled={checked}
                onChange={(e) => setValues(values.map((v, j) => (j === i ? e.target.value : v)))}
                autoCapitalize="words"
                spellCheck={false}
                className={`mt-1 h-12 w-full rounded-xl border-2 bg-white px-4 text-[16px] ${checked ? (ok ? "border-[#2e9b4a]" : "border-[#d64545]") : "border-line"}`}
              />
              {checked && !ok && (
                <p className="mt-1 flex items-center gap-1.5 text-sm font-extrabold text-bad" role="status">
                  <Icon name="crossc" size={16} /> Answer: {f.contains ? f.contains.map((w) => w[0].toUpperCase() + w.slice(1)).join(", ") : f.accept![0][0].toUpperCase() + f.accept![0].slice(1)}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {!checked ? (
        <button className="btn3d mt-4" onClick={() => setChecked(true)}>Check</button>
      ) : (
        <div className="mt-4 rounded-2xl bg-butter p-4 text-center font-extrabold text-butter-ink">
          {good} / {task.fields.length} correct
          <button className="btn3d mt-3" onClick={() => { setChecked(false); setValues(task.fields.map(() => "")); }}>Try again</button>
        </div>
      )}
    </section>
  );
}
