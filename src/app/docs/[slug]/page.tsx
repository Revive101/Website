import { getAdjacent, getAllDocs, getDescription, getDoc } from "@/lib/docs/content";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkAlert from "remark-github-blockquote-alert";
import "remark-github-blockquote-alert/alert.css";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import "highlight.js/styles/atom-one-dark.css";
import rehypeHighlight from "rehype-highlight";
import { Metadata } from "next";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export interface DocPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getAllDocs()).map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: DocPageProps): Promise<Partial<Metadata>> {
  const { slug } = await params;
  const doc = await getDoc(slug);
  const description = getDescription(doc);
  const url = `/docs/${slug}`;

  if (!doc) {
    return {
      title: "Not Found",
      description: "The requested documentation page could not be found.",
      keywords: SITE.keywords,
      alternates: { canonical: url },
      openGraph: {
        title: "Not Found",
        description: "The requested documentation page could not be found.",
        url: url,
        siteName: SITE.name,
        locale: "en_US",
        type: "article",
      },
    } as Metadata;
  }

  return {
    title: doc.title,
    description,
    keywords: [...SITE.keywords, ...(doc.tags ?? [])],
    alternates: { canonical: url },
    openGraph: {
      title: doc.title,
      description,
      url,
      siteName: SITE.name,
      locale: "en_US",
      type: "article",
      tags: doc.tags,
      section: doc.group,
      //TODO: publishedTime, modifiedTime
    },
  } as Metadata;
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = await getDoc(slug);
  if (!doc) notFound();

  const { prev, next } = await getAdjacent(slug);

  return (
    <div className={styles.doc}>
      <MDXRemote
        source={doc.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, [remarkAlert, { legacyTitle: true }]],
            rehypePlugins: [
              rehypeSlug,
              rehypeHighlight,
              [
                rehypeAutolinkHeadings,
                {
                  properties: { className: ["heading-anchor"], ariaLabel: "Link to this section" },
                  content: { type: "text", value: "#" },
                },
              ],
            ],
          },
        }}
      />
      <div className={styles.adjacent}>
        {prev && (
          <a href={`/docs/${prev.slug}`} className={styles.prev}>
            &larr; {prev.title}
          </a>
        )}
        {next && (
          <a href={`/docs/${next.slug}`} className={styles.next} style={{ marginLeft: !prev ? "auto" : 0 }}>
            {next.title} &rarr;
          </a>
        )}
      </div>
    </div>
  );
}
