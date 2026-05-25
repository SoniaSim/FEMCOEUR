import { getIcon } from "@/lib/icons";
import type { HomeWhyItem } from "@/lib/types/sanity";

interface WhyFeminineSectionProps {
  title: string;
  items: HomeWhyItem[];
}

export function WhyFeminineSection({ title, items }: WhyFeminineSectionProps) {
  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground leading-tight">
              {title}
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {items.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <div
                  key={item._key}
                  className="card-base card-interactive group relative p-4 sm:p-7"
                >
                  {/* Accent top au hover */}
                  <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary to-accent" />

                  <div className="relative grid grid-cols-[auto_1fr] sm:grid-cols-1 gap-x-4 gap-y-3 sm:gap-y-0">
                    {/* Icône : à gauche du titre sur mobile, au-dessus sur desktop (grille 3-col oblige) */}
                    <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center bg-primary/10 sm:mb-5">
                      {Icon && <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />}
                    </div>

                    {/* Titre */}
                    {item.title && (
                      <p className="self-center sm:self-auto sm:mb-3 font-bold text-base text-primary leading-snug min-w-0">
                        {item.title}
                      </p>
                    )}

                    {/* Description : full-width sur mobile, sous le bloc sur desktop */}
                    <p className="col-span-2 sm:col-span-1 text-base text-foreground/70 leading-relaxed">
                      {item.text}
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
