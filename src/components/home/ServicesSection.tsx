import { useTranslations } from "next-intl";
import { Briefcase, DraftingCompass, UtensilsCrossed, Code2, Megaphone, Users, Globe, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { Service } from "@/lib/types";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Button";
import { GlossIcon } from "@/components/ui/GlossIcon";
import { LiquidBackground } from "@/components/ui/LiquidBackground";

const icons: Record<string, React.ReactNode> = {
  briefcase: <Briefcase size={24} strokeWidth={1.75} />,
  blueprint: <DraftingCompass size={24} strokeWidth={1.75} />,
  utensils: <UtensilsCrossed size={24} strokeWidth={1.75} />,
  code: <Code2 size={24} strokeWidth={1.75} />,
  megaphone: <Megaphone size={24} strokeWidth={1.75} />,
  users: <Users size={24} strokeWidth={1.75} />,
  globe: <Globe size={24} strokeWidth={1.75} />,
};

const iconColors = [
  "cyan",
  "blue",
  "teal",
  "violet",
  "orange",
  "blue",
  "slate",
] as const;

export function ServicesSection({ locale, services }: { locale: Locale; services: Service[] }) {
  const t = useTranslations("home");

  return (
    <section className="section-liquid relative border-t border-white/20 py-20 md:py-28">
      <LiquidBackground variant="subtle" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedSection><SectionHeader label={t("servicesLabel")} title={t("servicesTitle")} /></AnimatedSection>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <AnimatedSection key={service.slug} delay={i * 0.04}>
              <Link href={`/services/${service.slug}`} className="block h-full cursor-pointer">
                <Card className="group flex h-full flex-col transition-transform duration-300 hover:-translate-y-0.5">
                  <GlossIcon color={iconColors[i % iconColors.length]} className="mb-5 transition-transform duration-300 group-hover:scale-105">
                    {icons[service.icon]}
                  </GlossIcon>
                  <h3 className="text-lg font-semibold tracking-tight text-primary">{service.title[locale]}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.shortDescription[locale]}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cta opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {t("readMore")} <ArrowUpRight size={14} />
                  </span>
                </Card>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
