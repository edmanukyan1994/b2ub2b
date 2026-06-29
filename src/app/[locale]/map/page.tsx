import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import { ProjectsMap } from "@/components/map/ProjectsMap";
import { PageSceneLayout } from "@/components/layout/PageSceneLayout";
import { loadMapContent } from "@/lib/content/loaders";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "map" });
  return { title: `${t("title")} | B2U B2B` };
}

export default async function MapPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("map");
  const tNav = await getTranslations("nav");
  const loc = locale as Locale;
  const { mapProjects, markerByProject } = await loadMapContent();

  const byCountry = mapProjects.reduce<Record<string, typeof mapProjects>>(
    (acc, p) => {
      if (!acc[p.country]) acc[p.country] = [];
      acc[p.country].push(p);
      return acc;
    },
    {},
  );

  return (
    <PageSceneLayout variant="vivid">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader title={t("title")} label={tNav("map")} description={t("subtitle")} />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="liquid-glass-panel overflow-hidden p-2 md:p-3">
              <ProjectsMap locale={loc} projects={mapProjects} markerByProject={markerByProject} />
            </div>
          </AnimatedSection>

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(byCountry).map(([country, projects]) => (
              <AnimatedSection key={country}>
                <div className="liquid-glass-panel page-glass-card p-6">
                  <h3 className="relative z-10 text-lg font-semibold">{country}</h3>
                  <p className="relative z-10 mt-1 text-sm text-muted">
                    {projects.length} {t("projects")}
                  </p>
                  <ul className="relative z-10 mt-4 space-y-3">
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
    </PageSceneLayout>
  );
}
