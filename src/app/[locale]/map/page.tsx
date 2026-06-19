import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { mapProjects } from "@/content/site-data";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import { ProjectsMap } from "@/components/map/ProjectsMap";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "map" });
  return { title: `${t("title")} | B2UB2B` };
}

export default async function MapPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("map");
  const tNav = await getTranslations("nav");
  const loc = locale as Locale;

  const byCountry = mapProjects.reduce<Record<string, typeof mapProjects>>(
    (acc, p) => {
      if (!acc[p.country]) acc[p.country] = [];
      acc[p.country].push(p);
      return acc;
    },
    {},
  );

  return (
    <div className="pt-20">
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader title={t("title")} label={tNav("map")} description={t("subtitle")} />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <ProjectsMap locale={loc} />
          </AnimatedSection>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(byCountry).map(([country, projects]) => (
              <AnimatedSection key={country}>
                <div className="rounded-2xl border border-border p-6">
                  <h3 className="text-lg font-semibold">{country}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {projects.length} {t("projects")}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {projects.map((p) => (
                      <li key={p.id} className="text-sm">
                        <span className="font-medium">{p.title[loc]}</span>
                        <span className="block text-muted">{p.type[loc]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
