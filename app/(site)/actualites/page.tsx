import { ActualitesHeroSection } from "@/components/content/actualites/ActualitesHeroSection";
import { ActualitesListSection } from "@/components/content/actualites/ActualitesListSection";
import { StayInTouchSection } from "@/components/content/shared/StayInTouchSection";
import { getSiteSettings } from "@/lib/sanity/fetch";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    'Analyses d\'expertes, témoignages de patientes et veille scientifique pour que la "cardiologie des femmes" soit au cœur des pratiques.',
  alternates: {
    canonical: "https://femcoeur.fr/actualites",
  },
};

export default async function ActualitesPage() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <ActualitesHeroSection />
      <ActualitesListSection />
      <StayInTouchSection
        socialLinks={siteSettings?.socialLinks ?? []}
        newsletter={siteSettings?.newsletter ?? null}
      />
    </>
  );
}
