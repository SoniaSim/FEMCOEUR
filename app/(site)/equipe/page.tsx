import { MembersHeroSection } from "@/components/content/members/MembersHeroSection";
import { MembersListSection } from "@/components/content/members/MembersListSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "L'équipe",
  description:
    "Rencontrez l'équipe de FEMCOEUR, des cardiologues femmes engagées qui font avancer la cardiologie au féminin en France.",
  alternates: {
    canonical: "https://femcoeur.fr/equipe",
  },
};

export default function MembersPage() {
  return (
    <>
      <MembersHeroSection />
      <MembersListSection />
    </>
  );
}
