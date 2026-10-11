import Header from "@/components/Header/Header";
import styles from "./page.module.scss";
import { Metadata } from "next";
import FaqSection from "./components/FaqSection";

export const metadata: Metadata = {
  title: "Revive101",
  applicationName: "Revive101",
  description:
    "Revive101 is an independent, community-built project bringing back the world from Wizard101 you remember. fully open source, free to play, and built by the community.",
  authors: [{ name: "Phill030", url: "https://phill030.de" }],
  keywords: [
    "wizard101",
    "revive101",
    "private server",
    "mmorpg",
    "game",
    "community",
    "open source",
    "mmo",
    "free2play",
    "free to play",
    "wizard101 private server",
    "free download",
  ],
  publisher: "Phill030",
  creator: "Phill030",
  category: "gaming",
  openGraph: {
    title: "Revive101",
    description:
      "Revive101 is an independent, community-built project bringing back the world from Wizard101 you remember. fully open source, free to play, and built by the community.",
    url: "https://revive101.de",
    siteName: "Revive101",
    locale: "en_US",
    type: "website",
  },
};

export default function Faq() {
  return (
    <div className={styles.faqPage}>
      <div className={styles.background} aria-hidden="true">
        <div className={`${styles.bgShape} ${styles.bgBrand}`} />
        <div className={`${styles.bgShape} ${styles.bgAurorium}`} />
        <div className={`${styles.bgShape} ${styles.bgImlight}`} />
      </div>

      <Header />
      <main>
        <FaqSection />
      </main>
    </div>
  );
}
