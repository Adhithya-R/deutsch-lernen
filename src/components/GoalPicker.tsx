"use client";

import { setDailyGoal, useDailyGoal } from "@/lib/goal";
import { GOALS } from "@/lib/level";

const LABEL: Record<number, string> = { 10: "Easy", 20: "Regular", 40: "Serious" };

/** Choose how much XP you want per day. Kept on this device. */
export default function GoalPicker() {
  const goal = useDailyGoal();
  return (
    <div role="radiogroup" aria-label="Daily goal in XP" className="grid grid-cols-3 gap-2.5">
      {GOALS.map((g) => {
        const on = g === goal;
        return (
          <button
            key={g}
            role="radio"
            aria-checked={on}
            onClick={() => setDailyGoal(g)}
            className={`rounded-2xl border-2 border-b-4 px-2 py-3 text-center ${on ? "border-pri bg-pill text-pri-dark" : "border-line bg-white"}`}
          >
            <b className="block font-display text-xl font-extrabold leading-none">{g}</b>
            <small className="block text-xs font-semibold text-muted">{LABEL[g]}</small>
          </button>
        );
      })}
    </div>
  );
}
