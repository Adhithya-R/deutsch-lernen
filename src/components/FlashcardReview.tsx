"use client";

import { useState } from "react";
import { reviewCard } from "@/app/actions";
import Icon from "@/components/Icon";
import SpeakButton from "@/components/SpeakButton";
import type { Card } from "@/content/vocab";
import { useSpeak } from "@/components/useSpeak";

const GRADES = [
  { grade: 0, label: "Again", style: "border-bad/40 bg-bad-bg text-bad" },
  { grade: 1, label: "Hard", style: "border-[#f0c48a] bg-[#fff6ea] text-[#9a4a05]" },
  { grade: 2, label: "Good", style: "border-ok/40 bg-ok-bg text-ok" },
  { grade: 3, label: "Easy", style: "border-[#a9c9ea] bg-[#eef5fd] text-[#1d5fa8]" },
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
      <div className="mt-4 rounded-3xl bg-butter p-8 text-center text-butter-ink">
        <Icon name="checkc" size={36} className="mx-auto" />
        <p className="mt-3 text-xl font-bold">Super gemacht!</p>
        <p className="mt-1">
          {reviewed > 0 ? `You reviewed ${reviewed} cards. ` : ""}Nothing more is due right now. Come back later.
        </p>
      </div>
    );
  }

  function answer(grade: number) {
    setFailed(false);
    reviewCard(card.id, grade).catch(() => setFailed(true));
    setReviewed((n) => n + 1);
    setRevealed(false);
    setQueue((q) => (grade === 0 ? [...q.slice(1), q[0]] : q.slice(1)));
  }

  const progress = startSize > 0 ? Math.min(100, Math.round(((startSize - queue.length) / startSize) * 100)) : 0;

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center gap-3 text-sm text-muted">
        <div className="h-1.5 flex-1 rounded-full bg-line" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-1.5 rounded-full bg-pri" style={{ width: `${progress}%` }} />
        </div>
        <span>{queue.length} left</span>
      </div>

      <div className="rounded-3xl border border-line bg-white p-6 text-center">
        <p className="text-3xl font-bold">{card.de}</p>
        <button
          onClick={() => say(card.de)}
          className="mt-3 inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-semibold text-pri hover:bg-sand"
        >
          <Icon name="volume" size={18} /> Listen
        </button>

        {revealed && (
          <div className="mt-5 space-y-1 border-t border-line pt-5">
            <p className="text-xl">{card.en}</p>
            <p lang="ta" className="text-xl text-ink/80">{card.ta}</p>
            {card.example && (
              <div className="mt-4 flex items-start justify-between gap-2 rounded-2xl bg-sand-2 p-3 text-left text-sm">
                <div>
                  <p className="font-semibold">{card.example.de}</p>
                  <p>{card.example.en}</p>
                  <p lang="ta">{card.example.ta}</p>
                </div>
                <SpeakButton text={card.example.de} />
              </div>
            )}
          </div>
        )}
      </div>

      {!revealed ? (
        <button onClick={() => setRevealed(true)} className="h-14 w-full rounded-full bg-pri text-base font-semibold text-white hover:bg-pri-dark">
          Show answer
        </button>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {GRADES.map((g) => (
            <button key={g.grade} onClick={() => answer(g.grade)} className={`h-14 rounded-2xl border text-sm font-semibold ${g.style}`}>
              {g.label}
            </button>
          ))}
        </div>
      )}

      {note && <p role="alert" className="rounded-2xl bg-butter p-3 text-sm text-butter-ink">{note}</p>}
      {failed && <p role="alert" className="text-sm text-bad">Could not save the last answer. Check your connection.</p>}
    </div>
  );
}
