import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/content/shared/PageHero";
import { SquiggleUnderline } from "@/components/ui/squiggle-underline";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Inscription confirmée",
  description: "Votre inscription à la newsletter FEMCOEUR est confirmée.",
  // Page d'atterrissage technique, atteinte uniquement depuis le lien de
  // confirmation reçu par email
  robots: { index: false, follow: true },
};

/**
 * Cible du `redirectionUrl` transmis à Brevo lors de l'inscription en double
 * opt-in. C'est la page qui s'affiche après le clic sur le lien de confirmation.
 *
 * Le hero est composé ici plutôt que dans un composant de section : il n'est ni
 * réutilisé ni alimenté par Sanity.
 */
export default function NewsletterConfirmedPage() {
  return (
    <>
      <PageHero
        badge="Inscription confirmée"
        leftImage="/illustrations/welcome-rafiki.svg"
        rightImage="/illustrations/powerful-pana.svg"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight mb-6">
          Vous êtes des{" "}
          <span className="relative inline-block text-primary">
            nôtres
            <SquiggleUnderline />
          </span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Votre inscription à la newsletter FEMCOEUR est enregistrée. Vous
          recevrez nos actualités, nos publications et nos invitations
          directement dans votre boîte mail.
        </p>
      </PageHero>

      <section className="py-14 md:py-20">
        <div className="container">
          <div className="card-base mx-auto max-w-2xl p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
              En attendant le prochain numéro
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Découvrez nos articles et nos prochains événements. Vous pourrez
              vous désinscrire à tout moment, en un clic, depuis le bas de
              n&apos;importe lequel de nos emails.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/blog">Lire nos articles</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/events">Voir les événements</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
