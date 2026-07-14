import type { Metadata } from "next";
import { WelcomeSection } from "@/components/content/home/WelcomeSection";
import { KeyStatsSection } from "@/components/content/home/KeyStatsSection";
import { WhyFeminineSection } from "@/components/content/home/WhyFeminineSection";
import { WhatWeDoSection } from "@/components/content/home/WhatWeDoSection";
import { CallToActionSection } from "@/components/content/home/CallToActionSection";
import { FollowUsSection } from "@/components/content/shared/FollowUsSection";
import { getHomePage, getSiteSettings } from "@/lib/sanity/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePage();
  return {
    title:
      data?.seo?.title ??
      "FEMCOEUR — Premier réseau français de cardiologues femmes",
    description:
      data?.seo?.description ??
      "FEMCOEUR est le premier réseau français de cardiologues femmes. Nous œuvrons pour la reconnaissance des spécificités cardiovasculaires féminines et la promotion des femmes dans la cardiologie.",
    alternates: { canonical: "https://femcoeur.fr" },
    openGraph: {
      title:
        data?.seo?.title ??
        "FEMCOEUR — Premier réseau français de cardiologues femmes",
      description:
        data?.seo?.description ??
        "FEMCOEUR est le premier réseau français de cardiologues femmes.",
      url: "https://femcoeur.fr",
    },
  };
}

export default async function Home() {
  const [data, siteSettings] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
  ]);

  const socialLinks = siteSettings?.socialLinks ?? [];
  // Bande masquée sous 2 stats : une stat seule ressemble à une erreur.
  const keyStats = data?.keyStats;
  const keyStatItems = keyStats?.items ?? [];

  return (
    <>
      <WelcomeSection
        titlePrefix={
          data?.welcome?.titlePrefix ??
          "Bienvenue au sein du premier réseau français de"
        }
        titleHighlight={
          data?.welcome?.titleHighlight ??
          "femmes médecins et chirurgiennes cardiovasculaires"
        }
        tagline={data?.welcome?.tagline}
        heroImage={data?.welcome?.heroImage}
        subtitle={data?.welcome?.subtitle}
      />
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
      {data?.callToAction?.items?.length ? (
        <CallToActionSection
          title={data.callToAction.title}
          subtitle={data.callToAction.subtitle}
          items={data.callToAction.items}
        />
      ) : null}
      <FollowUsSection socialLinks={socialLinks} />
    </>
  );
}
