"use client";

import { useState } from "react";
import { reviewCard } from "@/app/actions";
import Icon from "@/components/Icon";
import SpeakButton from "@/components/SpeakButton";
import { useSpeak } from "@/components/useSpeak";
import type { Card } from "@/content/vocab";
import { localDay } from "@/lib/activity";

const GRADES = [
  { grade: 0, label: "Again", style: "border-[#f2b8b5] bg-bad-bg text-bad" },
  { grade: 1, label: "Hard", style: "border-[#f0c48a] bg-[#fff0d6] text-[#7a3f00]" },
  { grade: 2, label: "Good", style: "border-[#a8d8ab] bg-ok-bg text-[#1b5e20]" },
  { grade: 3, label: "Easy", style: "border-[#a9c9ea] bg-[#e4f0ff] text-[#154c8c]" },
];

export default function FlashcardReview({ cards, total }: { cards: Card[]; total?: number }) {
  const [queue, setQueue] = useState(cards);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [failed, setFailed] = useState(false);
  const { say, note } = useSpeak();

  const card = queue[0];
  const startSize = total ?? cards.length;

  if (!card) {
    return (
      <div className="mt-4 rounded-3xl bg-white p-8 text-center shadow-[0_3px_0_var(--color-line)]">
        <Icon name="checkc" size={44} className="mx-auto text-ok" />
        <p className="mt-3 font-display text-2xl font-extrabold">Super gemacht!</p>
        <p className="mt-1 text-muted">
          {reviewed > 0 ? `You reviewed ${reviewed} cards. ` : ""}Nothing more is due right now. Come back later.
        </p>
      </div>
    );
  }

  function answer(grade: number) {
    setFailed(false);
    reviewCard(card.id, grade, localDay()).catch(() => setFailed(true));
    setReviewed((n) => n + 1);
    setRevealed(false);
    setQueue((q) => (grade === 0 ? [...q.slice(1), q[0]] : q.slice(1)));
  }

  const progress = startSize > 0 ? Math.min(100, Math.round(((startSize - queue.length) / startSize) * 100)) : 0;

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center gap-3 text-sm font-extrabold text-muted">
        <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-black/10" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-pri transition-[width]" style={{ width: `${progress}%` }} />
        </div>
        <span>{queue.length} left</span>
      </div>

      <div className="rounded-[26px] border-2 border-line bg-white p-6 text-center shadow-[0_5px_0_var(--color-line)]">
        <p className="font-display text-4xl font-extrabold leading-tight">{card.de}</p>
        <button
          onClick={() => say(card.de)}
          className="mt-3 inline-flex h-11 items-center gap-2 rounded-full bg-pill px-5 text-sm font-extrabold text-pri"
        >
          <Icon name="volume" size={18} /> Listen
        </button>

        {revealed ? (
          <div className="mt-5 space-y-1 border-t-2 border-line pt-5">
            <p className="text-xl font-extrabold">{card.en}</p>
            <p lang="ta" className="ta-only text-xl">{card.ta}</p>
            {card.example && (
              <div className="mt-4 flex items-start justify-between gap-2 rounded-2xl bg-pill p-3 text-left text-sm">
                <div>
                  <p className="font-extrabold">{card.example.de}</p>
                  <p>{card.example.en}</p>
                  <p lang="ta" className="ta-only">{card.example.ta}</p>
                </div>
                <SpeakButton text={card.example.de} />
              </div>
            )}
          </div>
        ) : (
          <p className="mt-5 text-sm text-muted">Think of the meaning, then show the answer.</p>
        )}
      </div>

      {!revealed ? (
        <button onClick={() => setRevealed(true)} className="btn3d">Show answer</button>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {GRADES.map((g) => (
            <button key={g.grade} onClick={() => answer(g.grade)} className={`h-14 rounded-2xl border-2 border-b-[5px] text-sm font-extrabold ${g.style}`}>
              {g.label}
            </button>
          ))}
        </div>
      )}

      {note && <p role="alert" className="rounded-2xl bg-butter p-3 text-sm text-butter-ink">{note}</p>}
      {failed && <p role="alert" className="text-sm font-extrabold text-bad">Could not save the last answer. Check your connection.</p>}
    </div>
  );
}
