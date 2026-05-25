import { getIcon } from "@/lib/icons";
import { Reveal } from "@/components/ui/reveal";
import { NumberedCard } from "@/components/content/shared/NumberedCard";
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-secondary-foreground leading-tight">
              {title}
            </h2>
            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>

          <div className="flex flex-col gap-4">
            {items.map((item, index) => (
              <Reveal key={item._key} delay={index * 80} from="left">
                <NumberedCard
                  icon={getIcon(item.icon)}
                  title={item.title ?? ""}
                  description={item.description}
                  number={index + 1}
                  variant="dark"
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
