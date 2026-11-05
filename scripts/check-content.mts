// Sanity checks for lesson, chapter and vocabulary data. Run: node --experimental-strip-types scripts/check-content.mts
import { chapters } from "../src/content/chapters.ts";
import { lessons } from "../src/content/lessons.ts";
import { exams, clipKey } from "../src/content/exam.ts";
import { cards, decks } from "../src/content/vocab.ts";
import { analyse, fieldOk } from "../src/lib/writing.ts";
import { readFileSync } from "node:fs";
import { topics } from "../src/content/bruecke.ts";
import { NAMES } from "../src/content/people.ts";

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
chapters.forEach((c) => Object.entries(c.speakers).forEach(([k, sp]) => !["m", "f"].includes(sp.gender) && bad(`chapter ${c.slug}: speaker ${k} has no gender`)));
const storyText = JSON.stringify(chapters);
NAMES.forEach((n) => !storyText.includes(n) && bad(`classmate ${n} is not in any story`));
const OLD = /\b(Tom|Priya|Nina|Maria|Julia|Anna|Eva|Jan|Katja|Peter|Lisa|Weber|Keller|Braun|Krishnan|Lopez|Müller|Wagner|Lena)\b/;
const allText = JSON.stringify([chapters, lessons, cards, exams, topics]);
const oldHit = allText.match(OLD);
if (oldHit) bad(`old name still used: ${oldHit[0]}`);
chapters.forEach((c, i) => i > 0 && c.mood === chapters[i - 1].mood && bad(`chapters ${i} and ${i + 1} have the same mood`));
const pairs = chapters.map((c) => c.landmarks.join("+"));
if (new Set(pairs).size !== pairs.length) bad("two chapters share a landmark pair");

for (const t of topics) {
  if (t.sections.length < 3 && t.id !== "weather") bad(`topic ${t.id}: needs at least 3 sections`);
  t.sections.forEach((s) => (!s.tn.length || !s.de.length) && bad(`topic ${t.id}/${s.id}: needs Tamil Nadu and Germany items`));
  t.quiz.forEach((q, i) => !q.options?.includes(q.answer) && bad(`topic ${t.id} Q${i + 1}: answer not in options`));
  t.sky.forEach((id) => !landmark(id) && bad(`topic ${t.id}: unknown landmark ${id}`));
}
if (new Set(topics.map((t) => t.id)).size !== topics.length) bad("duplicate topic ids");
const deckIds = new Set(decks.map((d) => d.id));
cards.forEach((c) => !deckIds.has(c.deck) && bad(`card ${c.id}: unknown deck ${c.deck}`));
decks.forEach((d) => !cards.some((c) => c.deck === d.id) && bad(`deck ${d.id} is empty`));


// ---- exam practice ----
for (const lvl of Object.values(exams)) {
  const checkItems = (where: string, items: { q: string; options: string[]; answer: string }[]) =>
    items.forEach((it, i) => {
      if (!it.options.includes(it.answer)) bad(`exam ${where} Q${i + 1}: answer "${it.answer}" not in options`);
      if (new Set(it.options).size !== it.options.length) bad(`exam ${where} Q${i + 1}: duplicate options`);
    });
  lvl.reading.forEach((t) => checkItems(t.id, t.items));
  const keys = new Set<string>();
  lvl.listening.forEach((t) => {
    checkItems(t.id, t.items);
    t.clips.forEach((c) => {
      const k = clipKey(t.id, c.id);
      if (keys.has(k)) bad(`exam duplicate clip key ${k}`);
      keys.add(k);
    });
  });
  lvl.writing.tasks.forEach((t) => {
    const a = analyse(t.sample, t.min, t.max);
    if (!a.greeting || !a.closing || a.length !== "ok") bad(`exam ${t.id}: sample answer fails its own checks ${JSON.stringify(a)}`);
  });
  lvl.writing.form?.fields.forEach((f) => {
    const good = f.contains ? f.contains.join(" und ") : f.accept![0];
    if (!fieldOk(good, f)) bad(`exam form field ${f.label}: its own answer is rejected`);
    if (fieldOk("", f) || fieldOk("zzz", f)) bad(`exam form field ${f.label}: accepts nonsense`);
  });
}
// writing checker behaves sensibly
const probe = analyse("Hallo Eva, bis morgen!", 3, 10);
if (!probe.greeting || !probe.closing) bad("writing checker misses a simple greeting/closing");
if (analyse("Das ist ein Text ohne Gruß.", 3, 10).greeting) bad("writing checker sees a greeting that is not there");

console.log(`${lessons.length} lessons, ${chapters.length} chapters, ${cards.length} cards in ${decks.length} decks`);
if (problems.length) {
  console.log("PROBLEMS:\n- " + problems.join("\n- "));
  process.exit(1);
}
console.log("content checks passed");
