// Logic for flashcard practice: building questions, checking typed answers, and grading a card.
// Pure functions so they can be tested without a browser.

export type Kind = "meaning" | "listen" | "type";
export type Q = { cardId: string; kind: Kind; prompt: string; options?: string[]; answer: string };
type C = { id: string; de: string; en: string };

/** Lower case, no punctuation, umlauts and ß folded, so "Grüße" and "gruesse" can both pass. */
export function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const ARTICLE = /^(der|die|das) /;

/** A typed answer is right if it matches the word. The article may be left out ("Apfel" for "der Apfel"). */
export function typedOk(typed: string, de: string): boolean {
  const t = norm(typed);
  if (!t) return false;
  const full = norm(de);
  return t === full || t === full.replace(ARTICLE, "");
}

/** Which question a card gets. Words with an article are good typing practice; others rotate. */
export function kindFor(index: number): Kind {
  return (["meaning", "listen", "type"] as const)[index % 3];
}

/** Three wrong choices from the same deck first, then from anywhere. `pick` is injectable for tests. */
export function distractors<T extends C>(card: T, pool: T[], field: "de" | "en", n = 3, pick: (a: T[]) => T[] = shuffle): string[] {
  const same = pool.filter((c) => c.id !== card.id && c[field] !== card[field]);
  const out: string[] = [];
  for (const c of pick(same)) {
    if (!out.includes(c[field])) out.push(c[field]);
    if (out.length === n) break;
  }
  return out;
}

export function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export function buildQuestion<T extends C>(card: T, kind: Kind, deck: T[], all: T[], shuf: <U>(a: U[]) => U[] = shuffle): Q {
  const pool = deck.length >= 4 ? deck : all;
  if (kind === "meaning") {
    return { cardId: card.id, kind, prompt: card.de, answer: card.en, options: shuf([card.en, ...distractors(card, pool, "en", 3, shuf)]) };
  }
  if (kind === "listen") {
    return { cardId: card.id, kind, prompt: card.de, answer: card.de, options: shuf([card.de, ...distractors(card, pool, "de", 3, shuf)]) };
  }
  return { cardId: card.id, kind, prompt: card.en, answer: card.de };
}

export const isRight = (q: Q, given: string) => (q.kind === "type" ? typedOk(given, q.answer) : given === q.answer);

/** SM-2 grade sent to the server: 2 right first time, 1 right on the second try, 0 needed more tries. */
export const gradeFor = (attempts: number): 0 | 1 | 2 => (attempts <= 1 ? 2 : attempts === 2 ? 1 : 0);
