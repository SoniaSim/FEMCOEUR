import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { SocialLinksRow } from "@/components/content/shared/SocialLinksRow";
import type { NewsletterSettings, SocialLink } from "@/lib/types/sanity";

interface StayInTouchSectionProps {
  socialLinks: SocialLink[];
  newsletter: NewsletterSettings | null;
}

const DEFAULT_TITLE = "Restons en contact";
const DEFAULT_DESCRIPTION =
  "Quelques mails par an : nos événements, nos publications et la vie du réseau.";

export function StayInTouchSection({
  socialLinks,
  newsletter,
}: StayInTouchSectionProps) {
  const title = newsletter?.title ?? DEFAULT_TITLE;
  const description = newsletter?.description ?? DEFAULT_DESCRIPTION;

  return (
    <section
      id="restons-en-contact"
      aria-labelledby="stay-in-touch-title"
      className="scroll-mt-24 bg-secondary py-16 md:py-24"
    >
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="stay-in-touch-title"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-secondary-foreground leading-tight"
          >
            {title}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          <p className="mt-5 text-sm sm:text-base text-secondary-foreground/80 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-xl text-left">
          <NewsletterForm buttonLabel={newsletter?.buttonLabel ?? undefined} />
        </div>

        {socialLinks.length > 0 && (
          <div className="mt-14 md:mt-16">
            <SocialLinksRow socialLinks={socialLinks} variant="dark" />
          </div>
        )}
      </div>
    </section>
  );
}
