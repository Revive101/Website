"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.scss";
import { Group } from "@/lib/docs/types";

export interface SidebarProps {
  groups: Group[];
}

export default function Sidebar({ groups }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Documentation">
      {groups.map(({ group, docs }) => {
        return (
          <div key={group} className={styles.group}>
            <h2>{group}</h2>
            <ul>
              {docs.map((d) => {
                const href = `/docs/${d.slug}`;
                const active = pathname === href;

                return (
                  <li key={d.slug}>
                    <Link href={href} className={`${styles.link} ${active ? styles.active : ""}`}>
                      {d.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
