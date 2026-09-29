import type { Metadata } from "next";
import { WelcomeSection } from "@/components/content/home/WelcomeSection";
import { KeyStatsSection } from "@/components/content/home/KeyStatsSection";
import { WhyFeminineSection } from "@/components/content/home/WhyFeminineSection";
import { WhatWeDoSection } from "@/components/content/home/WhatWeDoSection";
import { CallToActionSection } from "@/components/content/home/CallToActionSection";
import { MissionCardSection } from "@/components/content/home/MissionCardSection";
import { NextEventSection } from "@/components/content/home/NextEventSection";
import { LatestArticlesSection } from "@/components/content/home/LatestArticlesSection";
import { StayInTouchSection } from "@/components/content/shared/StayInTouchSection";
import {
  getArticles,
  getEvents,
  getHomePage,
  getSiteSettings,
} from "@/lib/sanity/fetch";
import { pickHighlight } from "@/lib/events/schedule";
import { baseOpenGraph } from "@/lib/seo/open-graph";

/**
 * Le bandeau « Prochain rendez-vous » compare des dates au rendu. Sans
 * revalidation temporelle, la comparaison serait figée au build et un événement
 * passé resterait annoncé en haut de la page d'accueil. Voir
 * `lib/events/schedule.ts`.
 */
export const revalidate = 3600;

/** Derniers recours si les champs SEO de la page d'accueil sont vides dans Sanity. */
const FALLBACK_TITLE = "FEMCOEUR — Association de cardiologues femmes";
const FALLBACK_DESCRIPTION =
  "FEMCOEUR est une association de cardiologues femmes. Nous œuvrons pour la reconnaissance des spécificités cardiovasculaires féminines et la promotion des femmes dans la cardiologie.";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePage();
  const title = data?.seo?.title ?? FALLBACK_TITLE;
  const description = data?.seo?.description ?? FALLBACK_DESCRIPTION;

  return {
    // `absolute` court-circuite le gabarit « %s | FEMCOEUR » du layout racine.
    // Il est juste pour les pages intérieures (« Événements | FEMCOEUR ») mais
    // absurde ici : le titre de la home porte déjà la marque, et le gabarit la
    // doublait tout en poussant le titre au-delà des 60 caractères utiles.
    title: { absolute: title },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      ...baseOpenGraph,
      title,
      description,
      url: "/",
      type: "website",
    },
  };
}

export default async function Home() {
  const [data, siteSettings, events, articles] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getEvents(),
    getArticles(),
  ]);

  const socialLinks = siteSettings?.socialLinks ?? [];
  // Bande masquée sous 2 stats : une stat seule ressemble à une erreur.
  const keyStats = data?.keyStats;
  const keyStatItems = keyStats?.items ?? [];
  // Le plus proche des événements à venir, sauf si l'un d'eux est coché
  // « Mettre en avant » dans Sanity.
  const nextEvent = pickHighlight(events);

  return (
    <>
      <WelcomeSection
        titlePrefix={
          data?.welcome?.titlePrefix ??
          "Bienvenue au sein de l'association de"
        }
        titleHighlight={
          data?.welcome?.titleHighlight ??
          "femmes médecins et chirurgiennes cardiovasculaires"
        }
        tagline={data?.welcome?.tagline}
        heroImage={data?.welcome?.heroImage}
      />
      {/* Bloc de mise en avant, juste sous le hero. Absent s'il n'y a aucun
          événement à venir : sur une page d'accueil, un état vide annoncé est
          pire que pas de section. */}
      {nextEvent && <NextEventSection event={nextEvent} />}
      <MissionCardSection subtitle={data?.welcome?.subtitle} />
      {keyStats && keyStatItems.length >= 2 && (
        <KeyStatsSection
          stats={keyStatItems}
          eyebrow={keyStats.eyebrow}
          title={keyStats.title}
        />
      )}
      {data?.whyFeminine?.items?.length ? (
        <WhyFeminineSection
          title={data.whyFeminine.title ?? ""}
          items={data.whyFeminine.items}
        />
      ) : null}
      {data?.whatWeDo?.items?.length ? (
        <WhatWeDoSection
          title={data.whatWeDo.title ?? ""}
          items={data.whatWeDo.items}
        />
      ) : null}
      <LatestArticlesSection articles={articles} />
      {data?.callToAction?.items?.length ? (
        <CallToActionSection
          title={data.callToAction.title}
          subtitle={data.callToAction.subtitle}
          items={data.callToAction.items}
        />
      ) : null}
      <StayInTouchSection
        socialLinks={socialLinks}
        newsletter={siteSettings?.newsletter ?? null}
      />
    </>
  );
}
