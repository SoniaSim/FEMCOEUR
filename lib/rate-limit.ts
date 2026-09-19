import type { NextRequest } from "next/server";

/**
 * Ordre volontaire : les en-têtes posés par la plateforme d'abord. Un client
 * peut forger `x-forwarded-for` (l'hébergeur se contente d'y ajouter son
 * entrée), il ne sert donc que de dernier recours.
 */
export function getClientIp(request: NextRequest): string {
  const platformIp =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-real-ip");
  if (platformIp) return platformIp.split(",")[0].trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  return "unknown";
}

interface RateLimiterOptions {
  windowMs: number;
  maxAttempts: number;
}

/**
 * Compteur de tentatives par IP. Le compteur vit en mémoire du processus : sur
 * serverless chaque instance a le sien, la protection est donc "best effort".
 * Suffisant au volume de l'association ; à remplacer par un store partagé si le
 * besoin se matérialise.
 *
 * Chaque appel produit un compteur indépendant : deux routes ne se partagent
 * pas leur quota, une inscription newsletter ne consomme pas le crédit du
 * formulaire de contact.
 */
export function createRateLimiter({
  windowMs,
  maxAttempts,
}: RateLimiterOptions) {
  const attemptsByIp = new Map<string, number[]>();

  return function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (attemptsByIp.get(ip) ?? []).filter(
      (timestamp) => now - timestamp < windowMs
    );

    // Purge des IP dont la fenêtre est entièrement expirée, pour que la Map ne
    // grossisse pas indéfiniment sur une instance de longue durée.
    for (const [knownIp, timestamps] of attemptsByIp) {
      if (timestamps.every((t) => now - t >= windowMs)) {
        attemptsByIp.delete(knownIp);
      }
    }

    if (recent.length >= maxAttempts) {
      attemptsByIp.set(ip, recent);
      return true;
    }

    recent.push(now);
    attemptsByIp.set(ip, recent);
    return false;
  };
}
