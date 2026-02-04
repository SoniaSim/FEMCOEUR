import { getAllArticles } from '@/lib/dato-cms/fetchers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';

export default async function BlogPage() {
  const { allArticles, _allArticlesMeta } = await getAllArticles(12, 0);

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8">Blog & Actualités</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Restez informé des dernières actualités et publications de l&apos;association.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allArticles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            {article.image && (
              <div className="relative h-48 w-full">
                <Image
                  src={article.image.url}
                  alt={article.image.alt || article.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardDescription>
                {format(new Date(article.date), 'd MMMM yyyy', { locale: fr })}
              </CardDescription>
              <CardTitle className="line-clamp-2">{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Par {article.author}</p>
              {article.categories && article.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.categories.map((category, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-muted rounded-md"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
              <Button asChild variant="link" className="p-0">
                <Link href={`/blog/${article.slug}`}>Lire la suite →</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {allArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun article disponible pour le moment.</p>
        </div>
      )}

      {_allArticlesMeta.count > allArticles.length && (
        <div className="text-center mt-12">
          <Button variant="outline" disabled>
            Charger plus d&apos;articles ({_allArticlesMeta.count - allArticles.length} restants)
          </Button>
        </div>
      )}
    </div>
  );
}

