"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { submitChapter } from "@/app/actions";
import Icon from "@/components/Icon";
import Skyline from "@/components/Skyline";
import type { Chapter } from "@/content/chapters";

type Result = { score: number; total: number; passed: boolean; saved: boolean };

export default function ChapterCheck({ chapter, nextTitle }: { chapter: Chapter; nextTitle?: string }) {
  const [qi, setQi] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [order, setOrder] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState(false);
  const [pending, start] = useTransition();

  const q = chapter.quiz[qi];
  const given = q?.type === "choice" ? pick ?? "" : order.length ? `${order.join(" ")}${q.end}` : "";
  const ok = checked && given.toLowerCase() === q.answer.toLowerCase();

  function restart() {
    setQi(0); setPick(null); setOrder([]); setChecked(false); setAnswers([]); setResult(null); setError(false);
  }

  function next() {
    const all = [...answers, given];
    setAnswers(all);
    if (qi < chapter.quiz.length - 1) {
      setQi(qi + 1); setPick(null); setOrder([]); setChecked(false);
      return;
    }
    setError(false);
    start(async () => {
      try {
        setResult(await submitChapter(chapter.slug, all));
      } catch {
        setError(true);
      }
    });
  }

  if (result || pending) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col">
        <Skyline ids={chapter.landmarks} height={150} />
        <div className="px-4 pt-8 text-center">
          {!result ? (
            <p className="text-lg font-extrabold">Checking your answers…</p>
          ) : (
            <>
              <p className="font-display text-7xl font-extrabold leading-none text-pri">{result.score}/{result.total}</p>
              <h1 className="mt-2 text-3xl font-extrabold">{result.passed ? "Kapitel geschafft!" : "Almost there"}</h1>
              <p className="mt-2 text-muted">
                {result.passed
                  ? nextTitle
                    ? `You passed. “${nextTitle}” is next on your path.`
                    : "You passed. More chapters are coming soon."
                  : `You need ${chapter.pass} correct answers to unlock the next chapter. Read the story again and try once more.`}
              </p>
              {result.passed && !result.saved && (
                <p className="mt-3 rounded-2xl bg-butter p-3 text-sm text-butter-ink">
                  <Link href="/login" className="font-extrabold underline">Log in</Link> to save your progress and unlock the next chapter.
                </p>
              )}
              <div className="mt-6 flex flex-col gap-3">
                {result.passed ? (
                  <Link href="/" className="btn3d">Back to the path</Link>
                ) : (
                  <>
                    <button onClick={restart} className="btn3d">Try again</button>
                    <Link href={`/learn/${chapter.slug}`} className="btn3d btn3d-ghost">Read the story again</Link>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  const left = q.type === "order" ? q.tiles.filter((t) => !order.includes(t)) : [];
  const tile = "rounded-2xl border-2 border-b-[5px] border-line bg-white px-4 py-2 text-[17px] font-extrabold disabled:opacity-60";
  const progress = ((qi + (checked ? 1 : 0)) / chapter.quiz.length) * 100;

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col">
      <div className="flex items-center gap-3 px-4 pt-4">
        <Link href={`/learn/${chapter.slug}`} aria-label="Leave the check" className="grid h-10 w-10 place-items-center rounded-xl bg-white text-pri-dark">
          <Icon name="x" size={20} />
        </Link>
        <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-black/10" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-[#2e9b4a] transition-[width]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex-1 px-4 pt-6">
        <span className="rounded-lg bg-pill px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider text-pri-dark">
          Chapter check · {qi + 1} of {chapter.quiz.length}
        </span>
        <h1 className="mt-3 text-2xl font-extrabold leading-snug">{q.q}</h1>

        {q.type === "choice" ? (
          <div className="mt-5 flex flex-col gap-2.5" role="group" aria-label="Choose an answer">
            {q.options.map((o, i) => {
              const state = !checked
                ? o === pick ? "border-pri bg-pill" : "border-line bg-white"
                : o === q.answer ? "border-[#2e9b4a] bg-ok-bg"
                : o === pick ? "border-[#d64545] bg-bad-bg" : "border-line bg-white opacity-70";
              return (
                <button
                  key={o}
                  disabled={checked}
                  aria-pressed={o === pick}
                  onClick={() => setPick(o)}
                  className={`flex items-center gap-3 rounded-2xl border-2 border-b-[5px] p-3.5 text-left text-[17px] font-extrabold ${state}`}
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border-2 border-line text-[13px] text-muted">{i + 1}</span>
                  {o}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-5">
            <div className="flex min-h-16 flex-wrap content-start gap-2 border-b-2 border-line pb-3">
              {order.map((t) => (
                <button key={t} disabled={checked} onClick={() => setOrder(order.filter((x) => x !== t))} className={tile}>{t}</button>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {left.map((t) => (
                <button key={t} disabled={checked} onClick={() => setOrder([...order, t])} className={tile}>{t}</button>
              ))}
            </div>
          </div>
        )}
        {error && <p role="alert" className="mt-4 text-sm font-extrabold text-bad">Could not check your answers. Check your connection and tap Continue again.</p>}
      </div>

      {!checked ? (
        <div className="px-4 pt-3" style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}>
          <button className="btn3d" disabled={!given} onClick={() => setChecked(true)}>Check</button>
        </div>
      ) : (
        <div className={`sheet-up rounded-t-[24px] px-4 pt-4 ${ok ? "bg-ok-bg text-[#1b5e20]" : "bg-bad-bg text-[#8c1d18]"}`} style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }} role="status">
          <h2 className="flex items-center gap-2 text-xl font-extrabold">
            <Icon name={ok ? "checkc" : "crossc"} size={22} /> {ok ? "Richtig!" : "Not quite"}
          </h2>
          <p className="mb-3 mt-1 text-[15px]">
            {!ok && <>Answer: <b>{q.answer}</b><br /></>}
            {q.tipEn} <span lang="ta" className="ta-only">{q.tipTa}</span>
          </p>
          <button className={`btn3d ${ok ? "ok" : "bad"}`} onClick={next}>Continue</button>
        </div>
      )}
    </div>
  );
}
