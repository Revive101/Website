import styles from "./TemplateEntry.module.scss";

export interface TemplateEntryProps {
  id: number;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function TemplateEntry({ id, name, isSelected, onClick }: TemplateEntryProps) {
  return (
    <div className={`${styles.templateEntry} ${isSelected ? styles.selected : ""}`} onClick={onClick}>
      <span className={styles.templateId}>{id}</span>
      <span className={styles.templateName}>{name}</span>
    </div>
  );
}
