interface CtaSource {
  registrationCta?: {
    heading?: string | null;
    text?: string | null;
    buttonLabel?: string | null;
  } | null;
}

export interface EventCta {
  heading: string;
  text: string;
  buttonLabel: string;
}

/**
 * Textes de l'encart de participation, quand l'événement n'a rien précisé.
 * Formulés pour une inscription classique : le cas d'une enquête ou d'un
 * questionnaire passe par `registrationCta` côté Sanity.
 */
export const EVENT_CTA_DEFAULTS: EventCta = {
  heading: "Inscrivez-vous à cet événement",
  text: "Les places sont limitées — réservez la vôtre dès maintenant.",
  buttonLabel: "S'inscrire",
};

/** Un champ Sanity vidé revient en chaîne vide : on le traite comme absent. */
function clean(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function getEventCta(
  event: CtaSource,
  fallbacks: Partial<EventCta> = {}
): EventCta {
  const cta = event.registrationCta;
  return {
    heading:
      clean(cta?.heading) ?? fallbacks.heading ?? EVENT_CTA_DEFAULTS.heading,
    text: clean(cta?.text) ?? fallbacks.text ?? EVENT_CTA_DEFAULTS.text,
    buttonLabel:
      clean(cta?.buttonLabel) ??
      fallbacks.buttonLabel ??
      EVENT_CTA_DEFAULTS.buttonLabel,
  };
}

/**
 * Libellé du bouton seul, pour les cartes. Le `fallback` laisse chaque contexte
 * garder son verbe d'origine (« Participer » sur l'accueil) tant que la fiche
 * n'impose rien.
 */
export function getEventCtaLabel(event: CtaSource, fallback?: string): string {
  return getEventCta(event, { buttonLabel: fallback }).buttonLabel;
}
