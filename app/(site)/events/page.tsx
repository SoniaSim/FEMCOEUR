import { EventsHeroSection } from "@/components/content/events/EventsHeroSection";
import { EventsListSection } from "@/components/content/events/EventsListSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Événements",
  description:
    'Découvrez nos rencontres "cardiologies femmes" : webinaires experts, ateliers patients et sessions de formation certifiante.',
  alternates: {
    canonical: "https://femcoeur.fr/events",
  },
};

export default function EventsPage() {
  return (
    <>
      <EventsHeroSection />
      <EventsListSection />
    </>
  );
}
