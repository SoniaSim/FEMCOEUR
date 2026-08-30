"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Status = "idle" | "submitting" | "success" | "error";

const SUCCESS_TITLE = "Vérifiez votre boîte mail";
const SUCCESS_BODY =
  "Nous venons de vous envoyer un email de confirmation. Cliquez sur le lien qu'il contient pour finaliser votre inscription.";
const CONSENT_TEXT =
  "Vos données sont utilisées uniquement pour vous envoyer la newsletter FEMCOEUR. Désinscription en un clic dans chaque email.";

const FALLBACK_ERROR = "L'inscription a échoué. Réessayez dans un instant.";
const ERROR_MESSAGES: Record<string, string> = {
  invalid_email: "Cette adresse email ne semble pas valide.",
  invalid_body: FALLBACK_ERROR,
  rate_limited: "Trop de tentatives. Patientez une minute avant de réessayer.",
  server_error: FALLBACK_ERROR,
};

interface NewsletterFormProps {
  buttonLabel?: string;
}

export function NewsletterForm({
  buttonLabel = "S'inscrire",
}: NewsletterFormProps = {}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Le honeypot est lu directement dans le DOM plutôt que via un état React :
    // un bot qui écrit dans le champ sans déclencher d'événement ne mettrait pas
    // l'état à jour et passerait au travers. Lecture synchrone obligatoire,
    // `currentTarget` devient null après un await.
    const honeypot = new FormData(event.currentTarget).get("website");

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website: typeof honeypot === "string" ? honeypot : "",
        }),
      });

      if (response.ok) {
        setEmail("");
        setStatus("success");
        return;
      }

      const payload = await response.json().catch(() => null);
      const code =
        payload && typeof payload.error === "string" ? payload.error : "";

      setErrorMessage(ERROR_MESSAGES[code] ?? FALLBACK_ERROR);
      setStatus("error");
    } catch {
      // fetch ne lève que sur une panne réseau : un 4xx ou 5xx passe par le
      // bloc ci-dessus.
      setErrorMessage(
        "Connexion impossible. Vérifiez votre réseau et réessayez."
      );
      setStatus("error");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <div className="space-y-3">
      {status !== "success" && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <Label
              htmlFor="newsletter-email"
              className="text-secondary-foreground"
            >
              Votre adresse email
            </Label>
            <div className="flex gap-2">
              <Input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="vous@exemple.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                aria-describedby="newsletter-consent"
                aria-invalid={status === "error"}
                className="h-11 flex-1 border-transparent bg-background text-foreground"
              />
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Inscription…" : buttonLabel}
              </Button>
            </div>
          </div>

          {/* Honeypot. `sr-only` le sort de l'écran, `aria-hidden` et
              `tabIndex={-1}` le rendent inatteignable au lecteur d'écran comme
              au clavier : aucune visiteuse ne peut le remplir par accident. */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="newsletter-website">
              Ne remplissez pas ce champ
            </label>
            <input
              id="newsletter-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          <p
            id="newsletter-consent"
            className="text-xs text-secondary-foreground/70"
          >
            {CONSENT_TEXT}{" "}
            <Link
              href="/confidentialite"
              className="underline underline-offset-2 transition-colors hover:text-primary"
            >
              Politique de confidentialité
            </Link>
          </p>
        </form>
      )}

      {/* La région vit dans le DOM en permanence, même vide : un lecteur
          d'écran n'annonce de façon fiable qu'un changement de contenu dans une
          région déjà présente, pas l'insertion d'une région entière. */}
      <div role="status" aria-live="polite">
        {status === "success" && (
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <p className="text-sm font-semibold text-secondary-foreground">
              {SUCCESS_TITLE}
            </p>
            <p className="mt-1 text-sm text-secondary-foreground/80">
              {SUCCESS_BODY}
            </p>
          </div>
        )}

        {status === "error" && (
          <p className="inline-block rounded-lg bg-destructive/80 px-3 py-2 text-sm font-medium text-white">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
