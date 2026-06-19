import { useTranslations } from "next-intl";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import { Card } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { LiquidBackground } from "@/components/ui/LiquidBackground";

export function PillarsSection() {
  const t = useTranslations("home");
  const p = useTranslations("pillars");
  const pillars = [{ key: "launch", number: "01" }, { key: "engineering", number: "02" }, { key: "digital", number: "03" }] as const;

  return (
    <section className="section-liquid relative border-t border-white/20 py-24 md:py-32">
      <LiquidBackground variant="subtle" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedSection><SectionHeader label={t("pillarsLabel")} title={t("pillarsTitle")} /></AnimatedSection>
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <AnimatedSection key={pillar.key} delay={i * 0.08}>
              <Link href="/services" className="block h-full">
                <Card glass className="h-full">
                  <span className="text-xs font-bold tracking-widest text-cta">{pillar.number}</span>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-primary">{p(`${pillar.key}.title`)}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{p(`${pillar.key}.text`)}</p>
                </Card>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
