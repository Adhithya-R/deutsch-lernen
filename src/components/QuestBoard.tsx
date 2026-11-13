"use client";

import { useSyncExternalStore } from "react";
import Icon from "@/components/Icon";
import { localDay } from "@/lib/activity";

const subscribe = () => () => {};

type Quest = { icon: "star" | "cards" | "checkc"; title: string; en: string; ta: string; progress: number; target: number; unit: string };

export default function QuestBoard({ byDay, reviewedAt, quizAt }: { byDay: Record<string, number>; reviewedAt: string[]; quizAt: string[] }) {
  const today = useSyncExternalStore(subscribe, localDay, () => "");
  const reviews = today ? reviewedAt.filter((date) => date.slice(0, 10) === today).length : 0;
  const quizzes = today ? quizAt.filter((date) => date.slice(0, 10) === today).length : 0;
  const quests: Quest[] = [
    { icon: "star", title: "Sammle 20 XP", en: "Earn 20 XP today.", ta: "இன்று 20 XP பெறுங்கள்.", progress: today ? byDay[today] ?? 0 : 0, target: 20, unit: "XP" },
    { icon: "cards", title: "Wiederhole 3 Wörter", en: "Review three different words today.", ta: "இன்று மூன்று வெவ்வேறு சொற்களைப் பயிற்சி செய்யுங்கள்.", progress: reviews, target: 3, unit: "Wörter" },
    { icon: "checkc", title: "Schließe ein Quiz ab", en: "Complete a quiz today.", ta: "இன்று ஒரு வினாடி வினாவை முடிக்கவும்.", progress: quizzes, target: 1, unit: "Quiz" },
  ];

  return (
    <section className="rounded-3xl bg-white p-4 shadow-[0_3px_0_var(--color-line)]">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold">Tägliche Quests</h2>
          <p className="text-xs text-muted"><span className="en-only">Small steps build your bridge.</span><span lang="ta" className="ta-only">சிறிய முயற்சிகள் உங்கள் பாலத்தைக் கட்டும்.</span></p>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-pri/10 text-pri"><Icon name="bridge" size={21} /></span>
      </div>
      <ul className="space-y-3">
        {quests.map((quest) => {
          const value = Math.min(quest.progress, quest.target);
          const done = value >= quest.target;
          const pct = Math.round((value / quest.target) * 100);
          return <li key={quest.title} className="rounded-2xl bg-black/[0.035] p-3">
            <div className="flex items-start gap-3">
              <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${done ? "bg-ok/15 text-ok" : "bg-pri/10 text-pri"}`}><Icon name={done ? "checkc" : quest.icon} size={19} /></span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2"><h3 className="font-extrabold leading-tight">{quest.title}</h3><span className="shrink-0 text-xs font-extrabold text-muted">{value}/{quest.target} {quest.unit}</span></div>
                <p className="mt-0.5 text-xs text-muted"><span className="en-only">{quest.en}</span><span lang="ta" className="ta-only">{quest.ta}</span></p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/10" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={quest.title}><div className={`h-full rounded-full transition-[width] ${done ? "bg-ok" : "bg-pri"}`} style={{ width: `${pct}%` }} /></div>
              </div>
            </div>
          </li>;
        })}
      </ul>
    </section>
  );
}

