"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import Header from "@/components/Header/Header";
import TemplateEntry, { TemplateEntryProps } from "./components/TemplateEntry";
import { deserializeFromCdn } from "@/lib/imcodec";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.min.css";

export default function TemplateManifest() {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const [filteredTemplates, setFilteredTemplates] = useState<Omit<TemplateEntryProps, "isSelected" | "onClick">[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [selectedTemplateData, setSelectedTemplateData] = useState<any | null>(null);
  const codeRef = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    deserializeFromCdn("https://cdn.revive101.de/imcodec/Root.wad/TemplateManifest.xml")
      .then((manifest) => {
        setLoading(false);
        setFilteredTemplates(
          manifest["_object"]["m_serializedTemplates"]
            .filter((template: any) => {
              const name = template["m_filename"] as string;
              return !name.includes("|");
            })
            .map((template: any) => ({
              id: template["m_id"],
              name: template["m_filename"],
            })),
        );
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedTemplate === null) {
      setSelectedTemplateData(null);
      return;
    }

    const selected = filteredTemplates.find((t) => t.id === selectedTemplate);
    if (!selected) return;

    let cancelled = false;
    deserializeFromCdn(`https://cdn.revive101.de/imcodec/Root.wad/${selected.name}`)
      .then((data) => {
        if (!cancelled) setSelectedTemplateData(data);
      })
      .catch((err) => {
        if (!cancelled) console.error(err);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedTemplate, filteredTemplates]);

  // Highlight after React renders the new code
  useEffect(() => {
    if (codeRef.current) {
      delete codeRef.current.dataset.highlighted;
      hljs.highlightElement(codeRef.current);
    }
  }, [selectedTemplateData]);

  return (
    <div className={styles.tmPage}>
      <div className={styles.background} aria-hidden="true">
        <div className={`${styles.bgShape} ${styles.bgBrand}`} />
        <div className={`${styles.bgShape} ${styles.bgAurorium}`} />
        <div className={`${styles.bgShape} ${styles.bgImlight}`} />
      </div>

      <Header />
      <aside className={styles.sidebar}>
        <div className={styles.sidebarInner}>
          <input type="search" className={styles.searchInput} placeholder="Search..." />
          <div className={styles.manifestList}>
            {filteredTemplates.slice(0, 1000).map((template) => {
              return (
                <TemplateEntry
                  key={template.id}
                  {...template}
                  isSelected={selectedTemplate === template.id}
                  onClick={() => {
                    setSelectedTemplate(template.id);
                  }}
                />
              );
            })}
          </div>
          <p>{filteredTemplates.length} templates</p>
        </div>
      </aside>
      <main className={styles.main}>
        {selectedTemplateData ? (
          <pre
            tabIndex={0}
            onKeyDown={(event) => {
              if ((event.ctrlKey || event.metaKey) && event.key === "a") {
                event.preventDefault();

                const selection = window.getSelection();
                const range = document.createRange();

                range.selectNodeContents(event.currentTarget);
                selection?.removeAllRanges();
                selection?.addRange(range);
              }
            }}
          >
            <code ref={codeRef} className="language-json">
              {JSON.stringify(selectedTemplateData, null, 2)}
            </code>
          </pre>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
}
