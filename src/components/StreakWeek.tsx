"use client";

import { useSyncExternalStore } from "react";
import Icon from "@/components/Icon";
import { localDay } from "@/lib/activity";

const subscribe = () => () => {};
const DAY = 86_400_000;
const NAMES = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

export default function StreakWeek({ byDay, streak }: { byDay: Record<string, number>; streak: number }) {
  const today = useSyncExternalStore(subscribe, localDay, () => "");
  if (!today) return <div className="h-32 animate-pulse rounded-3xl bg-white/5" aria-hidden="true" />;

  const base = Date.parse(`${today}T00:00:00Z`);
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(base - (6 - i) * DAY);
    const key = date.toISOString().slice(0, 10);
    return { key, name: NAMES[date.getUTCDay()], active: (byDay[key] ?? 0) > 0, today: i === 6 };
  });
  const activeToday = byDay[today] > 0;

  return (
    <section className="streak-week" aria-label="Deine Lernaktivität der letzten sieben Tage">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/55">Deine Woche</p>
          <h2 className="mt-1 font-display text-xl font-extrabold text-white">Jeden Tag ein Schritt</h2>
        </div>
        <span className="rounded-xl bg-white/10 px-2.5 py-1 text-xs font-extrabold text-white/80">7 Tage</span>
      </div>
      <div className="mt-5 grid grid-cols-7 gap-1.5" role="list">
        {days.map((day) => (
          <div key={day.key} className="flex flex-col items-center gap-2" role="listitem" aria-label={`${day.name}: ${day.active ? "gelernt" : "keine Lernaktivität"}${day.today ? ", heute" : ""}`}>
            <span className={`streak-day ${day.active ? "streak-day--active" : ""} ${day.today ? "streak-day--today" : ""}`}>
              {day.active ? <Icon name="check" size={17} /> : day.today ? <Icon name="flame" size={16} /> : <span className="h-1.5 w-1.5 rounded-full bg-white/25" />}
            </span>
            <span className={`text-[11px] font-extrabold ${day.today ? "text-white" : "text-white/50"}`}>{day.name}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-relaxed text-white/75">
        {activeToday ? (
          <><span className="en-only">You learned today—your streak is glowing!</span><span lang="ta" className="ta-only">இன்று கற்றுக்கொண்டீர்கள் — உங்கள் தொடர் இன்னும் ஒளிர்கிறது!</span></>
        ) : streak > 0 ? (
          <><span className="en-only">Your streak is still alive. Earn a little XP today to keep it going.</span><span lang="ta" className="ta-only">உங்கள் தொடர் இன்னும் தொடர்கிறது. அதை நீட்டிக்க இன்று சிறிது XP பெறுங்கள்.</span></>
        ) : (
          <><span className="en-only">Earn XP today to light your first flame and start a streak.</span><span lang="ta" className="ta-only">இன்று XP பெற்று முதல் தீப்பொறியை ஏற்றி உங்கள் கற்றல் தொடரைத் தொடங்குங்கள்.</span></>
        )}
      </p>
    </section>
  );
}
