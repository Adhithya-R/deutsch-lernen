import { role, speaker } from "./people.ts";
import type { Mood } from "../lib/landmarks.ts";

// Story chapters: Adhi moves from Madurai to Germany and learns German with his classmates.
// Each chapter is a short scene, a few tappable words, a culture note, and a check that must be
// passed to unlock the next chapter. Every character is one of the 21 classmates (see people.ts)
// or an unnamed role. Speaker code "a" is always Adhi.

export type Word = { de: string; en: string; ta: string; ex: string; exEn: string; exTa: string; pic?: string };
export type Part = string | { t: string; k: string }; // plain text, or a tappable word (k = key in `words`)
export type Line = { who: string; parts: Part[]; en: string; ta: string };
export type Speaker = { name: string; initial: string; gender: "m" | "f" };

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
const ADHI = speaker("Adhi");

export const chapters: Chapter[] = [
  /* ------------------------------------------------------------------ 1 */
  {
    slug: "ankunft",
    n: 1,
    landmarks: ["TN002", "DE010"], // Meenakshi Temple, Römer in Frankfurt
    mood: "dawn",
    title: "Ankunft",
    sub: "Arrival in Frankfurt",
    speakers: { a: ADHI, b: role("Der Beamte", "B", "m"), p: speaker("Poovai"), k: speaker("Akshay") },
    lines: [
      { who: "b", parts: ["Guten Tag! Ihren ", W("Pass", "pass"), ", ", W("bitte", "bitte"), "."], en: "Good day! Your passport, please.", ta: "வணக்கம்! உங்கள் கடவுச்சீட்டு, தயவுசெய்து." },
      { who: "a", parts: ["Guten Tag. Hier ist mein ", W("Pass", "pass"), "."], en: "Good day. Here is my passport.", ta: "வணக்கம். இதோ என் கடவுச்சீட்டு." },
      { who: "b", parts: ["Danke. ", W("Woher", "woher"), " kommen Sie?"], en: "Thank you. Where do you come from?", ta: "நன்றி. நீங்கள் எங்கிருந்து வருகிறீர்கள்?" },
      { who: "a", parts: ["Ich komme aus Indien, aus Madurai."], en: "I come from India, from Madurai.", ta: "நான் இந்தியாவிலிருந்து, மதுரையிலிருந்து வருகிறேன்." },
      { who: "b", parts: [W("Willkommen", "willkommen"), " in Deutschland!"], en: "Welcome to Germany!", ta: "ஜெர்மனிக்கு நல்வரவு!" },
      { who: "p", parts: ["Hallo Adhi! Hier sind wir!"], en: "Hello Adhi! We are over here!", ta: "வணக்கம் ஆதி! இதோ நாங்கள் இங்கே!" },
      { who: "k", parts: ["Willkommen, Adhi! Wie war der Flug?"], en: "Welcome, Adhi! How was the flight?", ta: "நல்வரவு ஆதி! விமானப் பயணம் எப்படி இருந்தது?" },
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
    speakers: { a: ADHI, l: role("Die Lehrerin", "L", "f"), t: speaker("Thanisha"), m: speaker("Mrithula"), s: speaker("Sudharsan"), r: speaker("Ruby") },
    lines: [
      { who: "l", parts: ["Guten Morgen! Willkommen im Deutschkurs. Wie ", W("heißt", "heissen"), " du?"], en: "Good morning! Welcome to the German course. What is your name?", ta: "காலை வணக்கம்! ஜெர்மன் வகுப்புக்கு நல்வரவு. உன் பெயர் என்ன?" },
      { who: "a", parts: ["Ich ", W("heiße", "heissen"), " Adhi. Ich ", W("komme aus", "kommen"), " Madurai."], en: "My name is Adhi. I come from Madurai.", ta: "என் பெயர் ஆதி. நான் மதுரையிலிருந்து வருகிறேன்." },
      { who: "t", parts: ["Hallo Adhi! Ich heiße Thanisha. Ich komme aus Chennai."], en: "Hello Adhi! My name is Thanisha. I come from Chennai.", ta: "வணக்கம் ஆதி! என் பெயர் தனிஷா. நான் சென்னையிலிருந்து வருகிறேன்." },
      { who: "m", parts: ["Hallo! Ich bin Mrithula. Ich ", W("wohne", "wohnen"), " in Berlin."], en: "Hello! I am Mrithula. I live in Berlin.", ta: "வணக்கம்! நான் ம்ருதுலா. நான் பெர்லினில் வசிக்கிறேன்." },
      { who: "s", parts: ["Ich heiße Sudharsan. Und das ist Ruby. Wir kommen aus Coimbatore."], en: "My name is Sudharsan. And this is Ruby. We come from Coimbatore.", ta: "என் பெயர் சுதர்சன். இது ரூபி. நாங்கள் கோயம்புத்தூரிலிருந்து வருகிறோம்." },
      { who: "r", parts: ["Hallo Adhi! ", W("Wo", "wo"), " liegt Madurai?"], en: "Hello Adhi! Where is Madurai?", ta: "வணக்கம் ஆதி! மதுரை எங்கே இருக்கிறது?" },
      { who: "a", parts: ["In Indien, in Tamil Nadu. Dort gibt es einen großen ", W("Tempel", "tempel"), "."], en: "In India, in Tamil Nadu. There is a big temple there.", ta: "இந்தியாவில், தமிழ்நாட்டில். அங்கே ஒரு பெரிய கோயில் இருக்கிறது." },
      { who: "l", parts: ["Sehr gut! Jetzt arbeiten wir zusammen."], en: "Very good! Now we work together.", ta: "மிகவும் நல்லது! இப்போது நாம் சேர்ந்து வேலை செய்வோம்." },
    ],
    words: {
      heissen: { de: "heißen", en: "to be called", ta: "பெயர் கொண்டிரு", ex: "Ich heiße Adhi.", exEn: "My name is Adhi.", exTa: "என் பெயர் ஆதி.", pic: "🏷️" },
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
      { type: "choice", q: "Which sentence means “My name is Adhi”?", options: ["Ich heiße Adhi.", "Ich bin heißen Adhi.", "Ich Adhi heiße."], answer: "Ich heiße Adhi.", tipEn: "The verb is in position 2: Ich + heiße.", tipTa: "வினைச்சொல் 2-ஆம் இடத்தில்: Ich + heiße." },
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
    speakers: { a: ADHI, v: role("Der Vermieter", "V", "m"), r: speaker("Ram"), d: speaker("Dhinesh"), s: speaker("Sudha") },
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
    speakers: { a: ADHI, m: role("Der Verkäufer", "V", "m"), r: speaker("Risha"), s: speaker("Sadhana") },
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
    speakers: { a: ADHI, n: speaker("Nethra"), s: speaker("Sanjay"), k: speaker("Kavitha"), v: speaker("Arvind") },
    lines: [
      { who: "a", parts: ["Hallo zusammen! Am Sonntag ", W("feiere", "feiern"), " ich Pongal. Das ist ein Erntefest in Indien."], en: "Hello everyone! On Sunday I'm celebrating Pongal. It is a harvest festival in India.", ta: "அனைவருக்கும் வணக்கம்! ஞாயிற்றுக்கிழமை நான் பொங்கல் கொண்டாடுகிறேன். அது இந்தியாவின் அறுவடைத் திருவிழா." },
      { who: "n", parts: ["Wie schön! Was macht man bei Pongal?"], en: "How lovely! What do people do at Pongal?", ta: "எவ்வளவு அழகு! பொங்கலில் என்ன செய்வார்கள்?" },
      { who: "a", parts: ["Wir kochen süßen Reis in einem ", W("Topf", "topf"), ". Der Reis ", W("kocht über", "ueberkochen"), " und wir rufen: Pongalo Pongal!"], en: "We cook sweet rice in a pot. The rice boils over and we shout: Pongalo Pongal!", ta: "நாங்கள் ஒரு பானையில் இனிப்புச் சாதம் சமைப்போம். சாதம் பொங்கி வழிந்ததும் “பொங்கலோ பொங்கல்!” என்று கூவுவோம்." },
      { who: "s", parts: ["Das klingt super! ", W("Um wie viel Uhr", "uhr"), " beginnt es?"], en: "That sounds great! What time does it start?", ta: "அருமையாக இருக்கிறது! எத்தனை மணிக்குத் தொடங்கும்?" },
      { who: "a", parts: ["Um zehn Uhr. Kommt bitte ", W("pünktlich", "puenktlich"), "!"], en: "At ten o'clock. Please come on time!", ta: "பத்து மணிக்கு. தயவுசெய்து சரியான நேரத்தில் வாருங்கள்!" },
      { who: "k", parts: ["Gerne! Ich ", W("bringe", "mitbringen"), " Kuchen ", W("mit", "mitbringen"), "."], en: "Gladly! I'll bring cake.", ta: "மகிழ்ச்சியுடன்! நான் கேக் கொண்டு வருகிறேன்." },
      { who: "v", parts: ["Und Shylash, Yuvan, Medwin und Kavi bringen das Essen mit."], en: "And Shylash, Yuvan, Medwin and Kavi bring the food.", ta: "ஷைலேஷ், யுவன், மெட்வின், கவி ஆகியோர் உணவு கொண்டு வருகிறார்கள்." },
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
    speakers: { a: ADHI, r: speaker("Rithika"), p: speaker("Poovai") },
    lines: [
      { who: "r", parts: ["Adhi, ich möchte Idli kochen. ", W("Hilfst", "helfen"), " du mir?"], en: "Adhi, I would like to cook idli. Will you help me?", ta: "ஆதி, நான் இட்லி செய்ய விரும்புகிறேன். எனக்கு உதவுவாயா?" },
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
    speakers: { a: ADHI, r: speaker("Rithika"), m: speaker("Mrithula"), n: role("Der Nachbar", "N", "m") },
    lines: [
      { who: "n", parts: ["Guten Morgen! Was machst du da?"], en: "Good morning! What are you doing there?", ta: "காலை வணக்கம்! நீ அங்கே என்ன செய்கிறாய்?" },
      { who: "r", parts: ["Guten Morgen! Ich ", W("male", "malen"), " ein Kolam vor die Tür."], en: "Good morning! I'm drawing a kolam in front of the door.", ta: "காலை வணக்கம்! நான் வாசலில் ஒரு கோலம் வரைகிறேன்." },
      { who: "n", parts: ["Was ist ein Kolam?"], en: "What is a kolam?", ta: "கோலம் என்றால் என்ன?" },
      { who: "r", parts: ["Ein Kolam ist ein ", W("Muster", "muster"), " aus Reismehl. Es bringt ", W("Glück", "glueck"), "."], en: "A kolam is a pattern made of rice flour. It brings luck.", ta: "கோலம் அரிசி மாவினால் போடும் ஒரு வடிவம். அது அதிர்ஷ்டம் தரும்." },
      { who: "n", parts: ["Schön! Welche ", W("Farben", "farben"), " hast du?"], en: "Beautiful! Which colours do you have?", ta: "அழகு! உன்னிடம் என்ன நிறங்கள் உள்ளன?" },
      { who: "r", parts: ["Ich habe Weiß, Rot und Gelb."], en: "I have white, red and yellow.", ta: "என்னிடம் வெள்ளை, சிவப்பு, மஞ்சள் உள்ளன." },
      { who: "m", parts: ["Hallo Rithika! Darf ich auch malen?"], en: "Hello Rithika! May I draw too?", ta: "வணக்கம் ரித்திகா! நானும் வரையலாமா?" },
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
    speakers: { a: ADHI, m: speaker("Medwin"), y: speaker("Yuvan"), p: speaker("Poovai"), r: speaker("Ruby") },
    lines: [
      { who: "a", parts: ["Frohes Deepavali, Medwin! Heute ist das ", W("Lichterfest", "lichterfest"), "."], en: "Happy Deepavali, Medwin! Today is the festival of lights.", ta: "இனிய தீபாவளி, மெட்வின்! இன்று ஒளித் திருவிழா." },
      { who: "m", parts: ["Danke, Adhi! Frohes Deepavali! Die Lichter sind sehr schön."], en: "Thank you, Adhi! Happy Deepavali! The lights are very beautiful.", ta: "நன்றி ஆதி! இனிய தீபாவளி! விளக்குகள் மிகவும் அழகாக உள்ளன." },
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
