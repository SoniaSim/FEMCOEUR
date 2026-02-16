import { ContactHeroSection } from "@/components/content/contact/ContactHeroSection";
import { ContactFormSection } from "@/components/content/contact/ContactFormSection";
import { ContactInfoSection } from "@/components/content/contact/ContactInfoSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - FEMCOEUR",
  description:
    "Contactez FEMCOEUR pour toute question sur la cardiologie des femmes, un projet ou un partenariat.",
};

export default function ContactPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <ContactHeroSection />
        <ContactFormSection />
        {/* Illustration flottante à droite, entre hero et formulaire */}
        <div
          className="hidden md:block absolute right-[4%] top-[38%] -translate-y-1/2 w-[min(24vw,280px)] pointer-events-none z-10 origin-center rotate-6 opacity-90"
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/illustrations/contact.svg"
            alt=""
            width={280}
            height={210}
            className="w-full h-auto object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <ContactInfoSection />
    </>
  );
}
