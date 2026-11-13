import type { Bilingual } from "@/content/lessons";

export type GrammarGuide = {
  foundation?: Bilingual;
  steps: Bilingual[];
  table: Bilingual;
  mistake: Bilingual;
};

/** A consistent, from-the-ground-up guide for every grammar lesson. */
export const grammarGuides: Record<string, GrammarGuide> = {
  pronouns: {
    foundation: { en: "A German sentence usually names who does the action. A personal pronoun is a short word that stands in for that person: ‘Mia learns’ becomes ‘she learns’. German pronouns also tell you who the verb must agree with.", ta: "ஜெர்மன் வாக்கியத்தில் செயலைச் செய்பவர் யார் என்று வரும். Personal pronoun என்பது அந்தப் பெயருக்குப் பதிலாக வரும் சிறிய சொல்: ‘Mia learns’ என்பதில் ‘she’ பெயருக்குப் பதிலாகும். எந்த verb வடிவம் வேண்டும் என்பதையும் இது தீர்மானிக்கிறது." },
    steps: [
      { en: "First find the subject: who is doing or being something? The pronoun replaces that person or thing, so you do not repeat the name.", ta: "முதலில் எழுவாயைக் கண்டுபிடிக்கவும்: செயலைச் செய்பவர் அல்லது இருப்பவர் யார்? பெயரை மீண்டும் சொல்லாமல் அதற்குப் பதிலாக pronoun பயன்படுத்தவும்." },
      { en: "Use ich for yourself, du for one person you know well, ihr for several familiar people, and Sie for one or more people you address formally.", ta: "உங்களைப் பற்றி ich; நெருக்கமான ஒருவரிடம் du; நெருக்கமான பலரிடம் ihr; மரியாதையாக ஒருவரிடமோ பலரிடமோ Sie பயன்படுத்தவும்." },
      { en: "Match er, sie or es to the German noun’s grammatical gender. It does not always match a person’s real-world gender; the noun’s article is the clue.", ta: "er, sie, es ஆகியவை ஜெர்மன் பெயர்ச்சொல்லின் இலக்கணப் பாலுடன் பொருந்தும். நிஜ உலகப் பாலுடன் எப்போதும் பொருந்தாது; பெயர்ச்சொல்லின் article வழிகாட்டும்." },
    ],
    table: { en: "Read the first column as the person speaking or being addressed. The same spelling sie can mean ‘she’ or ‘they’; the verb and context tell you which. Capitalized Sie is always formal ‘you’." , ta: "முதல் நெடுவரிசை பேசுபவர் அல்லது யாரிடம் பேசுகிறோம் என்பதைக் காட்டும். சிறிய sie என்பது ‘அவள்’ அல்லது ‘அவர்கள்’; வினையும் சூழலும் பொருளைக் காட்டும். பெரிய Sie எப்போதும் மரியாதையான ‘நீங்கள்’." },
    mistake: { en: "Do not confuse ihr (you plural, informal) with Sie (formal you) or sie (she/they). Check capitalization and the verb ending.", ta: "ihr (நெருக்கமான பலர்), Sie (மரியாதை) மற்றும் sie (அவள்/அவர்கள்) ஆகியவற்றைக் குழப்ப வேண்டாம். பெரிய எழுத்தையும் வினை முடிவையும் கவனிக்கவும்." },
  },
  "sein-haben": {
    steps: [
      { en: "Use sein to identify someone, describe a condition or say where someone is: Ich bin Adhi; Wir sind müde; Sie ist in Berlin.", ta: "அடையாளம், நிலை அல்லது இருப்பிடத்துக்கு sein: Ich bin Adhi; Wir sind müde; Sie ist in Berlin." },
      { en: "Use haben for possession and common German expressions such as Hunger, Durst, Zeit and Angst. English may use ‘be’, but German says haben.", ta: "உடைமைக்கும் Hunger, Durst, Zeit, Angst போன்ற வழக்கமான சொற்களுக்கும் haben. ஆங்கிலத்தில் ‘be’ வந்தாலும் ஜெர்மனியில் haben வரும்." },
      { en: "Choose the form from the subject, not from the noun that follows. Learn the irregular forms as pairs: ich bin, du bist, er ist; ich habe, du hast, er hat.", ta: "பின்னால் வரும் பெயர்ச்சொல்லை அல்ல, எழுவாயைப் பார்த்து வினை வடிவத்தைத் தேர்ந்தெடுக்கவும். ஒழுங்கற்ற வடிவங்களை ஜோடியாகக் கற்றுக்கொள்ளுங்கள்: ich bin, du bist, er ist; ich habe, du hast, er hat." },
    ],
    table: { en: "Each row is one subject. Read down a verb column to see how its form changes; wir and sie/Sie use the infinitive-looking forms sind and haben, not the infinitives themselves in every case.", ta: "ஒவ்வொரு வரியும் ஒரு எழுவாயைக் காட்டும். வினை நெடுவரிசையில் கீழே படித்தால் வடிவ மாற்றம் தெரியும்; wir மற்றும் sie/Sie உடன் sind, haben வரும்." },
    mistake: { en: "Do not use ist with wir or sind with ich. Also say Ich habe Hunger, not the English-shaped ‘Ich bin Hunger’.", ta: "wir உடன் ist அல்லது ich உடன் sind பயன்படுத்த வேண்டாம். மேலும் ‘Ich bin Hunger’ அல்ல, ‘Ich habe Hunger’ என்பதே சரி." },
  },
  "regular-verbs": {
    steps: [
      { en: "Start with the infinitive, such as lernen. Remove -en to find the stem: lern-.", ta: "lernen போன்ற infinitive-இல் தொடங்கவும். -en நீக்கினால் stem கிடைக்கும்: lern-." },
      { en: "Add the ending that matches the subject: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en.", ta: "எழுவாய்க்குப் பொருந்தும் முடிவைச் சேர்க்கவும்: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en." },
      { en: "If the stem ends in -d or -t, add an e before some endings to make pronunciation easier: du arbeitest, er arbeitet. The ending still identifies the subject.", ta: "stem -d அல்லது -t இல் முடிந்தால் உச்சரிக்க எளிதாக சில முடிவுகளுக்கு முன் e சேர்க்கவும்: du arbeitest, er arbeitet. முடிவுதான் எழுவாயைக் காட்டும்." },
    ],
    table: { en: "The ending column is the reusable rule. Compare it with the two example verbs: arbeiten needs an extra e after its -t stem, while lernen does not.", ta: "Ending நெடுவரிசை மீண்டும் பயன்படுத்தும் விதி. எடுத்துக்காட்டுகளை ஒப்பிடுங்கள்: arbeiten-இன் -t stem காரணமாக கூடுதல் e வரும்; lernen-க்கு வராது." },
    mistake: { en: "Do not add an ending to the whole infinitive. Remove -en first: lern + st = lernst, not lernenst.", ta: "முழு infinitive-க்கு நேரடியாக முடிவைச் சேர்க்க வேண்டாம். முதலில் -en நீக்கவும்: lern + st = lernst; lernenst அல்ல." },
  },
  "sentence-order": {
    steps: [
      { en: "In a normal statement, put the conjugated verb in position 2. Position means a sentence element, not necessarily the second written word.", ta: "சாதாரண கூற்றில் conjugated verb-ஐ இரண்டாம் இடத்தில் வைக்கவும். இடம் என்பது வாக்கியப் பகுதி; எழுதப்பட்ட இரண்டாவது சொல்லாகவே இருக்க வேண்டியதில்லை." },
      { en: "The subject can be first: Ich lerne heute. Or another element can be first: Heute lerne ich. When that happens, move the subject after the verb.", ta: "எழுவாய் முதலில் வரலாம்: Ich lerne heute. அல்லது வேறு பகுதி முதலில் வரலாம்: Heute lerne ich. அப்போது எழுவாய் வினைக்குப் பிறகு வரும்." },
      { en: "Keep the rest of the sentence after the subject. A time word can move to the front, but the verb stays in position 2.", ta: "மீதமுள்ள பகுதியை எழுவாய்க்குப் பின் வைக்கவும். நேரச் சொல் முன் வந்தாலும் வினை இரண்டாம் இடத்திலேயே இருக்கும்." },
    ],
    table: { en: "The rows show two valid orders for the same message. Count the first element as one slot: Heute is slot 1, lerne slot 2, and ich follows the verb.", ta: "ஒரே கருத்துக்கான இரண்டு சரியான வரிசைகள் இவை. Heute முதல் இடம், lerne இரண்டாம் இடம், ich வினைக்குப் பின் வருகிறது." },
    mistake: { en: "Do not leave the subject before the verb after putting a time or place first: ‘Heute ich lerne’ is incorrect.", ta: "நேரம் அல்லது இடத்தை முன் வைத்த பிறகும் எழுவாயை வினைக்கு முன் விட வேண்டாம்: ‘Heute ich lerne’ தவறு." },
  },
  questions: {
    steps: [
      { en: "Decide whether you need information or a yes/no answer. Information questions use a question word; yes/no questions do not.", ta: "தகவல் பதிலா, ஆம்/இல்லை பதிலா என்று முடிவுசெய்யவும். தகவல் கேள்விக்கு கேள்விச்சொல்; ஆம்/இல்லை கேள்விக்கு அது தேவையில்லை." },
      { en: "For a W-question, use question word + conjugated verb + subject: Wo wohnst du? The question word replaces the information you are asking for.", ta: "W-கேள்வியில் கேள்விச்சொல் + conjugated verb + எழுவாய்: Wo wohnst du? கேட்கும் தகவலுக்குப் பதிலாக கேள்விச்சொல் வருகிறது." },
      { en: "For a yes/no question, put the verb first: Wohnst du in Chennai? The answer can begin with Ja or Nein.", ta: "ஆம்/இல்லை கேள்வியில் வினையை முதலில் வைக்கவும்: Wohnst du in Chennai? பதில் Ja அல்லது Nein என்று தொடங்கலாம்." },
    ],
    table: { en: "Choose the question word by the answer you expect: Wo asks for a place, Woher for origin, Wohin for destination, Wann for time, and Warum for a reason.", ta: "எதிர்பார்க்கும் பதிலைப் பார்த்து கேள்விச்சொல்லைத் தேர்ந்தெடுக்கவும்: இடம் Wo, தோற்றம் Woher, செல்லும் இடம் Wohin, நேரம் Wann, காரணம் Warum." },
    mistake: { en: "Do not put the subject before the verb in a yes/no question. Say Kommst du …?, not Du kommst …? when asking.", ta: "ஆம்/இல்லை கேள்வியில் எழுவாயை வினைக்கு முன் வைக்க வேண்டாம். கேள்வியாக Kommst du …? என்பதே சரி; Du kommst …? அல்ல." },
  },
  negation: {
    steps: [
      { en: "Ask what is being denied. If it is a noun that would use ein/eine or no article, use kein and give it the ending of ein.", ta: "எதை மறுக்கிறோம் என்று பாருங்கள். ein/eine அல்லது article இல்லாத பெயர்ச்சொல் என்றால் kein பயன்படுத்தி ein-இன் முடிவைச் சேர்க்கவும்." },
      { en: "Use nicht to negate a verb, adjective, adverb, or a noun with a definite article: Ich komme nicht; Das Auto ist nicht neu; Ich sehe den Mann nicht.", ta: "வினை, பெயரடை, வினையடை அல்லது definite article கொண்ட பெயர்ச்சொல்லை மறுக்க nicht: Ich komme nicht; Das Auto ist nicht neu; Ich sehe den Mann nicht." },
      { en: "Decline kein like ein: masculine Akkusativ becomes keinen, feminine Nominativ becomes keine, and so on.", ta: "kein-ஐ ein போல மாற்றவும்: ஆண்பால் Akkusativ-இல் keinen; பெண்பால் Nominativ-இல் keine போன்றவை." },
    ],
    table: { en: "The rows show grammatical gender; the columns show case. Find both before choosing the kein ending. For example, masculine + Akkusativ gives keinen.", ta: "வரிகள் இலக்கணப் பாலையும் நெடுவரிசைகள் வேற்றுமையையும் காட்டும். kein முடிவைத் தேர்வதற்கு இரண்டையும் கண்டறியவும். ஆண்பால் + Akkusativ = keinen." },
    mistake: { en: "Do not use kein with an adjective alone (‘nicht müde’) or with a definite noun (‘nicht das Auto’). Use nicht there.", ta: "பெயரடைக்கு முன் (‘nicht müde’) அல்லது definite பெயர்ச்சொல்லுக்கு முன் (‘nicht das Auto’) kein வேண்டாம்; அங்கே nicht பயன்படுத்தவும்." },
  },
  possessives: {
    steps: [
      { en: "Choose the stem from the owner: ich → mein, du → dein, er → sein, sie → ihr, wir → unser, ihr → euer, Sie → Ihr.", ta: "உரிமையாளரைப் பார்த்து stem தேர்ந்தெடுக்கவும்: ich → mein, du → dein, er → sein, sie → ihr, wir → unser, ihr → euer, Sie → Ihr." },
      { en: "Then look at the thing owned. Add the ending for that noun’s gender, number and case; the owner does not control this ending.", ta: "பிறகு உடைமையான பொருளைப் பாருங்கள். அந்தப் பெயர்ச்சொல்லின் பால், எண், வேற்றுமைக்கு ஏற்ற முடிவைச் சேர்க்கவும்; உரிமையாளர் முடிவை நிர்ணயிப்பதில்லை." },
      { en: "Use the ein-word pattern: mein Bruder, meine Schwester, meinen Bruder (Akkusativ), meiner Schwester (Dativ).", ta: "ein-word முறையைப் பின்பற்றவும்: mein Bruder, meine Schwester, meinen Bruder (Akkusativ), meiner Schwester (Dativ)." },
    ],
    table: { en: "The first table chooses the owner’s stem; the endings table then changes it to match the owned noun. Keep these two decisions separate.", ta: "முதல் அட்டவணை உரிமையாளரின் stem-ஐத் தேர்ந்தெடுக்கிறது; அடுத்த endings அட்டவணை உடைமையான பெயர்ச்சொல்லுக்கேற்ப மாற்றுகிறது. இரு முடிவுகளையும் தனித்தனியாகத் தேர்ந்தெடுக்கவும்." },
    mistake: { en: "Do not choose meine just because the owner is a woman. The form follows the noun after it: ihr Bruder, ihre Schwester.", ta: "உரிமையாளர் பெண் என்பதால் meine தேர்ந்தெடுக்க வேண்டாம். அடுத்த பெயர்ச்சொல்லே வடிவத்தை நிர்ணயிக்கும்: ihr Bruder, ihre Schwester." },
  },
  plural: {
    steps: [
      { en: "German plurals do not follow one single ending. Learn each noun with its article and plural form: der Tisch – die Tische.", ta: "ஜெர்மன் பன்மைக்கு ஒரே முடிவு இல்லை. ஒவ்வொரு பெயரையும் article மற்றும் plural-உடன் கற்றுக்கொள்ளுங்கள்: der Tisch – die Tische." },
      { en: "Common patterns include -e, -n/-en, -er, -s, an umlaut, or no visible change. These are clues, not rules that predict every noun.", ta: "பொதுவான வடிவங்கள் -e, -n/-en, -er, -s, umlaut அல்லது மாற்றமின்மை. இவை வழிகாட்டிகள்; எல்லா பெயர்களையும் கணிக்கும் முழு விதிகள் அல்ல." },
      { en: "In the plural, the definite article is die in Nominativ and Akkusativ. The noun’s plural ending still has to be learned.", ta: "பன்மையில் Nominativ, Akkusativ இரண்டிலும் definite article die. பெயர்ச்சொல்லின் plural முடிவைத் தனியாகக் கற்றுக்கொள்ள வேண்டும்." },
    ],
    table: { en: "Each row is one noun pattern. Compare singular and plural as a pair, including umlauts; do not assume you can infer the plural from the ending alone.", ta: "ஒவ்வொரு வரியும் ஒரு பெயர்ச்சொல் வடிவம். umlaut உட்பட ஒருமை, பன்மையை ஜோடியாகப் பாருங்கள்; முடிவை மட்டும் வைத்து பன்மையை ஊகிக்க வேண்டாம்." },
    mistake: { en: "Do not add -s to every noun. German plurals must be memorized with the noun; Autos is an example, not a universal rule.", ta: "ஒவ்வொரு பெயருக்கும் -s சேர்க்க வேண்டாம். பன்மையைப் பெயருடன் மனப்பாடம் செய்யுங்கள்; Autos ஒரு எடுத்துக்காட்டு மட்டுமே." },
  },
  akkusativ: {
    steps: [
      { en: "Find the verb and ask ‘who or what receives this action?’ That direct object is usually Akkusativ: Ich sehe den Zug.", ta: "வினையைக் கண்டுபிடித்து ‘இந்தச் செயலைப் பெறுவது யார்/எது?’ என்று கேளுங்கள். நேரடி object பொதுவாக Akkusativ: Ich sehe den Zug." },
      { en: "Check the object’s gender. In the basic article pattern, only masculine changes in Akkusativ: der → den and ein → einen.", ta: "object-இன் பாலைக் கண்டறியவும். அடிப்படை article முறையில் Akkusativ-இல் ஆண்பால் மட்டுமே மாறும்: der → den, ein → einen." },
      { en: "Feminine, neuter and plural articles stay the same in this comparison. The subject stays Nominativ; do not change it just because the object changes.", ta: "இந்த ஒப்பீட்டில் பெண்பால், நடுப்பால், பன்மை article மாறாது. எழுவாய் Nominativ-இல் இருக்கும்; object மாறுவதால் அதை மாற்ற வேண்டாம்." },
    ],
    table: { en: "Compare the Nominativ row with the Akkusativ row. Follow the gender column: the masculine article changes, while the other three columns stay the same.", ta: "Nominativ வரியையும் Akkusativ வரியையும் ஒப்பிடுங்கள். பால் நெடுவரிசையைப் பின்பற்றவும்: ஆண்பால் article மாறும்; மற்ற மூன்று மாறாது." },
    mistake: { en: "Do not change every article to den. Only a masculine direct object changes: Ich sehe die Frau, das Kind, die Kinder.", ta: "எல்லா article-களையும் den ஆக மாற்ற வேண்டாம். ஆண்பால் நேரடி object மட்டும் மாறும்: Ich sehe die Frau, das Kind, die Kinder." },
  },
  "modal-verbs": {
    steps: [
      { en: "Choose the modal for the meaning: können = ability/possibility, müssen = necessity, möchten = polite wish, wollen = intention.", ta: "பொருளுக்கேற்ப modal தேர்ந்தெடுக்கவும்: können = திறன்/வாய்ப்பு, müssen = அவசியம், möchten = பணிவான விருப்பம், wollen = நோக்கம்." },
      { en: "Conjugate the modal for the subject and put it in position 2. Many singular forms are irregular: ich kann, du kannst, er kann.", ta: "எழுவாய்க்கேற்ப modal-ஐ மாற்றி இரண்டாம் இடத்தில் வைக்கவும். பல ஒருமை வடிவங்கள் ஒழுங்கற்றவை: ich kann, du kannst, er kann." },
      { en: "Keep the main verb as an infinitive at the end: Ich muss heute arbeiten. Do not conjugate both verbs.", ta: "முக்கிய வினையை infinitive வடிவில் கடைசியில் வைக்கவும்: Ich muss heute arbeiten. இரு வினைகளையும் மாற்ற வேண்டாம்." },
    ],
    table: { en: "Each row is the subject; each verb column is one modal. Select the intersection, then place that form in position 2 and the other verb at the sentence end.", ta: "ஒவ்வொரு வரியும் எழுவாய்; ஒவ்வொரு வினை நெடுவரிசையும் ஒரு modal. சந்திக்கும் வடிவத்தை எடுத்து இரண்டாம் இடத்தில் வைக்கவும்; மற்ற வினை கடைசியில் வரும்." },
    mistake: { en: "Do not write ‘Ich kann spreche’. The modal is conjugated; the main verb stays infinitive: Ich kann sprechen.", ta: "‘Ich kann spreche’ என்று எழுத வேண்டாம். modal மட்டும் conjugate ஆகும்; முக்கிய வினை infinitive: Ich kann sprechen." },
  },
  "numbers-time": {
    steps: [
      { en: "For 21–99, German usually says the ones first, then und, then the tens: ein-und-zwanzig.", ta: "21–99 எண்களில் முதலில் ஒன்றுகள், பிறகு und, பின்னர் பத்துகள்: ein-und-zwanzig." },
      { en: "For everyday time, nach means past and vor means to. Viertel nach drei is 3:15; Viertel vor vier is 3:45.", ta: "வழக்கமான நேரத்தில் nach = கடந்த, vor = முன். Viertel nach drei = 3:15; Viertel vor vier = 3:45." },
      { en: "halb names the coming hour: halb vier is halfway to four, or 3:30. Prices can be spoken as euros followed by cents.", ta: "halb அடுத்த மணிநேரத்தைக் குறிக்கும்: halb vier என்பது நான்கு மணிக்கு அரை மணி முன், அதாவது 3:30. விலையில் யூரோவுக்குப் பிறகு சென்ட் சொல்லலாம்." },
    ],
    table: { en: "The number table shows the German word for each value; the time table contrasts digital time with everyday spoken time. Notice halb refers to the next hour.", ta: "எண் அட்டவணை ஒவ்வொரு எண்ணின் ஜெர்மன் சொல்லைக் காட்டும்; நேர அட்டவணை digital நேரத்தையும் பேச்சு நேரத்தையும் ஒப்பிடும். halb அடுத்த மணியைச் சுட்டும்." },
    mistake: { en: "Do not translate ‘half past four’ word for word as halb vier. German halb vier means 3:30, not 4:30.", ta: "‘half past four’-ஐ நேரடியாக halb vier என்று மொழிபெயர்க்க வேண்டாம். ஜெர்மன் halb vier = 3:30; 4:30 அல்ல." },
  },
  "separable-verbs": {
    steps: [
      { en: "Recognize a separable prefix such as auf-, an-, ein- or mit-. In a main clause, conjugate the verb stem and detach the prefix.", ta: "auf-, an-, ein-, mit- போன்ற பிரியும் முன்னொட்டைக் கண்டறியவும். முக்கிய வாக்கியத்தில் வினை stem-ஐ மாற்றி முன்னொட்டை பிரிக்கவும்." },
      { en: "Put the conjugated stem in position 2. Place the separated prefix at the very end: Ich stehe früh auf.", ta: "மாற்றிய stem-ஐ இரண்டாம் இடத்தில் வைக்கவும். பிரிந்த முன்னொட்டை மிகக் கடைசியில் வைக்கவும்: Ich stehe früh auf." },
      { en: "In a yes/no question the verb stem moves to the front, but the prefix still goes to the end: Rufst du mich an? With a modal, the infinitive stays together at the end.", ta: "ஆம்/இல்லை கேள்வியில் வினை stem முன் வரும்; முன்னொட்டு கடைசியில் இருக்கும்: Rufst du mich an? modal உடன் infinitive ஒன்றாகக் கடைசியில் வரும்." },
    ],
    table: { en: "The infinitive column shows the whole verb. In the sentence column, find the conjugated stem and the matching prefix at the end; together they still make one verb.", ta: "Infinitive நெடுவரிசை முழு வினையைக் காட்டும். வாக்கியத்தில் conjugated stem-ஐயும் கடைசியில் உள்ள முன்னொட்டையும் கண்டுபிடிக்கவும்; இரண்டும் சேர்ந்து ஒரே வினை." },
    mistake: { en: "Do not put the prefix immediately after the subject or verb. It belongs at the end of the main clause.", ta: "முன்னொட்டை எழுவாய் அல்லது வினைக்குப் பின் உடனே வைக்க வேண்டாம். முக்கிய வாக்கியத்தின் கடைசியில் அது வரும்." },
  },
  imperative: {
    steps: [
      { en: "Choose the listener first: du for one familiar person, ihr for several familiar people, Sie for formal address.", ta: "முதலில் யாரிடம் பேசுகிறோம் என்பதைத் தேர்ந்தெடுக்கவும்: நெருக்கமான ஒருவருக்கு du, பலருக்கு ihr, மரியாதைக்கு Sie." },
      { en: "For du, usually use the verb stem without the subject; for ihr, use the ihr verb form without ihr; for Sie, use infinitive + Sie.", ta: "du கட்டளையில் பொதுவாக subject இல்லாத stem; ihr கட்டளையில் ihr-form ஆனால் ihr இல்லாமல்; Sie கட்டளையில் infinitive + Sie." },
      { en: "Some common verbs change their vowel (nehmen → nimm, sprechen → sprich). Add bitte to soften the instruction.", ta: "சில பொதுவான வினைகளில் உயிர் மாறும் (nehmen → nimm, sprechen → sprich). கட்டளையை மென்மையாக்க bitte சேர்க்கவும்." },
    ],
    table: { en: "Read the Person column before applying the Rule column. The same infinitive has a different imperative form for du, ihr and formal Sie.", ta: "Rule நெடுவரிசையைப் பயன்படுத்துவதற்கு முன் Person நெடுவரிசையைப் பாருங்கள். du, ihr, மரியாதையான Sie ஆகியவற்றுக்கு ஒரே infinitive-இன் கட்டளை வடிவம் மாறும்." },
    mistake: { en: "Do not use the ordinary statement ending in a command: ‘Kommst!’ is not the du imperative. Say Komm!", ta: "கட்டளையில் சாதாரண வாக்கிய முடிவைப் பயன்படுத்த வேண்டாம்: ‘Kommst!’ என்பது du கட்டளை அல்ல. Komm! என்பதே சரி." },
  },
  perfekt: {
    steps: [
      { en: "Use the Perfekt to talk about completed past events in conversation. It has two parts: a present-tense helper and Partizip II.", ta: "உரையாடலில் முடிந்த கடந்தகாலச் செயல்களுக்கு Perfekt பயன்படுத்தவும். இதில் இரண்டு பகுதிகள்: நிகழ்கால துணைவினை மற்றும் Partizip II." },
      { en: "Most verbs take haben. Many verbs of movement or change of state take sein; learn those common verbs individually.", ta: "பெரும்பாலான வினைகள் haben பெறும். இயக்கம் அல்லது நிலைமாற்றத்தைக் குறிக்கும் பல வினைகள் sein பெறும்; பொதுவானவற்றைத் தனியாகக் கற்றுக்கொள்ளவும்." },
      { en: "In a main clause, conjugate haben/sein in position 2 and put the Partizip II at the end: Wir sind nach Hause gefahren.", ta: "முக்கிய வாக்கியத்தில் haben/sein-ஐ இரண்டாம் இடத்தில் மாற்றி, Partizip II-ஐ கடைசியில் வைக்கவும்: Wir sind nach Hause gefahren." },
    ],
    table: { en: "The helper column tells you which verb to conjugate; the participle column supplies the final verb part. Keep both parts in the sentence even when the English uses one past-tense word.", ta: "துணைவினை நெடுவரிசை எதை conjugate செய்ய வேண்டும் என்பதைக் காட்டும்; participle நெடுவரிசை வினையின் இறுதிப் பகுதி. ஆங்கிலத்தில் ஒரு past verb இருந்தாலும் ஜெர்மனியில் இரு பகுதிகளும் வேண்டும்." },
    mistake: { en: "Do not put the participle beside the helper. In a normal main clause, the participle goes at the end: Ich habe Brot gekauft.", ta: "participle-ஐ துணைவினைக்கு அருகில் வைக்க வேண்டாம். சாதாரண முக்கிய வாக்கியத்தில் அது கடைசியில் வரும்: Ich habe Brot gekauft." },
  },
  "dativ-prepositions": {
    steps: [
      { en: "A preposition can decide the case of the noun after it. The prepositions aus, bei, mit, nach, seit, von and zu always take Dativ.", ta: "முன்னிடைச்சொல் அதன் பின் வரும் பெயர்ச்சொல்லின் வேற்றுமையை நிர்ணயிக்கலாம். aus, bei, mit, nach, seit, von, zu எப்போதும் Dativ பெறும்." },
      { en: "Find the noun’s gender and number, then use the Dativ article: dem, der, dem or den (+n for many plural nouns).", ta: "பெயர்ச்சொல்லின் பால், எண்ணைக் கண்டறிந்து Dativ article தேர்ந்தெடுக்கவும்: dem, der, dem அல்லது den (+ பல பன்மை பெயர்களுக்கு n)." },
      { en: "Contractions are common: mit dem becomes mit’m only in informal speech; zu dem → zum and zu der → zur are standard contractions.", ta: "சுருக்கங்கள் வழக்கமானவை: zu dem → zum; zu der → zur என்பது நிலையான சுருக்கம்." },
    ],
    table: { en: "First identify the noun’s gender/number on the row, then use the Dativ column. Plural Dativ often adds -n to the noun if it does not already end in -n or -s.", ta: "முதலில் வரியில் பெயர்ச்சொல்லின் பால்/எண்ணைக் கண்டறிந்து Dativ நெடுவரிசையைப் பயன்படுத்தவும். பன்மை Dativ பெயர் ஏற்கனவே -n/-s இல் முடியாவிட்டால் பெரும்பாலும் -n சேர்க்கும்." },
    mistake: { en: "Do not leave the article in Nominativ after mit or zu. Say mit dem Zug and zu der Schule / zur Schule.", ta: "mit அல்லது zu க்குப் பிறகும் Nominativ article-ஐ விட வேண்டாம். mit dem Zug, zu der Schule / zur Schule என்று சொல்லவும்." },
  },
  "two-way-prepositions": {
    steps: [
      { en: "Learn the two-way prepositions: an, auf, hinter, in, neben, über, unter, vor and zwischen.", ta: "இரு வழி முன்னிடைச்சொற்களை கற்றுக்கொள்ளுங்கள்: an, auf, hinter, in, neben, über, unter, vor, zwischen." },
      { en: "Ask wo? (where, location with no change of place) and use Dativ: Das Buch liegt auf dem Tisch.", ta: "wo? (எங்கே, இடமாற்றமில்லாத நிலை) என்று கேட்டு Dativ பயன்படுத்தவும்: Das Buch liegt auf dem Tisch." },
      { en: "Ask wohin? (where to, destination/change of place) and use Akkusativ: Ich lege das Buch auf den Tisch. The verb and meaning decide the case.", ta: "wohin? (எங்கே நோக்கி, இலக்கிடம்/இடமாற்றம்) என்று கேட்டு Akkusativ பயன்படுத்தவும்: Ich lege das Buch auf den Tisch. வினையும் பொருளும் வேற்றுமையைத் தீர்மானிக்கும்." },
    ],
    table: { en: "The location row answers wo? and uses Dativ; the destination row answers wohin? and uses Akkusativ. Compare the article as well as the verb: auf dem Tisch vs auf den Tisch.", ta: "இடநிலை வரி wo? என்பதற்கு Dativ; இலக்கிடம் wohin? என்பதற்கு Akkusativ. வினையையும் article-ஐயும் ஒப்பிடவும்: auf dem Tisch vs auf den Tisch." },
    mistake: { en: "Do not decide by whether a verb looks like movement alone. Ask whether the sentence describes a location or movement to a destination.", ta: "வினையில் இயக்கம் தெரிகிறதா என்பதை மட்டும் வைத்து முடிவு செய்ய வேண்டாம். இடநிலையா அல்லது இலக்கை நோக்கிய இயக்கமா என்று கேளுங்கள்." },
  },
  "subordinate-clauses": {
    steps: [
      { en: "weil gives a reason, dass introduces reported information, and wenn means if/when. The connector starts a subordinate clause.", ta: "weil காரணம், dass தெரிவிக்கப்பட்ட தகவல், wenn நிபந்தனை/நேரம் ஆகியவற்றைக் குறிக்கும். இணைப்புச்சொல் துணைவாக்கியத்தைத் தொடங்கும்." },
      { en: "In that subordinate clause, send the conjugated verb to the end: …, weil ich heute arbeiten muss.", ta: "அந்த துணைவாக்கியத்தில் conjugated verb-ஐ கடைசிக்கு அனுப்பவும்: …, weil ich heute arbeiten muss." },
      { en: "If the subordinate clause comes first, the main clause begins with its conjugated verb: Wenn es regnet, bleiben wir zu Hause.", ta: "துணைவாக்கியம் முதலில் வந்தால், முக்கிய வாக்கியம் conjugated verb-இல் தொடங்கும்: Wenn es regnet, bleiben wir zu Hause." },
    ],
    table: { en: "The connector tells you a subordinate clause has started. Read to the clause boundary and place its conjugated verb last; if it comes first, invert verb and subject in the main clause after the comma.", ta: "இணைப்புச்சொல் துணைவாக்கியத் தொடக்கத்தைக் காட்டும். அந்தப் பிரிவின் கடைசியில் conjugated verb-ஐ வைக்கவும்; அது முதலில் வந்தால் கமாவுக்குப் பின் முக்கிய வாக்கியத்தில் verb-subject வரிசை வரும்." },
    mistake: { en: "Do not keep normal main-clause order after weil: ‘weil ich bin müde’ is wrong. Say ‘weil ich müde bin’.", ta: "weil க்குப் பிறகு சாதாரண வாக்கிய வரிசையை வைக்க வேண்டாம்: ‘weil ich bin müde’ தவறு; ‘weil ich müde bin’ சரி." },
  },
  "reflexive-verbs": {
    steps: [
      { en: "A reflexive verb describes an action connected back to its subject. Learn the verb with sich, for example sich freuen or sich treffen.", ta: "தன்வினை எழுவாயுடன் தொடர்புடைய செயலாகும். sich freuen, sich treffen போன்றவற்றை sich உடன் சேர்த்துக் கற்றுக்கொள்ளுங்கள்." },
      { en: "Change the reflexive pronoun to match the subject: ich mich, du dich, er/sie sich, wir uns, ihr euch, sie/Sie sich.", ta: "எழுவாய்க்கேற்ப reflexive pronoun மாற்றவும்: ich mich, du dich, er/sie sich, wir uns, ihr euch, sie/Sie sich." },
      { en: "Conjugate the main verb normally as well. In ‘Wir treffen uns’, treffen matches wir and uns refers back to wir.", ta: "முக்கிய வினையையும் வழக்கம்போல் மாற்றவும். ‘Wir treffen uns’ இல் treffen என்பது wir-க்கு; uns மீண்டும் wir-ஐக் குறிக்கும்." },
    ],
    table: { en: "Read each row as a subject + conjugated verb + matching reflexive pronoun. Both the verb form and pronoun change with the subject.", ta: "ஒவ்வொரு வரியும் எழுவாய் + conjugated verb + பொருந்தும் reflexive pronoun. எழுவாய்க்கேற்ப வினையும் pronoun-மும் மாறும்." },
    mistake: { en: "Do not use sich for every subject. Say ‘Ich freue mich’, ‘du freust dich’, and ‘er freut sich’.", ta: "எல்லா எழுவாய்களுக்கும் sich பயன்படுத்த வேண்டாம். ‘Ich freue mich’, ‘du freust dich’, ‘er freut sich’ என்று சொல்லவும்." },
  },
  comparison: {
    steps: [
      { en: "Use the base adjective for one quality: schnell. Add -er to compare two things: schneller.", ta: "ஒரு பண்பைச் சொல்ல அடிப்படை பெயரடை: schnell. இரண்டை ஒப்பிட -er சேர்க்கவும்: schneller." },
      { en: "Use als after a comparative for ‘than’: Der Zug ist schneller als der Bus. Use so … wie for equal qualities.", ta: "ஒப்பீட்டில் ‘than’ என்பதற்கு comparative-க்கு பின் als: Der Zug ist schneller als der Bus. சமத்துவத்திற்கு so … wie." },
      { en: "Use am … -sten for the highest degree: am schnellsten. Memorize irregular forms such as gut → besser → am besten.", ta: "மிகை நிலைக்கு am … -sten: am schnellsten. gut → besser → am besten போன்ற ஒழுங்கற்ற வடிவங்களை மனப்பாடம் செய்யவும்." },
    ],
    table: { en: "The three columns show base, comparative and superlative. Choose the column that matches the meaning; irregular adjectives do not follow the usual -er/-sten pattern.", ta: "மூன்று நெடுவரிசைகள் அடிப்படை, ஒப்பீடு, மிகைநிலையைக் காட்டும். பொருளுக்கேற்ற நெடுவரிசையைத் தேர்ந்தெடுக்கவும்; ஒழுங்கற்ற பெயரடைகள் வழக்கமான -er/-sten முறையைப் பின்பற்றாது." },
    mistake: { en: "Do not combine als with equality. Use schneller als for ‘faster than’, but so schnell wie for ‘as fast as’.", ta: "als-ஐ சமத்துவத்துடன் சேர்க்க வேண்டாம். ‘விட வேகம்’க்கு schneller als; ‘அதே அளவு வேகம்’க்கு so schnell wie." },
  },
  "adjective-endings": {
    steps: [
      { en: "The adjective ending helps show gender, number and case on the noun phrase. First identify the noun and its role in the sentence.", ta: "பெயரடை முடிவு noun phrase-இன் பால், எண், வேற்றுமையை காட்ட உதவும். முதலில் பெயர்ச்சொல்லையும் வாக்கியத்தில் அதன் பங்கையும் கண்டறியவும்." },
      { en: "Check the article. After der-words, the article already shows much of the grammar, so the adjective usually takes a weaker ending such as -e or -en.", ta: "Article-ஐப் பாருங்கள். der-words பல இலக்கணத் தகவலை ஏற்கனவே காட்டுவதால் பெயரடை பொதுவாக -e அல்லது -en போன்ற எளிய முடிவைப் பெறும்." },
      { en: "After ein-words, look for what the article does not show. The adjective carries a stronger ending in forms such as ein großer Tisch and ein schönes Zimmer.", ta: "ein-words-க்கு பின் article காட்டாத தகவலைக் கவனிக்கவும். ein großer Tisch, ein schönes Zimmer போன்ற வடிவங்களில் பெயரடை வலுவான முடிவை ஏற்கும்." },
    ],
    table: { en: "Compare the same gender across Nominativ and Akkusativ, then compare the two article groups. The masculine article changes to den/einen in Akkusativ; the adjective ending changes with it.", ta: "ஒரே பாலில் Nominativ, Akkusativ-ஐ ஒப்பிட்டு, பின்னர் இரண்டு article குழுக்களையும் ஒப்பிடவும். Akkusativ-இல் ஆண்பால் article den/einen ஆகும்; பெயரடை முடிவும் அதற்கேற்ப மாறும்." },
    mistake: { en: "Do not choose the adjective ending from the adjective alone. Decide case, gender, number and article type first.", ta: "பெயரடை முடிவை பெயரடையை மட்டும் வைத்து தேர்ந்தெடுக்க வேண்டாம். முதலில் வேற்றுமை, பால், எண், article வகையைத் தீர்மானிக்கவும்." },
  },
  "polite-requests": {
    steps: [
      { en: "Choose a phrase that fits the situation: möchte/hätte gern for what you want; könnten Sie or würden Sie for asking someone to do something.", ta: "சூழலுக்கேற்ற சொற்றொடரைத் தேர்ந்தெடுக்கவும்: விருப்பத்திற்கு möchte/hätte gern; ஒருவரிடம் செயலைக் கேட்க könnten Sie/würden Sie." },
      { en: "Use formal Sie with people you do not know or in service situations. Put Sie after the conjugated verb in a question: Könnten Sie …?", ta: "அறிமுகமில்லாதவர்களிடமும் சேவைச் சூழலிலும் மரியாதையான Sie. கேள்வியில் conjugated verb-க்கு பின் Sie: Könnten Sie …?" },
      { en: "Add bitte to sound considerate, and learn a courteous reply such as Ja, gern or Tut mir leid, das geht leider nicht.", ta: "பணிவாக ஒலிக்க bitte சேர்க்கவும்; Ja, gern அல்லது Tut mir leid, das geht leider nicht போன்ற பதில்களையும் கற்றுக்கொள்ளவும்." },
    ],
    table: { en: "The Use column matches a phrase to its purpose: expressing a wish, making a request, replying positively or declining politely. Use the example as a complete model.", ta: "Use நெடுவரிசை சொற்றொடரை அதன் நோக்கத்துடன் பொருத்தும்: விருப்பம், கோரிக்கை, ஒப்புதல் அல்லது பணிவான மறுப்பு. எடுத்துக்காட்டை முழு மாதிரியாகப் பயன்படுத்தவும்." },
    mistake: { en: "Do not use an imperative with a stranger when you want a polite request. Prefer ‘Könnten Sie … bitte?’ to ‘Öffnen Sie!’.", ta: "மரியாதையான கோரிக்கைக்கு அறிமுகமில்லாதவரிடம் கட்டளை வடிவம் வேண்டாம். ‘Öffnen Sie!’ என்பதற்குப் பதில் ‘Könnten Sie … bitte?’ பயன்படுத்தவும்." },
  },
  "konjunktiv-2": {
    steps: [
      { en: "Use Konjunktiv II to make a request softer, express a wish, give gentle advice, or describe an unreal possibility.", ta: "கோரிக்கையை மென்மையாக்க, விருப்பம் சொல்ல, மென்மையான அறிவுரை தர, நடக்காத வாய்ப்பைக் கூற Konjunktiv II பயன்படுத்தவும்." },
      { en: "Learn the common forms hätte, wäre and könnte. For many other verbs, use würde + infinitive.", ta: "hätte, wäre, könnte போன்ற பொதுவான வடிவங்களைக் கற்றுக்கொள்ளவும். பல வினைகளுக்கு würde + infinitive பயன்படுத்தவும்." },
      { en: "In a würde sentence, conjugate würde and send the infinitive to the end: Ich würde gern reisen. Keep both verbs in an unreal if-clause pattern.", ta: "würde வாக்கியத்தில் würde-ஐ conjugate செய்து infinitive-ஐ கடைசியில் வைக்கவும்: Ich würde gern reisen. கற்பனை wenn-clause-இலும் இரு வினைகளையும் சரியாக வைக்கவும்." },
    ],
    table: { en: "The first table gives the matching Konjunktiv II form for each subject. The second groups complete phrases by purpose; notice how würde takes an infinitive at the end.", ta: "முதல் அட்டவணை ஒவ்வொரு எழுவாய்க்கும் Konjunktiv II வடிவத்தைக் காட்டும். இரண்டாவது நோக்கத்தின்படி முழுச் சொற்றொடர்களைக் குழுவாக்கும்; würde உடன் infinitive கடைசியில் வரும்." },
    mistake: { en: "Do not use würde plus a second conjugated verb. Say ‘Ich würde gehen’, not ‘Ich würde gehe’.", ta: "würde-க்கு பின் இன்னொரு conjugated verb வேண்டாம். ‘Ich würde gehen’ சரி; ‘Ich würde gehe’ தவறு." },
  },
  passiv: {
    steps: [
      { en: "Use passive when the event or affected thing matters more than the person doing it. The active object becomes the passive subject.", ta: "செய்பவரைவிட நிகழ்வு அல்லது பாதிக்கப்படும் பொருள் முக்கியமானபோது passive பயன்படுத்தவும். active object passive எழுவாயாக மாறும்." },
      { en: "Build the present passive with a conjugated form of werden + Partizip II: Der Brief wird geschrieben. The participle goes last.", ta: "நிகழ்கால passive-ஐ conjugated werden + Partizip II கொண்டு அமைக்கவும்: Der Brief wird geschrieben. Partizip கடைசியில் வரும்." },
      { en: "For a past event, use wurde/wurden + Partizip II. If the doer matters, add von + Dativ: Der Brief wird vom Chef geschrieben.", ta: "கடந்தகால நிகழ்வுக்கு wurde/wurden + Partizip II. செய்பவர் முக்கியமெனில் von + Dativ சேர்க்கவும்: Der Brief wird vom Chef geschrieben." },
    ],
    table: { en: "The first table shows which form of werden agrees with the new subject. In the transformation table, track the old object becoming the new subject and keep the Partizip II at the end.", ta: "முதல் அட்டவணை புதிய எழுவாயுடன் பொருந்தும் werden வடிவத்தைக் காட்டும். மாற்ற அட்டவணையில் பழைய object புதிய எழுவாயாக மாறுவதைப் பின்தொடர்ந்து Partizip II-ஐ கடைசியில் வைக்கவும்." },
    mistake: { en: "Do not confuse werden + participle (passive) with werden + infinitive (future). ‘wird gebaut’ = is built; ‘wird bauen’ = will build.", ta: "werden + participle (passive) மற்றும் werden + infinitive (எதிர்காலம்) குழப்ப வேண்டாம். ‘wird gebaut’ = கட்டப்படுகிறது; ‘wird bauen’ = கட்டுவார்." },
  },
  "relative-clauses": {
    foundation: { en: "A relative clause is a small sentence attached to a noun to identify or describe it: ‘the student who lives here’. It has its own subject and verb, but German sends that clause’s conjugated verb to the end.", ta: "Relative clause என்பது ஒரு பெயரை அடையாளம் காணவோ விவரிக்கவோ அதனுடன் சேரும் சிறிய வாக்கியம்: ‘இங்கே வசிக்கும் மாணவர்’. அதற்குத் தனி எழுவாயும் வினையும் இருக்கும்; ஜெர்மனியில் அந்த clause-இன் conjugated verb கடைசியில் வரும்." },
    steps: [
      { en: "A relative clause adds information about a noun. Put a comma before the clause and start it with a relative pronoun.", ta: "சார்பு உட்பிரிவு பெயர்ச்சொல்லைப் பற்றிய கூடுதல் தகவல் தரும். அதன் முன் கமா வைத்து relative pronoun-ஆல் தொடங்கவும்." },
      { en: "Choose gender and number from the noun being described, then choose case from the pronoun’s job inside the relative clause.", ta: "விவரிக்கப்படும் பெயரிலிருந்து பால், எண்ணைத் தேர்ந்தெடுக்கவும்; சார்பு உட்பிரிவுக்குள் pronoun-இன் பணியிலிருந்து வேற்றுமையைத் தேர்ந்தெடுக்கவும்." },
      { en: "Move the conjugated verb to the end of the relative clause: der Mann, der in Berlin wohnt; die Frau, die ich kenne.", ta: "சார்பு உட்பிரிவின் conjugated verb-ஐ கடைசியில் வைக்கவும்: der Mann, der in Berlin wohnt; die Frau, die ich kenne." },
    ],
    table: { en: "Use the gender/number column of the noun outside the clause, then the case row for the pronoun’s role inside it. The relative pronoun can have a different case from its noun.", ta: "வெளியில் உள்ள பெயரின் பால்/எண் நெடுவரிசையைத் தேர்ந்து, உட்பிரிவில் pronoun-இன் பங்குக்கான வேற்றுமை வரியைப் பயன்படுத்தவும். pronoun-இன் case, பெயரிலிருந்து மாறலாம்." },
    mistake: { en: "Do not choose the case only from the noun before the comma. Ask what the pronoun does inside its own clause; helfen, for example, takes Dativ.", ta: "கமாவுக்கு முன் உள்ள பெயரை மட்டும் வைத்து case தேர்ந்தெடுக்க வேண்டாம். உட்பிரிவில் pronoun என்ன செய்கிறது என்று கேளுங்கள்; helfen உதாரணமாக Dativ பெறும்." },
  },
};

