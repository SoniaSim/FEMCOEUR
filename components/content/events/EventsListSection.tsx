import { getEvents } from "@/lib/sanity/fetch";
import { toPlainText } from "@/lib/sanity/portable-text";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatSanityDateFr } from "@/lib/sanity/formatSanityDate";
import { SanityImage } from "@/components/ui/SanityImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, ExternalLink, BookOpen } from "lucide-react";
import { getRecapLink } from "@/lib/events/recap";
import { EmptyState } from "@/components/content/shared/EmptyState";
import type { Event } from "@/lib/types/sanity";

function EventCard({ event, variant }: { event: Event; variant: "upcoming" | "past" }) {
  const isPast = variant === "past";
  const description = toPlainText(event.description);
  const detailHref = event.slug ? `/events/${event.slug}` : null;
  const recap = isPast ? getRecapLink(event) : null;

  return (
    <article
      className={`card-base card-interactive group relative overflow-hidden flex flex-col h-full ${
        isPast ? "opacity-90 hover:opacity-100" : ""
      }`}
    >
      {/* Accent top au hover (upcoming only) */}
      {!isPast && (
        <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary to-accent z-10" />
      )}

      {event.image?.url && (
        <div className={`relative h-48 w-full overflow-hidden ${isPast ? "grayscale" : ""}`}>
          <SanityImage
            image={event.image}
            fallbackAlt={event.title ?? ""}
            fill
            className={`object-cover transition-transform duration-500 ${
              !isPast ? "group-hover:scale-105" : ""
            }`}
          />
        </div>
      )}

      <div className="p-6 flex flex-col grow">
        <div className="mb-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              isPast
                ? "bg-foreground/10 text-foreground/60"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {isPast ? "Passé" : "À venir"}
          </span>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 leading-snug line-clamp-2">
          {detailHref ? (
            <Link
              href={detailHref}
              className="transition-colors group-hover:text-primary after:content-[''] after:absolute after:inset-0 after:z-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
            >
              {event.title}
            </Link>
          ) : (
            event.title
          )}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2.5 text-sm text-foreground/70">
            <span className="shrink-0 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5 text-primary" />
            </span>
            <span>{formatSanityDateFr(event.date)}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-foreground/70">
            <span className="shrink-0 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-3.5 h-3.5 text-primary" />
            </span>
            <span className="line-clamp-1">{event.location ?? "—"}</span>
          </div>
        </div>

        {description && (
          <p className="text-sm text-foreground/65 leading-relaxed line-clamp-3 mb-5">
            {description}
          </p>
        )}

        {!isPast && event.registrationLink && (
          <div className="relative z-10 mt-auto pt-2">
            <Button asChild size="sm" className="w-full gap-2 font-bold">
              <Link
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                S&apos;inscrire
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        )}

        {isPast && recap && (
          <div className="relative z-10 mt-auto pt-2">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="w-full gap-2 font-bold border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
            >
              <Link
                href={recap.href}
                target={recap.isExternal ? "_blank" : undefined}
                rel={recap.isExternal ? "noopener noreferrer" : undefined}
              >
                <BookOpen className="w-4 h-4" />
                En savoir plus
                {recap.isExternal && <ExternalLink className="w-4 h-4" />}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

export async function EventsListSection() {
  const allEvents = await getEvents();
  const upcomingEvents = allEvents.filter((e) => e.status === "upcoming");
  const pastEvents = allEvents.filter((e) => e.status === "past");

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="grid w-full max-w-md grid-cols-2 bg-card border border-primary/15 p-1.5 rounded-full h-auto shadow-sm">
                <TabsTrigger
                  value="upcoming"
                  className="rounded-full text-sm md:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all py-2"
                >
                  À venir ({upcomingEvents.length})
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="rounded-full text-sm md:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all py-2"
                >
                  Passés ({pastEvents.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upcoming" className="mt-0">
              {upcomingEvents.length === 0 ? (
                <EmptyState
                  icon={Calendar}
                  message="Aucun événement à venir pour le moment."
                  hint="Revenez bientôt pour découvrir nos prochaines rencontres !"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} variant="upcoming" />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-0">
              {pastEvents.length === 0 ? (
                <EmptyState
                  icon={Calendar}
                  message="Aucun événement passé pour le moment."
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                  {pastEvents.map((event) => (
                    <EventCard key={event.id} event={event} variant="past" />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
