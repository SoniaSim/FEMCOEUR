/**
 * Règles de validation partagées entre les formulaires, côté navigateur, et les
 * routes API qui les reçoivent.
 *
 * Elles vivent ici plutôt qu'en double parce que les deux côtés doivent dire
 * exactement la même chose. Un `maxLength` plus permissif que le serveur laisse
 * rédiger un long message pour le refuser à l'envoi ; un `maxLength` plus
 * strict interdit ce que le serveur accepterait. Le seul moyen fiable de les
 * garder d'accord est qu'il n'y en ait qu'un.
 */

/** RFC 5321 : 254 caractères pour une adresse complète. */
export const MAX_EMAIL_LENGTH = 254;
export const MAX_NAME_LENGTH = 100;
export const MAX_SUBJECT_LENGTH = 150;
export const MAX_MESSAGE_LENGTH = 5000;

/**
 * Volontairement permissif : la seule preuve qu'une adresse existe est qu'un
 * email y parvienne. Cette expression écarte les fautes de frappe grossières,
 * le double opt-in et le `replyTo` font le reste.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Chaîne non vide, ajustée aux bords, dans la limite indiquée. */
export function normalizeText(
  value: unknown,
  maxLength: number
): string | null {
  if (typeof value !== "string") return null;

  const text = value.trim();
  if (text.length === 0 || text.length > maxLength) return null;

  return text;
}

/** Adresse email normalisée en minuscules, ou `null` si elle est inexploitable. */
export function normalizeEmail(value: unknown): string | null {
  const email = normalizeText(value, MAX_EMAIL_LENGTH)?.toLowerCase();
  if (!email || !EMAIL_PATTERN.test(email)) return null;

  return email;
}
