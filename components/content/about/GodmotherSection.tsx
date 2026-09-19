import Link from "next/link";
import { ArrowUpRight, HeartHandshake } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import { basePortableTextComponents } from "@/lib/portable-text-components";
import type { Partner } from "@/lib/types/sanity";

interface GodmotherSectionProps {
  title?: string | null;
  partners: Partner[];
}

const DEFAULT_TITLE = "Notre association marraine";

/**
 * Section « Notre association marraine » de la page À propos.
 * Alimentée par les documents `partner` de type "marraine" (en pratique un seul).
 * Masquée si aucune marraine active.
 */
export function GodmotherSection({ title, partners }: GodmotherSectionProps) {
  const godmothers = partners.filter((p) => p.kind === "marraine");
  if (godmothers.length === 0) return null;

  return (
    <section
      aria-labelledby="godmother-title"
      className="py-14 md:py-20 bg-background"
    >
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6 text-primary" />
            </div>
            <h2
              id="godmother-title"
              className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground leading-tight"
            >
              {title?.trim() || DEFAULT_TITLE}
            </h2>
          </div>

          <div className="space-y-6">
            {godmothers.map((partner) => (
              <GodmotherCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GodmotherCard({ partner }: { partner: Partner }) {
  const featured =
    partner.featuredLink?.url && partner.featuredLink.url.trim()
      ? partner.featuredLink
      : null;

  return (
    <article className="card-base relative overflow-hidden p-5 sm:p-7 md:p-9">
      <div className="absolute top-0 left-7 right-7 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent" />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visiter le site de ${partner.name}`}
          className="group inline-flex w-fit shrink-0 items-center justify-center rounded-2xl bg-white border border-primary/12 px-5 py-4 transition-colors hover:border-primary/30"
        >
          {partner.logo?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${partner.logo.url}?w=400&fit=max&auto=format`}
              alt={partner.logo.alt ?? partner.name}
              className="h-16 w-auto max-w-[200px] object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-20"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="text-lg font-black text-primary text-center">
              {partner.name}
            </span>
          )}
        </a>

        <div className="min-w-0">
          <h3 className="text-xl sm:text-2xl font-black text-foreground leading-tight">
            {partner.name}
          </h3>
          {partner.tagline && (
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-primary">
              {partner.tagline}
            </p>
          )}
        </div>
      </div>

      {partner.description && (
        <div className="mt-6 text-base text-foreground/75 leading-relaxed">
          <PortableText
            value={partner.description}
            components={basePortableTextComponents}
          />
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild className="font-bold">
          <Link
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Découvrir {partner.name}
            <ArrowUpRight />
          </Link>
        </Button>
        {featured?.url && (
          <Button asChild variant="outline" className="font-semibold">
            <Link href={featured.url} target="_blank" rel="noopener noreferrer">
              {featured.label?.trim() || "Leur article sur FEMCOEUR"}
              <ArrowUpRight />
            </Link>
          </Button>
        )}
      </div>
    </article>
  );
}
