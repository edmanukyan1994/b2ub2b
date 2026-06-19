import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { services } from "@/content/services";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import { PageSceneLayout } from "@/components/layout/PageSceneLayout";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: `${t("title")} | B2U B2B` };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("services");
  const tNav = await getTranslations("nav");
  const loc = locale as Locale;

  return (
    <PageSceneLayout variant="glare">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader title={t("title")} label={tNav("services")} description={t("subtitle")} />
          </AnimatedSection>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service, i) => (
              <AnimatedSection key={service.slug} delay={i * 0.05}>
                <Link
                  href={`/services/${service.slug}`}
                  className="liquid-glass-panel page-glass-card group flex items-start justify-between p-8 transition-shadow hover:shadow-lg"
                >
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold">{service.title[loc]}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {service.shortDescription[loc]}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="relative z-10 shrink-0 opacity-60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </PageSceneLayout>
  );
}
