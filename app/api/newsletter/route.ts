import { type NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/brevo/subscribe";

// RFC 5321 : 254 caractères pour une adresse complète.
const MAX_EMAIL_LENGTH = 254;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Anti-abus : cette route déclenche l'envoi d'un email, elle est donc une cible
// possible de bombardement. Le compteur vit en mémoire du processus : sur
// serverless chaque instance a le sien, la protection est donc "best effort".
// Suffisant au volume de l'association ; à remplacer par un store partagé si le
// besoin se matérialise.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_ATTEMPTS = 5;
const attemptsByIp = new Map<string, number[]>();

interface NewsletterBody {
  email?: unknown;
  website?: unknown;
}

/**
 * Ordre volontaire : les en-têtes posés par la plateforme d'abord. Un client
 * peut forger `x-forwarded-for` (l'hébergeur se contente d'y ajouter son
 * entrée), il ne sert donc que de dernier recours.
 */
function getClientIp(request: NextRequest): string {
  const platformIp =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-real-ip");
  if (platformIp) return platformIp.split(",")[0].trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (attemptsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  // Purge des IP dont la fenêtre est entièrement expirée, pour que la Map ne
  // grossisse pas indéfiniment sur une instance de longue durée.
  for (const [knownIp, timestamps] of attemptsByIp) {
    if (timestamps.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
      attemptsByIp.delete(knownIp);
    }
  }

  if (recent.length >= RATE_LIMIT_MAX_ATTEMPTS) {
    attemptsByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  attemptsByIp.set(ip, recent);
  return false;
}

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const email = value.trim().toLowerCase();
  if (email.length === 0 || email.length > MAX_EMAIL_LENGTH) return null;
  if (!EMAIL_PATTERN.test(email)) return null;

  return email;
}

export const POST = async (request: NextRequest) => {
  let body: NewsletterBody;

  try {
    body = (await request.json()) as NewsletterBody;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // Honeypot : champ masqué visuellement, qu'aucune visiteuse ne remplit. On
  // renvoie un succès plutôt qu'une erreur, pour ne pas signaler au bot qu'il a
  // été repéré.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const email = normalizeEmail(body.email);

  if (!email) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const result = await subscribeToNewsletter(email);

  switch (result.status) {
    case "ok":
    // Une adresse déjà connue reçoit exactement la même réponse qu'une
    // nouvelle : répondre « déjà inscrite » révélerait qui figure dans la liste.
    case "already_subscribed":
      return NextResponse.json({ ok: true });

    case "rate_limited":
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });

    case "misconfigured":
      console.error(`[newsletter] configuration Brevo : ${result.detail}`);
      return NextResponse.json({ error: "server_error" }, { status: 500 });

    case "error":
      // Le détail reste dans les logs serveur : un message d'erreur Brevo peut
      // contenir des éléments de configuration.
      console.error(`[newsletter] échec de l'inscription : ${result.detail}`);
      return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
};
