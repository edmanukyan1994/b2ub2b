import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ru", "hy", "it"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "en",
  localePrefix: "always",
});

export const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  hy: "Հայերեն",
  it: "Italiano",
};
