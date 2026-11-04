import { redirect } from "next/navigation";

// The grammar lessons live at /grammar.
export default function LessonsIndex() {
  redirect("/grammar");
}
