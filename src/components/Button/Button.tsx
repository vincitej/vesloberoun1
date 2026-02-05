import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  [key: string]: any;
}

/**
 * Univerzální tlačítko s různými variantami
 * @param variant - primary (modrá), secondary (červená), outline (obrysové)
 * @param size - sm, md, lg
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  href,
  type = "button",
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  const classNames = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classNames} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames}
      {...props}
    >
      {children}
    </button>
  );
}
