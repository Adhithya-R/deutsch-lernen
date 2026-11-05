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

  /* ------------------------------------------------------------------ 9 (A2) */
  {
    slug: "beim-arzt",
    n: 9,
    landmarks: ["TN011", "DE020"], // Chennai Central, Zwinger Dresden
    mood: "rain",
    title: "Beim Arzt",
    sub: "A2 · At the doctor",
    speakers: { a: ADHI, t: speaker("Thanisha"), d: role("Die Ärztin", "Ä", "f") },
    lines: [
      { who: "t", parts: ["Adhi, du siehst krank aus. Was ist los?"], en: "Adhi, you look ill. What is wrong?", ta: "ஆதி, நீ உடம்பு சரியில்லாதவன் போல் இருக்கிறாய். என்ன ஆச்சு?" },
      { who: "a", parts: ["Ich habe ", W("Kopfschmerzen", "kopfschmerzen"), " und ", W("Fieber", "fieber"), "."], en: "I have a headache and a fever.", ta: "எனக்கு தலைவலியும் காய்ச்சலும் இருக்கிறது." },
      { who: "t", parts: ["Du musst zum Arzt gehen. Ich rufe an und mache einen ", W("Termin", "termin"), "."], en: "You must go to the doctor. I'll call and make an appointment.", ta: "நீ மருத்துவரிடம் போக வேண்டும். நான் அழைத்து நேரம் வாங்குகிறேன்." },
      { who: "d", parts: ["Guten Tag, Adhi. Setzen Sie sich bitte. Seit wann haben Sie Fieber?"], en: "Good day, Adhi. Please sit down. Since when have you had a fever?", ta: "வணக்கம் ஆதி. தயவுசெய்து உட்காருங்கள். எப்போதிருந்து காய்ச்சல்?" },
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
      besserung: { de: "Gute Besserung!", en: "Get well soon!", ta: "விரைவில் குணமடையுங்கள்!", ex: "Gute Besserung, Adhi!", exEn: "Get well soon, Adhi!", exTa: "விரைவில் குணமடையுங்கள், ஆதி!", pic: "💐" },
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
    speakers: { a: ADHI, c: role("Der Chef", "C", "m"), p: speaker("Poovai") },
    lines: [
      { who: "c", parts: ["Guten Morgen, Adhi. Heute ist Ihr erster ", W("Arbeitstag", "arbeitstag"), ". Wie war die Fahrt?"], en: "Good morning, Adhi. Today is your first working day. How was the journey?", ta: "காலை வணக்கம் ஆதி. இன்று உங்கள் முதல் வேலை நாள். பயணம் எப்படி இருந்தது?" },
      { who: "a", parts: ["Gut, danke. Ich bin mit der U-Bahn ", W("gefahren", "gefahren"), "."], en: "Good, thanks. I went by underground.", ta: "நன்றாக இருந்தது, நன்றி. நான் மெட்ரோவில் வந்தேன்." },
      { who: "c", parts: ["Hier ist Ihr ", W("Platz", "platz"), ". Poovai zeigt Ihnen alles."], en: "Here is your desk. Poovai will show you everything.", ta: "இதோ உங்கள் இடம். பூவை உங்களுக்கு எல்லாவற்றையும் காட்டுவார்." },
      { who: "p", parts: ["Hallo Adhi! Hast du schon Kaffee getrunken?"], en: "Hello Adhi! Have you already had coffee?", ta: "வணக்கம் ஆதி! நீ ஏற்கனவே காபி குடித்தாயா?" },
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
    speakers: { a: ADHI, s: speaker("Sanjay"), k: role("Die Schaffnerin", "S", "f") },
    lines: [
      { who: "s", parts: ["Adhi, wir fahren am Samstag nach Hamburg. Kommst du mit?"], en: "Adhi, on Saturday we are going to Hamburg. Are you coming along?", ta: "ஆதி, சனிக்கிழமை நாங்கள் ஹாம்பர்க் போகிறோம். நீயும் வருகிறாயா?" },
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
    speakers: { a: ADHI, r: speaker("Ruby"), k: speaker("Akshay"), s: speaker("Sadhana") },
    lines: [
      { who: "r", parts: ["Was hast du am Wochenende gemacht, Adhi?"], en: "What did you do at the weekend, Adhi?", ta: "ஆதி, வார இறுதியில் என்ன செய்தாய்?" },
      { who: "a", parts: ["Ich habe mit Akshay einen ", W("Ausflug", "ausflug"), " gemacht. Wir sind an den See gefahren."], en: "I went on a trip with Akshay. We went to the lake.", ta: "நான் அக்ஷயுடன் ஒரு சுற்றுலா போனேன். நாங்கள் ஏரிக்குப் போனோம்." },
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
