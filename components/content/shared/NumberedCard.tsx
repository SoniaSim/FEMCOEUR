import type { LucideIcon } from "lucide-react";

interface NumberedCardProps {
  icon: LucideIcon | null;
  title: string;
  description?: string | null;
  /** Index 1-based ; affiché en filigrane "01", "02"... */
  number: number;
  /**
   * - "dark" : fond white/5 sur section navy.
   *   Utilisé par WhatWeDo (home), KeyActions (about), MembershipModalities (join).
   * - "light" : fond card sur section claire, accent bar gauche au hover.
   *   Utilisé par Values (about).
   */
  variant?: "dark" | "light";
  /**
   * Layout interne sur desktop :
   * - "row" : icône à gauche / titre à droite (idéal quand la carte occupe toute la largeur, en liste verticale)
   * - "column" : icône au-dessus / titre en dessous (idéal quand la carte est dans une grille à plusieurs colonnes)
   *
   * Sur mobile, le layout est toujours side-by-side (icône+titre en row, description en dessous).
   */
  layout?: "row" | "column";
}

export function NumberedCard({
  icon: Icon,
  title,
  description,
  number,
  variant = "dark",
  layout = "column",
}: NumberedCardProps) {
  const num = String(number).padStart(2, "0");
  const isDark = variant === "dark";
  const isRowLayout = layout === "row";

  return (
    <div
      className={`group relative overflow-hidden h-full ${
        isDark
          ? "rounded-2xl p-4 sm:p-7 bg-white/5 border border-white/[0.08] transition-all duration-300 hover:bg-white/[0.09] hover:border-primary/40 hover:-translate-y-1"
          : "card-base card-interactive-subtle p-4 sm:p-6 md:p-8"
      }`}
    >
      {/* Accent gauche au hover — light variant uniquement */}
      {!isDark && (
        <div className="absolute top-6 bottom-6 left-0 w-1 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-primary to-accent" />
      )}

      {/* Numéro filigrane */}
      <span
        className={`absolute select-none pointer-events-none font-black leading-none ${
          isDark
            ? "right-5 top-3 text-5xl text-white/[0.05]"
            : "right-5 top-2 text-7xl md:text-8xl text-primary/[0.06]"
        }`}
        aria-hidden
      >
        {num}
      </span>

      <div
        className={`relative grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 ${
          isRowLayout
            ? "sm:gap-x-6 sm:gap-y-2"
            : "sm:grid-cols-1 sm:gap-y-0"
        }`}
      >
        {/* Icône (col 1, row 1) */}
        <div
          className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ${
            isDark
              ? "bg-primary/20 border border-primary/30"
              : "bg-primary/10"
          } ${isRowLayout ? "" : "sm:mb-5"}`}
        >
          {Icon && <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />}
        </div>

        {/* Titre */}
        <h3
          className={`self-center font-bold leading-snug min-w-0 ${
            isDark
              ? "text-lg text-secondary-foreground"
              : "text-lg md:text-xl text-primary"
          } ${isRowLayout ? "" : "sm:self-auto sm:mb-2"}`}
        >
          {title}
        </h3>

        {/* Description : sous le titre (col 2) sur row layout, sous le bloc complet (col-span) sur column layout */}
        {description && (
          <p
            className={`col-span-2 leading-relaxed ${
              isDark
                ? "text-sm md:text-base text-secondary-foreground/65"
                : "text-base text-foreground/70"
            } ${
              isRowLayout
                ? "sm:col-start-2 sm:col-span-1"
                : "sm:col-span-1"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
