import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPortfolioProjects, getService, getServices } from "@/lib/content";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const services = await getServices();
  const locales = ["en", "ru", "hy", "it"];
  return locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return { title: `${service.title[locale as Locale]} | B2U B2B` };
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const service = await getService(slug);
  if (!service) notFound();

  const t = await getTranslations("services");
  const tHome = await getTranslations("home");
  const tNav = await getTranslations("nav");
  const loc = locale as Locale;
  const portfolioProjects = await getPortfolioProjects();
  const services = await getServices();
  const related = portfolioProjects.slice(0, 2);

  return (
    <div className="pt-20">
      <section className="border-b border-border bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
              {service.title[loc]}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {service.description[loc]}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader title={t("benefitsTitle")} label={service.title[loc]} />
          </AnimatedSection>
          <div className="grid gap-4 md:grid-cols-3">
            {service.benefits.map((benefit, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="rounded-2xl border border-border p-6">
                  <span className="text-sm font-medium text-muted">0{i + 1}</span>
                  <p className="mt-3 leading-relaxed">{benefit[loc]}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {service.faq.length > 0 && (
        <section className="border-t border-border bg-accent-light py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <AnimatedSection>
              <SectionHeader title={t("faqTitle")} label={t("faqTitle")} />
            </AnimatedSection>
            <div className="space-y-4">
              {service.faq.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <details className="group rounded-2xl border border-border bg-white p-6">
                    <summary className="cursor-pointer font-semibold">{item.question[loc]}</summary>
                    <p className="mt-4 leading-relaxed text-muted">{item.answer[loc]}</p>
                  </details>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader title={t("casesTitle")} label={tHome("casesLabel")} />
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((project) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className={cn(
                  "block overflow-hidden rounded-2xl bg-gradient-to-br p-8 text-white transition-transform hover:scale-[1.02]",
                  project.gradient,
                )}
              >
                <p className="text-sm opacity-80">{project.client}</p>
                <h3 className="mt-2 text-xl font-semibold">{project.title[loc]}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-accent-light py-24 md:py-32">
        <div className="mx-auto max-w-xl px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              title={t("requestTitle")}
              label={tNav("contact")}
              description={t("requestText")}
            />
            <ContactForm locale={loc} defaultService={service.slug} showSidebar={false} services={services} />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
