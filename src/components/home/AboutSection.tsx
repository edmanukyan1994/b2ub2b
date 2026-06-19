import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import { Button, Card } from "@/components/ui/Button";
import { LiquidBackground } from "@/components/ui/LiquidBackground";

export function AboutSection({ locale }: { locale: Locale }) {
  const t = useTranslations("home");
  void locale;
  const items = ["Business consulting & launch", "Engineering & HoReCa solutions", "Digital products & automation", "Marketing, branding & scale"];

  return (
    <section className="section-liquid relative border-t border-white/20 py-24 md:py-32">
      <LiquidBackground variant="subtle" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimatedSection>
            <SectionHeader label={t("aboutLabel")} title={t("aboutTitle")} description={t("aboutText")} />
            <Button href="/about" variant="secondary">{t("readMore")} →</Button>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Card glass hover={false}>
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item} className="flex items-center gap-4 border-b border-border/60 pb-6 last:border-0 last:pb-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cta/10 text-cta">
                      <Check size={18} strokeWidth={2.5} />
                    </span>
                    <p className="font-medium text-primary">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
