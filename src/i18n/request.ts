import { getRequestConfig } from "next-intl/server";
import { readCmsMessages } from "@/lib/cms/store";
import { routing, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: await readCmsMessages(locale as Locale),
  };
});
