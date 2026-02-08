"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import styles from "./AdminNav.module.css";
import Image from "next/image";

export default function AdminNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "articles";
  const { data: session } = useSession();

  const navItems = [
    {
      label: "/aktuality",
      href: "/admin?view=articles",
      icon: "📝",
      view: "articles",
    },
    {
      label: "/galerie",
      href: "/admin?view=gallery",
      icon: "🖼️",
      view: "gallery",
    },
    {
      label: "/clenstvi",
      href: "/admin?view=membership",
      icon: "📎",
      view: "membership",
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <span>Administrace</span>
        </div>
      </div>

      <div className={styles.userInfo}>
        <div className={styles.userAvatar}>
          {session?.user?.name?.[0] || "A"}
        </div>
        <div className={styles.userDetails}>
          <span className={styles.userName}>
            {session?.user?.name || "Admin"}
          </span>
          <span className={styles.userRole}>Administrátor</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navItem} ${
              pathname === "/admin" && currentView === item.view
                ? styles.active
                : ""
            }`}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {item.label}
          </Link>
        ))}

        <button
          className={styles.logoutBtn}
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          Odhlásit
        </button>
      </nav>

      <div className={styles.footer}>
        <Link href="/" className={styles.footerLink}>
          &larr; Zpět na web
        </Link>
      </div>
    </aside>
  );
}
