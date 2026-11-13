"use client";

import { useSyncExternalStore } from "react";
import Icon from "@/components/Icon";
import { localDay } from "@/lib/activity";
import { useDailyGoal } from "@/lib/goal";

const subscribe = () => () => {};

/** Today's XP against the daily goal. "Today" is the learner's own day, so it is worked out in the browser. */
export default function DailyGoal({ byDay }: { byDay: Record<string, number> }) {
  const today = useSyncExternalStore(subscribe, localDay, () => "");
  const goal = useDailyGoal();
  const xp = today ? (byDay[today] ?? 0) : 0;
  const pct = Math.min(100, Math.round((xp / goal) * 100));
  const met = xp >= goal;
  return (
    <div className="mt-3 rounded-2xl bg-white p-3.5 shadow-[0_3px_0_var(--color-line)]">
      <div className="flex items-center justify-between text-sm font-extrabold">
        <span className="flex items-center gap-1.5">{met && <Icon name="checkc" size={18} className="text-ok" />} Daily goal</span>
        <span className={met ? "text-ok" : "text-muted"}>{met ? "Done! Super." : `${xp} / ${goal} XP`}</span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-black/10" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Daily goal">
        <div className={`h-full rounded-full transition-[width] ${met ? "bg-[#2e9b4a]" : "bg-pri"}`} style={{ width: `${pct}%` }} />
      </div>
      {!met && <p className="mt-1.5 text-xs text-muted">A flashcard deck or a chapter check reaches it.</p>}
    </div>
  );
}
