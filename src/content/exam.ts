// Exam practice for Goethe A1 (Start Deutsch 1) and A2. ALL texts below are original. They imitate the
// style and difficulty of the real exam; none are copied from Goethe-Institut papers (those are copyrighted).

export type Level = "a1" | "a2";

export type Item = { q: string; options: string[]; answer: string; tip?: string };
export type Text = { label: string; lines: string[] };
export type ReadTask = { id: string; title: string; instruction: string; texts: Text[]; items: Item[] };

export type Segment = { voice: "m" | "f"; text: string };
export type Clip = { id: string; label: string; segments: Segment[] };
export type ListenTask = { id: string; title: string; instruction: string; clips: Clip[]; items: Item[] };

export type WriteTask = {
  id: string;
  kind: "message" | "email";
  title: string;
  situation: string;
  points: string[];
  min: number;
  max: number;
  sample: string;
};
export type FormField = { label: string; accept?: string[]; contains?: string[] };
export type FormTask = { id: string; title: string; situation: string; fields: FormField[] };

/** hint: what the card asks you to do (English). say: what you say in German. reply: the partner's answer. */
export type SpeakCard = { hint: string; say: string; reply?: string; sayVoice?: "m" | "f" };
export type SpeakPart = { title: string; how: string; cards: SpeakCard[] };

export type LevelContent = {
  level: Level;
  name: string;
  exam: string;
  facts: { skill: string; time: string; what: string }[];
  tips: string[];
  reading: ReadTask[];
  listening: ListenTask[];
  writing: { form?: FormTask; tasks: WriteTask[] };
  speaking: SpeakPart[];
};

export const clipKey = (taskId: string, clipId: string) => `exam-${taskId}-${clipId}`;
const TF = ["Richtig", "Falsch"];

/* ============================== A1 ============================== */
const a1: LevelContent = {
  level: "a1",
  name: "A1",
  exam: "Goethe-Zertifikat A1: Start Deutsch 1",
  facts: [
    { skill: "Reading", time: "about 25 min", what: "Short texts such as messages, notices and ads. Choose the answer or say Richtig/Falsch." },
    { skill: "Listening", time: "about 20 min", what: "Short dialogues, announcements and messages. You hear each one twice." },
    { skill: "Writing", time: "about 20 min", what: "Fill in a form, then write a short message (about 30 words) that covers three points." },
    { skill: "Speaking", time: "about 15 min", what: "In a pair or small group: introduce yourself, ask and answer questions, make requests." },
  ],
  tips: [
    "Read the questions first, then read the text. Look for the words from the question.",
    "In listening, read the answers while the audio starts, and note numbers and times.",
    "In writing, cover all three points in the task. One short sentence per point is enough.",
    "Always start with a greeting (Liebe Thanisha, Hallo Akshay) and end with Viele Grüße and your name.",
    "In speaking, use short, clear sentences. Say “Entschuldigung, können Sie das bitte wiederholen?” if you do not understand.",
    "Practise telling the time and saying prices aloud. They come up again and again.",
  ],
  reading: [
    {
      id: "a1-r1",
      title: "Short messages",
      instruction: "Read the texts and answer the questions.",
      texts: [
        { label: "Message from Poovai", lines: ["Hallo Akshay,", "ich bin heute nicht zu Hause. Ich bin bis 18 Uhr im Büro.", "Der Schlüssel liegt bei Frau Nethra.", "Bis später! Poovai"] },
        { label: "Sign at a café", lines: ["Café Sonne", "Montag bis Freitag: 8–18 Uhr", "Samstag: 9–14 Uhr", "Sonntag: geschlossen"] },
        { label: "Email from Sudharsan", lines: ["Liebe Mrithula,", "am Samstag mache ich eine Party. Sie beginnt um 19 Uhr.", "Bring bitte einen Salat mit.", "Viele Grüße", "Sudharsan"] },
        { label: "Advertisement", lines: ["Zu vermieten", "2-Zimmer-Wohnung, 55 m², mit Küche, Bad und Balkon", "Miete: 620 Euro, ab 1. Dezember", "Telefon: 0170 555 0123"] },
      ],
      items: [
        { q: "Wo ist der Schlüssel?", options: ["Im Büro", "Bei Frau Nethra", "Bei Poovai"], answer: "Bei Frau Nethra" },
        { q: "Am Samstag öffnet das Café um 8 Uhr.", options: TF, answer: "Falsch", tip: "Saturday: 9–14 Uhr." },
        { q: "Das Café ist am Sonntag …", options: ["offen", "geschlossen"], answer: "geschlossen" },
        { q: "Was soll Mrithula mitbringen?", options: ["Einen Salat", "Einen Kuchen", "Getränke"], answer: "Einen Salat" },
        { q: "Die Party ist am Sonntag.", options: TF, answer: "Falsch", tip: "The party is on Saturday." },
        { q: "Die Wohnung kostet …", options: ["55 Euro", "620 Euro", "1.220 Euro"], answer: "620 Euro", tip: "55 is the size in m²." },
        { q: "Die Wohnung hat einen Balkon.", options: TF, answer: "Richtig" },
      ],
    },
    {
      id: "a1-r2",
      title: "Notices and letters",
      instruction: "Read the texts and answer the questions.",
      texts: [
        { label: "Course notice", lines: ["Deutschkurs A1", "Montag und Mittwoch, 18.00–20.15 Uhr, Raum 3", "Bitte bringen Sie Ihr Buch mit.", "Am 3. Dezember ist kein Kurs."] },
        { label: "Letter to parents", lines: ["Liebe Eltern,", "morgen ist die Schule schon um 12 Uhr aus.", "Es gibt kein Mittagessen.", "Bitte geben Sie Ihrem Kind ein Pausenbrot mit."] },
        { label: "Supermarket sign", lines: ["Supermarkt Frisch", "Heute im Angebot:", "Äpfel, 1 kg: 1,90 €", "Brot: 2,50 €", "Öffnungszeiten: Montag bis Samstag, 8–20 Uhr"] },
      ],
      items: [
        { q: "Der Kurs ist am …", options: ["Montag und Mittwoch", "Dienstag und Donnerstag", "Freitag"], answer: "Montag und Mittwoch" },
        { q: "Man braucht das Buch nicht.", options: TF, answer: "Falsch", tip: "“Bitte bringen Sie Ihr Buch mit.”" },
        { q: "Am 3. Dezember …", options: ["ist Unterricht", "ist kein Unterricht", "ist ein Test"], answer: "ist kein Unterricht" },
        { q: "Was müssen die Kinder mitbringen?", options: ["Ein Pausenbrot", "Ein Buch", "Geld"], answer: "Ein Pausenbrot" },
        { q: "Morgen gibt es Mittagessen in der Schule.", options: TF, answer: "Falsch" },
        { q: "Ein Kilo Äpfel kostet …", options: ["1,90 €", "2,50 €", "8,20 €"], answer: "1,90 €" },
        { q: "Am Sonntag ist der Supermarkt offen.", options: TF, answer: "Falsch", tip: "Open Monday to Saturday." },
      ],
    },
    {
      id: "a1-r3",
      title: "Everyday texts",
      instruction: "Read the texts and answer the questions.",
      texts: [
        { label: "Message from Risha", lines: ["Hallo Sadhana,", "ich komme heute später. Mein Bus hat Verspätung.", "Wir treffen uns um 14 Uhr vor der Bibliothek.", "Bis gleich! Risha"] },
        { label: "Sign at a swimming pool", lines: ["Schwimmbad Blauer See", "Dienstag bis Sonntag: 10–20 Uhr", "Montag: geschlossen", "Kinder bis 6 Jahre: frei", "Erwachsene: 4 Euro"] },
        { label: "Invitation", lines: ["Liebe Nethra,", "ich habe am Freitag Geburtstag und mache ein Fest.", "Es beginnt um 18 Uhr bei mir zu Hause.", "Kommst du? Schreib mir bitte kurz.", "Liebe Grüße, Kavitha"] },
      ],
      items: [
        { q: "Warum kommt Risha später?", options: ["Der Bus hat Verspätung.", "Sie ist krank.", "Sie hat keine Zeit."], answer: "Der Bus hat Verspätung." },
        { q: "Wo treffen sich Risha und Sadhana?", options: ["Vor der Bibliothek", "Im Café", "Am Bahnhof"], answer: "Vor der Bibliothek" },
        { q: "Das Schwimmbad ist am Montag offen.", options: TF, answer: "Falsch", tip: "Monday: geschlossen." },
        { q: "Was kostet der Eintritt für Erwachsene?", options: ["4 Euro", "6 Euro", "Nichts"], answer: "4 Euro" },
        { q: "Wann ist das Fest von Kavitha?", options: ["Am Freitag um 18 Uhr", "Am Samstag um 18 Uhr", "Am Freitag um 8 Uhr"], answer: "Am Freitag um 18 Uhr" },
        { q: "Nethra soll Kavitha kurz schreiben.", options: TF, answer: "Richtig" },
      ],
    },
    {
      id: "a1-r4",
      title: "Timetable, sign and text message",
      instruction: "Read the texts and answer the questions.",
      texts: [
        { label: "Timetable of a course", lines: ["Deutschkurs A1 · Stundenplan", "Montag: Grammatik, 18.00–19.30 Uhr", "Mittwoch: Sprechen, 18.00–19.30 Uhr", "Samstag: Wiederholung, 10.00–12.00 Uhr"] },
        { label: "Sign at a library", lines: ["Stadtbibliothek", "Montag bis Freitag: 9–19 Uhr", "Samstag: 10–14 Uhr", "Sie können Bücher vier Wochen behalten."] },
        { label: "Text message from Yogesh", lines: ["Hallo Ram, ich bin schon da. Ich warte vor dem Kino. Kommst du bald? Der Film beginnt in zehn Minuten. Yogesh"] },
      ],
      items: [
        { q: "Wann ist der Sprechkurs?", options: ["Am Montag", "Am Mittwoch", "Am Samstag"], answer: "Am Mittwoch" },
        { q: "Am Samstag dauert der Kurs zwei Stunden.", options: TF, answer: "Richtig", tip: "10.00–12.00 Uhr = two hours." },
        { q: "Wie lange darf man ein Buch behalten?", options: ["Eine Woche", "Vier Wochen", "Ein Jahr"], answer: "Vier Wochen" },
        { q: "Die Bibliothek ist am Sonntag offen.", options: TF, answer: "Falsch", tip: "Only Monday to Saturday." },
        { q: "Wo wartet Yogesh?", options: ["Vor dem Kino", "Im Café", "Am Bahnhof"], answer: "Vor dem Kino" },
        { q: "Wann beginnt der Film?", options: ["In zehn Minuten", "In einer Stunde", "Morgen"], answer: "In zehn Minuten" },
      ],
    },
  ],
  listening: [
    {
      id: "a1-l1",
      title: "Short dialogues",
      instruction: "You hear three short texts. Listen and choose the answer. You may play each one twice.",
      clips: [
        { id: "1", label: "Text 1", segments: [{ voice: "f", text: "Entschuldigung, wo ist der Bahnhof?" }, { voice: "m", text: "Gehen Sie hier geradeaus und dann links. Der Bahnhof ist neben der Post." }] },
        { id: "2", label: "Text 2", segments: [{ voice: "m", text: "Guten Tag. Ich möchte zwei Brötchen und einen Kaffee, bitte." }, { voice: "f", text: "Gern. Das macht drei Euro zwanzig." }] },
        { id: "3", label: "Text 3", segments: [{ voice: "f", text: "Hallo Ram, hier ist Ruby. Wir treffen uns heute um Viertel nach sechs vor dem Kino. Bis später!" }] },
      ],
      items: [
        { q: "Text 1: Wo ist der Bahnhof?", options: ["Neben der Post", "Neben dem Hotel", "Hinter der Schule"], answer: "Neben der Post" },
        { q: "Text 2: Was kostet es?", options: ["2,30 €", "3,20 €", "3,02 €"], answer: "3,20 €", tip: "drei Euro zwanzig = 3,20 €." },
        { q: "Text 3: Wann treffen sie sich?", options: ["Um 18.15 Uhr", "Um 18.45 Uhr", "Um 17.15 Uhr"], answer: "Um 18.15 Uhr", tip: "Viertel nach sechs = 6.15." },
      ],
    },
    {
      id: "a1-l2",
      title: "Announcements and a conversation",
      instruction: "You hear three texts. Listen and choose the answer. You may play each one twice.",
      clips: [
        { id: "1", label: "Text 1", segments: [{ voice: "f", text: "Achtung, eine Durchsage. Der Zug nach München fährt heute von Gleis fünf. Der Zug hat zehn Minuten Verspätung." }] },
        { id: "2", label: "Text 2", segments: [{ voice: "m", text: "Liebe Kunden, heute gibt es Äpfel im Angebot. Ein Kilo kostet nur ein Euro neunzig." }] },
        { id: "3", label: "Text 3", segments: [{ voice: "m", text: "Wie heißen Sie?" }, { voice: "f", text: "Ich heiße Mrithula." }, { voice: "m", text: "Und woher kommen Sie?" }, { voice: "f", text: "Aus Indien." }] },
      ],
      items: [
        { q: "Text 1: Von welchem Gleis fährt der Zug?", options: ["Gleis 3", "Gleis 5", "Gleis 10"], answer: "Gleis 5" },
        { q: "Text 2: Ein Kilo Äpfel kostet 1,90 Euro.", options: TF, answer: "Richtig" },
        { q: "Text 3: Woher kommt Mrithula?", options: ["Aus Indien", "Aus Italien", "Aus Mexiko"], answer: "Aus Indien" },
      ],
    },
    {
      id: "a1-l3",
      title: "At the shop and on the phone",
      instruction: "You hear three texts. Listen and choose the answer. You may play each one twice.",
      clips: [
        { id: "1", label: "Text 1", segments: [{ voice: "f", text: "Guten Tag, kann ich Ihnen helfen?" }, { voice: "m", text: "Ja, ich suche ein T-Shirt. Haben Sie das in Blau?" }, { voice: "f", text: "Ja, hier. Es kostet zwölf Euro neunzig." }] },
        { id: "2", label: "Text 2", segments: [{ voice: "m", text: "Hallo Dhinesh, hier ist Ram. Ich kann heute nicht zum Deutschkurs kommen. Ich bin krank. Kannst du mir bitte die Hausaufgaben schicken? Danke!" }] },
        { id: "3", label: "Text 3", segments: [{ voice: "f", text: "Achtung, eine Durchsage. Das Schwimmbad schließt heute um achtzehn Uhr. Bitte verlassen Sie jetzt das Wasser." }] },
      ],
      items: [
        { q: "Text 1: Welche Farbe hat das T-Shirt?", options: ["Blau", "Rot", "Grün"], answer: "Blau" },
        { q: "Text 1: Was kostet das T-Shirt?", options: ["12,09 €", "12,90 €", "19,20 €"], answer: "12,90 €", tip: "zwölf Euro neunzig = 12,90 €." },
        { q: "Text 2: Warum kommt Ram nicht zum Kurs?", options: ["Er ist krank.", "Er hat Urlaub.", "Er arbeitet."], answer: "Er ist krank." },
        { q: "Text 2: Was soll Dhinesh schicken?", options: ["Die Hausaufgaben", "Ein Buch", "Geld"], answer: "Die Hausaufgaben" },
        { q: "Text 3: Wann schließt das Schwimmbad?", options: ["Um 16 Uhr", "Um 18 Uhr", "Um 20 Uhr"], answer: "Um 18 Uhr", tip: "achtzehn Uhr = 18:00." },
      ],
    },
    {
      id: "a1-l4",
      title: "Bakery, message and bus announcement",
      instruction: "You hear three texts. Listen and choose the answer. You may play each one twice.",
      clips: [
        { id: "1", label: "Text 1", segments: [{ voice: "f", text: "Guten Morgen, was bekommen Sie?" }, { voice: "m", text: "Vier Brötchen und ein Brot, bitte." }, { voice: "f", text: "Das macht fünf Euro vierzig." }] },
        { id: "2", label: "Text 2", segments: [{ voice: "m", text: "Hallo Nethra, hier ist Medwin. Ich komme heute später, um halb sieben. Bis dann!" }] },
        { id: "3", label: "Text 3", segments: [{ voice: "f", text: "Achtung, eine Durchsage. Der Bus Linie fünfzehn fährt heute nicht. Bitte nehmen Sie die Linie zwanzig." }] },
      ],
      items: [
        { q: "Text 1: Was kauft der Mann?", options: ["Vier Brötchen und ein Brot", "Ein Brot und einen Kuchen", "Nur Brötchen"], answer: "Vier Brötchen und ein Brot" },
        { q: "Text 1: Was kostet es?", options: ["5,04 €", "5,40 €", "4,50 €"], answer: "5,40 €", tip: "fünf Euro vierzig = 5,40 €." },
        { q: "Text 2: Wann kommt Medwin?", options: ["Um 18.30 Uhr", "Um 6.00 Uhr", "Um 19.30 Uhr"], answer: "Um 18.30 Uhr", tip: "halb sieben = 6.30 pm." },
        { q: "Text 3: Welche Linie fährt heute nicht?", options: ["Linie 15", "Linie 20", "Linie 50"], answer: "Linie 15" },
        { q: "Text 3: Was sollen die Fahrgäste tun?", options: ["Die Linie 20 nehmen", "Nach Hause gehen", "Ein Taxi rufen"], answer: "Die Linie 20 nehmen" },
      ],
    },
  ],
  writing: {
    form: {
      id: "a1-form",
      title: "Fill in the form",
      situation: "You are Sadhana, 25 years old. You come from India and live in Berlin. You speak Tamil and English. Fill in the registration form.",
      fields: [
        { label: "Familienname", accept: ["krishnan"] },
        { label: "Vorname", accept: ["priya"] },
        { label: "Alter", accept: ["25"] },
        { label: "Land", accept: ["indien"] },
        { label: "Wohnort", accept: ["berlin"] },
        { label: "Sprachen", contains: ["tamil", "englisch"] },
      ],
    },
    tasks: [
      {
        id: "a1-w1",
        kind: "message",
        title: "Short message: shopping",
        situation: "Sie schreiben an Ihre Freundin Thanisha. Sie möchten morgen zusammen einkaufen gehen.",
        points: ["Wann treffen Sie sich?", "Wo treffen Sie sich?", "Was möchten Sie kaufen?"],
        min: 20,
        max: 35,
        sample: "Liebe Thanisha, morgen möchte ich einkaufen. Treffen wir uns um 10 Uhr vor dem Supermarkt? Ich brauche Obst und Brot. Kommst du mit? Viele Grüße, Sadhana",
      },
      {
        id: "a1-w2",
        kind: "message",
        title: "Short message: an invitation",
        situation: "Sie laden Ihren Freund Akshay zum Essen ein.",
        points: ["Wann ist das Essen?", "Wo ist das Essen?", "Was soll Akshay mitbringen?"],
        min: 20,
        max: 35,
        sample: "Lieber Akshay, am Samstag koche ich Reis und Curry. Kommst du um 19 Uhr zu mir nach Hause? Bring bitte ein Getränk mit. Ich freue mich! Liebe Grüße, Sadhana",
      },
      {
        id: "a1-w3",
        kind: "message",
        title: "Short message: a sick day",
        situation: "Sie sind krank und können morgen nicht zum Deutschkurs kommen. Schreiben Sie an Ihre Lehrerin.",
        points: ["Warum kommen Sie nicht?", "Wann kommen Sie wieder?", "Was möchten Sie wissen?"],
        min: 20,
        max: 35,
        sample: "Liebe Frau Kavitha, ich bin krank und kann morgen nicht kommen. Am Montag komme ich wieder. Können Sie mir bitte die Hausaufgaben schicken? Viele Grüße, Adhi",
      },
      {
        id: "a1-w4",
        kind: "message",
        title: "Short message: reply to an invitation",
        situation: "Ihre Freundin Rithika lädt Sie zu ihrem Geburtstag ein. Schreiben Sie ihr eine Antwort.",
        points: ["Sagen Sie, dass Sie gern kommen.", "Was bringen Sie mit?", "Wann kommen Sie?"],
        min: 20,
        max: 35,
        sample: "Liebe Rithika, vielen Dank für die Einladung! Ich komme sehr gern. Ich bringe einen Kuchen mit. Ich bin um 18 Uhr bei dir. Viele Grüße, Sadhana",
      },
    ],
  },
  speaking: [
    {
      title: "Part 1: Introduce yourself",
      how: "Say your name, age, country, city, languages, job and a hobby. Short, clear sentences are best.",
      cards: [
        { hint: "Your name", say: "Ich heiße Sadhana.", sayVoice: "f" },
        { hint: "Your age", say: "Ich bin 25 Jahre alt.", sayVoice: "f" },
        { hint: "Your country and city", say: "Ich komme aus Indien, aus Madurai.", sayVoice: "f" },
        { hint: "Where you live", say: "Ich wohne jetzt in Berlin.", sayVoice: "f" },
        { hint: "Your languages", say: "Ich spreche Tamil, Englisch und ein bisschen Deutsch.", sayVoice: "f" },
        { hint: "Your job", say: "Ich bin Ingenieurin.", sayVoice: "f" },
        { hint: "Your hobby", say: "Mein Hobby ist Kochen.", sayVoice: "f" },
      ],
    },
    {
      title: "Part 2: Ask and answer",
      how: "You get a card with a topic and a question word. Make a question, then answer your partner's question.",
      cards: [
        { hint: "Home · Wo?", say: "Wo wohnen Sie?", reply: "Ich wohne in Berlin." },
        { hint: "Shop · Wann?", say: "Wann öffnet das Geschäft?", reply: "Das Geschäft öffnet um neun Uhr." },
        { hint: "Hobby · Was?", say: "Was ist Ihr Hobby?", reply: "Mein Hobby ist Kochen." },
        { hint: "Family · Wie viele?", say: "Wie viele Geschwister haben Sie?", reply: "Ich habe einen Bruder und eine Schwester." },
        { hint: "Food · Was?", say: "Was essen Sie gern?", reply: "Ich esse gern Reis und Gemüse." },
        { hint: "Flat · Wie viele?", say: "Wie viele Zimmer hat Ihre Wohnung?", reply: "Meine Wohnung hat zwei Zimmer." },
      ],
    },
    {
      title: "Part 3: Requests",
      how: "You get a picture card. Make a polite request and answer your partner's request with “Ja, gern.” or “Nein, tut mir leid.”",
      cards: [
        { hint: "Window", say: "Können Sie bitte das Fenster öffnen?", reply: "Ja, gern." },
        { hint: "Water", say: "Kann ich bitte ein Glas Wasser haben?", reply: "Natürlich, hier bitte." },
        { hint: "Pen", say: "Kannst du mir bitte einen Stift geben?", reply: "Ja, hier ist einer." },
        { hint: "Heavy bag", say: "Können Sie mir bitte helfen? Die Tasche ist schwer.", reply: "Nein, tut mir leid. Ich habe keine Zeit." },
        { hint: "The time", say: "Entschuldigung, wie spät ist es?", reply: "Es ist halb drei." },
      ],
    },
  ],
};

/* ============================== A2 ============================== */
const a2: LevelContent = {
  level: "a2",
  name: "A2",
  exam: "Goethe-Zertifikat A2",
  facts: [
    { skill: "Reading", time: "about 30 min", what: "Emails, notices, ads and short articles. True/false and multiple choice." },
    { skill: "Listening", time: "about 30 min", what: "Phone messages, announcements and conversations. You hear most texts twice." },
    { skill: "Writing", time: "about 30 min", what: "Part 1: a short note or SMS (about 20–30 words). Part 2: an email (about 30–40 words). Both cover three points." },
    { skill: "Speaking", time: "about 15 min", what: "Talk about yourself, present a topic, and plan something together with a partner." },
  ],
  tips: [
    "Before you write, tick off the three points in the task. Each needs its own sentence.",
    "Use connectors (weil, denn, aber, und, dann) to make your text sound natural, but keep the verb position right.",
    "Use du with friends and Sie with teachers, offices and strangers. Keep it the same all the way through.",
    "In reading, the answer is almost always in one sentence. Underline the key words from the question.",
    "In speaking part 3, suggest (Wie wäre es mit …?), agree (Einverstanden!) and disagree politely (Tut mir leid, …).",
    "Check the Perfekt (haben/sein + Partizip II at the end) and weil-sentences (verb last) before you finish.",
  ],
  reading: [
    {
      id: "a2-r1",
      title: "Emails and adverts",
      instruction: "Read the texts and answer the questions.",
      texts: [
        {
          label: "Email from Sudha",
          lines: [
            "Liebe Risha,",
            "vielen Dank für deine Einladung zu deinem Geburtstag. Leider kann ich am Samstag nicht kommen, weil ich arbeiten muss.",
            "Aber am Sonntag habe ich Zeit. Hast du Lust, mit mir ins Museum zu gehen? Danach können wir Kaffee trinken.",
            "Liebe Grüße",
            "Sudha",
          ],
        },
        {
          label: "Advertisement",
          lines: [
            "Fahrradwerkstatt Shylash",
            "Wir reparieren alle Fahrräder schnell und günstig.",
            "Öffnungszeiten: Montag bis Freitag 9–17 Uhr, Samstag 9–13 Uhr",
            "Sie brauchen keinen Termin.",
            "Ab 50 Euro Reparaturkosten gibt es 10 % Rabatt.",
          ],
        },
      ],
      items: [
        { q: "Sudha kommt am Samstag zu Rishas Geburtstag.", options: TF, answer: "Falsch" },
        { q: "Warum kann Sudha am Samstag nicht kommen?", options: ["Sie ist krank.", "Sie muss arbeiten.", "Sie fährt weg."], answer: "Sie muss arbeiten.", tip: "“weil ich arbeiten muss”" },
        { q: "Was schlägt Sudha vor?", options: ["Am Sonntag ins Museum gehen und Kaffee trinken", "Am Samstag einen Film sehen", "Am Sonntag zu Hause kochen"], answer: "Am Sonntag ins Museum gehen und Kaffee trinken" },
        { q: "Wer bekommt Rabatt?", options: ["Alle Kunden", "Kunden mit Reparaturen ab 50 Euro", "Nur Kunden am Samstag"], answer: "Kunden mit Reparaturen ab 50 Euro" },
        { q: "Man muss einen Termin machen.", options: TF, answer: "Falsch", tip: "“Sie brauchen keinen Termin.”" },
      ],
    },
    {
      id: "a2-r2",
      title: "A short article",
      instruction: "Read the text and answer the questions.",
      texts: [
        {
          label: "Berlin",
          lines: [
            "Berlin ist die Hauptstadt von Deutschland. Mehr als drei Millionen Menschen wohnen dort.",
            "Viele Touristen besuchen das Brandenburger Tor und den Fernsehturm.",
            "Im Sommer sind viele Menschen im Park oder am Fluss. Im Dezember gibt es Weihnachtsmärkte.",
          ],
        },
      ],
      items: [
        { q: "Wie viele Menschen wohnen in Berlin?", options: ["Weniger als eine Million", "Mehr als drei Millionen", "Genau zehn Millionen"], answer: "Mehr als drei Millionen" },
        { q: "Im Sommer gibt es Weihnachtsmärkte.", options: TF, answer: "Falsch", tip: "Christmas markets are in December." },
        { q: "Was besuchen viele Touristen?", options: ["Das Brandenburger Tor und den Fernsehturm", "Den Kölner Dom", "Das Schloss Neuschwanstein"], answer: "Das Brandenburger Tor und den Fernsehturm" },
      ],
    },
    {
      id: "a2-r3",
      title: "Notices",
      instruction: "Read the notices and answer the questions.",
      texts: [
        {
          label: "Notice from a language school",
          lines: [
            "Deutschkurs A2 · Neuer Kurs ab 6. Oktober",
            "Montag und Mittwoch, 18.00–20.15 Uhr",
            "Anmeldung im Sekretariat oder online",
            "Kosten: 240 Euro, Bücher extra (35 Euro)",
            "Wer sich bis zum 30. September anmeldet, bekommt 10 % Rabatt.",
          ],
        },
        {
          label: "Notice in a house",
          lines: [
            "Liebe Nachbarn,",
            "am Samstag gibt es von 9 bis 15 Uhr kein Wasser im Haus, weil die Rohre repariert werden.",
            "Bitte füllen Sie am Freitag genug Wasser in Flaschen. Bei Fragen rufen Sie die Hausverwaltung an.",
            "Hausmeister Medwin",
          ],
        },
      ],
      items: [
        { q: "An welchen Tagen ist der Kurs?", options: ["Montag und Mittwoch", "Dienstag und Donnerstag", "Samstag und Sonntag"], answer: "Montag und Mittwoch" },
        { q: "Was kostet der Kurs ohne Bücher?", options: ["35 Euro", "240 Euro", "275 Euro"], answer: "240 Euro" },
        { q: "Wer bekommt 10 % Rabatt?", options: ["Wer sich bis zum 30. September anmeldet", "Alle Schüler", "Wer Bücher kauft"], answer: "Wer sich bis zum 30. September anmeldet" },
        { q: "Am Samstag gibt es den ganzen Tag kein Wasser.", options: TF, answer: "Falsch", tip: "Only from 9 to 15 Uhr." },
        { q: "Was sollen die Nachbarn am Freitag tun?", options: ["Wasser in Flaschen füllen", "Die Hausverwaltung besuchen", "Die Rohre reparieren"], answer: "Wasser in Flaschen füllen" },
      ],
    },
    {
      id: "a2-r4",
      title: "A chat",
      instruction: "Read the messages and answer the questions.",
      texts: [
        {
          label: "Chat between Thanisha and Ram",
          lines: [
            "Thanisha: Hallo Ram, ich habe gestern eine Wohnung gesehen. Sie hat zwei Zimmer und kostet 750 Euro warm. Sie ist aber im vierten Stock und es gibt keinen Aufzug.",
            "Ram: Das ist günstig! Aber vier Stockwerke ohne Aufzug sind anstrengend. Ist die Wohnung hell?",
            "Thanisha: Ja, sehr hell, mit einem Balkon. Ich gehe morgen noch einmal hin und mache Fotos.",
          ],
        },
      ],
      items: [
        { q: "Wie viel kostet die Wohnung?", options: ["750 Euro warm", "750 Euro kalt", "570 Euro warm"], answer: "750 Euro warm" },
        { q: "Was ist das Problem?", options: ["Es gibt keinen Aufzug.", "Es gibt keinen Balkon.", "Die Wohnung ist dunkel."], answer: "Es gibt keinen Aufzug." },
        { q: "Die Wohnung ist dunkel.", options: TF, answer: "Falsch", tip: "“sehr hell”" },
        { q: "Was macht Thanisha morgen?", options: ["Sie geht noch einmal hin und macht Fotos.", "Sie unterschreibt den Vertrag.", "Sie ruft Ram an."], answer: "Sie geht noch einmal hin und macht Fotos." },
      ],
    },
    {
      id: "a2-r5",
      title: "A blog post",
      instruction: "Read the text and answer the questions.",
      texts: [
        {
          label: "My first year in Berlin (blog by Dhinesh)",
          lines: [
            "Vor einem Jahr bin ich nach Berlin gezogen. Am Anfang war alles neu und schwer für mich: die Sprache, das Wetter und das Essen.",
            "Ich habe jeden Tag Deutsch gelernt und viele Leute kennengelernt. Meine Nachbarn haben mir oft geholfen.",
            "Jetzt habe ich eine Arbeit in einer Firma und eine kleine Wohnung. Im Winter vermisse ich die Sonne, aber ich koche oft indisches Essen für meine Freunde.",
            "Nächstes Jahr möchte ich meine Familie nach Berlin einladen.",
          ],
        },
      ],
      items: [
        { q: "Was war am Anfang schwer?", options: ["Die Sprache, das Wetter und das Essen", "Nur die Arbeit", "Nur die Wohnung"], answer: "Die Sprache, das Wetter und das Essen" },
        { q: "Wer hat Dhinesh oft geholfen?", options: ["Seine Nachbarn", "Sein Chef", "Seine Lehrerin"], answer: "Seine Nachbarn" },
        { q: "Dhinesh hat jetzt eine große Wohnung.", options: TF, answer: "Falsch", tip: "“eine kleine Wohnung”" },
        { q: "Was vermisst er im Winter?", options: ["Die Sonne", "Seine Freunde", "Das Essen"], answer: "Die Sonne" },
        { q: "Was möchte er nächstes Jahr machen?", options: ["Seine Familie einladen", "Nach Indien ziehen", "Eine neue Arbeit suchen"], answer: "Seine Familie einladen" },
      ],
    },
  ],
  listening: [
    {
      id: "a2-l1",
      title: "Phone message",
      instruction: "You hear a message on the phone. Listen and choose the answers. You may play it twice.",
      clips: [
        { id: "1", label: "Message", segments: [{ voice: "f", text: "Guten Tag, hier ist die Praxis von Doktor Yuvan. Sie haben morgen um halb zehn einen Termin. Leider ist der Arzt krank. Können Sie bitte übermorgen um zehn Uhr kommen? Rufen Sie uns bitte zurück. Danke." }] },
      ],
      items: [
        { q: "Wann ist der neue Termin?", options: ["Morgen um 9.30 Uhr", "Übermorgen um 10 Uhr", "Heute um 10 Uhr"], answer: "Übermorgen um 10 Uhr", tip: "übermorgen = the day after tomorrow." },
        { q: "Was soll der Patient tun?", options: ["In der Praxis anrufen", "Zum Arzt gehen", "Eine E-Mail schreiben"], answer: "In der Praxis anrufen" },
      ],
    },
    {
      id: "a2-l2",
      title: "A conversation and an announcement",
      instruction: "Listen and choose the answers. You may play each text twice.",
      clips: [
        {
          id: "1",
          label: "Conversation",
          segments: [
            { voice: "m", text: "Hast du am Wochenende schon etwas vor?" },
            { voice: "f", text: "Ja, ich fahre am Samstag mit dem Zug nach Hamburg. Meine Schwester wohnt dort." },
            { voice: "m", text: "Schön! Und am Sonntag?" },
            { voice: "f", text: "Da bleibe ich zu Hause und lerne für die Prüfung." },
          ],
        },
        { id: "2", label: "Announcement", segments: [{ voice: "f", text: "Achtung, eine Durchsage für unsere Kunden. Das Kaufhaus schließt heute um neunzehn Uhr. Bitte gehen Sie jetzt zur Kasse. Vielen Dank." }] },
      ],
      items: [
        { q: "Conversation: Womit fährt sie nach Hamburg?", options: ["Mit dem Zug", "Mit dem Auto", "Mit dem Bus"], answer: "Mit dem Zug" },
        { q: "Conversation: Was macht sie am Sonntag?", options: ["Sie lernt zu Hause.", "Sie besucht ihre Schwester.", "Sie geht ins Kino."], answer: "Sie lernt zu Hause." },
        { q: "Announcement: Wann schließt das Kaufhaus?", options: ["Um 17 Uhr", "Um 19 Uhr", "Um 21 Uhr"], answer: "Um 19 Uhr", tip: "neunzehn Uhr = 19:00." },
      ],
    },
    {
      id: "a2-l3",
      title: "Two short dialogues",
      instruction: "Listen and choose the answers. You may play each dialogue twice.",
      clips: [
        {
          id: "1",
          label: "At the doctor's office",
          segments: [
            { voice: "f", text: "Praxis Doktor Yuvan, guten Tag." },
            { voice: "m", text: "Guten Tag, hier ist Adhi. Ich habe seit drei Tagen Rückenschmerzen. Kann ich heute noch kommen?" },
            { voice: "f", text: "Heute ist leider alles voll. Morgen um elf Uhr geht es." },
            { voice: "m", text: "Gut, dann komme ich morgen um elf." },
          ],
        },
        {
          id: "2",
          label: "At the station",
          segments: [
            { voice: "m", text: "Entschuldigung, von welchem Gleis fährt der Zug nach Hamburg?" },
            { voice: "f", text: "Von Gleis sieben, aber er hat zehn Minuten Verspätung." },
            { voice: "m", text: "Danke. Wo kann ich eine Fahrkarte kaufen?" },
            { voice: "f", text: "Dort hinten am Automaten." },
          ],
        },
      ],
      items: [
        { q: "Doctor: Seit wann hat Adhi Rückenschmerzen?", options: ["Seit einem Tag", "Seit drei Tagen", "Seit einer Woche"], answer: "Seit drei Tagen" },
        { q: "Doctor: Wann ist der Termin?", options: ["Heute", "Morgen um elf Uhr", "Morgen um zwölf Uhr"], answer: "Morgen um elf Uhr" },
        { q: "Station: Von welchem Gleis fährt der Zug?", options: ["Gleis fünf", "Gleis sieben", "Gleis zehn"], answer: "Gleis sieben" },
        { q: "Station: Wie viel Verspätung hat der Zug?", options: ["Zehn Minuten", "Zwanzig Minuten", "Keine"], answer: "Zehn Minuten" },
        { q: "Station: Wo kann man eine Fahrkarte kaufen?", options: ["Am Automaten", "Im Zug", "Im Hotel"], answer: "Am Automaten" },
      ],
    },
    {
      id: "a2-l4",
      title: "Weather report and holiday plans",
      instruction: "Listen and choose the answers. You may play each text twice.",
      clips: [
        { id: "1", label: "Weather report", segments: [{ voice: "f", text: "Das Wetter für morgen: Im Norden ist es regnerisch bei zwölf Grad. Im Süden scheint die Sonne, es wird bis zu zwanzig Grad warm. Am Wochenende wird es kälter." }] },
        {
          id: "2",
          label: "Conversation",
          segments: [
            { voice: "f", text: "Wohin fährst du im Urlaub?" },
            { voice: "m", text: "Nach Italien, mit dem Auto. Ich fahre mit meiner Familie." },
            { voice: "f", text: "Wie lange bleibt ihr?" },
            { voice: "m", text: "Zwei Wochen. Wir fahren im Juli." },
          ],
        },
      ],
      items: [
        { q: "Weather: Wie ist das Wetter im Süden?", options: ["Sonnig und warm", "Regnerisch und kalt", "Windig"], answer: "Sonnig und warm" },
        { q: "Weather: Wie warm wird es im Süden?", options: ["Bis zu 12 Grad", "Bis zu 20 Grad", "Bis zu 30 Grad"], answer: "Bis zu 20 Grad" },
        { q: "Weather: Am Wochenende wird es wärmer.", options: TF, answer: "Falsch", tip: "“kälter” = colder." },
        { q: "Conversation: Womit fährt er nach Italien?", options: ["Mit dem Auto", "Mit dem Zug", "Mit dem Flugzeug"], answer: "Mit dem Auto" },
        { q: "Conversation: Wie lange bleiben sie?", options: ["Eine Woche", "Zwei Wochen", "Einen Monat"], answer: "Zwei Wochen" },
      ],
    },
  ],
  writing: {
    tasks: [
      {
        id: "a2-w1",
        kind: "message",
        title: "Part 1: a short note",
        situation: "Sie können morgen nicht zum Deutschkurs kommen. Schreiben Sie eine Nachricht an Ihre Lehrerin, Frau Kavitha.",
        points: ["Warum können Sie nicht kommen?", "Wann kommen Sie wieder?", "Bitten Sie um die Hausaufgaben."],
        min: 20,
        max: 40,
        sample: "Liebe Frau Kavitha, ich kann morgen leider nicht kommen, weil ich krank bin. Am Donnerstag komme ich wieder. Können Sie mir bitte die Hausaufgaben schicken? Vielen Dank! Viele Grüße, Sadhana",
      },
      {
        id: "a2-w2",
        kind: "email",
        title: "Part 2: a friendly email",
        situation: "Ihre Freundin Rithika hat Sie zu ihrer Geburtstagsparty eingeladen. Schreiben Sie ihr eine E-Mail.",
        points: ["Bedanken Sie sich für die Einladung.", "Sagen Sie, ob Sie kommen, und warum.", "Fragen Sie, was Sie mitbringen sollen."],
        min: 30,
        max: 50,
        sample: "Liebe Rithika, vielen Dank für die Einladung zu deiner Party! Ich komme sehr gern, weil ich dich lange nicht gesehen habe. Soll ich einen Kuchen oder Getränke mitbringen? Bitte schreib mir kurz. Viele Grüße, Sadhana",
      },
      {
        id: "a2-w3",
        kind: "email",
        title: "Part 2: a formal email",
        situation: "Sie suchen eine Wohnung und haben eine Anzeige gelesen. Schreiben Sie an den Vermieter, Herrn Arvind.",
        points: ["Sagen Sie, warum Sie schreiben.", "Fragen Sie nach der Miete.", "Fragen Sie nach einem Besichtigungstermin."],
        min: 30,
        max: 55,
        sample: "Sehr geehrter Herr Arvind, ich habe Ihre Anzeige im Internet gelesen und interessiere mich für die Wohnung. Wie hoch ist die Miete? Kann ich die Wohnung nächste Woche besichtigen? Vielen Dank für Ihre Antwort. Mit freundlichen Grüßen, Sadhana",
      },
      {
        id: "a2-w4",
        kind: "email",
        title: "Part 2: tell a friend about your new job",
        situation: "Sie haben einen neuen Job. Schreiben Sie an Ihre Freundin Ruby.",
        points: ["Wo arbeiten Sie?", "Was machen Sie dort?", "Wie sind der Chef und die Kollegen?"],
        min: 40,
        max: 70,
        sample: "Liebe Ruby, ich habe seit Montag einen neuen Job in einer Firma in Berlin. Ich arbeite im Büro und schreibe viele E-Mails. Mein Chef ist sehr nett und die Kollegen helfen mir. Hast du am Wochenende Zeit? Dann erzähle ich dir mehr. Viele Grüße, Adhi",
      },
      {
        id: "a2-w5",
        kind: "email",
        title: "Part 2: a complaint",
        situation: "Sie haben im Internet eine Jacke bestellt, aber sie ist zu klein. Schreiben Sie an den Kundenservice.",
        points: ["Was ist das Problem?", "Was möchten Sie?", "Wann erwarten Sie eine Antwort?"],
        min: 40,
        max: 70,
        sample: "Sehr geehrte Damen und Herren, ich habe letzte Woche eine Jacke bestellt. Leider ist sie zu klein. Ich möchte die Jacke gern umtauschen und eine größere Jacke bekommen. Bitte schicken Sie mir die neue Jacke so schnell wie möglich. Bitte antworten Sie mir bis nächsten Freitag. Mit freundlichen Grüßen, Adhi",
      },
    ],
  },
  speaking: [
    {
      title: "Part 1: Talk about yourself",
      how: "Your partner asks you a few questions about everyday topics. Answer in two or three sentences.",
      cards: [
        { hint: "Free time", say: "Was machen Sie in Ihrer Freizeit?", reply: "In meiner Freizeit koche ich gern und ich gehe spazieren." },
        { hint: "Home", say: "Wie ist Ihre Wohnung?", reply: "Meine Wohnung ist klein, aber sehr schön. Sie hat zwei Zimmer und einen Balkon." },
        { hint: "Work", say: "Was machen Sie beruflich?", reply: "Ich arbeite als Ingenieurin in einer Firma." },
        { hint: "Travel", say: "Wohin sind Sie zuletzt gefahren?", reply: "Letztes Jahr bin ich nach Chennai gefahren und habe meine Familie besucht." },
        { hint: "Food", say: "Was essen Sie am liebsten?", reply: "Am liebsten esse ich Reis mit Gemüse." },
      ],
    },
    {
      title: "Part 2: Present a topic",
      how: "Talk about a topic for about a minute: say what, who, where and why. Use simple connecting words.",
      cards: [
        { hint: "A day in your life", say: "Ich stehe um sechs Uhr auf. Dann frühstücke ich und fahre mit dem Bus zur Arbeit. Abends lerne ich Deutsch.", sayVoice: "f" },
        { hint: "My best friend", say: "Meine beste Freundin heißt Anita. Wir kennen uns seit zehn Jahren. Wir treffen uns oft und kochen zusammen.", sayVoice: "f" },
        { hint: "My home town", say: "Ich komme aus Madurai. Die Stadt ist alt und hat einen großen Tempel. Im Winter ist das Wetter sehr schön.", sayVoice: "f" },
      ],
    },
    {
      title: "Part 3: Plan something together",
      how: "You and your partner plan an activity. Suggest, agree, disagree politely and decide.",
      cards: [
        { hint: "Suggest an idea", say: "Wie wäre es mit einem Ausflug nach Potsdam?", reply: "Das ist eine gute Idee! Wann wollen wir fahren?" },
        { hint: "Suggest a time", say: "Ich schlage Samstag vor. Hast du da Zeit?", reply: "Ja, Samstag passt gut. Wir können um neun Uhr fahren." },
        { hint: "Agree and ask", say: "Einverstanden! Wo treffen wir uns?", reply: "Am Bahnhof, vor dem Eingang." },
        { hint: "Disagree politely", say: "Tut mir leid, am Samstag habe ich keine Zeit. Geht auch Sonntag?", reply: "Ja, Sonntag ist auch gut." },
        { hint: "Decide", say: "Gut, dann treffen wir uns am Sonntag um neun Uhr am Bahnhof.", reply: "Perfekt, bis Sonntag!" },
      ],
    },
  ],
};

export const exams: Record<Level, LevelContent> = { a1, a2 };
export const levelOf = (s: string): LevelContent | undefined => (s === "a1" || s === "a2" ? exams[s] : undefined);

/* ============================== Email coach ============================== */
export type Phrase = { group: string; de: string; en: string; ta: string };
export const phrases: Phrase[] = [
  { group: "Greeting", de: "Liebe Rithika,", en: "Dear Rithika, (friend, woman)", ta: "அன்புள்ள ரித்திகா (தோழி)" },
  { group: "Greeting", de: "Lieber Akshay,", en: "Dear Akshay, (friend, man)", ta: "அன்புள்ள அக்ஷய் (நண்பர்)" },
  { group: "Greeting", de: "Sehr geehrte Frau Kavitha,", en: "Dear Ms Kavitha, (formal)", ta: "மதிப்பிற்குரிய திருமதி வெபர் (முறையாக)" },
  { group: "Greeting", de: "Sehr geehrter Herr Arvind,", en: "Dear Mr Arvind, (formal)", ta: "மதிப்பிற்குரிய திரு. பிரவுன் (முறையாக)" },
  { group: "Opening", de: "Vielen Dank für deine Einladung.", en: "Thank you for your invitation.", ta: "உன் அழைப்புக்கு மிக்க நன்றி." },
  { group: "Opening", de: "Wie geht es dir?", en: "How are you?", ta: "நீ எப்படி இருக்கிறாய்?" },
  { group: "Opening", de: "Ich habe Ihre Anzeige gelesen.", en: "I have read your advert.", ta: "உங்கள் விளம்பரத்தைப் படித்தேன்." },
  { group: "Main part", de: "Ich komme sehr gern.", en: "I would love to come.", ta: "நான் மகிழ்ச்சியுடன் வருகிறேன்." },
  { group: "Main part", de: "Leider kann ich nicht kommen, weil ich arbeiten muss.", en: "Unfortunately I cannot come because I have to work.", ta: "துரதிர்ஷ்டவசமாக வேலை இருப்பதால் வர முடியாது." },
  { group: "Main part", de: "Was soll ich mitbringen?", en: "What should I bring?", ta: "நான் என்ன கொண்டு வர வேண்டும்?" },
  { group: "Main part", de: "Wann hast du Zeit?", en: "When do you have time?", ta: "உனக்கு எப்போது நேரம் இருக்கிறது?" },
  { group: "Main part", de: "Können Sie mir bitte helfen?", en: "Could you help me, please?", ta: "தயவுசெய்து எனக்கு உதவ முடியுமா?" },
  { group: "Ending", de: "Ich freue mich auf dich.", en: "I am looking forward to seeing you.", ta: "உன்னைச் சந்திக்க ஆவலாக இருக்கிறேன்." },
  { group: "Ending", de: "Schreib mir bitte bald.", en: "Please write to me soon.", ta: "சீக்கிரம் எனக்கு எழுது." },
  { group: "Ending", de: "Vielen Dank für Ihre Antwort.", en: "Thank you for your answer. (formal)", ta: "உங்கள் பதிலுக்கு நன்றி (முறையாக)." },
  { group: "Sign-off", de: "Viele Grüße", en: "Best wishes (friendly)", ta: "அன்புடன்" },
  { group: "Sign-off", de: "Liebe Grüße", en: "Warm regards (close friend)", ta: "பாசத்துடன்" },
  { group: "Sign-off", de: "Mit freundlichen Grüßen", en: "Yours sincerely (formal)", ta: "மரியாதையுடன் (முறையாக)" },
];

export const emailSteps = [
  { n: 1, t: "Greeting", d: "Liebe / Lieber + first name for friends. Sehr geehrte / Sehr geehrter + Frau / Herr + surname for formal emails. Put a comma after it and start the next line with a small letter." },
  { n: 2, t: "Opening line", d: "One sentence that says why you write or thanks the person: Vielen Dank für …, Ich schreibe dir, weil …" },
  { n: 3, t: "The three points", d: "Answer each point of the task in its own sentence, in the same order as the task. Missing a point costs marks." },
  { n: 4, t: "Closing line", d: "A short wish or request: Ich freue mich auf dich. Schreib mir bitte bald." },
  { n: 5, t: "Sign-off and name", d: "Viele Grüße or Liebe Grüße (friends), Mit freundlichen Grüßen (formal), then your name on a new line." },
];
