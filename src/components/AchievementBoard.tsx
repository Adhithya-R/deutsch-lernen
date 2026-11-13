import Icon, { type IconName } from "@/components/Icon";

type Achievement = {
  icon: IconName;
  title: string;
  en: string;
  ta: string;
  unlocked: boolean;
};

export default function AchievementBoard({ words, chapters, streak }: { words: number; chapters: number; streak: number }) {
  const achievements: Achievement[] = [
    { icon: "cards", title: "Erste Wörter", en: "Learn your first word.", ta: "உங்கள் முதல் சொல்லைக் கற்றுக்கொள்ளுங்கள்.", unlocked: words >= 1 },
    { icon: "star", title: "Wortsammler", en: "Learn 25 different words.", ta: "25 வெவ்வேறு சொற்களைக் கற்றுக்கொள்ளுங்கள்.", unlocked: words >= 25 },
    { icon: "book", title: "Geschichtenerzähler", en: "Complete your first story chapter.", ta: "உங்கள் முதல் கதைப் பாடத்தை முடிக்கவும்.", unlocked: chapters >= 1 },
    { icon: "bridge", title: "Brückenbauer", en: "Complete 10 story chapters.", ta: "10 கதைப் பாடங்களை முடிக்கவும்.", unlocked: chapters >= 10 },
    { icon: "flame", title: "Drei Tage gelernt", en: "Keep a three-day learning streak.", ta: "மூன்று நாட்கள் தொடர்ந்து கற்றுக்கொள்ளுங்கள்.", unlocked: streak >= 3 },
    { icon: "flame", title: "Eine Woche gelernt", en: "Keep a seven-day learning streak.", ta: "ஏழு நாட்கள் தொடர்ந்து கற்றுக்கொள்ளுங்கள்.", unlocked: streak >= 7 },
  ];
  const earned = achievements.filter((achievement) => achievement.unlocked).length;

  return (
    <section className="rounded-3xl bg-white p-4 shadow-[0_3px_0_var(--color-line)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold">Abzeichen</h2>
          <p className="text-xs text-muted"><span className="en-only">Milestones from your learning journey.</span><span lang="ta" className="ta-only">உங்கள் கற்றல் பயணத்தின் மைல்கற்கள்.</span></p>
        </div>
        <span className="rounded-xl bg-pri/10 px-2.5 py-1 text-sm font-extrabold text-pri">{earned}/{achievements.length}</span>
      </div>
      <ul className="grid grid-cols-2 gap-2.5">
        {achievements.map((achievement) => (
          <li key={achievement.title} className={`flex min-h-24 items-start gap-2.5 rounded-2xl border p-3 ${achievement.unlocked ? "border-pri/20 bg-pri/[0.06]" : "border-line bg-black/[0.025] opacity-65"}`}>
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${achievement.unlocked ? "bg-pri text-white" : "bg-black/10 text-muted"}`}><Icon name={achievement.icon} size={19} /></span>
            <span className="min-w-0">
              <span className="block text-sm font-extrabold leading-tight">{achievement.title}</span>
              <span className="mt-1 block text-[11px] leading-snug text-muted"><span className="en-only">{achievement.en}</span><span lang="ta" className="ta-only">{achievement.ta}</span></span>
              <span className={`mt-1 block text-[10px] font-extrabold uppercase tracking-wide ${achievement.unlocked ? "text-ok" : "text-muted"}`}>{achievement.unlocked ? "Freigeschaltet" : "Gesperrt"}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

