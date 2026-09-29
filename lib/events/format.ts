import { format, isValid, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Période d'un événement, formulée selon sa situation dans le temps.
 *
 * Afficher systématiquement la date de début se lit mal dès que l'événement
 * dure : au 29/09/2026, la page d'accueil annonçait « À venir — 28 septembre
 * 2026 » pour une enquête ouverte jusqu'en novembre. Une date passée sous un
 * libellé « à venir » donne l'impression d'un site laissé à l'abandon.
 *
 * Ce que le lecteur veut savoir dépend en réalité du moment :
 *
 * | Situation                        | Ce qu'on affiche            |
 * |----------------------------------|-----------------------------|
 * | déjà commencé, pas encore fini   | jusqu'au 21 novembre 2026   |
 * | à venir, sur plusieurs jours     | du 21 au 23 octobre 2026    |
 * | à venir, même jour ou sans fin   | 21 novembre 2026            |
 * | terminé                          | 21 novembre 2026            |
 *
 * Les mois identiques ne sont pas répétés (« du 21 au 23 octobre »), les
 * années identiques non plus.
 */
type Periode = {
  date?: string | null;
  endDate?: string | null;
};

function parse(iso: string | null | undefined): Date | null {
  if (iso == null || String(iso).trim() === "") return null;
  const parsed = parseISO(String(iso));
  return isValid(parsed) ? parsed : null;
}

const jour = (d: Date) => format(d, "d MMMM yyyy", { locale: fr });

export function formatEventPeriod(
  event: Periode,
  now: Date = new Date()
): string {
  const debut = parse(event.date);
  const fin = parse(event.endDate);

  if (!debut) return fin ? `jusqu'au ${jour(fin)}` : "—";

  // En cours : seule la date de fin apporte encore quelque chose au lecteur.
  if (fin && debut <= now && fin >= now) return `jusqu'au ${jour(fin)}`;

  // Passé ou sans date de fin : la date de début suffit.
  if (!fin || fin <= now) return jour(debut);

  // À venir : on annonce l'étendue, en évitant les répétitions inutiles.
  if (format(debut, "yyyy-MM-dd") === format(fin, "yyyy-MM-dd")) {
    return jour(debut);
  }
  const memeAnnee = debut.getFullYear() === fin.getFullYear();
  const memeMois = memeAnnee && debut.getMonth() === fin.getMonth();
  const debutFormate = memeMois
    ? format(debut, "d", { locale: fr })
    : memeAnnee
      ? format(debut, "d MMMM", { locale: fr })
      : jour(debut);

  return `du ${debutFormate} au ${jour(fin)}`;
}
