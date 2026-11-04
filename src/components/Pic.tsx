/** A small animated picture shown beside a word. Decorative, so hidden from screen readers. */
export default function Pic({ pic, size = 56 }: { pic: string; size?: number }) {
  const wide = pic.length <= 3 && /^[0-9A-Za-z]+$/.test(pic);
  return (
    <span
      aria-hidden="true"
      className="pic-bob inline-grid shrink-0 place-items-center rounded-2xl bg-pill leading-none"
      style={{ width: size * 1.25, height: size * 1.25, fontSize: wide ? size * 0.55 : size * 0.8, fontWeight: 800 }}
    >
      {pic}
    </span>
  );
}
