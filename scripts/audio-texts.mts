// Collects every German phrase the app can speak and writes scripts/audio-texts.json.
// Run: node --experimental-strip-types scripts/audio-texts.mts
import { writeFileSync } from "node:fs";
import { chapters } from "../src/content/chapters.ts";
import { pairs } from "../src/content/culture.ts";
import { lessons } from "../src/content/lessons.ts";
import { cards } from "../src/content/vocab.ts";
import { audioKey } from "../src/lib/audio-key.ts";

const texts = new Set<string>();
const add = (t?: string) => t && texts.add(t.trim());

cards.forEach((c) => {
  add(c.de);
  add(c.example?.de);
});
chapters.forEach((ch) => {
  ch.lines.forEach((l) => add(l.parts.map((p) => (typeof p === "string" ? p : p.t)).join("")));
  Object.values(ch.words).forEach((w) => {
    add(w.de);
    add(w.ex);
  });
});
lessons.forEach((l) => l.points.forEach((p) => add(p.de)));
pairs.forEach((p) => add(p.de.big));

// two phrases must never share a file name
const byKey = new Map<string, string>();
for (const t of texts) {
  const k = audioKey(t);
  if (byKey.has(k) && byKey.get(k)!.toLowerCase() !== t.toLowerCase()) throw new Error(`Audio name clash: "${t}" and "${byKey.get(k)}"`);
  if (!byKey.has(k)) byKey.set(k, t);
}
const items = [...byKey].map(([key, text]) => ({ key, text }));
writeFileSync(new URL("./audio-texts.json", import.meta.url), JSON.stringify(items, null, 1));
console.log(`${items.length} phrases`);
