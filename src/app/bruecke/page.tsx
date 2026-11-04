import ScreenTop from "@/components/ScreenTop";
import SpeakButton from "@/components/SpeakButton";
import { pairs } from "@/content/culture";

export const metadata = { title: "Brücke · மொழி-Brücke" };

export default function BrueckePage() {
  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <ScreenTop tab="bruecke" kicker="Culture bridge" title="Brücke" height={150} />
      <div className="px-4 pt-3">
        <p className="text-muted">Two cultures, side by side. Learn the German word and the story behind it.</p>
        <div className="mt-4 flex flex-col gap-3.5">
          {pairs.map((p) => (
            <article key={p.de.big} className="grid grid-cols-2 overflow-hidden rounded-3xl shadow-[0_3px_0_var(--color-line)]">
              <div className="bg-pill p-4">
                <p className="text-[11.5px] font-extrabold uppercase tracking-wider text-pri-dark">Tamil Nadu</p>
                <p lang={p.tn.ta ? "ta" : undefined} className="my-1 break-words font-display text-xl font-extrabold leading-tight">{p.tn.big}</p>
                <p className="text-sm text-muted">{p.tn.text}</p>
              </div>
              <div className="bg-white p-4">
                <p className="text-[11.5px] font-extrabold uppercase tracking-wider text-pri-dark">Germany</p>
                <p className="my-1 flex items-start gap-1 break-words font-display text-xl font-extrabold leading-tight">
                  <span className="min-w-0 break-words">{p.de.big}</span>
                  <SpeakButton text={p.de.big} />
                </p>
                <p className="text-sm text-muted">{p.de.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
