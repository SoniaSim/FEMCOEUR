import { SocialLinksRow } from "@/components/content/shared/SocialLinksRow";
import type { SocialLink } from "@/lib/types/sanity";

interface FollowUsSectionProps {
  socialLinks: SocialLink[];
}

/**
 * Section « Suivez-nous » seule. Conservée pour la page /join, où l'on ne veut
 * pas de champ email : il offrirait une porte de sortie à bas coût face au CTA
 * d'adhésion. Ailleurs, c'est `StayInTouchSection` qui prend le relais.
 */
export function FollowUsSection({ socialLinks }: FollowUsSectionProps) {
  if (socialLinks.length === 0) return null;

  return (
    <section className="pt-6 md:pt-8 pb-14 md:pb-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="container">
        <SocialLinksRow socialLinks={socialLinks} />
      </div>
    </section>
  );
}
