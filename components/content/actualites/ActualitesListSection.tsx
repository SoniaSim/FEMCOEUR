import { getArticles } from "@/lib/sanity/fetch";
import { FileText } from "lucide-react";
import { ArticleCard } from "@/components/content/shared/ArticleCard";
import { EmptyState } from "@/components/content/shared/EmptyState";

export async function ActualitesListSection() {
  const allArticles = await getArticles();

  if (allArticles.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container">
          <EmptyState
            icon={FileText}
            message="Aucun article disponible pour le moment."
            hint="Revenez bientôt pour découvrir nos analyses et actualités !"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {allArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
