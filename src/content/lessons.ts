export type Bilingual = { en: string; ta: string };

export type Table = { title: string; headers: string[]; rows: string[][] };

// With `options` it is multiple choice; without, the learner types the answer.
export type Exercise = { q: string; options?: string[]; answer: string; tip?: Bilingual };

export type Lesson = {
  slug: string;
  level: "A1" | "A2";
  title: Bilingual;
  intro: Bilingual;
  tables?: Table[];
  points: { de: string; en: string; ta: string }[];
  exercises: Exercise[];
};

export const lessons: Lesson[] = [
  {
    slug: "pronouns",
    level: "A1",
    title: { en: "Personal pronouns", ta: "ஆள்மாற்றுப் பெயர்கள்" },
    intro: {
      en: "Pronouns replace a name. Use du with friends and family, and Sie (capital S) with strangers, teachers and officials.",
      ta: "பெயருக்குப் பதிலாக வரும் சொற்கள். நண்பர்கள், குடும்பத்தினரிடம் du; அறிமுகமில்லாதவர், ஆசிரியர், அதிகாரிகளிடம் Sie (பெரிய S).",
    },
    tables: [
      {
        title: "Nominativ pronouns / எழுவாய் பெயர்கள்",
        headers: ["Deutsch", "English", "தமிழ்"],
        rows: [
          ["ich", "I", "நான்"],
          ["du", "you (informal)", "நீ"],
          ["er", "he", "அவன்"],
          ["sie", "she", "அவள்"],
          ["es", "it", "அது"],
          ["wir", "we", "நாங்கள் / நாம்"],
          ["ihr", "you (plural, informal)", "நீங்கள் (நெருக்கமானவர்கள்)"],
          ["sie", "they", "அவர்கள்"],
          ["Sie", "you (formal)", "நீங்கள் (மரியாதையாக)"],
        ],
      },
    ],
    points: [
      { de: "Ich bin Anna.", en: "I am Anna.", ta: "நான் அன்னா." },
      { de: "Er wohnt in Berlin.", en: "He lives in Berlin.", ta: "அவன் பெர்லினில் வசிக்கிறான்." },
      { de: "Wie heißen Sie?", en: "What is your name? (formal)", ta: "உங்கள் பெயர் என்ன? (மரியாதையாக)" },
    ],
    exercises: [
      { q: "___ bin müde. (I)", options: ["Ich", "Du", "Er"], answer: "Ich" },
      { q: "Anna ist meine Freundin. ___ wohnt in Berlin.", options: ["Er", "Sie", "Es"], answer: "Sie" },
      { q: "Raj und ich lernen Deutsch. ___ lernen Deutsch.", options: ["Wir", "Ihr", "Sie"], answer: "Wir" },
      {
        q: "To your teacher: Wie heißen ___?",
        options: ["du", "Sie", "ihr"],
        answer: "Sie",
        tip: { en: "Formal 'you' is always Sie.", ta: "மரியாதையான 'நீங்கள்' எப்போதும் Sie." },
      },
    ],
  },
  {
    slug: "sein-haben",
    level: "A1",
    title: { en: "sein (to be) and haben (to have)", ta: "sein (இரு) மற்றும் haben (உடைமை)" },
    intro: {
      en: "The two most important verbs. They are irregular, so learn the table by heart.",
      ta: "மிக முக்கியமான இரண்டு வினைச்சொற்கள். இவை ஒழுங்கற்றவை, அட்டவணையை மனப்பாடம் செய்யுங்கள்.",
    },
    tables: [
      {
        title: "sein & haben",
        headers: ["Pronoun", "sein", "haben"],
        rows: [
          ["ich", "bin", "habe"],
          ["du", "bist", "hast"],
          ["er / sie / es", "ist", "hat"],
          ["wir", "sind", "haben"],
          ["ihr", "seid", "habt"],
          ["sie / Sie", "sind", "haben"],
        ],
      },
    ],
    points: [
      { de: "Ich bin müde.", en: "I am tired.", ta: "நான் களைப்பாக இருக்கிறேன்." },
      { de: "Ich habe Hunger.", en: "I am hungry. (I have hunger)", ta: "எனக்குப் பசிக்கிறது." },
      { de: "Sie hat eine Schwester.", en: "She has a sister.", ta: "அவளுக்கு ஒரு சகோதரி இருக்கிறாள்." },
    ],
    exercises: [
      { q: "Du ___ Student.", options: ["bin", "bist", "ist"], answer: "bist" },
      { q: "Er ___ Hunger.", options: ["hat", "hast", "habt"], answer: "hat" },
      { q: "Wir ___ aus Indien.", options: ["seid", "ist", "sind"], answer: "sind" },
      { q: "Ihr ___ eine Wohnung. (haben)", answer: "habt" },
    ],
  },
  {
    slug: "regular-verbs",
    level: "A1",
    title: { en: "Regular verbs in the present", ta: "நிகழ்கால ஒழுங்கான வினைச்சொற்கள்" },
    intro: {
      en: "Remove -en from the infinitive and add the ending. Verbs ending in -t or -d (arbeiten, finden) add an extra e for du, er and ihr.",
      ta: "வினை வடிவத்தில் இருந்து -en நீக்கி, முடிவை சேர்க்கவும். -t அல்லது -d இல் முடியும் வினைகளுக்கு (arbeiten, finden) du, er, ihr உடன் கூடுதல் e வரும்.",
    },
    tables: [
      {
        title: "Endings / முடிவுகள்",
        headers: ["Pronoun", "Ending", "lernen", "arbeiten"],
        rows: [
          ["ich", "-e", "lerne", "arbeite"],
          ["du", "-st", "lernst", "arbeitest"],
          ["er / sie / es", "-t", "lernt", "arbeitet"],
          ["wir", "-en", "lernen", "arbeiten"],
          ["ihr", "-t", "lernt", "arbeitet"],
          ["sie / Sie", "-en", "lernen", "arbeiten"],
        ],
      },
    ],
    points: [
      { de: "Ich lerne Deutsch.", en: "I am learning German.", ta: "நான் ஜெர்மன் கற்கிறேன்." },
      { de: "Du wohnst in Chennai.", en: "You live in Chennai.", ta: "நீ சென்னையில் வசிக்கிறாய்." },
      { de: "Wir trinken Tee.", en: "We drink tea.", ta: "நாங்கள் தேநீர் குடிக்கிறோம்." },
    ],
    exercises: [
      { q: "Ich ___ Deutsch. (lernen)", answer: "lerne" },
      { q: "Du ___ in Chennai. (wohnen)", answer: "wohnst" },
      { q: "Er ___ heute. (arbeiten)", answer: "arbeitet", tip: { en: "Stem ends in -t, so add an extra e.", ta: "வினை வேர் -t இல் முடிவதால் கூடுதல் e சேரும்." } },
      { q: "Wir ___ Tee. (trinken)", answer: "trinken" },
    ],
  },
  {
    slug: "sentence-order",
    level: "A1",
    title: { en: "Sentence order (verb in position 2)", ta: "வாக்கிய வரிசை (வினைச்சொல் 2-ஆம் இடத்தில்)" },
    intro: {
      en: "In a German main sentence the conjugated verb is always in position 2. Position 1 can be the subject or any other part, such as the time.",
      ta: "ஜெர்மன் வாக்கியத்தில் வினைச்சொல் எப்போதும் 2-ஆம் இடத்தில் வரும். 1-ஆம் இடத்தில் எழுவாய் அல்லது நேரம் போன்ற வேறு பகுதி வரலாம்.",
    },
    tables: [
      {
        title: "Position / இடம்",
        headers: ["1", "2 (verb)", "3 …"],
        rows: [
          ["Ich", "lerne", "heute Deutsch."],
          ["Heute", "lerne", "ich Deutsch."],
          ["Morgen", "arbeite", "ich nicht."],
        ],
      },
    ],
    points: [
      { de: "Ich lerne heute Deutsch.", en: "I am learning German today.", ta: "நான் இன்று ஜெர்மன் கற்கிறேன்." },
      { de: "Heute lerne ich Deutsch.", en: "Today I learn German. (verb stays 2nd)", ta: "இன்று நான் ஜெர்மன் கற்கிறேன். (வினை 2-ஆம் இடத்தில்)" },
    ],
    exercises: [
      { q: "Heute ___ ich Deutsch.", options: ["lerne", "lernst", "lernen"], answer: "lerne" },
      {
        q: "Which is correct?",
        options: ["Morgen ich arbeite.", "Morgen arbeite ich.", "Arbeite morgen ich."],
        answer: "Morgen arbeite ich.",
      },
      {
        q: "Which is correct?",
        options: ["Wir heute lernen.", "Heute wir lernen.", "Heute lernen wir."],
        answer: "Heute lernen wir.",
      },
    ],
  },
  {
    slug: "questions",
    level: "A1",
    title: { en: "Asking questions", ta: "கேள்விகள் கேட்பது" },
    intro: {
      en: "W-questions start with a question word, then the verb. Yes/no questions start with the verb.",
      ta: "W-கேள்விகள் கேள்விச் சொல்லுடன் தொடங்கி, அடுத்து வினை வரும். ஆம்/இல்லை கேள்விகள் வினையுடன் தொடங்கும்.",
    },
    tables: [
      {
        title: "Question words / கேள்விச் சொற்கள்",
        headers: ["Deutsch", "English", "தமிழ்"],
        rows: [
          ["Wer", "who", "யார்"],
          ["Was", "what", "என்ன"],
          ["Wo", "where", "எங்கே"],
          ["Woher", "where from", "எங்கிருந்து"],
          ["Wohin", "where to", "எங்கே (நோக்கி)"],
          ["Wann", "when", "எப்போது"],
          ["Wie", "how", "எப்படி"],
          ["Warum", "why", "ஏன்"],
        ],
      },
    ],
    points: [
      { de: "Woher kommst du?", en: "Where do you come from?", ta: "நீ எங்கிருந்து வருகிறாய்?" },
      { de: "Wo wohnst du?", en: "Where do you live?", ta: "நீ எங்கே வசிக்கிறாய்?" },
      { de: "Kommst du aus Indien?", en: "Do you come from India?", ta: "நீ இந்தியாவிலிருந்து வருகிறாயா?" },
    ],
    exercises: [
      { q: "___ wohnst du? – In Berlin.", options: ["Wo", "Woher", "Wann"], answer: "Wo" },
      { q: "___ kommst du? – Aus Indien.", options: ["Wohin", "Woher", "Was"], answer: "Woher" },
      { q: "___ alt bist du? – 25.", options: ["Wie", "Wer", "Warum"], answer: "Wie" },
      { q: "___ lernst du Deutsch? – Ich ziehe nach Deutschland.", options: ["Wann", "Wo", "Warum"], answer: "Warum" },
    ],
  },
  {
    slug: "negation",
    level: "A1",
    title: { en: "Negation: nicht and kein", ta: "எதிர்மறை: nicht மற்றும் kein" },
    intro: {
      en: "Use kein before a noun with ein/eine or with no article. Use nicht for everything else (verbs, adjectives, definite nouns).",
      ta: "ein/eine உடன் அல்லது article இல்லாத பெயர்ச்சொல்லுக்கு முன் kein. மற்ற எல்லாவற்றிற்கும் (வினை, பெயரடை, definite பெயர்ச்சொல்) nicht.",
    },
    tables: [
      {
        title: "kein (like ein)",
        headers: ["Gender", "Nominativ", "Akkusativ", "Dativ"],
        rows: [
          ["masculine / ஆண்", "kein", "keinen", "keinem"],
          ["feminine / பெண்", "keine", "keine", "keiner"],
          ["neuter / நடுப்பால்", "kein", "kein", "keinem"],
          ["plural / பன்மை", "keine", "keine", "keinen"],
        ],
      },
    ],
    points: [
      { de: "Ich habe keine Zeit.", en: "I have no time.", ta: "எனக்கு நேரம் இல்லை." },
      { de: "Das ist kein Auto.", en: "That is not a car.", ta: "இது கார் அல்ல." },
      { de: "Ich bin nicht müde.", en: "I am not tired.", ta: "நான் களைப்பாக இல்லை." },
    ],
    exercises: [
      { q: "Ich habe ___ Zeit.", options: ["nicht", "kein", "keine"], answer: "keine" },
      { q: "Das ist ___ Auto.", options: ["kein", "nicht", "keine"], answer: "kein" },
      { q: "Ich bin ___ müde.", options: ["kein", "nicht", "keine"], answer: "nicht" },
      {
        q: "Ich habe ___ Bruder. (der Bruder, Akkusativ)",
        options: ["kein", "keinen", "keine"],
        answer: "keinen",
        tip: { en: "Masculine Akkusativ: -en.", ta: "ஆண்பால் Akkusativ: -en." },
      },
    ],
  },
  {
    slug: "possessives",
    level: "A1",
    title: { en: "Possessive articles (mein, dein, …)", ta: "உடைமைச் சொற்கள் (mein, dein, …)" },
    intro: {
      en: "They show who owns something. They take the same endings as ein/kein.",
      ta: "யாருடையது என்பதைக் காட்டும். ein/kein போன்ற அதே முடிவுகளை ஏற்கும்.",
    },
    tables: [
      {
        title: "Possessives / உடைமைச் சொற்கள்",
        headers: ["Pronoun", "Possessive", "தமிழ்"],
        rows: [
          ["ich", "mein", "என்"],
          ["du", "dein", "உன்"],
          ["er / es", "sein", "அவனுடைய / அதனுடைய"],
          ["sie", "ihr", "அவளுடைய"],
          ["wir", "unser", "எங்கள்"],
          ["ihr", "euer", "உங்கள்"],
          ["sie / Sie", "ihr / Ihr", "அவர்களுடைய / உங்கள்"],
        ],
      },
      {
        title: "Endings with mein",
        headers: ["Gender", "Nominativ", "Akkusativ", "Dativ"],
        rows: [
          ["masculine / ஆண்", "mein", "meinen", "meinem"],
          ["feminine / பெண்", "meine", "meine", "meiner"],
          ["neuter / நடுப்பால்", "mein", "mein", "meinem"],
          ["plural / பன்மை", "meine", "meine", "meinen (+n)"],
        ],
      },
    ],
    points: [
      { de: "Das ist mein Buch.", en: "This is my book.", ta: "இது என் புத்தகம்." },
      { de: "Ich sehe meinen Bruder.", en: "I see my brother.", ta: "நான் என் சகோதரனைப் பார்க்கிறேன்." },
      { de: "Ich helfe meiner Schwester.", en: "I help my sister.", ta: "நான் என் சகோதரிக்கு உதவுகிறேன்." },
    ],
    exercises: [
      { q: "Das ist ___ Buch. (ich)", options: ["mein", "meine", "meinen"], answer: "mein" },
      { q: "Ich sehe ___ Bruder. (ich, Akkusativ)", options: ["mein", "meinen", "meinem"], answer: "meinen" },
      { q: "Das ist ___ Mutter. (er)", options: ["sein", "seine", "seinen"], answer: "seine" },
      {
        q: "Ich helfe ___ Schwester. (ich, Dativ)",
        options: ["meine", "meinen", "meiner"],
        answer: "meiner",
        tip: { en: "helfen takes Dativ; feminine Dativ: -er.", ta: "helfen உடன் Dativ; பெண்பால் Dativ: -er." },
      },
    ],
  },
];

export type CaseRow = { gender: string; nom: string; akk: string; dat: string };

export const definiteArticles: CaseRow[] = [
  { gender: "masculine / ஆண்", nom: "der", akk: "den", dat: "dem" },
  { gender: "feminine / பெண்", nom: "die", akk: "die", dat: "der" },
  { gender: "neuter / நடுப்பால்", nom: "das", akk: "das", dat: "dem" },
  { gender: "plural / பன்மை", nom: "die", akk: "die", dat: "den (+n)" },
];

export const indefiniteArticles: CaseRow[] = [
  { gender: "masculine / ஆண்", nom: "ein", akk: "einen", dat: "einem" },
  { gender: "feminine / பெண்", nom: "eine", akk: "eine", dat: "einer" },
  { gender: "neuter / நடுப்பால்", nom: "ein", akk: "ein", dat: "einem" },
  { gender: "plural / பன்மை", nom: "–", akk: "–", dat: "–" },
];
