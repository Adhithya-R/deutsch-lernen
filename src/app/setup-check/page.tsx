import SetupCheck from "@/components/SetupCheck";

// Owner-only helper: not linked anywhere in the app. Open /setup-check while logged in to test the database setup.
export const metadata = { title: "Setup check", robots: { index: false, follow: false } };

export default function SetupCheckPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-8">
      <SetupCheck />
    </main>
  );
}
