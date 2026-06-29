import type { Partner } from "@/lib/types";
import { useTranslations } from "next-intl";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { PartnerLogoMarquee } from "@/components/ui/PartnerLogoMarquee";

export function PartnersSection({ partners }: { partners: Partner[] }) {
  const t = useTranslations("home");

  return (
    <section className="section-liquid relative border-t border-white/20 py-20 md:py-28">
      <LiquidBackground variant="subtle" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <AnimatedSection>
          <div className="liquid-glass-panel overflow-hidden px-6 py-10 md:px-10 md:py-12">
            <div className="relative z-10 text-center">
              <SectionHeader
                label={t("partnersLabel")}
                title={t("partnersTitle")}
                description={t("partnersText")}
                align="center"
                className="mx-auto mb-0 max-w-2xl"
              />
            </div>
            <div className="relative z-10 mt-10">
              <PartnerLogoMarquee partners={partners} />
            </div>
            <div className="relative z-10 mt-6 hidden opacity-70 md:block">
              <PartnerLogoMarquee partners={partners} reverse />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
