import Image from "next/image";
import { AboutHeroSection } from "@/components/content/about/AboutHeroSection";
import { MissionSection } from "@/components/content/about/MissionSection";
import { HistorySection } from "@/components/content/about/HistorySection";
import { KeyActionsSection } from "@/components/content/about/KeyActionsSection";
import { ValuesSection } from "@/components/content/about/ValuesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos - FEMCOEUR",
  description:
    "Découvrez la mission, l'histoire et les valeurs de FEMCOEUR, le premier réseau français de cardiologues femmes.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <div className="relative overflow-hidden">
        <MissionSection />
        <HistorySection />
        <div
          className="hidden md:block absolute right-[8%] top-[44%] -translate-y-1/2 w-[min(24vw,280px)] pointer-events-none z-10 origin-center rotate-6 opacity-90"
          aria-hidden
        >
          <Image
            src="/illustrations/about.svg"
            alt=""
            width={300}
            height={225}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      <div className="relative overflow-hidden">
        <KeyActionsSection />
        <ValuesSection />
        <div
          className="hidden md:block absolute left-[6%] top-[60%] -translate-y-1/2 w-[min(24vw,280px)] pointer-events-none z-10 origin-center -rotate-6 opacity-90"
          aria-hidden
        >
          <Image
            src="/illustrations/missions.svg"
            alt=""
            width={280}
            height={210}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </>
  );
}
