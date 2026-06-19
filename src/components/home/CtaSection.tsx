import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

export function CtaSection() {
  const t = useTranslations("home");

  return (
    <section className="section-liquid relative py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
        <AnimatedSection>
          <div className="liquid-glass-panel px-8 py-14 text-center md:px-16 md:py-16">
            <p className="relative z-10 text-xs font-bold uppercase tracking-[0.25em] text-sky-600">B2U B2B</p>
            <h2 className="relative z-10 mt-4 text-3xl font-bold tracking-tight text-primary md:text-4xl">{t("ctaTitle")}</h2>
            <p className="relative z-10 mx-auto mt-4 max-w-lg text-lg text-muted">{t("ctaText")}</p>
            <div className="relative z-10 mt-9 flex flex-wrap justify-center gap-3">
              <Button href="/contact" size="lg">Contact us</Button>
              <Button href="/portfolio" variant="secondary" size="lg">View portfolio</Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
