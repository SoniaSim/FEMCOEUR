const DOI_ENDPOINT = "https://api.brevo.com/v3/contacts/doubleOptinConfirmation";
const BLOCKED_CONTACTS_ENDPOINT = "https://api.brevo.com/v3/smtp/blockedContacts";

/**
 * Résultat de l'appel à Brevo, décrit tel qu'il s'est réellement produit.
 * C'est la route API qui décide de ce qu'elle expose au client — notamment de
 * renvoyer le même succès pour "ok" et "already_subscribed".
 */
export type SubscribeResult =
  | { status: "ok" }
  | { status: "already_subscribed" }
  | { status: "rate_limited" }
  | { status: "misconfigured"; detail: string }
  | { status: "error"; detail: string };

interface BrevoConfig {
  apiKey: string;
  listId: number;
  templateId: number;
  redirectionUrl: string;
}

interface BrevoErrorPayload {
  code?: string;
  message?: string;
}

function readConfig(): BrevoConfig | { missing: string[] } {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID);
  const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);
  const siteUrl = process.env.SITE_URL ?? "https://femcoeur.fr";

  const missing: string[] = [];
  if (!apiKey) missing.push("BREVO_API_KEY");
  // Number("") vaut 0 et Number(undefined) vaut NaN : le test couvre les deux.
  if (!Number.isInteger(listId) || listId <= 0) {
    missing.push("BREVO_NEWSLETTER_LIST_ID");
  }
  if (!Number.isInteger(templateId) || templateId <= 0) {
    missing.push("BREVO_DOI_TEMPLATE_ID");
  }

  if (!apiKey || missing.length > 0) return { missing };

  return {
    apiKey,
    listId,
    templateId,
    // Page d'atterrissage après clic sur le lien de confirmation. Brevo exige
    // ce paramètre ; la page elle-même est livrée en phase 3.
    redirectionUrl: `${siteUrl.replace(/\/$/, "")}/newsletter/confirmee`,
  };
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
 * Lève un éventuel blocage transactionnel sur l'adresse.
 *
 * Le lien « Se désinscrire » du mail de bienvenue (envoyé par le scénario Brevo
 * comme email transactionnel) inscrit l'adresse sur la liste de blocage
 * transactionnelle. Or le mail de confirmation double opt-in est lui aussi
 * transactionnel : sans ce déblocage, une personne désabonnée depuis le mail de
 * bienvenue ne recevrait plus jamais de confirmation et ne pourrait plus se
 * réinscrire (constaté le 06/09/2026, événements Brevo « blocked »).
 *
 * Ne concerne que les emails transactionnels : le blocklistage marketing n'est
 * levé que par le clic de confirmation, comme prévu par le double opt-in.
 * Une erreur ici ne doit pas faire échouer l'inscription — on tente, on
 * continue. 404 = l'adresse n'était pas bloquée, c'est le cas normal.
 */
async function unblockTransactional(
  email: string,
  apiKey: string
): Promise<void> {
  try {
    const response = await fetch(
      `${BLOCKED_CONTACTS_ENDPOINT}/${encodeURIComponent(email)}`,
      {
        method: "DELETE",
        headers: { "api-key": apiKey, accept: "application/json" },
      }
    );
    if (!response.ok && response.status !== 404) {
      console.warn(
        `[newsletter] déblocage transactionnel ignoré : Brevo a répondu ${response.status}`
      );
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "erreur inconnue";
    console.warn(`[newsletter] déblocage transactionnel ignoré : ${message}`);
  }
}

/**
 * Inscrit une adresse en double opt-in : Brevo envoie l'email de confirmation,
 * et le contact n'entre dans la liste qu'après le clic. C'est ce clic, horodaté
 * par Brevo, qui constitue la preuve du consentement exigée par le RGPD.
 */
export async function subscribeToNewsletter(
  email: string
): Promise<SubscribeResult> {
  const config = readConfig();

  if ("missing" in config) {
    return {
      status: "misconfigured",
      detail: `variables d'environnement manquantes ou invalides : ${config.missing.join(", ")}`,
    };
  }

  await unblockTransactional(email, config.apiKey);

  let response: Response;

  try {
    response = await fetch(DOI_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": config.apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email,
        includeListIds: [config.listId],
        templateId: config.templateId,
        redirectionUrl: config.redirectionUrl,
      }),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "erreur inconnue";
    return { status: "error", detail: `Brevo injoignable : ${message}` };
  }

  // Brevo documente un 201 avec un corps vide ; on tolère tout 2xx.
  if (response.ok) return { status: "ok" };

  const payload = await readErrorPayload(response);
  const code = payload?.code;

  // duplicate_parameter : le contact existe déjà.
  // duplicate_request : la même demande vient d'être soumise, l'email de
  // confirmation est donc déjà parti.
  // Dans les deux cas, du point de vue de la visiteuse, il n'y a rien de plus à
  // faire que consulter sa boîte mail.
  if (code === "duplicate_parameter" || code === "duplicate_request") {
    return { status: "already_subscribed" };
  }

  if (response.status === 429) return { status: "rate_limited" };

  if (response.status === 401 || code === "unauthorized") {
    return { status: "misconfigured", detail: "clé API Brevo refusée (401)" };
  }

  return {
    status: "error",
    detail: `Brevo a répondu ${response.status}${code ? ` (${code})` : ""}`,
  };
}
