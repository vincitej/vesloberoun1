import React from "react";
import Image from "next/image";
import Button from "../Button/Button";
import styles from "./Hero.module.css";

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  height?: "small" | "medium" | "large";
  className?: string;
}

/**
 * Hero sekce pro hlavní stránku nebo podstránky
 * @param height - small (400px), medium (500px), large (600px)
 */
export default function Hero({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaLink,
  height = "large",
  className = "",
}: HeroProps) {
  return (
    <section className={`${styles.hero} ${styles[height]} ${className}`}>
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt={title}
            fill
            priority
            className={styles.heroImage}
            sizes="100vw"
            quality={90}
          />
          <div className={styles.overlay} />
        </>
      )}

      <div className={`container ${styles.heroContent}`}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {ctaText && ctaLink && (
          <div className={styles.ctaContainer}>
            <Button href={ctaLink} size="lg" variant="secondary">
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
