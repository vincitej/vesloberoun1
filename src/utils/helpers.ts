/**
 * Formátuje datum do českého formátu
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Formátuje krátké datum
 */
export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

/**
 * Vytvoří slug z textu
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Odstraní diakritiku
    .replace(/[^a-z0-9]+/g, "-") // Nahradí non-alfanumerické znaky pomlčkou
    .replace(/^-+|-+$/g, ""); // Odstraní pomlčky na začátku a konci
}

/**
 * Ořízne text na určitý počet znaků
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

/**
 * Validace emailu
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validace českého telefonního čísla
 */
export function isValidPhoneCZ(phone: string): boolean {
  const phoneRegex = /^(\+420)?[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

/**
 * Formátuje telefonní číslo
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\s/g, "");
  if (cleaned.startsWith("+420")) {
    return `+420 ${cleaned.substring(4, 7)} ${cleaned.substring(
      7,
      10
    )} ${cleaned.substring(10)}`;
  }
  return phone;
}
