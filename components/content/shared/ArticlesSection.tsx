import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatSanityDateFr } from "@/lib/sanity/formatSanityDate";
import { SanityImage } from "@/components/ui/SanityImage";
import type { Article } from "@/lib/types/sanity";

interface ArticlesSectionProps {
  articles: Article[];
}

export function ArticlesSection({ articles }: ArticlesSectionProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="py-section md:py-section-md bg-muted/50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Dernières actualités</h2>
          <Button asChild variant="outline">
            <Link href="/blog">Voir tout</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              {article.image?.url && (
                <div className="relative h-48 w-full">
                  <SanityImage
                    image={article.image}
                    fallbackAlt={article.title ?? ""}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardDescription>
                  {formatSanityDateFr(article.date)}
                </CardDescription>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Par {article.author ?? "—"}
                </p>
                <Button asChild variant="link" className="p-0">
                  <Link href={`/blog/${article.slug ?? ""}`}>Lire la suite →</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
