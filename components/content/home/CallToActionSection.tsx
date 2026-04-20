import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getIcon } from "@/lib/icons";
import { Card } from "@/components/ui/card";
import type { HomeCtaItem } from "@/lib/types/sanity";

interface CallToActionSectionProps {
  title?: string | null;
  subtitle?: string | null;
  items: HomeCtaItem[];
}

export function CallToActionSection({ title, subtitle, items }: CallToActionSectionProps) {
  return (
    <section className="py-section md:py-section-md bg-linear-to-br from-secondary/5 via-background to-accent/5">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-center text-muted-foreground mb-12 text-lg">
              {subtitle}
            </p>
          )}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {items.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <Card
                  key={item._key}
                  className="p-8 flex flex-col items-center text-center space-y-6 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    {Icon && <Icon className="w-8 h-8 text-primary" />}
                  </div>
                  <div className="space-y-3 grow">
                    <h3 className="font-bold text-lg md:text-xl text-foreground">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <Button
                    asChild={Boolean(item.href)}
                    variant={item.variant ?? "default"}
                    size="lg"
                    className="w-full"
                    disabled={!item.href}
                  >
                    {item.href ? (
                      <Link href={item.href}>{item.buttonLabel}</Link>
                    ) : (
                      <span>{item.buttonLabel}</span>
                    )}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
