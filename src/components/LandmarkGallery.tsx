import { drawingFor } from "@/components/landmarks";
import { LANDMARKS } from "@/lib/landmarks";

const tamilNadu = LANDMARKS.filter((place) => place.country === "India");
const germany = LANDMARKS.filter((place) => place.country === "Germany");

function PlaceCard({ place }: { place: (typeof LANDMARKS)[number] }) {
  const { w, C } = drawingFor(place.id, `${place.type} ${place.name}`);
  const isIndia = place.country === "India";
  const location = isIndia
    ? `${place.city}, Tamil Nadu`
    : `${place.city}, ${place.state === place.city ? "Germany" : place.state}`;

  return (
    <article className="min-w-0 rounded-3xl border border-line bg-white p-3 shadow-[0_3px_0_var(--color-line)]">
      <div className="landmark-scene" data-country={isIndia ? "tamil-nadu" : "germany"}>
        <div className="landmark-art" style={{ width: `min(${w}px, 72%)` }}>
          <C />
        </div>
      </div>
      <div className="px-1 pb-1 pt-3">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-pri">{place.id}</p>
        <h3 className="mt-0.5 min-h-12 font-display text-base font-extrabold leading-tight">{place.name}</h3>
        <p className="mt-1 text-xs font-bold text-muted">{location} · c. {place.year_built}</p>
        <p className="mt-2 text-xs leading-relaxed text-muted">{place.description}</p>
        <p className="mt-2 text-[11px] font-extrabold text-pri-dark">{place.architectural_style}</p>
      </div>
    </article>
  );
}

function CountrySection({ title, note, places }: { title: string; note: string; places: typeof LANDMARKS }) {
  return (
    <section className="mt-7">
      <div className="mb-3 flex items-end justify-between gap-3 px-1">
        <div>
          <h2 className="font-display text-xl font-extrabold">{title}</h2>
          <p className="mt-0.5 text-sm text-muted">{note}</p>
        </div>
        <span className="rounded-full bg-pill px-3 py-1 text-xs font-extrabold text-pri-dark">{places.length} places</span>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {places.map((place) => <li key={place.id}><PlaceCard place={place} /></li>)}
      </ul>
    </section>
  );
}

export default function LandmarkGallery() {
  return (
    <div className="px-4 pb-7 pt-2">
      <p className="rounded-2xl border border-line bg-white/80 p-3 text-sm leading-relaxed text-muted">
        Explore the places that shape both sides of our language bridge. Each scene is a stylized illustration; names and place notes come from the landmark catalogue.
      </p>
      <CountrySection title="Tamil Nadu" note="Temples, halls and landmarks" places={tamilNadu} />
      <CountrySection title="Germany" note="Castles, cathedrals and city icons" places={germany} />
    </div>
  );
}
