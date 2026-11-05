"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { saveQuiz } from "@/app/actions";
import Icon from "@/components/Icon";
import Pic from "@/components/Pic";
import SaveNote, { type SaveState } from "@/components/SaveNote";
import { useSpeak } from "@/components/useSpeak";
import { cards, type Card } from "@/content/vocab";
import { picFor } from "@/content/pics";
import { localDay } from "@/lib/activity";
import { buildQuestion } from "@/lib/deck-quiz";
import { seededShuffle } from "@/lib/weekly";

const byId = new Map(cards.map((c) => [c.id, c]));

/** Ten questions, the same for the whole class this week. One try each, then the score is saved. */
export default function WeeklyQuiz({ ids, week }: { ids: string[]; week: string }) {
  const picked = useMemo(() => ids.map((i) => byId.get(i)).filter((c): c is Card => !!c), [ids]);
  const questions = useMemo(() => {
    const shuf = seededShuffle(week); // same options in the same order on the server and in the browser
    return picked.map((c, n) => buildQuestion(c, n % 2 === 0 ? "meaning" : "listen", cards, cards, shuf));
  }, [picked, week]);
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [note, setNote] = useState<SaveState>(null);
  const [done, setDone] = useState(false);
  const { say, note: voiceNote } = useSpeak();

  if (questions.length === 0) return <p className="rounded-2xl bg-white p-4 text-muted">No questions this week.</p>;

  if (done) {
    return (
      <div className="space-y-4">
        <div className="pop rounded-3xl bg-white p-7 text-center shadow-[0_3px_0_var(--color-line)]">
          <Icon name="checkc" size={44} className="mx-auto text-ok" />
          <p className="mt-3 font-display text-2xl font-extrabold">{score} / {questions.length}</p>
          <p className="mt-1 text-muted">{score === questions.length ? "Perfect! Sehr gut!" : "Well done. Your best score counts."}</p>
          <div className="mt-3 flex justify-center"><SaveNote state={note} savedText="Score saved" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/group" className="btn3d btn3d-ghost">Ranking</Link>
          <Link href="/" className="btn3d">Home</Link>
        </div>
      </div>
    );
  }

  const q = questions[i];
  const card = byId.get(q.cardId)!;
  const answered = chosen !== null;

  function pick(o: string) {
    if (answered) return;
    setChosen(o);
    if (o === q.answer) setScore((n) => n + 1);
  }

  function next() {
    if (i < questions.length - 1) {
      setI(i + 1);
      setChosen(null);
      return;
    }
    setDone(true);
    setNote("saving");
    saveQuiz("weekly", week, score, questions.length, localDay())
      .then(setNote)
      .catch(() => setNote({ ok: false, xp: 0, error: "Could not save. Check your connection." }));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/group" aria-label="Leave the quiz" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-pri-dark shadow-[0_2px_0_var(--color-line)]"><Icon name="back" size={20} /></Link>
        <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-black/10" role="progressbar" aria-valuenow={i + 1} aria-valuemin={0} aria-valuemax={questions.length}>
          <div className="h-full rounded-full bg-[#2e9b4a] transition-[width]" style={{ width: `${((i + (answered ? 1 : 0)) / questions.length) * 100}%` }} />
        </div>
        <span className="text-sm font-extrabold text-muted">{i + 1}/{questions.length}</span>
      </div>

      <div className="rounded-[26px] border-2 border-line bg-white p-6 text-center shadow-[0_5px_0_var(--color-line)]">
        <p className="text-sm font-extrabold uppercase tracking-wider text-pri">{q.kind === "listen" ? "Listen and choose the German word" : "What does this mean?"}</p>
        {q.kind === "listen" ? (
          <button onClick={() => say(q.prompt)} aria-label="Play the word" className="mt-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-pri text-white shadow-[0_4px_0_var(--color-pri-dark)]"><Icon name="volume" size={30} /></button>
        ) : (
          <div className="mt-4 flex flex-col items-center gap-3">
            <Pic pic={picFor(card.id)} size={44} />
            <p className="font-display text-3xl font-extrabold">{q.prompt}</p>
            <button onClick={() => say(q.prompt)} className="inline-flex h-10 items-center gap-2 rounded-full bg-pill px-4 text-sm font-extrabold text-pri"><Icon name="volume" size={18} /> Listen</button>
          </div>
        )}
      </div>

      <div className="grid gap-2.5">
        {q.options!.map((o) => {
          const style = !answered
            ? "border-line bg-white"
            : o === q.answer
              ? "border-ok bg-ok-bg text-ok"
              : o === chosen
                ? "border-bad bg-bad-bg text-bad"
                : "border-line bg-white text-muted opacity-70";
          return (
            <button key={o} disabled={answered} onClick={() => pick(o)} className={`min-h-14 rounded-2xl border-2 border-b-4 px-4 py-3 text-left text-[17px] font-extrabold ${style}`}>{o}</button>
          );
        })}
      </div>

      {answered && (
        <p role="status" className={`pop rounded-2xl p-4 font-extrabold ${chosen === q.answer ? "bg-ok-bg text-ok" : "bg-bad-bg text-bad"}`}>
          {chosen === q.answer ? "Richtig!" : `Not quite. Correct answer: ${q.answer}`}
        </p>
      )}
      {answered && <button onClick={next} className="btn3d">{i < questions.length - 1 ? "Continue" : "Finish"}</button>}
      {voiceNote && <p role="alert" className="rounded-2xl bg-butter p-3 text-sm text-butter-ink">{voiceNote}</p>}
    </div>
  );
}
