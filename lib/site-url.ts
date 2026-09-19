/**
 * Deux notions distinctes, qu'il serait tentant de confondre.
 *
 * `CANONICAL_ORIGIN` est l'adresse que le site déclare aux moteurs de
 * recherche : celle du site réel, quelle que soit la machine qui répond.
 * Volontairement non surchargeable — une preview Vercel ou un serveur local qui
 * se déclarerait canonique dirait à Google « la vraie version de cette page est
 * ici », et ferait déréférencer les pages de production. C'est aussi pourquoi
 * cette valeur n'a pas sa place dans Sanity : le domaine relève des DNS et de
 * la configuration d'hébergement, pas d'une décision éditoriale.
 *
 * `SITE_URL` est l'adresse de l'environnement qui tourne maintenant. Elle sert
 * aux liens qui doivent y ramener — celui de confirmation du double opt-in
 * Brevo, notamment : en développement il doit revenir sur localhost, sans quoi
 * le parcours d'inscription est intestable.
 *
 * Les pages n'utilisent ni l'une ni l'autre : `metadataBase` étant posé dans le
 * layout racine, leurs URLs canoniques s'écrivent en chemin relatif
 * (`/contact`) et Next les résout.
 */
export const CANONICAL_ORIGIN = "https://femcoeur.fr";

export const SITE_URL = (process.env.SITE_URL ?? CANONICAL_ORIGIN).replace(
  /\/$/,
  ""
);
