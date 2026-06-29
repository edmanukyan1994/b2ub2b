import path from "path";

export const CMS_DIR = process.env.CMS_DATA_PATH ?? path.join(process.cwd(), "data/cms");
export const CMS_STORE_PATH = path.join(CMS_DIR, "store.json");
export const CMS_MESSAGES_DIR = path.join(CMS_DIR, "messages");

export function cmsMessagesPath(locale: string) {
  return path.join(CMS_MESSAGES_DIR, `${locale}.json`);
}
