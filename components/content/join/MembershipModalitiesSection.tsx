import { getIcon } from "@/lib/icons";
import { Reveal } from "@/components/ui/reveal";
import { NumberedCard } from "@/components/content/shared/NumberedCard";
import type { IconItem } from "@/lib/types/sanity";

interface MembershipModalitiesSectionProps {
  modalities: IconItem[];
  fee?: { amount: number; year: number } | null;
}

export function MembershipModalitiesSection({
  modalities,
  fee,
}: MembershipModalitiesSectionProps) {
  const count = modalities.length;
  const gridClass =
    count === 1
      ? "grid-cols-1 max-w-md mx-auto"
      : count === 2
      ? "sm:grid-cols-2"
      : count === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section id="adhesion" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 bg-primary/15 border border-primary/30">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Plusieurs façons de s&apos;engager
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-secondary-foreground leading-tight">
              Comment nous rejoindre
            </h2>
            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />

            {fee && (
              <div className="inline-flex items-center gap-3 mt-8 px-5 py-2.5 rounded-full bg-primary/20 border border-primary/40 backdrop-blur-sm">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Cotisation {fee.year}
                </span>
                <span className="w-px h-4 bg-primary/40" />
                <span className="text-base font-black text-secondary-foreground">
                  {fee.amount} €
                </span>
              </div>
            )}
          </div>

          <div className={`grid gap-5 ${gridClass}`}>
            {modalities.map((modality, index) => (
              <Reveal key={modality._key} delay={index * 80} className="h-full">
                <NumberedCard
                  icon={getIcon(modality.icon)}
                  title={modality.title ?? ""}
                  description={modality.description}
                  number={index + 1}
                  variant="dark"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
