import { redirect } from "next/navigation";
import { getAllDocs } from "@/lib/docs/content";

export default async function DocsIndex() {
  const [first] = await getAllDocs();

  if (!first) {
    return <p>No docs found.</p>;
  }

  redirect(`/docs/${first.slug}`);
}
