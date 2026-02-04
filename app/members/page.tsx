import Image from "next/image";
import { MembersHeroSection } from "@/components/content/members/MembersHeroSection";
import { MembersListSection } from "@/components/content/members/MembersListSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Membres - FEMCOEUR",
  description:
    "Rencontrez les cardiologues femmes engagées qui font avancer la cardiologie au féminin en France.",
};

export default function MembersPage() {
  return (
    <>
      {/* Wrapper pour illustration flottante entre hero et liste des membres */}
      <div className="relative overflow-hidden">
        <MembersHeroSection />
        <MembersListSection />
        {/* Illustration flottante à gauche, entre hero et membres du bureau */}
        <div
          className="hidden md:block absolute right-[8%] top-[14%] -translate-y-1/2 w-[min(24vw,280px)] pointer-events-none z-10 origin-center -rotate-6 opacity-90"
          aria-hidden
        >
          <Image
            src="/illustrations/members.svg"
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
