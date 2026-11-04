"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import type { Item, Text } from "@/content/exam";

export type PTask = {
  id: string;
  title: string;
  instruction: string;
  texts?: Text[];
  clips?: { key: string; label: string }[];
  items: Item[];
};

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

// Reading, listening and mock-test practice: answer everything, then check. Marked here in the browser (practice only).
export default function PracticeRunner({ tasks, minutes }: { tasks: PTask[]; minutes?: number }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [plays, setPlays] = useState<Record<string, number>>({});
  const [audioError, setAudioError] = useState(false);
  const [left, setLeft] = useState(minutes ? minutes * 60 : 0);
  const current = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!minutes || checked) return;
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [minutes, checked]);

  const all = tasks.flatMap((t) => t.items.map((it, i) => ({ id: `${t.id}:${i}`, it })));
  const score = all.filter((a) => answers[a.id] === a.it.answer).length;
  const answered = all.filter((a) => answers[a.id]).length;
  const percent = Math.round((score / all.length) * 100);

  function play(key: string) {
    setAudioError(false);
    current.current?.pause();
    const audio = new Audio(`/audio/${key}.mp3`);
    current.current = audio;
    audio.play().then(
      () => setPlays((p) => ({ ...p, [key]: (p[key] ?? 0) + 1 })),
      () => setAudioError(true),
    );
  }

  function reset() {
    setAnswers({});
    setChecked(false);
    setPlays({});
    setLeft(minutes ? minutes * 60 : 0);
  }

  return (
    <div className="flex flex-col gap-6">
      {minutes ? (
        <p className="rounded-2xl bg-white p-3 text-center font-display text-lg font-extrabold shadow-[0_3px_0_var(--color-line)]" role="timer">
          {checked ? "Finished" : left > 0 ? `Time left: ${fmt(left)}` : "Time is up. Finish your answers."}
        </p>
      ) : null}

      {tasks.map((t) => (
        <section key={t.id} className="rounded-3xl bg-white p-4 shadow-[0_3px_0_var(--color-line)]">
          <h2 className="text-xl font-extrabold">{t.title}</h2>
          <p className="text-sm text-muted">{t.instruction}</p>

          {t.texts?.map((tx) => (
            <div key={tx.label} className="mt-3 rounded-2xl bg-sand p-3.5">
              <p className="text-xs font-extrabold uppercase tracking-wider text-pri">{tx.label}</p>
              {tx.lines.map((l, i) => (
                <p key={i} className="mt-1 leading-relaxed">{l}</p>
              ))}
            </div>
          ))}

          {t.clips && (
            <div className="mt-3 flex flex-wrap gap-2">
              {t.clips.map((c) => (
                <button key={c.key} onClick={() => play(c.key)} className="inline-flex h-11 items-center gap-2 rounded-full bg-pill px-4 text-sm font-extrabold text-pri-dark">
                  <Icon name="volume" size={18} /> {c.label}
                  {plays[c.key] ? <span className="text-xs font-semibold text-muted">· played {plays[c.key]}×</span> : null}
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-col gap-4">
            {t.items.map((it, i) => {
              const id = `${t.id}:${i}`;
              const ok = checked && answers[id] === it.answer;
              return (
                <div key={id}>
                  <p className="font-extrabold">{i + 1}. {it.q}</p>
                  <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={`Answer ${i + 1}`}>
                    {it.options.map((o) => {
                      const sel = answers[id] === o;
                      const state = !checked
                        ? sel ? "border-pri bg-pill font-extrabold text-pri-dark" : "border-line hover:border-pri"
                        : o === it.answer ? "border-[#2e9b4a] bg-ok-bg font-extrabold text-ok"
                        : sel ? "border-[#d64545] bg-bad-bg text-bad" : "border-line opacity-60";
                      return (
                        <button key={o} disabled={checked} aria-pressed={sel} onClick={() => setAnswers({ ...answers, [id]: o })} className={`min-h-11 rounded-full border-2 px-4 text-[15px] ${state}`}>
                          {o}
                        </button>
                      );
                    })}
                  </div>
                  {checked && (
                    <p className={`mt-2 flex items-start gap-2 text-sm font-extrabold ${ok ? "text-ok" : "text-bad"}`} role="status">
                      <Icon name={ok ? "checkc" : "crossc"} size={18} className="mt-0.5 shrink-0" />
                      <span>
                        {ok ? "Richtig!" : answers[id] ? `Falsch. Answer: ${it.answer}` : `Not answered. Answer: ${it.answer}`}
                        {it.tip && <span className="block font-normal text-muted">{it.tip}</span>}
                      </span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {audioError && <p role="alert" className="rounded-2xl bg-butter p-3 text-sm text-butter-ink">This recording could not be played. Check your connection and try again.</p>}

      {!checked ? (
        <button className="btn3d" disabled={answered === 0} onClick={() => setChecked(true)}>
          Check my answers ({answered}/{all.length})
        </button>
      ) : (
        <div className="rounded-3xl bg-butter p-5 text-center text-butter-ink">
          <p className="font-display text-5xl font-extrabold">{score}/{all.length}</p>
          <p className="mt-1 text-lg font-extrabold">{percent}%</p>
          <p className="mt-2">
            {percent >= 60 ? "Gut gemacht! In the real exam about 60% is needed to pass, so this would be a pass." : "Keep practising. In the real exam about 60% is needed to pass. Read the tips and try again."}
          </p>
          <button className="btn3d mt-4" onClick={reset}>Try again</button>
        </div>
      )}
    </div>
  );
}
