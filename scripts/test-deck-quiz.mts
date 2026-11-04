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
