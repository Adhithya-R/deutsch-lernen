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
      { de: "Ich bin Poovai.", en: "I am Poovai.", ta: "நான் பூவை." },
      { de: "Er wohnt in Berlin.", en: "He lives in Berlin.", ta: "அவன் பெர்லினில் வசிக்கிறான்." },
      { de: "Wie heißen Sie?", en: "What is your name? (formal)", ta: "உங்கள் பெயர் என்ன? (மரியாதையாக)" },
    ],
    exercises: [
      { q: "___ bin müde. (I)", options: ["Ich", "Du", "Er"], answer: "Ich" },
      { q: "Poovai ist meine Freundin. ___ wohnt in Berlin.", options: ["Er", "Sie", "Es"], answer: "Sie" },
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

  /* ------------------------------ more A1 ------------------------------ */
  {
    slug: "plural",
    level: "A1",
    title: { en: "Plural of nouns", ta: "பெயர்ச்சொற்களின் பன்மை" },
    intro: {
      en: "German nouns form the plural in several ways. Always learn the plural together with the noun and its article. In the plural the article is always die.",
      ta: "ஜெர்மன் பெயர்ச்சொற்கள் பல வழிகளில் பன்மை ஆகும். பெயர்ச்சொல்லுடன் பன்மையையும் சேர்த்துக் கற்றுக்கொள்ளுங்கள். பன்மையில் article எப்போதும் die.",
    },
    tables: [
      {
        title: "Plural endings",
        headers: ["Type", "Singular", "Plural"],
        rows: [
          ["-e", "der Tisch", "die Tische"],
          ["-n / -en", "die Küche", "die Küchen"],
          ["-er (+ umlaut)", "das Kind", "die Kinder"],
          ["-s", "das Auto", "die Autos"],
          ["umlaut only", "der Apfel", "die Äpfel"],
          ["no change", "der Lehrer", "die Lehrer"],
        ],
      },
    ],
    points: [
      { de: "Ich habe zwei Brüder.", en: "I have two brothers.", ta: "எனக்கு இரண்டு சகோதரர்கள் உள்ளனர்." },
      { de: "Die Kinder spielen im Park.", en: "The children play in the park.", ta: "குழந்தைகள் பூங்காவில் விளையாடுகின்றனர்." },
      { de: "Wir brauchen drei Stühle.", en: "We need three chairs.", ta: "எங்களுக்கு மூன்று நாற்காலிகள் வேண்டும்." },
    ],
    exercises: [
      { q: "Plural of das Kind: die ___", answer: "Kinder" },
      { q: "Plural of das Auto:", options: ["die Autos", "die Autoen", "die Äuter"], answer: "die Autos", tip: { en: "Words from other languages often take -s.", ta: "வெளிநாட்டு சொற்கள் பெரும்பாலும் -s பெறும்." } },
      { q: "Plural of die Küche:", options: ["die Küchen", "die Küche", "die Küchs"], answer: "die Küchen" },
      { q: "Plural of der Apfel:", options: ["die Äpfel", "die Apfeln", "die Apfels"], answer: "die Äpfel" },
    ],
  },
  {
    slug: "akkusativ",
    level: "A1",
    title: { en: "Akkusativ in action", ta: "Akkusativ பயன்பாடு" },
    intro: {
      en: "The thing that receives the action is in the Akkusativ. Only the masculine article changes: der becomes den, ein becomes einen.",
      ta: "செயலைப் பெறும் பொருள் Akkusativ இல் வரும். ஆண்பால் article மட்டுமே மாறும்: der → den, ein → einen.",
    },
    tables: [
      {
        title: "Nominativ and Akkusativ",
        headers: ["Case", "masculine", "feminine", "neuter", "plural"],
        rows: [
          ["Nominativ", "der / ein", "die / eine", "das / ein", "die"],
          ["Akkusativ", "den / einen", "die / eine", "das / ein", "die"],
        ],
      },
    ],
    points: [
      { de: "Ich kaufe einen Apfel.", en: "I buy an apple.", ta: "நான் ஒரு ஆப்பிள் வாங்குகிறேன்." },
      { de: "Wir sehen den Dom.", en: "We see the cathedral.", ta: "நாங்கள் தேவாலயத்தைப் பார்க்கிறோம்." },
      { de: "Sie hat eine Schwester.", en: "She has a sister.", ta: "அவளுக்கு ஒரு சகோதரி இருக்கிறாள்." },
    ],
    exercises: [
      { q: "Ich kaufe ___ Apfel. (der Apfel)", options: ["einen", "ein", "eine"], answer: "einen" },
      { q: "Ich sehe ___ Frau. (die Frau)", options: ["einen", "eine", "ein"], answer: "eine", tip: { en: "Feminine does not change.", ta: "பெண்பால் மாறாது." } },
      { q: "Ich nehme ___ Tee. (der Tee)", answer: "den" },
      { q: "Wir haben ___ Kind. (das Kind)", options: ["ein", "einen", "eine"], answer: "ein" },
    ],
  },
  {
    slug: "modal-verbs",
    level: "A1",
    title: { en: "Modal verbs: können, müssen, möchten, wollen", ta: "துணை வினைகள்: können, müssen, möchten, wollen" },
    intro: {
      en: "Modal verbs add meaning: ability, duty, wish. The modal verb is in position 2 and the main verb goes to the end as an infinitive.",
      ta: "இவை திறன், கடமை, விருப்பம் ஆகியவற்றைச் சேர்க்கும். துணை வினை 2-ஆம் இடத்தில்; முக்கிய வினை அடிவடிவத்தில் கடைசியில்.",
    },
    tables: [
      {
        title: "Present tense",
        headers: ["Pronoun", "können", "müssen", "möchten", "wollen"],
        rows: [
          ["ich", "kann", "muss", "möchte", "will"],
          ["du", "kannst", "musst", "möchtest", "willst"],
          ["er / sie / es", "kann", "muss", "möchte", "will"],
          ["wir", "können", "müssen", "möchten", "wollen"],
          ["ihr", "könnt", "müsst", "möchtet", "wollt"],
          ["sie / Sie", "können", "müssen", "möchten", "wollen"],
        ],
      },
    ],
    points: [
      { de: "Ich kann gut kochen.", en: "I can cook well.", ta: "எனக்கு நன்றாக சமைக்கத் தெரியும்." },
      { de: "Du musst pünktlich sein.", en: "You must be on time.", ta: "நீ சரியான நேரத்தில் இருக்க வேண்டும்." },
      { de: "Wir möchten einen Tisch reservieren.", en: "We would like to reserve a table.", ta: "நாங்கள் ஒரு மேசையை முன்பதிவு செய்ய விரும்புகிறோம்." },
    ],
    exercises: [
      { q: "Ich ___ heute arbeiten. (müssen)", options: ["muss", "musst", "müssen"], answer: "muss" },
      { q: "Er ___ gut Deutsch sprechen. (können)", options: ["kann", "kannst", "können"], answer: "kann" },
      { q: "Wir ___ ins Kino gehen. (wollen)", answer: "wollen" },
      {
        q: "Which sentence is correct?",
        options: ["Ich möchte einen Tee trinken.", "Ich möchte trinken einen Tee.", "Ich einen Tee möchte trinken."],
        answer: "Ich möchte einen Tee trinken.",
        tip: { en: "Modal in position 2, infinitive at the end.", ta: "துணை வினை 2-ஆம் இடத்தில், அடிவடிவம் கடைசியில்." },
      },
    ],
  },
  {
    slug: "numbers-time",
    level: "A1",
    title: { en: "Numbers, time and prices", ta: "எண்கள், நேரம், விலைகள்" },
    intro: {
      en: "Say numbers up to 100, tell the time and name prices. Careful: halb vier means 3:30, half an hour before four.",
      ta: "100 வரை எண்கள், நேரம், விலைகள். கவனம்: halb vier என்றால் 3:30 (நான்கு மணிக்கு அரை மணி முன்).",
    },
    tables: [
      {
        title: "Numbers",
        headers: ["Number", "Deutsch"],
        rows: [
          ["1", "eins"], ["2", "zwei"], ["3", "drei"], ["4", "vier"], ["5", "fünf"], ["6", "sechs"], ["7", "sieben"],
          ["8", "acht"], ["9", "neun"], ["10", "zehn"], ["11", "elf"], ["12", "zwölf"], ["20", "zwanzig"],
          ["21", "einundzwanzig"], ["30", "dreißig"], ["40", "vierzig"], ["50", "fünfzig"], ["100", "hundert"],
        ],
      },
      {
        title: "The time",
        headers: ["Time", "Deutsch"],
        rows: [
          ["3:00", "drei Uhr"],
          ["3:15", "Viertel nach drei"],
          ["3:30", "halb vier"],
          ["3:45", "Viertel vor vier"],
          ["15:20", "fünfzehn Uhr zwanzig"],
        ],
      },
    ],
    points: [
      { de: "Es ist halb acht.", en: "It is half past seven.", ta: "இப்போது ஏழரை மணி." },
      { de: "Der Kaffee kostet drei Euro fünfzig.", en: "The coffee costs three euros fifty.", ta: "காப்பி மூன்று யூரோ ஐம்பது சென்ட்." },
      { de: "Um Viertel nach neun beginnt der Kurs.", en: "The course begins at quarter past nine.", ta: "ஒன்பது கால் மணிக்கு வகுப்பு தொடங்கும்." },
    ],
    exercises: [
      { q: "40 in German:", answer: "vierzig" },
      { q: "halb vier is…", options: ["3:30", "4:30", "3:15"], answer: "3:30", tip: { en: "halb vier = half way to four.", ta: "halb vier = நான்கை நோக்கி அரை." } },
      { q: "21 in German:", options: ["einundzwanzig", "zweiundzehn", "zwanzigeins"], answer: "einundzwanzig", tip: { en: "The small number comes first: one-and-twenty.", ta: "சிறிய எண் முதலில்: ஒன்று-மற்றும்-இருபது." } },
      { q: "3,50 € = drei Euro ___", answer: "fünfzig" },
    ],
  },
  {
    slug: "separable-verbs",
    level: "A1",
    title: { en: "Separable verbs", ta: "பிரியும் வினைகள்" },
    intro: {
      en: "Some verbs have a prefix that separates in the present tense and moves to the end of the sentence: aufstehen becomes “ich stehe … auf”.",
      ta: "சில வினைகளின் முன்னொட்டு தனியாகப் பிரிந்து வாக்கியத்தின் கடைசிக்குச் செல்லும்: aufstehen → “ich stehe … auf”.",
    },
    tables: [
      {
        title: "Common separable verbs",
        headers: ["Infinitive", "Sentence", "English"],
        rows: [
          ["aufstehen", "Ich stehe um sieben Uhr auf.", "I get up at seven."],
          ["einkaufen", "Wir kaufen im Supermarkt ein.", "We shop at the supermarket."],
          ["anrufen", "Er ruft seine Mutter an.", "He calls his mother."],
          ["ankommen", "Der Zug kommt um acht Uhr an.", "The train arrives at eight."],
          ["mitbringen", "Ich bringe Kuchen mit.", "I bring cake."],
        ],
      },
    ],
    points: [
      { de: "Ich stehe früh auf.", en: "I get up early.", ta: "நான் அதிகாலையில் எழுகிறேன்." },
      { de: "Rufst du mich bitte an?", en: "Will you call me, please?", ta: "தயவுசெய்து எனக்கு அழைப்பாயா?" },
      { de: "Wann kommt der Bus an?", en: "When does the bus arrive?", ta: "பேருந்து எப்போது வரும்?" },
    ],
    exercises: [
      {
        q: "Which sentence is correct?",
        options: ["Ich stehe um sechs Uhr auf.", "Ich aufstehe um sechs Uhr.", "Ich stehe auf um sechs Uhr."],
        answer: "Ich stehe um sechs Uhr auf.",
        tip: { en: "The prefix goes to the very end.", ta: "முன்னொட்டு மிகக் கடைசிக்குச் செல்லும்." },
      },
      { q: "Wir kaufen heute ___. (einkaufen)", answer: "ein" },
      { q: "Der Zug kommt um acht Uhr ___. (ankommen)", answer: "an" },
      { q: "Er ___ seine Mutter an. (anrufen)", options: ["ruft", "rufst", "rufen"], answer: "ruft" },
    ],
  },
  {
    slug: "imperative",
    level: "A1",
    title: { en: "Imperative (commands and requests)", ta: "கட்டளை வடிவம்" },
    intro: {
      en: "Use the imperative for requests and instructions. The form depends on who you speak to: du, ihr or Sie. Add bitte to be polite.",
      ta: "கோரிக்கை, வழிமுறைகளுக்கு கட்டளை வடிவம். யாரிடம் பேசுகிறீர்கள் என்பதைப் பொறுத்து: du, ihr, Sie. பணிவுக்கு bitte சேர்க்கவும்.",
    },
    tables: [
      {
        title: "The three forms",
        headers: ["Person", "Rule", "Example"],
        rows: [
          ["du", "verb stem", "Komm bitte pünktlich!"],
          ["ihr", "ihr-form", "Kommt bitte pünktlich!"],
          ["Sie", "verb + Sie", "Kommen Sie bitte pünktlich!"],
          ["du (some verbs)", "vowel changes", "Sprich! Nimm! Lies!"],
          ["sein", "sei / seid / seien Sie", "Sei bitte leise!"],
        ],
      },
    ],
    points: [
      { de: "Mach bitte das Fenster auf!", en: "Please open the window!", ta: "தயவுசெய்து ஜன்னலைத் திற!" },
      { de: "Nehmen Sie bitte Platz!", en: "Please take a seat!", ta: "தயவுசெய்து அமருங்கள்!" },
      { de: "Sprich langsam, bitte.", en: "Speak slowly, please.", ta: "மெதுவாகப் பேசு, தயவுசெய்து." },
    ],
    exercises: [
      { q: "To a friend: ___ bitte pünktlich! (kommen)", options: ["Komm", "Kommst", "Kommen"], answer: "Komm" },
      { q: "To your teacher: ___ Sie bitte! (warten)", options: ["Warten", "Warte", "Wartet"], answer: "Warten" },
      { q: "du-command of nehmen: ___ bitte den Tee!", answer: "Nimm", tip: { en: "nehmen changes its vowel: nimm.", ta: "nehmen உயிர் மாறும்: nimm." } },
      { q: "To friends: ___ bitte leise! (sein)", options: ["Seid", "Sei", "Seien"], answer: "Seid" },
    ],
  },

  /* ------------------------------ A2 ------------------------------ */
  {
    slug: "perfekt",
    level: "A2",
    title: { en: "Perfekt: the past tense", ta: "இறந்த காலம் (Perfekt)" },
    intro: {
      en: "When we speak about the past we use the Perfekt: haben or sein in position 2 and the Partizip II at the end. Most verbs use haben; verbs of movement and change use sein.",
      ta: "கடந்த காலம் பற்றிப் பேச Perfekt: haben அல்லது sein 2-ஆம் இடத்தில், Partizip II கடைசியில். பெரும்பாலான வினைகள் haben; நகர்வு, மாற்ற வினைகள் sein.",
    },
    tables: [
      {
        title: "Examples",
        headers: ["Infinitive", "Partizip II", "Perfekt"],
        rows: [
          ["lernen", "gelernt", "Ich habe Deutsch gelernt."],
          ["machen", "gemacht", "Er hat Tee gemacht."],
          ["essen", "gegessen", "Wir haben Reis gegessen."],
          ["gehen", "gegangen", "Wir sind nach Hause gegangen."],
          ["kommen", "gekommen", "Sie ist aus Indien gekommen."],
          ["fahren", "gefahren", "Ich bin nach Berlin gefahren."],
        ],
      },
    ],
    points: [
      { de: "Gestern habe ich Deutsch gelernt.", en: "Yesterday I studied German.", ta: "நேற்று நான் ஜெர்மன் கற்றேன்." },
      { de: "Am Sonntag sind wir ins Kino gegangen.", en: "On Sunday we went to the cinema.", ta: "ஞாயிற்றுக்கிழமை நாங்கள் திரையரங்கிற்குப் போனோம்." },
      { de: "Hast du schon gegessen?", en: "Have you eaten yet?", ta: "நீ சாப்பிட்டாயா?" },
    ],
    exercises: [
      { q: "Ich ___ gestern nach München gefahren.", options: ["bin", "habe", "ist"], answer: "bin", tip: { en: "fahren is movement, so sein.", ta: "fahren நகர்வு, ஆகவே sein." } },
      { q: "Wir ___ Tee getrunken.", options: ["haben", "sind", "hat"], answer: "haben" },
      { q: "Partizip II of machen:", answer: "gemacht" },
      { q: "Sie ___ aus Indien gekommen.", options: ["ist", "hat", "haben"], answer: "ist" },
    ],
  },
  {
    slug: "dativ-prepositions",
    level: "A2",
    title: { en: "Dativ and its prepositions", ta: "Dativ மற்றும் அதன் முன்னிடைச் சொற்கள்" },
    intro: {
      en: "These prepositions are always followed by the Dativ: aus, bei, mit, nach, seit, von, zu. Learn them as a list.",
      ta: "இந்த முன்னிடைச் சொற்களுக்குப் பிறகு எப்போதும் Dativ: aus, bei, mit, nach, seit, von, zu. பட்டியலாக மனப்பாடம் செய்யுங்கள்.",
    },
    tables: [
      {
        title: "Dativ articles",
        headers: ["", "masculine", "feminine", "neuter", "plural"],
        rows: [
          ["the", "dem", "der", "dem", "den (+n)"],
          ["a", "einem", "einer", "einem", "–"],
        ],
      },
      {
        title: "Prepositions with the Dativ",
        headers: ["Preposition", "Meaning", "Example"],
        rows: [
          ["mit", "with, by", "Ich fahre mit dem Bus."],
          ["nach", "to (cities), after", "Wir fahren nach Berlin."],
          ["bei", "at, near", "Ich wohne bei meiner Tante."],
          ["von", "from, of", "Das Buch ist von meinem Lehrer."],
          ["zu", "to (people, places)", "Ich gehe zum Arzt. (zu dem = zum)"],
          ["aus", "out of, from", "Ich komme aus dem Haus."],
          ["seit", "since, for", "Ich lerne seit einem Jahr Deutsch."],
        ],
      },
    ],
    points: [
      { de: "Ich fahre mit dem Zug nach Hamburg.", en: "I travel to Hamburg by train.", ta: "நான் ரயிலில் ஹாம்பர்க் போகிறேன்." },
      { de: "Wir gehen zum Markt.", en: "We are going to the market.", ta: "நாங்கள் சந்தைக்குப் போகிறோம்." },
      { de: "Sie wohnt seit zwei Jahren in Berlin.", en: "She has lived in Berlin for two years.", ta: "அவள் இரண்டு ஆண்டுகளாக பெர்லினில் வசிக்கிறாள்." },
    ],
    exercises: [
      { q: "Ich fahre mit ___ Bus. (der Bus)", options: ["dem", "den", "der"], answer: "dem" },
      { q: "Ich wohne bei ___ Tante. (meine Tante)", options: ["meiner", "meine", "meinem"], answer: "meiner" },
      { q: "zu + dem =", answer: "zum" },
      { q: "Er kommt aus ___ Schule. (die Schule)", options: ["der", "die", "dem"], answer: "der" },
    ],
  },
  {
    slug: "two-way-prepositions",
    level: "A2",
    title: { en: "Two-way prepositions", ta: "இரு வழி முன்னிடைச் சொற்கள்" },
    intro: {
      en: "in, an, auf, über, unter, vor, hinter, neben, zwischen: use the Dativ for position (Wo?) and the Akkusativ for movement (Wohin?).",
      ta: "in, an, auf, über, unter, vor, hinter, neben, zwischen: இருக்கும் இடத்திற்கு (Wo?) Dativ; போகும் திசைக்கு (Wohin?) Akkusativ.",
    },
    tables: [
      {
        title: "Wo? or Wohin?",
        headers: ["Question", "Case", "Example"],
        rows: [
          ["Wo? (position)", "Dativ", "Ich bin in der Küche."],
          ["Wohin? (movement)", "Akkusativ", "Ich gehe in die Küche."],
          ["Wo?", "Dativ", "Das Bild hängt an der Wand."],
          ["Wohin?", "Akkusativ", "Ich hänge das Bild an die Wand."],
        ],
      },
    ],
    points: [
      { de: "Das Buch liegt auf dem Tisch.", en: "The book is lying on the table.", ta: "புத்தகம் மேசையின் மேல் இருக்கிறது." },
      { de: "Ich lege das Buch auf den Tisch.", en: "I put the book on the table.", ta: "நான் புத்தகத்தை மேசையின் மேல் வைக்கிறேன்." },
      { de: "Wir stehen vor dem Bahnhof.", en: "We are standing in front of the station.", ta: "நாங்கள் ரயில் நிலையத்தின் முன் நிற்கிறோம்." },
    ],
    exercises: [
      { q: "Wo ist die Katze? Sie ist auf ___ Sofa. (das Sofa)", options: ["dem", "das", "den"], answer: "dem" },
      { q: "Wohin gehst du? Ich gehe in ___ Park. (der Park)", options: ["den", "dem", "der"], answer: "den" },
      { q: "Er sitzt neben ___ Freundin. (seine Freundin)", options: ["seiner", "seine", "seinem"], answer: "seiner" },
    ],
  },
  {
    slug: "subordinate-clauses",
    level: "A2",
    title: { en: "weil, dass, wenn", ta: "weil, dass, wenn வாக்கியங்கள்" },
    intro: {
      en: "After weil, dass, wenn and obwohl the verb goes to the end of the clause. If the weil-clause comes first, the main clause starts with its verb.",
      ta: "weil, dass, wenn, obwohl க்குப் பிறகு வினை உட்பிரிவின் கடைசிக்குச் செல்லும். இந்தப் பிரிவு முதலில் வந்தால் முக்கிய வாக்கியம் வினையுடன் தொடங்கும்.",
    },
    tables: [
      {
        title: "Connecting words",
        headers: ["Word", "Meaning", "Example"],
        rows: [
          ["weil", "because", "Ich lerne Deutsch, weil ich in Deutschland arbeite."],
          ["dass", "that", "Ich hoffe, dass du kommst."],
          ["wenn", "if, when", "Wenn ich Zeit habe, koche ich."],
          ["obwohl", "although", "Ich gehe spazieren, obwohl es regnet."],
        ],
      },
    ],
    points: [
      { de: "Ich bleibe zu Hause, weil ich krank bin.", en: "I stay at home because I am ill.", ta: "நான் உடல்நலமின்றி இருப்பதால் வீட்டில் இருக்கிறேன்." },
      { de: "Ich hoffe, dass du kommst.", en: "I hope that you come.", ta: "நீ வருவாய் என்று நம்புகிறேன்." },
      { de: "Wenn es regnet, bleiben wir zu Hause.", en: "If it rains, we stay at home.", ta: "மழை பெய்தால் நாங்கள் வீட்டில் இருப்போம்." },
    ],
    exercises: [
      {
        q: "Which sentence is correct?",
        options: ["Ich bleibe zu Hause, weil ich krank bin.", "Ich bleibe zu Hause, weil bin ich krank.", "Ich bleibe zu Hause, weil ich bin krank."],
        answer: "Ich bleibe zu Hause, weil ich krank bin.",
        tip: { en: "After weil the verb is last.", ta: "weil க்குப் பிறகு வினை கடைசியில்." },
      },
      { q: "Ich hoffe, dass du morgen ___. (kommen)", options: ["kommst", "kommt", "komme"], answer: "kommst" },
      { q: "Wenn es regnet, ___ wir zu Hause. (bleiben)", options: ["bleiben", "bleibt", "bleibe"], answer: "bleiben", tip: { en: "After the wenn-clause the main clause starts with the verb.", ta: "wenn பிரிவுக்குப் பிறகு முக்கிய வாக்கியம் வினையுடன் தொடங்கும்." } },
    ],
  },
  {
    slug: "reflexive-verbs",
    level: "A2",
    title: { en: "Reflexive verbs", ta: "தன்வினைச் சொற்கள் (sich …)" },
    intro: {
      en: "With reflexive verbs the action returns to the subject. Use mich, dich, sich, uns, euch, sich. Very common: sich freuen, sich treffen, sich interessieren.",
      ta: "செயல் எழுவாய்க்கே திரும்பும். mich, dich, sich, uns, euch, sich. மிகவும் பொதுவானவை: sich freuen, sich treffen, sich interessieren.",
    },
    tables: [
      {
        title: "sich freuen, sich treffen",
        headers: ["Pronoun", "sich freuen", "sich treffen"],
        rows: [
          ["ich", "freue mich", "treffe mich"],
          ["du", "freust dich", "triffst dich"],
          ["er / sie / es", "freut sich", "trifft sich"],
          ["wir", "freuen uns", "treffen uns"],
          ["ihr", "freut euch", "trefft euch"],
          ["sie / Sie", "freuen sich", "treffen sich"],
        ],
      },
    ],
    points: [
      { de: "Ich freue mich auf das Wochenende.", en: "I am looking forward to the weekend.", ta: "நான் வார இறுதியை எதிர்பார்த்திருக்கிறேன்." },
      { de: "Wir treffen uns um acht Uhr.", en: "We meet at eight o'clock.", ta: "நாங்கள் எட்டு மணிக்குச் சந்திக்கிறோம்." },
      { de: "Sie interessiert sich für Musik.", en: "She is interested in music.", ta: "அவளுக்கு இசையில் ஆர்வம் உண்டு." },
    ],
    exercises: [
      { q: "Ich freue ___ auf den Urlaub.", options: ["mich", "dich", "sich"], answer: "mich" },
      { q: "Wir treffen ___ um drei.", options: ["uns", "sich", "euch"], answer: "uns" },
      { q: "Er interessiert ___ für Kunst.", options: ["sich", "mich", "ihn"], answer: "sich" },
    ],
  },
  {
    slug: "comparison",
    level: "A2",
    title: { en: "Comparison", ta: "ஒப்பீடு" },
    intro: {
      en: "Add -er to compare (kleiner) and am … -sten for the highest (am kleinsten). Use als to compare and so … wie for “equally”. A few words are irregular.",
      ta: "ஒப்பிட -er (kleiner), மிக உயர்ந்ததற்கு am …-sten (am kleinsten). ஒப்பிட als; சமமாக இருக்க so … wie. சில சொற்கள் ஒழுங்கற்றவை.",
    },
    tables: [
      {
        title: "Forms",
        headers: ["Basic", "Comparative", "Superlative"],
        rows: [
          ["groß", "größer", "am größten"],
          ["klein", "kleiner", "am kleinsten"],
          ["schnell", "schneller", "am schnellsten"],
          ["teuer", "teurer", "am teuersten"],
          ["gut", "besser", "am besten"],
          ["viel", "mehr", "am meisten"],
          ["gern", "lieber", "am liebsten"],
        ],
      },
    ],
    points: [
      { de: "Berlin ist größer als Köln.", en: "Berlin is bigger than Cologne.", ta: "பெர்லின் கொலோனை விடப் பெரியது." },
      { de: "Der Tee ist so teuer wie der Kaffee.", en: "The tea is as expensive as the coffee.", ta: "தேநீர் காப்பியைப் போலவே விலை உயர்ந்தது." },
      { de: "Ich trinke am liebsten Tee.", en: "I like drinking tea best.", ta: "நான் தேநீர் குடிப்பதை மிகவும் விரும்புகிறேன்." },
    ],
    exercises: [
      { q: "Der Zug ist ___ als der Bus. (schnell)", options: ["schneller", "schnellste", "am schnellsten"], answer: "schneller" },
      { q: "Heute geht es mir ___ als gestern. (gut)", options: ["besser", "guter", "gutter"], answer: "besser" },
      { q: "Ich trinke ___ Tee. (gern, highest)", answer: "am liebsten" },
      { q: "Dieses Haus ist ___ von allen. (groß)", options: ["am größten", "am größer", "größten"], answer: "am größten" },
    ],
  },
  {
    slug: "adjective-endings",
    level: "A2",
    title: { en: "Adjective endings", ta: "பெயரடை முடிவுகள்" },
    intro: {
      en: "Before a noun the adjective gets an ending that shows gender and case. Start with Nominativ and Akkusativ, after ein-words and der-words.",
      ta: "பெயர்ச்சொல்லுக்கு முன் பெயரடை பால், வேற்றுமையைக் காட்டும் முடிவைப் பெறும். முதலில் Nominativ, Akkusativ.",
    },
    tables: [
      {
        title: "After ein / eine",
        headers: ["Case", "masculine", "feminine", "neuter"],
        rows: [
          ["Nominativ", "ein großer Tisch", "eine kleine Wohnung", "ein schönes Zimmer"],
          ["Akkusativ", "einen großen Tisch", "eine kleine Wohnung", "ein schönes Zimmer"],
        ],
      },
      {
        title: "After der / die / das",
        headers: ["Case", "masculine", "feminine", "neuter"],
        rows: [
          ["Nominativ", "der große Tisch", "die kleine Wohnung", "das schöne Zimmer"],
          ["Akkusativ", "den großen Tisch", "die kleine Wohnung", "das schöne Zimmer"],
        ],
      },
    ],
    points: [
      { de: "Ich suche eine kleine Wohnung.", en: "I am looking for a small flat.", ta: "நான் ஒரு சிறிய வீடு தேடுகிறேன்." },
      { de: "Das ist ein schönes Zimmer.", en: "That is a nice room.", ta: "இது ஒரு அழகான அறை." },
      { de: "Ich kaufe den roten Pullover.", en: "I buy the red sweater.", ta: "நான் சிவப்பு ஸ்வெட்டரை வாங்குகிறேன்." },
    ],
    exercises: [
      { q: "Ich brauche einen ___ Tisch. (groß)", options: ["großen", "großer", "große"], answer: "großen" },
      { q: "Das ist ein ___ Zimmer. (schön)", options: ["schönes", "schöne", "schöner"], answer: "schönes" },
      { q: "Wir mieten eine ___ Wohnung. (klein)", options: ["kleine", "kleinen", "kleines"], answer: "kleine" },
    ],
  },
  {
    slug: "polite-requests",
    level: "A2",
    title: { en: "Polite requests", ta: "பணிவான கோரிக்கைகள்" },
    intro: {
      en: "To sound polite use möchte, hätte gern, könnten Sie and würden Sie, and add bitte. These are very useful for the speaking exam.",
      ta: "பணிவாகப் பேச möchte, hätte gern, könnten Sie, würden Sie பயன்படுத்தி bitte சேர்க்கவும். பேச்சுத் தேர்வுக்கு மிகவும் பயனுள்ளவை.",
    },
    tables: [
      {
        title: "Useful phrases",
        headers: ["Use", "German", "English"],
        rows: [
          ["wish", "Ich möchte einen Kaffee, bitte.", "I would like a coffee, please."],
          ["wish", "Ich hätte gern ein Stück Kuchen.", "I would like a piece of cake."],
          ["request", "Könnten Sie mir bitte helfen?", "Could you help me, please?"],
          ["request", "Würden Sie bitte das Fenster öffnen?", "Would you please open the window?"],
          ["reply", "Ja, gern. / Natürlich.", "Yes, gladly. / Of course."],
          ["refuse", "Tut mir leid, das geht leider nicht.", "Sorry, that is not possible."],
        ],
      },
    ],
    points: [
      { de: "Könnten Sie das bitte wiederholen?", en: "Could you repeat that, please?", ta: "தயவுசெய்து அதை மீண்டும் சொல்ல முடியுமா?" },
      { de: "Ich hätte gern ein Stück Kuchen.", en: "I would like a piece of cake.", ta: "எனக்கு ஒரு துண்டு கேக் வேண்டும்." },
      { de: "Würden Sie mir bitte den Weg zeigen?", en: "Would you show me the way, please?", ta: "தயவுசெய்து எனக்கு வழி காட்டுவீர்களா?" },
    ],
    exercises: [
      { q: "Which is the most polite?", options: ["Könnten Sie mir bitte helfen?", "Hilf mir!", "Du musst mir helfen."], answer: "Könnten Sie mir bitte helfen?" },
      { q: "Ich ___ gern einen Tee. (haben, polite)", options: ["hätte", "habe", "hatte"], answer: "hätte" },
      { q: "Würden Sie bitte das Fenster ___? (öffnen)", options: ["öffnen", "öffnet", "geöffnet"], answer: "öffnen" },
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
