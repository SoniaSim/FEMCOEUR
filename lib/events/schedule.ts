/**
 * Répartition des événements entre « à venir » et « passés ».
 *
 * On dérive des dates plutôt que du champ Sanity `status`, saisi à la main et
 * qui se périme en silence : au 19/09/2026, la production affichait encore
 * « Une enquête nationale inédite », commencée le 1er septembre, dans l'onglet
 * « À venir ». Personne ne pense à repasser sur un document publié.
 *
 * Le repli sur la date de début couvre les événements ponctuels sans date de
 * fin. Les campagnes ouvertes dans le temps se gèrent par leur date de fin
 * réelle : l'enquête nationale porte une `endDate` au 31/05/2027 et reste donc
 * visible jusque-là, sans intervention éditoriale.
 *
 * ⚠️ La comparaison est évaluée au rendu. Toute route qui l'utilise doit
 * déclarer un `revalidate` temporel : le layout du site fixe `revalidate = false`,
 * donc sans cela la date serait figée au build et un événement passé resterait
 * « à venir » indéfiniment.
 */

/**
 * Forme minimale exigée, plutôt que le type `Event` complet : les projections de
 * liste et de détail portent toutes deux `date`, `endDate` et `status`, et ces
 * fonctions servent aux deux.
 */
type Programmed = {
  date?: string | null;
  endDate?: string | null;
  status?: string | null;
};

/** Date qui détermine si l'événement est derrière nous : sa fin, sinon son début. */
function referenceTime(event: Programmed): number | null {
  const reference = event.endDate ?? event.date;
  if (!reference) return null;
  const time = new Date(reference).getTime();
  return Number.isNaN(time) ? null : time;
}

export function isCancelled(event: Programmed): boolean {
  return event.status === "cancelled";
}

export function isUpcoming(
  event: Programmed,
  now: Date = new Date()
): boolean {
  const time = referenceTime(event);
  // Sans date exploitable, on ne promet rien : un événement ne peut pas être
  // annoncé « à venir » sur la foi d'un champ vide.
  if (time === null) return false;
  return time >= now.getTime();
}

/**
 * Les événements annulés sont écartés des deux listes, ce qui préserve le
 * comportement en place avant le passage aux dates. Leur page de détail reste
 * accessible et porte la mention « Annulé ».
 */
export function splitBySchedule<T extends Programmed>(
  events: T[],
  now: Date = new Date()
): { upcoming: T[]; past: T[] } {
  const upcoming: T[] = [];
  const past: T[] = [];

  for (const event of events) {
    if (isCancelled(event)) continue;
    (isUpcoming(event, now) ? upcoming : past).push(event);
  }

  // Tri explicite plutôt que dépendance à l'ordre de la query : le plus proche
  // d'abord pour ce qui arrive, le plus récent d'abord pour ce qui est passé.
  upcoming.sort((a, b) => (referenceTime(a) ?? 0) - (referenceTime(b) ?? 0));
  past.sort((a, b) => (referenceTime(b) ?? 0) - (referenceTime(a) ?? 0));

  return { upcoming, past };
}
