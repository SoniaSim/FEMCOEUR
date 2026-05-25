import { PageHero } from "@/components/content/shared/PageHero";
import { TitleWithFemcoeurMark } from "@/components/ui/title-with-femcoeur-mark";

interface AboutHeroSectionProps {
  title: string;
  subtitle?: string | null;
}

export function AboutHeroSection({ title, subtitle }: AboutHeroSectionProps) {
  return (
    <PageHero
      badge="Notre association"
      leftImage="/illustrations/about.svg"
      rightImage="/illustrations/powerful-pana.svg"
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight mb-6">
        <TitleWithFemcoeurMark title={title} />
      </h1>

      {subtitle && (
        <p className="text-base md:text-lg text-foreground/65 leading-relaxed">
          {subtitle}
        </p>
      )}
    </PageHero>
  );
}
