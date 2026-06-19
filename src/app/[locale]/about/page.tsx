import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: `${t("title")} | B2UB2B` };
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
    <div className="pt-20">
      <section className="border-b border-border bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader title={t("title")} label="B2UB2B" description={t("subtitle")} />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <AnimatedSection>
              <h2 className="text-3xl font-semibold tracking-tight">{t("missionTitle")}</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{t("missionText")}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border p-6">
                    <p className="text-4xl font-semibold">{stat.value}</p>
                    <p className="mt-2 text-sm text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-accent-light py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader title={t("valuesTitle")} label="B2UB2B" />
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((key, i) => (
              <AnimatedSection key={key} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-white p-8">
                  <h3 className="text-xl font-semibold">{t(`values.${key}.title`)}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{t(`values.${key}.text`)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-semibold">{t("teamTitle")}</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">{t("teamText")}</p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
