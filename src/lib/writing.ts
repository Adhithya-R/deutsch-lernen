// Simple, honest checks for exam writing practice: greeting, closing and length.
// It cannot judge grammar or whether each point was answered; the learner ticks those off themselves.

export const strip = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss").toLowerCase();

export const wordCount = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;

const GREETINGS = ["Liebe", "Lieber", "Hallo", "Sehr geehrte", "Sehr geehrter", "Guten Tag"].map(strip);
const CLOSINGS = [
  "Viele Grüße", "Liebe Grüße", "Herzliche Grüße", "Beste Grüße", "Schöne Grüße", "Mit freundlichen Grüßen",
  "Bis bald", "Bis morgen", "Bis später", "Alles Gute",
].map(strip);

export type Analysis = { words: number; length: "short" | "ok" | "long"; greeting: boolean; closing: boolean };

export function analyse(text: string, min: number, max: number): Analysis {
  const words = wordCount(text);
  const t = strip(text.trim());
  return {
    words,
    length: words < min ? "short" : words > max ? "long" : "ok",
    greeting: GREETINGS.some((g) => t.startsWith(g)),
    closing: CLOSINGS.some((c) => t.slice(-90).includes(c)),
  };
}

/** Checks one form field: exact match (ignoring case and accents), or all required words contained. */
export function fieldOk(value: string, f: { accept?: string[]; contains?: string[] }) {
  const v = strip(value.trim());
  if (!v) return false;
  if (f.contains) return f.contains.every((w) => v.includes(strip(w)));
  return (f.accept ?? []).map(strip).includes(v);
}
