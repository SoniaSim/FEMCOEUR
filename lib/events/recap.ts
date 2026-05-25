interface RecapSource {
  relatedArticleSlug?: string | null;
  recapLink?: string | null;
}

export interface RecapLink {
  href: string;
  isExternal: boolean;
}

/**
 * Détermine le lien "En savoir plus" d'un événement passé.
 * Priorité : article du blog interne > URL externe (recapLink).
 * Retourne null si aucun lien n'est défini.
 */
export function getRecapLink(event: RecapSource): RecapLink | null {
  if (event.relatedArticleSlug) {
    return { href: `/blog/${event.relatedArticleSlug}`, isExternal: false };
  }
  if (event.recapLink) {
    return { href: event.recapLink, isExternal: true };
  }
  return null;
}
