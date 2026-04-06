import { JoinHeroSection } from "@/components/content/join/JoinHeroSection";
import { WhyJoinSection } from "@/components/content/join/WhyJoinSection";
import { MembershipModalitiesSection } from "@/components/content/join/MembershipModalitiesSection";
import { JoinCtaSection } from "@/components/content/join/JoinCtaSection";
import { getJoinPage, getSiteSettings } from "@/lib/sanity/fetch";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getJoinPage();
  return {
    title: data?.seo?.title ?? "Rejoindre FEMCOEUR",
    description: data?.seo?.description ?? "Rejoignez FEMCOEUR, le premier réseau français de cardiologues femmes.",
    alternates: { canonical: "https://femcoeur.fr/join" },
  };
}

export default async function JoinPage() {
  const [data, siteSettings] = await Promise.all([getJoinPage(), getSiteSettings()]);

  const adhesionEmail = siteSettings?.contactEmails?.find(
    (c) => c.label.toLowerCase().includes("adhésion") || c.email.includes("adhesion")
  )?.email;

  return (
    <>
      <div className="relative overflow-hidden">
        <JoinHeroSection
          title={data?.hero?.title ?? "Rejoindre FEMCOEUR"}
          subtitle={data?.hero?.subtitle}
        />
        {data?.whyJoin && data.whyJoin.items && data.whyJoin.items.length > 0 && (
          <WhyJoinSection
            title={data.whyJoin.title}
            items={data.whyJoin.items}
          />
        )}
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
      {data?.modalities && data.modalities.length > 0 && (
        <MembershipModalitiesSection
          modalities={data.modalities}
          fee={data.membershipFee}
        />
      )}
      <JoinCtaSection
        title={data?.cta?.title}
        body={data?.cta?.body}
        button={data?.cta?.button}
        adhesionEmail={adhesionEmail}
      />
    </>
  );
}
