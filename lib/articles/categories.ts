/**
 * Libellés affichés pour les catégories d'articles.
 *
 * La liste des valeurs possibles vit dans le schéma Sanity (`article.categories`) ;
 * ce fichier ne fait que les traduire pour l'affichage. Ajouter une catégorie au
 * schéma sans l'ajouter ici n'est pas une erreur : la valeur brute est alors
 * affichée telle quelle, ce qui se voit sans rien casser.
 *
 * Ces deux définitions étaient dupliquées à l'identique entre la liste des
 * actualités et la page de détail d'un article.
 */
const CATEGORY_LABELS: Record<string, string> = {
  research: "Recherche",
  clinical: "Clinique",
  news: "Actualités",
  prevention: "Prévention",
};

export function formatCategory(value: string): string {
  return CATEGORY_LABELS[value] ?? value;
}
