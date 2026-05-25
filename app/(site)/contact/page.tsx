import { ContactHeroSection } from "@/components/content/contact/ContactHeroSection";
import { ContactFormSection } from "@/components/content/contact/ContactFormSection";
import { ContactInfoSection } from "@/components/content/contact/ContactInfoSection";
import { getContactPage, getSiteSettings } from "@/lib/sanity/fetch";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactPage();
  return {
    title: data?.seo?.title ?? "Contact",
    description:
      data?.seo?.description ??
      "Contactez FEMCOEUR pour toute question sur la cardiologie des femmes, un projet ou un partenariat.",
    alternates: { canonical: "https://femcoeur.fr/contact" },
  };
}

export default async function ContactPage() {
  const [data, siteSettings] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
  ]);

  const contacts = siteSettings?.contactEmails ?? [];

  return (
    <>
      <ContactHeroSection
        title={data?.hero?.title ?? "Contactez-nous"}
        subtitle={data?.hero?.subtitle}
      />
      <ContactFormSection intro={data?.formIntro} />
      {contacts.length > 0 && (
        <ContactInfoSection
          title={data?.contactInfoTitle}
          contacts={contacts}
        />
      )}
    </>
  );
}
