import { promises as fs } from "fs";
import { unstable_noStore as noStore } from "next/cache";
import type { Locale } from "@/i18n/routing";
import { CMS_DIR, CMS_MESSAGES_DIR, CMS_STORE_PATH, cmsMessagesPath } from "./paths";
import { buildDefaultStore } from "./seed";
import type { CmsStore } from "./types";

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

export async function readCmsStore(): Promise<CmsStore> {
  noStore();
  try {
    const raw = await fs.readFile(CMS_STORE_PATH, "utf-8");
    return JSON.parse(raw) as CmsStore;
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
