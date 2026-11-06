// "Practise again": quiz results with a low score, turned into a label and a link.
import { topics } from "../content/bruecke.ts";
import { scenarios } from "../content/conversations.ts";
import { lessons } from "../content/lessons.ts";
import { speakSets } from "../content/speaking.ts";

export type QuizRow = { kind: string; ref: string; score: number; total: number };
export type Weak = { label: string; href: string; pct: number };

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Where to practise this quiz again, or null if the quiz no longer exists. */
export function target(kind: string, ref: string): { label: string; href: string } | null {
  if (kind === "lesson") {
    const l = lessons.find((x) => x.slug === ref);
    return l ? { label: `Grammar: ${l.title.en}`, href: `/lessons/${ref}` } : null;
  }
  if (kind === "culture") {
    const t = topics.find((x) => `bruecke-${x.id}` === ref);
    return t ? { label: `Brücke: ${t.en}`, href: `/bruecke/${t.id}` } : null;
  }
  if (kind === "talk") {
    const s = scenarios.find((x) => `talk-${x.id}` === ref);
    return s ? { label: `Conversation: ${s.title}`, href: `/conversation/${s.id}` } : null;
  }
  if (kind === "weekly") return { label: "Weekly quiz", href: "/group/weekly" };
  if (kind === "exam" || kind === "mock") {
    const speak = speakSets.find((x) => `speak-${x.id}` === ref);
    if (speak) return { label: `Speaking: ${speak.title}`, href: `/speaking/${speak.id}` };
    const m = /^(a1|a2)-(reading|listening|mock)$/.exec(ref);
    if (m) return { label: `${m[1].toUpperCase()} ${m[2] === "mock" ? "mock test" : m[2]}`, href: `/exam/${m[1]}/${m[2]}` };
  }
  return null;
}

/** The weakest results first. Only quizzes with at least 3 questions and below 70% count. */
export function weakTopics(rows: QuizRow[], limit = 4): Weak[] {
  return rows
    .filter((r) => r.total >= 3 && r.score / r.total < 0.7)
    .map((r) => ({ t: target(r.kind, r.ref), pct: Math.round((r.score / r.total) * 100) }))
    .filter((x): x is { t: { label: string; href: string }; pct: number } => !!x.t)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, limit)
    .map((x) => ({ label: cap(x.t.label), href: x.t.href, pct: x.pct }));
}
