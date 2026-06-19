"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { PortfolioCategory } from "@/lib/types";
import { portfolioProjects } from "@/content/portfolio";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { cn } from "@/lib/utils";

const filters: { key: PortfolioCategory | "all"; labelKey: string }[] = [
  { key: "all", labelKey: "filterAll" },
  { key: "hotels", labelKey: "filterHotels" },
  { key: "restaurants", labelKey: "filterRestaurants" },
  { key: "commercial", labelKey: "filterCommercial" },
  { key: "manufacturing", labelKey: "filterManufacturing" },
  { key: "malls", labelKey: "filterMalls" },
  { key: "web", labelKey: "filterWeb" },
  { key: "automation", labelKey: "filterAutomation" },
];

export function PortfolioGrid({ locale }: { locale: Locale }) {
  const t = useTranslations("portfolio");
  const [active, setActive] = useState<PortfolioCategory | "all">("all");

  const filtered =
    active === "all"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === active);

  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const others = filtered.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <AnimatedSection>
        <SectionHeader title={t("title")} label="Portfolio" description={t("subtitle")} />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              className={cn(
                "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                active === f.key
                  ? "liquid-btn-primary text-white"
                  : "liquid-glass-pill text-slate-800 hover:bg-white/30",
              )}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {featured && (
        <AnimatedSection delay={0.12} className="mb-6">
          <PortfolioCard project={featured} locale={locale} size="featured" />
        </AnimatedSection>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {others.map((project, i) => (
          <AnimatedSection key={project.slug} delay={0.05 + i * 0.04}>
            <PortfolioCard project={project} locale={locale} className="h-full min-h-[300px]" />
          </AnimatedSection>
        ))}
      </div>
    </>
  );
}
