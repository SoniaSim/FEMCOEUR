import { PortableText } from "@portabletext/react";
import type { BlockContent } from "@/sanity.types";
import { basePortableTextComponents } from "@/lib/portable-text-components";
import { SquiggleUnderline } from "@/components/ui/squiggle-underline";
import { PageHero } from "@/components/content/shared/PageHero";
import { EditorialCard } from "@/components/content/shared/EditorialCard";

interface WelcomeSectionProps {
  titlePrefix: string;
  titleHighlight: string;
  subtitle?: BlockContent | null;
}

export function WelcomeSection({ titlePrefix, titleHighlight, subtitle }: WelcomeSectionProps) {
  return (
    <>
      <PageHero
        badge="Premier réseau français"
        leftImage="/illustrations/cardiologist-pana.svg"
        rightImage="/illustrations/home.svg"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight mb-8">
          {titlePrefix}
          <span className="relative inline-block text-primary">
            {titleHighlight}
            <SquiggleUnderline />
          </span>
        </h1>
      </PageHero>

      {subtitle && subtitle.length > 0 && (
        <section id="mission" className="py-4 md:py-6 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <EditorialCard cta={{ label: "Rejoindre FEMCOEUR", href: "/join" }}>
                <PortableText value={subtitle} components={basePortableTextComponents} />
              </EditorialCard>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
