import styles from "./Skeleton.module.css";

interface SkeletonProps {
  variant?: "text" | "card" | "image" | "gallery";
  count?: number;
}

export default function Skeleton({ variant = "text", count = 1 }: SkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (variant === "card") {
    return (
      <>
        {skeletons.map((i) => (
          <div key={i} className={styles.cardSkeleton}>
            <div className={styles.imageSkeleton} />
            <div className={styles.contentSkeleton}>
              <div className={styles.titleSkeleton} />
              <div className={styles.textSkeleton} />
              <div className={styles.textSkeleton} />
            </div>
          </div>
        ))}
      </>
    );
  }

  if (variant === "gallery") {
    return (
      <>
        {skeletons.map((i) => (
          <div key={i} className={styles.gallerySkeleton}>
            <div className={styles.galleryImageSkeleton} />
          </div>
        ))}
      </>
    );
  }

  if (variant === "image") {
    return <div className={styles.imageSkeleton} />;
  }

  return (
    <>
      {skeletons.map((i) => (
        <div key={i} className={styles.textSkeleton} />
      ))}
    </>
  );
}
