import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { Analytics } from "@vercel/analytics/next";

export const revalidate = false;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getSiteSettings();

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col">
        <Header siteSettings={siteSettings} />
        <main className="flex-1">{children}</main>
        <Footer siteSettings={siteSettings} />
        <Toaster />
      </div>
      {/*
        Mesure de fréquentation. Posée ici et non dans le layout racine, qui
        envelopperait aussi `/studio` : le Studio est une application monopage
        dont chaque document ouvert change l'URL, et l'outil compte aussi les
        transitions côté navigateur. Le back-office produirait donc des dizaines
        d'événements par session de rédaction — des visites de l'administratrice
        mêlées aux statistiques du public, et du quota consommé pour rien.

        Sans cookie ni identifiant conservé, donc sans bandeau de consentement à
        afficher. Ce que l'outil collecte est décrit dans `/confidentialite` :
        toute modification ici oblige à rouvrir cette page, qui engage
        l'association.
      */}
      <Analytics />
    </ToastProvider>
  );
}
