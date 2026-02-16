import { getArticleBySlug, getAllArticles } from "@/lib/dato-cms/fetchers";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const { allArticles } = await getAllArticles(100, 0);
  return allArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article non trouvé",
    };
  }

  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.content.substring(0, 160),
    openGraph: {
      title: article.seo?.title || article.title,
      description:
        article.seo?.description || article.content.substring(0, 160),
      images: article.image
        ? [
            {
              url: article.image.url,
              alt: article.image.alt || article.title,
            },
          ]
        : article.seo?.image
        ? [{ url: article.seo.image.url }]
        : [],
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
      {/* Hero Section avec image */}
      <section className="relative bg-linear-to-br from-primary/10 via-background to-accent/5">
        <div className="container py-8 md:py-12">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link href="/blog" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>
          </Button>
        </div>
      </section>

      {/* Image de l'article */}
      {article.image && (
        <section className="bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="relative h-64 md:h-96 lg:h-[500px] w-full rounded-xl overflow-hidden border-2 border-border shadow-lg">
                <Image
                  src={article.image.url}
                  alt={article.image.alt || article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu de l'article */}
      <section className="py-section md:py-section-md bg-background">
        <div className="container">
          <article className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 border-2">
              {/* En-tête de l'article */}
              <header className="mb-8 pb-8 border-b">
                {article.categories && article.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.categories.map((category, index) => (
                      <Badge
                        key={index}
                        className="bg-primary text-primary-foreground"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                )}

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>
                      {format(new Date(article.date), "d MMMM yyyy", {
                        locale: fr,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{article.author}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto gap-2">
                    <Share2 className="w-4 h-4" />
                    Partager
                  </Button>
                </div>
              </header>

              {/* Contenu : titres et paragraphes stylés via Tailwind */}
              <div
                className="
                  prose
                  [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-foreground
                  [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:leading-tight
                  [&_h3]:text-lg [&_h3]:md:text-xl [&_h3]:font-semibold [&_h3]:text-foreground
                  [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:leading-snug
                  [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-5
                  [&_strong]:text-foreground [&_strong]:font-semibold
                  [&_a]:text-primary [&_a]:underline [&_a:hover]:opacity-80
                "
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </Card>

            {/* Navigation */}
            <div className="mt-12 text-center">
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/blog">
                  <ArrowLeft className="w-4 h-4" />
                  Retour au blog
                </Link>
              </Button>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
