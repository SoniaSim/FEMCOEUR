import { getIcon } from "@/lib/icons";
import { Card } from "@/components/ui/card";
import type { WhyJoinItem } from "@/lib/types/sanity";

interface WhyJoinSectionProps {
  title: string;
  items: WhyJoinItem[];
}

export function WhyJoinSection({ title, items }: WhyJoinSectionProps) {
  return (
    <section className="py-section md:py-section-md bg-linear-to-br from-primary/10 via-background to-primary/5">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            {title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {items.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <Card
                  key={item._key}
                  className="p-6 md:p-8 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex gap-4 md:gap-6">
                    <div className="shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      {Icon && <Icon className="w-7 h-7 text-primary" />}
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex items-center">
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
