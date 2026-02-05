'use client';

import React, { useState } from 'react';
import styles from './Gallery.module.css';
import { Photo } from '@/types';

interface GalleryProps {
  photos: Photo[];
}

/**
 * Fotogalerie s lightbox funkcionalitou
 */
export default function Gallery({ photos }: GalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(nextIndex);
    setSelectedPhoto(photos[nextIndex]);
  };

  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedPhoto(photos[prevIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'ArrowLeft') goToPrevious();
  };

  return (
    <>
      <div className={styles.gallery}>
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={styles.photoItem}
            onClick={() => openLightbox(photo, index)}
          >
            <img
              src={photo.thumbnail}
              alt={photo.title}
              className={styles.thumbnail}
            />
            <div className={styles.overlay}>
              <span className={styles.viewIcon}>🔍</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className={styles.lightbox}
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
        >
          <button
            className={styles.closeButton}
            onClick={closeLightbox}
            aria-label="Zavřít"
          >
            ×
          </button>

          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Předchozí"
          >
            ‹
          </button>

          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Další"
          >
            ›
          </button>

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className={styles.lightboxImage}
            />
            <div className={styles.lightboxInfo}>
              <h3 className={styles.lightboxTitle}>{selectedPhoto.title}</h3>
              {selectedPhoto.description && (
                <p className={styles.lightboxDescription}>{selectedPhoto.description}</p>
              )}
              <p className={styles.lightboxMeta}>
                {selectedPhoto.category} • {new Date(selectedPhoto.date).toLocaleDateString('cs-CZ')}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
