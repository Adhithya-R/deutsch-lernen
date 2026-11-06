"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { saveQuiz } from "@/app/actions";
import Icon from "@/components/Icon";
import type { PTask } from "@/components/PracticeRunner";
import SaveNote, { type SaveState } from "@/components/SaveNote";
import SpeakButton from "@/components/SpeakButton";
import type { SpeakPart, WriteTask } from "@/content/exam";
import { localDay } from "@/lib/activity";
import { analyse } from "@/lib/writing";

type Stage = "intro" | "reading" | "listening" | "writing" | "speaking" | "result";
const ORDER: Stage[] = ["intro", "reading", "listening", "writing", "speaking", "result"];
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const MAX_PLAYS = 2; // like the real exam: each recording twice

type Props = {
  level: string;
  name: string;
  reading: PTask[];
  listening: PTask[];
  writing: WriteTask;
  speaking: SpeakPart[];
  minutes: { reading: number; listening: number; writing: number };
};

/** A whole practice exam in the real order, with a timer for each part. Nothing is marked until the end. */
export default function FullMock({ level, name, reading, listening, writing, speaking, minutes }: Props) {
  const [stage, setStage] = useState<Stage>("intro");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [text, setText] = useState("");
  const [plays, setPlays] = useState<Record<string, number>>({});
  const [left, setLeft] = useState(0);
  const [note, setNote] = useState<SaveState>(null);
  const [audioError, setAudioError] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);

  const timed = stage === "reading" || stage === "listening" || stage === "writing";

  const deadline = useRef(0);

  const { reading: mReading, listening: mListening, writing: mWriting } = minutes;
  const go = useCallback(
    (to: Stage) => {
      audio.current?.pause();
      setStage(to);
      const mins = to === "reading" ? mReading : to === "listening" ? mListening : to === "writing" ? mWriting : 0;
      deadline.current = mins ? Date.now() + mins * 60_000 : 0;
      setLeft(mins * 60);
      window.scrollTo({ top: 0 });
    },
    [mReading, mListening, mWriting],
  );
  const next = () => go(ORDER[ORDER.indexOf(stage) + 1]);

  useEffect(() => {
    if (!timed) return;
    const id = setInterval(() => {
      const remaining = Math.ceil((deadline.current - Date.now()) / 1000);
      setLeft(Math.max(0, remaining));
      if (remaining <= 0) go(ORDER[ORDER.indexOf(stage) + 1]); // time is up: the next part starts
    }, 500);
    return () => clearInterval(id);
  }, [timed, stage, go]);

  const items = (tasks: PTask[]) => tasks.flatMap((t) => t.items.map((it, i) => ({ id: `${t.id}:${i}`, it })));
  const correct = (tasks: PTask[]) => items(tasks).filter((a) => answers[a.id] === a.it.answer).length;

  function play(key: string) {
    if ((plays[key] ?? 0) >= MAX_PLAYS) return;
    setAudioError(false);
    audio.current?.pause();
    const a = new Audio(`/audio/${key}.mp3`);
    audio.current = a;
    a.play().then(
      () => setPlays((p) => ({ ...p, [key]: (p[key] ?? 0) + 1 })),
      () => setAudioError(true),
    );
  }

  /* ---------- the parts ---------- */
  const clock = timed && (
    <p role="timer" className={`sticky top-2 z-10 rounded-2xl p-3 text-center font-display text-lg font-extrabold shadow-[0_3px_0_var(--color-line)] ${left <= 60 ? "bg-bad-bg text-bad" : "bg-white"}`}>
      {stage === "reading" ? "Reading" : stage === "listening" ? "Listening" : "Writing"} · {fmt(Math.max(0, left))}
    </p>
  );

  const questions = (tasks: PTask[], listen: boolean) => (
    <div className="flex flex-col gap-5">
      {tasks.map((t) => (
        <section key={t.id} className="rounded-3xl bg-white p-4 shadow-[0_3px_0_var(--color-line)]">
          <h2 className="text-lg font-extrabold">{t.title}</h2>
          <p className="text-sm text-muted">{t.instruction}</p>
          {t.texts?.map((tx) => (
            <div key={tx.label} className="mt-3 rounded-2xl bg-sand p-3.5">
              <p className="text-xs font-extrabold uppercase tracking-wider text-pri">{tx.label}</p>
              {tx.lines.map((l, i) => <p key={i} className="mt-1 leading-relaxed">{l}</p>)}
            </div>
          ))}
          {listen && t.clips && (
            <div className="mt-3 flex flex-wrap gap-2">
              {t.clips.map((c) => {
                const n = plays[c.key] ?? 0;
                return (
                  <button key={c.key} onClick={() => play(c.key)} disabled={n >= MAX_PLAYS} className="inline-flex h-11 items-center gap-2 rounded-full bg-pill px-4 text-sm font-extrabold text-pri-dark disabled:opacity-50">
                    <Icon name="volume" size={18} /> {c.label}
                    <span className="text-xs font-semibold text-muted">· {MAX_PLAYS - n} left</span>
                  </button>
                );
              })}
            </div>
          )}
          <div className="mt-4 flex flex-col gap-4">
            {t.items.map((it, i) => {
              const id = `${t.id}:${i}`;
              return (
                <div key={id}>
                  <p className="font-extrabold">{i + 1}. {it.q}</p>
                  <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={`Answer ${i + 1}`}>
                    {it.options.map((o) => {
                      const sel = answers[id] === o;
                      return (
                        <button key={o} aria-pressed={sel} onClick={() => setAnswers((a) => ({ ...a, [id]: o }))} className={`min-h-11 rounded-full border-2 px-4 text-[15px] ${sel ? "border-pri bg-pill font-extrabold text-pri-dark" : "border-line"}`}>
                          {o}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );

  const nextBar = (label: string, disabled = false) => (
    <button onClick={next} disabled={disabled} className="btn3d mt-5 disabled:opacity-40">{label}</button>
  );

  if (stage === "intro") {
    const rows = [
      ["Reading", `${minutes.reading} min`, `${items(reading).length} questions`],
      ["Listening", `${minutes.listening} min`, `${items(listening).length} questions, each recording twice`],
      ["Writing", `${minutes.writing} min`, "one text"],
      ["Speaking", "about 15 min", "practise aloud with the cards"],
    ];
    return (
      <div className="space-y-4">
        <div className="rounded-3xl bg-white p-5 shadow-[0_3px_0_var(--color-line)]">
          <h2 className="text-xl font-extrabold">{name} full practice exam</h2>
          <p className="mt-1 text-sm text-muted">The parts come in the real order. Each part has its own timer, and when time runs out the next part begins. Nothing is marked until the end. Do not use the tips. Find a quiet place and turn on your sound.</p>
          <ul className="mt-4 divide-y divide-line">
            {rows.map(([a, b, c]) => (
              <li key={a} className="flex items-baseline justify-between gap-3 py-2.5">
                <span className="font-extrabold">{a}</span>
                <span className="text-right text-sm text-muted">{b} · {c}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">Times are close to the real exam but can change. About 60% would be a pass.</p>
        </div>
        <button onClick={next} className="btn3d">Start the exam</button>
      </div>
    );
  }

  if (stage === "reading") return <div>{clock}<div className="mt-4">{questions(reading, false)}</div>{nextBar("Finish reading and continue")}</div>;

  if (stage === "listening") {
    return (
      <div>
        {clock}
        <p className="mt-4 rounded-2xl bg-butter p-3.5 text-sm text-butter-ink">Press a button to hear a recording. You can play each one twice. Read the answers first.</p>
        {audioError && <p role="alert" className="mt-3 rounded-2xl bg-butter p-3 text-sm text-butter-ink">This recording could not be played. Check your connection and try again.</p>}
        <div className="mt-4">{questions(listening, true)}</div>
        {nextBar("Finish listening and continue")}
      </div>
    );
  }

  if (stage === "writing") {
    const a = analyse(text, writing.min, writing.max);
    return (
      <div>
        {clock}
        <section className="mt-4 rounded-3xl bg-white p-4 shadow-[0_3px_0_var(--color-line)]">
          <h2 className="text-lg font-extrabold">{writing.title}</h2>
          <p className="mt-1">{writing.situation}</p>
          <ul className="mt-2 list-disc pl-5 text-sm">{writing.points.map((p) => <li key={p}>{p}</li>)}</ul>
          <label className="sr-only" htmlFor="mock-text">Your text</label>
          <textarea id="mock-text" value={text} onChange={(e) => setText(e.target.value)} rows={9} spellCheck={false} className="mt-3 w-full rounded-2xl border-2 border-line p-3 text-[16px] outline-none focus:border-pri" placeholder="Write here in German…" />
          <p className="mt-1 text-sm font-extrabold text-muted">{a.words} words · aim for {writing.min}–{writing.max}</p>
        </section>
        {nextBar("Finish writing and continue")}
      </div>
    );
  }

  if (stage === "speaking") {
    return (
      <div className="space-y-4">
        <p className="rounded-2xl bg-butter p-3.5 text-sm text-butter-ink">Speaking is done with a partner in the real exam. Say each answer aloud yourself first, then open the model answer and listen.</p>
        {speaking.map((part) => (
          <section key={part.title} className="rounded-3xl bg-white p-4 shadow-[0_3px_0_var(--color-line)]">
            <h2 className="text-lg font-extrabold">{part.title}</h2>
            <p className="text-sm text-muted">{part.how}</p>
            <div className="mt-3 flex flex-col gap-2.5">
              {part.cards.map((c) => (
                <details key={c.hint + c.say} className="rounded-2xl bg-sand p-3">
                  <summary className="cursor-pointer font-extrabold">{c.hint}</summary>
                  <div className="mt-2 flex items-start justify-between gap-2"><p>{c.reply ?? c.say}</p><SpeakButton text={c.reply ?? c.say} /></div>
                </details>
              ))}
            </div>
          </section>
        ))}
        <button
          onClick={() => {
            const rs = items(reading).length + items(listening).length;
            const right = correct(reading) + correct(listening);
            const wa = analyse(text, writing.min, writing.max);
            const writingPoints = Number(wa.length === "ok") + Number(wa.greeting) + Number(wa.closing);
            setNote("saving");
            saveQuiz("mock", `${level}-full`, right + writingPoints, rs + 3, localDay())
              .then(setNote)
              .catch(() => setNote({ ok: false, xp: 0, error: "Could not save. Check your connection." }));
            next();
          }}
          className="btn3d"
        >
          Finish the exam and see my result
        </button>
      </div>
    );
  }

  /* ---------- result ---------- */
  const rItems = items(reading), lItems = items(listening);
  const rRight = correct(reading), lRight = correct(listening);
  const wa = analyse(text, writing.min, writing.max);
  const wPoints = Number(wa.length === "ok") + Number(wa.greeting) + Number(wa.closing);
  const totalRight = rRight + lRight + wPoints;
  const total = rItems.length + lItems.length + 3;
  const pct = Math.round((totalRight / total) * 100);
  const pass = pct >= 60;
  const wrong = [...rItems, ...lItems].filter((a) => answers[a.id] !== a.it.answer);
  const bar = (label: string, got: number, of: number) => (
    <div>
      <div className="flex justify-between text-sm font-extrabold"><span>{label}</span><span>{got} / {of}</span></div>
      <div className="mt-1 h-3 overflow-hidden rounded-full bg-black/10"><div className={`h-full rounded-full ${got / of >= 0.6 ? "bg-[#2e9b4a]" : "bg-[#d64545]"}`} style={{ width: `${(got / of) * 100}%` }} /></div>
    </div>
  );
  return (
    <div className="space-y-4">
      <div className="pop rounded-3xl bg-white p-6 text-center shadow-[0_3px_0_var(--color-line)]">
        <Icon name={pass ? "checkc" : "info"} size={44} className={`mx-auto ${pass ? "text-ok" : "text-pri"}`} />
        <p className="mt-2 font-display text-3xl font-extrabold">{pct}%</p>
        <p className="mt-1 font-extrabold">{pass ? "Bestanden! This would be a pass." : "Not yet at 60%. Keep practising."}</p>
        <div className="mt-3 flex justify-center"><SaveNote state={note} savedText="Result saved" /></div>
      </div>
      <section className="space-y-3 rounded-3xl bg-white p-4 shadow-[0_3px_0_var(--color-line)]">
        {bar("Reading", rRight, rItems.length)}
        {bar("Listening", lRight, lItems.length)}
        {bar("Writing checks", wPoints, 3)}
        <ul className="text-sm">
          <li className={wa.length === "ok" ? "text-ok" : "text-bad"}>Length: {wa.words} words (aim for {writing.min}–{writing.max})</li>
          <li className={wa.greeting ? "text-ok" : "text-bad"}>Greeting at the start: {wa.greeting ? "yes" : "missing"}</li>
          <li className={wa.closing ? "text-ok" : "text-bad"}>Closing at the end: {wa.closing ? "yes" : "missing"}</li>
        </ul>
        <p className="text-xs text-muted">The writing checks are automatic. Ask your teacher to read your text for grammar and content.</p>
      </section>
      {wrong.length > 0 && (
        <section className="rounded-3xl bg-white p-4 shadow-[0_3px_0_var(--color-line)]">
          <h2 className="text-lg font-extrabold">Check these answers</h2>
          <ul className="mt-2 flex flex-col gap-3">
            {wrong.map((w) => (
              <li key={w.id} className="text-sm">
                <p className="font-extrabold">{w.it.q}</p>
                <p className="text-bad">{answers[w.id] ? `Your answer: ${answers[w.id]}` : "Not answered"}</p>
                <p className="text-ok">Correct: {w.it.answer}</p>
                {w.it.tip && <p className="text-muted">{w.it.tip}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}
      <div className="grid grid-cols-2 gap-3">
        <Link href={`/exam/${level}`} className="btn3d btn3d-ghost">Back to {name}</Link>
        <Link href="/" className="btn3d">Home</Link>
      </div>
    </div>
  );
}
