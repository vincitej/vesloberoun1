"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./PageTransition.module.css";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Pokud URL obsahuje hash (kotvu), neposouváme na začátek
    if (window.location.hash) {
      return;
    }
    // Jinak posuneme na začátek stránky
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return <div className={styles.pageTransition}>{children}</div>;
}
