import styles from "./FaqAccordion.module.scss";
import { Icon } from "@iconify/react";

export interface FaqAccordionProps {
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FaqAccordion({ title, description, isOpen, onToggle }: FaqAccordionProps) {
  return (
    <div className={styles.faqAccordion}>
      <div className={styles.title} onClick={() => onToggle()}>
        <h3 className={styles.titleText}>{title}</h3>
        <Icon icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} width={28} />
      </div>
      <div className={`${styles.content} ${isOpen ? styles.open : ""}`} inert={!isOpen}>
        <div className={styles.contentInner}>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
}
