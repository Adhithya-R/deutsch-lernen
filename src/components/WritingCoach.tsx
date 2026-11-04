"use client";

import { useEffect, useRef, useState } from "react";
import { saveDraft } from "@/app/actions";
import Icon from "@/components/Icon";
import SaveNote, { type SaveState } from "@/components/SaveNote";
import SpeakButton from "@/components/SpeakButton";
import type { WriteTask } from "@/content/exam";
import { analyse } from "@/lib/writing";

const KEY = (id: string) => `draft-${id}`;

function Row({ ok, started, children }: { ok: boolean; started: boolean; children: React.ReactNode }) {
  return (
    <li className={`flex items-center gap-2 text-sm font-extrabold ${!started ? "text-muted" : ok ? "text-ok" : "text-bad"}`}>
      <Icon name={!started ? "chev" : ok ? "checkc" : "crossc"} size={18} /> {children}
    </li>
  );
}

// A writing task with a word counter, automatic checks (greeting, closing, length), a self-check list and a sample answer.
// The draft is saved in this browser only.
export default function WritingCoach({ task, initial, loggedIn }: { task: WriteTask; initial: string; loggedIn: boolean }) {
  const [text, setText] = useState(initial);
  const [ticked, setTicked] = useState<boolean[]>(task.points.map(() => false));
  const [save, setSave] = useState<SaveState>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (loggedIn) return; // logged-in drafts come from the server
    const raf = requestAnimationFrame(() => {
      try {
        const v = localStorage.getItem(KEY(task.id));
        if (v) setText(v);
      } catch {
        // private browsing: no saved draft
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [task.id, loggedIn]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function onChange(v: string) {
    setText(v);
    if (!loggedIn) {
      try {
        localStorage.setItem(KEY(task.id), v);
      } catch {
        // ignore
      }
      return;
    }
    if (timer.current) clearTimeout(timer.current);
    setSave("saving");
    timer.current = setTimeout(() => {
      saveDraft(task.id, v)
        .then(setSave)
        .catch(() => setSave({ ok: false, xp: 0, error: "Could not save your draft. Check your connection." }));
    }, 1200);
  }

  const a = analyse(text, task.min, task.max);
  const started = text.trim().length > 0;
  return (
    <section className="rounded-3xl bg-white p-4 shadow-[0_3px_0_var(--color-line)]">
      <h2 className="text-xl font-extrabold">{task.title}</h2>
      <p className="mt-2 rounded-2xl bg-sand p-3.5 leading-relaxed">{task.situation}</p>

      <p className="mt-3 text-sm font-extrabold">Cover all three points (tick when done):</p>
      <ul className="mt-1.5 flex flex-col gap-1.5">
        {task.points.map((p, i) => (
          <li key={p}>
            <label className="flex min-h-9 cursor-pointer items-center gap-2.5 text-[15px]">
              <input type="checkbox" checked={ticked[i]} onChange={() => setTicked(ticked.map((t, j) => (j === i ? !t : t)))} className="h-5 w-5 accent-[var(--tab-acc)]" />
              {p}
            </label>
          </li>
        ))}
      </ul>

      <label htmlFor={`text-${task.id}`} className="mt-4 block text-sm font-extrabold">Your {task.kind === "email" ? "email" : "message"}</label>
      <textarea
        id={`text-${task.id}`}
        value={text}
        onChange={(e) => onChange(e.target.value)}
        rows={7}
        spellCheck={false}
        autoCapitalize="sentences"
        placeholder="Write in German here…"
        className="mt-1 w-full rounded-2xl border-2 border-line bg-white p-3.5 text-[16px] leading-relaxed"
      />

      <ul className="mt-2 flex flex-col gap-1">
        <Row started={started} ok={a.length === "ok"}>
          {a.words} words · aim for {task.min}–{task.max}
          {started && a.length === "short" ? " (a little more)" : started && a.length === "long" ? " (a little shorter)" : ""}
        </Row>
        <Row started={started} ok={a.greeting}>Starts with a greeting (Liebe …, Hallo …, Sehr geehrte …)</Row>
        <Row started={started} ok={a.closing}>Ends with a closing (Viele Grüße, Liebe Grüße, Mit freundlichen Grüßen) and your name</Row>
        <li className={`flex items-center gap-2 text-sm font-extrabold ${ticked.every(Boolean) ? "text-ok" : "text-muted"}`}>
          <Icon name={ticked.every(Boolean) ? "checkc" : "chev"} size={18} /> All three points ticked ({ticked.filter(Boolean).length}/3)
        </li>
      </ul>
      <div className="mt-2">{loggedIn ? <SaveNote state={save} savedText="Draft saved" /> : <p className="text-xs text-muted">Your draft stays on this device. Log in to keep it on every device.</p>}</div>
      <p className="mt-2 text-xs text-muted">These checks cannot judge grammar or whether you answered each point. Compare with the sample answer and ask your teacher.</p>

      <details className="mt-3 rounded-2xl bg-pill p-3.5">
        <summary className="cursor-pointer font-extrabold">Show a sample answer</summary>
        <div className="mt-2 flex items-start justify-between gap-2">
          <p className="leading-relaxed">{task.sample}</p>
          <SpeakButton text={task.sample} />
        </div>
      </details>
    </section>
  );
}
