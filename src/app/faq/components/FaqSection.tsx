"use client";

import { useState } from "react";
import FaqAccordion, { FaqAccordionProps } from "./FaqAccordion";
import styles from "./FaqSection.module.scss";

const faqs: Omit<FaqAccordionProps, "isOpen" | "onToggle">[] = [
  {
    title: "What is Revive101 and what is its purpose?",
    description:
      "Revive101 is a fan-made opensource project dedicated to preserving Wizard101 through community-driven software development, research, and game infrastructure. Our goal is to provide a free-to-play, open-source alternative, allowing players to enjoy the game without any obligation to pay for in-game content.",
  },
  {
    title: "Is Revive101 free to play?",
    description:
      "Yes, Revive101 is free to access and contribute to. Our software is open source and there is no purchase required to access the game or acquire any in-game content.",
  },
  {
    title: "What do I need to play Revive101?",
    description:
      "You need a computer with an internet connection and a compatible operating system. You can use your normal Wizard101 client to connect to your server. Currently we do not support consoles or cross-play.",
  },
  {
    title: "Is Revive101 affiliated with KingsIsle?",
    description:
      "No. Revive101 is an independent fan-made project and is not affiliated or endorsed by KingsIsle Entertainment or any other company.",
  },
  {
    title: "Is Revive101 safe?",
    description:
      "Yes, Revive101 is safe to play. We utilize the official Wizard101 client and do not modify any game files. Since we are open source, you can also review our code at any time to ensure that it is safe and secure.",
  },
  {
    title: "Are all worlds available?",
    description:
      "Theoretically yes. However, every NPC-Inventory, Quest and mechanic has to be re-implemented from scratch. This is a long and tedious process.",
  },
  {
    title: "Are all quests available?",
    description:
      "No. Quests are being re-implemented by hand. This is a long process. We are currently focusing on the main storyline quests.",
  },
  {
    title: "Can I apply as Developer?",
    description:
      "Revive101 is open source. If you want to contribute, please check out our GitHub and make yourself familiar with our contribution guidelines. We are always happy for new contributors.",
  },
  {
    title: "How do I install Revive101?",
    description:
      "You can find the installation instructions in our Guide. Please make sure to read the instructions carefully and follow them step by step.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.faqSection}>
      <div className={styles.title}>
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to the most common questions about Revive101.</p>
      </div>
      <div className={styles.accordionContainer}>
        {faqs.map((faq, idx) => {
          return (
            <FaqAccordion key={idx} {...faq} isOpen={openIndex === idx} onToggle={() => setOpenIndex(openIndex === idx ? null : idx)} />
          );
        })}
      </div>
    </div>
  );
}
