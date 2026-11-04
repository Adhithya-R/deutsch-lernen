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
    "Always start with a greeting (Liebe Eva, Hallo Tom) and end with Viele Grüße and your name.",
    "In speaking, use short, clear sentences. Say “Entschuldigung, können Sie das bitte wiederholen?” if you do not understand.",
    "Practise telling the time and saying prices aloud. They come up again and again.",
  ],
  reading: [
    {
      id: "a1-r1",
      title: "Short messages",
      instruction: "Read the texts and answer the questions.",
      texts: [
        { label: "Message from Anna", lines: ["Hallo Tom,", "ich bin heute nicht zu Hause. Ich bin bis 18 Uhr im Büro.", "Der Schlüssel liegt bei Frau Keller.", "Bis später! Anna"] },
        { label: "Sign at a café", lines: ["Café Sonne", "Montag bis Freitag: 8–18 Uhr", "Samstag: 9–14 Uhr", "Sonntag: geschlossen"] },
        { label: "Email from Jan", lines: ["Liebe Maria,", "am Samstag mache ich eine Party. Sie beginnt um 19 Uhr.", "Bring bitte einen Salat mit.", "Viele Grüße", "Jan"] },
        { label: "Advertisement", lines: ["Zu vermieten", "2-Zimmer-Wohnung, 55 m², mit Küche, Bad und Balkon", "Miete: 620 Euro, ab 1. Dezember", "Telefon: 0170 555 0123"] },
      ],
      items: [
        { q: "Wo ist der Schlüssel?", options: ["Im Büro", "Bei Frau Keller", "Bei Anna"], answer: "Bei Frau Keller" },
        { q: "Am Samstag öffnet das Café um 8 Uhr.", options: TF, answer: "Falsch", tip: "Saturday: 9–14 Uhr." },
        { q: "Das Café ist am Sonntag …", options: ["offen", "geschlossen"], answer: "geschlossen" },
        { q: "Was soll Maria mitbringen?", options: ["Einen Salat", "Einen Kuchen", "Getränke"], answer: "Einen Salat" },
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
  ],
  listening: [
    {
      id: "a1-l1",
      title: "Short dialogues",
      instruction: "You hear three short texts. Listen and choose the answer. You may play each one twice.",
      clips: [
        { id: "1", label: "Text 1", segments: [{ voice: "f", text: "Entschuldigung, wo ist der Bahnhof?" }, { voice: "m", text: "Gehen Sie hier geradeaus und dann links. Der Bahnhof ist neben der Post." }] },
        { id: "2", label: "Text 2", segments: [{ voice: "m", text: "Guten Tag. Ich möchte zwei Brötchen und einen Kaffee, bitte." }, { voice: "f", text: "Gern. Das macht drei Euro zwanzig." }] },
        { id: "3", label: "Text 3", segments: [{ voice: "f", text: "Hallo Peter, hier ist Lisa. Wir treffen uns heute um Viertel nach sechs vor dem Kino. Bis später!" }] },
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
        { id: "3", label: "Text 3", segments: [{ voice: "m", text: "Wie heißen Sie?" }, { voice: "f", text: "Ich heiße Maria Lopez." }, { voice: "m", text: "Und woher kommen Sie?" }, { voice: "f", text: "Aus Spanien." }] },
      ],
      items: [
        { q: "Text 1: Von welchem Gleis fährt der Zug?", options: ["Gleis 3", "Gleis 5", "Gleis 10"], answer: "Gleis 5" },
        { q: "Text 2: Ein Kilo Äpfel kostet 1,90 Euro.", options: TF, answer: "Richtig" },
        { q: "Text 3: Woher kommt Maria?", options: ["Aus Spanien", "Aus Italien", "Aus Mexiko"], answer: "Aus Spanien" },
      ],
    },
  ],
  writing: {
    form: {
      id: "a1-form",
      title: "Fill in the form",
      situation: "You are Priya Krishnan, 25 years old. You come from India and live in Berlin. You speak Tamil and English. Fill in the registration form.",
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
        situation: "Sie schreiben an Ihre Freundin Eva. Sie möchten morgen zusammen einkaufen gehen.",
        points: ["Wann treffen Sie sich?", "Wo treffen Sie sich?", "Was möchten Sie kaufen?"],
        min: 20,
        max: 35,
        sample: "Liebe Eva, morgen möchte ich einkaufen. Treffen wir uns um 10 Uhr vor dem Supermarkt? Ich brauche Obst und Brot. Kommst du mit? Viele Grüße, Priya",
      },
      {
        id: "a1-w2",
        kind: "message",
        title: "Short message: an invitation",
        situation: "Sie laden Ihren Freund Tom zum Essen ein.",
        points: ["Wann ist das Essen?", "Wo ist das Essen?", "Was soll Tom mitbringen?"],
        min: 20,
        max: 35,
        sample: "Lieber Tom, am Samstag koche ich Reis und Curry. Kommst du um 19 Uhr zu mir nach Hause? Bring bitte ein Getränk mit. Ich freue mich! Liebe Grüße, Priya",
      },
    ],
  },
  speaking: [
    {
      title: "Part 1: Introduce yourself",
      how: "Say your name, age, country, city, languages, job and a hobby. Short, clear sentences are best.",
      cards: [
        { hint: "Your name", say: "Ich heiße Priya Krishnan.", sayVoice: "f" },
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
          label: "Email from Nina",
          lines: [
            "Liebe Katja,",
            "vielen Dank für deine Einladung zu deinem Geburtstag. Leider kann ich am Samstag nicht kommen, weil ich arbeiten muss.",
            "Aber am Sonntag habe ich Zeit. Hast du Lust, mit mir ins Museum zu gehen? Danach können wir Kaffee trinken.",
            "Liebe Grüße",
            "Nina",
          ],
        },
        {
          label: "Advertisement",
          lines: [
            "Fahrradwerkstatt Müller",
            "Wir reparieren alle Fahrräder schnell und günstig.",
            "Öffnungszeiten: Montag bis Freitag 9–17 Uhr, Samstag 9–13 Uhr",
            "Sie brauchen keinen Termin.",
            "Ab 50 Euro Reparaturkosten gibt es 10 % Rabatt.",
          ],
        },
      ],
      items: [
        { q: "Nina kommt am Samstag zu Katjas Geburtstag.", options: TF, answer: "Falsch" },
        { q: "Warum kann Nina am Samstag nicht kommen?", options: ["Sie ist krank.", "Sie muss arbeiten.", "Sie fährt weg."], answer: "Sie muss arbeiten.", tip: "“weil ich arbeiten muss”" },
        { q: "Was schlägt Nina vor?", options: ["Am Sonntag ins Museum gehen und Kaffee trinken", "Am Samstag einen Film sehen", "Am Sonntag zu Hause kochen"], answer: "Am Sonntag ins Museum gehen und Kaffee trinken" },
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
  ],
  listening: [
    {
      id: "a2-l1",
      title: "Phone message",
      instruction: "You hear a message on the phone. Listen and choose the answers. You may play it twice.",
      clips: [
        { id: "1", label: "Message", segments: [{ voice: "f", text: "Guten Tag, hier ist die Praxis von Doktor Wagner. Sie haben morgen um halb zehn einen Termin. Leider ist der Arzt krank. Können Sie bitte übermorgen um zehn Uhr kommen? Rufen Sie uns bitte zurück. Danke." }] },
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
  ],
  writing: {
    tasks: [
      {
        id: "a2-w1",
        kind: "message",
        title: "Part 1: a short note",
        situation: "Sie können morgen nicht zum Deutschkurs kommen. Schreiben Sie eine Nachricht an Ihre Lehrerin, Frau Weber.",
        points: ["Warum können Sie nicht kommen?", "Wann kommen Sie wieder?", "Bitten Sie um die Hausaufgaben."],
        min: 20,
        max: 40,
        sample: "Liebe Frau Weber, ich kann morgen leider nicht kommen, weil ich krank bin. Am Donnerstag komme ich wieder. Können Sie mir bitte die Hausaufgaben schicken? Vielen Dank! Viele Grüße, Priya",
      },
      {
        id: "a2-w2",
        kind: "email",
        title: "Part 2: a friendly email",
        situation: "Ihre Freundin Julia hat Sie zu ihrer Geburtstagsparty eingeladen. Schreiben Sie ihr eine E-Mail.",
        points: ["Bedanken Sie sich für die Einladung.", "Sagen Sie, ob Sie kommen, und warum.", "Fragen Sie, was Sie mitbringen sollen."],
        min: 30,
        max: 50,
        sample: "Liebe Julia, vielen Dank für die Einladung zu deiner Party! Ich komme sehr gern, weil ich dich lange nicht gesehen habe. Soll ich einen Kuchen oder Getränke mitbringen? Bitte schreib mir kurz. Viele Grüße, Priya",
      },
      {
        id: "a2-w3",
        kind: "email",
        title: "Part 2: a formal email",
        situation: "Sie suchen eine Wohnung und haben eine Anzeige gelesen. Schreiben Sie an den Vermieter, Herrn Braun.",
        points: ["Sagen Sie, warum Sie schreiben.", "Fragen Sie nach der Miete.", "Fragen Sie nach einem Besichtigungstermin."],
        min: 30,
        max: 55,
        sample: "Sehr geehrter Herr Braun, ich habe Ihre Anzeige im Internet gelesen und interessiere mich für die Wohnung. Wie hoch ist die Miete? Kann ich die Wohnung nächste Woche besichtigen? Vielen Dank für Ihre Antwort. Mit freundlichen Grüßen, Priya Krishnan",
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
  { group: "Greeting", de: "Liebe Julia,", en: "Dear Julia, (friend, woman)", ta: "அன்புள்ள ஜூலியா (தோழி)" },
  { group: "Greeting", de: "Lieber Tom,", en: "Dear Tom, (friend, man)", ta: "அன்புள்ள டாம் (நண்பர்)" },
  { group: "Greeting", de: "Sehr geehrte Frau Weber,", en: "Dear Ms Weber, (formal)", ta: "மதிப்பிற்குரிய திருமதி வெபர் (முறையாக)" },
  { group: "Greeting", de: "Sehr geehrter Herr Braun,", en: "Dear Mr Braun, (formal)", ta: "மதிப்பிற்குரிய திரு. பிரவுன் (முறையாக)" },
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
