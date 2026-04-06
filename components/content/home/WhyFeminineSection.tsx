import { getIcon } from "@/lib/icons";
import { Card } from "@/components/ui/card";
import type { HomeWhyItem } from "@/lib/types/sanity";

interface WhyFeminineSectionProps {
  title: string;
  items: HomeWhyItem[];
}

export function WhyFeminineSection({ title, items }: WhyFeminineSectionProps) {
  return (
    <section className="py-section md:py-section-md bg-background">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            {title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {items.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <Card
                  key={item._key}
                  className="p-6 md:p-8 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      {Icon && <Icon className="w-7 h-7 text-primary" />}
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
