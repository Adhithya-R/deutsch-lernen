import Link from "next/link";
import DailyGoal from "@/components/DailyGoal";
import LevelCard from "@/components/LevelCard";
import Skyline from "@/components/Skyline";
import { BrandButton, BrandCard, BrandEyebrow, BrandStat } from "@/components/BrandUI";
import Icon from "@/components/Icon";
import { chapters, upcoming } from "@/content/chapters";
import { SKY_MOOD } from "@/lib/landmarks";

export type LearnData = {
  loggedIn: boolean;
  done: string[];
  learned: number;
  words: number;
  streak: number;
  xp: number;
  byDay?: Record<string, number>;
};

const X = Array.from({ length: 60 }, (_, i) => [50, 30, 70, 30, 50, 70][i % 6]);
const ROW = 112;
type Stop = { title: string; sub: string; state: "done" | "cur" | "lock"; href?: string };

const SHORTCUTS = [
  { href: "/grammar", icon: "pencil", title: "Grammatik", sub: "Verstehen, üben, sicher sprechen." },
  { href: "/flashcards", icon: "cards", title: "Wortschatz", sub: "Wiederhole Wörter im richtigen Moment." },
  { href: "/exam", icon: "grad", title: "Prüfung", sub: "Bereite dich auf A1 und A2 vor." },
  { href: "/bruecke", icon: "bridge", title: "Kulturbrücke", sub: "Entdecke Tamil Nadu und Deutschland." },
] as const;

export default function LearnHome({ data, loading = false }: { data: LearnData; loading?: boolean }) {
  const done = new Set(data.done);
  const currentChapter = chapters.find((chapter) => !done.has(chapter.slug));
  const journeyComplete = data.done.length >= chapters.length;
  const stops: Stop[] = chapters.map((chapter) => {
    if (loading) return { title: chapter.title, sub: chapter.sub, state: "lock" };
    if (done.has(chapter.slug)) return { title: chapter.title, sub: chapter.sub, state: "done", href: `/learn/${chapter.slug}` };
    if (chapter.slug === currentChapter?.slug) return { title: chapter.title, sub: chapter.sub, state: "cur", href: `/learn/${chapter.slug}` };
    return { title: chapter.title, sub: chapter.sub, state: "lock" };
  });
  upcoming.forEach((chapter) => stops.push({ title: chapter.title, sub: chapter.sub, state: "lock" }));
  const path = stops.map((_, i) => `${i ? "L" : "M"}${X[i % X.length]} ${i * ROW + 40}`).join(" ");
  const nextHref = journeyComplete ? "/flashcards" : currentChapter ? `/learn/${currentChapter.slug}` : undefined;
  const chapterNumber = Math.min(data.done.length + 1, chapters.length);

  return (
    <main className="home-dashboard">
      <div className="home-dashboard__inner">
        <header className="home-welcome">
          <div className="home-welcome-copy">
            <BrandEyebrow><span lang="de">LERNEN MIT VERBINDUNG</span><span className="home-welcome-separator" aria-hidden="true"> · </span><span lang="ta" className="ta-only">வணக்கம்</span></BrandEyebrow>
            <h1>Dein Deutsch. Dein Tempo.</h1>
            <p>Ein neuer Schritt verbindet Chennai und Berlin.</p>
          </div>
          <span className="home-welcome-mark" aria-hidden="true"><Icon name="bridge" size={28} /></span>
        </header>

        <section className="home-hero" aria-labelledby="home-next-title">
          <div className="home-hero-copy">
            <BrandEyebrow light>{journeyComplete ? "DEIN NÄCHSTER SCHRITT" : `DEIN NÄCHSTER SCHRITT · ${chapterNumber} / ${chapters.length}`}</BrandEyebrow>
            <h2 id="home-next-title">{loading ? "Dein Lernweg lädt …" : journeyComplete ? "Stärke deinen Wortschatz" : currentChapter?.title ?? "Starte deine Reise"}</h2>
            <p>{journeyComplete ? "Wiederhole Wörter und halte dein Deutsch lebendig." : currentChapter?.sub ?? "Lerne Deutsch mit Geschichten aus Chennai und Deutschland."}</p>
            <p className="home-hero-slogan">Von Chennai nach Berlin, Schritt für Schritt.</p>
            {nextHref && !loading && <BrandButton href={nextHref}>{journeyComplete ? "Wörter wiederholen" : "Lektion fortsetzen"}<Icon name="arrow" size={18} /></BrandButton>}
            {!nextHref && !loading && <BrandButton href="/learn/ankunft">Jetzt anfangen<Icon name="arrow" size={18} /></BrandButton>}
          </div>
          <div className="home-hero-art">
            <Skyline ids={["TN002", "DE009"]} mood={currentChapter?.mood ?? SKY_MOOD.learn} height={190} />
            <div className="home-hero-art-caption"><span>Chennai</span><span className="home-bridge-line" aria-hidden="true"><i /></span><span>Berlin</span></div>
          </div>
        </section>

        <div className="home-overview">
          <div className="home-main-column">
            <section className="home-stats" aria-label="Dein Lernstand">
              <BrandStat icon="flame" value={loading ? "–" : data.streak} label="Tage in Folge" href={loading ? undefined : "/streak"} />
              <BrandStat icon="star" value={loading ? "–" : data.xp} label="Erfahrungspunkte" />
              <BrandStat icon="cards" value={loading ? "–" : `${data.learned} / ${data.words}`} label="Wörter gelernt" />
            </section>

            {data.loggedIn && !loading && <DailyGoal byDay={data.byDay ?? {}} />}

            <BrandCard className="home-shortcuts-panel">
              <div className="home-section-heading">
                <div><BrandEyebrow>DEIN LERNBEREICH</BrandEyebrow><h2>Womit möchtest du starten?</h2></div>
              </div>
              <div className="home-shortcuts">
                {SHORTCUTS.map((item) => (
                  <Link key={item.href} href={item.href} className="home-shortcut">
                    <span className="home-shortcut-icon"><Icon name={item.icon} size={22} /></span>
                    <span className="home-shortcut-copy"><strong>{item.title}</strong><small>{item.sub}</small></span>
                    <Icon name="chev" size={20} className="home-shortcut-arrow" />
                  </Link>
                ))}
              </div>
            </BrandCard>

            <details className="home-journey">
              <summary>
                <span className="home-journey-icon"><Icon name="book" size={22} /></span>
                <span className="home-journey-copy"><strong>Dein Lernweg</strong><small>{loading ? "Fortschritt wird geladen" : `${data.done.length} von ${chapters.length} Kapiteln geschafft`}</small></span>
                <span className="home-journey-action">Alle Kapitel</span>
                <Icon name="chev" size={19} className="home-shortcut-arrow" />
              </summary>
              <div className="home-journey-body">
                <div className="home-path-key" aria-label="Legende">
                  <span><i className="is-done" />Abgeschlossen</span><span><i className="is-current" />Als Nächstes</span><span><i className="is-locked" />Später</span>
                </div>
                <div className={`home-path ${loading ? "is-loading" : ""}`} style={{ height: stops.length * ROW }} aria-busy={loading}>
                  <svg className="home-path-line" viewBox={`0 0 100 ${stops.length * ROW}`} preserveAspectRatio="none" aria-hidden="true"><path d={path} /></svg>
                  {stops.map((stop, i) => {
                    const style = { top: i * ROW + 4, left: `${X[i % X.length]}%` };
                    const contents = <>
                      <span className={`home-stop home-stop--${stop.state}`}><Icon name={stop.state === "done" ? "check" : stop.state === "cur" ? "play" : "lock"} size={stop.state === "lock" ? 19 : 24} /></span>
                      <strong>{stop.title}</strong><small>{stop.sub}{stop.state === "lock" && i >= chapters.length ? " · bald" : ""}</small>
                    </>;
                    return <div key={`${stop.title}-${i}`} className="home-stop-wrap" style={style}>
                      {stop.href && !loading ? <Link href={stop.href} className="home-stop-link" aria-label={`${stop.title}: ${stop.state === "done" ? "abgeschlossen, erneut öffnen" : "starten"}`}>{contents}</Link> : <div className="home-stop-link" aria-label={`${stop.title}: gesperrt`}>{contents}</div>}
                    </div>;
                  })}
                </div>
              </div>
            </details>
          </div>

          <aside className="home-side-column">
            {!loading && data.loggedIn ? <LevelCard xp={data.xp} /> : <BrandCard className="home-account-card">
              <BrandEyebrow>DEIN FORTSCHRITT</BrandEyebrow>
              <h2>Dein Lernweg wartet auf dich.</h2>
              <p>Erstelle ein Konto, um Lektionen, Wörter und deinen Fortschritt zu speichern.</p>
              <BrandButton href="/signup">Konto erstellen<Icon name="arrow" size={18} /></BrandButton>
            </BrandCard>}

            <BrandCard className="home-note-card">
              <span className="home-note-icon"><Icon name="globe" size={21} /></span>
              <BrandEyebrow>DEINE VERBINDUNG</BrandEyebrow>
              <h2>Zwei Orte. Eine Sprache.</h2>
              <p>Übe jeden Tag ein wenig und baue deine Brücke zwischen Tamil Nadu und Deutschland.</p>
              <div className="home-flags" aria-label="Indische und deutsche Flagge">
                <span className="home-flag home-flag--india" aria-hidden="true"><i /><i /><i /></span>
                <span className="home-flag-bridge"><Icon name="bridge" size={24} /></span>
                <span className="home-flag home-flag--germany" aria-hidden="true"><i /><i /><i /></span>
              </div>
            </BrandCard>
          </aside>
        </div>
      </div>
    </main>
  );
}
