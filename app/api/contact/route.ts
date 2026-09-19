import { type NextRequest, NextResponse } from "next/server";
import { sendContactMessage } from "@/lib/brevo/send-contact-message";
import {
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  MAX_SUBJECT_LENGTH,
  normalizeEmail,
  normalizeText,
} from "@/lib/form-validation";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";
import { resolveContactEmail } from "@/lib/sanity/contact-email";
import { getSiteSettings } from "@/lib/sanity/fetch";

// Plus strict que la newsletter : un message de contact mobilise une lectrice
// humaine, et le compte Brevo est plafonné à 300 envois par jour. Trois envois
// par quart d'heure laissent la place à une correction ou un second message,
// pas à un déluge.
const isRateLimited = createRateLimiter({
  windowMs: 15 * 60_000,
  maxAttempts: 3,
});

interface ContactBody {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
}

export const POST = async (request: NextRequest) => {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // Honeypot : champ masqué visuellement, qu'aucune visiteuse ne remplit. On
  // renvoie un succès plutôt qu'une erreur, pour ne pas signaler au bot qu'il a
  // été repéré.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = normalizeText(body.name, MAX_NAME_LENGTH);
  if (!name) {
    return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  }

  const email = normalizeEmail(body.email);
  if (!email) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const subject = normalizeText(body.subject, MAX_SUBJECT_LENGTH);
  if (!subject) {
    return NextResponse.json({ error: "invalid_subject" }, { status: 400 });
  }

  const message = normalizeText(body.message, MAX_MESSAGE_LENGTH);
  if (!message) {
    return NextResponse.json({ error: "invalid_message" }, { status: 400 });
  }

  // Compté après la validation, à dessein : ce que le quota protège, c'est
  // l'envoi d'emails (300 par jour sur l'offre Brevo gratuite), pas le coût
  // d'un `trim()`. Compter les soumissions mal formées reviendrait à bloquer
  // un quart d'heure une visiteuse qui a simplement fait trois fautes de frappe
  // dans son adresse.
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const recipient = resolveContactEmail(await getSiteSettings());

  const result = await sendContactMessage(
    { name, email, subject, message },
    recipient
  );

  switch (result.status) {
    case "ok":
      return NextResponse.json({ ok: true });

    case "rate_limited":
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });

    case "misconfigured":
      console.error(`[contact] configuration Brevo : ${result.detail}`);
      return NextResponse.json({ error: "server_error" }, { status: 500 });

    case "error":
      // Le détail reste dans les logs serveur : un message d'erreur Brevo peut
      // contenir des éléments de configuration.
      console.error(`[contact] échec de l'envoi : ${result.detail}`);
      return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
};
