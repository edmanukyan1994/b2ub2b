import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { services } from "@/content/services";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: `${t("title")} | B2UB2B` };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("services");
  const loc = locale as Locale;

  return (
    <div className="pt-20">
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader title={t("title")} label="Services" description={t("subtitle")} />
          </AnimatedSection>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service, i) => (
              <AnimatedSection key={service.slug} delay={i * 0.05}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex items-start justify-between rounded-2xl border border-border p-8 transition-all hover:border-foreground/20 hover:shadow-lg"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{service.title[loc]}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {service.shortDescription[loc]}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
