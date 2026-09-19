const TRANSACTIONAL_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

/**
 * Expéditeur : une adresse dédiée aux messages que le site adresse à
 * l'association, distincte de `newsletter@femcoeur.fr` qui parle aux abonnées.
 * Deux flux opposés, deux adresses — un message du formulaire ne doit pas
 * arriver sous l'identité de la newsletter.
 *
 * `site@femcoeur.fr` n'a pas besoin d'être une vraie boîte : elle ne reçoit
 * rien. Les réponses partent vers la visiteuse via `replyTo`, et les rebonds
 * sont gérés par Brevo. Elle resservira pour d'éventuelles autres
 * notifications automatiques du site.
 *
 * Le domaine `femcoeur.fr` étant authentifié (SPF et DKIM vérifiés côté
 * Brevo), la délivrabilité est celle d'un envoi normal.
 */
const SENDER_FALLBACK = "site@femcoeur.fr";
const SENDER_NAME = "Site FEMCOEUR";

export type SendContactResult =
  | { status: "ok" }
  | { status: "rate_limited" }
  | { status: "misconfigured"; detail: string }
  | { status: "error"; detail: string };

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface BrevoErrorPayload {
  code?: string;
  message?: string;
}

/**
 * Le message de la visiteuse est inséré dans un email HTML : tout caractère
 * significatif doit être neutralisé, sans quoi un message contenant du balisage
 * casserait la mise en page — ou pire, glisserait un lien déguisé sous les yeux
 * du bureau. L'esperluette d'abord, sinon elle ré-échapperait les entités
 * produites par les remplacements suivants.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml({ name, email, subject, message }: ContactMessage): string {
  const corps = escapeHtml(message).replace(/\n/g, "<br />");

  return `
    <div style="font-family: system-ui, -apple-system, sans-serif; font-size: 15px; line-height: 1.6; color: #1b3a58;">
      <p style="margin: 0 0 16px;">
        Message envoyé depuis le formulaire de contact du site.
      </p>
      <table cellpadding="0" cellspacing="0" style="margin: 0 0 20px; font-size: 15px;">
        <tr><td style="padding: 2px 16px 2px 0;"><strong>Nom</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 2px 16px 2px 0;"><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="padding: 2px 16px 2px 0;"><strong>Objet</strong></td><td>${escapeHtml(subject)}</td></tr>
      </table>
      <div style="border-left: 3px solid #ed6b3c; padding-left: 16px; white-space: normal;">
        ${corps}
      </div>
      <p style="margin: 24px 0 0; font-size: 13px; color: #6b7280;">
        Répondez directement à cet email : la réponse partira vers ${escapeHtml(email)}.
      </p>
    </div>
  `;
}

function buildText({ name, email, subject, message }: ContactMessage): string {
  return [
    "Message envoyé depuis le formulaire de contact du site.",
    "",
    `Nom : ${name}`,
    `Email : ${email}`,
    `Objet : ${subject}`,
    "",
    message,
    "",
    `Répondez directement à cet email : la réponse partira vers ${email}.`,
  ].join("\n");
}

async function readErrorPayload(
  response: Response
): Promise<BrevoErrorPayload | null> {
  try {
    return (await response.json()) as BrevoErrorPayload;
  } catch {
    return null;
  }
}

/**
 * Relaie un message du formulaire vers la boîte de l'association.
 *
 * L'expéditeur est une adresse validée dans Brevo, jamais celle de la
 * visiteuse : Brevo refuse d'expédier au nom d'un domaine qu'il n'authentifie
 * pas, et un tel envoi finirait en spam quand il ne serait pas purement
 * rejeté. L'adresse de la visiteuse voyage en `replyTo`, ce qui laisse au
 * bureau le geste naturel — « Répondre » — pour lui écrire directement.
 */
export async function sendContactMessage(
  contact: ContactMessage,
  recipient: string
): Promise<SendContactResult> {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    return {
      status: "misconfigured",
      detail: "variable d'environnement manquante : BREVO_API_KEY",
    };
  }

  const sender = process.env.BREVO_SENDER_EMAIL ?? SENDER_FALLBACK;

  let response: Response;

  try {
    response = await fetch(TRANSACTIONAL_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: SENDER_NAME, email: sender },
        to: [{ email: recipient }],
        replyTo: { email: contact.email, name: contact.name },
        subject: `[Site] ${contact.subject}`,
        htmlContent: buildHtml(contact),
        textContent: buildText(contact),
      }),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "erreur inconnue";
    return { status: "error", detail: `Brevo injoignable : ${message}` };
  }

  if (response.ok) return { status: "ok" };

  const payload = await readErrorPayload(response);
  const code = payload?.code;

  if (response.status === 429) return { status: "rate_limited" };

  if (response.status === 401 || code === "unauthorized") {
    return { status: "misconfigured", detail: "clé API Brevo refusée (401)" };
  }

  return {
    status: "error",
    detail: `Brevo a répondu ${response.status}${code ? ` (${code})` : ""}`,
  };
}
