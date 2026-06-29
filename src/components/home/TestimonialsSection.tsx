import type { Locale } from "@/i18n/routing";
import type { Testimonial } from "@/lib/types";
import { useTranslations } from "next-intl";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import { Card } from "@/components/ui/Button";
import { LiquidBackground } from "@/components/ui/LiquidBackground";

export function TestimonialsSection({ locale, testimonials }: { locale: Locale; testimonials: Testimonial[] }) {
  const t = useTranslations("home");

  return (
    <section className="section-liquid relative border-t border-white/20 py-24 md:py-32">
      <LiquidBackground variant="subtle" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedSection><SectionHeader label={t("testimonialsLabel")} title={t("testimonialsTitle")} /></AnimatedSection>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <AnimatedSection key={item.id} delay={i * 0.08}>
              <Card glass hover={false} className="flex h-full flex-col">
                <p className="flex-1 text-base leading-relaxed text-primary md:text-lg">&ldquo;{item.quote[locale]}&rdquo;</p>
                <footer className="mt-6 border-t border-border/60 pt-6">
                  <p className="font-semibold text-primary">{item.name[locale]}</p>
                  <p className="mt-1 text-sm text-muted">{item.role[locale]}, {item.company}</p>
                </footer>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
