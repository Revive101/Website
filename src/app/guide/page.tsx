import styles from "./page.module.scss";
import Header from "@/components/Header/Header";

export default function Guide() {
  return (
    <div className={styles.guidePage}>
      <div className={styles.background} aria-hidden="true">
        <div className={`${styles.bgShape} ${styles.bgBrand}`} />
        <div className={`${styles.bgShape} ${styles.bgAurorium}`} />
        <div className={`${styles.bgShape} ${styles.bgImlight}`} />
      </div>

      <Header />
      <aside className={styles.sidebar}>
        <div className={styles.sidebarInner}></div>
      </aside>
      <main className={styles.main}>TBD!</main>
      <div className={styles.sidebarSpacer} aria-hidden="true" />
    </div>
  );
}
