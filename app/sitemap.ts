import { MetadataRoute } from "next";
import { CANONICAL_ORIGIN } from "@/lib/site-url";
import { getArticles, getEvents } from "@/lib/sanity/fetch";

/** Contenu Sanity ayant une page dédiée : il lui faut une URL et une date. */
type ContenuDate = { slug?: string | null; date?: string | null };

/**
 * Convertit une liste de contenus en entrées de sitemap.
 *
 * Le filtre n'est pas défensif par principe : un document Sanity peut être
 * sauvegardé sans slug ni date, et une URL `/events/undefined` déclarée aux
 * moteurs est une erreur d'exploration de plus dans la Search Console.
 */
function entreesContenu(
  contenus: ContenuDate[],
  prefixe: string
): MetadataRoute.Sitemap {
  return contenus
    .filter(
      (contenu) =>
        contenu.slug != null &&
        String(contenu.slug).trim() !== "" &&
        contenu.date != null &&
        String(contenu.date).trim() !== ""
    )
    .map((contenu) => ({
      url: `${CANONICAL_ORIGIN}${prefixe}/${contenu.slug}`,
      lastModified: new Date(contenu.date as string),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allArticles, allEvents] = await Promise.all([
    getArticles(),
    getEvents(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: CANONICAL_ORIGIN,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${CANONICAL_ORIGIN}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_ORIGIN}/actualites`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${CANONICAL_ORIGIN}/events`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_ORIGIN}/equipe`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${CANONICAL_ORIGIN}/join`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_ORIGIN}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // `/confidentialite` est volontairement absente : une page légale n'a pas à
  // concourir dans les résultats de recherche, et elle reste atteignable depuis
  // le pied de page.
  return [
    ...staticRoutes,
    ...entreesContenu(allArticles, "/actualites"),
    ...entreesContenu(allEvents, "/events"),
  ];
}
