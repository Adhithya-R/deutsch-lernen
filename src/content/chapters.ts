import { role, speaker } from "./people.ts";
import type { Mood } from "../lib/landmarks.ts";

// Story chapters: Adhi moves from Madurai to Germany and learns German with his classmates.
// Each chapter is a short scene, a few tappable words, a culture note, and a check that must be
// passed to unlock the next chapter. Every character is one of the 21 classmates (see people.ts)
// or an unnamed role. Speaker code "a" is the lead of the chapter: every classmate leads exactly one chapter,
// and the check in scripts/check-content.mts keeps everybody's share of the lines about equal.

export type Word = { de: string; en: string; ta: string; ex: string; exEn: string; exTa: string; pic?: string };
export type Part = string | { t: string; k: string }; // plain text, or a tappable word (k = key in `words`)
export type Line = { who: string; parts: Part[]; en: string; ta: string };
export type Speaker = { name: string; initial: string; gender: "m" | "f"; as?: string };

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
  speakers: Record<string, Speaker>;
  lines: Line[];
  words: Record<string, Word>;
  culture: { tn: string; de: string };
  quiz: Question[];
  pass: number; // correct answers needed to unlock the next chapter
};

const W = (t: string, k: string): Part => ({ t, k });

export const chapters: Chapter[] = [
  /* ------------------------------------------------------------------ 1 */
  {
    slug: "ankunft",
    n: 1,
    landmarks: ["TN002", "DE010"], // Meenakshi Temple, Römer in Frankfurt
    mood: "dawn",
    title: "Ankunft",
    sub: "Arrival in Frankfurt",
    speakers: { a: speaker("Ram"), b: speaker("Dhinesh", "border officer"), p: speaker("Thanisha"), k: speaker("Yogesh") },
    lines: [
      { who: "b", parts: ["Guten Tag! Ihren ", W("Pass", "pass"), ", ", W("bitte", "bitte"), "."], en: "Good day! Your passport, please.", ta: "வணக்கம்! உங்கள் கடவுச்சீட்டு, தயவுசெய்து." },
      { who: "a", parts: ["Guten Tag. Hier ist mein ", W("Pass", "pass"), "."], en: "Good day. Here is my passport.", ta: "வணக்கம். இதோ என் கடவுச்சீட்டு." },
      { who: "b", parts: ["Danke. ", W("Woher", "woher"), " kommen Sie?"], en: "Thank you. Where do you come from?", ta: "நன்றி. நீங்கள் எங்கிருந்து வருகிறீர்கள்?" },
      { who: "a", parts: ["Ich komme aus Indien, aus Madurai."], en: "I come from India, from Madurai.", ta: "நான் இந்தியாவிலிருந்து, மதுரையிலிருந்து வருகிறேன்." },
      { who: "b", parts: [W("Willkommen", "willkommen"), " in Deutschland!"], en: "Welcome to Germany!", ta: "ஜெர்மனிக்கு நல்வரவு!" },
      { who: "p", parts: ["Hallo Ram! Hier sind wir!"], en: "Hello Ram! We are over here!", ta: "வணக்கம் ராம்! இதோ நாங்கள் இங்கே!" },
      { who: "k", parts: ["Willkommen, Ram! Wie war der Flug?"], en: "Welcome, Ram! How was the flight?", ta: "நல்வரவு ராம்! விமானப் பயணம் எப்படி இருந்தது?" },
      { who: "a", parts: ["Er war lang, aber gut. Ich bin ", W("müde", "muede"), "."], en: "It was long, but good. I am tired.", ta: "நீண்டது, ஆனால் நன்றாக இருந்தது. நான் களைப்பாக இருக்கிறேன்." },
    ],
    words: {
      pass: { de: "der Pass", en: "the passport", ta: "கடவுச்சீட்டு", ex: "Hier ist mein Pass.", exEn: "Here is my passport.", exTa: "இதோ என் கடவுச்சீட்டு.", pic: "🛂" },
      bitte: { de: "bitte", en: "please / you're welcome", ta: "தயவுசெய்து / பரவாயில்லை", ex: "Einen Tee, bitte.", exEn: "A tea, please.", exTa: "ஒரு தேநீர், தயவுசெய்து.", pic: "🙏" },
      woher: { de: "woher", en: "where from", ta: "எங்கிருந்து", ex: "Woher kommst du?", exEn: "Where do you come from?", exTa: "நீ எங்கிருந்து வருகிறாய்?", pic: "🌍" },
      willkommen: { de: "willkommen", en: "welcome", ta: "நல்வரவு", ex: "Willkommen in Berlin!", exEn: "Welcome to Berlin!", exTa: "பெர்லினுக்கு நல்வரவு!", pic: "👋" },
      muede: { de: "müde", en: "tired", ta: "களைப்பான", ex: "Ich bin müde.", exEn: "I am tired.", exTa: "நான் களைப்பாக இருக்கிறேன்.", pic: "😴" },
    },
    culture: {
      tn: "In Tamil Nadu a guest is greeted with “vaanga” and a warm smile.",
      de: "Officials and strangers are addressed with the polite “Sie”. Friends say “du”.",
    },
    quiz: [
      { type: "choice", q: "The officer asks for your passport. What do you say?", options: ["Hier ist mein Pass.", "Hier mein ist Pass.", "Hier bin ich Pass."], answer: "Hier ist mein Pass.", tipEn: "The verb is always in position 2: Hier ist mein Pass.", tipTa: "வினைச்சொல் எப்போதும் 2-ஆம் இடத்தில்: Hier ist mein Pass." },
      { type: "choice", q: "___ kommen Sie? – Aus Indien.", options: ["Woher", "Wohin", "Wann"], answer: "Woher", tipEn: "Woher asks where someone comes from. “Aus Indien” answers it.", tipTa: "Woher = எங்கிருந்து. “Aus Indien” அதற்கான பதில்." },
      { type: "order", q: "Build the sentence: “Welcome to Germany!”", tiles: ["Willkommen", "in", "Deutschland", "bitte"], end: "!", answer: "Willkommen in Deutschland!", tipEn: "Countries like Deutschland take no article after “in”.", tipTa: "Deutschland போன்ற நாடுகளுக்கு “in” உடன் article வராது." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 2 */
  {
    slug: "neue-freunde",
    n: 2,
    landmarks: ["TN003", "DE001"], // Shore Temple, Brandenburg Gate
    mood: "noon",
    title: "Neue Freunde",
    sub: "Introduce yourself",
    speakers: { a: speaker("Risha"), l: speaker("Sudha", "teacher"), t: speaker("Ruby"), m: speaker("Nethra"), s: speaker("Akshay"), r: speaker("Mrithula") },
    lines: [
      { who: "l", parts: ["Guten Morgen! Willkommen im Deutschkurs. Wie ", W("heißt", "heissen"), " du?"], en: "Good morning! Welcome to the German course. What is your name?", ta: "காலை வணக்கம்! ஜெர்மன் வகுப்புக்கு நல்வரவு. உன் பெயர் என்ன?" },
      { who: "a", parts: ["Ich ", W("heiße", "heissen"), " Risha. Ich ", W("komme aus", "kommen"), " Madurai."], en: "My name is Risha. I come from Madurai.", ta: "என் பெயர் ரிஷா. நான் மதுரையிலிருந்து வருகிறேன்." },
      { who: "t", parts: ["Hallo Risha! Ich heiße Ruby. Ich komme aus Chennai."], en: "Hello Risha! My name is Ruby. I come from Chennai.", ta: "வணக்கம் ரிஷா! என் பெயர் ரூபி. நான் சென்னையிலிருந்து வருகிறேன்." },
      { who: "m", parts: ["Hallo! Ich bin Nethra. Ich ", W("wohne", "wohnen"), " in Berlin."], en: "Hello! I am Nethra. I live in Berlin.", ta: "வணக்கம்! நான் நேத்ரா. நான் பெர்லினில் வசிக்கிறேன்." },
      { who: "s", parts: ["Ich heiße Akshay. Und das ist Mrithula. Wir kommen aus Coimbatore."], en: "My name is Akshay. And this is Mrithula. We come from Coimbatore.", ta: "என் பெயர் அக்ஷய். இது ம்ருதுலா. நாங்கள் கோயம்புத்தூரிலிருந்து வருகிறோம்." },
      { who: "r", parts: ["Hallo Risha! ", W("Wo", "wo"), " liegt Madurai?"], en: "Hello Risha! Where is Madurai?", ta: "வணக்கம் ரிஷா! மதுரை எங்கே இருக்கிறது?" },
      { who: "a", parts: ["In Indien, in Tamil Nadu. Dort gibt es einen großen ", W("Tempel", "tempel"), "."], en: "In India, in Tamil Nadu. There is a big temple there.", ta: "இந்தியாவில், தமிழ்நாட்டில். அங்கே ஒரு பெரிய கோயில் இருக்கிறது." },
      { who: "l", parts: ["Sehr gut! Jetzt arbeiten wir zusammen."], en: "Very good! Now we work together.", ta: "மிகவும் நல்லது! இப்போது நாம் சேர்ந்து வேலை செய்வோம்." },
    ],
    words: {
      heissen: { de: "heißen", en: "to be called", ta: "பெயர் கொண்டிரு", ex: "Ich heiße Risha.", exEn: "My name is Risha.", exTa: "என் பெயர் ரிஷா.", pic: "🏷️" },
      kommen: { de: "kommen aus", en: "to come from", ta: "…இருந்து வா", ex: "Ich komme aus Madurai.", exEn: "I come from Madurai.", exTa: "நான் மதுரையிலிருந்து வருகிறேன்.", pic: "🧳" },
      wohnen: { de: "wohnen", en: "to live (reside)", ta: "வசி", ex: "Ich wohne in Berlin.", exEn: "I live in Berlin.", exTa: "நான் பெர்லினில் வசிக்கிறேன்.", pic: "🏠" },
      wo: { de: "wo", en: "where", ta: "எங்கே", ex: "Wo ist das?", exEn: "Where is that?", exTa: "அது எங்கே?", pic: "📍" },
      tempel: { de: "der Tempel", en: "the temple", ta: "கோயில்", ex: "Der Tempel ist groß.", exEn: "The temple is big.", exTa: "கோயில் பெரியது.", pic: "🛕" },
    },
    culture: {
      tn: "In Tamil Nadu you greet with “vanakkam”, hands folded.",
      de: "In Germany you say “Guten Tag”, shake hands and look at the person.",
    },
    quiz: [
      { type: "choice", q: "Which sentence means “My name is Risha”?", options: ["Ich heiße Risha.", "Ich bin heißen Risha.", "Ich Risha heiße."], answer: "Ich heiße Risha.", tipEn: "The verb is in position 2: Ich + heiße.", tipTa: "வினைச்சொல் 2-ஆம் இடத்தில்: Ich + heiße." },
      { type: "choice", q: "Ich ___ aus Madurai.", options: ["komme", "kommst", "kommt"], answer: "komme", tipEn: "With ich the verb ends in -e.", tipTa: "ich உடன் வினை -e இல் முடியும்." },
      { type: "order", q: "Build the sentence: “I live in Berlin.”", tiles: ["Ich", "wohne", "in", "Berlin", "wohnst"], end: ".", answer: "Ich wohne in Berlin.", tipEn: "ich → wohne (not wohnst).", tipTa: "ich → wohne (wohnst அல்ல)." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 3 */
  {
    slug: "die-wohnung",
    n: 3,
    landmarks: ["TN009", "DE007"], // Chettinad Palace, Charlottenburg Palace
    mood: "snow",
    title: "Die Wohnung",
    sub: "Your first flat",
    speakers: { a: speaker("Poovai"), v: speaker("Arvind", "landlord"), r: speaker("Ram"), d: speaker("Yuvan"), s: speaker("Kavitha") },
    lines: [
      { who: "v", parts: ["Guten Tag! Willkommen. Das ist die Wohnung."], en: "Good day! Welcome. This is the flat.", ta: "வணக்கம்! வாருங்கள். இதுதான் அந்த வீடு." },
      { who: "r", parts: ["Guten Tag. Die Wohnung ist ", W("schön", "schoen"), "! Wie viele ", W("Zimmer", "zimmer"), " hat sie?"], en: "Good day. The flat is nice! How many rooms does it have?", ta: "வணக்கம். வீடு அழகாக இருக்கிறது! இதில் எத்தனை அறைகள் உள்ளன?" },
      { who: "v", parts: ["Sie hat drei Zimmer, eine ", W("Küche", "kueche"), " und ein Bad. Die ", W("Miete", "miete"), " ist 900 Euro."], en: "It has three rooms, a kitchen and a bathroom. The rent is 900 euros.", ta: "இதில் மூன்று அறைகள், ஒரு சமையலறை, ஒரு குளியலறை உள்ளன. வாடகை 900 யூரோ." },
      { who: "d", parts: ["Wir ", W("brauchen", "brauchen"), " drei Betten und einen Tisch. Gibt es einen ", W("Balkon", "balkon"), "?"], en: "We need three beds and a table. Is there a balcony?", ta: "எங்களுக்கு மூன்று படுக்கைகளும் ஒரு மேசையும் வேண்டும். பால்கனி இருக்கிறதா?" },
      { who: "v", parts: ["Ja, der Balkon ist klein, aber sonnig. Möchten Sie die Wohnung nehmen?"], en: "Yes, the balcony is small but sunny. Would you like to take the flat?", ta: "ஆம், பால்கனி சிறியது, ஆனால் வெயில் படும். இந்த வீட்டை எடுத்துக்கொள்ள விரும்புகிறீர்களா?" },
      { who: "a", parts: ["Ja, wir ", W("nehmen", "nehmen"), " die Wohnung. Danke!"], en: "Yes, we'll take the flat. Thank you!", ta: "ஆம், நாங்கள் இந்த வீட்டை எடுத்துக்கொள்கிறோம். நன்றி!" },
      { who: "s", parts: ["Glückwunsch! Am Samstag helfe ich euch beim ", W("Umzug", "umzug"), "."], en: "Congratulations! On Saturday I'll help you with the move.", ta: "வாழ்த்துகள்! சனிக்கிழமை வீடு மாறுவதில் நான் உங்களுக்கு உதவுவேன்." },
    ],
    words: {
      schoen: { de: "schön", en: "beautiful, nice", ta: "அழகான", ex: "Die Wohnung ist schön.", exEn: "The flat is nice.", exTa: "வீடு அழகாக இருக்கிறது.", pic: "✨" },
      zimmer: { de: "das Zimmer", en: "the room", ta: "அறை", ex: "Das Zimmer ist klein.", exEn: "The room is small.", exTa: "அறை சிறியது.", pic: "🚪" },
      kueche: { de: "die Küche", en: "the kitchen", ta: "சமையலறை", ex: "Die Küche ist modern.", exEn: "The kitchen is modern.", exTa: "சமையலறை நவீனமானது.", pic: "🍳" },
      miete: { de: "die Miete", en: "the rent", ta: "வாடகை", ex: "Die Miete ist hoch.", exEn: "The rent is high.", exTa: "வாடகை அதிகம்.", pic: "💶" },
      brauchen: { de: "brauchen", en: "to need", ta: "தேவைப்படு", ex: "Ich brauche einen Tisch.", exEn: "I need a table.", exTa: "எனக்கு ஒரு மேசை வேண்டும்.", pic: "🙋" },
      balkon: { de: "der Balkon", en: "the balcony", ta: "பால்கனி", ex: "Der Balkon ist sonnig.", exEn: "The balcony is sunny.", exTa: "பால்கனியில் வெயில் படும்.", pic: "🌞" },
      nehmen: { de: "nehmen", en: "to take", ta: "எடுத்துக்கொள்", ex: "Ich nehme die Wohnung.", exEn: "I take the flat.", exTa: "நான் இந்த வீட்டை எடுத்துக்கொள்கிறேன்.", pic: "🤝" },
      umzug: { de: "der Umzug", en: "the move (house)", ta: "வீடு மாறுதல்", ex: "Der Umzug ist am Samstag.", exEn: "The move is on Saturday.", exTa: "வீடு மாறுதல் சனிக்கிழமை.", pic: "📦" },
    },
    culture: {
      tn: "A Chettinad house has an open courtyard (muttram) that lets in light, air and rain.",
      de: "German rent is “kalt” (without heating) or “warm” (with heating). Always ask which one.",
    },
    quiz: [
      { type: "choice", q: "Wir brauchen ___ Tisch. (der Tisch)", options: ["einen", "ein", "eine"], answer: "einen", tipEn: "After brauchen the noun is in the Akkusativ: masculine ein becomes einen.", tipTa: "brauchen க்குப் பிறகு Akkusativ: ஆண்பால் ein → einen." },
      { type: "choice", q: "Which sentence is correct?", options: ["Die Wohnung hat drei Zimmer.", "Die Wohnung haben drei Zimmer.", "Die Wohnung hast drei Zimmer."], answer: "Die Wohnung hat drei Zimmer.", tipEn: "die Wohnung = sie, so the verb is hat.", tipTa: "die Wohnung = sie, ஆகவே வினை hat." },
      { type: "order", q: "Build the sentence: “The rent is 900 euros.”", tiles: ["Die", "Miete", "ist", "900", "Euro", "sind"], end: ".", answer: "Die Miete ist 900 Euro.", tipEn: "The verb stays in position 2: Die Miete ist …", tipTa: "வினை 2-ஆம் இடத்தில்: Die Miete ist …" },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 4 */
  {
    slug: "auf-dem-markt",
    n: 4,
    landmarks: ["TN018", "DE019"], // Thirumalai Nayakkar Mahal, New Town Hall Munich
    mood: "balloons",
    title: "Auf dem Markt",
    sub: "Buy fruit and tea",
    speakers: { a: speaker("Sadhana"), m: speaker("Sanjay", "seller"), r: speaker("Mrithula"), s: speaker("Rithika") },
    lines: [
      { who: "m", parts: ["Guten Morgen! Was ", W("darf", "darf"), " es sein?"], en: "Good morning! What can I get you?", ta: "காலை வணக்கம்! உங்களுக்கு என்ன வேண்டும்?" },
      { who: "r", parts: ["Guten Morgen! Ich ", W("möchte", "moechte"), " ein ", W("Kilo", "kilo"), " Äpfel und zwei Bananen, bitte."], en: "Good morning! I would like a kilo of apples and two bananas, please.", ta: "காலை வணக்கம்! எனக்கு ஒரு கிலோ ஆப்பிளும் இரண்டு வாழைப்பழமும் வேண்டும்." },
      { who: "m", parts: ["Gern. Sonst noch etwas?"], en: "Gladly. Anything else?", ta: "சரி. வேறு ஏதாவது?" },
      { who: "s", parts: ["Ja, wie viel ", W("kostet", "kosten"), " der Tee?"], en: "Yes, how much does the tea cost?", ta: "ஆம், தேநீர் எவ்வளவு?" },
      { who: "m", parts: ["Der Tee kostet vier Euro ", W("fünfzig", "fuenfzig"), "."], en: "The tea costs four euros fifty.", ta: "தேநீர் நான்கு யூரோ ஐம்பது சென்ட்." },
      { who: "a", parts: ["Dann nehme ich den Tee auch. Wie viel ist das ", W("zusammen", "zusammen"), "?"], en: "Then I'll take the tea too. How much is that altogether?", ta: "அப்படியானால் தேநீரும் எடுத்துக்கொள்கிறேன். மொத்தம் எவ்வளவு?" },
      { who: "m", parts: ["Das macht neun Euro zwanzig. Danke und einen schönen Tag!"], en: "That comes to nine euros twenty. Thank you and have a nice day!", ta: "மொத்தம் ஒன்பது யூரோ இருபது சென்ட். நன்றி, இனிய நாளாகட்டும்!" },
    ],
    words: {
      darf: { de: "Was darf es sein?", en: "What can I get you?", ta: "உங்களுக்கு என்ன வேண்டும்?", ex: "Was darf es sein? – Ein Brot, bitte.", exEn: "What can I get you? – A bread, please.", exTa: "என்ன வேண்டும்? – ஒரு ரொட்டி, தயவுசெய்து.", pic: "🛒" },
      moechte: { de: "ich möchte", en: "I would like", ta: "எனக்கு வேண்டும் (பணிவாக)", ex: "Ich möchte einen Tee.", exEn: "I would like a tea.", exTa: "எனக்கு ஒரு தேநீர் வேண்டும்.", pic: "🙂" },
      kilo: { de: "das Kilo", en: "the kilo", ta: "கிலோ", ex: "Ein Kilo Äpfel, bitte.", exEn: "A kilo of apples, please.", exTa: "ஒரு கிலோ ஆப்பிள், தயவுசெய்து.", pic: "⚖️" },
      kosten: { de: "kosten", en: "to cost", ta: "விலை இரு", ex: "Wie viel kostet der Tee?", exEn: "How much does the tea cost?", exTa: "தேநீர் எவ்வளவு?", pic: "🏷️" },
      fuenfzig: { de: "fünfzig", en: "fifty", ta: "ஐம்பது", ex: "Das Brot kostet fünfzig Cent.", exEn: "The bread costs fifty cents.", exTa: "ரொட்டி ஐம்பது சென்ட்.", pic: "5️⃣" },
      zusammen: { de: "zusammen", en: "together, altogether", ta: "மொத்தம், ஒன்றாக", ex: "Das macht zusammen neun Euro.", exEn: "That comes to nine euros altogether.", exTa: "மொத்தம் ஒன்பது யூரோ.", pic: "🧮" },
    },
    culture: {
      tn: "In Madurai's flower and vegetable markets, a little bargaining is part of the fun.",
      de: "German market prices are fixed. Say “Stimmt so” to let the seller keep the change.",
    },
    quiz: [
      { type: "choice", q: "How do you ask the price of the tea?", options: ["Wie viel kostet der Tee?", "Wie viele kostet der Tee?", "Wo kostet der Tee?"], answer: "Wie viel kostet der Tee?", tipEn: "Use “Wie viel” with one thing (der Tee). “Wie viele” is for several things.", tipTa: "ஒரு பொருளுக்கு “Wie viel”. பல பொருட்களுக்கு “Wie viele”." },
      { type: "choice", q: "Ich ___ ein Kilo Äpfel.", options: ["möchte", "möchtest", "möchten"], answer: "möchte", tipEn: "With ich the verb is möchte.", tipTa: "ich உடன் வினை möchte." },
      { type: "choice", q: "4,50 € = vier Euro ___", options: ["fünfzig", "fünfzehn", "vierzig"], answer: "fünfzig", tipEn: "fünf = 5, fünfzehn = 15, fünfzig = 50.", tipTa: "fünf = 5, fünfzehn = 15, fünfzig = 50." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 5 */
  {
    slug: "pongal-in-berlin",
    n: 5,
    landmarks: ["TN008", "DE005"], // Ramanathaswamy Temple, Berlin Cathedral
    mood: "festival",
    title: "Pongal in Berlin",
    sub: "Share a festival",
    speakers: { a: speaker("Yogesh"), n: speaker("Risha"), s: speaker("Shylash"), k: speaker("Kavitha"), v: speaker("Dhinesh") },
    lines: [
      { who: "a", parts: ["Hallo zusammen! Am Sonntag ", W("feiere", "feiern"), " ich Pongal. Das ist ein Erntefest in Indien."], en: "Hello everyone! On Sunday I'm celebrating Pongal. It is a harvest festival in India.", ta: "அனைவருக்கும் வணக்கம்! ஞாயிற்றுக்கிழமை நான் பொங்கல் கொண்டாடுகிறேன். அது இந்தியாவின் அறுவடைத் திருவிழா." },
      { who: "n", parts: ["Wie schön! Was macht man bei Pongal?"], en: "How lovely! What do people do at Pongal?", ta: "எவ்வளவு அழகு! பொங்கலில் என்ன செய்வார்கள்?" },
      { who: "a", parts: ["Wir kochen süßen Reis in einem ", W("Topf", "topf"), ". Der Reis ", W("kocht über", "ueberkochen"), " und wir rufen: Pongalo Pongal!"], en: "We cook sweet rice in a pot. The rice boils over and we shout: Pongalo Pongal!", ta: "நாங்கள் ஒரு பானையில் இனிப்புச் சாதம் சமைப்போம். சாதம் பொங்கி வழிந்ததும் “பொங்கலோ பொங்கல்!” என்று கூவுவோம்." },
      { who: "s", parts: ["Das klingt super! ", W("Um wie viel Uhr", "uhr"), " beginnt es?"], en: "That sounds great! What time does it start?", ta: "அருமையாக இருக்கிறது! எத்தனை மணிக்குத் தொடங்கும்?" },
      { who: "a", parts: ["Um zehn Uhr. Kommt bitte ", W("pünktlich", "puenktlich"), "!"], en: "At ten o'clock. Please come on time!", ta: "பத்து மணிக்கு. தயவுசெய்து சரியான நேரத்தில் வாருங்கள்!" },
      { who: "k", parts: ["Gerne! Ich ", W("bringe", "mitbringen"), " Kuchen ", W("mit", "mitbringen"), "."], en: "Gladly! I'll bring cake.", ta: "மகிழ்ச்சியுடன்! நான் கேக் கொண்டு வருகிறேன்." },
      { who: "v", parts: ["Und Adhi, Arvind, Akshay und Kaviarasan bringen das Essen mit."], en: "And Adhi, Arvind, Akshay and Kaviarasan bring the food.", ta: "ஆதி, அரவிந்த், அக்ஷய், கவியரசன் ஆகியோர் உணவு கொண்டு வருகிறார்கள்." },
      { who: "a", parts: ["Wunderbar. Bis Sonntag!"], en: "Wonderful. See you on Sunday!", ta: "அருமை. ஞாயிறு சந்திப்போம்!" },
    ],
    words: {
      feiern: { de: "feiern", en: "to celebrate", ta: "கொண்டாடு", ex: "Wir feiern Pongal.", exEn: "We celebrate Pongal.", exTa: "நாங்கள் பொங்கல் கொண்டாடுகிறோம்.", pic: "🎉" },
      topf: { de: "der Topf", en: "the pot", ta: "பானை", ex: "Der Topf ist heiß.", exEn: "The pot is hot.", exTa: "பானை சூடாக இருக்கிறது.", pic: "🍲" },
      ueberkochen: { de: "überkochen", en: "to boil over", ta: "பொங்கி வழி", ex: "Die Milch kocht über.", exEn: "The milk boils over.", exTa: "பால் பொங்கி வழிகிறது.", pic: "♨️" },
      uhr: { de: "Um wie viel Uhr?", en: "At what time?", ta: "எத்தனை மணிக்கு?", ex: "Um acht Uhr.", exEn: "At eight o'clock.", exTa: "எட்டு மணிக்கு.", pic: "🕙" },
      puenktlich: { de: "pünktlich", en: "on time", ta: "சரியான நேரத்தில்", ex: "Der Bus ist pünktlich.", exEn: "The bus is on time.", exTa: "பேருந்து சரியான நேரத்தில் வந்தது.", pic: "⏰" },
      mitbringen: { de: "mitbringen", en: "to bring along", ta: "கொண்டு வா", ex: "Ich bringe Kuchen mit.", exEn: "I bring cake along.", exTa: "நான் கேக் கொண்டு வருகிறேன்.", pic: "🎂" },
    },
    culture: {
      tn: "“Pongal” means “to boil over”. The bubbling pot stands for a good harvest.",
      de: "Erntedankfest in autumn also gives thanks for the harvest, with fruit and bread in decorated churches.",
    },
    quiz: [
      { type: "choice", q: "Am Sonntag ___ ich Pongal. (feiern)", options: ["feiere", "feierst", "feiert"], answer: "feiere", tipEn: "With ich the verb ends in -e.", tipTa: "ich உடன் வினை -e இல் முடியும்." },
      { type: "choice", q: "How do you say “Please come on time!” to several friends?", options: ["Kommt bitte pünktlich!", "Kommst bitte pünktlich!", "Komm bitte pünktlich!"], answer: "Kommt bitte pünktlich!", tipEn: "The ihr-command is the ihr-form without “ihr”: kommt!", tipTa: "ihr கட்டளை: ihr இல்லாத ihr-வடிவம்: kommt!" },
      { type: "order", q: "Build the sentence: “I bring cake.”", tiles: ["Ich", "bringe", "Kuchen", "mit", "bringst"], end: ".", answer: "Ich bringe Kuchen mit.", tipEn: "Separable verb mitbringen: bringe … mit. The small part goes to the end.", tipTa: "பிரியும் வினை mitbringen: bringe … mit. சிறிய பகுதி கடைசியில் செல்லும்." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 6 */
  {
    slug: "idli-fuer-alle",
    n: 6,
    landmarks: ["TN016", "DE023"], // Kapaleeshwarar Temple, Bamberg Cathedral
    mood: "steam",
    title: "Idli für alle",
    sub: "Cook a Tamil breakfast",
    speakers: { a: speaker("Rithika"), r: speaker("Poovai"), p: speaker("Thanisha") },
    lines: [
      { who: "r", parts: ["Rithika, ich möchte Idli kochen. ", W("Hilfst", "helfen"), " du mir?"], en: "Rithika, I would like to cook idli. Will you help me?", ta: "ரித்திகா, நான் இட்லி செய்ய விரும்புகிறேன். எனக்கு உதவுவாயா?" },
      { who: "a", parts: ["Ja, gern! Was brauchen wir?"], en: "Yes, gladly! What do we need?", ta: "ஆம், மகிழ்ச்சியுடன்! நமக்கு என்ன வேண்டும்?" },
      { who: "r", parts: ["Wir brauchen Reis, ", W("Linsen", "linsen"), " und Salz."], en: "We need rice, lentils and salt.", ta: "நமக்கு அரிசி, பருப்பு, உப்பு வேண்டும்." },
      { who: "a", parts: ["Gut. Ich wasche den Reis und die Linsen."], en: "Good. I wash the rice and the lentils.", ta: "சரி. நான் அரிசியையும் பருப்பையும் கழுவுகிறேன்." },
      { who: "p", parts: ["Hallo, ihr zwei! Mischt den ", W("Teig", "teig"), " und wartet bis morgen."], en: "Hello, you two! Mix the batter and wait until tomorrow.", ta: "வணக்கம், நீங்கள் இருவரும்! மாவைக் கலந்து நாளை வரை காத்திருங்கள்." },
      { who: "r", parts: ["Dann kochen wir die Idli im ", W("Dampf", "dampf"), "."], en: "Then we cook the idli in steam.", ta: "பிறகு இட்லியை ஆவியில் வேகவைப்போம்." },
      { who: "a", parts: ["Mmm, das riecht gut! Wer möchte Idli essen?"], en: "Mmm, that smells good! Who would like to eat idli?", ta: "ம்ம், நல்ல வாசனை! யார் இட்லி சாப்பிட விரும்புகிறார்கள்?" },
      { who: "p", parts: ["Ich! Und ich bringe Chutney mit."], en: "Me! And I'll bring chutney.", ta: "நான்! சட்னியும் கொண்டு வருகிறேன்." },
    ],
    words: {
      helfen: { de: "helfen", en: "to help", ta: "உதவு", ex: "Hilfst du mir?", exEn: "Will you help me?", exTa: "எனக்கு உதவுவாயா?", pic: "🤝" },
      linsen: { de: "die Linsen", en: "lentils", ta: "பருப்பு", ex: "Ich brauche Linsen.", exEn: "I need lentils.", exTa: "எனக்கு பருப்பு வேண்டும்.", pic: "🫘" },
      teig: { de: "der Teig", en: "batter, dough", ta: "மாவு", ex: "Der Teig ist weich.", exEn: "The batter is soft.", exTa: "மாவு மென்மையானது.", pic: "🥣" },
      dampf: { de: "der Dampf", en: "steam", ta: "ஆவி", ex: "Der Dampf ist heiß.", exEn: "The steam is hot.", exTa: "ஆவி சூடாக இருக்கிறது.", pic: "♨️" },
    },
    culture: {
      tn: "Idli batter ferments overnight. Many families eat idli with sambar and chutney for breakfast.",
      de: "Germans eat bread rolls (Brötchen) for breakfast. German bread culture is so rich that it is protected as cultural heritage.",
    },
    quiz: [
      { type: "choice", q: "___ du mir? (helfen)", options: ["Hilfst", "Helfst", "Hilft"], answer: "Hilfst", tipEn: "helfen changes its vowel: du hilfst.", tipTa: "helfen உயிர் மாறும்: du hilfst." },
      { type: "choice", q: "___ den Teig! (mischen, to several friends)", options: ["Mischt", "Mische", "Mischen"], answer: "Mischt", tipEn: "The ihr-command: mischt!", tipTa: "ihr கட்டளை: mischt!" },
      { type: "order", q: "Build the sentence: “We need rice and salt.”", tiles: ["Wir", "brauchen", "Reis", "und", "Salz", "braucht"], end: ".", answer: "Wir brauchen Reis und Salz.", tipEn: "wir → brauchen.", tipTa: "wir → brauchen." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 7 */
  {
    slug: "das-kolam",
    n: 7,
    landmarks: ["TN007", "DE006"], // Vivekananda Rock Memorial, Elbphilharmonie
    mood: "confetti",
    title: "Das Kolam",
    sub: "Colours at the door",
    speakers: { a: speaker("Kavitha"), r: speaker("Ruby"), m: speaker("Mrithula"), n: speaker("Medwin", "neighbour") },
    lines: [
      { who: "n", parts: ["Guten Morgen! Was machst du da?"], en: "Good morning! What are you doing there?", ta: "காலை வணக்கம்! நீ அங்கே என்ன செய்கிறாய்?" },
      { who: "r", parts: ["Guten Morgen! Ich ", W("male", "malen"), " ein Kolam vor die Tür."], en: "Good morning! I'm drawing a kolam in front of the door.", ta: "காலை வணக்கம்! நான் வாசலில் ஒரு கோலம் வரைகிறேன்." },
      { who: "n", parts: ["Was ist ein Kolam?"], en: "What is a kolam?", ta: "கோலம் என்றால் என்ன?" },
      { who: "r", parts: ["Ein Kolam ist ein ", W("Muster", "muster"), " aus Reismehl. Es bringt ", W("Glück", "glueck"), "."], en: "A kolam is a pattern made of rice flour. It brings luck.", ta: "கோலம் அரிசி மாவினால் போடும் ஒரு வடிவம். அது அதிர்ஷ்டம் தரும்." },
      { who: "n", parts: ["Schön! Welche ", W("Farben", "farben"), " hast du?"], en: "Beautiful! Which colours do you have?", ta: "அழகு! உன்னிடம் என்ன நிறங்கள் உள்ளன?" },
      { who: "r", parts: ["Ich habe Weiß, Rot und Gelb."], en: "I have white, red and yellow.", ta: "என்னிடம் வெள்ளை, சிவப்பு, மஞ்சள் உள்ளன." },
      { who: "m", parts: ["Hallo Ruby! Darf ich auch malen?"], en: "Hello Ruby! May I draw too?", ta: "வணக்கம் ரூபி! நானும் வரையலாமா?" },
      { who: "a", parts: ["Ja, natürlich! Hier ist Mehl für dich."], en: "Yes, of course! Here is flour for you.", ta: "ஆம், நிச்சயமாக! இதோ உனக்கு மாவு." },
    ],
    words: {
      malen: { de: "malen", en: "to paint, to draw", ta: "வரை", ex: "Ich male ein Bild.", exEn: "I paint a picture.", exTa: "நான் ஒரு படம் வரைகிறேன்.", pic: "🎨" },
      muster: { de: "das Muster", en: "the pattern", ta: "வடிவம்", ex: "Das Muster ist schön.", exEn: "The pattern is beautiful.", exTa: "வடிவம் அழகாக இருக்கிறது.", pic: "🔶" },
      glueck: { de: "das Glück", en: "luck, happiness", ta: "அதிர்ஷ்டம், மகிழ்ச்சி", ex: "Viel Glück!", exEn: "Good luck!", exTa: "நல்வாழ்த்துகள்!", pic: "🍀" },
      farben: { de: "die Farben", en: "the colours", ta: "நிறங்கள்", ex: "Rot und Gelb sind Farben.", exEn: "Red and yellow are colours.", exTa: "சிவப்பும் மஞ்சளும் நிறங்கள்.", pic: "🌈" },
    },
    culture: {
      tn: "In Tamil Nadu many women draw a kolam with rice flour at the door every morning. It is said to welcome luck and even feed the ants.",
      de: "In Germany a wreath on the door (Türkranz) or an Adventskranz in December welcomes guests and the season.",
    },
    quiz: [
      { type: "choice", q: "Ich male ___ Kolam. (das Kolam)", options: ["ein", "einen", "eine"], answer: "ein", tipEn: "Neuter ein stays ein in the Akkusativ.", tipTa: "அலிப்பால் ein Akkusativ இலும் ein தான்." },
      { type: "choice", q: "What does “Gelb” mean?", options: ["yellow", "red", "white"], answer: "yellow", tipEn: "Weiß = white, Rot = red, Gelb = yellow.", tipTa: "Weiß = வெள்ளை, Rot = சிவப்பு, Gelb = மஞ்சள்." },
      { type: "order", q: "Build the sentence: “I have white and red.”", tiles: ["Ich", "habe", "Weiß", "und", "Rot", "hast"], end: ".", answer: "Ich habe Weiß und Rot.", tipEn: "ich → habe.", tipTa: "ich → habe." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 8 */
  {
    slug: "deepavali-in-berlin",
    n: 8,
    landmarks: ["TN021", "DE022"], // Basilica of Our Lady of Good Health, Schwerin Castle
    mood: "fireworks",
    title: "Deepavali in Berlin",
    sub: "A festival of lights",
    speakers: { a: speaker("Yuvan"), m: speaker("Sanjay"), y: speaker("Kaviarasan"), p: speaker("Poovai"), r: speaker("Risha") },
    lines: [
      { who: "a", parts: ["Frohes Deepavali, Sanjay! Heute ist das ", W("Lichterfest", "lichterfest"), "."], en: "Happy Deepavali, Sanjay! Today is the festival of lights.", ta: "இனிய தீபாவளி, சஞ்சய்! இன்று ஒளித் திருவிழா." },
      { who: "m", parts: ["Danke, Yuvan! Frohes Deepavali! Die Lichter sind sehr schön."], en: "Thank you, Yuvan! Happy Deepavali! The lights are very beautiful.", ta: "நன்றி யுவன்! இனிய தீபாவளி! விளக்குகள் மிகவும் அழகாக உள்ளன." },
      { who: "a", parts: ["Wir stellen viele kleine ", W("Lampen", "lampen"), " vor die Tür."], en: "We put many small lamps in front of the door.", ta: "நாங்கள் வாசலில் பல சிறிய விளக்குகளை வைக்கிறோம்." },
      { who: "y", parts: ["Ich habe ", W("Süßigkeiten", "suessigkeiten"), " für alle. Nimm bitte!"], en: "I have sweets for everyone. Please take some!", ta: "என்னிடம் எல்லோருக்கும் இனிப்புகள் உள்ளன. தயவுசெய்து எடுத்துக்கொள்!" },
      { who: "p", parts: ["Mmm, ", W("lecker", "lecker"), "! Was ist das?"], en: "Mmm, tasty! What is that?", ta: "ம்ம், சுவையாக இருக்கிறது! இது என்ன?" },
      { who: "y", parts: ["Das sind Laddus. Sie sind süß und rund."], en: "Those are laddus. They are sweet and round.", ta: "இவை லட்டுகள். அவை இனிப்பாகவும் உருண்டையாகவும் உள்ளன." },
      { who: "r", parts: ["Im Dezember gibt es in Berlin den ", W("Weihnachtsmarkt", "weihnachtsmarkt"), ". Dort sind auch viele Lichter."], en: "In December there is the Christmas market in Berlin. There are many lights there too.", ta: "டிசம்பரில் பெர்லினில் கிறிஸ்துமஸ் சந்தை இருக்கும். அங்கும் நிறைய விளக்குகள் உள்ளன." },
      { who: "a", parts: ["Stimmt! In Indien und in Deutschland feiern wir mit Licht."], en: "True! In India and in Germany we celebrate with light.", ta: "உண்மை! இந்தியாவிலும் ஜெர்மனியிலும் நாம் ஒளியுடன் கொண்டாடுகிறோம்." },
    ],
    words: {
      lichterfest: { de: "das Lichterfest", en: "festival of lights", ta: "ஒளித் திருவிழா", ex: "Deepavali ist ein Lichterfest.", exEn: "Deepavali is a festival of lights.", exTa: "தீபாவளி ஒரு ஒளித் திருவிழா.", pic: "🪔" },
      lampen: { de: "die Lampen", en: "the lamps", ta: "விளக்குகள்", ex: "Die Lampen sind klein.", exEn: "The lamps are small.", exTa: "விளக்குகள் சிறியவை.", pic: "💡" },
      suessigkeiten: { de: "die Süßigkeiten", en: "sweets", ta: "இனிப்புகள்", ex: "Ich esse gern Süßigkeiten.", exEn: "I like eating sweets.", exTa: "எனக்கு இனிப்புகள் சாப்பிடப் பிடிக்கும்.", pic: "🍬" },
      lecker: { de: "lecker", en: "tasty", ta: "சுவையான", ex: "Das Essen ist lecker.", exEn: "The food is tasty.", exTa: "உணவு சுவையாக இருக்கிறது.", pic: "😋" },
      weihnachtsmarkt: { de: "der Weihnachtsmarkt", en: "Christmas market", ta: "கிறிஸ்துமஸ் சந்தை", ex: "Wir gehen auf den Weihnachtsmarkt.", exEn: "We go to the Christmas market.", exTa: "நாங்கள் கிறிஸ்துமஸ் சந்தைக்குப் போகிறோம்.", pic: "🎄" },
    },
    culture: {
      tn: "Deepavali celebrates light over darkness. Families light rows of lamps, burst crackers and share sweets.",
      de: "From late November German towns hold Weihnachtsmärkte with lights, hot Glühwein and sweets like Lebkuchen.",
    },
    quiz: [
      { type: "choice", q: "Das ___ Laddus. (sein)", options: ["sind", "ist", "bist"], answer: "sind", tipEn: "Plural: “Das sind …”.", tipTa: "பன்மையில்: “Das sind …”." },
      { type: "choice", q: "What does “lecker” mean?", options: ["tasty", "hot", "cold"], answer: "tasty", tipEn: "Das Essen ist lecker = The food is tasty.", tipTa: "Das Essen ist lecker = உணவு சுவையாக உள்ளது." },
      { type: "order", q: "Build the sentence: “Please take some!”", tiles: ["Nimm", "bitte", "nehme", "nimmst"], end: "!", answer: "Nimm bitte!", tipEn: "du-command of nehmen: nimm!", tipTa: "nehmen இன் du கட்டளை: nimm!" },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 9 (A2) */
  {
    slug: "beim-arzt",
    n: 9,
    landmarks: ["TN011", "DE020"], // Chennai Central, Zwinger Dresden
    mood: "rain",
    title: "Beim Arzt",
    sub: "A2 · At the doctor",
    speakers: { a: speaker("Akshay"), t: speaker("Sadhana"), d: speaker("Nethra", "doctor") },
    lines: [
      { who: "t", parts: ["Akshay, du siehst krank aus. Was ist los?"], en: "Akshay, you look ill. What is wrong?", ta: "அக்ஷய், நீ உடம்பு சரியில்லாதவன் போல் இருக்கிறாய். என்ன ஆச்சு?" },
      { who: "a", parts: ["Ich habe ", W("Kopfschmerzen", "kopfschmerzen"), " und ", W("Fieber", "fieber"), "."], en: "I have a headache and a fever.", ta: "எனக்கு தலைவலியும் காய்ச்சலும் இருக்கிறது." },
      { who: "t", parts: ["Du musst zum Arzt gehen. Ich rufe an und mache einen ", W("Termin", "termin"), "."], en: "You must go to the doctor. I'll call and make an appointment.", ta: "நீ மருத்துவரிடம் போக வேண்டும். நான் அழைத்து நேரம் வாங்குகிறேன்." },
      { who: "d", parts: ["Guten Tag, Akshay. Setzen Sie sich bitte. Seit wann haben Sie Fieber?"], en: "Good day, Akshay. Please sit down. Since when have you had a fever?", ta: "வணக்கம் அக்ஷய். தயவுசெய்து உட்காருங்கள். எப்போதிருந்து காய்ச்சல்?" },
      { who: "a", parts: ["Seit gestern. Und mein Hals tut weh."], en: "Since yesterday. And my throat hurts.", ta: "நேற்றிலிருந்து. தொண்டையும் வலிக்கிறது." },
      { who: "d", parts: ["Sie haben eine ", W("Erkältung", "erkaeltung"), ". Sie sollen viel Tee trinken und im Bett bleiben."], en: "You have a cold. You should drink a lot of tea and stay in bed.", ta: "உங்களுக்கு சளி பிடித்திருக்கிறது. நிறைய தேநீர் குடித்து படுக்கையில் இருக்க வேண்டும்." },
      { who: "a", parts: ["Muss ich ", W("Tabletten", "tabletten"), " nehmen?"], en: "Do I have to take tablets?", ta: "நான் மாத்திரைகள் எடுக்க வேண்டுமா?" },
      { who: "d", parts: ["Ja, dreimal am Tag. Gute ", W("Besserung", "besserung"), "!"], en: "Yes, three times a day. Get well soon!", ta: "ஆம், ஒரு நாளைக்கு மூன்று முறை. விரைவில் குணமடையுங்கள்!" },
    ],
    words: {
      kopfschmerzen: { de: "die Kopfschmerzen", en: "headache", ta: "தலைவலி", ex: "Ich habe Kopfschmerzen.", exEn: "I have a headache.", exTa: "எனக்கு தலைவலி.", pic: "🤕" },
      fieber: { de: "das Fieber", en: "fever", ta: "காய்ச்சல்", ex: "Er hat Fieber.", exEn: "He has a fever.", exTa: "அவனுக்கு காய்ச்சல்.", pic: "🌡️" },
      termin: { de: "der Termin", en: "appointment", ta: "முன்பதிவு நேரம்", ex: "Ich habe einen Termin.", exEn: "I have an appointment.", exTa: "எனக்கு ஒரு நேரம் உள்ளது.", pic: "📅" },
      erkaeltung: { de: "die Erkältung", en: "a cold", ta: "சளி", ex: "Ich habe eine Erkältung.", exEn: "I have a cold.", exTa: "எனக்கு சளி.", pic: "🤧" },
      tabletten: { de: "die Tabletten", en: "tablets", ta: "மாத்திரைகள்", ex: "Nehmen Sie die Tabletten.", exEn: "Take the tablets.", exTa: "மாத்திரைகளை எடுங்கள்.", pic: "💊" },
      besserung: { de: "Gute Besserung!", en: "Get well soon!", ta: "விரைவில் குணமடையுங்கள்!", ex: "Gute Besserung, Akshay!", exEn: "Get well soon, Akshay!", exTa: "விரைவில் குணமடையுங்கள், அக்ஷய்!", pic: "💐" },
    },
    culture: {
      tn: "Many families first try home remedies such as ginger tea or pepper rasam, and then visit a clinic.",
      de: "In Germany you usually need an appointment (Termin) and bring your health insurance card (Versichertenkarte).",
    },
    quiz: [
      { type: "choice", q: "Du ___ zum Arzt gehen.", options: ["musst", "muss", "müssen"], answer: "musst", tipEn: "With du the modal verb müssen becomes musst.", tipTa: "du உடன் müssen → musst." },
      { type: "choice", q: "Seit wann haben Sie Fieber? – ___ gestern.", options: ["Seit", "Vor", "Bis"], answer: "Seit", tipEn: "“Seit” says since when something has lasted.", tipTa: "“Seit” = எப்போதிருந்து." },
      { type: "order", q: "Build the sentence: “I have a headache.”", tiles: ["Ich", "habe", "Kopfschmerzen", "bin"], end: ".", answer: "Ich habe Kopfschmerzen.", tipEn: "Illnesses use haben: Ich habe …", tipTa: "நோய்களுக்கு haben: Ich habe …" },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 10 (A2) */
  {
    slug: "die-arbeit",
    n: 10,
    landmarks: ["TN019", "DE016"], // Government Museum Chennai, Residenz Munich
    mood: "evening",
    title: "Die Arbeit",
    sub: "A2 · Your first job",
    speakers: { a: speaker("Sudharsan"), c: speaker("Yogesh", "boss"), p: speaker("Sudha") },
    lines: [
      { who: "c", parts: ["Guten Morgen, Sudharsan. Heute ist Ihr erster ", W("Arbeitstag", "arbeitstag"), ". Wie war die Fahrt?"], en: "Good morning, Sudharsan. Today is your first working day. How was the journey?", ta: "காலை வணக்கம் சுதர்சன். இன்று உங்கள் முதல் வேலை நாள். பயணம் எப்படி இருந்தது?" },
      { who: "a", parts: ["Gut, danke. Ich bin mit der U-Bahn ", W("gefahren", "gefahren"), "."], en: "Good, thanks. I went by underground.", ta: "நன்றாக இருந்தது, நன்றி. நான் மெட்ரோவில் வந்தேன்." },
      { who: "c", parts: ["Hier ist Ihr ", W("Platz", "platz"), ". Sudha zeigt Ihnen alles."], en: "Here is your desk. Sudha will show you everything.", ta: "இதோ உங்கள் இடம். சுதா உங்களுக்கு எல்லாவற்றையும் காட்டுவார்." },
      { who: "p", parts: ["Hallo Sudharsan! Hast du schon Kaffee getrunken?"], en: "Hello Sudharsan! Have you already had coffee?", ta: "வணக்கம் சுதர்சன்! நீ ஏற்கனவே காபி குடித்தாயா?" },
      { who: "a", parts: ["Nein, noch nicht. Wo ist die Küche?"], en: "No, not yet. Where is the kitchen?", ta: "இல்லை, இன்னும் இல்லை. சமையலறை எங்கே?" },
      { who: "p", parts: ["Dort links. Wir essen um zwölf Uhr, ", W("weil", "weil"), " dann die ", W("Kantine", "kantine"), " öffnet."], en: "Over there on the left. We eat at twelve, because the canteen opens then.", ta: "அங்கே இடப்புறம். நாங்கள் பன்னிரண்டு மணிக்கு சாப்பிடுவோம், ஏனெனில் அப்போது உணவகம் திறக்கும்." },
      { who: "a", parts: ["Danke! Ich freue mich auf die Arbeit."], en: "Thanks! I'm looking forward to the work.", ta: "நன்றி! வேலைக்காக ஆவலாக இருக்கிறேன்." },
    ],
    words: {
      arbeitstag: { de: "der Arbeitstag", en: "working day", ta: "வேலை நாள்", ex: "Der Arbeitstag beginnt um neun.", exEn: "The working day starts at nine.", exTa: "வேலை நாள் ஒன்பது மணிக்குத் தொடங்கும்.", pic: "💼" },
      gefahren: { de: "gefahren", en: "driven, travelled", ta: "பயணம் செய்த", ex: "Ich bin nach Berlin gefahren.", exEn: "I travelled to Berlin.", exTa: "நான் பெர்லினுக்குப் பயணம் செய்தேன்.", pic: "🚇" },
      platz: { de: "der Platz", en: "place, seat, desk", ta: "இடம்", ex: "Das ist mein Platz.", exEn: "This is my seat.", exTa: "இது என் இடம்.", pic: "🪑" },
      weil: { de: "weil", en: "because", ta: "ஏனெனில்", ex: "Ich bin müde, weil ich viel gearbeitet habe.", exEn: "I am tired because I worked a lot.", exTa: "நான் நிறைய வேலை செய்ததால் களைப்பாக இருக்கிறேன்.", pic: "💡" },
      kantine: { de: "die Kantine", en: "canteen", ta: "உணவகம்", ex: "Die Kantine ist im Erdgeschoss.", exEn: "The canteen is on the ground floor.", exTa: "உணவகம் தரைத்தளத்தில் உள்ளது.", pic: "🍽️" },
    },
    culture: {
      tn: "In Tamil Nadu offices people often address seniors as sir or madam, and many bring lunch from home in a tiffin box.",
      de: "In many German workplaces colleagues use first names, start on time and keep their lunch break.",
    },
    quiz: [
      { type: "choice", q: "Ich bin mit der U-Bahn ___.", options: ["gefahren", "gefahrt", "fahren"], answer: "gefahren", tipEn: "Perfekt of fahren: ich bin gefahren (with sein, because you move).", tipTa: "fahren இன் Perfekt: ich bin gefahren (இயக்கம் என்பதால் sein)." },
      { type: "choice", q: "Wir essen um zwölf, ___ dann die Kantine öffnet.", options: ["weil", "und", "aber"], answer: "weil", tipEn: "“weil” gives a reason and sends the verb to the end: … weil die Kantine öffnet.", tipTa: "“weil” காரணம் சொல்லும்; வினை கடைசியில் செல்லும்." },
      { type: "order", q: "Build the sentence: “I drank coffee.”", tiles: ["Ich", "habe", "Kaffee", "getrunken", "trinke"], end: ".", answer: "Ich habe Kaffee getrunken.", tipEn: "Perfekt: habe … getrunken. The participle goes to the end.", tipTa: "Perfekt: habe … getrunken. Participle கடைசியில்." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 11 (A2) */
  {
    slug: "mit-dem-zug",
    n: 11,
    landmarks: ["TN006", "DE018"], // Fort St. George, Holstentor Lübeck
    mood: "autumn",
    title: "Mit dem Zug",
    sub: "A2 · A trip to Hamburg",
    speakers: { a: speaker("Mrithula"), s: speaker("Adhi"), k: speaker("Kavitha", "conductor") },
    lines: [
      { who: "s", parts: ["Mrithula, wir fahren am Samstag nach Hamburg. Kommst du mit?"], en: "Mrithula, on Saturday we are going to Hamburg. Are you coming along?", ta: "ம்ருதுலா, சனிக்கிழமை நாங்கள் ஹாம்பர்க் போகிறோம். நீயும் வருகிறாயா?" },
      { who: "a", parts: ["Gern! Wie kommen wir ", W("zum", "zum"), " Bahnhof?"], en: "Gladly! How do we get to the station?", ta: "மகிழ்ச்சியுடன்! ரயில் நிலையத்துக்கு எப்படிப் போவது?" },
      { who: "s", parts: ["Mit der U-Bahn. Wir treffen uns um acht Uhr am ", W("Gleis", "gleis"), " fünf."], en: "By underground. We meet at eight o'clock at platform five.", ta: "மெட்ரோவில். எட்டு மணிக்கு ஐந்தாம் நடைமேடையில் சந்திப்போம்." },
      { who: "k", parts: ["Guten Tag, Ihre ", W("Fahrkarten", "fahrkarte"), " bitte."], en: "Good day, your tickets please.", ta: "வணக்கம், உங்கள் பயணச்சீட்டுகள் தயவுசெய்து." },
      { who: "a", parts: ["Bitte schön. Fährt dieser Zug nach Hamburg?"], en: "Here you are. Does this train go to Hamburg?", ta: "இதோ. இந்த ரயில் ஹாம்பர்க் போகுமா?" },
      { who: "k", parts: ["Ja, aber er hat zwanzig Minuten ", W("Verspätung", "verspaetung"), "."], en: "Yes, but it is twenty minutes late.", ta: "ஆம், ஆனால் இருபது நிமிடம் தாமதம்." },
      { who: "s", parts: ["Kein Problem. Wir fahren mit dem Zug und sehen die Stadt später."], en: "No problem. We go by train and see the city later.", ta: "பிரச்சினை இல்லை. நாம் ரயிலில் போய் நகரத்தை பிறகு பார்ப்போம்." },
      { who: "a", parts: ["Ich sitze gern am Fenster."], en: "I like sitting by the window.", ta: "எனக்கு ஜன்னலோரம் உட்கார பிடிக்கும்." },
    ],
    words: {
      zum: { de: "zum (zu dem)", en: "to the", ta: "…க்கு", ex: "Ich gehe zum Bahnhof.", exEn: "I go to the station.", exTa: "நான் ரயில் நிலையத்துக்குப் போகிறேன்.", pic: "➡️" },
      gleis: { de: "das Gleis", en: "platform, track", ta: "நடைமேடை", ex: "Der Zug fährt auf Gleis fünf.", exEn: "The train leaves from platform five.", exTa: "ரயில் ஐந்தாம் நடைமேடையில் புறப்படும்.", pic: "🚉" },
      fahrkarte: { de: "die Fahrkarte", en: "ticket", ta: "பயணச்சீட்டு", ex: "Ich habe keine Fahrkarte.", exEn: "I don't have a ticket.", exTa: "என்னிடம் பயணச்சீட்டு இல்லை.", pic: "🎫" },
      verspaetung: { de: "die Verspätung", en: "delay", ta: "தாமதம்", ex: "Der Zug hat Verspätung.", exEn: "The train has a delay.", exTa: "ரயில் தாமதமாக உள்ளது.", pic: "⏳" },
    },
    culture: {
      tn: "On Indian trains you reserve a seat ahead, and tea and snack vendors walk through the coaches.",
      de: "German trains are often on time, but delays happen. Check the platform (Gleis) and the app before you go.",
    },
    quiz: [
      { type: "choice", q: "Wir fahren ___ dem Zug.", options: ["mit", "nach", "zu"], answer: "mit", tipEn: "“mit” always takes the Dativ: mit dem Zug.", tipTa: "“mit” எப்போதும் Dativ: mit dem Zug." },
      { type: "choice", q: "Wie kommen wir ___ Bahnhof?", options: ["zum", "zur", "nach"], answer: "zum", tipEn: "der Bahnhof: zu + dem = zum.", tipTa: "der Bahnhof: zu + dem = zum." },
      { type: "order", q: "Build the sentence: “The train is late.”", tiles: ["Der", "Zug", "hat", "Verspätung", "ist"], end: ".", answer: "Der Zug hat Verspätung.", tipEn: "German says: the train HAS a delay.", tipTa: "ஜெர்மனில்: ரயிலுக்கு தாமதம் உள்ளது (hat)." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 12 (A2) */
  {
    slug: "das-wochenende",
    n: 12,
    landmarks: ["TN001", "DE009"], // Brihadeeswarar Temple, Frauenkirche Dresden
    mood: "sunset",
    title: "Das Wochenende",
    sub: "A2 · What did you do?",
    speakers: { a: speaker("Arvind"), r: speaker("Sudha"), k: speaker("Medwin"), s: speaker("Rithika") },
    lines: [
      { who: "r", parts: ["Was hast du am Wochenende gemacht, Arvind?"], en: "What did you do at the weekend, Arvind?", ta: "அரவிந்த், வார இறுதியில் என்ன செய்தாய்?" },
      { who: "a", parts: ["Ich habe mit Medwin einen ", W("Ausflug", "ausflug"), " gemacht. Wir sind an den See gefahren."], en: "I went on a trip with Medwin. We went to the lake.", ta: "நான் அக்ஷயுடன் ஒரு சுற்றுலா போனேன். நாங்கள் ஏரிக்குப் போனோம்." },
      { who: "k", parts: ["Das Wasser war kalt, aber die Sonne war schön."], en: "The water was cold, but the sun was lovely.", ta: "தண்ணீர் குளிராக இருந்தது, ஆனால் வெயில் அழகாக இருந்தது." },
      { who: "r", parts: ["Habt ihr euch gut ", W("erholt", "erholen"), "?"], en: "Did you relax well?", ta: "நீங்கள் நன்றாக ஓய்வெடுத்தீர்களா?" },
      { who: "a", parts: ["Ja! Ich habe ", W("mich", "mich"), " sehr gefreut. Berlin ist ", W("größer", "groesser"), " als Madurai, aber der See ist ruhiger."], en: "Yes! I was very happy. Berlin is bigger than Madurai, but the lake is quieter.", ta: "ஆம்! நான் மிகவும் மகிழ்ந்தேன். பெர்லின் மதுரையை விடப் பெரியது, ஆனால் ஏரி அமைதியானது." },
      { who: "s", parts: ["Nächstes Wochenende kommen wir mit! Ich freue mich schon."], en: "Next weekend we'll come along! I'm already looking forward to it.", ta: "அடுத்த வார இறுதியில் நாங்களும் வருவோம்! நான் இப்போதே ஆவலாக இருக்கிறேன்." },
      { who: "a", parts: ["Wunderbar. Dann kochen wir zusammen Biryani am See."], en: "Wonderful. Then we'll cook biryani together at the lake.", ta: "அருமை. அப்படியானால் ஏரிக்கரையில் ஒன்றாக பிரியாணி சமைப்போம்." },
    ],
    words: {
      ausflug: { de: "der Ausflug", en: "trip, outing", ta: "சுற்றுலா", ex: "Wir machen einen Ausflug.", exEn: "We are going on a trip.", exTa: "நாங்கள் சுற்றுலா போகிறோம்.", pic: "🏞️" },
      erholen: { de: "sich erholen", en: "to relax, recover", ta: "ஓய்வெடு", ex: "Ich erhole mich am Sonntag.", exEn: "I relax on Sunday.", exTa: "நான் ஞாயிறு ஓய்வெடுக்கிறேன்.", pic: "😌" },
      mich: { de: "mich", en: "myself (with ich)", ta: "நானே (என்னை)", ex: "Ich freue mich.", exEn: "I am happy.", exTa: "நான் மகிழ்கிறேன்.", pic: "🙂" },
      groesser: { de: "größer (als)", en: "bigger (than)", ta: "…ஐ விடப் பெரிய", ex: "Berlin ist größer als Bonn.", exEn: "Berlin is bigger than Bonn.", exTa: "பெர்லின் பானை விடப் பெரியது.", pic: "📏" },
    },
    culture: {
      tn: "Weekend trips in Tamil Nadu often mean the beach, a temple town or a hill station such as Kodaikanal.",
      de: "Many Germans spend weekends at lakes, in forests or hiking. Sundays are quiet, so plan ahead.",
    },
    quiz: [
      { type: "choice", q: "Berlin ist ___ als Madurai.", options: ["größer", "groß", "am größten"], answer: "größer", tipEn: "The comparative adds -er, and “als” means “than”.", tipTa: "ஒப்பீடு: -er சேர்க்கவும்; “als” = விட." },
      { type: "choice", q: "Ich habe ___ gefreut.", options: ["mich", "dich", "sich"], answer: "mich", tipEn: "Reflexive with ich: mich.", tipTa: "ich உடன் தன்வினை: mich." },
      { type: "order", q: "Build the sentence: “We went to the lake.”", tiles: ["Wir", "sind", "an", "den", "See", "gefahren", "haben"], end: ".", answer: "Wir sind an den See gefahren.", tipEn: "Perfekt with sein: sind … gefahren.", tipTa: "sein உடன் Perfekt: sind … gefahren." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 13 (A2) */
  {
    slug: "im-restaurant",
    n: 13,
    landmarks: ["TN025", "DE013"], // Madhur temple tower, Nymphenburg Palace
    mood: "rainbow",
    title: "Im Restaurant",
    sub: "A2 · Order a meal",
    speakers: { a: speaker("Ruby"), k: speaker("Akshay", "waiter"), s: speaker("Sudharsan"), v: speaker("Mrithula") },
    lines: [
      { who: "k", parts: ["Guten Abend! Hier ist die ", W("Speisekarte", "speisekarte"), ". Was möchten Sie trinken?"], en: "Good evening! Here is the menu. What would you like to drink?", ta: "மாலை வணக்கம்! இதோ உணவுப் பட்டியல். என்ன குடிக்க விரும்புகிறீர்கள்?" },
      { who: "s", parts: ["Ich nehme ein Wasser, bitte."], en: "I'll have a water, please.", ta: "நான் ஒரு தண்ணீர் எடுத்துக்கொள்கிறேன்." },
      { who: "v", parts: ["Für mich einen Tee. Wir möchten gleich ", W("bestellen", "bestellen"), "."], en: "A tea for me. We would like to order right away.", ta: "எனக்கு ஒரு தேநீர். நாங்கள் உடனே ஆர்டர் செய்ய விரும்புகிறோம்." },
      { who: "a", parts: ["Ich ", W("hätte gern", "haettegern"), " die Gemüsesuppe und danach Nudeln mit Tomatensoße."], en: "I would like the vegetable soup and then pasta with tomato sauce.", ta: "எனக்கு காய்கறி சூப்பும் பிறகு தக்காளி சாஸுடன் பாஸ்தாவும் வேண்டும்." },
      { who: "v", parts: ["Ist der Salat frisch?"], en: "Is the salad fresh?", ta: "சாலட் புதியதா?" },
      { who: "k", parts: ["Ja, alles kommt aus der Region."], en: "Yes, everything comes from the region.", ta: "ஆம், எல்லாம் இந்தப் பகுதியிலிருந்தே வருகிறது." },
      { who: "a", parts: ["Das Essen war lecker! Die ", W("Rechnung", "rechnung"), ", bitte."], en: "The food was delicious! The bill, please.", ta: "உணவு சுவையாக இருந்தது! பில் தயவுசெய்து." },
      { who: "k", parts: ["Zusammen oder ", W("getrennt", "getrennt"), "?"], en: "Together or separately?", ta: "சேர்த்தா, தனித்தனியாகவா?" },
      { who: "s", parts: ["Zusammen. Stimmt so!"], en: "Together. Keep the change!", ta: "சேர்த்து. மீதியை வைத்துக்கொள்ளுங்கள்!" },
    ],
    words: {
      speisekarte: { de: "die Speisekarte", en: "the menu", ta: "உணவுப் பட்டியல்", ex: "Die Speisekarte, bitte.", exEn: "The menu, please.", exTa: "உணவுப் பட்டியல் தயவுசெய்து.", pic: "📋" },
      bestellen: { de: "bestellen", en: "to order", ta: "ஆர்டர் செய்", ex: "Wir bestellen Suppe.", exEn: "We order soup.", exTa: "நாங்கள் சூப் ஆர்டர் செய்கிறோம்.", pic: "🍽️" },
      haettegern: { de: "ich hätte gern", en: "I would like", ta: "எனக்கு வேண்டும் (பணிவாக)", ex: "Ich hätte gern einen Kaffee.", exEn: "I would like a coffee.", exTa: "எனக்கு ஒரு காபி வேண்டும்.", pic: "🙋" },
      rechnung: { de: "die Rechnung", en: "the bill", ta: "பில்", ex: "Die Rechnung, bitte.", exEn: "The bill, please.", exTa: "பில் தயவுசெய்து.", pic: "🧾" },
      getrennt: { de: "getrennt", en: "separately", ta: "தனித்தனியாக", ex: "Wir zahlen getrennt.", exEn: "We pay separately.", exTa: "நாங்கள் தனித்தனியாகப் பணம் செலுத்துகிறோம்.", pic: "✂️" },
    },
    culture: {
      tn: "In Tamil Nadu a meal is often served quickly on a banana leaf, and refills are offered without asking.",
      de: "In Germany you often wait to be seated and pay at the table. A tip of about 5 to 10 percent is common: say “Stimmt so”.",
    },
    quiz: [
      { type: "choice", q: "Ich ___ gern die Suppe.", options: ["hätte", "habe", "hat"], answer: "hätte", tipEn: "“Ich hätte gern …” is the polite way to order.", tipTa: "“Ich hätte gern …” என்பது பணிவான ஆர்டர் வாக்கியம்." },
      { type: "choice", q: "Die ___, bitte! (you want to pay)", options: ["Rechnung", "Speisekarte", "Suppe"], answer: "Rechnung", tipEn: "You ask for the bill at the end of the meal.", tipTa: "உணவு முடிந்ததும் பில் கேட்கிறோம்." },
      { type: "order", q: "Build the sentence: “We would like to order.”", tiles: ["Wir", "möchten", "bestellen", "möchte"], end: ".", answer: "Wir möchten bestellen.", tipEn: "wir → möchten, and the second verb goes to the end.", tipTa: "wir → möchten; இரண்டாவது வினை கடைசியில்." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 14 (A2) */
  {
    slug: "im-kino",
    n: 14,
    landmarks: ["TN014", "DE006"], // Kalaignar Library, Elbphilharmonie
    mood: "night",
    title: "Ein Abend im Kino",
    sub: "A2 · Plan an evening out",
    speakers: { a: speaker("Medwin"), m: speaker("Yuvan"), n: speaker("Sadhana") },
    lines: [
      { who: "m", parts: ["Hast du am Freitag Zeit? Wir gehen ins Kino."], en: "Do you have time on Friday? We are going to the cinema.", ta: "வெள்ளிக்கிழமை உனக்கு நேரம் இருக்கிறதா? நாங்கள் திரையரங்குக்குப் போகிறோம்." },
      { who: "a", parts: ["Gern! Welcher Film läuft denn?"], en: "Gladly! Which film is on?", ta: "மகிழ்ச்சி! எந்தப் படம் ஓடுகிறது?" },
      { who: "n", parts: ["Eine ", W("Komödie", "komoedie"), ". Der Film ", W("beginnt", "beginnt"), " um zwanzig Uhr."], en: "A comedy. The film starts at eight in the evening.", ta: "ஒரு நகைச்சுவைப் படம். இரவு எட்டு மணிக்குத் தொடங்கும்." },
      { who: "a", parts: ["Dann treffen wir uns um halb acht vor dem Kino."], en: "Then we meet at half past seven in front of the cinema.", ta: "அப்படியானால் ஏழரை மணிக்கு திரையரங்கின் முன் சந்திப்போம்." },
      { who: "m", parts: ["Ich kaufe die ", W("Karten", "karten"), " online. Drei Karten kosten dreißig Euro."], en: "I'll buy the tickets online. Three tickets cost thirty euros.", ta: "நான் டிக்கெட்டுகளை ஆன்லைனில் வாங்குகிறேன். மூன்று டிக்கெட்டுகள் முப்பது யூரோ." },
      { who: "n", parts: ["Super! Nach dem Film gehen wir noch etwas essen."], en: "Great! After the film we'll go and eat something.", ta: "அருமை! படத்துக்குப் பிறகு ஏதாவது சாப்பிடப் போவோம்." },
      { who: "a", parts: ["Gute Idee! Ich habe schon lange keinen Film im Kino ", W("gesehen", "gesehen"), "."], en: "Good idea! I haven't seen a film in the cinema for a long time.", ta: "நல்ல யோசனை! நான் நீண்ட நாளாக திரையரங்கில் படம் பார்க்கவில்லை." },
      { who: "m", parts: ["Ich auch nicht. Der Film ist ", W("bestimmt", "bestimmt"), " besser als der letzte."], en: "Me neither. The film is surely better than the last one.", ta: "நானும்தான். இந்தப் படம் கடைசிப் படத்தை விட நிச்சயம் நன்றாக இருக்கும்." },
    ],
    words: {
      komoedie: { de: "die Komödie", en: "comedy", ta: "நகைச்சுவைப் படம்", ex: "Ich mag Komödien.", exEn: "I like comedies.", exTa: "எனக்கு நகைச்சுவைப் படங்கள் பிடிக்கும்.", pic: "😂" },
      beginnt: { de: "beginnen", en: "to begin", ta: "தொடங்கு", ex: "Der Film beginnt um acht.", exEn: "The film begins at eight.", exTa: "படம் எட்டு மணிக்குத் தொடங்கும்.", pic: "▶️" },
      karten: { de: "die Karten", en: "tickets", ta: "டிக்கெட்டுகள்", ex: "Zwei Karten, bitte.", exEn: "Two tickets, please.", exTa: "இரண்டு டிக்கெட்டுகள் தயவுசெய்து.", pic: "🎟️" },
      gesehen: { de: "gesehen", en: "seen", ta: "பார்த்த", ex: "Ich habe den Film gesehen.", exEn: "I have seen the film.", exTa: "நான் படத்தைப் பார்த்தேன்.", pic: "👀" },
      bestimmt: { de: "bestimmt", en: "surely, certainly", ta: "நிச்சயமாக", ex: "Das wird bestimmt gut.", exEn: "That will surely be good.", exTa: "இது நிச்சயம் நன்றாக இருக்கும்.", pic: "✅" },
    },
    culture: {
      tn: "In Tamil Nadu cinema is a big part of life: a new film's first show can feel like a festival.",
      de: "Many German cinemas show films dubbed in German. Look for “OmU” if you want the original language with subtitles.",
    },
    quiz: [
      { type: "choice", q: "Der Film beginnt ___ zwanzig Uhr.", options: ["um", "in", "bei"], answer: "um", tipEn: "Use “um” for a clock time: um acht Uhr.", tipTa: "மணி நேரத்துக்கு “um”: um acht Uhr." },
      { type: "choice", q: "Ich habe lange keinen Film ___.", options: ["gesehen", "sehen", "sah"], answer: "gesehen", tipEn: "Perfekt: habe … gesehen.", tipTa: "Perfekt: habe … gesehen." },
      { type: "order", q: "Build the sentence: “We meet in front of the cinema.”", tiles: ["Wir", "treffen", "uns", "vor", "dem", "Kino", "treffe"], end: ".", answer: "Wir treffen uns vor dem Kino.", tipEn: "sich treffen: wir treffen uns. “vor” takes the Dativ here: vor dem Kino.", tipTa: "sich treffen: wir treffen uns. இங்கு “vor” உடன் Dativ: vor dem Kino." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 15 (A2) */
  {
    slug: "im-buergeramt",
    n: 15,
    landmarks: ["TN012", "DE011"], // Ripon Building, Sanssouci
    mood: "petals",
    title: "Im Bürgeramt",
    sub: "A2 · Register your flat",
    speakers: { a: speaker("Kaviarasan"), d: speaker("Sudharsan"), b: speaker("Kavitha", "official") },
    lines: [
      { who: "d", parts: ["Kaviarasan, hast du schon deine Wohnung ", W("angemeldet", "anmelden"), "?"], en: "Kaviarasan, have you already registered your flat?", ta: "கவியரசன், நீ உன் வீட்டை ஏற்கனவே பதிவு செய்துவிட்டாயா?" },
      { who: "a", parts: ["Noch nicht. Ich habe nächste Woche einen Termin im Bürgeramt."], en: "Not yet. I have an appointment at the registration office next week.", ta: "இன்னும் இல்லை. அடுத்த வாரம் குடிமக்கள் அலுவலகத்தில் எனக்கு நேரம் உள்ளது." },
      { who: "d", parts: ["Vergiss nicht, ", W("dass", "dass"), " du deinen Pass und den ", W("Mietvertrag", "mietvertrag"), " mitbringen musst."], en: "Don't forget that you have to bring your passport and the rental contract.", ta: "நீ உன் கடவுச்சீட்டையும் வாடகை ஒப்பந்தத்தையும் கொண்டு வர வேண்டும் என்பதை மறக்காதே." },
      { who: "b", parts: ["Guten Tag. Wie kann ich Ihnen helfen?"], en: "Good day. How can I help you?", ta: "வணக்கம். நான் உங்களுக்கு எப்படி உதவலாம்?" },
      { who: "a", parts: ["Guten Tag. Ich möchte meine Wohnung anmelden. Hier ist mein Pass."], en: "Good day. I would like to register my flat. Here is my passport.", ta: "வணக்கம். நான் என் வீட்டைப் பதிவு செய்ய விரும்புகிறேன். இதோ என் கடவுச்சீட்டு." },
      { who: "b", parts: ["Bitte füllen Sie dieses ", W("Formular", "formular"), " aus und ", W("unterschreiben", "unterschreiben"), " Sie hier."], en: "Please fill in this form and sign here.", ta: "தயவுசெய்து இந்தப் படிவத்தை நிரப்பி இங்கே கையெழுத்திடுங்கள்." },
      { who: "a", parts: ["Ist das so richtig?"], en: "Is that right?", ta: "இது சரியா?" },
      { who: "b", parts: ["Ja, alles in Ordnung. Sie bekommen die ", W("Bestätigung", "bestaetigung"), " per Post."], en: "Yes, everything is fine. You will get the confirmation by post.", ta: "ஆம், எல்லாம் சரி. உறுதிப்படுத்தும் கடிதம் அஞ்சலில் வரும்." },
    ],
    words: {
      anmelden: { de: "anmelden", en: "to register", ta: "பதிவு செய்", ex: "Ich melde meine Wohnung an.", exEn: "I register my flat.", exTa: "நான் என் வீட்டைப் பதிவு செய்கிறேன்.", pic: "📝" },
      dass: { de: "dass", en: "that", ta: "என்று", ex: "Ich weiß, dass du kommst.", exEn: "I know that you are coming.", exTa: "நீ வருவாய் என்று எனக்குத் தெரியும்.", pic: "💬" },
      mietvertrag: { de: "der Mietvertrag", en: "rental contract", ta: "வாடகை ஒப்பந்தம்", ex: "Hier ist der Mietvertrag.", exEn: "Here is the rental contract.", exTa: "இதோ வாடகை ஒப்பந்தம்.", pic: "📄" },
      formular: { de: "das Formular", en: "form", ta: "படிவம்", ex: "Ich fülle das Formular aus.", exEn: "I fill in the form.", exTa: "நான் படிவத்தை நிரப்புகிறேன்.", pic: "📑" },
      unterschreiben: { de: "unterschreiben", en: "to sign", ta: "கையெழுத்திடு", ex: "Bitte unterschreiben Sie hier.", exEn: "Please sign here.", exTa: "தயவுசெய்து இங்கே கையெழுத்திடுங்கள்.", pic: "✍️" },
      bestaetigung: { de: "die Bestätigung", en: "confirmation", ta: "உறுதிப்படுத்தல்", ex: "Ich bekomme eine Bestätigung.", exEn: "I get a confirmation.", exTa: "எனக்கு உறுதிப்படுத்தல் கிடைக்கும்.", pic: "📬" },
    },
    culture: {
      tn: "Many official tasks in Tamil Nadu are done in person at an office, often with photocopies and a clerk who guides you.",
      de: "In Germany you usually have to register your address (Anmeldung) within about two weeks of moving in. Often you book an appointment first.",
    },
    quiz: [
      { type: "choice", q: "Vergiss nicht, ___ du den Pass mitbringen musst.", options: ["dass", "das", "was"], answer: "dass", tipEn: "“dass” (with ss) starts a clause and sends the verb to the end.", tipTa: "“dass” (ss) ஒரு உட்பிரிவைத் தொடங்கி வினையை கடைசிக்கு அனுப்பும்." },
      { type: "choice", q: "Bitte ___ Sie hier. (to sign)", options: ["unterschreiben", "unterschreibt", "unterschrieben"], answer: "unterschreiben", tipEn: "Polite command with Sie: verb first, then Sie.", tipTa: "Sie உடன் பணிவான கட்டளை: வினை முதலில், பிறகு Sie." },
      { type: "order", q: "Build the sentence: “I would like to register my flat.”", tiles: ["Ich", "möchte", "meine", "Wohnung", "anmelden", "möchtest"], end: ".", answer: "Ich möchte meine Wohnung anmelden.", tipEn: "möchte + infinitive at the end.", tipTa: "möchte + வினை கடைசியில்." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 16 (A2) */
  {
    slug: "die-pruefung",
    n: 16,
    landmarks: ["TN015", "DE014"], // NIT Trichy clock tower, Ulm Minster
    mood: "breeze",
    title: "Die Prüfung",
    sub: "A2 · Get ready for the exam",
    speakers: { a: speaker("Nethra"), l: speaker("Sadhana", "teacher"), s: speaker("Ruby"), u: speaker("Arvind") },
    lines: [
      { who: "l", parts: ["Nächsten Monat ist die Prüfung. Wie ", W("bereitet", "vorbereiten"), " ihr euch vor?"], en: "Next month is the exam. How are you preparing?", ta: "அடுத்த மாதம் தேர்வு. நீங்கள் எப்படி தயாராகிறீர்கள்?" },
      { who: "s", parts: ["Ich lerne jeden Tag zwanzig Minuten Wörter."], en: "I learn words for twenty minutes every day.", ta: "நான் தினமும் இருபது நிமிடம் சொற்கள் கற்கிறேன்." },
      { who: "u", parts: ["Und ich schreibe jede Woche eine E-Mail."], en: "And I write an email every week.", ta: "நான் ஒவ்வொரு வாரமும் ஒரு மின்னஞ்சல் எழுதுகிறேன்." },
      { who: "a", parts: [W("Wenn", "wenn"), " ich viel übe, ", W("bestehe", "bestehen"), " ich die Prüfung."], en: "If I practise a lot, I will pass the exam.", ta: "நான் நிறைய பயிற்சி செய்தால் தேர்வில் தேறுவேன்." },
      { who: "l", parts: ["Sehr gut! Üben Sie auch das Sprechen. Sprechen Sie mit Ihren Freunden Deutsch."], en: "Very good! Also practise speaking. Speak German with your friends.", ta: "மிக நல்லது! பேசவும் பயிற்சி செய்யுங்கள். நண்பர்களுடன் ஜெர்மனில் பேசுங்கள்." },
      { who: "s", parts: ["Wir können uns jeden Abend eine halbe Stunde treffen."], en: "We can meet every evening for half an hour.", ta: "நாம் ஒவ்வொரு மாலையும் அரை மணி நேரம் சந்திக்கலாம்." },
      { who: "a", parts: ["Gute Idee! Ich habe keine ", W("Angst", "angst"), " mehr."], en: "Good idea! I'm not afraid any more.", ta: "நல்ல யோசனை! எனக்கு இனி பயம் இல்லை." },
      { who: "l", parts: ["Viel ", W("Erfolg", "erfolg"), "! Ihr schafft das."], en: "Good luck! You will manage it.", ta: "வெற்றி பெறுங்கள்! உங்களால் முடியும்." },
    ],
    words: {
      vorbereiten: { de: "sich vorbereiten", en: "to prepare", ta: "தயாராகு", ex: "Ich bereite mich vor.", exEn: "I prepare.", exTa: "நான் தயாராகிறேன்.", pic: "🎒" },
      wenn: { de: "wenn", en: "if, when", ta: "என்றால்", ex: "Wenn es regnet, bleibe ich zu Hause.", exEn: "If it rains, I stay at home.", exTa: "மழை பெய்தால் நான் வீட்டில் இருப்பேன்.", pic: "🔀" },
      bestehen: { de: "bestehen", en: "to pass (an exam)", ta: "தேர்வில் தேறு", ex: "Ich bestehe die Prüfung.", exEn: "I pass the exam.", exTa: "நான் தேர்வில் தேறுவேன்.", pic: "🎓" },
      angst: { de: "die Angst", en: "fear", ta: "பயம்", ex: "Ich habe keine Angst.", exEn: "I am not afraid.", exTa: "எனக்கு பயம் இல்லை.", pic: "😨" },
      erfolg: { de: "der Erfolg", en: "success", ta: "வெற்றி", ex: "Viel Erfolg!", exEn: "Good luck!", exTa: "வெற்றி பெறுங்கள்!", pic: "🏆" },
    },
    culture: {
      tn: "Many Tamil learners revise with notes and study in groups before an exam. Group study works well for languages too.",
      de: "Goethe exams test reading, listening, writing and speaking. You usually need about 60 percent to pass.",
    },
    quiz: [
      { type: "choice", q: "___ ich viel übe, bestehe ich die Prüfung.", options: ["Wenn", "Weil", "Dass"], answer: "Wenn", tipEn: "“Wenn” means “if”. The verb in that clause goes to the end, then the main clause starts with the verb.", tipTa: "“Wenn” = என்றால். அந்த உட்பிரிவில் வினை கடைசியில்." },
      { type: "choice", q: "Viel ___! (good luck)", options: ["Erfolg", "Angst", "Prüfung"], answer: "Erfolg", tipEn: "“Viel Erfolg!” wishes someone success.", tipTa: "“Viel Erfolg!” = வெற்றி பெறுங்கள்!" },
      { type: "order", q: "Build the sentence: “I learn words every day.”", tiles: ["Ich", "lerne", "jeden", "Tag", "Wörter", "lernst"], end: ".", answer: "Ich lerne jeden Tag Wörter.", tipEn: "jeden Tag = every day (Akkusativ of time).", tipTa: "jeden Tag = ஒவ்வொரு நாளும்." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 17 (A1 bonus) */
  {
    slug: "videoanruf",
    n: 17,
    landmarks: ["TN023", "DE010"], // Senate House, Römer
    mood: "noon",
    title: "Ein Videoanruf",
    sub: "A1 bonus · Call home",
    speakers: { a: speaker("Dhinesh"), m: role("Die Mutter", "M", "f"), s: role("Die Schwester", "S", "f") },
    lines: [
      { who: "m", parts: ["Hallo Dhinesh! Wie geht es dir?"], en: "Hello Dhinesh! How are you?", ta: "வணக்கம் தினேஷ்! எப்படி இருக்கிறாய்?" },
      { who: "a", parts: ["Mir geht es gut, Amma. Ich bin in Berlin und lerne Deutsch."], en: "I am fine, Amma. I am in Berlin and learning German.", ta: "நான் நலம், அம்மா. நான் பெர்லினில் இருக்கிறேன், ஜெர்மன் கற்கிறேன்." },
      { who: "m", parts: ["Hast du schon ", W("gegessen", "gegessen"), "?"], en: "Have you eaten already?", ta: "நீ சாப்பிட்டுவிட்டாயா?" },
      { who: "a", parts: ["Ja, ich habe Reis mit Gemüse gekocht."], en: "Yes, I cooked rice with vegetables.", ta: "ஆம், நான் காய்கறியுடன் சாதம் சமைத்தேன்." },
      { who: "s", parts: ["Hallo, Bruder! Ich ", W("vermisse", "vermissen"), " dich."], en: "Hello, brother! I miss you.", ta: "வணக்கம் அண்ணா! நான் உன்னை நினைத்து ஏங்குகிறேன்." },
      { who: "a", parts: ["Ich vermisse euch auch. Wie ist das ", W("Wetter", "wetter"), " in Madurai?"], en: "I miss you too. What is the weather like in Madurai?", ta: "நானும் உங்களை நினைக்கிறேன். மதுரையில் வானிலை எப்படி?" },
      { who: "s", parts: ["Es ist heiß, aber heute regnet es ein bisschen."], en: "It is hot, but today it is raining a little.", ta: "வெப்பமாக உள்ளது, ஆனால் இன்று கொஞ்சம் மழை பெய்கிறது." },
      { who: "m", parts: ["Komm bald zu ", W("Besuch", "besuch"), "! Wir kochen dein ", W("Lieblingsessen", "lieblingsessen"), "."], en: "Come and visit soon! We will cook your favourite food.", ta: "சீக்கிரம் வந்து பார்! உனக்குப் பிடித்த உணவை சமைப்போம்." },
    ],
    words: {
      gegessen: { de: "gegessen", en: "eaten", ta: "சாப்பிட்ட", ex: "Ich habe schon gegessen.", exEn: "I have already eaten.", exTa: "நான் ஏற்கனவே சாப்பிட்டேன்.", pic: "🍛" },
      vermissen: { de: "vermissen", en: "to miss (someone)", ta: "நினைத்து ஏங்கு", ex: "Ich vermisse meine Familie.", exEn: "I miss my family.", exTa: "நான் என் குடும்பத்தை நினைத்து ஏங்குகிறேன்.", pic: "💭" },
      wetter: { de: "das Wetter", en: "weather", ta: "வானிலை", ex: "Das Wetter ist heute schön.", exEn: "The weather is nice today.", exTa: "இன்று வானிலை நன்றாக உள்ளது.", pic: "⛅" },
      besuch: { de: "der Besuch", en: "visit", ta: "சந்திப்பு, வருகை", ex: "Wir haben Besuch.", exEn: "We have a visitor.", exTa: "எங்களுக்கு விருந்தினர் வந்திருக்கிறார்.", pic: "🚪" },
      lieblingsessen: { de: "das Lieblingsessen", en: "favourite food", ta: "பிடித்த உணவு", ex: "Mein Lieblingsessen ist Dosa.", exEn: "My favourite food is dosa.", exTa: "எனக்குப் பிடித்த உணவு தோசை.", pic: "🥞" },
    },
    culture: {
      tn: "In many Tamil homes the first question is “Have you eaten?”. Food is a way to show love and care.",
      de: "Many people in Germany call or video-call their family on weekends. It is normal to plan a call in advance.",
    },
    quiz: [
      { type: "choice", q: "Ich ___ dich.", options: ["vermisse", "vermisst", "vermissen"], answer: "vermisse", tipEn: "With ich the verb ends in -e.", tipTa: "ich உடன் வினை -e இல் முடியும்." },
      { type: "choice", q: "Hast du schon ___?", options: ["gegessen", "essen", "aß"], answer: "gegessen", tipEn: "Perfekt: haben + Partizip II (gegessen).", tipTa: "Perfekt: haben + Partizip II (gegessen)." },
      { type: "order", q: "Build the sentence: “I am learning German.”", tiles: ["Ich", "lerne", "Deutsch", "lernst"], end: ".", answer: "Ich lerne Deutsch.", tipEn: "ich → lerne.", tipTa: "ich → lerne." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 18 (A2) */
  {
    slug: "im-kaufhaus",
    n: 18,
    landmarks: ["TN020", "DE015"], // Rajaji Hall, St. Michael's Hamburg
    mood: "balloons",
    title: "Im Kaufhaus",
    sub: "A2 · Buy clothes",
    speakers: { a: speaker("Thanisha"), r: speaker("Rithika"), v: speaker("Risha", "shop assistant") },
    lines: [
      { who: "v", parts: ["Guten Tag! Suchen Sie etwas Bestimmtes?"], en: "Good day! Are you looking for something in particular?", ta: "வணக்கம்! குறிப்பிட்ட ஏதாவது தேடுகிறீர்களா?" },
      { who: "r", parts: ["Ja, ich suche eine warme Jacke. Haben Sie die auch in Grün?"], en: "Yes, I am looking for a warm jacket. Do you also have it in green?", ta: "ஆம், நான் ஒரு சூடான ஜாக்கெட் தேடுகிறேன். அது பச்சை நிறத்திலும் உள்ளதா?" },
      { who: "v", parts: ["Ja, hier. Welche ", W("Größe", "groesse"), " haben Sie?"], en: "Yes, here. What size are you?", ta: "ஆம், இதோ. உங்கள் அளவு என்ன?" },
      { who: "r", parts: ["Ich trage Größe M. Kann ich sie ", W("anprobieren", "anprobieren"), "?"], en: "I wear size M. Can I try it on?", ta: "நான் M அளவு அணிகிறேன். போட்டுப் பார்க்கலாமா?" },
      { who: "v", parts: ["Natürlich. Die ", W("Umkleidekabine", "umkleidekabine"), " ist dort hinten."], en: "Of course. The changing room is over there at the back.", ta: "நிச்சயமாக. உடை மாற்றும் அறை அங்கே பின்னால் உள்ளது." },
      { who: "a", parts: ["Die Jacke ", W("steht", "steht"), " dir gut, Rithika!"], en: "The jacket suits you, Rithika!", ta: "ஜாக்கெட் உனக்கு நன்றாகப் பொருந்துகிறது, ரித்திகா!" },
      { who: "r", parts: ["Aber sie ist zu teuer. Haben Sie eine günstigere Jacke?"], en: "But it is too expensive. Do you have a cheaper jacket?", ta: "ஆனால் இது மிகவும் விலை அதிகம். மலிவான ஜாக்கெட் உள்ளதா?" },
      { who: "v", parts: ["Diese hier kostet nur neunundvierzig Euro und ist im ", W("Angebot", "angebot"), "."], en: "This one costs only forty-nine euros and is on offer.", ta: "இது நாற்பத்தொன்பது யூரோ மட்டுமே, தள்ளுபடியில் உள்ளது." },
    ],
    words: {
      groesse: { de: "die Größe", en: "size", ta: "அளவு", ex: "Welche Größe haben Sie?", exEn: "What size are you?", exTa: "உங்கள் அளவு என்ன?", pic: "📏" },
      anprobieren: { de: "anprobieren", en: "to try on", ta: "போட்டுப் பார்", ex: "Ich probiere die Hose an.", exEn: "I try on the trousers.", exTa: "நான் கால்சட்டையைப் போட்டுப் பார்க்கிறேன்.", pic: "👗" },
      umkleidekabine: { de: "die Umkleidekabine", en: "changing room", ta: "உடை மாற்றும் அறை", ex: "Wo ist die Umkleidekabine?", exEn: "Where is the changing room?", exTa: "உடை மாற்றும் அறை எங்கே?", pic: "🚪" },
      steht: { de: "stehen (Das steht dir gut.)", en: "to suit", ta: "பொருந்து", ex: "Die Farbe steht dir gut.", exEn: "The colour suits you.", exTa: "இந்த நிறம் உனக்குப் பொருந்துகிறது.", pic: "✨" },
      angebot: { de: "das Angebot", en: "offer, special price", ta: "தள்ளுபடி", ex: "Das ist im Angebot.", exEn: "That is on offer.", exTa: "இது தள்ளுபடியில் உள்ளது.", pic: "🏷️" },
    },
    culture: {
      tn: "Many families buy new clothes for Pongal and Deepavali, often in big textile shops with many floors.",
      de: "German clothing sizes differ from Indian sizes, so try things on. Sales and special offers (Angebote) are common.",
    },
    quiz: [
      { type: "choice", q: "Die Jacke steht ___ gut.", options: ["dir", "dich", "du"], answer: "dir", tipEn: "“stehen” takes the Dativ: dir.", tipTa: "“stehen” உடன் Dativ: dir." },
      { type: "choice", q: "Kann ich die Jacke ___?", options: ["anprobieren", "probieren an", "anprobiert"], answer: "anprobieren", tipEn: "After a modal verb the infinitive stays together at the end: anprobieren.", tipTa: "Modal வினைக்குப் பிறகு வினை கடைசியில்: anprobieren." },
      { type: "order", q: "Build the sentence: “I am looking for a warm jacket.”", tiles: ["Ich", "suche", "eine", "warme", "Jacke", "suchen"], end: ".", answer: "Ich suche eine warme Jacke.", tipEn: "suchen + Akkusativ: eine warme Jacke.", tipTa: "suchen + Akkusativ: eine warme Jacke." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 19 (A2) */
  {
    slug: "die-heizung",
    n: 19,
    landmarks: ["TN019", "DE021"], // Government Museum, Linderhof
    mood: "snow",
    title: "Die Heizung ist kaputt",
    sub: "A2 · Report a problem",
    speakers: { a: speaker("Adhi"), h: speaker("Shylash", "caretaker"), v: speaker("Ram") },
    lines: [
      { who: "a", parts: ["Guten Tag, hier spricht Adhi aus Wohnung drei. Die ", W("Heizung", "heizung"), " ist ", W("kaputt", "kaputt"), "."], en: "Good day, this is Adhi from flat three. The heating is broken.", ta: "வணக்கம், நான் மூன்றாம் வீட்டிலிருந்து ஆதி பேசுகிறேன். வெப்பமூட்டி பழுதாகிவிட்டது." },
      { who: "h", parts: ["Das tut mir leid. Seit wann ", W("funktioniert", "funktionieren"), " sie nicht?"], en: "I'm sorry about that. Since when has it not worked?", ta: "மன்னிக்கவும். எப்போதிருந்து அது வேலை செய்யவில்லை?" },
      { who: "a", parts: ["Seit zwei Tagen. Es ist sehr kalt in der Wohnung."], en: "For two days. It is very cold in the flat.", ta: "இரண்டு நாட்களாக. வீட்டில் மிகவும் குளிராக உள்ளது." },
      { who: "h", parts: ["Ich schicke morgen einen ", W("Techniker", "techniker"), ". Wären Sie dann zu Hause?"], en: "I'll send a technician tomorrow. Would you be at home then?", ta: "நாளை ஒரு தொழில்நுட்பரை அனுப்புகிறேன். அப்போது நீங்கள் வீட்டில் இருப்பீர்களா?" },
      { who: "a", parts: ["Ja, morgen Vormittag bin ich da. Könnten Sie vielleicht früher kommen?"], en: "Yes, I'll be there tomorrow morning. Could you perhaps come earlier?", ta: "ஆம், நாளை காலை நான் இருப்பேன். சற்று முன்னதாக வர முடியுமா?" },
      { who: "h", parts: ["Ich ", W("versuche", "versuchen"), " es. Ich rufe Sie in einer Stunde an."], en: "I'll try. I'll call you in an hour.", ta: "முயற்சிக்கிறேன். ஒரு மணி நேரத்தில் உங்களை அழைக்கிறேன்." },
      { who: "v", parts: ["Adhi, wenn du möchtest, kannst du heute Abend bei mir essen. Bei mir ist es warm."], en: "Adhi, if you like you can eat at my place this evening. It is warm at mine.", ta: "ஆதி, விரும்பினால் இன்று மாலை என் வீட்டில் சாப்பிடலாம். என் வீட்டில் வெப்பமாக உள்ளது." },
      { who: "a", parts: ["Das wäre sehr nett, Ram. Vielen Dank!"], en: "That would be very kind, Ram. Thank you very much!", ta: "அது மிகவும் அன்பாக இருக்கும் ராம். மிக்க நன்றி!" },
    ],
    words: {
      heizung: { de: "die Heizung", en: "heating", ta: "வெப்பமூட்டி", ex: "Die Heizung ist an.", exEn: "The heating is on.", exTa: "வெப்பமூட்டி இயங்குகிறது.", pic: "🔥" },
      kaputt: { de: "kaputt", en: "broken", ta: "பழுதான", ex: "Das Handy ist kaputt.", exEn: "The phone is broken.", exTa: "கைபேசி பழுதாகிவிட்டது.", pic: "🔧" },
      funktionieren: { de: "funktionieren", en: "to work, function", ta: "வேலை செய்", ex: "Das Internet funktioniert nicht.", exEn: "The internet does not work.", exTa: "இணையம் வேலை செய்யவில்லை.", pic: "⚙️" },
      techniker: { de: "der Techniker", en: "technician", ta: "தொழில்நுட்பர்", ex: "Der Techniker kommt morgen.", exEn: "The technician comes tomorrow.", exTa: "தொழில்நுட்பர் நாளை வருவார்.", pic: "🧰" },
      versuchen: { de: "versuchen", en: "to try", ta: "முயற்சி செய்", ex: "Ich versuche es noch einmal.", exEn: "I'll try it once more.", exTa: "நான் மீண்டும் முயற்சி செய்கிறேன்.", pic: "💪" },
    },
    culture: {
      tn: "When something breaks, a neighbour or relative often helps quickly and offers you a meal or tea.",
      de: "In Germany you report repairs to the landlord or the Hausverwaltung, ideally by email so there is a written record.",
    },
    quiz: [
      { type: "choice", q: "Die Heizung ___ nicht.", options: ["funktioniert", "funktionieren", "funktioniere"], answer: "funktioniert", tipEn: "die Heizung = sie → funktioniert.", tipTa: "die Heizung = sie → funktioniert." },
      { type: "choice", q: "___ Sie früher kommen? (very polite)", options: ["Könnten", "Können", "Konnten"], answer: "Könnten", tipEn: "Könnten = polite form (Konjunktiv II).", tipTa: "Könnten = பணிவான வடிவம் (Konjunktiv II)." },
      { type: "order", q: "Build the sentence: “The heating is broken.”", tiles: ["Die", "Heizung", "ist", "kaputt", "sind"], end: ".", answer: "Die Heizung ist kaputt.", tipEn: "kaputt can be used like an adjective after sein.", tipTa: "kaputt, sein க்குப் பிறகு பெயரடை போல வரும்." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 20 (A2) */
  {
    slug: "muell-trennen",
    n: 20,
    landmarks: ["TN016", "DE020"], // Kapaleeshwarar Temple, Zwinger
    mood: "rainbow",
    title: "Müll trennen",
    sub: "A2 · Sorting rubbish",
    speakers: { a: speaker("Sanjay"), v: speaker("Thanisha"), s: speaker("Dhinesh") },
    lines: [
      { who: "v", parts: ["Sanjay, in Deutschland trennt man den ", W("Müll", "muell"), "."], en: "Sanjay, in Germany you separate the rubbish.", ta: "சஞ்சய், ஜெர்மனியில் குப்பையைப் பிரித்துப் போடுவார்கள்." },
      { who: "a", parts: ["Ja, ich habe vier Mülltonnen gesehen. Was kommt wohin?"], en: "Yes, I saw four bins. What goes where?", ta: "ஆம், நான்கு குப்பைத் தொட்டிகளைப் பார்த்தேன். எது எங்கே போடுவது?" },
      { who: "v", parts: ["Papier kommt in die blaue ", W("Tonne", "tonne"), ", Plastik meistens in die gelbe."], en: "Paper goes in the blue bin, plastic mostly in the yellow one.", ta: "காகிதம் நீலத் தொட்டியில், பிளாஸ்டிக் பெரும்பாலும் மஞ்சள் தொட்டியில்." },
      { who: "a", parts: ["Und was passiert mit den Flaschen?"], en: "And what happens to the bottles?", ta: "பாட்டில்களுக்கு என்ன நடக்கும்?" },
      { who: "v", parts: ["Flaschen werden zurückgebracht. Dafür bekommt man ", W("Pfand", "pfand"), "."], en: "Bottles are taken back. You get a deposit for them.", ta: "பாட்டில்கள் திருப்பித் தரப்படும். அதற்கு வைப்புத்தொகை கிடைக்கும்." },
      { who: "s", parts: ["Das Papier wird gesammelt und ", W("recycelt", "recyceln"), "."], en: "The paper is collected and recycled.", ta: "காகிதம் சேகரிக்கப்பட்டு மறுசுழற்சி செய்யப்படுகிறது." },
      { who: "a", parts: ["Das finde ich gut. In Madurai nehmen viele Leute eine Stofftasche zum Markt mit."], en: "I like that. In Madurai many people take a cloth bag to the market.", ta: "அது எனக்குப் பிடிக்கிறது. மதுரையில் பலர் சந்தைக்கு துணிப்பை எடுத்துச் செல்கிறார்கள்." },
      { who: "v", parts: ["Das machen immer mehr Leute auch ", W("hier", "hier"), "."], en: "More and more people do that here too.", ta: "இங்கேயும் மேலும் மேலும் பலர் அதைச் செய்கிறார்கள்." },
    ],
    words: {
      muell: { de: "der Müll", en: "rubbish", ta: "குப்பை", ex: "Wir trennen den Müll.", exEn: "We separate the rubbish.", exTa: "நாங்கள் குப்பையைப் பிரிக்கிறோம்.", pic: "🗑️" },
      tonne: { de: "die Tonne", en: "bin", ta: "குப்பைத் தொட்டி", ex: "Die Tonne ist voll.", exEn: "The bin is full.", exTa: "தொட்டி நிரம்பிவிட்டது.", pic: "♻️" },
      pfand: { de: "das Pfand", en: "deposit (on bottles)", ta: "வைப்புத்தொகை", ex: "Auf der Flasche ist Pfand.", exEn: "There is a deposit on the bottle.", exTa: "பாட்டிலுக்கு வைப்புத்தொகை உள்ளது.", pic: "🍾" },
      recyceln: { de: "recyceln", en: "to recycle", ta: "மறுசுழற்சி செய்", ex: "Wir recyceln Papier.", exEn: "We recycle paper.", exTa: "நாங்கள் காகிதத்தை மறுசுழற்சி செய்கிறோம்.", pic: "🔄" },
      hier: { de: "hier", en: "here", ta: "இங்கே", ex: "Ich wohne hier.", exEn: "I live here.", exTa: "நான் இங்கே வசிக்கிறேன்.", pic: "📍" },
    },
    culture: {
      tn: "Many Tamil households reuse containers and carry a cloth bag (the “manjappai”) to the market.",
      de: "Germany separates waste into several bins, and many bottles carry a deposit (Pfand) that you get back.",
    },
    quiz: [
      { type: "choice", q: "Flaschen ___ zurückgebracht.", options: ["werden", "wird", "wurde"], answer: "werden", tipEn: "Passive plural: werden + Partizip II.", tipTa: "செயப்பாட்டு பன்மை: werden + Partizip II." },
      { type: "choice", q: "Papier kommt in die blaue ___.", options: ["Tonne", "Tasche", "Flasche"], answer: "Tonne", tipEn: "die Tonne = the bin.", tipTa: "die Tonne = குப்பைத் தொட்டி." },
      { type: "order", q: "Build the sentence: “The rubbish is separated.”", tiles: ["Der", "Müll", "wird", "getrennt", "werden"], end: ".", answer: "Der Müll wird getrennt.", tipEn: "Passive: wird + Partizip II at the end.", tipTa: "செயப்பாட்டு: wird + Partizip II கடைசியில்." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 21 (A2) */
  {
    slug: "klassenfest",
    n: 21,
    landmarks: ["TN005", "DE013"], // Madras High Court, Nymphenburg Palace
    mood: "fireworks",
    title: "Das Klassenfest",
    sub: "A2 · Plan a party together",
    speakers: { a: speaker("Shylash"), x: speaker("Kaviarasan"), y: speaker("Nethra") },
    lines: [
      { who: "x", parts: ["Shylash, am Freitag machen wir ein Klassenfest. Hast du Zeit?"], en: "Shylash, on Friday we are having a class party. Do you have time?", ta: "ஷைலேஷ், வெள்ளிக்கிழமை நாங்கள் வகுப்பு விழா நடத்துகிறோம். உனக்கு நேரம் இருக்கிறதா?" },
      { who: "a", parts: ["Ja, gern! Was soll ich mitbringen?"], en: "Yes, gladly! What should I bring?", ta: "ஆம், மகிழ்ச்சி! நான் என்ன கொண்டு வர வேண்டும்?" },
      { who: "y", parts: ["Wir brauchen ", W("Getränke", "getraenke"), ", Kuchen und Musik."], en: "We need drinks, cake and music.", ta: "நமக்கு பானங்கள், கேக், இசை வேண்டும்." },
      { who: "a", parts: ["Ich kann Tee und Kaffee mitbringen. Und ich habe einen ", W("Lautsprecher", "lautsprecher"), " für die Musik."], en: "I can bring tea and coffee. And I have a speaker for the music.", ta: "நான் தேநீரும் காபியும் கொண்டு வரலாம். இசைக்காக என்னிடம் ஒரு ஒலிபெருக்கி உள்ளது." },
      { who: "x", parts: ["Prima! Wer macht die Einladung?"], en: "Great! Who makes the invitation?", ta: "அருமை! அழைப்பிதழை யார் செய்கிறார்கள்?" },
      { who: "y", parts: ["Ich schreibe eine Nachricht an alle in der Gruppe."], en: "I'll write a message to everyone in the group.", ta: "நான் குழுவில் உள்ள அனைவருக்கும் ஒரு செய்தி எழுதுகிறேன்." },
      { who: "a", parts: ["Und wann ", W("fangen", "anfangen"), " wir ", W("an", "anfangen"), "?"], en: "And when do we start?", ta: "நாம் எப்போது தொடங்குவோம்?" },
      { who: "x", parts: ["Um sechs Uhr. Dann essen, ", W("tanzen", "tanzen"), " und feiern wir zusammen!"], en: "At six o'clock. Then we eat, dance and celebrate together!", ta: "ஆறு மணிக்கு. பிறகு நாம் ஒன்றாக சாப்பிட்டு, நடனமாடி, கொண்டாடுவோம்!" },
    ],
    words: {
      getraenke: { de: "die Getränke", en: "drinks", ta: "பானங்கள்", ex: "Wir kaufen Getränke.", exEn: "We buy drinks.", exTa: "நாங்கள் பானங்கள் வாங்குகிறோம்.", pic: "🥤" },
      lautsprecher: { de: "der Lautsprecher", en: "speaker (for music)", ta: "ஒலிபெருக்கி", ex: "Der Lautsprecher ist laut.", exEn: "The speaker is loud.", exTa: "ஒலிபெருக்கி சத்தமாக உள்ளது.", pic: "🔊" },
      anfangen: { de: "anfangen", en: "to start, to begin", ta: "தொடங்கு", ex: "Der Kurs fängt um acht an.", exEn: "The course starts at eight.", exTa: "வகுப்பு எட்டு மணிக்குத் தொடங்கும்.", pic: "🚦" },
      tanzen: { de: "tanzen", en: "to dance", ta: "நடனமாடு", ex: "Wir tanzen zusammen.", exEn: "We dance together.", exTa: "நாங்கள் ஒன்றாக நடனமாடுகிறோம்.", pic: "💃" },
    },
    culture: {
      tn: "At a Tamil function the host usually serves a big shared meal and insists that you eat a little more.",
      de: "Many German parties are “bring something” events: each guest brings a salad, a drink or a dessert.",
    },
    quiz: [
      { type: "choice", q: "Wir ___ um sechs Uhr an. (anfangen)", options: ["fangen", "fängt", "fange"], answer: "fangen", tipEn: "Separable verb: wir fangen … an. The small part goes to the end.", tipTa: "பிரியும் வினை: wir fangen … an. சிறிய பகுதி கடைசியில்." },
      { type: "choice", q: "Ich ___ Tee und Kaffee mitbringen.", options: ["kann", "kannst", "können"], answer: "kann", tipEn: "With ich the modal verb is kann.", tipTa: "ich உடன் modal வினை kann." },
      { type: "order", q: "Build the sentence: “We need drinks and cake.”", tiles: ["Wir", "brauchen", "Getränke", "und", "Kuchen", "braucht"], end: ".", answer: "Wir brauchen Getränke und Kuchen.", tipEn: "wir → brauchen.", tipTa: "wir → brauchen." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 22 (A2) */
  {
    slug: "auf-wiedersehen-kurs",
    n: 22,
    landmarks: ["TN009", "DE010"], // Chettinad Palace, Römer
    mood: "sunset",
    title: "Auf Wiedersehen, Kurs",
    sub: "A2 · The last day",
    speakers: { a: speaker("Sudha"), x: speaker("Poovai"), y: speaker("Ram") },
    lines: [
      { who: "x", parts: ["Sudha, morgen ist der ", W("letzte", "letzte"), " Kurstag. Ich bin ein bisschen traurig."], en: "Sudha, tomorrow is the last day of the course. I am a little sad.", ta: "சுதா, நாளை வகுப்பின் கடைசி நாள். நான் கொஞ்சம் சோகமாக இருக்கிறேன்." },
      { who: "a", parts: ["Ich auch. Aber wir bleiben Freunde und treffen uns weiter."], en: "Me too. But we stay friends and keep meeting.", ta: "நானும். ஆனால் நாம் நண்பர்களாகவே இருப்போம், தொடர்ந்து சந்திப்போம்." },
      { who: "y", parts: ["Was machst du nach dem Kurs?"], en: "What are you doing after the course?", ta: "வகுப்புக்குப் பிறகு நீ என்ன செய்யப் போகிறாய்?" },
      { who: "a", parts: ["Ich möchte die Prüfung machen und dann eine Arbeit suchen. Und du?"], en: "I want to take the exam and then look for a job. And you?", ta: "நான் தேர்வு எழுதி, பிறகு வேலை தேட விரும்புகிறேன். நீ?" },
      { who: "x", parts: ["Ich ", W("werde", "werde"), " noch ein Jahr in Berlin bleiben und Deutsch üben."], en: "I will stay in Berlin for another year and practise German.", ta: "நான் இன்னும் ஒரு வருடம் பெர்லினில் இருந்து ஜெர்மன் பயிற்சி செய்வேன்." },
      { who: "y", parts: ["Ich ", W("würde", "wuerde"), " gern nach Hamburg ziehen."], en: "I would like to move to Hamburg.", ta: "நான் ஹாம்பர்க்குக்கு குடிபெயர விரும்புவேன்." },
      { who: "a", parts: ["Das klingt gut! Wir schreiben uns und telefonieren oft."], en: "That sounds good! We will write to each other and phone often.", ta: "அது நன்றாக இருக்கிறது! நாம் கடிதம் எழுதி அடிக்கடி தொலைபேசியில் பேசுவோம்." },
      { who: "x", parts: [W("Versprochen", "versprochen"), "! Vielen Dank für die schöne Zeit mit euch!"], en: "Promised! Thank you for the lovely time with you!", ta: "உறுதி! உங்களுடன் இருந்த இனிய நேரத்துக்கு மிக்க நன்றி!" },
    ],
    words: {
      letzte: { de: "letzte", en: "last", ta: "கடைசி", ex: "Das ist der letzte Tag.", exEn: "That is the last day.", exTa: "இது கடைசி நாள்.", pic: "🔚" },
      werde: { de: "ich werde", en: "I will", ta: "நான் … செய்வேன்", ex: "Ich werde lernen.", exEn: "I will learn.", exTa: "நான் கற்பேன்.", pic: "🔮" },
      wuerde: { de: "ich würde gern", en: "I would like to", ta: "நான் … செய்ய விரும்புவேன்", ex: "Ich würde gern reisen.", exEn: "I would like to travel.", exTa: "நான் பயணம் செய்ய விரும்புவேன்.", pic: "💭" },
      versprochen: { de: "versprochen", en: "promised", ta: "உறுதி", ex: "Das ist versprochen.", exEn: "That is a promise.", exTa: "இது ஒரு உறுதிமொழி.", pic: "🤞" },
    },
    culture: {
      tn: "In Tamil, people often say “poittu varen” (I will go and come back) instead of a final goodbye: a hope to meet again.",
      de: "In Germany a farewell is warm but direct: “Auf Wiedersehen” and a promise like “Wir bleiben in Kontakt”.",
    },
    quiz: [
      { type: "choice", q: "Ich ___ noch ein Jahr in Berlin bleiben. (future)", options: ["werde", "werden", "wirst"], answer: "werde", tipEn: "Future: werden + infinitive at the end. With ich: werde.", tipTa: "எதிர்காலம்: werden + வினை கடைசியில். ich உடன்: werde." },
      { type: "choice", q: "Ich ___ gern nach Hamburg ziehen. (a wish)", options: ["würde", "werde", "wurde"], answer: "würde", tipEn: "“würde gern” = would like to (Konjunktiv II).", tipTa: "“würde gern” = விரும்புவேன் (Konjunktiv II)." },
      { type: "order", q: "Build the sentence: “We keep meeting.”", tiles: ["Wir", "treffen", "uns", "weiter", "treffe"], end: ".", answer: "Wir treffen uns weiter.", tipEn: "sich treffen: wir treffen uns.", tipTa: "sich treffen: wir treffen uns." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 23 (A2) */
  {
    slug: "der-erste-schnee",
    n: 23,
    landmarks: ["TN004", "DE003"],
    mood: "snow",
    title: "Der erste Schnee",
    sub: "A1 · Winter in Berlin",
    speakers: { a: speaker("Shylash"), x: speaker("Nethra"), y: speaker("Medwin") },
    lines: [
      { who: "x", parts: ["Schau mal, Shylash! Es ", W("schneit", "schneien"), "!"], en: "Look, Shylash! It is snowing!", ta: "பார், ஷைலேஷ்! பனி பெய்கிறது!" },
      { who: "a", parts: ["Wow! Das ist mein erster Schnee. In Madurai gibt es keinen Schnee."], en: "Wow! This is my first snow. There is no snow in Madurai.", ta: "அட! இதுதான் என் முதல் பனி. மதுரையில் பனி இல்லை." },
      { who: "y", parts: ["Dann brauchst du eine warme Jacke, eine ", W("Mütze", "muetze"), " und ", W("Handschuhe", "handschuhe"), "."], en: "Then you need a warm jacket, a hat and gloves.", ta: "அப்படியானால் உனக்கு ஒரு சூடான ஜாக்கெட், தொப்பி, கையுறைகள் வேண்டும்." },
      { who: "a", parts: ["Ich habe nur eine dünne Jacke. Wo kann ich warme Kleidung kaufen?"], en: "I only have a thin jacket. Where can I buy warm clothes?", ta: "என்னிடம் மெல்லிய ஜாக்கெட் மட்டுமே உள்ளது. சூடான உடைகளை எங்கே வாங்கலாம்?" },
      { who: "x", parts: ["Im Kaufhaus gibt es heute Angebote. Wir gehen zusammen hin."], en: "There are special offers at the department store today. We'll go together.", ta: "இன்று பல்பொருள் அங்காடியில் தள்ளுபடி உள்ளது. நாம் ஒன்றாகப் போவோம்." },
      { who: "y", parts: ["Aber Vorsicht! Der Boden ist ", W("glatt", "glatt"), "."], en: "But careful! The ground is slippery.", ta: "ஆனால் கவனம்! தரை வழுக்குகிறது." },
      { who: "a", parts: ["Danke für die Warnung. Ich gehe ganz langsam."], en: "Thanks for the warning. I'll walk very slowly.", ta: "எச்சரிக்கைக்கு நன்றி. நான் மிக மெதுவாக நடப்பேன்." },
      { who: "x", parts: ["Und danach trinken wir einen heißen Tee."], en: "And afterwards we'll drink a hot tea.", ta: "அதற்குப் பிறகு நாம் சூடான தேநீர் குடிப்போம்." },
    ],
    words: {
      schneien: { de: "schneien", en: "to snow", ta: "பனி பெய்", ex: "Es schneit heute.", exEn: "It is snowing today.", exTa: "இன்று பனி பெய்கிறது.", pic: "❄️" },
      muetze: { de: "die Mütze", en: "woolly hat", ta: "குளிர் தொப்பி", ex: "Die Mütze ist warm.", exEn: "The hat is warm.", exTa: "தொப்பி சூடாக உள்ளது.", pic: "🧢" },
      handschuhe: { de: "die Handschuhe", en: "gloves", ta: "கையுறைகள்", ex: "Ich brauche Handschuhe.", exEn: "I need gloves.", exTa: "எனக்கு கையுறைகள் வேண்டும்.", pic: "🧤" },
      glatt: { de: "glatt", en: "slippery, smooth", ta: "வழுக்கும்", ex: "Die Straße ist glatt.", exEn: "The street is slippery.", exTa: "தெரு வழுக்குகிறது.", pic: "🧊" },
    },
    culture: {
      tn: "Snow is almost unknown in the plains of Tamil Nadu, so a first snowfall is a big moment for many newcomers.",
      de: "In German winters many regions get snow. Neighbours often clear the pavement in front of their house.",
    },
    quiz: [
      { type: "choice", q: "Es ___ draußen.", options: ["schneit", "schneien", "schneist"], answer: "schneit", tipEn: "The verb schneien is used with “es”: es schneit.", tipTa: "“es” உடன்: es schneit." },
      { type: "choice", q: "Der Boden ist ___. (careful!)", options: ["glatt", "warm", "blau"], answer: "glatt", tipEn: "glatt = smooth, slippery.", tipTa: "glatt = வழுக்கும்." },
      { type: "order", q: "Build the sentence: “I need a warm jacket.”", tiles: ["Ich", "brauche", "eine", "warme", "Jacke", "brauchst"], end: ".", answer: "Ich brauche eine warme Jacke.", tipEn: "ich → brauche.", tipTa: "ich → brauche." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 24 (A2) */
  {
    slug: "puthandu-in-berlin",
    n: 24,
    landmarks: ["TN008", "DE017"],
    mood: "festival",
    title: "Puthandu in Berlin",
    sub: "A2 · Tamil New Year",
    speakers: { a: speaker("Thanisha"), x: speaker("Kaviarasan"), y: speaker("Sanjay") },
    lines: [
      { who: "x", parts: ["Thanisha, Mitte April feiern wir das tamilische Neujahr. Hast du Lust zu kommen?"], en: "Thanisha, in mid-April we celebrate the Tamil New Year. Would you like to come?", ta: "தனிஷா, ஏப்ரல் மத்தியில் நாங்கள் தமிழ்ப் புத்தாண்டு கொண்டாடுகிறோம். நீ வர விரும்புகிறாயா?" },
      { who: "a", parts: ["Ja, sehr gern! Was gibt es zu essen?"], en: "Yes, very gladly! What is there to eat?", ta: "ஆம், மிகவும் மகிழ்ச்சி! சாப்பிட என்ன இருக்கிறது?" },
      { who: "y", parts: ["Es gibt Mango-Pachadi. Das schmeckt süß, ", W("sauer", "sauer"), " und ", W("scharf", "scharf"), " zugleich."], en: "There is mango pachadi. It tastes sweet, sour and spicy at the same time.", ta: "மாங்காய் பச்சடி உண்டு. அது இனிப்பு, புளிப்பு, காரம் எல்லாம் சேர்ந்த சுவை." },
      { who: "a", parts: ["Das ist wie das Leben: süß, sauer und manchmal scharf."], en: "That is like life: sweet, sour and sometimes spicy.", ta: "அது வாழ்க்கையைப் போல: இனிப்பு, புளிப்பு, சில சமயம் காரம்." },
      { who: "x", parts: ["Genau! Und wir malen wieder ein großes Kolam vor die Tür."], en: "Exactly! And we will draw a big kolam in front of the door again.", ta: "சரியாகச் சொன்னாய்! நாங்கள் மீண்டும் வாசலில் பெரிய கோலம் போடுவோம்." },
      { who: "y", parts: ["Ich habe gestern schon die Mangos und das Mehl ", W("gekauft", "gekauft"), "."], en: "I have already bought the mangoes and the flour yesterday.", ta: "நான் நேற்றே மாம்பழங்களையும் மாவையும் வாங்கிவிட்டேன்." },
      { who: "a", parts: ["Ich bringe Blumen und Früchte mit."], en: "I'll bring flowers and fruit.", ta: "நான் பூக்களும் பழங்களும் கொண்டு வருகிறேன்." },
      { who: "x", parts: ["Wunderbar! Dann wird es ein schönes ", W("Neujahr", "neujahr"), "sfest."], en: "Wonderful! Then it will be a lovely New Year festival.", ta: "அருமை! அப்படியானால் அது ஒரு அழகான புத்தாண்டு விழாவாக இருக்கும்." },
    ],
    words: {
      sauer: { de: "sauer", en: "sour", ta: "புளிப்பான", ex: "Die Mango ist sauer.", exEn: "The mango is sour.", exTa: "மாங்காய் புளிப்பாக உள்ளது.", pic: "🍋" },
      scharf: { de: "scharf", en: "spicy, sharp", ta: "காரமான", ex: "Das Curry ist scharf.", exEn: "The curry is spicy.", exTa: "கறி காரமாக உள்ளது.", pic: "🌶️" },
      gekauft: { de: "gekauft", en: "bought", ta: "வாங்கிய", ex: "Ich habe Brot gekauft.", exEn: "I bought bread.", exTa: "நான் ரொட்டி வாங்கினேன்.", pic: "🛍️" },
      neujahr: { de: "das Neujahr", en: "New Year", ta: "புத்தாண்டு", ex: "Frohes Neujahr!", exEn: "Happy New Year!", exTa: "இனிய புத்தாண்டு!", pic: "🎊" },
    },
    culture: {
      tn: "Puthandu, the Tamil New Year, falls in mid-April. Mango pachadi mixes sweet, sour, bitter and spicy tastes to show that life has them all.",
      de: "Germans celebrate New Year on 1 January. The night before, Silvester, is full of fireworks, and some families melt tin and read the shapes (Bleigießen).",
    },
    quiz: [
      { type: "choice", q: "Ich habe gestern Mangos ___.", options: ["gekauft", "kaufen", "kauft"], answer: "gekauft", tipEn: "Perfekt: habe … gekauft.", tipTa: "Perfekt: habe … gekauft." },
      { type: "choice", q: "Das Curry ist sehr ___. (spicy)", options: ["scharf", "süß", "kalt"], answer: "scharf", tipEn: "scharf = spicy.", tipTa: "scharf = காரம்." },
      { type: "order", q: "Build the sentence: “We draw a kolam.”", tiles: ["Wir", "malen", "ein", "Kolam", "male"], end: ".", answer: "Wir malen ein Kolam.", tipEn: "wir → malen.", tipTa: "wir → malen." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 25 (A2) */
  {
    slug: "ein-brief-nach-hause",
    n: 25,
    landmarks: ["TN022", "DE024"],
    mood: "evening",
    title: "Ein Brief nach Hause",
    sub: "A2 · A letter to the grandparents",
    speakers: { a: speaker("Yogesh"), x: speaker("Yuvan"), y: speaker("Rithika") },
    lines: [
      { who: "x", parts: ["Yogesh, was machst du da? Du schreibst so viel."], en: "Yogesh, what are you doing there? You are writing so much.", ta: "யோகேஷ், அங்கே என்ன செய்கிறாய்? நிறைய எழுதுகிறாயே." },
      { who: "a", parts: ["Ich schreibe einen ", W("Brief", "brief"), " an meine ", W("Großeltern", "grosseltern"), " in Madurai."], en: "I am writing a letter to my grandparents in Madurai.", ta: "நான் மதுரையில் உள்ள என் தாத்தா பாட்டிக்கு ஒரு கடிதம் எழுதுகிறேன்." },
      { who: "y", parts: ["Einen echten Brief? Mit Papier und Briefmarke?"], en: "A real letter? With paper and a stamp?", ta: "உண்மையான கடிதமா? காகிதத்துடனும் தபால் தலையுடனும்?" },
      { who: "a", parts: ["Ja, sie haben kein Smartphone. Ein Brief macht ihnen eine große Freude."], en: "Yes, they have no smartphone. A letter makes them very happy.", ta: "ஆம், அவர்களிடம் ஸ்மார்ட்போன் இல்லை. கடிதம் அவர்களுக்கு மிகுந்த மகிழ்ச்சி தரும்." },
      { who: "x", parts: ["Was schreibst du ihnen?"], en: "What are you writing to them?", ta: "அவர்களுக்கு என்ன எழுதுகிறாய்?" },
      { who: "a", parts: ["Ich ", W("erzähle", "erzaehlen"), " ihnen von meiner Arbeit, vom Schnee und von meinen Freunden."], en: "I tell them about my work, the snow and my friends.", ta: "நான் என் வேலை, பனி, நண்பர்கள் பற்றி அவர்களிடம் சொல்கிறேன்." },
      { who: "y", parts: ["Bestimmt freuen sie sich! Soll ich dir Briefmarken schenken?"], en: "They will surely be happy! Shall I give you some stamps?", ta: "நிச்சயம் மகிழ்வார்கள்! நான் உனக்கு தபால் தலைகள் தரட்டுமா?" },
      { who: "x", parts: ["Und schick bitte ein ", W("Foto", "foto"), " mit! Dann sehen sie, wie du jetzt lebst."], en: "And please send a photo too! Then they can see how you live now.", ta: "ஒரு புகைப்படமும் அனுப்பு! நீ இப்போது எப்படி வாழ்கிறாய் என்று அவர்கள் பார்ப்பார்கள்." },
    ],
    words: {
      brief: { de: "der Brief", en: "letter", ta: "கடிதம்", ex: "Ich schreibe einen Brief.", exEn: "I write a letter.", exTa: "நான் ஒரு கடிதம் எழுதுகிறேன்.", pic: "✉️" },
      grosseltern: { de: "die Großeltern", en: "grandparents", ta: "தாத்தா பாட்டி", ex: "Meine Großeltern wohnen in Madurai.", exEn: "My grandparents live in Madurai.", exTa: "என் தாத்தா பாட்டி மதுரையில் வசிக்கிறார்கள்.", pic: "👵" },
      erzaehlen: { de: "erzählen", en: "to tell, to narrate", ta: "சொல்", ex: "Ich erzähle eine Geschichte.", exEn: "I tell a story.", exTa: "நான் ஒரு கதை சொல்கிறேன்.", pic: "🗣️" },
      foto: { de: "das Foto", en: "photo", ta: "புகைப்படம்", ex: "Das Foto ist schön.", exEn: "The photo is nice.", exTa: "புகைப்படம் அழகாக உள்ளது.", pic: "📷" },
    },
    culture: {
      tn: "Tamil families keep in touch by phone and messages, but a handwritten letter or photo is treasured by grandparents.",
      de: "In Germany a handwritten letter or postcard is a special gift. Stamps are sold at the post office and in many shops.",
    },
    quiz: [
      { type: "choice", q: "Ich schreibe an ___ Großeltern.", options: ["meine", "meinen", "meiner"], answer: "meine", tipEn: "After “an” here (writing to someone) the Akkusativ is used: plural → meine.", tipTa: "இங்கே “an” க்குப் பிறகு Akkusativ: பன்மை → meine." },
      { type: "choice", q: "Ein Brief macht ___ eine Freude. (them)", options: ["ihnen", "sie", "ihr"], answer: "ihnen", tipEn: "Freude machen takes the Dativ: ihnen.", tipTa: "Freude machen உடன் Dativ: ihnen." },
      { type: "order", q: "Build the sentence: “I tell them about my work.”", tiles: ["Ich", "erzähle", "ihnen", "von", "meiner", "Arbeit", "erzählst"], end: ".", answer: "Ich erzähle ihnen von meiner Arbeit.", tipEn: "erzählen + Dativ (ihnen) + von + Dativ.", tipTa: "erzählen + Dativ (ihnen) + von + Dativ." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 26 (A2) */
  {
    slug: "die-fahrradtour",
    n: 26,
    landmarks: ["TN013", "DE018"],
    mood: "breeze",
    title: "Die Fahrradtour",
    sub: "A2 · A Sunday ride",
    speakers: { a: speaker("Sadhana"), x: speaker("Adhi"), y: speaker("Ram") },
    lines: [
      { who: "x", parts: ["Am Sonntag machen wir eine ", W("Fahrradtour", "fahrradtour"), ". Kommst du mit, Sadhana?"], en: "On Sunday we are going on a bike tour. Are you coming, Sadhana?", ta: "ஞாயிற்றுக்கிழமை நாங்கள் சைக்கிள் பயணம் போகிறோம். நீயும் வருகிறாயா, சாதனா?" },
      { who: "a", parts: ["Gern, aber ich habe kein Fahrrad."], en: "Gladly, but I don't have a bike.", ta: "மகிழ்ச்சி, ஆனால் என்னிடம் சைக்கிள் இல்லை." },
      { who: "y", parts: ["Du kannst mein altes Fahrrad ", W("leihen", "leihen"), "."], en: "You can borrow my old bike.", ta: "நீ என் பழைய சைக்கிளை இரவல் வாங்கலாம்." },
      { who: "a", parts: ["Danke! Ist die ", W("Strecke", "strecke"), " weit?"], en: "Thanks! Is the route far?", ta: "நன்றி! தூரம் அதிகமா?" },
      { who: "x", parts: ["Nicht sehr: fünfzehn Kilometer am Fluss entlang. Der Weg ist flach und schön."], en: "Not very: fifteen kilometres along the river. The path is flat and beautiful.", ta: "அதிகமில்லை: ஆற்றோரமாக பதினைந்து கிலோமீட்டர். பாதை சமதளமாகவும் அழகாகவும் உள்ளது." },
      { who: "a", parts: ["Das klingt besser als ein Tag im Bett."], en: "That sounds better than a day in bed.", ta: "படுக்கையில் ஒரு நாளை விட அது நன்றாக இருக்கிறது." },
      { who: "y", parts: ["Vergiss nicht den ", W("Helm", "helm"), " und eine Flasche Wasser!"], en: "Don't forget the helmet and a bottle of water!", ta: "தலைக்கவசத்தையும் ஒரு பாட்டில் தண்ணீரையும் மறக்காதே!" },
      { who: "x", parts: ["Und wenn wir müde sind, machen wir ein ", W("Picknick", "picknick"), "."], en: "And when we are tired, we have a picnic.", ta: "களைப்பாக இருந்தால் நாம் வெளியில் உணவருந்துவோம்." },
    ],
    words: {
      fahrradtour: { de: "die Fahrradtour", en: "bike tour", ta: "சைக்கிள் பயணம்", ex: "Wir machen eine Fahrradtour.", exEn: "We go on a bike tour.", exTa: "நாங்கள் சைக்கிள் பயணம் போகிறோம்.", pic: "🚴" },
      leihen: { de: "leihen", en: "to borrow, to lend", ta: "இரவல் வாங்கு / கொடு", ex: "Kann ich dein Buch leihen?", exEn: "Can I borrow your book?", exTa: "உன் புத்தகத்தை இரவல் வாங்கலாமா?", pic: "🤲" },
      strecke: { de: "die Strecke", en: "route, distance", ta: "பாதை, தூரம்", ex: "Die Strecke ist kurz.", exEn: "The route is short.", exTa: "பாதை குறுகியது.", pic: "🛣️" },
      helm: { de: "der Helm", en: "helmet", ta: "தலைக்கவசம்", ex: "Ich trage einen Helm.", exEn: "I wear a helmet.", exTa: "நான் தலைக்கவசம் அணிகிறேன்.", pic: "⛑️" },
      picknick: { de: "das Picknick", en: "picnic", ta: "வெளியில் உணவு", ex: "Wir machen ein Picknick.", exEn: "We have a picnic.", exTa: "நாங்கள் வெளியில் உணவருந்துகிறோம்.", pic: "🧺" },
    },
    culture: {
      tn: "In Tamil Nadu cycling is common for school children and in villages, while motorbikes dominate in big cities.",
      de: "Germany has many cycle paths with their own lanes and traffic lights. Wearing a helmet is recommended.",
    },
    quiz: [
      { type: "choice", q: "Du kannst mein Fahrrad ___.", options: ["leihen", "leiht", "geliehen"], answer: "leihen", tipEn: "After a modal verb the infinitive stands at the end.", tipTa: "modal வினைக்குப் பிறகு வினை கடைசியில்." },
      { type: "choice", q: "Das klingt ___ als ein Tag im Bett.", options: ["besser", "gut", "am besten"], answer: "besser", tipEn: "The comparative of gut is besser.", tipTa: "gut இன் ஒப்பீடு besser." },
      { type: "order", q: "Build the sentence: “We have a picnic.”", tiles: ["Wir", "machen", "ein", "Picknick", "mache"], end: ".", answer: "Wir machen ein Picknick.", tipEn: "wir → machen.", tipTa: "wir → machen." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 27 (A2) */
  {
    slug: "biryani-fuer-die-nachbarn",
    n: 27,
    landmarks: ["TN024", "DE004"],
    mood: "steam",
    title: "Biryani für die Nachbarn",
    sub: "A2 · Cook for the neighbours",
    speakers: { a: speaker("Kavitha"), x: speaker("Poovai"), y: speaker("Sudha") },
    lines: [
      { who: "x", parts: ["Hier riecht es so gut! Was kochst du, Kavitha?"], en: "It smells so good here! What are you cooking, Kavitha?", ta: "இங்கே எவ்வளவு நல்ல வாசனை! என்ன சமைக்கிறாய், கவிதா?" },
      { who: "a", parts: ["Ich koche Biryani für alle Nachbarn im Haus."], en: "I am cooking biryani for all the neighbours in the building.", ta: "நான் வீட்டில் உள்ள எல்லா அண்டை வீட்டாருக்கும் பிரியாணி சமைக்கிறேன்." },
      { who: "y", parts: ["Das ist das Gericht, das ich schon lange probieren möchte."], en: "That is the dish that I have wanted to try for a long time.", ta: "நான் நீண்ட நாளாக சுவைத்துப் பார்க்க விரும்பிய உணவு அதுதான்." },
      { who: "a", parts: ["Der Reis ", W("wird", "wird"), " mit ", W("Gewürzen", "gewuerze"), " und Gemüse gekocht."], en: "The rice is cooked with spices and vegetables.", ta: "சாதம் மசாலாக்களுடனும் காய்கறிகளுடனும் சமைக்கப்படுகிறது." },
      { who: "x", parts: ["Sind die Gewürze scharf? Ich esse nicht so scharf."], en: "Are the spices hot? I don't eat very spicy food.", ta: "மசாலா காரமா? நான் அவ்வளவு காரம் சாப்பிடுவதில்லை." },
      { who: "a", parts: ["Keine Sorge, ich mache auch Raita mit Joghurt. Das kühlt."], en: "Don't worry, I'm also making raita with yoghurt. That cools it down.", ta: "கவலைப்படாதே, தயிர் பச்சடியும் செய்கிறேன். அது குளிர்ச்சி தரும்." },
      { who: "y", parts: ["Dann bringe ich Teller und ", W("Besteck", "besteck"), " mit."], en: "Then I'll bring plates and cutlery.", ta: "அப்படியானால் நான் தட்டுகளும் கத்தி முள்கரண்டியும் கொண்டு வருகிறேன்." },
      { who: "x", parts: ["Und ich ", W("decke", "decken"), " den Tisch im Hof."], en: "And I'll lay the table in the courtyard.", ta: "நான் முற்றத்தில் மேசையை ஏற்பாடு செய்கிறேன்." },
    ],
    words: {
      wird: { de: "wird … gekocht", en: "is cooked (passive)", ta: "சமைக்கப்படுகிறது", ex: "Das Essen wird gekocht.", exEn: "The food is being cooked.", exTa: "உணவு சமைக்கப்படுகிறது.", pic: "🍲" },
      gewuerze: { de: "die Gewürze", en: "spices", ta: "மசாலாக்கள்", ex: "Ich brauche Gewürze.", exEn: "I need spices.", exTa: "எனக்கு மசாலாக்கள் வேண்டும்.", pic: "🫚" },
      besteck: { de: "das Besteck", en: "cutlery", ta: "கத்தி முள்கரண்டி கரண்டி", ex: "Das Besteck liegt auf dem Tisch.", exEn: "The cutlery is on the table.", exTa: "கத்தி முள்கரண்டி மேசையில் உள்ளது.", pic: "🍴" },
      decken: { de: "den Tisch decken", en: "to lay the table", ta: "மேசையை ஏற்பாடு செய்", ex: "Ich decke den Tisch.", exEn: "I lay the table.", exTa: "நான் மேசையை ஏற்பாடு செய்கிறேன்.", pic: "🍽️" },
    },
    culture: {
      tn: "In Tamil homes a guest is rarely sent away without food. Sharing a dish with the neighbours is a way to say welcome.",
      de: "In many German buildings neighbours hardly know each other, so a plate of food is a great way to start talking.",
    },
    quiz: [
      { type: "choice", q: "Das ist das Gericht, ___ ich mag.", options: ["das", "der", "die"], answer: "das", tipEn: "The relative pronoun matches das Gericht: das.", tipTa: "das Gericht உடன் பொருந்தும்: das." },
      { type: "choice", q: "Der Reis ___ gekocht.", options: ["wird", "werden", "wurde"], answer: "wird", tipEn: "Passive present: wird + Partizip II.", tipTa: "செயப்பாட்டு நிகழ்காலம்: wird + Partizip II." },
      { type: "order", q: "Build the sentence: “I cook for all the neighbours.”", tiles: ["Ich", "koche", "für", "alle", "Nachbarn", "kochst"], end: ".", answer: "Ich koche für alle Nachbarn.", tipEn: "für + Akkusativ.", tipTa: "für + Akkusativ." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 28 (A2) */
  {
    slug: "ein-notfall",
    n: 28,
    landmarks: ["TN010", "DE002"],
    mood: "rain",
    title: "Ein Notfall",
    sub: "A2 · Call for help",
    speakers: { a: speaker("Sudharsan"), x: speaker("Dhinesh"), y: speaker("Ram", "emergency call handler") },
    lines: [
      { who: "a", parts: ["Hilfe! Mein Nachbar ist ", W("gestürzt", "gestuerzt"), " und liegt auf dem Boden!"], en: "Help! My neighbour has fallen and is lying on the floor!", ta: "உதவி! என் அண்டை வீட்டுக்காரர் கீழே விழுந்து தரையில் கிடக்கிறார்!" },
      { who: "x", parts: ["Bleib ruhig, Sudharsan. Rufst du den ", W("Notruf", "notruf"), " an? Die Nummer ist die 112."], en: "Stay calm, Sudharsan. Will you call the emergency services? The number is 112.", ta: "அமைதியாக இரு, சுதர்சன். அவசர உதவிக்கு அழைக்கிறாயா? எண் 112." },
      { who: "a", parts: ["Ja, ich rufe sofort an. Was muss ich sagen?"], en: "Yes, I'll call right away. What do I have to say?", ta: "ஆம், உடனே அழைக்கிறேன். நான் என்ன சொல்ல வேண்டும்?" },
      { who: "x", parts: ["Sag deinen Namen, die Adresse und was passiert ist."], en: "Say your name, the address and what has happened.", ta: "உன் பெயர், முகவரி, என்ன நடந்தது என்பதைச் சொல்." },
      { who: "y", parts: ["Notruf, wie kann ich helfen? Was ist passiert?"], en: "Emergency services, how can I help? What has happened?", ta: "அவசர உதவி, நான் எப்படி உதவலாம்? என்ன நடந்தது?" },
      { who: "a", parts: ["Mein Nachbar ist gestürzt und antwortet nicht. Wir sind in der Lindenstraße zehn."], en: "My neighbour has fallen and does not answer. We are at Lindenstraße ten.", ta: "என் அண்டை வீட்டுக்காரர் விழுந்துவிட்டார், பதில் சொல்லவில்லை. நாங்கள் லிண்டன்ஸ்ட்ராஸ் பத்தில் இருக்கிறோம்." },
      { who: "y", parts: ["Bleiben Sie bei ihm. Der ", W("Krankenwagen", "krankenwagen"), " ist in fünf Minuten da."], en: "Stay with him. The ambulance will be there in five minutes.", ta: "அவருடனேயே இருங்கள். ஆம்புலன்ஸ் ஐந்து நிமிடத்தில் வரும்." },
      { who: "x", parts: ["Gut gemacht! Ich hole eine ", W("Decke", "decke"), "."], en: "Well done! I'll fetch a blanket.", ta: "நன்றாகச் செய்தாய்! நான் ஒரு போர்வை எடுத்து வருகிறேன்." },
    ],
    words: {
      gestuerzt: { de: "gestürzt", en: "fallen", ta: "கீழே விழுந்த", ex: "Er ist gestürzt.", exEn: "He has fallen.", exTa: "அவர் விழுந்துவிட்டார்.", pic: "🆘" },
      notruf: { de: "der Notruf", en: "emergency call", ta: "அவசர அழைப்பு", ex: "Ich wähle den Notruf.", exEn: "I dial the emergency number.", exTa: "நான் அவசர எண்ணை அழைக்கிறேன்.", pic: "📞" },
      krankenwagen: { de: "der Krankenwagen", en: "ambulance", ta: "ஆம்புலன்ஸ்", ex: "Der Krankenwagen kommt.", exEn: "The ambulance is coming.", exTa: "ஆம்புலன்ஸ் வருகிறது.", pic: "🚑" },
      decke: { de: "die Decke", en: "blanket", ta: "போர்வை", ex: "Ich hole eine Decke.", exEn: "I fetch a blanket.", exTa: "நான் ஒரு போர்வை எடுத்து வருகிறேன்.", pic: "🛏️" },
    },
    culture: {
      tn: "In Tamil Nadu the free ambulance service uses the number 108.",
      de: "In Germany and across the EU, 112 is the emergency number for ambulance and fire service. The police are reached on 110.",
    },
    quiz: [
      { type: "choice", q: "Die Notrufnummer für den Krankenwagen ist die ___.", options: ["112", "100", "911"], answer: "112", tipEn: "112 is the European emergency number.", tipTa: "112 என்பது ஐரோப்பிய அவசர எண்." },
      { type: "choice", q: "Bei einem Notruf sagt man den Namen, die Adresse und ___.", options: ["was passiert ist", "was man isst", "wie alt man ist"], answer: "was passiert ist", tipEn: "Say what has happened.", tipTa: "என்ன நடந்தது என்று சொல்லுங்கள்." },
      { type: "order", q: "Build the sentence: “The ambulance is coming right away.”", tiles: ["Der", "Krankenwagen", "kommt", "gleich", "kommen"], end: ".", answer: "Der Krankenwagen kommt gleich.", tipEn: "Krankenwagen = er → kommt.", tipTa: "Krankenwagen = er → kommt." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 29 (A2) */
  {
    slug: "umzug-nach-hamburg",
    n: 29,
    landmarks: ["TN015", "DE008"],
    mood: "balloons",
    title: "Umzug nach Hamburg",
    sub: "A2 · Moving to a new city",
    speakers: { a: speaker("Risha"), x: speaker("Arvind"), y: speaker("Mrithula") },
    lines: [
      { who: "x", parts: ["Risha, stimmt es? Du ", W("ziehst", "umziehen"), " nach Hamburg um?"], en: "Risha, is it true? You are moving to Hamburg?", ta: "ரிஷா, உண்மையா? நீ ஹாம்பர்க்குக்கு குடிபெயர்கிறாயா?" },
      { who: "a", parts: ["Ja! Ich habe dort eine neue Arbeit gefunden."], en: "Yes! I have found a new job there.", ta: "ஆம்! அங்கே எனக்கு புதிய வேலை கிடைத்தது." },
      { who: "y", parts: ["Ich ", W("gratuliere", "gratulieren"), "! Wann ist der Umzug?"], en: "Congratulations! When is the move?", ta: "வாழ்த்துகள்! வீடு மாறுவது எப்போது?" },
      { who: "a", parts: ["Am ersten Samstag im Monat. Wenn ihr Zeit habt, könnt ihr mir helfen."], en: "On the first Saturday of the month. If you have time, you can help me.", ta: "மாதத்தின் முதல் சனிக்கிழமை. உங்களுக்கு நேரம் இருந்தால் எனக்கு உதவலாம்." },
      { who: "x", parts: ["Natürlich helfen wir. Wir packen die ", W("Kartons", "karton"), " zusammen."], en: "Of course we'll help. We'll pack the boxes together.", ta: "நிச்சயமாக உதவுவோம். நாம் ஒன்றாக பெட்டிகளை அடுக்குவோம்." },
      { who: "y", parts: ["Hast du schon einen ", W("Transporter", "transporter"), " gemietet?"], en: "Have you already rented a van?", ta: "நீ ஏற்கனவே ஒரு சரக்கு வாகனம் வாடகைக்கு எடுத்தாயா?" },
      { who: "a", parts: ["Ja, ich habe ihn für den Vormittag gemietet."], en: "Yes, I have rented it for the morning.", ta: "ஆம், காலை நேரத்துக்கு வாடகைக்கு எடுத்துள்ளேன்." },
      { who: "x", parts: ["Dann ist alles gut organisiert. Wir besuchen dich bald in Hamburg!"], en: "Then everything is well organised. We'll visit you soon in Hamburg!", ta: "அப்படியானால் எல்லாம் நன்றாக ஏற்பாடாகிவிட்டது. நாங்கள் விரைவில் ஹாம்பர்க்கில் உன்னைப் பார்க்க வருவோம்!" },
    ],
    words: {
      umziehen: { de: "umziehen", en: "to move house", ta: "வீடு மாறு", ex: "Wir ziehen nach Bonn um.", exEn: "We are moving to Bonn.", exTa: "நாங்கள் பான் நகருக்கு குடிபெயர்கிறோம்.", pic: "🚚" },
      gratulieren: { de: "gratulieren", en: "to congratulate", ta: "வாழ்த்து", ex: "Ich gratuliere dir!", exEn: "Congratulations to you!", exTa: "உனக்கு வாழ்த்துகள்!", pic: "🎉" },
      karton: { de: "der Karton", en: "cardboard box", ta: "அட்டைப் பெட்டி", ex: "Der Karton ist schwer.", exEn: "The box is heavy.", exTa: "அட்டைப் பெட்டி கனமாக உள்ளது.", pic: "📦" },
      transporter: { de: "der Transporter", en: "van", ta: "சரக்கு வாகனம்", ex: "Der Transporter ist groß.", exEn: "The van is big.", exTa: "சரக்கு வாகனம் பெரியது.", pic: "🚐" },
    },
    culture: {
      tn: "In Tamil Nadu a move is often planned for an auspicious day, and many families boil milk at the new home to bring good luck.",
      de: "In Germany friends often help with a move and are thanked with pizza and drinks. Vans are rented by the hour or the day.",
    },
    quiz: [
      { type: "choice", q: "Wenn ihr Zeit ___, könnt ihr helfen.", options: ["habt", "hast", "hat"], answer: "habt", tipEn: "In a wenn-clause the verb goes to the end: ihr habt.", tipTa: "wenn உட்பிரிவில் வினை கடைசியில்: ihr habt." },
      { type: "choice", q: "Ich habe einen Transporter ___.", options: ["gemietet", "mieten", "miete"], answer: "gemietet", tipEn: "Perfekt: habe … gemietet.", tipTa: "Perfekt: habe … gemietet." },
      { type: "order", q: "Build the sentence: “We pack the boxes.”", tiles: ["Wir", "packen", "die", "Kartons", "packe"], end: ".", answer: "Wir packen die Kartons.", tipEn: "wir → packen.", tipTa: "wir → packen." },
    ],
    pass: 2,
  },

  /* ------------------------------------------------------------------ 30 (A2) */
  {
    slug: "pruefung-bestanden",
    n: 30,
    landmarks: ["TN001", "DE005"],
    mood: "fireworks",
    title: "Prüfung bestanden!",
    sub: "A2 · The result",
    speakers: { a: speaker("Ruby"), x: speaker("Akshay"), y: speaker("Medwin") },
    lines: [
      { who: "x", parts: ["Ruby, die ", W("Ergebnisse", "ergebnis"), " sind da! Hast du schon nachgeschaut?"], en: "Ruby, the results are here! Have you looked yet?", ta: "ரூபி, முடிவுகள் வந்துவிட்டன! நீ பார்த்துவிட்டாயா?" },
      { who: "a", parts: ["Nein, ich habe Angst. Schaust du mit mir zusammen?"], en: "No, I am scared. Will you look together with me?", ta: "இல்லை, எனக்கு பயமாக இருக்கிறது. என்னுடன் சேர்ந்து பார்க்கிறாயா?" },
      { who: "y", parts: ["Natürlich. Los, öffne die E-Mail!"], en: "Of course. Come on, open the email!", ta: "நிச்சயமாக. சரி, மின்னஞ்சலைத் திற!" },
      { who: "a", parts: ["Ich habe ", W("bestanden", "bestehen"), "! Ich habe vierundachtzig ", W("Punkte", "punkte"), "!"], en: "I passed! I got eighty-four points!", ta: "நான் தேறிவிட்டேன்! எனக்கு எண்பத்து நான்கு புள்ளிகள் கிடைத்தன!" },
      { who: "x", parts: ["Herzlichen ", W("Glückwunsch", "glueckwunsch"), "! Das ist super!"], en: "Congratulations! That is great!", ta: "மனமார்ந்த வாழ்த்துகள்! அது அருமை!" },
      { who: "y", parts: ["Heute feiern wir! Ich lade euch alle zum Essen ein."], en: "Today we celebrate! I invite you all to dinner.", ta: "இன்று நாம் கொண்டாடுவோம்! நான் உங்கள் எல்லோரையும் உணவுக்கு அழைக்கிறேன்." },
      { who: "a", parts: ["Danke euch beiden. Ohne euch hätte ich es nicht geschafft."], en: "Thank you both. Without you I would not have managed it.", ta: "உங்கள் இருவருக்கும் நன்றி. நீங்கள் இல்லாமல் என்னால் முடிந்திருக்காது." },
      { who: "x", parts: ["Wir lernen weiter. Das nächste ", W("Ziel", "ziel"), " ist B1!"], en: "We keep learning. The next goal is B1!", ta: "நாம் தொடர்ந்து கற்போம். அடுத்த இலக்கு B1!" },
    ],
    words: {
      ergebnis: { de: "das Ergebnis", en: "result", ta: "முடிவு", ex: "Das Ergebnis ist gut.", exEn: "The result is good.", exTa: "முடிவு நன்றாக உள்ளது.", pic: "📊" },
      bestehen: { de: "bestanden", en: "passed", ta: "தேறிய", ex: "Ich habe die Prüfung bestanden.", exEn: "I passed the exam.", exTa: "நான் தேர்வில் தேறினேன்.", pic: "✅" },
      punkte: { de: "die Punkte", en: "points", ta: "புள்ளிகள்", ex: "Ich habe viele Punkte.", exEn: "I have many points.", exTa: "எனக்கு நிறைய புள்ளிகள்.", pic: "🔢" },
      glueckwunsch: { de: "der Glückwunsch", en: "congratulations", ta: "வாழ்த்து", ex: "Herzlichen Glückwunsch!", exEn: "Congratulations!", exTa: "மனமார்ந்த வாழ்த்துகள்!", pic: "🥳" },
      ziel: { de: "das Ziel", en: "goal", ta: "இலக்கு", ex: "Mein Ziel ist B1.", exEn: "My goal is B1.", exTa: "என் இலக்கு B1.", pic: "🎯" },
    },
    culture: {
      tn: "When someone passes an important exam, many Tamil families share sweets to celebrate.",
      de: "In Germany results usually come by email or letter. The Goethe certificate itself does not expire, but some offices ask for a recent one.",
    },
    quiz: [
      { type: "choice", q: "Ich habe die Prüfung ___.", options: ["bestanden", "bestehen", "besteht"], answer: "bestanden", tipEn: "Perfekt: habe … bestanden.", tipTa: "Perfekt: habe … bestanden." },
      { type: "choice", q: "Herzlichen ___!", options: ["Glückwunsch", "Entschuldigung", "Appetit"], answer: "Glückwunsch", tipEn: "We say Herzlichen Glückwunsch to congratulate.", tipTa: "வாழ்த்த: Herzlichen Glückwunsch." },
      { type: "order", q: "Build the sentence: “The next goal is B1.”", tiles: ["Das", "nächste", "Ziel", "ist", "B1", "sind"], end: ".", answer: "Das nächste Ziel ist B1.", tipEn: "das Ziel = es → ist.", tipTa: "das Ziel = es → ist." },
    ],
    pass: 2,
  },
];

// Chapters on the path that are planned but not written yet.
export const upcoming = [{ title: "B1 stories", sub: "Coming later" }];

export const chapterBySlug = (slug: string) => chapters.find((c) => c.slug === slug);
export const doneKey = (slug: string) => `chapter-${slug}`;

/** Marks a chapter check. Used by the server action, so the browser cannot fake a pass. */
export function markChapter(chapter: Chapter, answers: string[]) {
  const norm = (s: string) => s.trim().toLowerCase();
  const correct = chapter.quiz.filter((q, i) => norm(answers[i] ?? "") === norm(q.answer)).length;
  return { score: correct, total: chapter.quiz.length, passed: correct >= chapter.pass };
}
