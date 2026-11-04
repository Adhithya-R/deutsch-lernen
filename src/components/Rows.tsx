import Link from "next/link";
import Icon from "@/components/Icon";
import type { Lesson } from "@/content/lessons";
import { isLive, type MenuItem } from "@/content/menu";

export function LessonRow({ lesson, index, done, current }: { lesson: Lesson; index: number; done: boolean; current?: boolean }) {
  return (
    <Link
      href={`/lessons/${lesson.slug}`}
      className={`flex items-center gap-3 rounded-2xl border bg-white p-3.5 hover:border-pri ${current ? "border-2 border-pri" : "border-line"}`}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sand text-[13px] font-bold text-pri">{index}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold leading-snug">{lesson.title.en}</span>
        <span lang="ta" className="block text-[13px] text-muted">{lesson.title.ta}</span>
      </span>
      <span className={done ? "text-ok" : "text-pri"} aria-label={done ? "Completed" : "Not completed"}>
        <Icon name={done ? "checkc" : "chev"} size={done ? 22 : 20} />
      </span>
    </Link>
  );
}

export function MenuRow({ item }: { item: MenuItem }) {
  const inner = (
    <>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold leading-snug">
          {item.en}
          {!isLive(item) && (
            <span className="ml-2 rounded-md bg-butter px-1.5 py-0.5 align-middle text-[10px] font-bold text-butter-ink">Soon</span>
          )}
        </span>
        <span lang="ta" className="block text-[13px] text-muted">{item.ta}</span>
      </span>
      <Icon name={isLive(item) ? "chev" : "lock"} size={isLive(item) ? 20 : 18} className="shrink-0 text-muted" />
    </>
  );
  const cls = "flex items-center gap-3 rounded-2xl border border-line bg-white p-3.5";
  return isLive(item) ? (
    <Link href={item.href!} className={`${cls} hover:border-pri`}>{inner}</Link>
  ) : (
    <div aria-disabled="true" className={`${cls} opacity-60`}>{inner}</div>
  );
}
