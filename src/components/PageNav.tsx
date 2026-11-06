import Link from "next/link";
import Icon from "@/components/Icon";

type Target = { href: string; label: string };

/** Back and Next at the bottom of pages that follow an order (lessons, cheat sheets, topics, exam parts). */
export default function PageNav({ back, next }: { back?: Target; next?: Target }) {
  return (
    <nav aria-label="Page navigation" className="mt-8 grid grid-cols-2 items-center gap-2">
      {back ? (
        <Link href={back.href} className="btn3d btn3d-ghost min-w-0 !min-h-12 !justify-start !gap-1.5 !px-3 !text-[13px] !normal-case">
          <Icon name="back" size={18} className="shrink-0" />
          <span className="truncate">{back.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="btn3d min-w-0 !min-h-12 !justify-end !gap-1.5 !px-3 !text-[13px] !normal-case">
          <span className="truncate">{next.label}</span>
          <Icon name="arrow" size={18} className="shrink-0" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
