import { getIcon } from "@/lib/icons";
import type { IconItem } from "@/lib/types/sanity";

interface ValuesSectionProps {
  values: IconItem[];
}

export function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <section className="py-section md:py-section-md bg-linear-to-br from-secondary/5 via-background to-accent/5">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Nos valeurs
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {values.map((value) => {
              const Icon = getIcon(value.icon);
              return (
                <div
                  key={value._key}
                  className="flex gap-4 p-6 md:p-8 rounded-lg bg-card border-2 border-border hover:border-primary/40 transition-all duration-300"
                >
                  <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {Icon && <Icon className="w-6 h-6 text-primary" />}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-base md:text-lg text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
