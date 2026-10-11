import Hero from "@/components/Home/Hero";
import styles from "./page.module.scss";
import Header from "@/components/Header/Header";
import Showcase from "@/components/Home/Showcase";
import Features from "@/components/Home/Features";
import Download from "@/components/Home/Download";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.background} aria-hidden="true">
        <div className={`${styles.bgShape} ${styles.bgBrand}`} />
        <div className={`${styles.bgShape} ${styles.bgAurorium}`} />
        <div className={`${styles.bgShape} ${styles.bgImlight}`} />
      </div>
      <Header />
      <main>
        <Hero />
        <Showcase />
        <Features />
        <Download />
      </main>
    </div>
  );
}
