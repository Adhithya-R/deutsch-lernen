// Helpers so Tamil help can be switched off ("English only") without touching every table.
const TAMIL = /[஀-௿]/;
const LATIN = /[A-Za-z]/;

export const isTamilOnly = (s: string) => TAMIL.test(s) && !LATIN.test(s);
/** A column is "Tamil help" when its header is Tamil, or says Tamil. */
export const isTamilColumn = (header: string) => isTamilOnly(header) || /tamil/i.test(header);

/** Renders "English / தமிழ்" so that only the Tamil part is hidden in English-only mode. */
export function Mixed({ text }: { text: string }) {
  return (
    <>
      {text.split(" / ").map((part, i) => {
        const sep = i > 0 ? " / " : "";
        return isTamilOnly(part) ? (
          <span key={i} lang="ta" className="ta-only">{sep}{part}</span>
        ) : (
          <span key={i}>{sep}{part}</span>
        );
      })}
    </>
  );
}
