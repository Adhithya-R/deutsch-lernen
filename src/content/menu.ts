import { decks } from "@/content/vocab";

export type MenuItem = {
  en: string;
  ta: string;
  href?: string; // no href (or soon: true) means the page is not built yet
  soon?: boolean;
};
export type MenuGroup = { heading: string; items: MenuItem[] };
export type MenuSection = { id: string; de: string; en: string; ta: string; groups: MenuGroup[] };

const live = (en: string, ta: string, href: string): MenuItem => ({ en, ta, href });
const soon = (en: string, ta: string): MenuItem => ({ en, ta, soon: true });

export const menu: MenuSection[] = [
  {
    id: "lernen",
    de: "Lernen",
    en: "Lessons",
    ta: "பாடங்கள்",
    groups: [
      {
        heading: "A1",
        items: [
          live("Personal pronouns", "ஆள்மாற்றுப் பெயர்கள்", "/lessons/pronouns"),
          live("sein & haben", "sein & haben", "/lessons/sein-haben"),
          live("Regular verbs", "ஒழுங்கான வினைகள்", "/lessons/regular-verbs"),
          live("Sentence order", "வாக்கிய வரிசை", "/lessons/sentence-order"),
          live("Asking questions", "கேள்விகள் கேட்பது", "/lessons/questions"),
          live("Negation: nicht / kein", "எதிர்மறை", "/lessons/negation"),
          live("Possessives", "உடைமைச் சொற்கள்", "/lessons/possessives"),
          soon("Articles and plurals", "Artikel மற்றும் பன்மை"),
          soon("Akkusativ", "Akkusativ"),
          soon("Modal verbs (können, müssen)", "துணை வினைகள்"),
          soon("Separable verbs", "பிரியும் வினைகள்"),
          soon("Numbers, time and dates", "எண்கள், நேரம், தேதி"),
          soon("Imperative", "கட்டளை வடிவம்"),
        ],
      },
      {
        heading: "A2",
        items: [
          soon("Perfekt (past tense)", "இறந்த காலம் (Perfekt)"),
          soon("Dativ and prepositions", "Dativ & முன்னிடைச் சொற்கள்"),
          soon("Two-way prepositions", "இரு வழி முன்னிடைகள்"),
          soon("Subordinate clauses (weil, dass)", "துணை வாக்கியங்கள்"),
          soon("Reflexive verbs", "தன்வினைச் சொற்கள்"),
          soon("Comparison", "ஒப்பீடு"),
          soon("Adjective endings", "பெயரடை முடிவுகள்"),
          soon("Politeness (möchten, würde)", "பணிவான கேள்விகள்"),
        ],
      },
    ],
  },
  {
    id: "spickzettel",
    de: "Spickzettel",
    en: "Cheat sheets",
    ta: "குறிப்பு அட்டவணைகள்",
    groups: [
      {
        heading: "Cases / வேற்றுமை",
        items: [
          live("Nominativ, Akkusativ, Dativ", "எழுவாய், செயப்படுபொருள், Dativ", "/cheatsheets/cases"),
          live("Possessive endings", "உடைமைச் சொல் முடிவுகள்", "/lessons/possessives"),
          live("kein endings", "kein முடிவுகள்", "/lessons/negation"),
        ],
      },
      {
        heading: "Verbs / வினைகள்",
        items: [
          live("Verb endings", "வினை முடிவுகள்", "/lessons/regular-verbs"),
          live("sein & haben", "sein & haben", "/lessons/sein-haben"),
          soon("Irregular verbs", "ஒழுங்கற்ற வினைகள்"),
          soon("Modal verbs", "துணை வினைகள்"),
        ],
      },
      {
        heading: "Sentences / வாக்கியங்கள்",
        items: [
          live("Question words", "கேள்விச் சொற்கள்", "/lessons/questions"),
          live("Sentence order", "வாக்கிய வரிசை", "/lessons/sentence-order"),
          soon("Prepositions", "முன்னிடைச் சொற்கள்"),
          soon("Connectors (und, aber, weil)", "இணைப்புச் சொற்கள்"),
        ],
      },
    ],
  },
  {
    id: "wortschatz",
    de: "Wortschatz",
    en: "Vocabulary",
    ta: "சொல்லகராதி",
    groups: [
      {
        heading: "Flashcards / அட்டைகள்",
        items: [
          live("All words", "எல்லா சொற்கள்", "/flashcards"),
          ...decks.map((d) => live(d.en, d.ta, `/flashcards?deck=${d.id}`)),
        ],
      },
      {
        heading: "More / மேலும்",
        items: [
          soon("Story-based exercises", "கதை வழி பயிற்சிகள்"),
          soon("Word lists by topic", "தலைப்பு வாரியான சொற்கள்"),
          soon("Word of the day", "இன்றைய சொல்"),
          soon("My difficult words", "எனக்குக் கடினமான சொற்கள்"),
        ],
      },
    ],
  },
  {
    id: "pruefung",
    de: "Prüfung",
    en: "Exam",
    ta: "தேர்வு",
    groups: [
      {
        heading: "A1 · Start Deutsch 1",
        items: [
          soon("Overview and tips", "அறிமுகமும் குறிப்புகளும்"),
          soon("Lesen (reading)", "வாசிப்பு"),
          soon("Hören (listening)", "கேட்டல்"),
          soon("Schreiben (writing)", "எழுதுதல்"),
          soon("Sprechen (speaking)", "பேசுதல்"),
        ],
      },
      {
        heading: "A2 · Goethe-Zertifikat A2",
        items: [
          soon("Overview and tips", "அறிமுகமும் குறிப்புகளும்"),
          soon("Lesen (reading)", "வாசிப்பு"),
          soon("Hören (listening)", "கேட்டல்"),
          soon("Schreiben (writing)", "எழுதுதல்"),
          soon("Sprechen (speaking)", "பேசுதல்"),
        ],
      },
      {
        heading: "Writing help / எழுத்து உதவி",
        items: [
          soon("A1 message: structure", "A1 செய்தி: வரிசை"),
          soon("A2 email: order and tips", "A2 மின்னஞ்சல்: வரிசை, குறிப்புகள்"),
          soon("Useful phrases", "பயனுள்ள சொற்றொடர்கள்"),
          soon("Sample answers", "மாதிரி விடைகள்"),
        ],
      },
      {
        heading: "Mock tests / மாதிரித் தேர்வுகள்",
        items: [soon("A1 mock test", "A1 மாதிரித் தேர்வு"), soon("A2 mock test", "A2 மாதிரித் தேர்வு")],
      },
    ],
  },
  {
    id: "ueben",
    de: "Üben",
    en: "Practice",
    ta: "பயிற்சி",
    groups: [
      {
        heading: "Practice / பயிற்சி",
        items: [
          live("Lesson quizzes", "பாடப் பயிற்சிகள்", "/#lessons"),
          live("Vocabulary flashcards", "சொல் அட்டைகள்", "/flashcards"),
          soon("Story exercises", "கதைப் பயிற்சிகள்"),
          soon("Fill the gap", "இடைவெளி நிரப்பு"),
          soon("Sentence builder", "வாக்கியம் அமை"),
          soon("Listening dictation", "கேட்டு எழுது"),
          soon("Speaking practice", "பேச்சுப் பயிற்சி"),
        ],
      },
    ],
  },
  {
    id: "gruppe",
    de: "Gruppe",
    en: "Study group",
    ta: "குழு",
    groups: [
      {
        heading: "Together / ஒன்றாக",
        items: [
          soon("Leaderboard", "முன்னணிப் பட்டியல்"),
          soon("Weekly challenge", "வாராந்திர சவால்"),
          soon("Shared word lists", "பகிரப்பட்ட சொற்கள்"),
          soon("Study partners", "படிப்புத் தோழர்கள்"),
          soon("Class notes", "வகுப்புக் குறிப்புகள்"),
        ],
      },
    ],
  },
];

export const isLive = (i: MenuItem) => !i.soon && !!i.href;
