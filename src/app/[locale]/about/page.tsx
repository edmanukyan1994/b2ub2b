import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import { PageSceneLayout } from "@/components/layout/PageSceneLayout";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: `${t("title")} | B2U B2B` };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("about");

  const stats = [
    { value: "12+", label: t("stats.years") },
    { value: "150+", label: t("stats.projects") },
    { value: "8+", label: t("stats.countries") },
    { value: "7", label: t("stats.services") },
  ];

  const values = ["expertise", "international", "fullCycle", "partnership"] as const;

  return (
    <PageSceneLayout variant="flare">
      <section className="border-b border-white/20 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader title={t("title")} label="B2U B2B" description={t("subtitle")} />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <AnimatedSection>
              <div className="liquid-glass-panel page-glass-card p-8 md:p-10">
                <h2 className="relative z-10 text-3xl font-semibold tracking-tight">{t("missionTitle")}</h2>
                <p className="relative z-10 mt-6 text-lg leading-relaxed text-muted">{t("missionText")}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="liquid-glass-panel page-glass-card p-6">
                    <p className="relative z-10 text-4xl font-semibold">{stat.value}</p>
                    <p className="relative z-10 mt-2 text-sm text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="border-t border-white/20 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader title={t("valuesTitle")} label="B2U B2B" />
          </AnimatedSection>
          <div className="grid gap-5 md:grid-cols-2">
            {values.map((key, i) => (
              <AnimatedSection key={key} delay={i * 0.08}>
                <div className="liquid-glass-panel page-glass-card p-8">
                  <h3 className="relative z-10 text-xl font-semibold">{t(`values.${key}.title`)}</h3>
                  <p className="relative z-10 mt-4 leading-relaxed text-muted">{t(`values.${key}.text`)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <AnimatedSection>
            <div className="liquid-glass-panel page-glass-card p-10 md:p-12">
              <h2 className="relative z-10 text-3xl font-semibold">{t("teamTitle")}</h2>
              <p className="relative z-10 mt-6 text-lg leading-relaxed text-muted">{t("teamText")}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageSceneLayout>
  );
}
