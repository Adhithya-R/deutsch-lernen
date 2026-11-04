import Link from "next/link";
import Icon from "@/components/Icon";

type Target = { href: string; label: string };

/** Back, Home and Next at the bottom of a page, so you can always move on or get home. */
export default function PageNav({ back, next }: { back?: Target; next?: Target }) {
  return (
    <nav aria-label="Page navigation" className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
      {back ? (
        <Link href={back.href} className="btn3d btn3d-ghost !min-h-12 !justify-start !gap-1.5 !px-3 !text-[13px] !normal-case">
          <Icon name="back" size={18} className="shrink-0" />
          <span className="truncate">{back.label}</span>
        </Link>
      ) : (
        <span />
      )}
      <Link href="/" aria-label="Home" className="grid h-12 w-12 place-items-center rounded-full border-2 border-b-4 border-line bg-white text-pri">
        <Icon name="home" size={22} />
      </Link>
      {next ? (
        <Link href={next.href} className="btn3d !min-h-12 !justify-end !gap-1.5 !px-3 !text-[13px] !normal-case">
          <span className="truncate">{next.label}</span>
          <Icon name="arrow" size={18} className="shrink-0" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
