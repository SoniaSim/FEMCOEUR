import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/content/shared/ArticleCard";
import type { Article } from "@/lib/types/sanity";

/**
 * Dernières actualités sur la page d'accueil.
 *
 * La disposition s'adapte au nombre d'articles plutôt que de masquer la section
 * en dessous d'un seuil. Une carte étroite seule dans un espace prévu pour
 * trois laisse deux tiers de vide, et ce vide ne se lit pas comme « il n'y a
 * qu'un article » mais comme « le site est cassé » — c'est le raisonnement que
 * la page d'accueil applique déjà à sa bande de statistiques. Ici on préfère
 * changer de forme : un seul article devient une carte large, qui ne laisse
 * aucun trou.
 *
 * La section reste absente quand il n'y a aucun article.
 */
const MAX_ARTICLES = 3;

export function LatestArticlesSection({ articles }: { articles: Article[] }) {
  const latest = articles.slice(0, MAX_ARTICLES);
  if (latest.length === 0) return null;

  const isSingle = latest.length === 1;
  // Un article seul sans image de couverture n'a pas de quoi remplir toute la
  // largeur : on resserre la carte plutôt que d'étaler trois lignes de texte
  // sur 1200 px. Avec une image, la carte large se tient d'elle-même.
  const isNarrow = isSingle && !latest[0].image?.url;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground leading-tight">
              Dernières actualités
            </h2>
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3"
            >
              Toutes les actualités
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div
            className={
              isNarrow
                ? "max-w-xl"
                : isSingle
                  ? ""
                  : `grid grid-cols-1 gap-5 md:gap-6 ${
                      latest.length === 2
                        ? "md:grid-cols-2"
                        : "md:grid-cols-2 lg:grid-cols-3"
                    }`
            }
          >
            {latest.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                layout={isSingle ? "row" : "column"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
