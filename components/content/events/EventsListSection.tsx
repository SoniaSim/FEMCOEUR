import { getAllEvents } from "@/lib/dato-cms/fetchers";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, ExternalLink } from "lucide-react";

export async function EventsListSection() {
  const upcomingEvents = await getAllEvents("upcoming");
  const pastEvents = await getAllEvents("past");

  return (
    <section className="py-section md:py-section-md bg-background">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="upcoming" className="text-base">
                  À venir ({upcomingEvents.length})
                </TabsTrigger>
                <TabsTrigger value="past" className="text-base">
                  Passés ({pastEvents.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upcoming" className="mt-0">
              {upcomingEvents.length === 0 ? (
                <Card className="p-12 text-center border-2 border-dashed">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">
                    Aucun événement à venir pour le moment.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Revenez bientôt pour découvrir nos prochaines rencontres !
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col"
                    >
                      {event.image && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={event.image.url}
                            alt={event.image.alt || event.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col grow">
                        <div className="flex items-center justify-between mb-3">
                          <Badge className="bg-primary text-primary-foreground">
                            À venir
                          </Badge>
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 line-clamp-2">
                          {event.title}
                        </h3>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 shrink-0" />
                            <span>
                              {format(new Date(event.date), "d MMMM yyyy", {
                                locale: fr,
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span className="line-clamp-1">
                              {event.location}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 grow">
                          {event.description}
                        </p>

                        {event.registrationLink && (
                          <Button
                            asChild
                            size="sm"
                            className="w-full gap-2 mt-auto"
                          >
                            <Link
                              href={event.registrationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              S&apos;inscrire
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-0">
              {pastEvents.length === 0 ? (
                <Card className="p-12 text-center border-2 border-dashed">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">
                    Aucun événement passé pour le moment.
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="overflow-hidden border-2 hover:border-secondary/50 transition-all duration-300 flex flex-col opacity-90"
                    >
                      {event.image && (
                        <div className="relative h-48 w-full overflow-hidden grayscale">
                          <Image
                            src={event.image.url}
                            alt={event.image.alt || event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="secondary">Passé</Badge>
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 line-clamp-2">
                          {event.title}
                        </h3>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 shrink-0" />
                            <span>
                              {format(new Date(event.date), "d MMMM yyyy", {
                                locale: fr,
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span className="line-clamp-1">
                              {event.location}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {event.description}
                        </p>
                      </div>
                    </Card>
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
