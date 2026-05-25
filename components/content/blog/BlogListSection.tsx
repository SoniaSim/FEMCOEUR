import { getArticles } from "@/lib/sanity/fetch";
import Link from "next/link";
import { formatSanityDateFr } from "@/lib/sanity/formatSanityDate";
import { SanityImage } from "@/components/ui/SanityImage";
import { Calendar, User, ArrowRight, FileText } from "lucide-react";
import { EmptyState } from "@/components/content/shared/EmptyState";
import type { Article } from "@/lib/types/sanity";

const CATEGORY_LABELS: Record<string, string> = {
  research: "Recherche",
  clinical: "Clinique",
  news: "Actualités",
  prevention: "Prévention",
};

function formatCategory(value: string): string {
  return CATEGORY_LABELS[value] ?? value;
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/blog/${article.slug ?? ""}`}
      className="card-base card-interactive group relative overflow-hidden flex flex-col h-full"
    >
      {/* Accent top au hover */}
      <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary to-accent z-10" />

      {article.image?.url && (
        <div className="relative h-48 w-full overflow-hidden">
          <SanityImage
            image={article.image}
            fallbackAlt={article.title ?? ""}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6 flex flex-col grow">
        {article.categories && article.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.categories.slice(0, 2).map((category) => (
              <span
                key={category}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
              >
                {formatCategory(category)}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 line-clamp-2 leading-snug transition-colors group-hover:text-primary">
          {article.title}
        </h3>

        <div className="space-y-2 mb-5">
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
              <span className="line-clamp-1">Dre. {article.author}</span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-primary/10">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all group-hover:gap-3">
            Lire l&apos;article
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export async function BlogListSection() {
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
