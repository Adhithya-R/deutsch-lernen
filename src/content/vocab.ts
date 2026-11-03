export type Card = {
  id: string; // stable, never change it once users have studied the card
  deck: string;
  de: string;
  en: string;
  ta: string;
  example?: { de: string; en: string; ta: string };
};

export const decks = [
  { id: "greetings", en: "Greetings", ta: "வாழ்த்துகள்" },
  { id: "family", en: "Family", ta: "குடும்பம்" },
  { id: "food", en: "Food and drink", ta: "உணவு, பானம்" },
  { id: "places", en: "Home and places", ta: "வீடு, இடங்கள்" },
  { id: "time", en: "Time", ta: "நேரம்" },
  { id: "verbs", en: "Common verbs", ta: "முக்கிய வினைகள்" },
];

const c = (deck: string, id: string, de: string, en: string, ta: string, example?: Card["example"]): Card => ({
  id: `${deck}-${id}`,
  deck,
  de,
  en,
  ta,
  example,
});

export const cards: Card[] = [
  c("greetings", "hallo", "Hallo", "hello", "வணக்கம்", { de: "Hallo, ich bin Anna.", en: "Hello, I am Anna.", ta: "வணக்கம், நான் அன்னா." }),
  c("greetings", "morgen", "Guten Morgen", "good morning", "காலை வணக்கம்"),
  c("greetings", "tag", "Guten Tag", "good day / hello", "வணக்கம் (பகல் நேரத்தில்)"),
  c("greetings", "abend", "Guten Abend", "good evening", "மாலை வணக்கம்"),
  c("greetings", "nacht", "Gute Nacht", "good night", "இனிய இரவு"),
  c("greetings", "wiedersehen", "Auf Wiedersehen", "goodbye", "மீண்டும் சந்திப்போம்"),
  c("greetings", "tschuess", "Tschüss", "bye (informal)", "பை (நெருக்கமானவர்களிடம்)"),
  c("greetings", "danke", "Danke", "thank you", "நன்றி", { de: "Danke schön!", en: "Thank you very much!", ta: "மிக்க நன்றி!" }),
  c("greetings", "bitte", "Bitte", "please / you're welcome", "தயவுசெய்து / பரவாயில்லை"),
  c("greetings", "entschuldigung", "Entschuldigung", "excuse me / sorry", "மன்னிக்கவும்"),
  c("greetings", "ja", "Ja", "yes", "ஆம்"),
  c("greetings", "nein", "Nein", "no", "இல்லை"),

  c("family", "mutter", "die Mutter", "mother", "அம்மா", { de: "Meine Mutter ist Lehrerin.", en: "My mother is a teacher.", ta: "என் அம்மா ஆசிரியை." }),
  c("family", "vater", "der Vater", "father", "அப்பா"),
  c("family", "bruder", "der Bruder", "brother", "சகோதரன்"),
  c("family", "schwester", "die Schwester", "sister", "சகோதரி"),
  c("family", "kind", "das Kind", "child", "குழந்தை"),
  c("family", "familie", "die Familie", "family", "குடும்பம்"),
  c("family", "freund", "der Freund", "friend (male) / boyfriend", "நண்பன்"),
  c("family", "freundin", "die Freundin", "friend (female) / girlfriend", "தோழி"),

  c("food", "wasser", "das Wasser", "water", "தண்ணீர்", { de: "Ich trinke Wasser.", en: "I drink water.", ta: "நான் தண்ணீர் குடிக்கிறேன்." }),
  c("food", "tee", "der Tee", "tea", "தேநீர்"),
  c("food", "kaffee", "der Kaffee", "coffee", "காப்பி"),
  c("food", "milch", "die Milch", "milk", "பால்"),
  c("food", "brot", "das Brot", "bread", "ரொட்டி"),
  c("food", "reis", "der Reis", "rice", "அரிசி / சாதம்"),
  c("food", "apfel", "der Apfel", "apple", "ஆப்பிள்"),
  c("food", "essen", "das Essen", "food / meal", "உணவு"),

  c("places", "haus", "das Haus", "house", "வீடு"),
  c("places", "wohnung", "die Wohnung", "flat / apartment", "அடுக்குமாடி வீடு", { de: "Ich suche eine Wohnung.", en: "I am looking for a flat.", ta: "நான் ஒரு வீடு தேடுகிறேன்." }),
  c("places", "stadt", "die Stadt", "city / town", "நகரம்"),
  c("places", "land", "das Land", "country", "நாடு"),
  c("places", "arbeit", "die Arbeit", "work / job", "வேலை"),
  c("places", "schule", "die Schule", "school", "பள்ளி"),
  c("places", "bahnhof", "der Bahnhof", "train station", "ரயில் நிலையம்"),
  c("places", "auto", "das Auto", "car", "கார்"),

  c("time", "heute", "heute", "today", "இன்று"),
  c("time", "morgen", "morgen", "tomorrow", "நாளை"),
  c("time", "gestern", "gestern", "yesterday", "நேற்று"),
  c("time", "tag", "der Tag", "day", "நாள்"),
  c("time", "woche", "die Woche", "week", "வாரம்"),
  c("time", "monat", "der Monat", "month", "மாதம்"),
  c("time", "jahr", "das Jahr", "year", "ஆண்டு"),

  c("verbs", "kommen", "kommen", "to come", "வா", { de: "Ich komme aus Indien.", en: "I come from India.", ta: "நான் இந்தியாவிலிருந்து வருகிறேன்." }),
  c("verbs", "gehen", "gehen", "to go", "போ"),
  c("verbs", "essen", "essen", "to eat", "சாப்பிடு"),
  c("verbs", "trinken", "trinken", "to drink", "குடி"),
  c("verbs", "sprechen", "sprechen", "to speak", "பேசு"),
  c("verbs", "lernen", "lernen", "to learn", "கற்றுக்கொள்"),
  c("verbs", "wohnen", "wohnen", "to live (reside)", "வசி"),
  c("verbs", "arbeiten", "arbeiten", "to work", "வேலை செய்"),
];
