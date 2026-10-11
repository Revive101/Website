import { getGroupedDocs } from "@/lib/docs/content";
import styles from "./docs.module.scss";
import Header from "@/components/Header/Header";
import Sidebar from "./components/Sidebar";

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const groups = await getGroupedDocs();

  return (
    <div className={styles.docsPage}>
      <div className={styles.background} aria-hidden="true">
        <div className={`${styles.bgShape} ${styles.bgBrand}`} />
        <div className={`${styles.bgShape} ${styles.bgAurorium}`} />
        <div className={`${styles.bgShape} ${styles.bgImlight}`} />
      </div>

      <Header />

      <aside className={styles.sidebar}>
        <div className={styles.sidebarInner}>
          <Sidebar groups={groups} />
        </div>
      </aside>

      <main className={styles.main}>{children}</main>
      <div className={styles.sidebarSpacer} aria-hidden="true" />
    </div>
  );
}
