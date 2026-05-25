import { JoinHeroSection } from "@/components/content/join/JoinHeroSection";
import { MembershipModalitiesSection } from "@/components/content/join/MembershipModalitiesSection";
import { JoinCtaSection } from "@/components/content/join/JoinCtaSection";
import { FollowUsSection } from "@/components/content/shared/FollowUsSection";
import { getJoinPage, getSiteSettings } from "@/lib/sanity/fetch";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getJoinPage();
  return {
    title: data?.seo?.title ?? "Rejoindre FEMCOEUR",
    description:
      data?.seo?.description ??
      "Rejoignez FEMCOEUR, le premier réseau français de cardiologues femmes.",
    alternates: { canonical: "https://femcoeur.fr/join" },
  };
}

export default async function JoinPage() {
  const [data, siteSettings] = await Promise.all([
    getJoinPage(),
    getSiteSettings(),
  ]);

  const adhesionEmail = siteSettings?.contactEmails?.find(
    (c) =>
      (c.label?.toLowerCase().includes("adhésion") ?? false) ||
      (c.email?.includes("adhesion") ?? false)
  )?.email;

  const socialLinks = siteSettings?.socialLinks ?? [];

  return (
    <>
      <JoinHeroSection
        title={data?.hero?.title ?? "Rejoindre FEMCOEUR"}
        subtitle={data?.hero?.subtitle}
        cta={data?.hero?.cta}
      />
      {data?.modalities?.length ? (
        <MembershipModalitiesSection
          modalities={data.modalities}
          fee={
            data.membershipFee?.amount != null && data.membershipFee?.year != null
              ? { amount: data.membershipFee.amount, year: data.membershipFee.year }
              : null
          }
        />
      ) : null}
      <JoinCtaSection
        title={data?.cta?.title}
        body={data?.cta?.body}
        button={
          data?.cta?.button?.label != null && data.cta.button.href != null
            ? { label: data.cta.button.label, href: data.cta.button.href }
            : null
        }
        adhesionEmail={adhesionEmail}
      />
      <FollowUsSection socialLinks={socialLinks} />
    </>
  );
}
