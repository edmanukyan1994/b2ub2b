import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/content";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const blogPosts = await getBlogPosts();
  const locales = ["en", "ru", "hy", "it"];
  return locales.flatMap((locale) =>
    blogPosts.map((p) => ({ locale, slug: p.slug })),
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const t = await getTranslations("blog");
  const loc = locale as Locale;

  return (
    <div className="pt-20">
      <article className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <AnimatedSection>
            <Link href="/blog" className="text-sm text-muted hover:text-foreground">
              ← {t("backToBlog")}
            </Link>
            <time className="mt-8 block text-sm text-muted">
              {new Date(post.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              · {post.readTime} {t("readTime")}
            </time>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              {post.title[loc]}
            </h1>
            <div className="prose prose-neutral mt-10 max-w-none">
              {post.content[loc].split("\n\n").map((para, i) => (
                <p key={i} className="mb-6 leading-relaxed text-muted">
                  {para}
                </p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </article>
    </div>
  );
}
