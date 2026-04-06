import { getArticles } from "@/lib/sanity/fetch";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, User, ArrowRight, FileText } from "lucide-react";

export async function BlogListSection() {
  const allArticles = await getArticles();

  if (allArticles.length === 0) {
    return (
      <section className="py-section md:py-section-md bg-background">
        <div className="container">
          <Card className="p-12 text-center border-2 border-dashed max-w-2xl mx-auto">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              Aucun article disponible pour le moment.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Revenez bientôt pour découvrir nos analyses et actualités !
            </p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-section md:py-section-md bg-background">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allArticles.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`}>
                <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col group">
                  {article.image && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={article.image.url}
                        alt={article.image.alt || article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col grow">
                    {article.categories && article.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.categories
                          .slice(0, 2)
                          .map((category, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs bg-primary/5 text-primary border-primary/20"
                            >
                              {category}
                            </Badge>
                          ))}
                      </div>
                    )}

                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>

                    <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>
                          {format(new Date(article.date), "d MMMM yyyy", {
                            locale: fr,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 shrink-0" />
                        <span>{article.author}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t">
                      <span className="text-sm font-medium text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                        Lire l&apos;article
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* TODO: pagination si nécessaire */}
        </div>
      </div>
    </section>
  );
}
