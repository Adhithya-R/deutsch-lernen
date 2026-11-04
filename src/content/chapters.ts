import type { Mood } from "@/lib/landmarks";

// Story chapters: Priya moves from Madurai to Germany. Each chapter is a short scene, a few tappable
// words, a culture note, and a check that must be passed to unlock the next chapter.

export type Word = { de: string; en: string; ta: string; ex: string; exEn: string; exTa: string };
export type Part = string | { t: string; k: string }; // plain text, or a tappable word (k = key in `words`)
export type Line = { who: "p" | "l" | "b" | "v" | "m"; parts: Part[]; en: string; ta: string };

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

  {
    slug: "die-wohnung",
    n: 3,
    landmarks: ["TN009", "DE007"], // Chettinad Palace, Charlottenburg Palace
    mood: "snow", // a winter flat visit
    title: "Die Wohnung",
    sub: "Your first flat",
    speakers: { v: { initial: "B", name: "Herr Braun" }, p: { initial: "P", name: "Priya" } },
    lines: [
      {
        who: "v",
        parts: ["Guten Tag, Frau Krishnan! Willkommen. Das ist die Wohnung."],
        en: "Good day, Ms Krishnan! Welcome. This is the flat.",
        ta: "வணக்கம்! வாருங்கள். இதுதான் அந்த வீடு.",
      },
      {
        who: "p",
        parts: ["Guten Tag, Herr Braun. Die Wohnung ist ", { t: "schön", k: "schoen" }, "! Wie viele ", { t: "Zimmer", k: "zimmer" }, " hat sie?"],
        en: "Good day, Mr Braun. The flat is nice! How many rooms does it have?",
        ta: "வணக்கம் திரு. பிரவுன். வீடு அழகாக இருக்கிறது! இதில் எத்தனை அறைகள் உள்ளன?",
      },
      {
        who: "v",
        parts: ["Sie hat zwei Zimmer, eine ", { t: "Küche", k: "kueche" }, " und ein Bad. Die ", { t: "Miete", k: "miete" }, " ist 650 Euro."],
        en: "It has two rooms, a kitchen and a bathroom. The rent is 650 euros.",
        ta: "இதில் இரண்டு அறைகள், ஒரு சமையலறை, ஒரு குளியலறை உள்ளன. வாடகை 650 யூரோ.",
      },
      {
        who: "p",
        parts: ["Ich ", { t: "brauche", k: "brauchen" }, " einen Tisch und ein Bett. Gibt es einen ", { t: "Balkon", k: "balkon" }, "?"],
        en: "I need a table and a bed. Is there a balcony?",
        ta: "எனக்கு ஒரு மேசையும் ஒரு படுக்கையும் வேண்டும். பால்கனி இருக்கிறதா?",
      },
      {
        who: "v",
        parts: ["Ja, der Balkon ist klein, aber sonnig. Möchten Sie die Wohnung nehmen?"],
        en: "Yes, the balcony is small but sunny. Would you like to take the flat?",
        ta: "ஆம், பால்கனி சிறியது, ஆனால் வெயில் படும். இந்த வீட்டை எடுத்துக்கொள்ள விரும்புகிறீர்களா?",
      },
      {
        who: "p",
        parts: ["Ja, ich ", { t: "nehme", k: "nehmen" }, " die Wohnung. Danke!"],
        en: "Yes, I'll take the flat. Thank you!",
        ta: "ஆம், நான் இந்த வீட்டை எடுத்துக்கொள்கிறேன். நன்றி!",
      },
    ],
    words: {
      schoen: { de: "schön", en: "beautiful, nice", ta: "அழகான", ex: "Die Wohnung ist schön.", exEn: "The flat is nice.", exTa: "வீடு அழகாக இருக்கிறது." },
      zimmer: { de: "das Zimmer", en: "the room", ta: "அறை", ex: "Das Zimmer ist klein.", exEn: "The room is small.", exTa: "அறை சிறியது." },
      kueche: { de: "die Küche", en: "the kitchen", ta: "சமையலறை", ex: "Die Küche ist modern.", exEn: "The kitchen is modern.", exTa: "சமையலறை நவீனமானது." },
      miete: { de: "die Miete", en: "the rent", ta: "வாடகை", ex: "Die Miete ist hoch.", exEn: "The rent is high.", exTa: "வாடகை அதிகம்." },
      brauchen: { de: "brauchen", en: "to need", ta: "தேவைப்படு", ex: "Ich brauche einen Tisch.", exEn: "I need a table.", exTa: "எனக்கு ஒரு மேசை வேண்டும்." },
      balkon: { de: "der Balkon", en: "the balcony", ta: "பால்கனி", ex: "Der Balkon ist sonnig.", exEn: "The balcony is sunny.", exTa: "பால்கனியில் வெயில் படும்." },
      nehmen: { de: "nehmen", en: "to take", ta: "எடுத்துக்கொள்", ex: "Ich nehme die Wohnung.", exEn: "I take the flat.", exTa: "நான் இந்த வீட்டை எடுத்துக்கொள்கிறேன்." },
    },
    culture: {
      tn: "A Chettinad house has an open courtyard (muttram) that lets in light, air and rain.",
      de: "German rent is “kalt” (without heating) or “warm” (with heating). Always ask which one.",
    },
    quiz: [
      {
        type: "choice",
        q: "Ich brauche ___ Tisch. (der Tisch)",
        options: ["einen", "ein", "eine"],
        answer: "einen",
        tipEn: "After brauchen the noun is in the Akkusativ: masculine ein becomes einen.",
        tipTa: "brauchen க்குப் பிறகு Akkusativ: ஆண்பால் ein → einen.",
      },
      {
        type: "choice",
        q: "Which sentence is correct?",
        options: ["Die Wohnung hat zwei Zimmer.", "Die Wohnung haben zwei Zimmer.", "Die Wohnung hast zwei Zimmer."],
        answer: "Die Wohnung hat zwei Zimmer.",
        tipEn: "die Wohnung = sie, so the verb is hat.",
        tipTa: "die Wohnung = sie, ஆகவே வினை hat.",
      },
      {
        type: "order",
        q: "Build the sentence: “The rent is 650 euros.”",
        tiles: ["Die", "Miete", "ist", "650", "Euro", "sind"],
        end: ".",
        answer: "Die Miete ist 650 Euro.",
        tipEn: "The verb stays in position 2: Die Miete ist …",
        tipTa: "வினை 2-ஆம் இடத்தில்: Die Miete ist …",
      },
    ],
    pass: 2,
  },
  {
    slug: "auf-dem-markt",
    n: 4,
    landmarks: ["TN018", "DE019"], // Thirumalai Nayakkar Mahal, New Town Hall Munich
    mood: "balloons", // a bright morning at the market
    title: "Auf dem Markt",
    sub: "Buy fruit and tea",
    speakers: { m: { initial: "M", name: "Market seller" }, p: { initial: "P", name: "Priya" } },
    lines: [
      {
        who: "m",
        parts: ["Guten Morgen! Was ", { t: "darf", k: "darf" }, " es sein?"],
        en: "Good morning! What can I get you?",
        ta: "காலை வணக்கம்! உங்களுக்கு என்ன வேண்டும்?",
      },
      {
        who: "p",
        parts: ["Guten Morgen! Ich ", { t: "möchte", k: "moechte" }, " ein ", { t: "Kilo", k: "kilo" }, " Äpfel und zwei Bananen, bitte."],
        en: "Good morning! I would like a kilo of apples and two bananas, please.",
        ta: "காலை வணக்கம்! எனக்கு ஒரு கிலோ ஆப்பிளும் இரண்டு வாழைப்பழமும் வேண்டும்.",
      },
      {
        who: "m",
        parts: ["Gern. Sonst noch etwas?"],
        en: "Gladly. Anything else?",
        ta: "சரி. வேறு ஏதாவது?",
      },
      {
        who: "p",
        parts: ["Ja, wie viel ", { t: "kostet", k: "kosten" }, " der Tee?"],
        en: "Yes, how much does the tea cost?",
        ta: "ஆம், தேநீர் எவ்வளவு?",
      },
      {
        who: "m",
        parts: ["Der Tee kostet vier Euro ", { t: "fünfzig", k: "fuenfzig" }, "."],
        en: "The tea costs four euros fifty.",
        ta: "தேநீர் நான்கு யூரோ ஐம்பது சென்ட்.",
      },
      {
        who: "p",
        parts: ["Dann nehme ich den Tee auch. Wie viel ist das ", { t: "zusammen", k: "zusammen" }, "?"],
        en: "Then I'll take the tea too. How much is that altogether?",
        ta: "அப்படியானால் தேநீரும் எடுத்துக்கொள்கிறேன். மொத்தம் எவ்வளவு?",
      },
      {
        who: "m",
        parts: ["Das macht neun Euro zwanzig. Danke und einen schönen Tag!"],
        en: "That comes to nine euros twenty. Thank you and have a nice day!",
        ta: "மொத்தம் ஒன்பது யூரோ இருபது சென்ட். நன்றி, இனிய நாளாகட்டும்!",
      },
    ],
    words: {
      darf: { de: "Was darf es sein?", en: "What can I get you?", ta: "உங்களுக்கு என்ன வேண்டும்?", ex: "Was darf es sein? – Ein Brot, bitte.", exEn: "What can I get you? – A bread, please.", exTa: "என்ன வேண்டும்? – ஒரு ரொட்டி, தயவுசெய்து." },
      moechte: { de: "ich möchte", en: "I would like", ta: "எனக்கு வேண்டும் (பணிவாக)", ex: "Ich möchte einen Tee.", exEn: "I would like a tea.", exTa: "எனக்கு ஒரு தேநீர் வேண்டும்." },
      kilo: { de: "das Kilo", en: "the kilo", ta: "கிலோ", ex: "Ein Kilo Äpfel, bitte.", exEn: "A kilo of apples, please.", exTa: "ஒரு கிலோ ஆப்பிள், தயவுசெய்து." },
      kosten: { de: "kosten", en: "to cost", ta: "விலை இரு", ex: "Wie viel kostet der Tee?", exEn: "How much does the tea cost?", exTa: "தேநீர் எவ்வளவு?" },
      fuenfzig: { de: "fünfzig", en: "fifty", ta: "ஐம்பது", ex: "Das Brot kostet fünfzig Cent.", exEn: "The bread costs fifty cents.", exTa: "ரொட்டி ஐம்பது சென்ட்." },
      zusammen: { de: "zusammen", en: "together, altogether", ta: "மொத்தம், ஒன்றாக", ex: "Das macht zusammen neun Euro.", exEn: "That comes to nine euros altogether.", exTa: "மொத்தம் ஒன்பது யூரோ." },
    },
    culture: {
      tn: "In Madurai's flower and vegetable markets, a little bargaining is part of the fun.",
      de: "German market prices are fixed. Say “Stimmt so” to let the seller keep the change.",
    },
    quiz: [
      {
        type: "choice",
        q: "How do you ask the price of the tea?",
        options: ["Wie viel kostet der Tee?", "Wie viele kostet der Tee?", "Wo kostet der Tee?"],
        answer: "Wie viel kostet der Tee?",
        tipEn: "Use “Wie viel” with one thing (der Tee). “Wie viele” is for several things.",
        tipTa: "ஒரு பொருளுக்கு “Wie viel”. பல பொருட்களுக்கு “Wie viele”.",
      },
      {
        type: "choice",
        q: "Ich ___ ein Kilo Äpfel.",
        options: ["möchte", "möchtest", "möchten"],
        answer: "möchte",
        tipEn: "With ich the verb is möchte.",
        tipTa: "ich உடன் வினை möchte.",
      },
      {
        type: "choice",
        q: "4,50 € = vier Euro ___",
        options: ["fünfzig", "fünfzehn", "vierzig"],
        answer: "fünfzig",
        tipEn: "fünf = 5, fünfzehn = 15, fünfzig = 50.",
        tipTa: "fünf = 5, fünfzehn = 15, fünfzig = 50.",
      },
    ],
    pass: 2,
  },
  {
    slug: "pongal-in-berlin",
    n: 5,
    landmarks: ["TN008", "DE005"], // Ramanathaswamy Temple, Berlin Cathedral
    mood: "festival", // bunting and lanterns
    title: "Pongal in Berlin",
    sub: "Share a festival",
    speakers: { p: { initial: "P", name: "Priya" }, l: { initial: "L", name: "Lena" } },
    lines: [
      {
        who: "p",
        parts: ["Hallo Lena! Am Sonntag ", { t: "feiere", k: "feiern" }, " ich Pongal. Das ist ein Erntefest in Indien."],
        en: "Hello Lena! On Sunday I'm celebrating Pongal. It is a harvest festival in India.",
        ta: "வணக்கம் லேனா! ஞாயிற்றுக்கிழமை நான் பொங்கல் கொண்டாடுகிறேன். அது இந்தியாவின் அறுவடைத் திருவிழா.",
      },
      {
        who: "l",
        parts: ["Wie schön! Was macht man bei Pongal?"],
        en: "How lovely! What do people do at Pongal?",
        ta: "எவ்வளவு அழகு! பொங்கலில் என்ன செய்வார்கள்?",
      },
      {
        who: "p",
        parts: ["Wir kochen süßen Reis in einem ", { t: "Topf", k: "topf" }, ". Der Reis ", { t: "kocht über", k: "ueberkochen" }, " und wir rufen: Pongalo Pongal!"],
        en: "We cook sweet rice in a pot. The rice boils over and we shout: Pongalo Pongal!",
        ta: "நாங்கள் ஒரு பானையில் இனிப்புச் சாதம் சமைப்போம். சாதம் பொங்கி வழிந்ததும் “பொங்கலோ பொங்கல்!” என்று கூவுவோம்.",
      },
      {
        who: "l",
        parts: ["Das klingt super! ", { t: "Um wie viel Uhr", k: "uhr" }, " beginnt es?"],
        en: "That sounds great! What time does it start?",
        ta: "அருமையாக இருக்கிறது! எத்தனை மணிக்குத் தொடங்கும்?",
      },
      {
        who: "p",
        parts: ["Um zehn Uhr. Komm bitte ", { t: "pünktlich", k: "puenktlich" }, "!"],
        en: "At ten o'clock. Please come on time!",
        ta: "பத்து மணிக்கு. தயவுசெய்து சரியான நேரத்தில் வா!",
      },
      {
        who: "l",
        parts: ["Gerne! Ich ", { t: "bringe", k: "mitbringen" }, " Kuchen ", { t: "mit", k: "mitbringen" }, "."],
        en: "Gladly! I'll bring cake.",
        ta: "மகிழ்ச்சியுடன்! நான் கேக் கொண்டு வருகிறேன்.",
      },
      {
        who: "p",
        parts: ["Wunderbar. Bis Sonntag!"],
        en: "Wonderful. See you on Sunday!",
        ta: "அருமை. ஞாயிறு சந்திப்போம்!",
      },
    ],
    words: {
      feiern: { de: "feiern", en: "to celebrate", ta: "கொண்டாடு", ex: "Wir feiern Pongal.", exEn: "We celebrate Pongal.", exTa: "நாங்கள் பொங்கல் கொண்டாடுகிறோம்." },
      topf: { de: "der Topf", en: "the pot", ta: "பானை", ex: "Der Topf ist heiß.", exEn: "The pot is hot.", exTa: "பானை சூடாக இருக்கிறது." },
      ueberkochen: { de: "überkochen", en: "to boil over", ta: "பொங்கி வழி", ex: "Die Milch kocht über.", exEn: "The milk boils over.", exTa: "பால் பொங்கி வழிகிறது." },
      uhr: { de: "Um wie viel Uhr?", en: "At what time?", ta: "எத்தனை மணிக்கு?", ex: "Um acht Uhr.", exEn: "At eight o'clock.", exTa: "எட்டு மணிக்கு." },
      puenktlich: { de: "pünktlich", en: "on time", ta: "சரியான நேரத்தில்", ex: "Der Bus ist pünktlich.", exEn: "The bus is on time.", exTa: "பேருந்து சரியான நேரத்தில் வந்தது." },
      mitbringen: { de: "mitbringen", en: "to bring along", ta: "கொண்டு வா", ex: "Ich bringe Kuchen mit.", exEn: "I bring cake along.", exTa: "நான் கேக் கொண்டு வருகிறேன்." },
    },
    culture: {
      tn: "“Pongal” means “to boil over”. The bubbling pot stands for a good harvest.",
      de: "Erntedankfest in autumn also gives thanks for the harvest, with fruit and bread in decorated churches.",
    },
    quiz: [
      {
        type: "choice",
        q: "Am Sonntag ___ ich Pongal. (feiern)",
        options: ["feiere", "feierst", "feiert"],
        answer: "feiere",
        tipEn: "With ich the verb ends in -e.",
        tipTa: "ich உடன் வினை -e இல் முடியும்.",
      },
      {
        type: "choice",
        q: "How do you say “Please come on time!” to a friend?",
        options: ["Komm bitte pünktlich!", "Kommst bitte pünktlich!", "Kommen bitte pünktlich!"],
        answer: "Komm bitte pünktlich!",
        tipEn: "The du-command is just the stem of the verb: komm!",
        tipTa: "du கட்டளை வினை வேர் மட்டுமே: komm!",
      },
      {
        type: "order",
        q: "Build the sentence: “I bring cake.”",
        tiles: ["Ich", "bringe", "Kuchen", "mit", "bringst"],
        end: ".",
        answer: "Ich bringe Kuchen mit.",
        tipEn: "Separable verb mitbringen: bringe … mit. The small part goes to the end.",
        tipTa: "பிரியும் வினை mitbringen: bringe … mit. சிறிய பகுதி கடைசியில் செல்லும்.",
      },
    ],
    pass: 2,
  },
];

// Chapters on the path that are planned but not written yet.
export const upcoming = [
  { title: "Beim Arzt", sub: "A2 · At the doctor" },
  { title: "Die Arbeit", sub: "A2 · Your first job" },
];

export const chapterBySlug = (slug: string) => chapters.find((c) => c.slug === slug);
export const doneKey = (slug: string) => `chapter-${slug}`;

/** Marks a chapter check. Used by the server action, so the browser cannot fake a pass. */
export function markChapter(chapter: Chapter, answers: string[]) {
  const norm = (s: string) => s.trim().toLowerCase();
  const correct = chapter.quiz.filter((q, i) => norm(answers[i] ?? "") === norm(q.answer)).length;
  return { score: correct, total: chapter.quiz.length, passed: correct >= chapter.pass };
}
