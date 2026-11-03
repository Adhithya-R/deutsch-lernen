export type Bilingual = { en: string; ta: string };

export type Lesson = {
  slug: string;
  level: "A1" | "A2";
  title: Bilingual;
  intro: Bilingual;
  points: { de: string; en: string; ta: string }[];
};

export const lessons: Lesson[] = [
  {
    slug: "sentence-order",
    level: "A1",
    title: { en: "Sentence order (verb in position 2)", ta: "வாக்கிய வரிசை (வினைச்சொல் 2-ஆம் இடத்தில்)" },
    intro: {
      en: "In a German main sentence the conjugated verb is always in position 2.",
      ta: "ஜெர்மன் வாக்கியத்தில் வினைச்சொல் எப்போதும் 2-ஆம் இடத்தில் வரும்.",
    },
    points: [
      { de: "Ich lerne heute Deutsch.", en: "I am learning German today.", ta: "நான் இன்று ஜெர்மன் கற்கிறேன்." },
      { de: "Heute lerne ich Deutsch.", en: "Today I learn German. (verb stays 2nd)", ta: "இன்று நான் ஜெர்மன் கற்கிறேன். (வினை 2-ஆம் இடத்தில்)" },
    ],
  },
];

export type CaseRow = { gender: string; nom: string; akk: string; dat: string };

// Definite articles
export const definiteArticles: CaseRow[] = [
  { gender: "masculine / ஆண்", nom: "der", akk: "den", dat: "dem" },
  { gender: "feminine / பெண்", nom: "die", akk: "die", dat: "der" },
  { gender: "neuter / அலி", nom: "das", akk: "das", dat: "dem" },
  { gender: "plural / பன்மை", nom: "die", akk: "die", dat: "den (+n)" },
];

// Indefinite articles
export const indefiniteArticles: CaseRow[] = [
  { gender: "masculine / ஆண்", nom: "ein", akk: "einen", dat: "einem" },
  { gender: "feminine / பெண்", nom: "eine", akk: "eine", dat: "einer" },
  { gender: "neuter / அலி", nom: "ein", akk: "ein", dat: "einem" },
  { gender: "plural / பன்மை", nom: "–", akk: "–", dat: "–" },
];
