import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { blogPosts } from "@/content/site-data";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: `${t("title")} | B2UB2B` };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("blog");
  const tNav = await getTranslations("nav");
  const loc = locale as Locale;

  return (
    <div className="pt-20">
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader title={t("title")} label={tNav("blog")} description={t("subtitle")} />
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border p-8 transition-all hover:border-foreground/20 hover:shadow-lg"
                >
                  <time className="text-sm text-muted">
                    {new Date(post.date).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h3 className="mt-4 text-xl font-semibold group-hover:underline">
                    {post.title[loc]}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {post.excerpt[loc]}
                  </p>
                  <span className="mt-4 text-sm text-muted">
                    {post.readTime} {t("readTime")}
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
