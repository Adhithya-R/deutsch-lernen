// Speaking practice sets: short German sentences to listen to, say aloud and check.
// Built from the speaking cards of the exams and the "Everyday phrases" flashcards.
import { cards } from "./vocab.ts";
import { exams } from "./exam.ts";

export type SpeakItem = { de: string; en: string };
export type SpeakSet = { id: string; title: string; sub: string; items: SpeakItem[] };

const chunk = <T,>(a: T[], n: number) => Array.from({ length: Math.ceil(a.length / n) }, (_, i) => a.slice(i * n, i * n + n));
const short = (s: string) => s.split(/\s+/).length <= 14;

const phrases: SpeakItem[] = cards.filter((c) => c.deck === "phrases").map((c) => ({ de: c.de.replace(/ …/g, " das").replace("Wo ist das?", "Wo ist die Toilette?"), en: c.en }));
const exam = (level: "a1" | "a2"): SpeakItem[] =>
  exams[level].speaking.flatMap((p) => p.cards.map((c) => ({ de: c.reply ?? c.say, en: c.hint }))).filter((i) => short(i.de));

export const speakSets: SpeakSet[] = [
  ...chunk(phrases, 5).map((items, i) => ({ id: `phrases-${i + 1}`, title: `Everyday phrases ${i + 1}`, sub: "A1 · Useful sentences", items })),
  ...chunk(exam("a1"), 5).map((items, i) => ({ id: `a1-exam-${i + 1}`, title: `A1 speaking exam ${i + 1}`, sub: "A1 · Talk about yourself", items })),
  ...chunk(exam("a2"), 5).map((items, i) => ({ id: `a2-exam-${i + 1}`, title: `A2 speaking exam ${i + 1}`, sub: "A2 · Answers and plans", items })),
];

export const setById = (id: string) => speakSets.find((s) => s.id === id);
