import type { Locale } from "@/i18n/routing";
import type { PortfolioProject } from "@/lib/types";
import { useTranslations } from "next-intl";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";

export function PortfolioSection({ locale, projects }: { locale: Locale; projects: PortfolioProject[] }) {
  const t = useTranslations("home");
  const [featured, ...rest] = projects.slice(0, 4);

  return (
    <section className="section-liquid relative border-t border-white/20 py-24 md:py-32">
      <LiquidBackground variant="subtle" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedSection className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader label={t("portfolioLabel")} title={t("portfolioTitle")} />
          <Link
            href="/portfolio"
            className="mb-12 inline-flex shrink-0 cursor-pointer items-center gap-1 text-sm font-semibold text-cta hover:text-primary"
          >
            {t("viewAll")} <ArrowUpRight size={14} />
          </Link>
        </AnimatedSection>

        <div className="grid gap-5 lg:grid-cols-12 lg:grid-rows-2">
          <AnimatedSection delay={0.05} className="lg:col-span-7 lg:row-span-2">
            <PortfolioCard project={featured} locale={locale} size="featured" className="h-full" />
          </AnimatedSection>

          {rest.slice(0, 2).map((project, i) => (
            <AnimatedSection key={project.slug} delay={0.1 + i * 0.05} className="lg:col-span-5">
              <PortfolioCard project={project} locale={locale} className="h-full" />
            </AnimatedSection>
          ))}

          {rest[2] && (
            <AnimatedSection delay={0.2} className="lg:col-span-12">
              <PortfolioCard project={rest[2]} locale={locale} size="wide" />
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
}
