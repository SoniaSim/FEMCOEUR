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
    description: data?.seo?.description ?? "Découvrez la mission, l'histoire et les valeurs de FEMCOEUR, le premier réseau français de cardiologues femmes.",
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
      <div className="relative overflow-hidden">
        {data?.mission && (
          <MissionSection title={data.mission.title} body={data.mission.body} />
        )}
        {data?.history && (
          <HistorySection title={data.history.title} body={data.history.body} />
        )}
        <div
          className="hidden md:block absolute right-[8%] top-[44%] -translate-y-1/2 w-[min(24vw,280px)] pointer-events-none z-10 origin-center rotate-6 opacity-90"
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/illustrations/about.svg"
            alt=""
            width={300}
            height={225}
            className="w-full h-auto object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div className="relative overflow-hidden">
        {data?.keyActions && data.keyActions.length > 0 && (
          <KeyActionsSection actions={data.keyActions} />
        )}
        {data?.values && data.values.length > 0 && (
          <ValuesSection values={data.values} />
        )}
        <div
          className="hidden md:block absolute left-[6%] top-[60%] -translate-y-1/2 w-[min(24vw,280px)] pointer-events-none z-10 origin-center -rotate-6 opacity-90"
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/illustrations/missions.svg"
            alt=""
            width={280}
            height={210}
            className="w-full h-auto object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </>
  );
}
