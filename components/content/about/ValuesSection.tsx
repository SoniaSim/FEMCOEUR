import { getIcon } from "@/lib/icons";
import { Reveal } from "@/components/ui/reveal";
import { NumberedCard } from "@/components/content/shared/NumberedCard";
import type { IconItem } from "@/lib/types/sanity";

interface ValuesSectionProps {
  values: IconItem[];
}

export function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-background to-primary/5">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 bg-primary/15 border border-primary/30">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Ce qui nous porte
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground leading-tight">
              Nos valeurs
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>

          <div className="flex flex-col gap-5">
            {values.map((value, index) => (
              <Reveal key={value._key} delay={index * 80} from="left">
                <NumberedCard
                  icon={getIcon(value.icon)}
                  title={value.title ?? ""}
                  description={value.description}
                  number={index + 1}
                  variant="light"
                  layout="row"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
