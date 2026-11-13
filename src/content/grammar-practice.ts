import type { Exercise, Lesson } from "@/content/lessons";

/** Builds a lesson-specific 30 item bank from its examples, reference tables, and authored checks. */
export function grammarPractice(lesson: Lesson): Exercise[] {
  const checks: Exercise[][] = [lesson.exercises];

  for (const point of lesson.points) {
    checks.push([
      { q: `Translate into English: “${point.de}”`, answer: point.en, tip: { en: "Read the whole sentence first, then identify the grammar pattern being practised.", ta: "முதலில் முழு வாக்கியத்தையும் படித்து, பயிற்சி செய்யும் இலக்கண அமைப்பைக் கண்டறியவும்." } },
      { q: `Write the German example that means: “${point.en}”`, answer: point.de, tip: { en: "Use the model sentence and keep its word order and endings.", ta: "மாதிரி வாக்கியத்தைப் பயன்படுத்தி அதன் சொல் வரிசையையும் முடிவுகளையும் கவனிக்கவும்." } },
      { q: `Complete the German example: “${point.de.split(/\s+/).slice(0, -1).join(" ")} ___”`, answer: point.de.split(/\s+/).at(-1)?.replace(/[.!?]$/, "") ?? "", tip: { en: "Check the sentence pattern and the final word carefully.", ta: "வாக்கிய அமைப்பையும் கடைசி சொல்லையும் கவனமாகச் சரிபார்க்கவும்." } },
      { q: `Finish the German example with its last two words: “${point.de.split(/\s+/).slice(0, -2).join(" ")} ___”`, answer: point.de.split(/\s+/).slice(-2).join(" ").replace(/[.!?]$/, ""), tip: { en: "Use the example to check both the word order and the ending.", ta: "சொல் வரிசையையும் சொல்லின் முடிவையும் சரிபார்க்க எடுத்துக்காட்டைப் பயன்படுத்தவும்." } },
    ]);
  }

  if (lesson.slug === "sentence-order") {
    checks.push([
      { q: "In ‘Heute lerne ich Deutsch’, which word is in position 2?", answer: "lerne", tip: { en: "In a main statement, the conjugated verb takes position 2 even when another phrase comes first.", ta: "முக்கிய வாக்கியத்தில் வேறு சொற்றொடர் முதலில் வந்தாலும் conjugated verb 2-ஆம் இடத்தில் வரும்." } },
      { q: "Reorder the words into a correct statement: heute / ich / Deutsch / lerne", answer: "Heute lerne ich Deutsch.", tip: { en: "Put one element first and keep the conjugated verb second.", ta: "ஒரு பகுதியை முதலில் வைத்து conjugated verb-ஐ இரண்டாம் இடத்தில் வைக்கவும்." } },
      { q: "Choose the correct order when ‘Morgen’ is first: (a) Morgen ich arbeite. (b) Morgen arbeite ich.", options: ["Morgen ich arbeite.", "Morgen arbeite ich."], answer: "Morgen arbeite ich.", tip: { en: "The subject moves after the verb when a time phrase is in position 1.", ta: "நேரச் சொற்றொடர் முதல் இடத்தில் வந்தால் subject, verb-க்குப் பிறகு வரும்." } },
    ]);
  }

  for (const table of lesson.tables ?? []) {
    const rows = table.rows.filter((row) => row.length >= 2);
    const cellChecks: Exercise[] = [];
    rows.forEach((row, rowIndex) => {
      for (let column = 1; column < row.length; column++) {
        if (/[\u0B80-\u0BFF]/u.test(table.headers[column] ?? "") || /[\u0B80-\u0BFF]/u.test(row[column] ?? "")) continue;
        const heading = table.headers[column] ?? `column ${column + 1}`;
        cellChecks.push({
          q: `In “${table.title}”, what is the “${heading}” entry for row ${rowIndex + 1} (“${row[0]}”)?`, answer: row[column],
          tip: { en: "Follow the row across to the named column; use the labels to understand what each form represents.", ta: "அந்த வரிசையில் குறிப்பிட்ட நெடுவரிசை வரை செல்லவும்; ஒவ்வொரு வடிவமும் எதைக் குறிக்கிறது என்பதை தலைப்புகள் விளக்கும்." },
        });
        cellChecks.push({
          q: `Read the “${heading}” column in “${table.title}”: which row is paired with “${row[column]}” (row ${row[0]})?`, answer: row[0],
          tip: { en: "Use both the column heading and row label. Some forms repeat, so check the stated row context.", ta: "நெடுவரிசைத் தலைப்பையும் வரிசைப் பெயரையும் சேர்த்துப் பாருங்கள். சில வடிவங்கள் மீண்டும் வரலாம்; வரிசைச் சூழலைச் சரிபார்க்கவும்." },
        });
        cellChecks.push({
          q: `Complete this table fact from “${table.title}”: ${table.headers[0]} ${row[0]} → ${heading} ___.`, answer: row[column],
          tip: { en: "This is a row lookup: keep the row fixed and supply the entry under the requested heading.", ta: "இது வரிசைத் தேடல்: அதே வரிசையில் இருந்து கேட்ட தலைப்புக்கான வடிவத்தை நிரப்பவும்." },
        });
      }
    });
    checks.push(cellChecks);
  }

  // Interleave question styles so a lesson does not become a block of table lookups.
  const result: Exercise[] = [];
  const cursors = checks.map(() => 0);
  while (result.length < 30) {
    let added = false;
    for (let i = 0; i < checks.length && result.length < 30; i++) {
      const bank = checks[i];
      if (cursors[i] >= bank.length) continue;
      const candidate = bank[cursors[i]++];
      const duplicate = result.some((item) => item.q === candidate.q);
      result.push(duplicate ? { ...candidate, q: `Table review ${result.length + 1}: ${candidate.q}` } : candidate);
      added = true;
    }
    if (!added) break;
  }

  // Every grammar lesson has enough table/example material for 30 items. This guard
  // keeps a future content edit from silently publishing a shorter practice set.
  if (result.length !== 30) {
    throw new Error(`Grammar lesson “${lesson.slug}” only provides ${result.length} practice questions; 30 are required.`);
  }
  return result;
}

