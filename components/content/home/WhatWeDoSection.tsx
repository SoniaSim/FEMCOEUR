import { getIcon } from "@/lib/icons";
import type { HomeWhatItem } from "@/lib/types/sanity";

interface WhatWeDoSectionProps {
  title: string;
  items: HomeWhatItem[];
}

export function WhatWeDoSection({ title, items }: WhatWeDoSectionProps) {
  return (
    <section className="py-section md:py-section-md bg-muted/50">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            {title}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {items.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <div
                  key={item._key}
                  className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-card border border-border hover:border-primary/40 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                    {Icon && <Icon className="w-8 h-8 text-accent-foreground" />}
                  </div>
                  <h3 className="font-semibold text-foreground text-base md:text-lg">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
