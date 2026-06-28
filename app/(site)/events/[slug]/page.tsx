import { getEventBySlug, getEvents } from "@/lib/sanity/fetch";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  ArrowLeft,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import type { Metadata } from "next";
import { formatSanityDateFr } from "@/lib/sanity/formatSanityDate";
import { SanityImage } from "@/components/ui/SanityImage";
import { basePortableTextComponents } from "@/lib/portable-text-components";
import { getRecapLink } from "@/lib/events/recap";
import { EventGallerySection } from "@/components/content/events/EventGallerySection";

export async function generateStaticParams() {
  const events = await getEvents();
  return events
    .filter(
      (event): event is typeof event & { slug: string } =>
        typeof event.slug === "string" && event.slug.trim() !== ""
    )
    .map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return { title: "Événement non trouvé" };
  }

  const title = event.title ?? "";
  const ogImageUrl = event.seo?.image?.url ?? event.image?.url ?? null;
  const ogImageAlt = event.seo?.image?.alt ?? event.image?.alt ?? title;

  return {
    title: event.seo?.title ?? title,
    description: event.seo?.description ?? "",
    alternates: { canonical: `https://femcoeur.fr/events/${slug}` },
    openGraph: {
      title: (event.seo?.title ?? title) || undefined,
      description: event.seo?.description ?? undefined,
      url: `https://femcoeur.fr/events/${slug}`,
      type: "article",
      images: ogImageUrl ? [{ url: ogImageUrl, alt: ogImageAlt }] : [],
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const isPast = event.status === "past";
  const isCancelled = event.status === "cancelled";
  const recap = isPast ? getRecapLink(event) : null;

  return (
    <>
      {/* ===== HEADER ÉVÉNEMENT ===== */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/10 via-primary/5 to-background">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-accent/15 blur-2xl pointer-events-none" />

        <div
          className={`container relative z-10 pt-10 md:pt-14 ${
            event.image?.url ? "pb-32 md:pb-44" : "pb-10 md:pb-14"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/65 hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux événements
            </Link>

            <div className="mb-5">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  isCancelled
                    ? "bg-destructive/10 text-destructive border border-destructive/20"
                    : isPast
                      ? "bg-foreground/10 text-foreground/60"
                      : "bg-primary text-primary-foreground"
                }`}
              >
                {isCancelled ? "Annulé" : isPast ? "Passé" : "À venir"}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight mb-6">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-4 border-t border-primary/15">
              <div className="flex items-center gap-2.5 text-sm text-foreground/70">
                <span className="shrink-0 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                </span>
                <span>{formatSanityDateFr(event.date)}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2.5 text-sm text-foreground/70">
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                  </span>
                  <span className="font-semibold">{event.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMAGE (chevauche proprement le bas du header) ===== */}
      {event.image?.url && (
        <section className="bg-background">
          <div className="container">
            <div className="relative z-10 max-w-4xl mx-auto -mt-24 md:-mt-32">
              <div className="relative h-64 md:h-96 lg:h-[460px] w-full rounded-3xl overflow-hidden border border-primary/15 shadow-xl">
                <SanityImage
                  image={event.image}
                  fallbackAlt={event.title ?? ""}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover"
                  preload
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== DESCRIPTION ===== */}
      <section
        className={`bg-background ${event.image?.url ? "pt-10 md:pt-14 pb-10 md:pb-14" : "pt-4 pb-10 md:pb-14"}`}
      >
        <div className="container">
          <article className="max-w-3xl mx-auto">
            {event.description && (
              <div
                className="
                  [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-black [&_h2]:text-foreground
                  [&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:leading-tight [&_h2]:tracking-tight
                  [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-bold [&_h3]:text-foreground
                  [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:leading-snug
                  [&_p]:text-base [&_p]:md:text-lg [&_p]:text-foreground/75 [&_p]:leading-relaxed [&_p]:mb-5
                  [&_strong]:text-primary [&_strong]:font-bold
                  [&_em]:italic
                  [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/30 [&_a]:underline-offset-4 [&_a:hover]:decoration-primary
                  [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-foreground/80 [&_blockquote]:my-8
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-5 [&_ul]:text-foreground/75
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-5 [&_ol]:text-foreground/75
                "
              >
                <PortableText
                  value={event.description}
                  components={basePortableTextComponents}
                />
              </div>
            )}
          </article>
        </div>
      </section>

      {/* ===== GALERIE (events passés uniquement) ===== */}
      {isPast && event.gallery && event.gallery.length > 0 && (
        <EventGallerySection
          photos={event.gallery}
          eventTitle={event.title ?? ""}
        />
      )}

      {/* ===== CTA ===== */}
      {!isCancelled &&
        ((!isPast && event.registrationLink) || (isPast && recap)) && (
          <section className="pb-12 md:pb-16 bg-background">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <div className="relative rounded-3xl p-8 md:p-10 overflow-hidden bg-linear-to-br from-primary/10 via-accent/[0.04] to-transparent border border-primary/20 text-center">
                  <div className="absolute top-0 left-12 right-12 h-1 rounded-full bg-linear-to-r from-primary to-accent" />

                  {!isPast && event.registrationLink && (
                    <>
                      <h2 className="text-2xl md:text-3xl font-black text-foreground mb-3 leading-tight">
                        Inscrivez-vous à cet événement
                      </h2>
                      <p className="text-base text-foreground/65 mb-6">
                        Les places sont limitées — réservez la vôtre dès
                        maintenant.
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="gap-2 font-bold px-7 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
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
                    </>
                  )}

                  {isPast && recap && (
                    <>
                      <h2 className="text-2xl md:text-3xl font-black text-foreground mb-3 leading-tight">
                        Revivez cet événement
                      </h2>
                      <p className="text-base text-foreground/65 mb-6">
                        Découvrez ce qui s&apos;est passé et les retombées de
                        cette rencontre.
                      </p>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="gap-2 font-bold px-7 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
                      >
                        <Link
                          href={recap.href}
                          target={recap.isExternal ? "_blank" : undefined}
                          rel={
                            recap.isExternal ? "noopener noreferrer" : undefined
                          }
                        >
                          <BookOpen className="w-4 h-4" />
                          En savoir plus
                          {recap.isExternal && (
                            <ExternalLink className="w-4 h-4" />
                          )}
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

      {/* ===== RETOUR ===== */}
      <section className="pb-16 md:pb-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto pt-8 border-t border-primary/10 text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 font-bold border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
            >
              <Link href="/events">
                <ArrowLeft className="w-4 h-4" />
                Retour aux événements
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
