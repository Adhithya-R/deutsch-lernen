import Link from "next/link";
import CaseTable from "@/components/CaseTable";
import DataTable from "@/components/DataTable";
import { definiteArticles, indefiniteArticles } from "@/content/lessons";

export const metadata = { title: "Cases cheat sheet · மொழி-Brücke" };

export default function CasesPage() {
  return (
    <main className="mx-auto w-full max-w-2xl space-y-6 p-4">
      <Link href="/" className="text-sm underline">← Home</Link>
      <header>
        <h1 className="text-2xl font-bold text-brand-800">Cases cheat sheet</h1>
        <p lang="ta" className="text-lg text-slate-700">வேற்றுமை குறிப்பு அட்டவணை</p>
      </header>

      <DataTable
        table={{
          title: "Which case? / எந்த வேற்றுமை?",
          headers: ["Case", "Question", "Used for", "Tamil (approx.)"],
          rows: [
            ["Nominativ", "Wer? Was?", "the subject", "எழுவாய்"],
            ["Akkusativ", "Wen? Was?", "the direct object", "~ -ஐ (செயப்படுபொருள்)"],
            ["Dativ", "Wem?", "the indirect object", "~ -க்கு"],
          ],
        }}
      />

      <CaseTable title="Definite articles (der/die/das)" rows={definiteArticles} />
      <CaseTable title="Indefinite articles (ein/eine)" rows={indefiniteArticles} />

      <DataTable
        table={{
          title: "Prepositions that always take…",
          headers: ["Akkusativ", "Dativ"],
          rows: [
            ["für, durch, gegen, ohne, um", "aus, bei, mit, nach, seit, von, zu"],
          ],
        }}
      />

      <DataTable
        table={{
          title: "Common verbs with Dativ",
          headers: ["Verb", "Example", "English"],
          rows: [
            ["helfen", "Ich helfe dir.", "I help you."],
            ["danken", "Ich danke dir.", "I thank you."],
            ["gefallen", "Das Buch gefällt mir.", "I like the book."],
            ["gehören", "Das Auto gehört mir.", "The car belongs to me."],
          ],
        }}
      />

      <p className="text-sm text-slate-600">
        Tamil case endings are only a rough guide. German cases are shown by the article, not by an ending on the noun.
      </p>
    </main>
  );
}
