import type { Locale } from "@/i18n/routing";
import type { LocalizedString } from "@/lib/types";
import type { CmsSection, CmsStore } from "@/lib/cms/types";

export function emptyLocalized(): LocalizedString {
  return { en: "", ru: "", hy: "", it: "" };
}

export function ensureLocalized(value?: Partial<LocalizedString> | null): LocalizedString {
  return {
    en: value?.en ?? "",
    ru: value?.ru ?? "",
    hy: value?.hy ?? "",
    it: value?.it ?? "",
  };
}

export function getByPath(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as object)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function setByPath(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  const keys = path.split(".");
  const root = structuredClone(obj);
  let cursor: Record<string, unknown> = root;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      cursor[key] = value;
      return;
    }
    if (!cursor[key] || typeof cursor[key] !== "object") {
      cursor[key] = {};
    }
    cursor = cursor[key] as Record<string, unknown>;
  });
  return root;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getSectionList(store: CmsStore, section: CmsSection): unknown[] {
  const data = store[section];
  if (section === "siteSettings") return [];
  return Array.isArray(data) ? data : [];
}

export function localeFlag(locale: Locale) {
  return ({ en: "🇬🇧", ru: "🇷🇺", hy: "🇦🇲", it: "🇮🇹" } as const)[locale];
}
