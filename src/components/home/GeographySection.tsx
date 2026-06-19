import { useTranslations } from "next-intl";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";

export function GeographySection() {
  const t = useTranslations("home");
  const countries = t.raw("countryList") as string[];

  return (
    <section className="section-liquid relative border-t border-white/20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader label={t("geoLabel")} title={t("geoTitle")} description={t("geoText")} />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap gap-3">
            {countries.map((country) => (
              <Badge key={country} className="cursor-default px-4 py-2 text-sm">{country}</Badge>
            ))}
          </div>
          <Link href="/map" className="mt-8 inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-cta transition-colors hover:text-primary">
            {t("viewAll")} <ArrowUpRight size={14} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
