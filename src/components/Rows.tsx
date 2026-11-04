import Link from "next/link";
import Icon from "@/components/Icon";
import type { Lesson } from "@/content/lessons";
import { isLive, type MenuItem } from "@/content/menu";

const row = "flex items-center gap-3 rounded-2xl border-2 border-line bg-white p-3.5 shadow-[0_3px_0_var(--color-line)]";

export function LessonRow({ lesson, index, done }: { lesson: Lesson; index: number; done: boolean }) {
  return (
    <Link href={`/lessons/${lesson.slug}`} className={`${row} hover:border-pri`}>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-pill text-[13px] font-extrabold text-pri">{index}</span>
      <span className="min-w-0 flex-1 font-extrabold leading-snug">{lesson.title.en}</span>
      <span className={done ? "text-ok" : "text-pri"} aria-label={done ? "Completed" : "Not completed"}>
        <Icon name={done ? "checkc" : "chev"} size={done ? 22 : 20} />
      </span>
    </Link>
  );
}

export function MenuRow({ item }: { item: MenuItem }) {
  const live = isLive(item);
  const inner = (
    <>
      <span className="min-w-0 flex-1 font-extrabold leading-snug">
        {item.en}
        {!live && <span className="ml-2 rounded-md bg-butter px-1.5 py-0.5 align-middle text-[10px] font-extrabold text-butter-ink">Soon</span>}
      </span>
      <Icon name={live ? "chev" : "lock"} size={live ? 20 : 18} className="shrink-0 text-muted" />
    </>
  );
  return live ? (
    <Link href={item.href!} className={`${row} hover:border-pri`}>{inner}</Link>
  ) : (
    <div aria-disabled="true" className={`${row} opacity-60`}>{inner}</div>
  );
}
