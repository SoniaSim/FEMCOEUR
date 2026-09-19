"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MAX_EMAIL_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  MAX_SUBJECT_LENGTH,
} from "@/lib/form-validation";

type Status = "idle" | "submitting" | "success" | "error";

const SUCCESS_TITLE = "Message envoyé";
const SUCCESS_BODY =
  "Merci de nous avoir écrit. Nous vous répondrons à l'adresse indiquée, en général sous quelques jours.";
const CONSENT_TEXT =
  "Votre nom, votre adresse email et votre message servent uniquement à vous répondre. Ils ne vous inscrivent pas à la newsletter.";

const FALLBACK_ERROR = "L'envoi a échoué. Réessayez dans un instant.";
const ERROR_MESSAGES: Record<string, string> = {
  invalid_name: "Merci d'indiquer votre nom.",
  invalid_email: "Cette adresse email ne semble pas valide.",
  invalid_subject: "Merci d'indiquer l'objet de votre message.",
  invalid_message: `Votre message est vide ou dépasse ${MAX_MESSAGE_LENGTH} caractères.`,
  invalid_body: FALLBACK_ERROR,
  rate_limited:
    "Trop de messages envoyés coup sur coup. Patientez quelques minutes avant de réessayer.",
  server_error: FALLBACK_ERROR,
};

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [formData, setFormData] = useState(EMPTY_FORM);
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          website: typeof honeypot === "string" ? honeypot : "",
        }),
      });

      if (response.ok) {
        setFormData(EMPTY_FORM);
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
    <div className="space-y-4">
      {status !== "success" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Nom</Label>
            <Input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              maxLength={MAX_NAME_LENGTH}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              maxLength={MAX_EMAIL_LENGTH}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-subject">Sujet</Label>
            <Input
              id="contact-subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              required
              maxLength={MAX_SUBJECT_LENGTH}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              rows={6}
              maxLength={MAX_MESSAGE_LENGTH}
              disabled={isSubmitting}
              aria-describedby="contact-consent"
            />
          </div>

          {/* Honeypot. `sr-only` le sort de l'écran, `aria-hidden` et
              `tabIndex={-1}` le rendent inatteignable au lecteur d'écran comme
              au clavier : aucune visiteuse ne peut le remplir par accident. */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="contact-website">Ne remplissez pas ce champ</label>
            <input
              id="contact-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="w-full font-bold"
          >
            {isSubmitting ? "Envoi en cours…" : "Envoyer"}
          </Button>

          <p id="contact-consent" className="text-xs text-foreground/60">
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
          <div className="card-base p-5">
            <p className="text-sm font-bold text-foreground">{SUCCESS_TITLE}</p>
            <p className="mt-1 text-sm text-foreground/70">{SUCCESS_BODY}</p>
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
