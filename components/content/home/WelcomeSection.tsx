import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { BlockContent } from "@/sanity.types";
import { basePortableTextComponents } from "@/lib/portable-text-components";
import { SquiggleUnderline } from "@/components/ui/squiggle-underline";
import { EditorialCard } from "@/components/content/shared/EditorialCard";
import { Button } from "@/components/ui/button";

interface WelcomeSectionProps {
  titlePrefix: string;
  titleHighlight: string;
  tagline?: string | null;
  heroImage?: { url: string | null; alt: string | null } | null;
  subtitle?: BlockContent | null;
}

// Accroche par défaut si le champ Sanity est vide (voix engagée).
const DEFAULT_TAGLINE =
  "Faire entendre la voix des femmes en cardiologie, pour une médecine plus juste, inclusive et représentative.";

// Photo de secours si aucune image n'est définie dans Sanity.
const FALLBACK_PHOTO =
  "https://cdn.sanity.io/images/1tnur7yz/production/d8e01495e0c19feaa10f1da8265d723af1bd2e13-2560x1920.jpg";

export function WelcomeSection({
  titlePrefix,
  titleHighlight,
  tagline,
  heroImage,
  subtitle,
}: WelcomeSectionProps) {
  const taglineText = tagline?.trim() || DEFAULT_TAGLINE;
  const photoUrl = heroImage?.url ?? FALLBACK_PHOTO;
  const photoAlt =
    heroImage?.alt?.trim() ||
    "Membres de FEMCOEUR réunies lors d'une journée du réseau";
  return (
    <>
      {/* Hero « split éditorial » : texte engagé à gauche, photo de la communauté à droite */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-accent/15 blur-2xl pointer-events-none" />

        <div className="container relative z-10 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
            {/* Texte */}
            <div className="order-2 md:order-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-1.5 mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  Association de cardiologues femmes
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight">
                {titlePrefix}
                <span className="relative inline-block text-primary">
                  {titleHighlight}
                  <SquiggleUnderline />
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-foreground/70 leading-relaxed max-w-md mx-auto md:mx-0">
                {taglineText}
              </p>

              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="font-bold px-8 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Link href="/join">Rejoindre le mouvement</Link>
                </Button>
              </div>
            </div>

            {/* Photo */}
            <div className="order-1 md:order-2">
              <div className="relative mx-auto w-full max-w-md md:max-w-none">
                {/* Halo organique contre-incliné : intègre la photo au langage « blobs » du site */}
                <div
                  aria-hidden
                  className="absolute -inset-3 -rotate-[5deg] rounded-[2.75rem] bg-gradient-to-br from-primary/25 via-accent/15 to-transparent"
                />
                {/* Photo légèrement inclinée, ombre douce teintée, liseré clair */}
                <div className="relative aspect-[4/3] rotate-[2deg] overflow-hidden rounded-[2.5rem] ring-1 ring-white/60 shadow-2xl shadow-primary/15">
                  <Image
                    src={photoUrl}
                    alt={photoAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    preload
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {subtitle && subtitle.length > 0 && (
        <section id="mission" className="py-4 md:py-6 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <EditorialCard cta={{ label: "Rejoindre le mouvement", href: "/join" }}>
                <PortableText value={subtitle} components={basePortableTextComponents} />
              </EditorialCard>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
