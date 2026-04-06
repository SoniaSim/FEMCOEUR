import { getIcon } from "@/lib/icons";
import { Card } from "@/components/ui/card";
import type { IconItem } from "@/lib/types/sanity";

interface MembershipModalitiesSectionProps {
  modalities: IconItem[];
  fee?: { amount: number; year: number };
}

export function MembershipModalitiesSection({ modalities, fee }: MembershipModalitiesSectionProps) {
  return (
    <section className="py-section md:py-section-md bg-background">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Modalités d&apos;adhésion
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {modalities.map((modality) => {
              const Icon = getIcon(modality.icon);
              return (
                <Card
                  key={modality._key}
                  className="p-6 md:p-8 flex flex-col items-center text-center space-y-4 border-2 hover:border-accent/50 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                    {Icon && <Icon className="w-8 h-8 text-accent-foreground" />}
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-foreground">
                    {modality.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {modality.description}
                  </p>
                </Card>
              );
            })}
          </div>
          {fee && (
            <p className="text-center mt-8 text-sm text-muted-foreground">
              Cotisation annuelle {fee.year} : <strong className="text-foreground">{fee.amount} €</strong>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
