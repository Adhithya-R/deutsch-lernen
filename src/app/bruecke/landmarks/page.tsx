import LandmarkGallery from "@/components/LandmarkGallery";
import ScreenTop from "@/components/ScreenTop";

export const metadata = { title: "Landmarks · மொழி-Brücke" };

export default function LandmarksPage() {
  return (
    <main className="mx-auto w-full max-w-5xl">
      <ScreenTop tab="bruecke" kicker="Across the bridge" title="Famous places" height={155} ids={["TN013", "DE016"]} mood="dawn" />
      <LandmarkGallery />
    </main>
  );
}
