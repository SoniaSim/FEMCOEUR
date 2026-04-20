import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatSanityDateFr } from "@/lib/sanity/formatSanityDate";
import { SanityImage } from "@/components/ui/SanityImage";
import type { Event } from "@/lib/types/sanity";
import { toPlainText } from "@/lib/sanity/portable-text";

interface EventsSectionProps {
  events: Event[];
}

export function EventsSection({ events }: EventsSectionProps) {
  if (events.length === 0) {
    return null;
  }

  return (
    <section className="py-section md:py-section-md">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Événements à venir</h2>
          <Button asChild variant="outline">
            <Link href="/events">Voir tout</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event) => (
            <Card key={event.id} className="overflow-hidden">
              {event.image?.url && (
                <div className="relative h-48 w-full">
                  <SanityImage
                    image={event.image}
                    fallbackAlt={event.title ?? ""}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="default">À venir</Badge>
                </div>
                <CardDescription>
                  {formatSanityDateFr(event.date)}
                </CardDescription>
                <CardTitle className="line-clamp-2">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {event.location ?? "—"}
                </p>
                <p className="text-sm mb-4 line-clamp-3">{toPlainText(event.description)}</p>
                {event.registrationLink && (
                  <Button asChild size="sm" className="w-full">
                    <Link
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      S&apos;inscrire
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
