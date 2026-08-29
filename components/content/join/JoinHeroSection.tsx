import { PageHero } from "@/components/content/shared/PageHero";
import { TitleWithFemcoeurMark } from "@/components/ui/title-with-femcoeur-mark";
import { EditorialCard } from "@/components/content/shared/EditorialCard";

interface JoinHeroSectionProps {
  title: string;
  subtitle?: string | null;
  cta?: { label?: string | null; href?: string | null } | null;
}

export function JoinHeroSection({ title, subtitle, cta }: JoinHeroSectionProps) {
  const ctaLabel = cta?.label?.trim() || "Devenir membre";
  const ctaHref = cta?.href?.trim() || "#adhesion";

  return (
    <>
      <PageHero
        badge="Passer à l'action"
        leftImage="/illustrations/join.svg"
        rightImage="/illustrations/welcome-rafiki.svg"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight">
          <TitleWithFemcoeurMark title={title} />
        </h1>
      </PageHero>

      {subtitle && (
        <section className="py-4 md:py-6 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <EditorialCard cta={{ label: ctaLabel, href: ctaHref }}>
                <p className="text-base md:text-lg text-foreground/75 leading-relaxed whitespace-pre-line">
                  {subtitle}
                </p>
              </EditorialCard>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
