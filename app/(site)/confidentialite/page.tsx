import type { Metadata } from "next";
import Link from "next/link";

/**
 * Deux mentions légales manquent encore : la dénomination déclarée en
 * préfecture et l’adresse du siège social. Elles ne figurent dans aucun des
 * documents fournis (charte, compte rendu d’AG) — elles vivent dans les statuts
 * et le récépissé de déclaration.
 *
 * Tant que ces constantes valent null, la page affiche un bandeau d’avertissement
 * et reste en `noindex`. Les renseigner fait disparaître le bandeau et rétablit
 * l’indexation, sans aucune autre modification à faire.
 */
const DENOMINATION_LEGALE: string | null = null;
const ADRESSE_SIEGE: string | null = null;

const EMAIL_CONTACT = "contact@femcoeur.fr";
const DATE_MISE_A_JOUR = "30 août 2026";

const estIncomplete = !DENOMINATION_LEGALE || !ADRESSE_SIEGE;

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment FEMCOEUR collecte, utilise et protège vos données personnelles.",
  alternates: { canonical: "https://femcoeur.fr/confidentialite" },
  // Une politique incomplète n’a rien à faire dans les résultats de recherche.
  // L’indexation se rétablit d’elle-même une fois les mentions renseignées.
  robots: estIncomplete ? { index: false, follow: true } : undefined,
};

function ARenseigner({
  valeur,
  libelle,
}: {
  valeur: string | null;
  libelle: string;
}) {
  if (valeur) return <>{valeur}</>;

  return (
    <mark className="rounded bg-destructive/15 px-1.5 py-0.5 font-bold text-destructive">
      [À COMPLÉTER — {libelle}]
    </mark>
  );
}

function Section({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
        {titre}
      </h2>
      <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  );
}

/**
 * Page légale : pas de `PageHero`. Le hero du site porte un badge animé et deux
 * illustrations, registre inadapté ici — et il n’y a pas de hero personnalisé
 * à la place, simplement pas de hero.
 */
export default function ConfidentialitePage() {
  return (
    <div className="container py-12 md:py-16">
      <article className="mx-auto max-w-3xl">
        {estIncomplete && (
          <div
            role="alert"
            className="mb-8 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 sm:p-5"
          >
            <p className="text-sm font-bold text-destructive">
              Document en cours de relecture — ne pas publier en l’état
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Les mentions signalées en rouge ci-dessous doivent être complétées
              à partir des statuts de l’association et du récépissé de
              déclaration en préfecture. Ce bandeau disparaîtra automatiquement
              une fois ces informations renseignées.
            </p>
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground leading-tight">
          Politique de confidentialité
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Dernière mise à jour : {DATE_MISE_A_JOUR}
        </p>

        <p className="mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
          FEMCOEUR attache de l’importance à la protection de vos données
          personnelles. Cette page explique quelles données nous collectons,
          pourquoi, combien de temps nous les conservons, et quels sont vos
          droits.
        </p>

        <Section titre="Qui est responsable de vos données">
          <p>
            Le responsable du traitement est l’association{" "}
            <ARenseigner
              valeur={DENOMINATION_LEGALE}
              libelle="dénomination exacte déclarée en préfecture"
            />
            , association régie par la loi du 1<sup>er</sup> juillet 1901, dont
            le siège social est situé{" "}
            <ARenseigner
              valeur={ADRESSE_SIEGE}
              libelle="adresse complète du siège social"
            />
            , représentée par sa présidente.
          </p>
          <p>
            Pour toute question relative à vos données, vous pouvez nous écrire
            à{" "}
            <a
              href={`mailto:${EMAIL_CONTACT}`}
              className="font-medium text-primary underline underline-offset-2"
            >
              {EMAIL_CONTACT}
            </a>
            .
          </p>
        </Section>

        <Section titre="Quelles données nous collectons, et pourquoi">
          <p>
            Lorsque vous vous inscrivez à notre newsletter, nous collectons{" "}
            <strong className="font-semibold text-foreground">
              votre adresse email, et elle seule
            </strong>
            . Elle sert uniquement à vous envoyer nos actualités, nos
            publications et nos invitations aux événements de l’association.
          </p>
          <p>
            Nous ne collectons ni votre nom, ni votre spécialité, ni aucune
            autre information. Vos données ne font l’objet d’aucun profilage,
            ne sont ni vendues, ni louées, ni cédées à des tiers à des fins
            commerciales.
          </p>
          <p>
            Le site ne dépose aucun cookie de mesure d’audience ni de publicité.
          </p>
        </Section>

        <Section titre="Sur quelle base légale">
          <p>
            Le traitement repose sur{" "}
            <strong className="font-semibold text-foreground">
              votre consentement
            </strong>{" "}
            (article 6.1.a du RGPD). Ce consentement est recueilli en deux
            temps : vous saisissez votre adresse sur le site, puis vous
            confirmez votre inscription en cliquant sur le lien contenu dans
            l’email que nous vous envoyons. Tant que ce second clic n’a pas eu
            lieu, votre adresse n’est pas ajoutée à notre liste de diffusion.
          </p>
          <p>
            Vous pouvez retirer votre consentement à tout moment, sans avoir à
            vous justifier, via le lien de désinscription présent en bas de
            chacun de nos emails.
          </p>
        </Section>

        <Section titre="Qui a accès à vos données">
          <p>
            Vos données sont accessibles aux membres du bureau de l’association
            chargées de la communication.
          </p>
          <p>
            Nous faisons appel à{" "}
            <strong className="font-semibold text-foreground">Brevo</strong>{" "}
            (Sendinblue SAS), société française spécialisée dans l’envoi
            d’emails, qui agit en qualité de sous-traitant au sens du RGPD.
            Brevo ne peut utiliser vos données que pour les besoins de ce
            service, selon nos instructions, dans le cadre de l’accord de
            sous-traitance annexé à ses conditions générales.
          </p>
          <p>
            Vos données sont hébergées dans l’Union européenne : en France, en
            Belgique et en Allemagne. Certaines opérations techniques —
            maintenance, support, sécurité du réseau — peuvent toutefois donner
            lieu à un accès depuis des pays situés hors de l’Espace économique
            européen, notamment les États-Unis, le Canada et l’Inde. Ces
            transferts sont encadrés par les clauses contractuelles types de la
            Commission européenne, par le cadre de protection des données
            UE–États-Unis, ou par une décision d’adéquation selon le pays
            concerné.
          </p>
        </Section>

        <Section titre="Combien de temps nous les conservons">
          <p>
            Votre adresse est conservée jusqu’à votre désinscription. Si vous
            n’interagissez plus avec nos emails — aucune ouverture, aucun clic,
            aucune réinscription — pendant{" "}
            <strong className="font-semibold text-foreground">trois ans</strong>
            , elle est supprimée.
          </p>
          <p>
            Cette durée correspond à la référence couramment retenue en matière
            de prospection : au-delà de trois ans sans aucune interaction, nous
            considérons que l’intérêt pour nos communications n’est plus
            d’actualité. L’association procède à une revue annuelle de sa liste
            de diffusion pour appliquer cette règle.
          </p>
        </Section>

        <Section titre="Vos droits">
          <p>Vous disposez à tout moment des droits suivants :</p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>
              <strong className="font-semibold text-foreground">Accès</strong> :
              savoir si nous détenons des données vous concernant et en obtenir
              une copie.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                Rectification
              </strong>{" "}
              : faire corriger une adresse erronée.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                Effacement
              </strong>{" "}
              : demander la suppression de votre adresse.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                Opposition
              </strong>{" "}
              : refuser de recevoir nos communications.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                Portabilité
              </strong>{" "}
              : récupérer vos données dans un format lisible par machine.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                Retrait du consentement
              </strong>{" "}
              : à tout moment, sans conséquence sur la licéité des envois
              antérieurs.
            </li>
          </ul>
          <p>
            Pour exercer l’un de ces droits, écrivez-nous à{" "}
            <a
              href={`mailto:${EMAIL_CONTACT}`}
              className="font-medium text-primary underline underline-offset-2"
            >
              {EMAIL_CONTACT}
            </a>
            . Nous vous répondrons dans un délai d’un mois. Pour une simple
            désinscription, le lien en bas de nos emails est immédiat et ne
            nécessite aucune démarche.
          </p>
        </Section>

        <Section titre="Réclamation">
          <p>
            Si vous estimez, après nous avoir contactées, que vos droits ne sont
            pas respectés, vous pouvez adresser une réclamation à la Commission
            nationale de l’informatique et des libertés (CNIL),{" "}
            <a
              href="https://www.cnil.fr/fr/plaintes"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-2"
            >
              cnil.fr
            </a>
            .
          </p>
        </Section>

        <Section titre="Modification de cette politique">
          <p>
            Cette politique peut être amenée à évoluer, notamment si nous
            ajoutons de nouveaux services au site. La date de dernière mise à
            jour figure en haut de cette page.
          </p>
        </Section>

        <div className="mt-12 border-t border-primary/12 pt-6">
          <Link
            href="/"
            className="text-sm font-medium text-primary underline underline-offset-2"
          >
            Retour à l’accueil
          </Link>
        </div>
      </article>
    </div>
  );
}
