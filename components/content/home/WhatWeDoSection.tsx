import { getIcon } from "@/lib/icons";
import type { HomeWhatItem } from "@/lib/types/sanity";

interface WhatWeDoSectionProps {
  title: string;
  items: HomeWhatItem[];
}

export function WhatWeDoSection({ title, items }: WhatWeDoSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 bg-primary/15 border border-primary/30">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Notre mission
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-secondary-foreground leading-tight">
              {title}
            </h2>
            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>

          <div className="flex flex-col gap-4">
            {items.map((item, index) => {
              const Icon = getIcon(item.icon);
              const num = String(index + 1).padStart(2, "0");
              return (
                <div
                  key={item._key}
                  className="group relative flex items-start gap-6 rounded-2xl p-6 md:p-8 transition-all duration-300 bg-white/5 border border-white/[0.08] hover:bg-white/[0.09] hover:border-primary/40"
                >
                  {/* Numéro décoratif */}
                  <span
                    className="absolute right-6 top-4 text-7xl font-black leading-none select-none pointer-events-none text-white/[0.04]"
                    aria-hidden
                  >
                    {num}
                  </span>

                  {/* Icône */}
                  <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/20 border border-primary/30">
                    {Icon && <Icon className="w-7 h-7 text-primary" />}
                  </div>

                  {/* Contenu */}
                  <div className="relative flex-1 min-w-0">
                    <h3 className="font-bold text-lg md:text-xl text-secondary-foreground mb-2 leading-snug">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-base leading-relaxed text-secondary-foreground/65">
                        {item.description}
                      </p>
                    )}
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
