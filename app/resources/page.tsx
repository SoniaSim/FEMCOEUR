import { ResourcesHeroSection } from "@/components/content/resources/ResourcesHeroSection";
import { ResourcesListSection } from "@/components/content/resources/ResourcesListSection";
import { ResourcesBottomSection } from "@/components/content/resources/ResourcesBottomSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ressources - FEMCOEUR",
  description:
    "Accédez à des ressources validées par des cardiologues femmes pour mieux comprendre la santé cardiovasculaire des femmes à chaque âge.",
};

export default function ResourcesPage() {
  return (
    <>
      <ResourcesHeroSection />
      <ResourcesListSection />
      <ResourcesBottomSection />
    </>
  );
}
