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

// ---- progress export ----
import { buildExport, exportFileName } from "../src/lib/export.ts";
const ex = buildExport("a@b.c", { profile: { display_name: "Adhi", level: "A1" }, lessons: [{ lesson_slug: "x" }], flashcards: [{}, {}], activity: [{ day: "2026-11-05", xp: 12 }, { day: "2026-11-06", xp: 0 }], quizzes: [], drafts: [] }, new Date("2026-11-06T10:00:00Z"));
assert.equal(ex.summary.totalXp, 12);
assert.equal(ex.summary.activeDays, 1);
assert.equal(ex.summary.wordsStarted, 2);
assert.equal(ex.account.name, "Adhi");
assert.equal(exportFileName(new Date("2026-11-06T10:00:00Z")), "moli-bruecke-progress-2026-11-06.json");
assert.equal(buildExport(undefined, { profile: null, lessons: [], flashcards: [], activity: [], quizzes: [], drafts: [] }).account.email, null);
console.log("export ok");

// ---- level ----
import { levelOf, startOfLevel, isGoal } from "../src/lib/level.ts";
assert.equal(levelOf(0).level, 1);
assert.equal(levelOf(49).level, 1);
assert.equal(levelOf(50).level, 2);
assert.equal(levelOf(149).level, 2);
assert.equal(levelOf(150).level, 3);
assert.equal(levelOf(50).into, 0);
assert.equal(levelOf(75).pct, 25); // 25 of the 100 XP that level 2 needs
assert.equal(levelOf(100).toNext, 50);
assert.equal(levelOf(-5).level, 1);
assert.equal(levelOf(NaN).level, 1);
assert.equal(levelOf(1000000).title.de, "Meister");
assert.equal(startOfLevel(5), 500);
for (let x = 0; x < 3000; x += 7) { const l = levelOf(x); assert.ok(l.pct >= 0 && l.pct <= 100 && l.into >= 0 && l.toNext > 0, `bad level at ${x}`); }
assert.ok(isGoal(20) && !isGoal(15));
console.log("level ok");

// ---- weak topics ----
import { weakTopics, target } from "../src/lib/weak.ts";
const weak = weakTopics([
  { kind: "lesson", ref: "passiv", score: 1, total: 4 },
  { kind: "lesson", ref: "pronouns", score: 4, total: 4 },
  { kind: "culture", ref: "bruecke-food", score: 2, total: 3 },
  { kind: "talk", ref: "talk-cafe", score: 3, total: 4 },
  { kind: "exam", ref: "a1-reading", score: 3, total: 10 },
  { kind: "lesson", ref: "does-not-exist", score: 0, total: 5 },
  { kind: "lesson", ref: "plural", score: 0, total: 2 },
]);
assert.deepEqual(weak.map((w) => w.pct), [25, 30, 67], "weakest first; strong, unknown and tiny quizzes left out");
assert.equal(weak[0].href, "/lessons/passiv");
assert.equal(weak[1].href, "/exam/a1/reading");
assert.equal(target("exam", "speak-phrases-1")?.href, "/speaking/phrases-1");
assert.equal(target("lesson", "nope"), null);
console.log("weak topics ok");

// ---- leagues ----
import { leagueOf, nextLeague, podium } from "../src/lib/league.ts";
assert.equal(leagueOf(0).id, "bronze");
assert.equal(leagueOf(49).id, "bronze");
assert.equal(leagueOf(50).id, "silver");
assert.equal(leagueOf(150).id, "gold");
assert.equal(leagueOf(9999).id, "diamond");
assert.equal(leagueOf(NaN).id, "bronze");
assert.deepEqual(nextLeague(40), { league: leagueOf(50), missing: 10 });
assert.equal(nextLeague(400), null);
assert.deepEqual(podium([{ name: "A", xp: 30 }, { name: "B", xp: 90 }, { name: "C", xp: 90 }, { name: "D", xp: 10 }, { name: "E", xp: 0 }]).map((r) => `${r.place}${r.name}`), ["1B", "1C", "3A"], "ties share a place; places after the third are cut");
assert.deepEqual(podium([]), []);
console.log("league ok");
