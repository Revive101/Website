import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { Doc } from "./types";

const DOCS_DIR = path.join(process.cwd(), "content/docs");

function parseTags(value: unknown): string[] {
  const list = Array.isArray(value) ? value : typeof value === "string" ? value.split(",") : [];
  return [
    ...new Set(
      list
        .map((t) => String(t).trim().toLowerCase().replace(/\s+/g, "-"))
        .filter(Boolean)
    ),
  ];
}

function _isNullOrUndefined(value: any): value is null | undefined {
  return value === null || value === undefined;
}

export const getAllDocs = cache(async (): Promise<Doc[]> => {
const files = (await fs.readdir(DOCS_DIR)).filter((f) => /\.mdx?$/.test(f));

  const docs = await Promise.all(
    files.map(async (file) => {
        const raw = await fs.readFile(path.join(DOCS_DIR, file), "utf8");
        const { data, content } = matter(raw);

        if (_isNullOrUndefined(data.title) || _isNullOrUndefined(data.group) || _isNullOrUndefined(data.order)) {
            throw new Error(`Missing required frontmatter in ${file}`);
        }

        return {
            slug: file.replace(/\.mdx?$/, ""),
            title: data.title,
            description: data.description ? String(data.description) : undefined,
            group: data.group,
            tags: data.tags ? parseTags(data.tags) : [],
            order: data.order,
            content
        } as Doc;
    })
  );

  return docs.sort((a, b) => a.order - b.order);
});

export async function getDoc(slug: string): Promise<Doc | null> {
    return (await getAllDocs()).find((doc) => doc.slug === slug) || null;
}

export async function getGroupedDocs(): Promise<{ group: string; docs: Doc[] }[]> {
  const groups = new Map<string, Doc[]>();
  for (const doc of await getAllDocs()) {
    groups.set(doc.group, [...(groups.get(doc.group) ?? []), doc]);
  }

  return [...groups].map(([group, docs]) => ({ group, docs }));
}

export async function getAdjacent(slug: string) {
    const docs = await getAllDocs();
    const idx = docs.findIndex((doc) => doc.slug === slug);
    return { prev: docs[idx - 1] ?? null, next: docs[idx + 1] ?? null };
}

export function toPlain(md: string) {
  return md
    .replace(/^\s*```.*$/gm, "") // code fence lines
    .replace(/<[^>]+>/g, " ") // JSX tags like <Callout> and <Step>
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links to their text
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, "") // list, quote and heading markers
    .replace(/\*\*|`/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getDescription(doc: Doc | null, max = 155) {
  if (!doc) return "";
  if (doc.description) return doc.description;
  if (!doc.content.trim()) return "";

  const intro = toPlain(doc.content.split(/\n#{2,4}\s/)[0]); // text before the first heading
  if (intro.length <= max) return intro;
  const cut = intro.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")) + "...";
}