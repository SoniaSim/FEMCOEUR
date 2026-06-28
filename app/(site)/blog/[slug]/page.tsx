import { getArticleBySlug, getArticles } from "@/lib/sanity/fetch";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { formatSanityDateFr } from "@/lib/sanity/formatSanityDate";
import { SanityImage } from "@/components/ui/SanityImage";
import { basePortableTextComponents } from "@/lib/portable-text-components";

const CATEGORY_LABELS: Record<string, string> = {
  research: "Recherche",
  clinical: "Clinique",
  news: "Actualités",
  prevention: "Prévention",
};

function formatCategory(value: string): string {
  return CATEGORY_LABELS[value] ?? value;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles
    .filter((article): article is typeof article & { slug: string } =>
      typeof article.slug === "string" && article.slug.trim() !== ""
    )
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Article non trouvé" };
  }

  const title = article.title ?? "";
  const ogImageUrl = article.seo?.image?.url ?? article.image?.url ?? null;
  const ogImageAlt = article.seo?.image?.alt ?? article.image?.alt ?? title;

  return {
    title: article.seo?.title ?? title,
    description: article.seo?.description ?? "",
    alternates: {
      canonical: `https://femcoeur.fr/blog/${slug}`,
    },
    openGraph: {
      title: (article.seo?.title ?? title) || undefined,
      description: article.seo?.description ?? undefined,
      url: `https://femcoeur.fr/blog/${slug}`,
      type: "article",
      images: ogImageUrl ? [{ url: ogImageUrl, alt: ogImageAlt }] : [],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      {/* ===== HEADER ARTICLE ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-accent/15 blur-2xl pointer-events-none" />

        <div
          className={`container relative z-10 pt-10 md:pt-14 ${
            article.image?.url ? "pb-32 md:pb-44" : "pb-10 md:pb-14"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/65 hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>

            {article.categories && article.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {article.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground"
                  >
                    {formatCategory(category)}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-4 border-t border-primary/15">
              <div className="flex items-center gap-2.5 text-sm text-foreground/70">
                <span className="shrink-0 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                </span>
                <span>{formatSanityDateFr(article.date)}</span>
              </div>
              {article.author && (
                <div className="flex items-center gap-2.5 text-sm text-foreground/70">
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-primary" />
                  </span>
                  <span className="font-semibold">Dre. {article.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMAGE PRINCIPALE (chevauche proprement le bas du header) ===== */}
      {article.image?.url && (
        <section className="bg-background">
          <div className="container">
            <div className="relative z-10 max-w-4xl mx-auto -mt-24 md:-mt-32">
              <div className="relative h-64 md:h-96 lg:h-[460px] w-full rounded-3xl overflow-hidden border border-primary/15 shadow-xl">
                <SanityImage
                  image={article.image}
                  fallbackAlt={article.title ?? ""}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover"
                  preload
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== CONTENU ===== */}
      <section className={`bg-background ${article.image?.url ? "pt-10 md:pt-14 pb-16 md:pb-24" : "py-16 md:py-24"}`}>
        <div className="container">
          <article className="max-w-3xl mx-auto">
            {article.body && (
              <div
                className="
                  [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-black [&_h2]:text-foreground
                  [&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:leading-tight [&_h2]:tracking-tight
                  [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-bold [&_h3]:text-foreground
                  [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:leading-snug
                  [&_p]:text-base [&_p]:md:text-lg [&_p]:text-foreground/75 [&_p]:leading-relaxed [&_p]:mb-5
                  [&_strong]:text-primary [&_strong]:font-bold
                  [&_em]:italic
                  [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/30 [&_a]:underline-offset-4 [&_a:hover]:decoration-primary
                  [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-foreground/80 [&_blockquote]:my-8
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-5 [&_ul]:text-foreground/75
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-5 [&_ol]:text-foreground/75
                "
              >
                <PortableText
                  value={article.body}
                  components={basePortableTextComponents}
                />
              </div>
            )}
          </article>
        </div>
      </section>

      {/* ===== RETOUR ===== */}
      <section className="pb-16 md:pb-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto pt-8 border-t border-primary/10 text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 font-bold border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
            >
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4" />
                Retour au blog
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
