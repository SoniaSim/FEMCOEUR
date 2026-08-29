import { SquiggleUnderline } from "@/components/ui/squiggle-underline";
import { PageHero } from "@/components/content/shared/PageHero";

interface ContactHeroSectionProps {
  title: string;
  subtitle?: string | null;
}

/**
 * Cherche la dernière occurrence de "nous" dans le titre et la souligne
 * avec le squiggle. Fallback : rend le titre tel quel.
 */
function renderTitle(title: string) {
  const lower = title.toLowerCase();
  const idx = lower.lastIndexOf("nous");
  if (idx < 0) return title;
  const before = title.slice(0, idx);
  const word = title.slice(idx, idx + 4);
  const after = title.slice(idx + 4);
  return (
    <>
      {before}
      <span className="relative inline-block text-primary">
        {word}
        <SquiggleUnderline />
      </span>
      {after}
    </>
  );
}

export function ContactHeroSection({ title, subtitle }: ContactHeroSectionProps) {
  return (
    <PageHero
      badge="Parlons-en"
      leftImage="/illustrations/contact.svg"
      rightImage="/illustrations/cardiologist-pana.svg"
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight mb-6">
        {renderTitle(title)}
      </h1>

      {subtitle && (
        <p className="text-base md:text-lg text-foreground/65 leading-relaxed">
          {subtitle}
        </p>
      )}
    </PageHero>
  );
}
