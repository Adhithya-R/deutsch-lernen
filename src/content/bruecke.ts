// Brücke tab: topics with sub-sections. Each section puts Tamil Nadu next to Germany.
// Statements are general ("often", "many"): customs differ between families, cities and regions.
import type { Exercise } from "./lessons.ts";
import type { Mood } from "../lib/landmarks.ts";

export type Item = { big: string; text: string; ta?: string };
export type Section = { id: string; en: string; ta: string; tn: Item[]; de: Item[] };
export type Topic = {
  id: string;
  en: string;
  ta: string;
  blurb: string;
  sky: [string, string];
  mood: Mood;
  sections: Section[];
  quiz: Exercise[];
};

const i = (big: string, text: string, ta?: string): Item => ({ big, text, ta });

export const topics: Topic[] = [
  {
    id: "food",
    en: "Food",
    ta: "உணவு",
    blurb: "Breakfast, lunch and dinner on two plates.",
    sky: ["TN025", "DE016"],
    mood: "steam",
    sections: [
      {
        id: "breakfast", en: "Breakfast", ta: "காலை உணவு",
        tn: [i("Idli with sambar", "Soft steamed rice cakes, a classic start to the day."), i("Dosa and vada", "Crisp dosa and fried lentil vada with chutney."), i("Pongal", "Rice and lentils cooked with pepper and ghee."), i("Poori masala", "Puffed fried bread with potato curry, often a weekend treat.")],
        de: [i("das Brötchen", "A fresh bread roll, often with butter, jam, cheese or sausage.", "சிறிய ரொட்டி"), i("das Müsli", "Oats, nuts and fruit with milk or yoghurt.", "ஓட்ஸ் கலவை"), i("das Ei", "A boiled egg, often eaten at the weekend.", "முட்டை"), i("die Marmelade", "Fruit jam for bread.", "பழக்கூழ் (ஜாம்)")],
      },
      {
        id: "lunch", en: "Lunch", ta: "மதிய உணவு",
        tn: [i("Meals on a banana leaf", "Rice with sambar, rasam, curd, poriyal and pickle."), i("Biryani", "Spiced rice with meat or vegetables, popular for special days."), i("Curd rice", "Cool, simple and filling, often with pickle.")],
        de: [i("die Kartoffeln", "Potatoes, boiled, fried or mashed, with many main dishes.", "உருளைக்கிழங்கு"), i("die Nudeln", "Pasta with sauce, a quick lunch.", "பாஸ்தா"), i("die Suppe", "Soup, often the start of a meal.", "சூப்"), i("das Schnitzel", "A breaded, fried cutlet, a well-known German dish.", "பொரித்த இறைச்சி துண்டு")],
      },
      {
        id: "dinner", en: "Dinner", ta: "இரவு உணவு",
        tn: [i("Dosa or chapati", "A lighter meal with a curry or chutney."), i("Idiyappam", "Steamed rice-noodle string hoppers with coconut milk or kurma."), i("Rice and curry", "Many families eat together in the evening.")],
        de: [i("das Abendbrot", "Many Germans eat a cold evening meal of bread, cheese and cold cuts.", "இரவு ரொட்டி உணவு"), i("der Salat", "A fresh salad on the side.", "சாலட்"), i("der Käse", "Cheese, very common on bread.", "பாலாடைக்கட்டி"), i("die Wurst", "Sausage or cold cuts, often made from pork or beef.", "இறைச்சி தொத்திறைச்சி")],
      },
      {
        id: "snacks", en: "Snacks and drinks", ta: "சிற்றுண்டி, பானங்கள்",
        tn: [i("Filter kaapi", "Strong coffee with milk, served in a steel tumbler."), i("Murukku and sundal", "Crunchy snack and boiled chickpea snack."), i("Tender coconut", "A cool drink on a hot day.")],
        de: [i("Kaffee und Kuchen", "Coffee and cake in the afternoon, a loved habit.", "காபியும் கேக்கும்"), i("die Brezel", "A salty, knotted bread, popular in the south.", "முறுக்கு வடிவ ரொட்டி"), i("die Apfelschorle", "Apple juice mixed with sparkling water.", "ஆப்பிள் சாறு + சோடா"), i("das Mineralwasser", "Sparkling or still water, often bought in bottles.", "கனிம நீர்")],
      },
    ],
    quiz: [
      { q: "Which meal is often a cold meal of bread, cheese and cold cuts in Germany?", options: ["das Abendbrot", "das Frühstück", "das Mittagessen"], answer: "das Abendbrot" },
      { q: "What is a Brötchen?", options: ["a bread roll", "a soup", "a sweet drink"], answer: "a bread roll" },
      { q: "Which Tamil Nadu breakfast is made of steamed rice and lentil batter?", options: ["Idli", "Biryani", "Schnitzel"], answer: "Idli" },
    ],
  },
  {
    id: "manners",
    en: "Manners and culture",
    ta: "பழக்கவழக்கங்கள்",
    blurb: "Small habits that make a big difference.",
    sky: ["TN004", "DE003"],
    mood: "noon",
    sections: [
      {
        id: "greeting", en: "Greeting people", ta: "வாழ்த்துவது",
        tn: [i("Vanakkam", "Hands folded, a smile. A respectful greeting for everyone."), i("Using titles", "Elders are called anna, akka, uncle, aunty or sir/madam.")],
        de: [i("Guten Tag", "A handshake and eye contact with new people.", "வணக்கம்"), i("Sie und du", "Sie for strangers and officials, du for friends and children.", "மரியாதை / நட்பு வடிவம்"), i("Herr / Frau", "Use the title with the surname, for example Frau Meyer.", "திரு / திருமதி")],
      },
      {
        id: "time", en: "Time and meetings", ta: "நேரம், சந்திப்பு",
        tn: [i("Flexible time", "Starting a little later is often accepted at social events.")],
        de: [i("pünktlich", "On time is important for appointments, classes and work. Write or call if you are late.", "சரியான நேரத்தில்"), i("der Termin", "An appointment, often booked in advance.", "முன்பதிவு நேரம்")],
      },
      {
        id: "home", en: "Visiting a home", ta: "வீட்டுக்குச் செல்லுதல்",
        tn: [i("Shoes outside", "You take your shoes off before entering a home."), i("Always a drink", "Guests are offered tea, water or a snack straight away.")],
        de: [i("anmelden", "Announce your visit first. Dropping in without a call is less usual.", "முன்பே தெரிவி"), i("das Gastgeschenk", "Flowers or sweets are a nice gift for the host.", "விருந்தினர் பரிசு"), i("die Ruhezeit", "Quiet hours at night and on Sundays: no loud music or drilling.", "அமைதி நேரம்")],
      },
      {
        id: "table", en: "At the table", ta: "உணவு மேசையில்",
        tn: [i("Eating by hand", "Many people eat rice dishes with the right hand."), i("Second helpings", "Hosts keep serving. Saying no politely may take a few tries.")],
        de: [i("das Besteck", "Knife and fork are normal. Wait until everyone has food, then say Guten Appetit.", "கத்தி, முள்கரண்டி"), i("Prost!", "Cheers! Look at each person as you clink glasses.", "வாழ்த்துகள்!")],
      },
    ],
    quiz: [
      { q: "How do you greet a stranger or an official in Germany?", options: ["With Sie and a handshake", "With du and a hug", "With a wave only"], answer: "With Sie and a handshake" },
      { q: "What should you do if you will be late to an appointment in Germany?", options: ["Call or write early", "Say nothing", "Skip it"], answer: "Call or write early" },
      { q: "What is die Ruhezeit?", options: ["Quiet hours", "Lunch break", "Opening hours"], answer: "Quiet hours" },
    ],
  },
  {
    id: "daily-life",
    en: "Day-to-day life",
    ta: "அன்றாட வாழ்க்கை",
    blurb: "From the first alarm to the last light.",
    sky: ["TN006", "DE017"],
    mood: "dawn",
    sections: [
      {
        id: "morning", en: "Morning", ta: "காலை",
        tn: [i("Early start", "Many families get up early. The day may begin with a bath and a prayer.")],
        de: [i("aufstehen", "To get up. Many people leave for work or school early.", "எழுந்திரு"), i("das Frühstück", "Breakfast, often with bread, coffee or tea.", "காலை உணவு")],
      },
      {
        id: "work-school", en: "Work and school", ta: "வேலை, பள்ளி",
        tn: [i("Long school day", "School often has uniforms, assemblies and homework.")],
        de: [i("die Schule", "School usually ends around lunchtime, then the afternoon is free.", "பள்ளி"), i("die Pause", "A break. Breaks are respected at work.", "இடைவேளை"), i("Feierabend", "The end of the working day. Private time is protected.", "வேலை முடிந்த நேரம்")],
      },
      {
        id: "shopping-hours", en: "Shops and Sundays", ta: "கடைகள், ஞாயிறு",
        tn: [i("Open late", "Small shops are often open for long hours, also on weekends.")],
        de: [i("Sonntag", "Most shops are closed on Sundays. Plan your shopping for Saturday.", "ஞாயிறு"), i("der Supermarkt", "Supermarkets usually close in the evening.", "பேரங்காடி")],
      },
      {
        id: "recycling", en: "Rubbish and recycling", ta: "குப்பை, மறுசுழற்சி",
        tn: [i("Collection", "Rubbish is collected from the door or a nearby point.")],
        de: [i("das Pfand", "A small deposit on bottles. Return them to a machine in the shop.", "பாட்டில் வைப்புத்தொகை"), i("der Müll", "Rubbish is separated into bins: paper, packaging, bio and rest.", "குப்பை")],
      },
    ],
    quiz: [
      { q: "What is true about Sundays in Germany?", options: ["Most shops are closed", "All shops are open", "Only banks are open"], answer: "Most shops are closed" },
      { q: "What do you get back when you return bottles with Pfand?", options: ["A small deposit", "A free drink", "A ticket"], answer: "A small deposit" },
      { q: "What does Feierabend mean?", options: ["End of the working day", "A party", "A holiday"], answer: "End of the working day" },
    ],
  },
  {
    id: "transport",
    en: "Transport",
    ta: "போக்குவரத்து",
    blurb: "Auto, bus and train, then Bahn, Rad and Bus.",
    sky: ["TN011", "DE018"],
    mood: "balloons",
    sections: [
      {
        id: "city", en: "In the city", ta: "நகரத்தில்",
        tn: [i("Auto-rickshaw", "A three-wheeler for short rides, often agreed by price or meter."), i("City bus", "Buses are everywhere and cheap."), i("Suburban train", "In Chennai the suburban train and metro are used by many.")],
        de: [i("die U-Bahn / S-Bahn", "Underground and city trains in big cities.", "நகர ரயில்"), i("die Straßenbahn", "A tram on rails in the street.", "டிராம்"), i("der Bus", "Buses run on a timetable and are usually punctual.", "பேருந்து"), i("das Fahrrad", "Cycling is very common, with bike lanes.", "மிதிவண்டி")],
      },
      {
        id: "tickets", en: "Tickets", ta: "டிக்கெட்",
        tn: [i("Ticket from the conductor", "On many buses you buy a ticket on board.")],
        de: [i("die Fahrkarte", "A ticket. Buy it before you travel.", "பயணச்சீட்டு"), i("entwerten", "Stamp or validate paper tickets if needed. Ticket checks happen on board.", "சீட்டில் முத்திரை இடு"), i("das Deutschlandticket", "A monthly ticket for local and regional transport across the country.", "மாதாந்திர பயண அட்டை")],
      },
      {
        id: "far", en: "Long distance", ta: "நீண்ட பயணம்",
        tn: [i("Indian Railways", "Reserve seats ahead for long journeys. Many travel overnight.")],
        de: [i("der ICE", "A fast long-distance train. Book early for cheaper fares.", "அதிவேக ரயில்"), i("die Verspätung", "Delay. Trains are sometimes late, so check the app.", "தாமதம்"), i("das Gleis", "The platform number, shown on the board.", "நடைமேடை")],
      },
      {
        id: "road", en: "On the road", ta: "சாலையில்",
        tn: [i("Left-hand traffic", "In India vehicles drive on the left.")],
        de: [i("rechts fahren", "In Germany vehicles drive on the right.", "வலது புறம் செல்")],
      },
    ],
    quiz: [
      { q: "Which side of the road do vehicles use in Germany?", options: ["Right", "Left", "Either"], answer: "Right" },
      { q: "What is die Fahrkarte?", options: ["a ticket", "a platform", "a delay"], answer: "a ticket" },
      { q: "What does die Verspätung mean?", options: ["delay", "arrival", "platform"], answer: "delay" },
    ],
  },
  {
    id: "clothing",
    en: "Clothing",
    ta: "உடைகள்",
    blurb: "From silk sarees to winter jackets.",
    sky: ["TN001", "DE004"],
    mood: "evening",
    sections: [
      {
        id: "everyday", en: "Everyday wear", ta: "அன்றாட உடை",
        tn: [i("Saree and salwar", "Many women wear sarees, salwar kameez or modern clothes."), i("Shirt and veshti", "Men wear shirts with pants or a veshti, and jeans in cities.")],
        de: [i("die Jeans", "Jeans and a T-shirt are common for many people.", "ஜீன்ஸ்"), i("das Hemd", "A shirt.", "சட்டை"), i("das Kleid", "A dress.", "கவுன்")],
      },
      {
        id: "festival-dress", en: "Festival clothes", ta: "விழா உடைகள்",
        tn: [i("Silk saree and veshti", "New clothes are common for Pongal and Deepavali.")],
        de: [i("das Dirndl", "A traditional dress, worn mostly in Bavaria, for example at Oktoberfest.", "பாரம்பரிய பெண்கள் உடை"), i("die Lederhose", "Traditional leather trousers worn in Bavaria.", "பாரம்பரிய ஆண்கள் கால்சட்டை")],
      },
      {
        id: "weather-wear", en: "Clothes for the weather", ta: "வானிலைக்கான உடை",
        tn: [i("Light cotton", "Cotton keeps you cool in the heat.")],
        de: [i("die Jacke", "A jacket. The weather changes, so carry one.", "ஜாக்கெட்"), i("die Mütze", "A woolly hat for winter.", "குளிர் தொப்பி"), i("der Schal", "A scarf.", "கழுத்துப்பட்டை"), i("die Handschuhe", "Gloves.", "கையுறைகள்")],
      },
    ],
    quiz: [
      { q: "What is a Mütze?", options: ["a woolly hat", "a scarf", "gloves"], answer: "a woolly hat" },
      { q: "Where is the Dirndl mostly worn?", options: ["Bavaria", "Hamburg", "Berlin"], answer: "Bavaria" },
      { q: "What does die Jacke mean?", options: ["jacket", "shirt", "dress"], answer: "jacket" },
    ],
  },
  {
    id: "festivals",
    en: "Festivals",
    ta: "திருவிழாக்கள்",
    blurb: "Harvest, lights and new beginnings.",
    sky: ["TN008", "DE005"],
    mood: "festival",
    sections: [
      {
        id: "harvest", en: "Harvest", ta: "அறுவடை",
        tn: [i("Pongal", "A January harvest festival. Rice is cooked in a pot until it boils over.")],
        de: [i("das Erntedankfest", "A thanksgiving for the harvest in autumn, often in churches.", "அறுவடை நன்றி விழா")],
      },
      {
        id: "lights", en: "Lights", ta: "ஒளி",
        tn: [i("Deepavali", "Lamps, sweets, new clothes and fireworks.")],
        de: [i("der Weihnachtsmarkt", "Christmas markets with lights, Glühwein and sweets from late November.", "கிறிஸ்துமஸ் சந்தை"), i("der Lebkuchen", "Spiced gingerbread, a Christmas treat.", "மசாலா இனிப்பு ரொட்டி")],
      },
      {
        id: "new-year", en: "New Year", ta: "புத்தாண்டு",
        tn: [i("Puthandu", "Tamil New Year in April. Families eat special food, including mango pachadi.")],
        de: [i("Silvester", "New Year's Eve on 31 December, with fireworks and friends.", "ஆண்டு இறுதி இரவு")],
      },
      {
        id: "spring", en: "Spring and colours", ta: "வசந்தம், வண்ணம்",
        tn: [i("Kolam", "Rice-flour patterns drawn at the door.")],
        de: [i("Ostern", "Easter in spring, with painted eggs.", "ஈஸ்டர்"), i("das Osterei", "A painted Easter egg.", "வண்ணம் தீட்டிய முட்டை")],
      },
    ],
    quiz: [
      { q: "Which German event has lights, Glühwein and sweets in December?", options: ["der Weihnachtsmarkt", "Ostern", "das Erntedankfest"], answer: "der Weihnachtsmarkt" },
      { q: "What is Silvester?", options: ["New Year's Eve", "Easter", "A harvest day"], answer: "New Year's Eve" },
      { q: "Which festival is called Tamil New Year?", options: ["Puthandu", "Pongal", "Deepavali"], answer: "Puthandu" },
    ],
  },
  {
    id: "housing",
    en: "Housing",
    ta: "வீடு",
    blurb: "Courtyards, flats and the Kaution.",
    sky: ["TN009", "DE007"],
    mood: "snow",
    sections: [
      {
        id: "types", en: "Kinds of homes", ta: "வீடுகளின் வகைகள்",
        tn: [i("Independent house", "Many families live in their own house or in a flat with relatives nearby.")],
        de: [i("die Mietwohnung", "A rented flat. Most people in cities rent.", "வாடகை வீடு"), i("das Haus", "A house, more common outside big cities.", "வீடு"), i("die WG", "A shared flat, common for students.", "பகிர்வு வீடு")],
      },
      {
        id: "rent", en: "Rent and deposit", ta: "வாடகை, வைப்புத்தொகை",
        tn: [i("Advance deposit", "A deposit is usual, often several months of rent.")],
        de: [i("die Kaltmiete", "Rent without heating.", "வெப்பம் இல்லாத வாடகை"), i("die Warmmiete", "Rent including heating and other costs.", "வெப்பம் உட்பட வாடகை"), i("die Kaution", "A deposit, often up to three months of cold rent.", "வைப்புத்தொகை")],
      },
      {
        id: "heat", en: "Heating and air", ta: "வெப்பம், காற்று",
        tn: [i("Fans and AC", "Keeping cool is the main need.")],
        de: [i("die Heizung", "Heating. Winters are cold, so check it.", "சூடாக்கி"), i("lüften", "Open the window wide for a few minutes, several times a day.", "காற்றோட்டம் விடு")],
      },
    ],
    quiz: [
      { q: "What is die Kaution?", options: ["a deposit", "a rent increase", "a key"], answer: "a deposit" },
      { q: "What is the difference between Kaltmiete and Warmmiete?", options: ["Warmmiete includes heating", "Kaltmiete includes heating", "No difference"], answer: "Warmmiete includes heating" },
      { q: "What does die WG mean?", options: ["a shared flat", "a garden", "a garage"], answer: "a shared flat" },
    ],
  },
  {
    id: "school",
    en: "School and learning",
    ta: "கல்வி",
    blurb: "Marks, grades and teachers.",
    sky: ["TN002", "DE010"],
    mood: "noon",
    sections: [
      {
        id: "teachers", en: "Teachers", ta: "ஆசிரியர்கள்",
        tn: [i("Sir and madam", "Teachers are called sir or madam.")],
        de: [i("Frau / Herr", "Use the title with the surname. Some schools and adult classes use first names.", "திருமதி / திரு"), i("die Lehrerin / der Lehrer", "Female teacher / male teacher.", "ஆசிரியை / ஆசிரியர்")],
      },
      {
        id: "marks", en: "Marks and grades", ta: "மதிப்பெண்கள்",
        tn: [i("Marks and percentage", "Results are given in marks and percentages.")],
        de: [i("die Note", "Grades run from 1 (very good) to 6 (insufficient).", "மதிப்பெண் தரம்"), i("bestanden", "Passed.", "தேர்ச்சி பெற்றது")],
      },
      {
        id: "language", en: "Language", ta: "மொழி",
        tn: [i("Tamil and English", "Many students learn in Tamil or English, with Hindi or another language as a subject.")],
        de: [i("der Deutschkurs", "A German course. Speaking in class is part of learning.", "ஜெர்மன் வகுப்பு"), i("die Hausaufgabe", "Homework.", "வீட்டுப்பாடம்")],
      },
    ],
    quiz: [
      { q: "Which grade is the best in Germany?", options: ["1", "6", "3"], answer: "1" },
      { q: "What is die Hausaufgabe?", options: ["homework", "a test", "a break"], answer: "homework" },
      { q: "What does bestanden mean?", options: ["passed", "failed", "absent"], answer: "passed" },
    ],
  },
  {
    id: "weather",
    en: "Weather and seasons",
    ta: "வானிலை",
    blurb: "Monsoon on one side, four seasons on the other.",
    sky: ["TN003", "DE001"],
    mood: "rain",
    sections: [
      {
        id: "seasons", en: "Seasons", ta: "பருவங்கள்",
        tn: [i("Hot, rainy, cooler", "Summer is hot, the northeast monsoon brings rain from October to December.")],
        de: [i("der Frühling", "Spring.", "வசந்தம்"), i("der Sommer", "Summer.", "கோடை"), i("der Herbst", "Autumn.", "இலையுதிர் காலம்"), i("der Winter", "Winter.", "குளிர்காலம்")],
      },
      {
        id: "rain-snow", en: "Rain and snow", ta: "மழை, பனி",
        tn: [i("Monsoon rain", "Heavy rain can come quickly.")],
        de: [i("der Regen", "Rain can come in any season. Take an umbrella.", "மழை"), i("der Schnee", "Snow in winter in many places.", "பனி"), i("der Regenschirm", "An umbrella.", "குடை")],
      },
      {
        id: "light", en: "Daylight", ta: "பகல் ஒளி",
        tn: [i("Even days", "Sunrise and sunset stay close to the same time all year.")],
        de: [i("hell / dunkel", "Summer days are long, winter days are short and dark.", "ஒளி / இருள்"), i("die Sommerzeit", "Clocks move forward one hour in spring.", "கோடை நேரம்")],
      },
    ],
    quiz: [
      { q: "What does der Herbst mean?", options: ["autumn", "spring", "summer"], answer: "autumn" },
      { q: "What do you take for rain?", options: ["der Regenschirm", "der Schal", "die Brezel"], answer: "der Regenschirm" },
      { q: "In German winters the days are usually…", options: ["short and dark", "long and bright", "the same as in summer"], answer: "short and dark" },
    ],
  },
  {
    id: "money",
    en: "Shopping and money",
    ta: "கடை, பணம்",
    blurb: "Fixed prices, cards and Pfand.",
    sky: ["TN017", "DE019"],
    mood: "balloons",
    sections: [
      {
        id: "paying", en: "Paying", ta: "பணம் செலுத்துதல்",
        tn: [i("UPI and cash", "UPI on the phone is everywhere, cash too.")],
        de: [i("bar", "In cash. Many places in Germany still prefer cash.", "பணமாக"), i("die Karte", "By card. Ask before: Kann ich mit Karte zahlen?", "அட்டை"), i("das Konto", "A bank account is needed for rent and salary.", "வங்கிக் கணக்கு")],
      },
      {
        id: "bargain", en: "Prices", ta: "விலை",
        tn: [i("Bargaining", "At markets a little bargaining is normal.")],
        de: [i("der Festpreis", "Fixed price. Do not bargain in shops.", "நிலையான விலை"), i("der Rabatt", "A discount, shown on signs.", "தள்ளுபடி")],
      },
      {
        id: "bags", en: "Bags and bottles", ta: "பைகள், பாட்டில்கள்",
        tn: [i("Cloth bag", "Many people carry a cloth bag.")],
        de: [i("die Tüte", "A bag. Bags cost a few cents, so bring your own.", "பை"), i("der Kassenzettel", "The receipt. Keep it for returns.", "ரசீது")],
      },
    ],
    quiz: [
      { q: "How do you ask to pay by card?", options: ["Kann ich mit Karte zahlen?", "Wo ist die Karte?", "Ich bin die Karte."], answer: "Kann ich mit Karte zahlen?" },
      { q: "What is der Festpreis?", options: ["a fixed price", "a festival", "a free gift"], answer: "a fixed price" },
      { q: "What is der Kassenzettel?", options: ["the receipt", "the bag", "the cash"], answer: "the receipt" },
    ],
  },
];

export const topicById = (id: string) => topics.find((t) => t.id === id);
