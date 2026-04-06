import type { Metadata } from "next";
import { WelcomeSection } from "@/components/content/home/WelcomeSection";
import { WhyFeminineSection } from "@/components/content/home/WhyFeminineSection";
import { WhatWeDoSection } from "@/components/content/home/WhatWeDoSection";
import { CallToActionSection } from "@/components/content/home/CallToActionSection";
import { getHomePage } from "@/lib/sanity/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePage();
  return {
    title: data?.seo?.title ?? "FEMCOEUR — Premier réseau français de cardiologues femmes",
    description: data?.seo?.description ?? "FEMCOEUR est le premier réseau français de cardiologues femmes. Nous œuvrons pour la reconnaissance des spécificités cardiovasculaires féminines et la promotion des femmes dans la cardiologie.",
    alternates: { canonical: "https://femcoeur.fr" },
    openGraph: {
      title: data?.seo?.title ?? "FEMCOEUR — Premier réseau français de cardiologues femmes",
      description: data?.seo?.description ?? "FEMCOEUR est le premier réseau français de cardiologues femmes.",
      url: "https://femcoeur.fr",
    },
  };
}

export default async function Home() {
  const data = await getHomePage();

  return (
    <>
      <WelcomeSection
        titlePrefix={data?.welcome?.titlePrefix ?? "Bienvenue au sein du premier réseau français de"}
        titleHighlight={data?.welcome?.titleHighlight ?? "femmes médecins et chirurgiennes cardiovasculaires"}
        subtitle={data?.welcome?.subtitle}
      />
      {data?.whyFeminine && data.whyFeminine.items && data.whyFeminine.items.length > 0 && (
        <WhyFeminineSection
          title={data.whyFeminine.title}
          items={data.whyFeminine.items}
        />
      )}
      {data?.whatWeDo && data.whatWeDo.items && data.whatWeDo.items.length > 0 && (
        <WhatWeDoSection
          title={data.whatWeDo.title}
          items={data.whatWeDo.items}
        />
      )}
      {data?.callToAction && data.callToAction.items && data.callToAction.items.length > 0 && (
        <CallToActionSection
          title={data.callToAction.title}
          subtitle={data.callToAction.subtitle}
          items={data.callToAction.items}
        />
      )}
    </>
  );
}
