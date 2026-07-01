import { useTranslations } from "next-intl";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Service } from "@/lib/types";
import { Button } from "@/components/ui/Button";

export function Footer({ locale, services, logoUrl }: { locale: Locale; services: Service[]; logoUrl: string }) {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="section-liquid relative z-[2] pb-8 pt-4">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="liquid-glass-panel p-10 md:p-12">
          <div className="relative z-10 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <BrandLogo width={128} logoUrl={logoUrl} />
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{t("description")}</p>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-sky-600">{t("tagline")}</p>
              <div className="mt-8"><Button href="/contact" size="sm">{nav("getStarted")}</Button></div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold text-primary">{t("services")}</h3>
              <ul className="space-y-2">
                {services.slice(0, 4).map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className="cursor-pointer text-sm font-medium text-muted transition-colors hover:text-primary">
                      {service.title[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold text-primary">{t("company")}</h3>
              <ul className="space-y-2">
                {[
                  { href: "/about", label: nav("about") },
                  { href: "/portfolio", label: nav("portfolio") },
                  { href: "/blog", label: nav("blog") },
                  { href: "/contact", label: nav("contact") },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="cursor-pointer text-sm font-medium text-muted transition-colors hover:text-primary">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative z-10 mt-10 flex flex-col gap-4 border-t border-white/40 pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} B2U B2B. {t("rights")}</p>
            <p className="font-semibold">b2ub2b.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
