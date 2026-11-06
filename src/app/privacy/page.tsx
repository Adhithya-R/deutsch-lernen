
export const metadata = { title: "Privacy and notes · மொழி-Brücke" };

const h2 = "mt-6 text-xl font-extrabold";

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 pb-8 pt-4 lg:max-w-xl lg:pt-8">
      <h1 className="text-3xl font-extrabold">Privacy and notes</h1>
      <p className="mt-1 text-muted">மொழி-Brücke is a small learning app made for one German class.</p>

      <h2 className={h2}>What we store</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>Your name and email address, to create your account.</li>
        <li>Your progress: finished chapters and lessons, flashcards, quiz scores, writing drafts and the XP you earn each day.</li>
        <li>Problem reports you send us, with the page you were on.</li>
      </ul>
      <p className="mt-2 text-sm text-muted">Your password is never stored as text. We do not use advertising or tracking.</p>

      <h2 className={h2}>Who can see it</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>Other learners see only your <b>name and this week&apos;s XP</b> in the study group ranking. They cannot see your email or your answers.</li>
        <li>The person who runs the app can see the stored data in the database dashboard.</li>
      </ul>

      <h2 className={h2}>Your choices</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>You can change your name and password under Me → Account settings.</li>
        <li>You can delete your account there. This removes all your data for good.</li>
        <li>If you forget your password, use “Forgot password?” on the log-in page.</li>
      </ul>

      <h2 className={h2}>About the learning material</h2>
      <p className="mt-2">The stories, exercises and exam practice were written for this app. They are <b>not official papers of the Goethe-Institut</b>. Exam formats and times shown here are approximate, so check them with your teacher and the official sample tests.</p>
      <p className="mt-2">The Tamil and German texts can contain mistakes. If you find one, please use <b>Report a problem</b>.</p>

    </main>
  );
}
