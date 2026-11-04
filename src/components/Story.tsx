"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import Skyline from "@/components/Skyline";
import { useSpeak } from "@/components/useSpeak";
import { preload } from "@/lib/speak";
import type { Chapter } from "@/content/chapters";

const plain = (parts: Chapter["lines"][number]["parts"]) => parts.map((p) => (typeof p === "string" ? p : p.t)).join("");

export default function Story({ chapter }: { chapter: Chapter }) {
  const [step, setStep] = useState(0);
  const [sheet, setSheet] = useState<string | null>(null);
  const { say, note } = useSpeak();
  const last = step >= chapter.lines.length - 1;
  const word = sheet ? chapter.words[sheet] : null;

  useEffect(() => {
    chapter.lines.slice(step, step + 3).forEach((l) => preload(plain(l.parts)));
  }, [chapter, step]);

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col">
      <Skyline ids={chapter.landmarks} mood={chapter.mood} height={150}>
        <div className="absolute inset-x-0 top-0 flex items-center gap-3 px-4 pt-3">
          <Link href="/" aria-label="Close story" className="grid h-10 w-10 place-items-center rounded-xl bg-white/75 text-pri-dark">
            <Icon name="x" size={20} />
          </Link>
          <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-black/10" role="progressbar" aria-valuenow={step + 1} aria-valuemin={0} aria-valuemax={chapter.lines.length + 1}>
            <div className="h-full rounded-full bg-[#2e9b4a] transition-[width]" style={{ width: `${((step + 1) / (chapter.lines.length + 1)) * 100}%` }} />
          </div>
        </div>
      </Skyline>

      <div className="flex-1 px-4 pt-5">
        <p className="text-[13px] font-extrabold uppercase tracking-wider text-pri">Chapter {chapter.n} · {chapter.sub}</p>
        <h1 className="text-3xl font-extrabold">{chapter.title}</h1>

        <div className="mt-5 flex flex-col gap-3.5">
          {chapter.lines.slice(0, step + 1).map((l, i) => {
            const me = l.who === "a";
            const sp = chapter.speakers[l.who];
            return (
              <div key={i} className={`pop flex items-end gap-2.5 ${me ? "flex-row-reverse" : ""}`}>
                <div
                  title={sp.name}
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-b-4 border-black/25 font-display text-lg font-extrabold text-white ${me ? "bg-pri" : "bg-[#8a6500]"}`}
                >
                  {sp.initial}
                </div>
                <div className={`max-w-[80%] rounded-3xl p-3.5 shadow-[0_3px_0_var(--color-line)] ${me ? "rounded-br-md bg-pill" : "rounded-bl-md bg-white"}`}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[17.5px] font-extrabold leading-relaxed">
                      {l.parts.map((p, j) =>
                        typeof p === "string" ? (
                          <span key={j}>{p}</span>
                        ) : (
                          <button
                            key={j}
                            onClick={() => setSheet(p.k)}
                            className="border-b-2 border-dotted border-pri font-extrabold text-pri"
                          >
                            {p.t}
                          </button>
                        ),
                      )}
                    </p>
                    <button
                      onClick={() => say(plain(l.parts))}
                      aria-label={`Listen: ${plain(l.parts)}`}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/70 text-pri"
                    >
                      <Icon name="volume" size={18} />
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-muted">{l.en}</p>
                  <p lang="ta" className="ta-only mt-0.5 text-sm text-muted">{l.ta}</p>
                </div>
              </div>
            );
          })}

          {last && (
            <div className="pop rounded-3xl bg-white p-4 shadow-[0_3px_0_var(--color-line)]">
              <span className="rounded-lg bg-pill px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider text-pri-dark">Brücke · two cultures</span>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <p><b>Tamil Nadu</b><br />{chapter.culture.tn}</p>
                <p><b>Germany</b><br />{chapter.culture.de}</p>
              </div>
            </div>
          )}
          {!last && <p className="text-sm text-muted">Tap an underlined word to see what it means.</p>}
        </div>
      </div>

      <div className="sticky bottom-0 bg-gradient-to-t from-tab-bg from-70% to-transparent px-4 pb-5 pt-3" style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}>
        {note && <p role="alert" className="mb-2 rounded-2xl bg-butter p-3 text-sm text-butter-ink">{note}</p>}
        {last ? (
          <Link href={`/learn/${chapter.slug}/check`} className="btn3d">Test yourself <Icon name="arrow" size={20} /></Link>
        ) : (
          <button onClick={() => setStep((s) => s + 1)} className="btn3d">Continue</button>
        )}
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)} className="mt-2 w-full rounded-2xl py-2.5 text-sm font-extrabold text-pri-dark">
            Back
          </button>
        )}
      </div>

      {word && (
        <div className="fixed inset-0 z-50 mx-auto flex max-w-md items-end bg-ink/45" onClick={() => setSheet(null)}>
          <div className="sheet-up w-full rounded-t-[28px] bg-white p-5 pb-8" role="dialog" aria-label={word.de} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2">
              {word.pic && <span aria-hidden="true" className="pic-bob text-4xl">{word.pic}</span>}
              <h2 className="text-2xl font-extrabold">{word.de}</h2>
              <button onClick={() => say(word.de)} aria-label="Listen" className="grid h-9 w-9 place-items-center rounded-full bg-pill text-pri">
                <Icon name="volume" size={18} />
              </button>
            </div>
            <p className="mt-1 text-xl font-extrabold">{word.en}</p>
            <p lang="ta" className="ta-only text-xl">{word.ta}</p>
            <div className="mt-4 rounded-2xl bg-pill p-3.5">
              <p className="font-extrabold">{word.ex}</p>
              <p className="text-sm">{word.exEn}</p>
              <p lang="ta" className="ta-only text-sm">{word.exTa}</p>
            </div>
            <button onClick={() => setSheet(null)} className="btn3d mt-4">Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}
