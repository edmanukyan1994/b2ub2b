import Image from "next/image";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProject } from "@/content/portfolio";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const { portfolioProjects } = await import("@/content/portfolio");
  const locales = ["en", "ru", "hy", "it"];
  return locales.flatMap((locale) =>
    portfolioProjects.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: `${project.title[locale as Locale]} | B2U B2B` };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("portfolio");
  const loc = locale as Locale;

  return (
    <div className="pt-20">
      <section className="relative min-h-[55vh] overflow-hidden">
        <div className={cn("absolute inset-0 bg-gradient-to-br", project.gradient)} />
        {project.coverImage && (
          <Image
            src={project.coverImage}
            alt={project.title[loc]}
            fill
            unoptimized={project.coverAnimated}
            className="object-cover object-top"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/20" />

        <div className="relative mx-auto flex min-h-[55vh] w-full max-w-7xl flex-col justify-end px-6 py-20 md:px-8 lg:py-28">
          <AnimatedSection>
            <Link href="/portfolio" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
              ← {t("backToPortfolio")}
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.clientLogo && (
                <div className="rounded-xl bg-white px-4 py-2.5">
                  <Image
                    src={project.clientLogo}
                    alt={project.client}
                    width={140}
                    height={48}
                    className="h-7 w-auto max-w-[130px] object-contain"
                  />
                </div>
              )}
              <span className="text-sm font-medium text-white/70">
                {project.city[loc]}, {project.year}
              </span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
              {project.title[loc]}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/85">{project.description[loc]}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-semibold">{t("worksTitle")}</h2>
            <ul className="mt-6 space-y-4">
              {project.works.map((work, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-muted">
                  <span className="font-medium text-foreground">—</span>
                  {work[loc]}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl font-semibold">{t("resultsTitle")}</h2>
            <ul className="mt-6 space-y-4">
              {project.results.map((result, i) => (
                <li key={i} className="liquid-glass rounded-2xl p-4 font-medium">
                  {result[loc]}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
