import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface EditorialCardProps {
  /** Contenu principal de la carte (texte, PortableText, etc.) */
  children: ReactNode;
  /** Bouton d'appel à l'action affiché en bas de la carte */
  cta: {
    label: string;
    href: string;
  };
}

/**
 * Carte éditoriale partagée par Home et Join :
 * - Fond gradient léger + bordure primary
 * - Barre d'accent verticale à gauche (gradient primary→accent)
 * - Contenu central + séparateur + bouton CTA centré
 * - Détection automatique des liens externes pour le `target="_blank"`
 */
export function EditorialCard({ children, cta }: EditorialCardProps) {
  const isExternal = cta.href.startsWith("http");

  return (
    <div className="rounded-3xl p-5 sm:p-8 md:p-12 relative overflow-hidden bg-linear-to-br from-primary/5 via-accent/[0.03] to-transparent border border-primary/15">
      {/* Barre d'accent verticale gauche */}
      <div className="absolute top-0 left-0 w-1 h-full rounded-l-3xl bg-linear-to-b from-primary to-accent" />

      <div className="pl-1 sm:pl-2">
        {children}

        <div className="mt-8 pt-6 flex justify-center border-t border-primary/15">
          <Button
            asChild
            size="lg"
            className="shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 font-bold px-8"
          >
            <Link
              href={cta.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              {cta.label}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
