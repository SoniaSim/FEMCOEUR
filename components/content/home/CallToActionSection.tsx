import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getIcon } from "@/lib/icons";
import type { HomeCtaItem } from "@/lib/types/sanity";

interface CallToActionSectionProps {
  title?: string | null;
  subtitle?: string | null;
  items: HomeCtaItem[];
}

export function CallToActionSection({
  title,
  subtitle,
  items,
}: CallToActionSectionProps) {
  // Seuls les items "principaux" (avec description) sont rendus ici.
  // Les liens sociaux sont gérés par FollowUsSection (alimentée depuis siteSettings).
  const mainItems = items.filter((item) => item.description);

  if (mainItems.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-background to-primary/5">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-3 leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-foreground/60 max-w-xl mx-auto">
                {subtitle}
              </p>
            )}
            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-linear-to-r from-primary to-accent" />
          </div>

          {/* CTA principaux */}
          <div
            className={`grid gap-6 ${mainItems.length === 1 ? "grid-cols-1 max-w-md mx-auto" : "md:grid-cols-2"}`}
          >
            {mainItems.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <div
                  key={item._key}
                  className="card-base card-interactive group relative p-6 sm:p-8 flex flex-col items-center text-center"
                >
                  {/* Accent top au hover */}
                  <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-primary to-accent" />

                  {Icon && (
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-primary/10">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  )}

                  <div className="flex-1 mb-7 space-y-3">
                    <h3 className="font-bold text-lg md:text-xl text-foreground leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-base text-foreground/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <Button
                    asChild={Boolean(item.href)}
                    variant={item.variant ?? "default"}
                    size="lg"
                    className="w-full font-bold"
                    disabled={!item.href}
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {item.buttonLabel}
                      </Link>
                    ) : (
                      <span>{item.buttonLabel}</span>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
