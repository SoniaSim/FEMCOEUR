/**
 * Aperçu de partage (Open Graph / Twitter Card).
 *
 * Next fusionne les objets `metadata` **superficiellement** : une page qui
 * déclare `openGraph` remplace intégralement celui du layout racine — images,
 * `siteName` et `locale` comprises. La page d'accueil se partageait ainsi sans
 * aucun visuel, alors que le layout en déclarait un : elle redéfinissait
 * `openGraph` pour y mettre son titre, et perdait le reste au passage.
 *
 * La documentation Next recommande pour ce cas d'extraire les champs partagés
 * dans une variable. D'où ce fichier : **toute page qui déclare `openGraph`
 * doit étaler `baseOpenGraph`**, sans quoi elle se partagera sans visuel.
 *
 * `type` n'y figure pas volontairement : il dépend de la page (`website` pour
 * les pages de contenu fixe, `article` pour un événement ou une actualité).
 */

export const OG_DEFAULT_IMAGE = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: "FEMCOEUR — faire entendre la voix des femmes en médecine cardiaque et vasculaire",
};

export const baseOpenGraph = {
  siteName: "FEMCOEUR",
  locale: "fr_FR",
  images: [OG_DEFAULT_IMAGE],
};

/**
 * Adapte une image Sanity au format d'aperçu social (1200×630, ratio 1.91:1).
 *
 * Les assets Sanity sont servis dans leur dimension d'origine : l'image de la
 * 2ème Journée FemCoeur pèse 1,18 Mo en 4:3. Transmise telle quelle, elle est
 * recadrée par LinkedIn et Facebook sans qu'on maîtrise la coupe — sur une
 * photo de scène, cela rogne le haut et le bas, donc les visages.
 *
 * `fm=jpg` est explicite plutôt que `auto=format` : certains robots d'aperçu ne
 * gèrent pas le WebP que ce dernier servirait.
 *
 * Limite connue : `fit=crop` recadre depuis le centre. Le champ `mainImage` a
 * pourtant `hotspot: true`, mais les queries ne projettent que `asset->url` —
 * le point d'intérêt n'est donc pas transmis. Si un cadrage centré coupait mal,
 * il faudrait projeter le `hotspot` et passer par `@sanity/image-url`.
 */
export function toOgImageUrl(url: string): string {
  return `${url}?w=1200&h=630&fit=crop&fm=jpg&q=80`;
}
