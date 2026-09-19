import { type NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/brevo/subscribe";
import { normalizeEmail } from "@/lib/form-validation";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";

// Anti-abus : cette route déclenche l'envoi d'un email, elle est donc une cible
// possible de bombardement.
const isRateLimited = createRateLimiter({
  windowMs: 60_000,
  maxAttempts: 5,
});

interface NewsletterBody {
  email?: unknown;
  website?: unknown;
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
