import { redirect } from "next/navigation";

// /work is now the single index. This route is kept so existing links do not break.
export default function CaseStudies() {
  redirect("/work");
}
