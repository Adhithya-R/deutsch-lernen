// Conversation practice: a partner says something, you choose the reply that fits.
// Every turn has exactly one right reply. The right reply moves to a different place in each turn.
import type { Gender } from "./people.ts";
import { role, speaker } from "./people.ts";

export type Line = { de: string; en: string; ta: string };
export type Option = { de: string; en: string; ok: boolean };
export type Turn = { partner: Line; options: Option[] };
export type Scenario = {
  id: string;
  title: string;
  sub: string;
  level: "A1" | "A2";
  landmarks: [string, string];
  partner: { name: string; initial: string; gender: Gender };
  turns: Turn[];
};

const L = (de: string, en: string, ta: string): Line => ({ de, en, ta });

/** Builds a turn; the right reply goes to place `at` (0-2) so it is not always first. */
function turn(partner: Line, right: Line, wrong: [Line, Line], at: number): Turn {
  const options = [
    { ...wrong[0], ok: false },
    { ...wrong[1], ok: false },
  ];
  options.splice(at % 3, 0, { ...right, ok: true });
  return { partner, options: options.map((o) => ({ de: o.de, en: o.en, ok: o.ok })) };
}

export const scenarios: Scenario[] = [
  {
    id: "cafe",
    title: "In the café",
    sub: "Order a drink and pay",
    level: "A1",
    landmarks: ["TN002", "DE001"],
    partner: role("Die Kellnerin", "K", "f"),
    turns: [
      turn(L("Guten Tag! Was möchten Sie trinken?", "Good day! What would you like to drink?", "வணக்கம்! என்ன குடிக்க விரும்புகிறீர்கள்?"),
        L("Einen Kaffee, bitte.", "A coffee, please.", "ஒரு காபி, தயவுசெய்து."),
        [L("Ich bin Adhi.", "I am Adhi.", "நான் ஆதி."), L("Ja, gern, danke.", "Yes, gladly, thanks.", "ஆம், மகிழ்ச்சி, நன்றி.")], 0),
      turn(L("Möchten Sie auch etwas essen?", "Would you like something to eat too?", "சாப்பிடவும் ஏதாவது வேண்டுமா?"),
        L("Ja, ein Stück Kuchen, bitte.", "Yes, a piece of cake, please.", "ஆம், ஒரு துண்டு கேக், தயவுசெய்து."),
        [L("Nein, ich komme aus Indien.", "No, I come from India.", "இல்லை, நான் இந்தியாவிலிருந்து வருகிறேன்."), L("Der Kaffee ist heiß.", "The coffee is hot.", "காபி சூடாக உள்ளது.")], 1),
      turn(L("Das macht vier Euro fünfzig.", "That comes to four euros fifty.", "நான்கு யூரோ ஐம்பது சென்ட்."),
        L("Hier sind fünf Euro. Stimmt so.", "Here are five euros. Keep the change.", "இதோ ஐந்து யூரோ. மீதியை வைத்துக்கொள்ளுங்கள்."),
        [L("Ich habe einen Termin.", "I have an appointment.", "எனக்கு ஒரு நேரம் உள்ளது."), L("Wo ist der Bahnhof?", "Where is the station?", "ரயில் நிலையம் எங்கே?")], 2),
      turn(L("Vielen Dank! Einen schönen Tag noch!", "Thank you! Have a nice day!", "மிக்க நன்றி! இனிய நாளாகட்டும்!"),
        L("Danke, gleichfalls! Auf Wiedersehen.", "Thanks, the same to you! Goodbye.", "நன்றி, உங்களுக்கும்! போய் வருகிறேன்."),
        [L("Guten Morgen, Frau Doktor!", "Good morning, doctor!", "காலை வணக்கம் மருத்துவரே!"), L("Das ist zu teuer.", "That is too expensive.", "இது மிகவும் விலை அதிகம்.")], 0),
    ],
  },
  {
    id: "meeting",
    title: "Meeting a new classmate",
    sub: "Introduce yourself",
    level: "A1",
    landmarks: ["TN003", "DE003"],
    partner: speaker("Ram"),
    turns: [
      turn(L("Hallo! Ich bin Ram. Wie heißt du?", "Hello! I am Ram. What is your name?", "வணக்கம்! நான் ராம். உன் பெயர் என்ன?"),
        L("Hallo Ram, ich heiße Adhi.", "Hello Ram, my name is Adhi.", "வணக்கம் ராம், என் பெயர் ஆதி."),
        [L("Ich wohne in einem Haus.", "I live in a house.", "நான் ஒரு வீட்டில் வசிக்கிறேன்."), L("Mir geht es gut, danke.", "I am fine, thanks.", "நான் நலம், நன்றி.")], 0),
      turn(L("Woher kommst du?", "Where do you come from?", "நீ எங்கிருந்து வருகிறாய்?"),
        L("Ich komme aus Indien, aus Madurai.", "I come from India, from Madurai.", "நான் இந்தியாவிலிருந்து, மதுரையிலிருந்து வருகிறேன்."),
        [L("Ich bin fünfundzwanzig Jahre alt.", "I am twenty-five years old.", "எனக்கு இருபத்தைந்து வயது."), L("Ich spreche Tamil.", "I speak Tamil.", "நான் தமிழ் பேசுகிறேன்.")], 1),
      turn(L("Und was machst du in Berlin?", "And what do you do in Berlin?", "நீ பெர்லினில் என்ன செய்கிறாய்?"),
        L("Ich lerne Deutsch und ich arbeite.", "I learn German and I work.", "நான் ஜெர்மன் கற்கிறேன், வேலையும் செய்கிறேன்."),
        [L("Ich heiße Berlin.", "My name is Berlin.", "என் பெயர் பெர்லின்."), L("Ja, das ist schön.", "Yes, that is nice.", "ஆம், அது அழகு.")], 2),
      turn(L("Das ist toll! Wollen wir mal Kaffee trinken?", "That's great! Shall we have coffee sometime?", "அருமை! ஒருநாள் காபி குடிக்கலாமா?"),
        L("Ja, gern! Wann hast du Zeit?", "Yes, gladly! When do you have time?", "ஆம், மகிழ்ச்சி! உனக்கு எப்போது நேரம்?"),
        [L("Nein, ich bin Ram.", "No, I am Ram.", "இல்லை, நான் ராம்."), L("Ich komme aus Madurai.", "I come from Madurai.", "நான் மதுரையிலிருந்து வருகிறேன்.")], 0),
    ],
  },
  {
    id: "doctor",
    title: "At the doctor's",
    sub: "Describe how you feel",
    level: "A2",
    landmarks: ["TN011", "DE020"],
    partner: role("Die Ärztin", "Ä", "f"),
    turns: [
      turn(L("Guten Tag. Was fehlt Ihnen?", "Good day. What is wrong?", "வணக்கம். உங்களுக்கு என்ன பிரச்சினை?"),
        L("Ich habe Kopfschmerzen und Fieber.", "I have a headache and a fever.", "எனக்கு தலைவலியும் காய்ச்சலும் உள்ளது."),
        [L("Ich möchte einen Kaffee.", "I would like a coffee.", "எனக்கு ஒரு காபி வேண்டும்."), L("Mein Termin ist um zehn.", "My appointment is at ten.", "என் நேரம் பத்து மணிக்கு.")], 0),
      turn(L("Seit wann haben Sie die Schmerzen?", "Since when have you had the pain?", "எப்போதிருந்து வலி இருக்கிறது?"),
        L("Seit gestern Abend.", "Since yesterday evening.", "நேற்று மாலையிலிருந்து."),
        [L("Nächste Woche.", "Next week.", "அடுத்த வாரம்."), L("Mit dem Bus.", "By bus.", "பேருந்தில்.")], 1),
      turn(L("Haben Sie auch Husten?", "Do you have a cough too?", "இருமலும் இருக்கிறதா?"),
        L("Nein, nur ein bisschen Halsschmerzen.", "No, only a little sore throat.", "இல்லை, கொஞ்சம் தொண்டை வலி மட்டும்."),
        [L("Ja, ich wohne in Berlin.", "Yes, I live in Berlin.", "ஆம், நான் பெர்லினில் வசிக்கிறேன்."), L("Das ist mein Hund.", "That is my dog.", "இது என் நாய்.")], 2),
      turn(L("Sie sollen viel trinken und im Bett bleiben.", "You should drink a lot and stay in bed.", "நிறையக் குடித்து படுக்கையில் இருக்க வேண்டும்."),
        L("Danke. Muss ich Tabletten nehmen?", "Thanks. Do I have to take tablets?", "நன்றி. நான் மாத்திரைகள் எடுக்க வேண்டுமா?"),
        [L("Ich möchte eine Wohnung.", "I would like a flat.", "எனக்கு ஒரு வீடு வேண்டும்."), L("Gute Nacht!", "Good night!", "இனிய இரவு!")], 0),
    ],
  },
  {
    id: "station",
    title: "At the station",
    sub: "Buy a train ticket",
    level: "A2",
    landmarks: ["TN006", "DE018"],
    partner: role("Der Mitarbeiter", "M", "m"),
    turns: [
      turn(L("Guten Tag. Wie kann ich Ihnen helfen?", "Good day. How can I help you?", "வணக்கம். நான் உங்களுக்கு எப்படி உதவலாம்?"),
        L("Ich möchte eine Fahrkarte nach Hamburg, bitte.", "I would like a ticket to Hamburg, please.", "எனக்கு ஹாம்பர்க்குக்கு ஒரு பயணச்சீட்டு வேண்டும்."),
        [L("Ich habe Hunger.", "I am hungry.", "எனக்குப் பசிக்கிறது."), L("Ich wohne in Hamburg.", "I live in Hamburg.", "நான் ஹாம்பர்க்கில் வசிக்கிறேன்.")], 0),
      turn(L("Einfach oder hin und zurück?", "One way or return?", "ஒரு வழியா, போய் வரவா?"),
        L("Hin und zurück, bitte.", "Return, please.", "போய் வர, தயவுசெய்து."),
        [L("Um acht Uhr.", "At eight o'clock.", "எட்டு மணிக்கு."), L("Zwei Kilo.", "Two kilos.", "இரண்டு கிலோ.")], 1),
      turn(L("Das kostet neunundvierzig Euro.", "That costs forty-nine euros.", "நாற்பத்தொன்பது யூரோ."),
        L("Kann ich mit Karte bezahlen?", "Can I pay by card?", "அட்டையில் பணம் செலுத்தலாமா?"),
        [L("Ich bin müde.", "I am tired.", "நான் களைப்பாக இருக்கிறேன்."), L("Wo ist die Küche?", "Where is the kitchen?", "சமையலறை எங்கே?")], 2),
      turn(L("Ja, natürlich. Der Zug fährt um neun Uhr von Gleis vier.", "Yes, of course. The train leaves at nine from platform four.", "ஆம், நிச்சயமாக. ரயில் ஒன்பது மணிக்கு நான்காம் நடைமேடையில் புறப்படும்."),
        L("Vielen Dank! Hat der Zug Verspätung?", "Thank you! Is the train delayed?", "மிக்க நன்றி! ரயில் தாமதமா?"),
        [L("Ich möchte einen Tee.", "I would like a tea.", "எனக்கு ஒரு தேநீர் வேண்டும்."), L("Das Gleis ist blau.", "The platform is blue.", "நடைமேடை நீலம்.")], 0),
    ],
  },
  {
    id: "flat-call",
    title: "A phone call about a flat",
    sub: "Ask about rent and a viewing",
    level: "A2",
    landmarks: ["TN009", "DE007"],
    partner: speaker("Sudha"),
    turns: [
      turn(L("Hier ist Frau Sudha. Sie haben wegen der Wohnung angerufen?", "This is Ms Sudha. You called about the flat?", "நான் திருமதி சுதா. வீட்டைப் பற்றி அழைத்தீர்களா?"),
        L("Ja, guten Tag. Ist die Wohnung noch frei?", "Yes, good day. Is the flat still available?", "ஆம், வணக்கம். வீடு இன்னும் காலியாக உள்ளதா?"),
        [L("Nein, ich habe keine Zeit.", "No, I have no time.", "இல்லை, எனக்கு நேரம் இல்லை."), L("Ich möchte ein Brot.", "I would like a bread.", "எனக்கு ஒரு ரொட்டி வேண்டும்.")], 0),
      turn(L("Ja, sie ist noch frei. Sie hat zwei Zimmer und kostet 650 Euro.", "Yes, it is still free. It has two rooms and costs 650 euros.", "ஆம், காலியாக உள்ளது. இரண்டு அறைகள், 650 யூரோ."),
        L("Ist die Miete kalt oder warm?", "Is the rent cold or warm?", "வாடகை குளிர் வாடகையா, சூடு வாடகையா?"),
        [L("Ich komme aus Indien.", "I come from India.", "நான் இந்தியாவிலிருந்து வருகிறேன்."), L("Das ist ein Kuchen.", "That is a cake.", "இது ஒரு கேக்.")], 1),
      turn(L("Das ist die Warmmiete, mit Heizung.", "That is the warm rent, with heating.", "அது சூடு வாடகை, வெப்பமூட்டியுடன்."),
        L("Gut. Kann ich die Wohnung am Samstag besichtigen?", "Good. Can I view the flat on Saturday?", "சரி. சனிக்கிழமை வீட்டைப் பார்க்கலாமா?"),
        [L("Guten Appetit!", "Enjoy your meal!", "நல்ல பசியாறல்!"), L("Ich bin Ingenieur gewesen.", "I have been an engineer.", "நான் பொறியாளராக இருந்தேன்.")], 2),
      turn(L("Samstag um elf Uhr passt. Wie ist Ihr Name?", "Saturday at eleven suits me. What is your name?", "சனிக்கிழமை பதினொரு மணி சரி. உங்கள் பெயர் என்ன?"),
        L("Mein Name ist Adhi. Vielen Dank, bis Samstag!", "My name is Adhi. Thank you very much, until Saturday!", "என் பெயர் ஆதி. மிக்க நன்றி, சனிக்கிழமை சந்திப்போம்!"),
        [L("Ich wohne im Bett.", "I live in the bed.", "நான் படுக்கையில் வசிக்கிறேன்."), L("Auf dem Markt.", "At the market.", "சந்தையில்.")], 0),
    ],
  },
  {
    id: "office-help",
    title: "Asking a colleague for help",
    sub: "Polite requests at work",
    level: "A2",
    landmarks: ["TN005", "DE006"],
    partner: speaker("Sanjay"),
    turns: [
      turn(L("Hallo Adhi, hast du kurz Zeit?", "Hello Adhi, do you have a moment?", "வணக்கம் ஆதி, சற்று நேரம் இருக்கிறதா?"),
        L("Ja, natürlich. Was gibt es?", "Yes, of course. What is it?", "ஆம், நிச்சயமாக. என்ன விஷயம்?"),
        [L("Ich habe gestern gekocht.", "I cooked yesterday.", "நான் நேற்று சமைத்தேன்."), L("Der Chef ist nett.", "The boss is nice.", "முதலாளி நல்லவர்.")], 0),
      turn(L("Könntest du mir bitte mit dem Computer helfen?", "Could you please help me with the computer?", "கணினியில் எனக்கு உதவ முடியுமா?"),
        L("Ja, gern. Was ist das Problem?", "Yes, gladly. What is the problem?", "ஆம், மகிழ்ச்சி. என்ன பிரச்சினை?"),
        [L("Das Wetter ist heute schön.", "The weather is nice today.", "இன்று வானிலை நன்றாக உள்ளது."), L("Ich bin müde.", "I am tired.", "நான் களைப்பாக இருக்கிறேன்.")], 1),
      turn(L("Der Bildschirm bleibt schwarz.", "The screen stays black.", "திரை கருப்பாகவே இருக்கிறது."),
        L("Hast du den Stecker eingesteckt?", "Have you plugged it in?", "நீ பிளக்கைச் செருகினாயா?"),
        [L("Ich trinke gern Tee.", "I like drinking tea.", "எனக்கு தேநீர் குடிக்கப் பிடிக்கும்."), L("Das Büro ist groß.", "The office is big.", "அலுவலகம் பெரியது.")], 2),
      turn(L("Oh, der Stecker war raus! Vielen Dank, du hast mir sehr geholfen.", "Oh, the plug was out! Thank you, you helped me a lot.", "ஓ, பிளக் கழன்றிருந்தது! மிக்க நன்றி, நீ எனக்கு மிகவும் உதவினாய்."),
        L("Gern geschehen! Dafür sind Kollegen da.", "You're welcome! That is what colleagues are for.", "பரவாயில்லை! சக ஊழியர்கள் அதற்காகத்தான்."),
        [L("Ich habe keine Zeit.", "I have no time.", "எனக்கு நேரம் இல்லை."), L("Nein, das ist nicht richtig.", "No, that is not right.", "இல்லை, அது சரியல்ல.")], 0),
    ],
  },
];

export const scenarioById = (id: string) => scenarios.find((s) => s.id === id);
