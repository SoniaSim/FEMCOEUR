import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { formatSanityDateFr } from "@/lib/sanity/formatSanityDate";
import { formatCategory } from "@/lib/articles/categories";
import { SanityImage } from "@/components/ui/SanityImage";
import type { Article } from "@/lib/types/sanity";

/**
 * Carte d'article, partagée entre la liste des actualités et la page d'accueil.
 *
 * Extraite de `ActualitesListSection`, où elle était une fonction locale non
 * exportée. Le rendu en `layout="column"` est inchangé.
 *
 * La carte entière est un lien, ce qui est acceptable ici parce qu'elle ne
 * contient aucun bouton interne — contrairement à la carte d'événement, qui doit
 * passer par un lien sur le titre et un `::after` pour ne pas imbriquer de liens.
 */
type Props = {
  article: Article;
  /**
   * `column` : image au-dessus du texte, pour une grille de 2 ou 3 cartes.
   * `row` : image à gauche, pour une carte seule occupant toute la largeur —
   * une carte étroite isolée au milieu d'un espace prévu pour trois laisserait
   * un vide qui se lit comme une erreur. Même règle que `NumberedCard`.
   *
   * Sur mobile, `row` se replie en colonne : la largeur ne permet pas la
   * juxtaposition d'une image et d'un texte lisibles.
   */
  layout?: "column" | "row";
};

export function ArticleCard({ article, layout = "column" }: Props) {
  const hasImage = Boolean(article.image?.url);
  // La grille à deux colonnes n'a de sens qu'avec une image à mettre dans la
  // première : sans elle, le texte se tasserait dans une colonne étroite en
  // laissant l'autre vide — le vide même que `layout="row"` devait supprimer.
  const isRow = layout === "row" && hasImage;

  return (
    <Link
      href={`/actualites/${article.slug ?? ""}`}
      className={`card-base card-interactive group relative overflow-hidden ${
        isRow
          ? "grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]"
          : "flex flex-col h-full"
      }`}
    >
      <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary to-accent z-10" />

      {article.image?.url && (
        <div
          className={`relative w-full overflow-hidden ${
            isRow ? "h-52 md:h-full md:min-h-[260px]" : "h-48"
          }`}
        >
          <SanityImage
            image={article.image}
            fallbackAlt={article.title ?? ""}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div
        className={`flex flex-col grow ${isRow ? "p-6 md:p-8 justify-center" : "p-6"}`}
      >
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

        <h3
          className={`font-bold text-foreground mb-4 leading-snug transition-colors group-hover:text-primary ${
            isRow
              ? "text-xl md:text-2xl line-clamp-3"
              : "text-lg md:text-xl line-clamp-2"
          }`}
        >
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
              <span className="line-clamp-1">{article.author}</span>
            </div>
          )}
        </div>

        <div
          className={`pt-4 border-t border-primary/10 ${isRow ? "" : "mt-auto"}`}
        >
          <span className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all group-hover:gap-3">
            Lire l&apos;article
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
