import { getArticleBySlug, getAllArticles } from '@/lib/dato-cms/fetchers';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const { allArticles } = await getAllArticles(100, 0);
  return allArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Article non trouvé',
    };
  }

  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.content.substring(0, 160),
    openGraph: {
      title: article.seo?.title || article.title,
      description: article.seo?.description || article.content.substring(0, 160),
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

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="container py-16">
      <article className="max-w-3xl mx-auto">
        {article.image && (
          <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.image.url}
              alt={article.image.alt || article.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">
            {format(new Date(article.date), 'd MMMM yyyy', { locale: fr })}
          </p>
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">Par {article.author}</p>
          {article.categories && article.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.categories.map((category, index) => (
                <Badge key={index} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </div>
  );
}

