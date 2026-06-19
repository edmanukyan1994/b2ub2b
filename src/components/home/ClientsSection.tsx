"use client";

import { clientLogos } from "@/content/portfolio";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ClientLogoMarquee } from "@/components/ui/ClientLogoMarquee";

export function ClientsSection() {
  const t = useTranslations("home");

  return (
    <section className="section-liquid relative py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <AnimatedSection>
          <div className="liquid-glass-panel overflow-hidden px-6 py-10 md:px-12">
            <p className="relative z-10 mb-2 text-center text-xs font-bold uppercase tracking-[0.25em] text-muted">
              {t("clientsLabel")}
            </p>
            <h2 className="relative z-10 text-center text-2xl font-bold tracking-tight text-primary md:text-4xl">
              {t("clientsTitle")}
            </h2>
            <div className="relative z-10 mt-10">
              <ClientLogoMarquee logos={clientLogos} repeat={3} />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
