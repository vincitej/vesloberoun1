import React from "react";
import Link from "next/link";
import Image from "next/image";
import Card from "../Card/Card";
import styles from "./ArticlePreview.module.css";
import type { Article } from "@/lib/queries";

interface ArticlePreviewProps {
  article: Article;
}

/**
 * Náhled článku pro výpis aktualit
 */
export default function ArticlePreview({ article }: ArticlePreviewProps) {
  const hasImage =
    !!article.image && article.image !== "/images/placeholder.webp";
  const placeholderPools: Record<string, string[]> = {
    akce: ["/images/tym.webp", "/images/lodenice.webp", "/images/treneri.webp"],
    treninky: [
      "/images/trener.webp",
      "/images/bazen.webp",
      "/images/rozvoj.webp",
    ],
    uspech: [
      "/images/laska.webp",
      "/images/material.webp",
      "/images/adresa.webp",
    ],
    zavody: ["/images/material.webp", "/images/rozvoj.webp"],
    novinky: ["/images/tym.webp", "/images/adresa.webp"],
  };
  const placeholderFallback = "/images/tym.webp";

  const pickPlaceholder = () => {
    const pool = placeholderPools[article.category] ?? [placeholderFallback];
    const seed = article.id ?? article.slug ?? "0";
    const hash = seed
      .toString()
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return pool[hash % pool.length] ?? placeholderFallback;
  };

  const imageSrc = hasImage ? article.image : pickPlaceholder();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      zavod: "Závod",
      treninky: "Tréninky",
      akce: "Akce",
      uspech: "Úspěch",
      zavody: "Závody",
    };
    return labels[category] || category;
  };

  return (
    <Card hover className={styles.card}>
      <Link href={`/aktuality/${article.slug}`} className={styles.articleLink}>
        <div className={styles.articlePreview}>
          <div className={styles.imageContainer}>
            <Image
              src={imageSrc}
              alt={article.title}
              width={600}
              height={400}
              className={styles.image}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              unoptimized={hasImage}
            />
            <span className={`${styles.category} ${styles[article.category]}`}>
              {getCategoryLabel(article.category)}
            </span>
          </div>
          <div className={styles.content}>
            <div className={styles.meta}>
              <span className={styles.date}>{formatDate(article.date)}</span>
              <span className={styles.author}>• {article.author}</span>
            </div>
            <h3 className={styles.title}>{article.title}</h3>
            <p className={styles.excerpt}>{article.excerpt}</p>
            <span className={styles.readMore}>Číst více →</span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
