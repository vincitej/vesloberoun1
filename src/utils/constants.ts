/**
 * Konstanty pro aplikaci VKK Beroun
 */

export const SITE_NAME = "Veslařský a kanoistický klub Beroun";
export const SITE_URL = "http://vesloberoun.cz";
export const SITE_EMAIL = "r.sehnoutkova64@gmail.com";
export const SITE_PHONE = "+420 602 683 113";

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/vkberoun",
} as const;

export const ADDRESS = {
  street: "Tyršova 85",
  city: "Beroun",
  zip: "266 01",
  country: "Česká republika",
} as const;

export const CATEGORIES = {
  zavod: "Závod",
  treninky: "Tréninky",
  akce: "Akce",
  uspech: "Úspěch",
} as const;

export const DIVISIONS = {
  pripravka: "Žactvo a přípravka (9-14 let)",
  mladez: "Dorost a starší (15+ let)",
} as const;

export const CONTACT_SUBJECTS = {
  membership: "Zájem o členství",
  training: "Dotaz k tréninku",
  competition: "Informace o závodech",
  other: "Ostatní",
} as const;
