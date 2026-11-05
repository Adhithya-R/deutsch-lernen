// Compares what the learner said (from speech recognition) with the German sentence.
import { norm } from "./deck-quiz.ts";

export type WordResult = { word: string; ok: boolean };
export type MatchResult = { words: WordResult[]; score: number; pass: boolean };

export const PASS_AT = 0.7;

function distance(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)] as number[]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

/** A word counts as said if it was heard, allowing one wrong letter in longer words (recognition is not perfect). */
const same = (a: string, b: string) => a === b || (a.length >= 5 && b.length >= 5 && distance(a, b) <= 1);

/** Each spoken word can match only one target word, so repeating a word does not help. */
export function matchSpeech(target: string, heard: string): MatchResult {
  const spoken = norm(heard).split(" ").filter(Boolean);
  const used = new Array(spoken.length).fill(false);
  const shown = target.split(/\s+/).filter(Boolean);
  const words = shown.map((word) => {
    const t = norm(word);
    if (!t) return { word, ok: true }; // a lone symbol such as "…"
    const i = spoken.findIndex((s, k) => !used[k] && same(s, t));
    if (i >= 0) used[i] = true;
    return { word, ok: i >= 0 };
  });
  const counted = words.filter((w) => norm(w.word));
  const score = counted.length ? counted.filter((w) => w.ok).length / counted.length : 0;
  return { words, score, pass: score >= PASS_AT };
}

/** The best of several recognition guesses. */
export function bestMatch(target: string, guesses: string[]): MatchResult {
  return guesses.map((g) => matchSpeech(target, g)).reduce((a, b) => (b.score > a.score ? b : a), matchSpeech(target, ""));
}
