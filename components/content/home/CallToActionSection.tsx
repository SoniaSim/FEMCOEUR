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
  const mainItems = items.filter((item) => item.description);
  const socialItems = items.filter((item) => !item.description);

  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-background to-primary/5">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3 leading-tight">
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
          {mainItems.length > 0 && (
            <div
              className={`grid gap-6 mb-8 ${mainItems.length === 1 ? "grid-cols-1 max-w-md mx-auto" : "md:grid-cols-2"}`}
            >
              {mainItems.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <div
                    key={item._key}
                    className="group relative rounded-2xl p-8 flex flex-col items-center text-center bg-card border border-primary/15 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
                        <Link href={item.href}>{item.buttonLabel}</Link>
                      ) : (
                        <span>{item.buttonLabel}</span>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Réseaux sociaux */}
          {socialItems.length > 0 && (
            <>
              <div className="flex items-center gap-4 mb-5">
                <div className="flex-1 h-px bg-primary/15" />
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Suivez-nous
                </p>
                <div className="flex-1 h-px bg-primary/15" />
              </div>

              <div
                className={`grid gap-4 ${socialItems.length === 1 ? "grid-cols-1 max-w-xs mx-auto" : socialItems.length === 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-3"}`}
              >
                {socialItems.map((item) => {
                  const Icon = getIcon(item.icon);
                  return (
                    <div
                      key={item._key}
                      className="group flex items-center gap-4 rounded-2xl px-5 py-4 bg-card border border-primary/12 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10">
                        {Icon && <Icon className="w-5 h-5 text-primary" />}
                      </div>

                      <p className="flex-1 text-sm font-semibold text-foreground leading-tight">
                        {item.title}
                      </p>

                      {item.href && (
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
                          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary transition-all duration-200 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground"
                          aria-label={item.buttonLabel}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            aria-hidden
                          >
                            <path
                              d="M3 7h8M7.5 3.5l3.5 3.5-3.5 3.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
