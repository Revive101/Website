"use client";

import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Icon } from "@iconify/react";
import Image from "next/image";

const links = [
  { href: "/faq", label: "FAQ" },
  { href: "/guide", label: "Guide" },
  { href: "/docs", label: "Docs" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${isMenuOpen ? styles.menuOpen : ""}`}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <Image src="/images/r101_logo.webp" alt="Revive101 Logo" className={styles.logoImg} width={32} height={32} /> Revive101
        </a>

        <nav className={styles.desktopNav}>
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className={styles.burger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
        >
          <Icon icon={isMenuOpen ? "mdi:close" : "mdi:menu"} width={28} height={28} />
        </button>
      </div>
      <nav id="mobile-nav" className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ""}`} aria-label="Mobile" aria-hidden={!isMenuOpen}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setIsMenuOpen(false)} tabIndex={isMenuOpen ? 0 : -1}>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
