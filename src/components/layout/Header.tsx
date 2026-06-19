"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { localeNames, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";

const navItems = [
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/map", key: "map" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/services") return pathname.includes("/services");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      document.body.dataset.menuOpen = "true";
    } else {
      delete document.body.dataset.menuOpen;
    }
    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.menuOpen;
    };
  }, [open]);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="menu-page-blur cursor-pointer lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {open && (
        <div className="mobile-nav-drawer liquid-glass-nav-drawer p-6 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "nav-link-glass cursor-pointer rounded-2xl px-4 py-3.5 text-base font-bold",
                    active ? "bg-white/30 text-slate-900" : "text-slate-900 hover:bg-white/22",
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
            <div className="mt-4 border-t border-white/35 pt-4">
              <LanguageSwitcher current={locale} />
              <Button href="/contact" className="mt-4 w-full" onClick={() => setOpen(false)}>
                {t("getStarted")}
              </Button>
            </div>
          </nav>
        </div>
      )}

      <header className="pointer-events-none fixed inset-x-0 top-0 z-[120] px-4 pt-4 md:px-6">
        <div className="pointer-events-auto relative mx-auto max-w-7xl liquid-glass-nav flex items-center justify-between px-5 py-2.5 md:px-7">
          <Link href="/" className="flex shrink-0 cursor-pointer items-center" onClick={() => setOpen(false)}>
            <BrandLogo width={132} priority />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "nav-link-glass cursor-pointer rounded-full px-3.5 py-2 text-sm font-bold transition-all duration-200",
                    active
                      ? "bg-white/35 text-slate-900"
                      : "text-slate-900 hover:bg-white/28",
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher current={locale} />
            <Button href="/contact" size="sm">{t("getStarted")}</Button>
          </div>

          <button
            type="button"
            className="nav-link-glass cursor-pointer rounded-full p-2 text-slate-900 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
          </button>
        </div>
      </header>
    </>
  );
}

function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-0.5 liquid-glass-pill-nav p-1">
      {(["en", "ru", "hy", "it"] as Locale[]).map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          className={cn(
            "nav-link-glass cursor-pointer rounded-full px-2.5 py-1 text-xs font-bold uppercase transition-all",
            current === loc
              ? "liquid-btn-primary px-3 py-1 text-[10px] text-white"
              : "text-slate-900 hover:bg-white/35",
          )}
          title={localeNames[loc]}
        >
          {loc}
        </Link>
      ))}
    </div>
  );
}
