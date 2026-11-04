"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { reviewCard, type SaveResult } from "@/app/actions";
import Icon from "@/components/Icon";
import Pic from "@/components/Pic";
import SaveNote from "@/components/SaveNote";
import { useSpeak } from "@/components/useSpeak";
import { cards as ALL, type Card } from "@/content/vocab";
import { picFor } from "@/content/pics";
import { localDay } from "@/lib/activity";
import { buildQuestion, gradeFor, isRight, kindFor, type Q } from "@/lib/deck-quiz";

type Props = { ids: string[]; title: string; learn: boolean; loggedIn: boolean; back: string };
type Feedback = { right: boolean; answer: string } | null;

const byId = new Map(ALL.map((c) => [c.id, c]));

export default function DeckStudy({ ids, title, learn, loggedIn, back }: Props) {
  const deck = useMemo(() => ids.map((i) => byId.get(i)).filter((c): c is Card => !!c), [ids]);
  const [phase, setPhase] = useState<"learn" | "test" | "done">(learn ? "learn" : "test");
  const [i, setI] = useState(0);

  const { say, note } = useSpeak();
  const [queue, setQueue] = useState<Q[]>(() => deck.map((c, n) => buildQuestion(c, kindFor(n), deck, ALL)));
  const total = deck.length;
  const attempts = useRef(new Map<string, number>());
  const rounds = useRef(new Map<string, number>());
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [typed, setTyped] = useState("");
  const [saves, setSaves] = useState<SaveResult[]>([]);
  const [solved, setSolved] = useState(0);
  const [firstTry, setFirstTry] = useState(0);

  if (total === 0) {
    return (
      <p className="rounded-2xl bg-white p-5 text-muted shadow-[0_3px_0_var(--color-line)]">
        Nothing to study here yet. <Link href="/flashcards" className="font-extrabold text-pri underline">Pick a deck</Link>.
      </p>
    );
  }

  const top = (value: number) => (
    <div className="flex items-center gap-3">
      <Link href={back} aria-label="Leave and go back" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-pri-dark shadow-[0_2px_0_var(--color-line)]">
        <Icon name="back" size={20} />
      </Link>
      <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-black/10" role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-[#2e9b4a] transition-[width]" style={{ width: `${value * 100}%` }} />
      </div>
      <Link href="/" aria-label="Home" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-pri-dark shadow-[0_2px_0_var(--color-line)]">
        <Icon name="home" size={20} />
      </Link>
    </div>
  );

  /* ---------- learn: look at each word, with its picture, sound and meaning ---------- */
  if (phase === "learn") {
    const c = deck[i];
    return (
      <div className="space-y-4">
        {top((i + 1) / (total + 1))}
        <p className="text-sm font-extrabold text-muted">{title} · word {i + 1} of {total}</p>
        <div className="pop rounded-[26px] border-2 border-line bg-white p-6 shadow-[0_5px_0_var(--color-line)]">
          <div className="flex items-center gap-4">
            <Pic pic={picFor(c.id)} size={56} />
            <div className="min-w-0">
              <p className="font-display text-3xl font-extrabold leading-tight">{c.de}</p>
              <button onClick={() => say(c.de)} className="mt-2 inline-flex h-10 items-center gap-2 rounded-full bg-pill px-4 text-sm font-extrabold text-pri">
                <Icon name="volume" size={18} /> Listen
              </button>
            </div>
          </div>
          <div className="mt-4 border-t-2 border-line pt-4">
            <p className="text-xl font-extrabold">{c.en}</p>
            <p lang="ta" className="ta-only text-xl">{c.ta}</p>
          </div>
          {c.example && (
            <button onClick={() => say(c.example!.de)} className="mt-4 w-full rounded-2xl bg-pill p-3 text-left text-sm">
              <span className="font-extrabold">{c.example.de}</span>
              <span className="mt-0.5 block">{c.example.en}</span>
              <span lang="ta" className="ta-only block">{c.example.ta}</span>
            </button>
          )}
        </div>
        {note && <p role="alert" className="rounded-2xl bg-butter p-3 text-sm text-butter-ink">{note}</p>}
        <div className="grid grid-cols-[1fr_2fr] gap-3">
          <button onClick={() => setI((n) => n - 1)} disabled={i === 0} className="btn3d btn3d-ghost disabled:opacity-40">Back</button>
          {i < total - 1 ? (
            <button onClick={() => setI((n) => n + 1)} className="btn3d">Next</button>
          ) : (
            <button onClick={() => { setPhase("test"); setI(0); }} className="btn3d">Start the test</button>
          )}
        </div>
      </div>
    );
  }

  /* ---------- done ---------- */
  if (phase === "done" || queue.length === 0) {
    const xp = saves.reduce((s, r) => s + (r.ok ? r.xp : 0), 0);
    const firstError = saves.find((r) => !r.ok);
    return (
      <div className="space-y-4">
        {top(1)}
        <div className="pop rounded-3xl bg-white p-7 text-center shadow-[0_3px_0_var(--color-line)]">
          <Icon name="checkc" size={44} className="mx-auto text-ok" />
          <p className="mt-3 font-display text-2xl font-extrabold">Super gemacht!</p>
          <p className="mt-1 text-muted">{firstTry} of {total} words right on the first try.</p>
          <div className="mt-3 flex justify-center">
            <SaveNote state={loggedIn ? (firstError ?? { ok: true, xp }) : { ok: false, xp: 0, error: "Log in to save." }} savedText="Progress saved" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link href={back} className="btn3d btn3d-ghost">All decks</Link>
          <Link href="/" className="btn3d">Home</Link>
        </div>
      </div>
    );
  }

  /* ---------- test ---------- */
  const q = queue[0];
  const card = byId.get(q.cardId)!;
  const progress = (solved + 1) / (total + 1);

  function finishCard(cardId: string, tries: number) {
    const grade = gradeFor(tries);
    setSolved((n) => n + 1);
    if (tries <= 1) setFirstTry((n) => n + 1);
    if (!loggedIn) return;
    reviewCard(cardId, grade, localDay())
      .then((r) => setSaves((s) => [...s, r]))
      .catch(() => setSaves((s) => [...s, { ok: false, xp: 0, error: "Could not save. Check your connection." }]));
  }

  function submit(given: string) {
    if (feedback) return;
    const tries = (attempts.current.get(q.cardId) ?? 0) + 1;
    attempts.current.set(q.cardId, tries);
    const right = isRight(q, given);
    setFeedback({ right, answer: q.kind === "meaning" ? card.en : card.de });
    if (right) finishCard(q.cardId, tries);
  }

  function next() {
    const right = feedback?.right;
    setFeedback(null);
    setTyped("");
    setQueue((rest) => {
      const [head, ...tail] = rest;
      if (right) return tail;
      // missed: ask again later, in a different way
      const n = (rounds.current.get(head.cardId) ?? 0) + 1;
      rounds.current.set(head.cardId, n);
      const again = buildQuestion(byId.get(head.cardId)!, kindFor(deck.findIndex((c) => c.id === head.cardId) + n), deck, ALL);
      return [...tail, again];
    });
    if (right && queue.length === 1) setPhase("done");
  }

  const heading =
    q.kind === "meaning" ? "What does this mean?" : q.kind === "listen" ? "Listen and choose the German word" : "Type the German word";

  return (
    <div className="space-y-4">
      {top(progress)}
      <p className="text-sm font-extrabold text-muted">{title} · {Math.max(total - solved, 0)} left</p>

      <div className="rounded-[26px] border-2 border-line bg-white p-6 text-center shadow-[0_5px_0_var(--color-line)]">
        <p className="text-sm font-extrabold uppercase tracking-wider text-pri">{heading}</p>
        {q.kind === "listen" ? (
          <button onClick={() => say(q.prompt)} className="mt-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-pri text-white shadow-[0_4px_0_var(--color-pri-dark)]" aria-label="Play the word">
            <Icon name="volume" size={30} />
          </button>
        ) : (
          <div className="mt-4 flex flex-col items-center gap-3">
            <Pic pic={picFor(card.id)} size={44} />
            <p className="font-display text-3xl font-extrabold leading-tight">{q.prompt}</p>
            {q.kind === "meaning" && (
              <button onClick={() => say(q.prompt)} className="inline-flex h-10 items-center gap-2 rounded-full bg-pill px-4 text-sm font-extrabold text-pri">
                <Icon name="volume" size={18} /> Listen
              </button>
            )}
          </div>
        )}
      </div>

      {q.options ? (
        <div className="grid gap-2.5">
          {q.options.map((o) => {
            const shown = !!feedback;
            const isAnswer = o === q.answer;
            const style = shown
              ? isAnswer
                ? "border-ok bg-ok-bg text-ok"
                : "border-line bg-white text-muted opacity-70"
              : "border-line bg-white active:translate-y-0.5";
            return (
              <button key={o} disabled={shown} onClick={() => submit(o)} className={`min-h-14 rounded-2xl border-2 border-b-4 px-4 py-3 text-left text-[17px] font-extrabold ${style}`}>
                {o}
              </button>
            );
          })}
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); if (typed.trim()) submit(typed); }} className="space-y-3">
          <label className="sr-only" htmlFor="typed">German word</label>
          <input
            id="typed"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            disabled={!!feedback}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="e.g. der Apfel"
            className="h-14 w-full rounded-2xl border-2 border-line bg-white px-4 text-lg font-extrabold outline-none focus:border-pri"
          />
          {!feedback && <button type="submit" disabled={!typed.trim()} className="btn3d disabled:opacity-40">Check</button>}
        </form>
      )}

      {feedback && (
        <div role="status" className={`pop rounded-2xl p-4 ${feedback.right ? "bg-ok-bg text-ok" : "bg-bad-bg text-bad"}`}>
          <p className="font-extrabold">{feedback.right ? "Richtig!" : `Not quite. Correct answer: ${feedback.answer}`}</p>
          {!feedback.right && <p className="mt-0.5 text-sm">You will see this word again.</p>}
        </div>
      )}
      {feedback && <button onClick={next} className="btn3d">Continue</button>}
      {note && <p role="alert" className="rounded-2xl bg-butter p-3 text-sm text-butter-ink">{note}</p>}
      {!loggedIn && <p className="text-center text-sm text-muted"><Link href="/login" className="font-extrabold text-pri underline">Log in</Link> to save your progress and earn XP.</p>}
    </div>
  );
}
