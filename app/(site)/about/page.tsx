import { AboutHeroSection } from "@/components/content/about/AboutHeroSection";
import { MissionSection } from "@/components/content/about/MissionSection";
import { HistorySection } from "@/components/content/about/HistorySection";
import { KeyActionsSection } from "@/components/content/about/KeyActionsSection";
import { ValuesSection } from "@/components/content/about/ValuesSection";
import { getAboutPage } from "@/lib/sanity/fetch";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPage();
  return {
    title: data?.seo?.title ?? "À propos",
    description:
      data?.seo?.description ??
      "Découvrez la mission, l'histoire et les valeurs de FEMCOEUR, l'association de cardiologues femmes.",
    alternates: { canonical: "https://femcoeur.fr/about" },
  };
}

export default async function AboutPage() {
  const data = await getAboutPage();

  return (
    <>
      <AboutHeroSection
        title={data?.hero?.title ?? "À propos de FEMCOEUR"}
        subtitle={data?.hero?.subtitle}
      />
      {data?.mission && (
        <MissionSection
          title={data.mission.title}
          body={data.mission.body}
          images={data.mission.images}
        />
      )}
      {data?.history && (
        <HistorySection title={data.history.title} body={data.history.body} />
      )}
      {data?.keyActions?.length ? (
        <KeyActionsSection actions={data.keyActions} />
      ) : null}
      {data?.values?.length ? <ValuesSection values={data.values} /> : null}
    </>
  );
}
