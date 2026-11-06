"use client";

import { useSyncExternalStore } from "react";
import { localDay } from "@/lib/activity";
import { useDailyGoal } from "@/lib/goal";

const subscribe = () => () => {};
const DAY = 86_400_000;
const NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/** XP of the last seven days, in the learner's own time zone. A bar reaches full height at the daily goal. */
export default function WeekChart({ byDay }: { byDay: Record<string, number> }) {
  const today = useSyncExternalStore(subscribe, localDay, () => "");
  const goal = useDailyGoal();
  if (!today) return <div className="h-28 animate-pulse rounded-2xl bg-black/5" aria-hidden="true" />;

  const base = Date.parse(`${today}T00:00:00Z`);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base - (6 - i) * DAY);
    const key = d.toISOString().slice(0, 10);
    return { key, name: NAMES[d.getUTCDay()], xp: byDay[key] ?? 0, today: i === 6 };
  });
  return (
    <div className="flex h-28 items-end justify-between gap-2" role="img" aria-label={`XP over the last 7 days: ${days.map((d) => `${d.name} ${d.xp}`).join(", ")}`}>
      {days.map((d) => (
        <div key={d.key} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
          <span className="text-[11px] font-bold text-muted">{d.xp || ""}</span>
          <span className={`w-full rounded-t-lg ${d.xp >= goal ? "bg-[#2e9b4a]" : "bg-pri"}`} style={{ height: `${Math.max(d.xp > 0 ? 8 : 3, Math.min(100, (d.xp / goal) * 100) * 0.62)}%`, opacity: d.xp ? 1 : 0.25 }} />
          <span className={`text-xs font-extrabold ${d.today ? "text-ink" : "text-muted"}`}>{d.name}</span>
        </div>
      ))}
    </div>
  );
}
