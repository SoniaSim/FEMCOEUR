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
            <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
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
                  className="group relative rounded-2xl p-7 bg-card border border-primary/12 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Accent top au hover */}
                  <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary to-accent" />

                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-primary/10">
                    {Icon && <Icon className="w-7 h-7 text-primary" />}
                  </div>

                  {item.title && (
                    <p className="text-base font-bold mb-3 text-primary">
                      {item.title}
                    </p>
                  )}

                  <p className="text-base text-foreground/70 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
