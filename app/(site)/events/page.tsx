import { EventsHeroSection } from "@/components/content/events/EventsHeroSection";
import { EventsListSection } from "@/components/content/events/EventsListSection";
import { StayInTouchSection } from "@/components/content/shared/StayInTouchSection";
import { getSiteSettings } from "@/lib/sanity/fetch";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Événements",
  description:
    'Découvrez nos rencontres "cardiologies femmes" : webinaires experts, ateliers patients et sessions de formation certifiante.',
  alternates: {
    canonical: "https://femcoeur.fr/events",
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
