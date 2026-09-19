import type { SiteSettingsQueryResult } from "@/sanity.types";

/**
 * Dernier recours si les Réglages du site ne contiennent aucune adresse. Perdre
 * un message parce qu'un champ du Studio est vide serait pire que de l'envoyer
 * à l'adresse historique de l'association.
 */
const FALLBACK = "contact@femcoeur.fr";

/**
 * Adresse de contact générale de l'association.
 *
 * `siteSettings.contactEmails` en est la source de vérité unique : la page de
 * mentions légales l'affiche, la route `/api/contact` y expédie les messages du
 * formulaire. Les deux passent par ici, sans quoi une correction dans le Studio
 * ferait diverger l'une de l'autre — et l'adresse publiée pour exercer ses
 * droits RGPD ne serait plus celle qui reçoit.
 *
 * On retient l'entrée dont l'intitulé parle de contact ; à défaut la première
 * de la liste, l'ordre du Studio plaçant l'adresse générale en tête.
 */
export function resolveContactEmail(
  settings: SiteSettingsQueryResult
): string {
  const contacts = settings?.contactEmails ?? [];
  const general = contacts.find((contact) =>
    /contact/i.test(contact.label ?? "")
  );

  return general?.email ?? contacts[0]?.email ?? FALLBACK;
}
