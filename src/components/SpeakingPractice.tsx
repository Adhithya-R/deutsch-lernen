"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { saveQuiz } from "@/app/actions";
import Icon from "@/components/Icon";
import SaveNote, { type SaveState } from "@/components/SaveNote";
import { useSpeak } from "@/components/useSpeak";
import type { SpeakItem } from "@/content/speaking";
import { localDay } from "@/lib/activity";
import { bestMatch, type MatchResult } from "@/lib/speech-match";

// The browser's speech recognition (Chrome, Edge, Android). Not in the standard TypeScript types.
type Rec = {
  lang: string; interimResults: boolean; maxAlternatives: number; continuous: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void; stop: () => void;
};
const recognitionClass = (): (new () => Rec) | null => {
  const w = window as unknown as { SpeechRecognition?: new () => Rec; webkitSpeechRecognition?: new () => Rec };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};
const noop = () => () => {};
const ERRORS: Record<string, string> = {
  "not-allowed": "The microphone is blocked. Allow it for this site in your browser settings, then try again.",
  "service-not-allowed": "The microphone is blocked. Allow it for this site in your browser settings, then try again.",
  "no-speech": "I did not hear anything. Tap the microphone and speak clearly.",
  "audio-capture": "No microphone found. Check that one is connected.",
  network: "Speech recognition needs an internet connection. Check your connection and try again.",
};

export default function SpeakingPractice({ setId, items }: { setId: string; items: SpeakItem[] }) {
  const supported = useSyncExternalStore(noop, () => recognitionClass() !== null, () => true);
  const { say, note: voiceNote } = useSpeak();
  const [i, setI] = useState(0);
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const [passed, setPassed] = useState<Record<number, boolean>>({});
  const [done, setDone] = useState(false);
  const [save, setSave] = useState<SaveState>(null);
  const rec = useRef<Rec | null>(null);

  const item = items[i];
  const count = Object.values(passed).filter(Boolean).length;

  function listen() {
    const R = recognitionClass();
    if (!R || listening) return;
    setProblem(null);
    setResult(null);
    const r = new R();
    r.lang = "de-DE";
    r.interimResults = false;
    r.continuous = false;
    r.maxAlternatives = 3;
    r.onresult = (e) => {
      const guesses = Array.from(e.results[0] ?? []).map((a) => a.transcript);
      const m = bestMatch(item.de, guesses);
      setResult(m);
      setPassed((p) => ({ ...p, [i]: p[i] || m.pass }));
    };
    r.onerror = (e) => setProblem(ERRORS[e.error] ?? "Something went wrong with the microphone. Try again.");
    r.onend = () => setListening(false);
    rec.current = r;
    try {
      r.start();
      setListening(true);
    } catch {
      setProblem("Could not start the microphone. Try again.");
    }
  }

  function go(n: number) {
    rec.current?.stop();
    setListening(false);
    setResult(null);
    setProblem(null);
    setI(n);
  }

  function finish() {
    setDone(true);
    if (!supported) return;
    setSave("saving");
    saveQuiz("exam", `speak-${setId}`, count, items.length, localDay())
      .then(setSave)
      .catch(() => setSave({ ok: false, xp: 0, error: "Could not save. Check your connection." }));
  }

  if (done) {
    return (
      <div className="space-y-4">
        <div className="pop rounded-3xl bg-white p-7 text-center shadow-[0_3px_0_var(--color-line)]">
          <Icon name="checkc" size={44} className="mx-auto text-ok" />
          <p className="mt-3 font-display text-2xl font-extrabold">{supported ? `${count} / ${items.length} said well` : "Set finished"}</p>
          <p className="mt-1 text-muted">{supported ? "Practise the other sentences again any time." : "Your browser cannot check speaking, so this set was listen-and-repeat."}</p>
          <div className="mt-3 flex justify-center"><SaveNote state={save} savedText="Result saved" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/speaking" className="btn3d btn3d-ghost">All sets</Link>
          <Link href="/" className="btn3d">Home</Link>
        </div>
      </div>
    );
  }

  const last = i === items.length - 1;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/speaking" aria-label="Leave and go back" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-pri-dark shadow-[0_2px_0_var(--color-line)]"><Icon name="back" size={20} /></Link>
        <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-black/10" role="progressbar" aria-valuenow={i + 1} aria-valuemin={0} aria-valuemax={items.length}>
          <div className="h-full rounded-full bg-[#2e9b4a] transition-[width]" style={{ width: `${((i + 1) / items.length) * 100}%` }} />
        </div>
        <Link href="/" aria-label="Home" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-pri-dark shadow-[0_2px_0_var(--color-line)]"><Icon name="home" size={20} /></Link>
      </div>

      <div className="rounded-[26px] border-2 border-line bg-white p-6 text-center shadow-[0_5px_0_var(--color-line)]">
        <p className="text-sm font-extrabold uppercase tracking-wider text-pri">Sentence {i + 1} of {items.length}</p>
        <p className="mt-3 font-display text-2xl font-extrabold leading-snug">
          {result
            ? result.words.map((w, k) => <span key={k} className={w.ok ? "text-ok" : "text-bad"}>{w.word} </span>)
            : item.de}
        </p>
        <p className="mt-1 text-sm text-muted">{item.en}</p>
        <button onClick={() => say(item.de)} className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-pill px-5 text-sm font-extrabold text-pri">
          <Icon name="volume" size={18} /> Listen first
        </button>
      </div>

      {supported ? (
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={listen}
            disabled={listening}
            aria-label={listening ? "Listening" : "Say the sentence"}
            className={`grid h-20 w-20 place-items-center rounded-full text-white shadow-[0_5px_0_var(--color-pri-dark)] ${listening ? "nav-pulse-bg bg-bad" : "bg-pri"}`}
          >
            <Icon name="mic" size={34} />
          </button>
          <p className="text-sm font-extrabold text-muted" role="status">{listening ? "Listening… speak now" : result ? "" : "Tap and say the sentence"}</p>
        </div>
      ) : (
        <p role="status" className="rounded-2xl bg-butter p-3 text-sm text-butter-ink">
          This browser cannot check your speaking. Use Chrome or Edge to get feedback. For now: listen, say it aloud, and continue.
        </p>
      )}

      {result && (
        <p role="status" className={`pop rounded-2xl p-4 font-extrabold ${result.pass ? "bg-ok-bg text-ok" : "bg-bad-bg text-bad"}`}>
          {result.pass ? "Sehr gut!" : "Not quite. Red words were missing. Listen again and try once more."} ({Math.round(result.score * 100)}%)
        </p>
      )}
      {problem && <p role="alert" className="rounded-2xl bg-butter p-3 text-sm text-butter-ink">{problem}</p>}
      {voiceNote && <p role="alert" className="rounded-2xl bg-butter p-3 text-sm text-butter-ink">{voiceNote}</p>}

      <div className="grid grid-cols-[1fr_2fr] gap-3">
        <button onClick={() => go(i - 1)} disabled={i === 0} className="btn3d btn3d-ghost disabled:opacity-40">Back</button>
        {last ? <button onClick={finish} className="btn3d">Finish</button> : <button onClick={() => go(i + 1)} className="btn3d">{result || !supported ? "Next" : "Skip"}</button>}
      </div>
    </div>
  );
}
