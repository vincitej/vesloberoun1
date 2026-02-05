"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

/**
 * Hlavička webu s navigací
 * Responzivní s hamburger menu na mobilu
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { label: "Domů", href: "/" },
    { label: "O klubu", href: "/o-klubu" },
    { label: "Aktuality", href: "/aktuality" },
    { label: "Galerie", href: "/galerie" },
    { label: "Členství", href: "/clenstvi" },
    { label: "Kontakt", href: "/kontakt" },
  ];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo.png"
            alt="Logo VKK Beroun"
            width={50}
            height={50}
            className={styles.logoImage}
            priority
          />
          <div className={styles.logoText}>
            <span className={styles.logoMain}>TJ Lokomotiva Beroun</span>
            <span className={styles.logoSub}>Veslařský a kanoistický klub</span>
          </div>
        </Link>

        {/* Desktop navigace */}
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobilní hamburger menu */}
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`${styles.hamburgerLine} ${
              isMenuOpen ? styles.open : ""
            }`}
          ></span>
          <span
            className={`${styles.hamburgerLine} ${
              isMenuOpen ? styles.open : ""
            }`}
          ></span>
          <span
            className={`${styles.hamburgerLine} ${
              isMenuOpen ? styles.open : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobilní menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.mobileNavLink}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
