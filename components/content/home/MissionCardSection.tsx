import { PortableText } from "@portabletext/react";
import type { BlockContent } from "@/sanity.types";
import { basePortableTextComponents } from "@/lib/portable-text-components";
import { EditorialCard } from "@/components/content/shared/EditorialCard";

/**
 * Carte « qui nous sommes », sous le hero de la page d'accueil.
 *
 * Extraite de `WelcomeSection`, qui rendait deux `<section>` indépendantes dans
 * un même fragment. Les séparer permet d'intercaler l'annonce d'événement entre
 * le hero et cette carte, et rend l'ordre réel des blocs lisible directement
 * dans `app/(site)/page.tsx` — ce qu'un composant à deux étages masquait.
 *
 * L'ancre `id="mission"` est conservée : rien ne la cible aujourd'hui, mais elle
 * peut avoir été partagée.
 */
export function MissionCardSection({
  subtitle,
}: {
  subtitle?: BlockContent | null;
}) {
  if (!subtitle || subtitle.length === 0) return null;

  return (
    <section id="mission" className="py-4 md:py-6 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <EditorialCard
            cta={{ label: "Rejoindre le mouvement", href: "/join" }}
          >
            <PortableText
              value={subtitle}
              components={basePortableTextComponents}
            />
          </EditorialCard>
        </div>
      </div>
    </section>
  );
}
