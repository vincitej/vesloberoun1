"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./GalleryClient.module.css";

interface GalleryImage {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  year: number;
  order: number;
}

interface GalleryClientProps {
  images: GalleryImage[];
}

export default function GalleryClient({ images }: GalleryClientProps) {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openAlbum = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const availableYears = Array.from(
    new Set(images.map((img) => img.year))
  ).sort((a, b) => b - a);

  const filteredImages =
    selectedYear === "all"
      ? images
      : images.filter((img) => img.year.toString() === selectedYear);

  const imagesByYear = filteredImages.reduce((acc, img) => {
    const year = img.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(img);
    return acc;
  }, {} as Record<number, GalleryImage[]>);

  const sortedYears = Object.keys(imagesByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      {images.length > 0 && (
        <div className={styles.filterBar}>
          <span className={styles.filterLabel}>Filtrovat podle roku:</span>
          <div className={styles.customSelect}>
            <button
              className={`${styles.selectTrigger} ${
                isDropdownOpen ? styles.open : ""
              }`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedYear === "all" ? "Všechny roky" : selectedYear}
              </span>
              <span className={styles.arrow}>▼</span>
            </button>
            {isDropdownOpen && (
              <div className={styles.optionsList}>
                <button
                  className={`${styles.option} ${
                    selectedYear === "all" ? styles.selected : ""
                  }`}
                  onClick={() => {
                    setSelectedYear("all");
                    setIsDropdownOpen(false);
                  }}
                >
                  Všechny roky
                </button>
                {availableYears.map((year) => (
                  <button
                    key={year}
                    className={`${styles.option} ${
                      selectedYear === year.toString() ? styles.selected : ""
                    }`}
                    onClick={() => {
                      setSelectedYear(year.toString());
                      setIsDropdownOpen(false);
                    }}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {images.length === 0 ? (
        <div className={styles.empty}>Zatím nejsou žádná alba.</div>
      ) : (
        <>
          {sortedYears.map((year) => (
            <div key={year} className={styles.yearSection}>
              <h2 className={styles.yearHeading}>{year}</h2>
              <div className={styles.gallery}>
                {imagesByYear[year].map((image) => (
                  <div
                    key={image.id}
                    className={styles.imageWrapper}
                    onClick={() => openAlbum(image.url)}
                  >
                    <Image
                      src={image.thumbnail}
                      alt={image.title}
                      width={400}
                      height={300}
                      className={styles.thumbnail}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                      unoptimized
                    />
                    <div className={styles.overlay}>
                      <span className={styles.clickHint}>🔗 {image.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
