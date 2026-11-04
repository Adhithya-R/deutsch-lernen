// Collects every German phrase the app can speak and writes scripts/audio-texts.json.
// Run: node --experimental-strip-types scripts/audio-texts.mts
import { writeFileSync } from "node:fs";
import { chapters } from "../src/content/chapters.ts";
import { topics } from "../src/content/bruecke.ts";
import { clipKey, exams, phrases } from "../src/content/exam.ts";
import { lessons } from "../src/content/lessons.ts";
import { cards } from "../src/content/vocab.ts";
import { audioKey } from "../src/lib/audio-key.ts";

type Voice = "m" | "f";
type Item = { key: string; text?: string; voice: Voice; segments?: { voice: Voice; text: string }[] };


const items = new Map<string, Item>();
const add = (text: string | undefined, voice: Voice = "m") => {
  if (!text) return;
  const t = text.trim();
  const key = audioKey(t);
  const old = items.get(key);
  if (old) {
    if (old.text!.toLowerCase() !== t.toLowerCase()) throw new Error(`Audio name clash: "${t}" and "${old.text}"`);
    return; // same phrase already added; the first voice wins
  }
  items.set(key, { key, text: t, voice });
};

cards.forEach((c) => {
  add(c.de);
  add(c.example?.de);
});
chapters.forEach((ch) => {
  ch.lines.forEach((l) => add(l.parts.map((p) => (typeof p === "string" ? p : p.t)).join(""), ch.speakers[l.who].gender));
  Object.values(ch.words).forEach((w) => {
    add(w.de);
    add(w.ex);
  });
});
lessons.forEach((l) => l.points.forEach((p) => add(p.de)));
topics.forEach((t) => t.sections.forEach((s) => s.de.forEach((it) => add(it.big))));
phrases.forEach((p) => add(p.de));

for (const lvl of Object.values(exams)) {
  lvl.listening.forEach((t) =>
    t.clips.forEach((c) => {
      const key = clipKey(t.id, c.id);
      items.set(key, { key, voice: "m", segments: c.segments });
    }),
  );
  lvl.writing.tasks.forEach((t) => add(t.sample, "f"));
  lvl.speaking.forEach((part) =>
    part.cards.forEach((c) => {
      add(c.say, c.sayVoice ?? (c.reply ? "m" : "f"));
      add(c.reply, "f");
    }),
  );
}

const list = [...items.values()];
writeFileSync(new URL("./audio-texts.json", import.meta.url), JSON.stringify(list, null, 1));
console.log(`${list.length} clips (${list.filter((i) => i.segments).length} multi-voice, ${list.filter((i) => i.voice === "f").length} female)`);
