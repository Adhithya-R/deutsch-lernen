// Cheat sheets: quick-reference pages built from the tables of the grammar lessons (no duplicated data).
export type Sheet = { slug: string; title: string; desc: string; lessons: string[] };

export const sheets: Sheet[] = [
  { slug: "articles", title: "Articles and plural", desc: "der / die / das, Akkusativ, plural endings", lessons: ["akkusativ", "plural"] },
  { slug: "pronouns", title: "Pronouns and possessives", desc: "ich, du, er … and mein, dein …", lessons: ["pronouns", "possessives"] },
  { slug: "verbs", title: "Verb tables", desc: "regular verbs, sein, haben, modal verbs, Perfekt, reflexive", lessons: ["regular-verbs", "sein-haben", "modal-verbs", "perfekt", "reflexive-verbs"] },
  { slug: "questions", title: "Questions and negation", desc: "question words, nicht and kein", lessons: ["questions", "negation"] },
  { slug: "sentences", title: "Sentence building", desc: "word order, separable verbs, imperative, weil / dass / wenn", lessons: ["sentence-order", "separable-verbs", "imperative", "subordinate-clauses"] },
  { slug: "prepositions", title: "Prepositions", desc: "with Dativ and the two-way prepositions", lessons: ["dativ-prepositions", "two-way-prepositions"] },
  { slug: "numbers", title: "Numbers and time", desc: "numbers, the clock, prices", lessons: ["numbers-time"] },
  { slug: "adjectives", title: "Adjectives and comparison", desc: "endings and bigger / biggest", lessons: ["adjective-endings", "comparison"] },
  { slug: "polite", title: "Polite phrases", desc: "möchte, hätte gern, könnten Sie", lessons: ["polite-requests"] },
];
