import type { ReactNode } from "react";

interface PageHeroProps {
  /** Texte affiché dans la pastille "badge" au-dessus du titre */
  badge: string;
  /** Chemin de l'illustration affichée à gauche du titre (cachée < md) */
  leftImage: string;
  /** Chemin de l'illustration affichée à droite du titre (cachée < md) */
  rightImage: string;
  /** Contenu central : titre h1 + sous-titre / CTA éventuel */
  children: ReactNode;
}

/**
 * Header partagé entre toutes les pages du site.
 * Fond gradient + blobs flous + grille 3 col avec illustrations
 * rotées qui se redressent au hover (CSS only).
 */
export function PageHero({ badge, leftImage, rightImage, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-accent/15 blur-2xl pointer-events-none" />

      <div className="container relative z-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-4">
          {/* Illustration gauche */}
          <div className="hidden md:flex justify-end pr-6 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={leftImage}
              alt=""
              width={300}
              height={300}
              className="w-full max-w-[240px] lg:max-w-[280px] h-auto object-contain drop-shadow-xl rotate-[-6deg] transition-transform duration-700 ease-out group-hover:rotate-0 group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Centre : badge + contenu */}
          <div className="text-center max-w-xl mx-auto px-2">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                {badge}
              </span>
            </div>
            {children}
          </div>

          {/* Illustration droite */}
          <div className="hidden md:flex justify-start pl-6 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={rightImage}
              alt=""
              width={300}
              height={300}
              className="w-full max-w-[240px] lg:max-w-[280px] h-auto object-contain drop-shadow-xl rotate-[6deg] transition-transform duration-700 ease-out group-hover:rotate-0 group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
