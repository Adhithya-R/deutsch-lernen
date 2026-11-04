// Sanity checks for lesson, chapter and vocabulary data. Run: node --experimental-strip-types scripts/check-content.mts
import { chapters } from "../src/content/chapters.ts";
import { lessons } from "../src/content/lessons.ts";
import { cards, decks } from "../src/content/vocab.ts";
import { readFileSync } from "node:fs";

const LANDMARK_IDS = new Set((JSON.parse(readFileSync(new URL("../src/content/landmarks.json", import.meta.url), "utf8")) as { id: string }[]).map((l) => l.id));
const landmark = (id: string) => LANDMARK_IDS.has(id);

const problems: string[] = [];
const bad = (m: string) => problems.push(m);

for (const l of lessons) {
  l.exercises.forEach((e, i) => {
    if (e.options && !e.options.includes(e.answer)) bad(`lesson ${l.slug} #${i + 1}: answer "${e.answer}" is not in the options`);
    if (e.options && new Set(e.options).size !== e.options.length) bad(`lesson ${l.slug} #${i + 1}: duplicate options`);
  });
  if (!l.points.length || !l.exercises.length) bad(`lesson ${l.slug}: needs examples and exercises`);
  l.tables?.forEach((t) => t.rows.forEach((r) => r.length !== t.headers.length && bad(`lesson ${l.slug} table "${t.title}": row length differs from header`)));
}
if (new Set(lessons.map((l) => l.slug)).size !== lessons.length) bad("duplicate lesson slugs");

for (const c of chapters) {
  c.lines.forEach((ln) => {
    if (!c.speakers[ln.who]) bad(`chapter ${c.slug}: speaker ${ln.who} has no entry`);
    ln.parts.forEach((p) => typeof p !== "string" && !c.words[p.k] && bad(`chapter ${c.slug}: word key "${p.k}" missing`));
  });
  c.quiz.forEach((q, i) => {
    if (q.type === "choice" && !q.options.includes(q.answer)) bad(`chapter ${c.slug} Q${i + 1}: answer not in options`);
    if (q.type === "order") {
      const built = q.answer.slice(0, -q.end.length).split(" ");
      built.forEach((w) => !q.tiles.includes(w) && bad(`chapter ${c.slug} Q${i + 1}: tile "${w}" missing`));
      if (!q.answer.endsWith(q.end)) bad(`chapter ${c.slug} Q${i + 1}: answer does not end with ${q.end}`);
    }
  });
  c.landmarks.forEach((id) => !landmark(id) && bad(`chapter ${c.slug}: unknown landmark ${id}`));
}
const moods = chapters.map((c) => c.mood);
if (new Set(moods).size !== moods.length) bad("two chapters share a mood: " + moods.join(","));
const pairs = chapters.map((c) => c.landmarks.join("+"));
if (new Set(pairs).size !== pairs.length) bad("two chapters share a landmark pair");

const deckIds = new Set(decks.map((d) => d.id));
cards.forEach((c) => !deckIds.has(c.deck) && bad(`card ${c.id}: unknown deck ${c.deck}`));
decks.forEach((d) => !cards.some((c) => c.deck === d.id) && bad(`deck ${d.id} is empty`));

console.log(`${lessons.length} lessons, ${chapters.length} chapters, ${cards.length} cards in ${decks.length} decks`);
if (problems.length) {
  console.log("PROBLEMS:\n- " + problems.join("\n- "));
  process.exit(1);
}
console.log("content checks passed");
