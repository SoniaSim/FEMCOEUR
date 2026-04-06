import { redirect } from "next/navigation";

// Page Resources désactivée pour le lancement initial en production.
// À réactiver quand le contenu sera prêt.
//
// import { ResourcesHeroSection } from "@/components/content/resources/ResourcesHeroSection";
// import { ResourcesListSection } from "@/components/content/resources/ResourcesListSection";
// import { ResourcesBottomSection } from "@/components/content/resources/ResourcesBottomSection";
// import type { Metadata } from "next";
//
// export const metadata: Metadata = {
//   title: "Ressources",
//   description:
//     "Accédez à des ressources validées par des cardiologues femmes pour mieux comprendre la santé cardiovasculaire des femmes à chaque âge.",
//   alternates: {
//     canonical: "https://femcoeur.fr/resources",
//   },
// };

export default function ResourcesPage() {
  redirect("/");
}
