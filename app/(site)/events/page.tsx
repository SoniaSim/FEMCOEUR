import { EventsHeroSection } from "@/components/content/events/EventsHeroSection";
import { EventsListSection } from "@/components/content/events/EventsListSection";
import { StayInTouchSection } from "@/components/content/shared/StayInTouchSection";
import { getSiteSettings } from "@/lib/sanity/fetch";
import type { Metadata } from "next";

/**
 * La répartition « à venir / passés » se calcule au rendu par comparaison de
 * dates. Le layout du site fixe `revalidate = false`, donc sans valeur ici la
 * comparaison serait figée au build : un événement passé resterait annoncé « à
 * venir » jusqu'à la prochaine publication Sanity. Une heure suffit — un
 * basculement de date qui prend jusqu'à soixante minutes est invisible.
 */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Événements",
  description:
    'Découvrez nos rencontres "cardiologies femmes" : webinaires experts, ateliers patients et sessions de formation certifiante.',
  alternates: {
    canonical: "/events",
  },
};

export default async function EventsPage() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <EventsHeroSection />
      <EventsListSection />
      <StayInTouchSection
        socialLinks={siteSettings?.socialLinks ?? []}
        newsletter={siteSettings?.newsletter ?? null}
      />
    </>
  );
}
