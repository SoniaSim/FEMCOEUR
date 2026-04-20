import { getIcon } from "@/lib/icons";
import { Card } from "@/components/ui/card";
import type { IconItem } from "@/lib/types/sanity";

interface KeyActionsSectionProps {
  actions: IconItem[];
}

export function KeyActionsSection({ actions }: KeyActionsSectionProps) {
  return (
    <section className="py-section md:py-section-md bg-muted/30">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Nos actions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {actions.map((action) => {
              const Icon = getIcon(action.icon);
              return (
                <Card
                  key={action._key}
                  className="p-6 md:p-8 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      {Icon && <Icon className="w-7 h-7 text-primary" />}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg md:text-xl text-foreground">
                        {action.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {action.description}
                      </p>
                    </div>
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
