import { getIcon } from "@/lib/icons";
import { Reveal } from "@/components/ui/reveal";
import { NumberedCard } from "@/components/content/shared/NumberedCard";
import type { IconItem } from "@/lib/types/sanity";

interface KeyActionsSectionProps {
  actions: IconItem[];
}

export function KeyActionsSection({ actions }: KeyActionsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 bg-primary/15 border border-primary/30">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Ce qu&apos;on fait
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-secondary-foreground leading-tight">
              Nos actions
            </h2>
            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {actions.map((action, index) => (
              <Reveal key={action._key} delay={index * 80} className="h-full">
                <NumberedCard
                  icon={getIcon(action.icon)}
                  title={action.title ?? ""}
                  description={action.description}
                  number={index + 1}
                  variant="dark"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
