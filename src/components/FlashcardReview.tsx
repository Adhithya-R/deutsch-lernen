"use client";

import { useState } from "react";
import { reviewCard } from "@/app/actions";
import type { Card } from "@/content/vocab";

function speak(text: string) {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    u.rate = 0.9;
    synth.speak(u);
  } catch {
    // Audio is optional; ignore if the browser has no German voice.
  }
}

const GRADES = [
  { grade: 0, label: "Again", hint: "10 min", style: "border-red-300 text-red-700" },
  { grade: 1, label: "Hard", hint: "", style: "border-orange-300 text-orange-700" },
  { grade: 2, label: "Good", hint: "", style: "border-green-300 text-green-700" },
  { grade: 3, label: "Easy", hint: "", style: "border-blue-300 text-blue-700" },
];

export default function FlashcardReview({ cards }: { cards: Card[] }) {
  const [queue, setQueue] = useState(cards);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [failed, setFailed] = useState(false);

  const card = queue[0];

  if (!card) {
    return (
      <div className="rounded-lg bg-slate-100 p-6 text-center">
        <p className="text-xl font-semibold">Super! 🎉</p>
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

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{queue.length} left in this session</p>

      <div className="rounded-lg border border-slate-300 p-6 text-center">
        <p className="text-3xl font-bold">{card.de}</p>
        <button onClick={() => speak(card.de)} className="mt-2 text-sm underline">🔊 Listen</button>

        {revealed && (
          <div className="mt-4 space-y-1 border-t border-slate-200 pt-4">
            <p className="text-lg">{card.en}</p>
            <p lang="ta" className="text-lg text-slate-700">{card.ta}</p>
            {card.example && (
              <div className="mt-3 rounded bg-slate-50 p-2 text-left text-sm">
                <p className="font-medium">
                  {card.example.de}{" "}
                  <button onClick={() => speak(card.example!.de)} aria-label="Listen to example">🔊</button>
                </p>
                <p>{card.example.en}</p>
                <p lang="ta">{card.example.ta}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {!revealed ? (
        <button onClick={() => setRevealed(true)} className="w-full rounded bg-slate-900 p-3 text-white">
          Show answer
        </button>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {GRADES.map((g) => (
            <button key={g.grade} onClick={() => answer(g.grade)} className={`rounded border p-2 text-sm ${g.style}`}>
              {g.label}
            </button>
          ))}
        </div>
      )}

      {failed && <p className="text-sm text-red-600">Could not save the last answer. Check your connection.</p>}
    </div>
  );
}
