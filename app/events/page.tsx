import { getAllEvents } from '@/lib/dato-cms/fetchers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function EventsPage() {
  const upcomingEvents = await getAllEvents('upcoming');
  const pastEvents = await getAllEvents('past');

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8">Événements</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Découvrez nos événements à venir et consultez les archives.
      </p>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">À venir</TabsTrigger>
          <TabsTrigger value="past">Passés</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                {event.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={event.image.url}
                      alt={event.image.alt || event.title}
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
                    {format(new Date(event.date), 'd MMMM yyyy', { locale: fr })}
                  </CardDescription>
                  <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{event.location}</p>
                  <p className="text-sm mb-4 line-clamp-3">{event.description}</p>
                  {event.registrationLink && (
                    <Button asChild size="sm" className="w-full">
                      <Link href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                        S&apos;inscrire
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          {upcomingEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun événement à venir pour le moment.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                {event.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={event.image.url}
                      alt={event.image.alt || event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">Passé</Badge>
                  </div>
                  <CardDescription>
                    {format(new Date(event.date), 'd MMMM yyyy', { locale: fr })}
                  </CardDescription>
                  <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{event.location}</p>
                  <p className="text-sm line-clamp-3">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {pastEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun événement passé pour le moment.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

