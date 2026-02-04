import Image from "next/image";
import { EventsHeroSection } from "@/components/content/events/EventsHeroSection";
import { EventsListSection } from "@/components/content/events/EventsListSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Événements - FEMCOEUR",
  description:
    'Découvrez nos rencontres "cardiologies femmes" : webinaires experts, ateliers patients et sessions de formation certifiante.',
};

export default function EventsPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <EventsHeroSection />
        <EventsListSection />
        {/* Illustration flottante à droite, entre hero et liste des événements */}
        <div
          className="hidden md:block absolute right-[4%] top-[22%] -translate-y-1/2 w-[min(24vw,280px)] pointer-events-none z-10 origin-center rotate-6 opacity-90"
          aria-hidden
        >
          <Image
            src="/illustrations/event.svg"
            alt=""
            width={280}
            height={210}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </>
  );
}
