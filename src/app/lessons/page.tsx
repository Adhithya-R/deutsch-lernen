import { redirect } from "next/navigation";

// The grammar lessons now live under Cheat sheets & grammar.
export default function LessonsIndex() {
  redirect("/cheatsheets");
}
