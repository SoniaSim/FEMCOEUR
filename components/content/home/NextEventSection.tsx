import Link from "next/link";
import { ArrowRight, Clock, ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SanityImage } from "@/components/ui/SanityImage";
import { formatEventPeriod } from "@/lib/events/format";
import { toPlainText } from "@/lib/sanity/portable-text";
import type { Event } from "@/lib/types/sanity";

/**
 * Événement mis en avant, juste sous le hero de la page d'accueil.
 *
 * Ce bloc a remplacé un dispositif en deux morceaux — une bande d'annonce d'une
 * ligne en haut, un bandeau détaillé en bas de page. L'intention était de ne pas
 * interrompre le récit ; en usage, la bande passait inaperçue et le bandeau
 * arrivait à 4000 px du haut. Un seul bloc, visible, remplit mieux les deux
 * rôles, et il n'y a plus qu'une chose à maintenir.
 *
 * L'affiche, si l'événement en a une, sert de point d'accroche visuel — jamais
 * de support d'information : elle est dense, et son QR code est inutile sur un
 * écran d'ordinateur. Le texte à côté porte donc ce qui compte, et le bouton
 * porte l'action.
 */
export function NextEventSection({ event }: { event: Event }) {
  const detailHref = event.slug ? `/events/${event.slug}` : null;
  const description = toPlainText(event.description);
  const periode = formatEventPeriod(event);

  // Une affiche se montre entière ; une photo se recadre sans dommage.
  const visuel = event.poster?.url ? event.poster : event.image;
  const estAffiche = Boolean(event.poster?.url);
  const aVisuel = Boolean(visuel?.url);

  // Un événement déjà commencé n'est pas un « prochain rendez-vous ».
  const commence = event.date ? new Date(event.date) <= new Date() : false;
  const libelle = commence ? "En cours" : "Prochain rendez-vous";

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container">
        <article
          className={`relative max-w-5xl mx-auto overflow-hidden rounded-2xl bg-card border border-primary/25 shadow-md ${
            aVisuel ? "grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]" : ""
          }`}
        >
          {/* Filet d'accent permanent, et non au survol : ce bloc est le point
              d'entrée principal de la page, il doit se signaler au repos. */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-accent z-10" />

          {aVisuel && (
            <div
              className={`relative flex items-center justify-center ${
                estAffiche ? "bg-muted p-5 md:p-6" : ""
              }`}
            >
              {estAffiche ? (
                <SanityImage
                  image={visuel}
                  fallbackAlt={`Affiche : ${event.title ?? ""}`}
                  width={event.poster?.width ?? 1000}
                  height={event.poster?.height ?? 1000}
                  sizes="(max-width: 768px) 90vw, 420px"
                  className="w-full h-auto max-h-[360px] object-contain rounded-lg"
                />
              ) : (
                <div className="relative w-full h-56 md:h-full md:min-h-[300px]">
                  <SanityImage
                    image={visuel}
                    fallbackAlt={event.title ?? ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          )}

          <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
            <p className="flex items-center gap-2.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                {libelle}
              </span>
            </p>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground leading-tight mb-5">
              {detailHref ? (
                <Link
                  href={detailHref}
                  className="transition-colors hover:text-primary after:content-[''] after:absolute after:inset-0 after:z-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                >
                  {event.title}
                </Link>
              ) : (
                event.title
              )}
            </h2>

            <div className="space-y-2.5 mb-5">
              <div className="flex items-center gap-3 text-sm md:text-base text-foreground/80">
                <span className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary" />
                </span>
                <span className="font-semibold">{periode}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-3 text-sm md:text-base text-foreground/75">
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </span>
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              )}
            </div>

            {description && (
              <p className="text-sm md:text-base text-foreground/65 leading-relaxed line-clamp-3 mb-6">
                {description}
              </p>
            )}

            {/* `relative z-10` : les boutons passent au-dessus du `::after` du titre. */}
            <div className="relative z-10 flex flex-wrap items-center gap-3">
              {event.registrationLink ? (
                <>
                  <Button asChild size="lg" className="gap-2 font-bold">
                    <Link
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Participer
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </Button>
                  {detailHref && (
                    <Link
                      href={detailHref}
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3"
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </>
              ) : (
                detailHref && (
                  <Button asChild size="lg" className="gap-2 font-bold">
                    <Link href={detailHref}>
                      Découvrir l&apos;événement
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                )
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
