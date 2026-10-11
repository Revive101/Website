"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import Header from "@/components/Header/Header";
import TemplateEntry, { TemplateEntryProps } from "./components/TemplateEntry";

const templates: Omit<TemplateEntryProps, "isSelected" | "onClick">[] = [
  { id: 1, name: "Template 1" },
  { id: 2, name: "Template 2" },
  { id: 3, name: "Template 3" },
  { id: 4, name: "Template 4" },
];

export default function TemplateManifest() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTemplates, setFilteredTemplates] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

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
            {templates.map((template) => {
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
        </div>
      </aside>
      <main className={styles.main}>{templates.find((t) => t.id === selectedTemplate)?.name}</main>
      <div className={styles.sidebarSpacer} aria-hidden="true" />
    </div>
  );
}
