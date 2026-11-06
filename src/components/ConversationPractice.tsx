"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { saveQuiz } from "@/app/actions";
import Icon from "@/components/Icon";
import SaveNote, { type SaveState } from "@/components/SaveNote";
import { useSpeak } from "@/components/useSpeak";
import type { Scenario } from "@/content/conversations";
import { localDay } from "@/lib/activity";
import { preload } from "@/lib/speak";

type Bubble = { who: "partner" | "me"; de: string; en: string; ta: string };

/** The partner speaks, you choose the reply that fits. A wrong reply can be tried again. */
export default function ConversationPractice({ scenario }: { scenario: Scenario }) {
  const { turns, partner } = scenario;
  const { say, note: voiceNote } = useSpeak();
  const [t, setT] = useState(0);
  const [chat, setChat] = useState<Bubble[]>([{ who: "partner", ...turns[0].partner }]);
  const [tried, setTried] = useState<number[]>([]); // wrong options already tried in this turn
  const [reveal, setReveal] = useState(false);
  const [firstTry, setFirstTry] = useState(0);
  const [done, setDone] = useState(false);
  const [save, setSave] = useState<SaveState>(null);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    turns.forEach((x) => x.options.forEach((o) => preload(o.de)));
    preload(turns[0].partner.de);
  }, [turns]);
  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat.length, tried.length]);

  const turn = turns[t];

  function choose(i: number) {
    const o = turn.options[i];
    if (tried.includes(i)) return;
    if (!o.ok) {
      const next = [...tried, i];
      setTried(next);
      if (next.length >= 2) setReveal(true); // after two misses, show the right reply
      return;
    }
    if (tried.length === 0) setFirstTry((n) => n + 1);
    say(o.de);
    const reply: Bubble = { who: "me", de: o.de, en: o.en, ta: "" };
    const last = t === turns.length - 1;
    setTried([]);
    setReveal(false);
    if (last) {
      setChat((c) => [...c, reply]);
      const score = firstTry + (tried.length === 0 ? 1 : 0);
      setDone(true);
      setSave("saving");
      saveQuiz("talk", `talk-${scenario.id}`, score, turns.length, localDay())
        .then(setSave)
        .catch(() => setSave({ ok: false, xp: 0, error: "Could not save. Check your connection." }));
      return;
    }
    const nextPartner = turns[t + 1].partner;
    setChat((c) => [...c, reply, { who: "partner", ...nextPartner }]);
    setT(t + 1);
    window.setTimeout(() => say(nextPartner.de), 1600); // let your own reply finish first
  }

  const score = firstTry;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Link href="/conversation" aria-label="Leave and go back" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-pri-dark shadow-[0_2px_0_var(--color-line)]"><Icon name="back" size={20} /></Link>
        <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-black/10" role="progressbar" aria-valuenow={done ? turns.length : t} aria-valuemin={0} aria-valuemax={turns.length}>
          <div className="h-full rounded-full bg-[#2e9b4a] transition-[width]" style={{ width: `${((done ? turns.length : t) / turns.length) * 100}%` }} />
        </div>
        <Link href="/" aria-label="Home" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-pri-dark shadow-[0_2px_0_var(--color-line)]"><Icon name="home" size={20} /></Link>
      </div>

      <div className="flex flex-col gap-3" aria-live="polite">
        {chat.map((b, i) => {
          const me = b.who === "me";
          return (
            <div key={i} className={`pop flex items-end gap-2.5 ${me ? "flex-row-reverse" : ""}`}>
              <div title={me ? "Adhi" : partner.name} className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-b-4 border-black/25 font-display text-lg font-extrabold text-white ${me ? "bg-pri" : "bg-[#8a6500]"}`}>
                {me ? "A" : partner.initial}
              </div>
              <div className={`max-w-[80%] rounded-3xl p-3.5 shadow-[0_3px_0_var(--color-line)] ${me ? "rounded-br-md bg-pill" : "rounded-bl-md bg-white"}`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[17px] font-extrabold leading-relaxed">{b.de}</p>
                  <button onClick={() => say(b.de)} aria-label={`Listen: ${b.de}`} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/70 text-pri"><Icon name="volume" size={18} /></button>
                </div>
                <p className="mt-1 text-sm text-muted">{b.en}</p>
                {b.ta && <p lang="ta" className="ta-only mt-0.5 text-sm text-muted">{b.ta}</p>}
              </div>
            </div>
          );
        })}
      </div>

      {!done && (
        <div>
          <p className="mb-2 text-sm font-extrabold uppercase tracking-wider text-pri">Choose your reply</p>
          <div className="grid gap-2.5">
            {turn.options.map((o, i) => {
              const wrong = tried.includes(i);
              const show = reveal && o.ok;
              const style = show ? "border-ok bg-ok-bg text-ok" : wrong ? "border-bad bg-bad-bg text-bad opacity-80" : "border-line bg-white active:translate-y-0.5";
              return (
                <button key={i} disabled={wrong} onClick={() => choose(i)} className={`min-h-14 rounded-2xl border-2 border-b-4 px-4 py-3 text-left text-[17px] font-extrabold ${style}`}>
                  {o.de}
                  {(wrong || show) && <span className="mt-0.5 block text-sm font-semibold">{o.en}</span>}
                </button>
              );
            })}
          </div>
          {tried.length > 0 && (
            <p role="status" className="mt-3 rounded-2xl bg-butter p-3 text-sm font-extrabold text-butter-ink">
              {reveal ? "This is the reply that fits. Tap it to continue." : "That reply does not fit the question. Read it again and try another."}
            </p>
          )}
        </div>
      )}

      {done && (
        <div className="space-y-4">
          <div className="pop rounded-3xl bg-white p-6 text-center shadow-[0_3px_0_var(--color-line)]">
            <Icon name="checkc" size={40} className="mx-auto text-ok" />
            <p className="mt-2 font-display text-2xl font-extrabold">{score} / {turns.length} right first time</p>
            <p className="mt-1 text-muted">{score === turns.length ? "Perfekt! Sehr gut gesprochen." : "Good conversation. Practise again to get them all first time."}</p>
            <div className="mt-3 flex justify-center"><SaveNote state={save} savedText="Result saved" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/conversation" className="btn3d btn3d-ghost">All talks</Link>
            <Link href="/" className="btn3d">Home</Link>
          </div>
        </div>
      )}
      {voiceNote && <p role="alert" className="rounded-2xl bg-butter p-3 text-sm text-butter-ink">{voiceNote}</p>}
      <div ref={bottom} />
    </div>
  );
}
