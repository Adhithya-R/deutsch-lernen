// Run: node --experimental-strip-types scripts/test-deck-quiz.mts
import assert from "node:assert/strict";
import { cards } from "../src/content/vocab.ts";
import { PICS } from "../src/content/pics.ts";
import { buildQuestion, gradeFor, isRight, kindFor, norm, typedOk } from "../src/lib/deck-quiz.ts";

assert.equal(norm("  Grüße, Adhi! "), "gruesse adhi");
assert.ok(typedOk("apfel", "der Apfel"));
assert.ok(typedOk("Der Apfel", "der Apfel"));
assert.ok(typedOk("die kueche", "die Küche"));
assert.ok(!typedOk("die Apfel", "der Apfel"), "wrong article must fail");
assert.ok(!typedOk("", "der Apfel"));
assert.ok(typedOk("Guten Morgen", "Guten Morgen"));
assert.ok(!typedOk("Guten Tag", "Guten Morgen"));
assert.deepEqual([1, 2, 3, 5].map(gradeFor), [2, 1, 0, 0]);
assert.deepEqual([0, 1, 2, 3].map(kindFor), ["meaning", "listen", "type", "meaning"]);

for (const c of cards) {
  const deck = cards.filter((x) => x.deck === c.deck);
  for (const k of ["meaning", "listen", "type"] as const) {
    const q = buildQuestion(c, k, deck, cards);
    assert.ok(isRight(q, q.answer), `${c.id} ${k}: own answer must be right`);
    if (q.options) {
      assert.equal(q.options.length, 4, `${c.id} ${k}: needs 4 options`);
      assert.equal(new Set(q.options).size, 4, `${c.id} ${k}: duplicate options`);
      assert.equal(q.options.filter((o) => o === q.answer).length, 1, `${c.id} ${k}: one right option`);
    }
  }
  assert.ok(PICS[c.id], `${c.id}: no picture`);
}
const ids = new Set(cards.map((c) => c.id));
Object.keys(PICS).forEach((k) => assert.ok(ids.has(k), `picture for unknown card ${k}`));
console.log(`deck quiz ok for ${cards.length} cards`);

// ---- weekly quiz ----
import { pickForWeek, weekId } from "../src/lib/weekly.ts";
assert.equal(weekId(new Date("2026-11-05T10:00:00Z")), "2026-w45");
assert.equal(weekId(new Date("2026-11-02T00:00:00Z")), "2026-w45", "Monday starts the week");
assert.equal(weekId(new Date("2026-11-08T23:59:00Z")), "2026-w45", "Sunday ends the week");
assert.equal(weekId(new Date("2026-11-09T00:00:00Z")), "2026-w46");
assert.equal(weekId(new Date("2027-01-01T00:00:00Z")), "2026-w53");
const a = pickForWeek("2026-w45", cards).map((c) => c.id);
assert.deepEqual(a, pickForWeek("2026-w45", [...cards].reverse()).map((c) => c.id), "same words whatever the order");
assert.equal(new Set(a).size, 10);
assert.notDeepEqual(a, pickForWeek("2026-w46", cards).map((c) => c.id));
console.log("weekly quiz ok");

// ---- speaking match ----
import { bestMatch, matchSpeech } from "../src/lib/speech-match.ts";
assert.equal(matchSpeech("Ich heiße Adhi.", "ich heisse adhi").score, 1);
assert.ok(matchSpeech("Ich komme aus Indien, aus Madurai.", "ich komme aus indien aus madurai").pass);
assert.ok(!matchSpeech("Ich komme aus Indien.", "hallo").pass);
assert.equal(matchSpeech("Ich komme aus Indien.", "").score, 0);
assert.ok(matchSpeech("Ich spreche Englisch.", "ich spreche englich").pass, "one wrong letter in a long word is accepted");
assert.ok(!matchSpeech("aus aus aus aus", "aus").pass, "a repeated word cannot be matched with a single spoken word");
assert.equal(bestMatch("Guten Tag", ["gute nacht", "guten tag"]).score, 1);
assert.deepEqual(matchSpeech("Wo ist die Bank?", "wo ist bank").words.map((w) => w.ok), [true, true, false, true]);
console.log("speech match ok");
