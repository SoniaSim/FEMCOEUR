import type { Metadata } from "next";
import { WelcomeSection } from "@/components/content/home/WelcomeSection";
import { WhyFeminineSection } from "@/components/content/home/WhyFeminineSection";
import { WhatWeDoSection } from "@/components/content/home/WhatWeDoSection";
import { CallToActionSection } from "@/components/content/home/CallToActionSection";

export const metadata: Metadata = {
  title: "FEMCOEUR — Premier réseau français de cardiologues femmes",
  description:
    "FEMCOEUR est le premier réseau français de cardiologues femmes. Nous œuvrons pour la reconnaissance des spécificités cardiovasculaires féminines et la promotion des femmes dans la cardiologie.",
  alternates: {
    canonical: "https://femcoeur.fr",
  },
  openGraph: {
    title: "FEMCOEUR — Premier réseau français de cardiologues femmes",
    description:
      "FEMCOEUR est le premier réseau français de cardiologues femmes. Nous œuvrons pour la reconnaissance des spécificités cardiovasculaires féminines.",
    url: "https://femcoeur.fr",
  },
};

export default function Home() {
  return (
    <>
      <WelcomeSection />
      <WhyFeminineSection />
      <WhatWeDoSection />
      <CallToActionSection />
    </>
  );
}
