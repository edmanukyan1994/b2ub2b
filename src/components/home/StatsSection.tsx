"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { cn } from "@/lib/utils";

const stats = [
  { value: "12+", key: "years" as const },
  { value: "150+", key: "projects" as const },
  { value: "8+", key: "countries" as const },
  { value: "50+", key: "experts" as const },
  { value: "24h", key: "response" as const },
];

export function StatsSection() {
  const t = useTranslations("home.stats");

  return (
    <section className="section-liquid relative py-16 md:py-24">
      <LiquidBackground variant="subtle" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <AnimatedSection>
          <div className="liquid-glass-panel relative overflow-hidden p-8 md:p-12 lg:p-14">
            <div className="relative z-10 mb-10 text-center md:mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted">{t("label")}</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-primary md:text-4xl">{t("title")}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-secondary md:text-lg">{t("subtitle")}</p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
              {stats.map((stat, i) => (
                <div
                  key={stat.key}
                  className={cn(
                    "liquid-glass rounded-[1.25rem] px-4 py-6 text-center md:rounded-[1.5rem] md:px-6 md:py-8",
                    i === stats.length - 1 && "col-span-2 md:col-span-1",
                  )}
                >
                  <p className="bg-gradient-to-br from-sky-500 to-blue-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted md:text-sm">
                    {t(stat.key)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
