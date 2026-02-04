import Image from "next/image";
import { JoinHeroSection } from "@/components/content/join/JoinHeroSection";
import { WhyJoinSection } from "@/components/content/join/WhyJoinSection";
import { MembershipModalitiesSection } from "@/components/content/join/MembershipModalitiesSection";
import { JoinCtaSection } from "@/components/content/join/JoinCtaSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rejoindre - FEMCOEUR",
  description:
    "Rejoignez FEMCOEUR, le premier réseau français de cardiologues femmes. Découvrez les avantages de l'adhésion et les modalités pour nous rejoindre.",
};

export default function JoinPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <JoinHeroSection />
        <WhyJoinSection />
        <div
          className="hidden md:block absolute right-[8%] top-[46%] -translate-y-1/2 w-[min(24vw,280px)] pointer-events-none z-10 origin-center rotate-6 opacity-90"
          aria-hidden
        >
          <Image
            src="/illustrations/join.svg"
            alt=""
            width={280}
            height={210}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      <MembershipModalitiesSection />
      <JoinCtaSection />
    </>
  );
}
