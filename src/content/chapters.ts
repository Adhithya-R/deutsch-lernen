import type { Mood } from "@/lib/landmarks";

// Story chapters: Priya moves from Madurai to Germany. Each chapter is a short scene, a few tappable
// words, a culture note, and a check that must be passed to unlock the next chapter.

export type Word = { de: string; en: string; ta: string; ex: string; exEn: string; exTa: string };
export type Part = string | { t: string; k: string }; // plain text, or a tappable word (k = key in `words`)
export type Line = { who: "p" | "l" | "b"; parts: Part[]; en: string; ta: string };

export type Question =
  | { type: "choice"; q: string; options: string[]; answer: string; tipEn: string; tipTa: string }
  // `answer` is the full sentence, including its end mark, built from `tiles`
  | { type: "order"; q: string; tiles: string[]; end: string; answer: string; tipEn: string; tipTa: string };

export type Chapter = {
  slug: string;
  n: number;
  landmarks: [string, string]; // ids from landmarks.json shown in the skyline: [Tamil Nadu, Germany]
  mood: Mood; // weather / time of day behind the skyline
  title: string; // German title
  sub: string; // English subtitle
  speakers: Record<string, { initial: string; name: string }>;
  lines: Line[];
  words: Record<string, Word>;
  culture: { tn: string; de: string };
  quiz: Question[];
  pass: number; // correct answers needed to unlock the next chapter
};

export const chapters: Chapter[] = [
  {
    slug: "ankunft",
    n: 1,
    landmarks: ["TN002", "DE010"], // Meenakshi Temple, Römer in Frankfurt
    mood: "dawn", // arriving at dawn
    title: "Ankunft",
    sub: "Arrival in Frankfurt",
    speakers: { b: { initial: "B", name: "Border officer" }, p: { initial: "P", name: "Priya" } },
    lines: [
      {
        who: "b",
        parts: ["Guten Tag! Ihren ", { t: "Pass", k: "pass" }, ", ", { t: "bitte", k: "bitte" }, "."],
        en: "Good day! Your passport, please.",
        ta: "வணக்கம்! உங்கள் கடவுச்சீட்டு, தயவுசெய்து.",
      },
      {
        who: "p",
        parts: ["Guten Tag. Hier ist mein ", { t: "Pass", k: "pass" }, "."],
        en: "Good day. Here is my passport.",
        ta: "வணக்கம். இதோ என் கடவுச்சீட்டு.",
      },
      {
        who: "b",
        parts: ["Danke. ", { t: "Woher", k: "woher" }, " kommen Sie?"],
        en: "Thank you. Where do you come from?",
        ta: "நன்றி. நீங்கள் எங்கிருந்து வருகிறீர்கள்?",
      },
      {
        who: "p",
        parts: ["Ich komme aus Indien, aus Madurai."],
        en: "I come from India, from Madurai.",
        ta: "நான் இந்தியாவிலிருந்து, மதுரையிலிருந்து வருகிறேன்.",
      },
      {
        who: "b",
        parts: [{ t: "Willkommen", k: "willkommen" }, " in Deutschland!"],
        en: "Welcome to Germany!",
        ta: "ஜெர்மனிக்கு நல்வரவு!",
      },
    ],
    words: {
      pass: { de: "der Pass", en: "the passport", ta: "கடவுச்சீட்டு", ex: "Hier ist mein Pass.", exEn: "Here is my passport.", exTa: "இதோ என் கடவுச்சீட்டு." },
      bitte: { de: "bitte", en: "please / you're welcome", ta: "தயவுசெய்து / பரவாயில்லை", ex: "Einen Tee, bitte.", exEn: "A tea, please.", exTa: "ஒரு தேநீர், தயவுசெய்து." },
      woher: { de: "woher", en: "where from", ta: "எங்கிருந்து", ex: "Woher kommst du?", exEn: "Where do you come from?", exTa: "நீ எங்கிருந்து வருகிறாய்?" },
      willkommen: { de: "willkommen", en: "welcome", ta: "நல்வரவு", ex: "Willkommen in Berlin!", exEn: "Welcome to Berlin!", exTa: "பெர்லினுக்கு நல்வரவு!" },
    },
    culture: {
      tn: "In Tamil Nadu a guest is greeted with “vaanga” and a warm smile.",
      de: "Officials and strangers are addressed with the polite “Sie”. Friends say “du”.",
    },
    quiz: [
      {
        type: "choice",
        q: "The officer asks for your passport. What do you say?",
        options: ["Hier ist mein Pass.", "Hier mein ist Pass.", "Hier bin ich Pass."],
        answer: "Hier ist mein Pass.",
        tipEn: "The verb is always in position 2: Hier ist mein Pass.",
        tipTa: "வினைச்சொல் எப்போதும் 2-ஆம் இடத்தில்: Hier ist mein Pass.",
      },
      {
        type: "choice",
        q: "___ kommen Sie? – Aus Indien.",
        options: ["Woher", "Wohin", "Wann"],
        answer: "Woher",
        tipEn: "Woher asks where someone comes from. “Aus Indien” answers it.",
        tipTa: "Woher = எங்கிருந்து. “Aus Indien” அதற்கான பதில்.",
      },
      {
        type: "order",
        q: "Build the sentence: “Welcome to Germany!”",
        tiles: ["Willkommen", "in", "Deutschland", "bitte"],
        end: "!",
        answer: "Willkommen in Deutschland!",
        tipEn: "Countries like Deutschland take no article after “in”.",
        tipTa: "Deutschland போன்ற நாடுகளுக்கு “in” உடன் article வராது.",
      },
    ],
    pass: 2,
  },
  {
    slug: "neue-freunde",
    n: 2,
    landmarks: ["TN003", "DE001"], // Shore Temple, Brandenburg Gate
    mood: "noon", // a sunny day with new friends
    title: "Neue Freunde",
    sub: "Introduce yourself",
    speakers: { l: { initial: "L", name: "Lena" }, p: { initial: "P", name: "Priya" } },
    lines: [
      {
        who: "l",
        parts: ["Hallo! Ich bin Lena. Wie ", { t: "heißt", k: "heissen" }, " du?"],
        en: "Hello! I'm Lena. What's your name?",
        ta: "வணக்கம்! நான் லேனா. உன் பெயர் என்ன?",
      },
      {
        who: "p",
        parts: ["Hallo Lena! Ich ", { t: "heiße", k: "heissen" }, " Priya. Ich ", { t: "komme aus", k: "kommen" }, " Madurai."],
        en: "Hello Lena! My name is Priya. I come from Madurai.",
        ta: "வணக்கம் லேனா! என் பெயர் பிரியா. நான் மதுரையிலிருந்து வருகிறேன்.",
      },
      {
        who: "l",
        parts: ["Madurai? ", { t: "Wo", k: "wo" }, " ist das?"],
        en: "Madurai? Where is that?",
        ta: "மதுரையா? அது எங்கே இருக்கிறது?",
      },
      {
        who: "p",
        parts: ["In Indien, in Tamil Nadu. Dort gibt es einen großen ", { t: "Tempel", k: "tempel" }, "."],
        en: "In India, in Tamil Nadu. There is a big temple there.",
        ta: "இந்தியாவில், தமிழ்நாட்டில். அங்கே ஒரு பெரிய கோயில் இருக்கிறது.",
      },
    ],
    words: {
      heissen: { de: "heißen", en: "to be called", ta: "பெயர் கொண்டிரு", ex: "Ich heiße Priya.", exEn: "My name is Priya.", exTa: "என் பெயர் பிரியா." },
      kommen: { de: "kommen aus", en: "to come from", ta: "…இருந்து வா", ex: "Ich komme aus Madurai.", exEn: "I come from Madurai.", exTa: "நான் மதுரையிலிருந்து வருகிறேன்." },
      wo: { de: "wo", en: "where", ta: "எங்கே", ex: "Wo ist das?", exEn: "Where is that?", exTa: "அது எங்கே?" },
      tempel: { de: "der Tempel", en: "the temple", ta: "கோயில்", ex: "Der Tempel ist groß.", exEn: "The temple is big.", exTa: "கோயில் பெரியது." },
    },
    culture: {
      tn: "In Tamil Nadu you greet with “vanakkam”, hands folded.",
      de: "In Germany you say “Guten Tag”, shake hands and look at the person.",
    },
    quiz: [
      {
        type: "choice",
        q: "Which sentence means “My name is Priya”?",
        options: ["Ich heiße Priya.", "Ich bin heißen Priya.", "Ich Priya heiße."],
        answer: "Ich heiße Priya.",
        tipEn: "The verb is in position 2: Ich + heiße.",
        tipTa: "வினைச்சொல் 2-ஆம் இடத்தில்: Ich + heiße.",
      },
      {
        type: "choice",
        q: "Ich ___ aus Madurai.",
        options: ["komme", "kommst", "kommt"],
        answer: "komme",
        tipEn: "With ich the verb ends in -e.",
        tipTa: "ich உடன் வினை -e இல் முடியும்.",
      },
      {
        type: "order",
        q: "Build the sentence: “I live in Berlin.”",
        tiles: ["Ich", "wohne", "in", "Berlin", "wohnst"],
        end: ".",
        answer: "Ich wohne in Berlin.",
        tipEn: "ich → wohne (not wohnst).",
        tipTa: "ich → wohne (wohnst அல்ல).",
      },
    ],
    pass: 2,
  },
];

// Chapters on the path that are planned but not written yet.
export const upcoming = [
  { title: "Die Wohnung", sub: "Your first flat" },
  { title: "Auf dem Markt", sub: "Buy fruit and tea" },
  { title: "Pongal in Berlin", sub: "Share a festival" },
];

export const chapterBySlug = (slug: string) => chapters.find((c) => c.slug === slug);
export const doneKey = (slug: string) => `chapter-${slug}`;

/** Marks a chapter check. Used by the server action, so the browser cannot fake a pass. */
export function markChapter(chapter: Chapter, answers: string[]) {
  const norm = (s: string) => s.trim().toLowerCase();
  const correct = chapter.quiz.filter((q, i) => norm(answers[i] ?? "") === norm(q.answer)).length;
  return { score: correct, total: chapter.quiz.length, passed: correct >= chapter.pass };
}
