import Icon from "@/components/Icon";

/** The line at the bottom of every page: the slogan of the app, in German and Tamil. */
export default function SiteFooter() {
  return (
    <footer className="mt-4 border-t-2 border-line bg-white px-4 pb-28 pt-6 text-center lg:mt-12 lg:pb-8">
      <Icon name="bridge" size={26} className="mx-auto text-pri" />
      <p className="mt-2 font-display text-lg font-extrabold leading-snug">Eine Brücke von Tamil nach Deutsch.</p>
      <p lang="ta" className="ta-only mt-0.5 text-sm text-muted">தமிழிலிருந்து ஜெர்மன் மொழிக்கு ஒரு பாலம்.</p>
    </footer>
  );
}
