import { promises as fs } from "fs";
import { unstable_noStore as noStore } from "next/cache";
import type { Locale } from "@/i18n/routing";
import { CMS_DIR, CMS_MESSAGES_DIR, CMS_STORE_PATH, cmsMessagesPath } from "./paths";
import { buildDefaultStore } from "./seed";
import type { CmsStore, HeroStats } from "./types";
import { DEFAULT_HERO_STATS } from "./types";

function normalizeHeroStats(partial: Partial<HeroStats> | undefined, defaults: HeroStats): HeroStats {
  const keys = ["years", "projects", "countries", "services"] as const;
  const result = { ...defaults };
  for (const key of keys) {
    const value = partial?.[key];
    if (typeof value === "string" && value.trim()) {
      result[key] = value.trim();
    }
  }
  return result;
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

export function normalizeCmsStore(partial: Partial<CmsStore> | null | undefined): CmsStore {
  const defaults = buildDefaultStore();
  if (!partial || typeof partial !== "object") return defaults;

  return {
    siteSettings: {
      ...defaults.siteSettings,
      ...(partial.siteSettings && typeof partial.siteSettings === "object" ? partial.siteSettings : {}),
      logoUrl:
        typeof partial.siteSettings?.logoUrl === "string" && partial.siteSettings.logoUrl
          ? partial.siteSettings.logoUrl
          : defaults.siteSettings.logoUrl,
      heroStats: normalizeHeroStats(partial.siteSettings?.heroStats, defaults.siteSettings.heroStats),
    },
    services: Array.isArray(partial.services) ? partial.services : defaults.services,
    portfolioProjects: Array.isArray(partial.portfolioProjects) ? partial.portfolioProjects : defaults.portfolioProjects,
    clientLogos: Array.isArray(partial.clientLogos) ? partial.clientLogos : defaults.clientLogos,
    portfolioCategories: Array.isArray(partial.portfolioCategories) ? partial.portfolioCategories : defaults.portfolioCategories,
    blogPosts: Array.isArray(partial.blogPosts) ? partial.blogPosts : defaults.blogPosts,
    mapProjects: Array.isArray(partial.mapProjects) ? partial.mapProjects : defaults.mapProjects,
    partners: Array.isArray(partial.partners) ? partial.partners : defaults.partners,
    testimonials: Array.isArray(partial.testimonials) ? partial.testimonials : defaults.testimonials,
    mapMarkerByProject: {
      ...defaults.mapMarkerByProject,
      ...(partial.mapMarkerByProject && typeof partial.mapMarkerByProject === "object" ? partial.mapMarkerByProject : {}),
    },
  };
}

export async function readCmsStore(): Promise<CmsStore> {
  noStore();
  try {
    const raw = await fs.readFile(CMS_STORE_PATH, "utf-8");
    return normalizeCmsStore(JSON.parse(raw) as Partial<CmsStore>);
  } catch {
    const store = buildDefaultStore();
    await writeCmsStore(store);
    return store;
  }
}

export async function writeCmsStore(store: CmsStore): Promise<void> {
  await ensureDir(CMS_DIR);
  await fs.writeFile(CMS_STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
}

export async function readCmsMessages(locale: Locale): Promise<Record<string, unknown>> {
  noStore();
  try {
    const raw = await fs.readFile(cmsMessagesPath(locale), "utf-8");
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    const bundled = (await import(`../../../messages/${locale}.json`)).default as Record<string, unknown>;
    await writeCmsMessages(locale, bundled);
    return structuredClone(bundled);
  }
}

export async function writeCmsMessages(locale: Locale, messages: Record<string, unknown>): Promise<void> {
  await ensureDir(CMS_MESSAGES_DIR);
  await fs.writeFile(cmsMessagesPath(locale), JSON.stringify(messages, null, 2), "utf-8");
}

export async function readAllCmsMessages(): Promise<Record<Locale, Record<string, unknown>>> {
  const locales: Locale[] = ["en", "ru", "hy", "it"];
  const entries = await Promise.all(locales.map(async (locale) => [locale, await readCmsMessages(locale)] as const));
  return Object.fromEntries(entries) as Record<Locale, Record<string, unknown>>;
}
