"use client";

import styles from "./Hero.module.scss";
import { Icon } from "@iconify/react";

export default function Hero() {
  // Docs page
  const clickLearnMore = (e: React.MouseEvent<HTMLButtonElement>) => {};

  // Download section
  const clickStartExploring = (e: React.MouseEvent<HTMLButtonElement>) => {
    document.getElementById("download")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={styles.heroContent}>
      <div className={styles.heroMain}>
        <h1>Revive101</h1>
        <p>An independent private server project aimed to reimagine a classic wizard adventure.</p>
        <div className={styles.heroActions}>
          <button className={styles.primaryButton} onClick={clickLearnMore}>
            Learn More
          </button>
          <button className={styles.secondaryButton} onClick={clickStartExploring}>
            Start Exploring <Icon width={20} icon="material-symbols:east-rounded" />
          </button>
        </div>
      </div>
      <div
        className={styles.scrollIndicator}
        onClick={() => document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth", block: "start" })}
      >
        <Icon icon="material-symbols:keyboard-arrow-down-rounded" width={64} />
      </div>
    </div>
  );
}
