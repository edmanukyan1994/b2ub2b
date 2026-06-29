import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { InfinityScene } from "@/components/ui/InfinityScene";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { PillarsSection } from "@/components/home/PillarsSection";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { GeographySection } from "@/components/home/GeographySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { StatsSection } from "@/components/home/StatsSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { CtaSection } from "@/components/home/CtaSection";
import { loadHomeContent } from "@/lib/content/loaders";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const content = await loadHomeContent();
  const loc = locale as Locale;

  return (
    <>
      <InfinityScene />
      <div className="page-content relative z-[2]">
        <Hero clientLogos={content.clientLogos} />
        <AboutSection locale={loc} />
        <PillarsSection />
        <ServicesSection locale={loc} services={content.services} />
        <PortfolioSection locale={loc} projects={content.portfolioProjects} />
        <ClientsSection clientLogos={content.clientLogos} />
        <StatsSection />
        <GeographySection />
        <TestimonialsSection locale={loc} testimonials={content.testimonials} />
        <PartnersSection partners={content.partners} />
        <CtaSection />
      </div>
    </>
  );
}
