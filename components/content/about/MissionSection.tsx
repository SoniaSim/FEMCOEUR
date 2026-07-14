import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { BlockContent } from "@/sanity.types";
import type { AboutMissionImage } from "@/lib/types/sanity";

interface MissionSectionProps {
  title: string | null;
  body?: BlockContent | null;
  images?: AboutMissionImage[] | null;
}

// Inclinaisons alternées façon photos épinglées.
const MISSION_TILTS = ["-rotate-6", "rotate-3", "-rotate-3"];

const manifestoComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-xl sm:text-2xl md:text-[1.7rem] font-bold text-foreground leading-snug tracking-tight text-balance">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-primary box-decoration-clone rounded-md bg-primary/[0.08] px-1.5">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-primary/90">{children}</em>
    ),
  },
};

export function MissionSection({ title, body, images }: MissionSectionProps) {
  const photos = (images ?? []).filter((photo) => photo.url);
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden">
      {/* Blob décoratif */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.06] blur-3xl pointer-events-none" />

      <div className="container relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 bg-primary/15 border border-primary/30">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {title ?? "Notre mission"}
            </span>
          </div>

          {body && (
            <div className="relative">
              {/* Battement de cœur — clin d'œil cardio, dans le dégradé maison */}
              <svg
                className="mx-auto mb-7 h-5 w-28 md:h-6 md:w-32"
                viewBox="0 0 128 24"
                fill="none"
                aria-hidden
              >
                <defs>
                  <linearGradient
                    id="mission-pulse"
                    x1="0"
                    y1="0"
                    x2="128"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="var(--primary)" />
                    <stop offset="1" stopColor="var(--accent)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 12 H50 l3 -7 4 15 4 -22 3 14 4 0 H128"
                  stroke="url(#mission-pulse)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <PortableText value={body} components={manifestoComponents} />
            </div>
          )}

          {/* Cluster de photos inclinées façon polaroïd */}
          {photos.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-0">
              {photos.map((photo, i) => {
                const posX = (photo.hotspot?.x ?? 0.5) * 100;
                const posY = (photo.hotspot?.y ?? 0.5) * 100;
                return (
                  <div
                    key={photo._key}
                    className={`relative rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5 ${MISSION_TILTS[i % MISSION_TILTS.length]} ${i > 0 ? "-ml-4 sm:-ml-6" : ""}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${photo.url}?w=480&h=360&fit=crop&auto=format`}
                      alt={photo.alt ?? ""}
                      className="h-24 w-32 rounded-xl object-cover sm:h-40 sm:w-52"
                      style={{ objectPosition: `${posX}% ${posY}%` }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div className="mx-auto mt-12 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>
      </div>
    </section>
  );
}
