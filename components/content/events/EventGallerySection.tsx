"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent as ReactTouchEvent,
} from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GalleryPhoto } from "@/lib/types/sanity";

interface EventGallerySectionProps {
  photos: GalleryPhoto[];
  eventTitle: string;
}

/** Nombre de vignettes affichées
 * avant le bouton « Voir toutes les photos ». */
const PREVIEW = 8;
/** Distance minimale (px) d'un swipe pour changer de photo dans le lightbox. */
const SWIPE_THRESHOLD = 50;

/**
 * Section « Retour en images » des events passés.
 * Grille d'aperçu + lightbox plein écran accessible (construit sur Radix Dialog :
 * focus-trap, Esc, restauration du focus et scroll-lock fournis par la primitive).
 */
export function EventGallerySection({
  photos,
  eventTitle,
}: EventGallerySectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState<number | null>(null);

  const total = photos.length;
  const hasMore = total > PREVIEW;
  const visible = expanded ? photos : photos.slice(0, PREVIEW);
  const open = index !== null;
  const current = index !== null ? photos[index] : null;

  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => {
        if (i === null) return i;
        const next = i + dir;
        return next < 0 || next >= total ? i : next; // pas de boucle aux extrémités
      });
    },
    [total]
  );

  // Au dépliage : focus sur la première vignette nouvellement révélée.
  useEffect(() => {
    if (expanded) buttonsRef.current[PREVIEW]?.focus({ preventScroll: true });
  }, [expanded]);

  const altFor = (photo: GalleryPhoto, i: number) =>
    photo.alt?.trim() || `${eventTitle} — photo ${i + 1}`;

  function onTouchStart(e: ReactTouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }
  function onTouchEnd(e: ReactTouchEvent) {
    if (touchStartX.current === null) return;
    const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* En-tête de section (pattern maison : badge + titre + barre dégradée) */}
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 bg-primary/15 border border-primary/30">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                En images
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground leading-tight">
              Retour en images
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>

          {/* Grille de vignettes */}
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {visible.map((photo, i) => (
              <li key={photo._key}>
                <button
                  type="button"
                  ref={(el) => {
                    buttonsRef.current[i] = el;
                  }}
                  onClick={() => setIndex(i)}
                  aria-label={`Agrandir la photo ${i + 1} sur ${total}`}
                  className="group relative block w-full aspect-square overflow-hidden rounded-xl border border-primary/10 bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <Image
                    src={photo.url}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    placeholder={photo.lqip ? "blur" : "empty"}
                    blurDataURL={photo.lqip ?? undefined}
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Bouton « Voir toutes les photos » */}
          {hasMore && !expanded && (
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setExpanded(true)}
                className="font-bold border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
              >
                Voir toutes les photos ({total})
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <DialogPrimitive.Root
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) close();
        }}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none"
          >
            <DialogPrimitive.Title className="sr-only">
              Galerie photo — {eventTitle}
            </DialogPrimitive.Title>

            {current && (
              <div
                className="relative flex max-h-full max-w-full items-center justify-center"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <Image
                  key={current._key}
                  src={current.url}
                  alt={altFor(current, index!)}
                  width={current.width ?? 1600}
                  height={current.height ?? 1200}
                  sizes="100vw"
                  placeholder={current.lqip ? "blur" : "empty"}
                  blurDataURL={current.lqip ?? undefined}
                  className="h-auto max-h-[85vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
                />
              </div>
            )}

            {/* Fermer */}
            <DialogPrimitive.Close
              aria-label="Fermer la galerie"
              className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>

            {/* Précédent */}
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={index === 0}
              aria-label="Photo précédente"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Suivant */}
            <button
              type="button"
              onClick={() => go(1)}
              disabled={index === total - 1}
              aria-label="Photo suivante"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Compteur */}
            <div
              aria-live="polite"
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white"
            >
              Photo {(index ?? 0) + 1} sur {total}
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  );
}
