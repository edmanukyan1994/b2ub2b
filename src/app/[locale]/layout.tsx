import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getServices } from "@/lib/content";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const [messages, services] = await Promise.all([
    getMessages(),
    getServices(),
  ]);

  return (
    <NextIntlClientProvider messages={messages}>
      <div aria-hidden className="mesh-bg pointer-events-none fixed inset-0 -z-10" />
      <Header />
      <main className="relative flex-1">{children}</main>
      <Footer locale={locale as Locale} services={services} />
    </NextIntlClientProvider>
  );
}
