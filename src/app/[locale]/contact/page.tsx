import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageSceneLayout } from "@/components/layout/PageSceneLayout";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: `${t("title")} | B2UB2B` };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("contact");
  const tNav = await getTranslations("nav");

  return (
    <PageSceneLayout variant="shimmer">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader title={t("title")} label={tNav("contact")} description={t("subtitle")} align="center" className="mx-auto" />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <ContactForm locale={locale as Locale} />
          </AnimatedSection>
        </div>
      </section>
    </PageSceneLayout>
  );
}
