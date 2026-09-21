import type { Metadata } from "next";
import Link from "next/link";
import { resolveContactEmail } from "@/lib/sanity/contact-email";
import { getSiteSettings } from "@/lib/sanity/fetch";

const DENOMINATION_LEGALE = "FEMCOEUR";
const ADRESSE_SIEGE = "38 impasse Croix de Regnier, 13004 Marseille";
const DIRECTRICE_PUBLICATION = "Thiziri Si Moussi";
const NUMERO_RNA = "W133040952";
const NUMERO_SIREN = "988853776";

const DATE_MISE_A_JOUR = "21 septembre 2026";

export const metadata: Metadata = {
  title: "Mentions légales et confidentialité",
  description:
    "Qui édite ce site, et comment FEMCOEUR collecte, utilise et protège vos données personnelles.",
  alternates: { canonical: "/confidentialite" },
};

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

function SousSection({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 first:mt-0">
      <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
        {titre}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Terme({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>;
}

function LienExterne({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary underline underline-offset-2"
    >
      {children}
    </a>
  );
}

function LienEmail({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="font-medium text-primary underline underline-offset-2"
    >
      {email}
    </a>
  );
}

/**
 * Page légale : pas de `PageHero`. Le hero du site porte un badge animé et deux
 * illustrations, registre inadapté ici — et il n’y a pas de hero personnalisé
 * à la place, simplement pas de hero.
 */
export default async function ConfidentialitePage() {
  // Adresse tirée des Réglages du site : c'est celle qu'on publie pour exercer
  // ses droits RGPD, et celle à laquelle la route `/api/contact` expédie les
  // messages du formulaire. Une seule source, pas de divergence possible.
  const emailContact = resolveContactEmail(await getSiteSettings());

  return (
    <div className="container py-12 md:py-16">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground leading-tight">
          Mentions légales et politique de confidentialité
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Dernière mise à jour : {DATE_MISE_A_JOUR}
        </p>

        <p className="mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
          Cette page réunit deux choses distinctes : les mentions légales, qui
          disent qui édite ce site, et la politique de confidentialité, qui
          explique quelles données nous collectons, pourquoi, combien de temps
          nous les conservons et quels sont vos droits.
        </p>

        <Section titre="Mentions légales">
          <p>
            <Terme>Éditeur du site</Terme> : l’association {DENOMINATION_LEGALE}
            , association régie par la loi du 1<sup>er</sup> juillet 1901, dont
            le siège social est situé {ADRESSE_SIEGE}.
          </p>
          <p>
            <Terme>Identifiants</Terme> : RNA {NUMERO_RNA} — SIREN{" "}
            {NUMERO_SIREN}.
          </p>
          <p>
            <Terme>Directrice de la publication</Terme> :{" "}
            {DIRECTRICE_PUBLICATION}, présidente de l’association.
          </p>
          <p>
            <Terme>Contact</Terme> : <LienEmail email={emailContact} />
          </p>
          <p>
            <Terme>Hébergeur</Terme> : Vercel Inc., 440 N Barranca Avenue #4133,
            Covina, CA 91723, États-Unis —{" "}
            <LienExterne href="https://vercel.com">vercel.com</LienExterne>. Les
            serveurs qui exécutent le site sont situés à Paris.
          </p>
          <p>
            Les textes, illustrations et photographies présents sur ce site sont
            la propriété de l’association ou de leurs auteurs respectifs. Toute
            reproduction sans autorisation préalable est interdite.
          </p>
        </Section>

        <Section titre="Qui est responsable de vos données">
          <p>
            Le responsable du traitement est l’association identifiée ci-dessus,
            représentée par sa présidente. Pour toute question relative à vos
            données, vous pouvez nous écrire à{" "}
            <LienEmail email={emailContact} />.
          </p>
          <p>
            L’association n’a pas désigné de délégué à la protection des
            données. Ni sa taille, ni la nature de ses activités ne l’y obligent
            : c’est le bureau qui répond directement à vos demandes.
          </p>
        </Section>

        <Section titre="Quelles données nous collectons, et pourquoi">
          <p>
            Le site ne collecte aucune donnée à votre insu. Chacune des
            collectes décrites ci-dessous correspond à une démarche que vous
            entreprenez volontairement.
          </p>

          <SousSection titre="Inscription à la newsletter">
            <p>
              Nous collectons <Terme>votre adresse email, et elle seule</Terme>.
              Elle sert uniquement à vous envoyer nos actualités, nos
              publications et nos invitations aux événements de l’association.
              Nous ne collectons ni votre nom, ni votre spécialité, ni aucune
              autre information.
            </p>
            <p>
              Votre adresse ne fait l’objet d’aucun profilage. Elle n’est ni
              vendue, ni louée, ni cédée à des tiers à des fins commerciales.
            </p>
          </SousSection>

          <SousSection titre="Formulaire de contact">
            <p>
              Lorsque vous nous écrivez depuis la page{" "}
              <Link
                href="/contact"
                className="font-medium text-primary underline underline-offset-2"
              >
                Contact
              </Link>
              , nous collectons votre <Terme>nom</Terme>, votre{" "}
              <Terme>adresse email</Terme>, l’<Terme>objet</Terme> de votre
              message et son <Terme>contenu</Terme>. Ces informations servent
              exclusivement à vous répondre.
            </p>
            <p>
              Votre message est transmis à la boîte mail de l’association. Il
              n’alimente aucune liste de diffusion : écrire à l’association ne
              vous inscrit pas à la newsletter.
            </p>
          </SousSection>

          <SousSection titre="Adhésion à l’association">
            <p>
              Les adhésions sont gérées par{" "}
              <LienExterne href="https://www.helloasso.com">
                HelloAsso
              </LienExterne>
              , plateforme dédiée aux associations. Les informations que vous y
              saisissez — identité, coordonnées, montant de la cotisation — sont
              collectées par HelloAsso pour notre compte, puis mises à
              disposition du bureau.
            </p>
            <p>
              <Terme>
                Nous n’avons jamais accès à vos coordonnées bancaires
              </Terme>{" "}
              : le paiement est traité de bout en bout par HelloAsso et son
              prestataire de paiement. Aucun numéro de carte ne transite par ce
              site ni n’est conservé par l’association.
            </p>
          </SousSection>

          <SousSection titre="Membres présentées sur la page « L’équipe »">
            <p>
              La page{" "}
              <Link
                href="/equipe"
                className="font-medium text-primary underline underline-offset-2"
              >
                L’équipe
              </Link>{" "}
              présente publiquement certaines membres : civilité, prénom, nom,
              spécialité, biographie, photographie, rôle au sein du bureau, et
              le cas échéant adresse email professionnelle et profil LinkedIn.
            </p>
            <p>
              Ces informations sont publiées{" "}
              <Terme>
                avec l’accord explicite de chaque personne concernée
              </Terme>
              , qui nous a transmis elle-même sa photographie et sa biographie.
              Toute membre peut demander à tout moment la modification ou le
              retrait de sa fiche, sans avoir à se justifier, en écrivant à{" "}
              <LienEmail email={emailContact} />. Le retrait est effectué sans
              délai.
            </p>
          </SousSection>

          <SousSection titre="Journaux techniques">
            <p>
              Comme tout site web, ce site enregistre chez son hébergeur des
              journaux de connexion contenant notamment votre{" "}
              <Terme>adresse IP</Terme>. Ils servent à assurer le bon
              fonctionnement et la sécurité du site, jamais à vous identifier ni
              à analyser votre comportement.
            </p>
            <p>
              Le formulaire d’inscription à la newsletter utilise en outre votre
              adresse IP pour limiter le nombre de tentatives par minute et
              empêcher qu’un robot ne s’en serve pour envoyer des emails en
              masse. Cette adresse{" "}
              <Terme>n’est enregistrée dans aucune base de données</Terme> :
              elle reste en mémoire du serveur pendant une minute, puis
              disparaît.
            </p>
          </SousSection>

          <SousSection titre="Cookies et mesure de fréquentation">
            <p>
              Le site <Terme>ne dépose aucun cookie</Terme> — ni de mesure
              d’audience, ni de publicité — et n’intègre aucun bouton de partage
              traçant votre navigation. C’est pourquoi vous ne verrez jamais de
              bandeau cookies sur ce site : nous n’avons rien à vous faire
              accepter.
            </p>
            <p>
              Nous mesurons néanmoins la fréquentation du site, avec{" "}
              <Terme>Vercel Web Analytics</Terme>, l’outil de notre hébergeur. À
              chaque page consultée, il enregistre l’horodatage, l’adresse de la
              page, le site qui vous a orientée vers nous, une localisation
              approximative — pays, région, ville — ainsi que le type
              d’appareil, le système et le navigateur utilisés.
            </p>
            <p>
              Ces données sont <Terme>agrégées</Terme> : elles nous indiquent
              combien de personnes ont lu une page et par quel chemin elles sont
              arrivées, pas qui l’a lue. Aucune adresse IP n’est conservée et
              aucun profil n’est constitué. Pour éviter de compter deux fois la
              même visite, l’outil calcule une empreinte technique à partir de
              votre requête ; elle est{" "}
              <Terme>écartée au bout de vingt-quatre heures</Terme> et ne permet
              ni de vous reconnaître d’un jour sur l’autre, ni de vous suivre
              sur d’autres sites.
            </p>
            <p>
              Le fonctionnement de ce dispositif est documenté par notre
              hébergeur :{" "}
              <LienExterne href="https://vercel.com/docs/analytics/privacy-policy">
                Vercel Web Analytics — Privacy and Compliance
              </LienExterne>
              .
            </p>
          </SousSection>
        </Section>

        <Section titre="Un mot sur les données de santé">
          <p>
            Nous ne vous demandons aucune information relative à votre santé, et
            aucun de nos formulaires n’en sollicite.
          </p>
          <p>
            Si vous choisissez de nous en confier spontanément — dans un message
            de contact ou un témoignage, par exemple — ces informations sont
            traitées comme le reste de votre message : lues par les seules
            personnes chargées d’y répondre, jamais publiées sans votre accord
            écrit, et supprimées dans le même délai. Nous vous invitons
            néanmoins à ne pas inclure d’éléments médicaux détaillés dans un
            message qui n’en a pas besoin.
          </p>
        </Section>

        <Section titre="Sur quelles bases légales">
          <p>
            Chaque traitement repose sur l’un des fondements prévus par
            l’article 6 du RGPD :
          </p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>
              <Terme>Newsletter</Terme> : votre consentement. Il est recueilli
              en deux temps — vous saisissez votre adresse sur le site, puis
              vous confirmez en cliquant sur le lien contenu dans l’email que
              nous vous envoyons. Tant que ce second clic n’a pas eu lieu, votre
              adresse n’est pas ajoutée à notre liste de diffusion.
            </li>
            <li>
              <Terme>Formulaire de contact</Terme> : notre intérêt légitime à
              répondre à une personne qui nous sollicite.
            </li>
            <li>
              <Terme>Adhésion</Terme> : l’exécution du contrat d’adhésion qui
              nous lie, ainsi que nos obligations comptables légales.
            </li>
            <li>
              <Terme>Page « L’équipe »</Terme> : le consentement de chaque
              membre présentée.
            </li>
            <li>
              <Terme>Journaux techniques et anti-abus</Terme> : notre intérêt
              légitime à protéger le site contre les usages malveillants.
            </li>
          </ul>
          <p>
            Lorsqu’un traitement repose sur votre consentement, vous pouvez le
            retirer à tout moment, sans avoir à vous justifier et sans
            conséquence sur la licéité de ce qui a été fait auparavant. Pour la
            newsletter, le lien de désinscription présent en bas de chacun de
            nos emails suffit.
          </p>
        </Section>

        <Section titre="Qui a accès à vos données">
          <p>
            Au sein de l’association, vos données sont accessibles aux seules
            membres du bureau qu’elles concernent : celles chargées de la
            communication pour la newsletter et les messages de contact, la
            trésorière et la secrétaire pour les adhésions.
          </p>
          <p>
            Nous faisons appel à cinq prestataires, qui agissent en qualité de
            sous-traitants au sens du RGPD. Aucun ne peut utiliser vos données à
            ses propres fins : ils n’interviennent que sur nos instructions et
            pour les besoins du service décrit.
          </p>
          <ul className="ml-5 list-disc space-y-2.5">
            <li>
              <Terme>Brevo</Terme> (Sendinblue SAS, société française) — envoi
              de la newsletter et des emails de confirmation. Vos données sont
              hébergées dans l’Union européenne : en France, en Belgique et en
              Allemagne.
            </li>
            <li>
              <Terme>HelloAsso</Terme> (SAS, 2 rue Marc Sangnier, 33130 Bègles,
              RCS Bordeaux 510 918 683) — gestion des adhésions et des
              paiements. Les données sont hébergées en Europe.{" "}
              <LienExterne href="https://info.helloasso.com/politique-de-confidentialite">
                Politique de confidentialité de HelloAsso
              </LienExterne>
              .
            </li>
            <li>
              <Terme>Sanity</Terme> — hébergement des contenus du site, dont les
              photographies et biographies des membres.
            </li>
            <li>
              <Terme>OVH</Terme> (OVH SAS, société française) — hébergement des
              boîtes mail de l’association. C’est chez OVH qu’arrivent et que
              sont conservés les messages envoyés depuis le formulaire de
              contact. Les serveurs sont situés en France.
            </li>
            <li>
              <Terme>Vercel Inc.</Terme> (États-Unis) — hébergement du site,
              journaux techniques et mesure de fréquentation. Le site est
              configuré pour s’exécuter sur les
              serveurs parisiens de Vercel : le traitement de vos requêtes a
              donc lieu dans l’Union européenne. Vercel restant une société
              américaine, elle demeure susceptible d’accéder à ces données
              depuis les États-Unis ; elle est à ce titre certifiée au titre du
              cadre de protection des données UE–États-Unis.
            </li>
          </ul>
          <p>
            Certaines de ces prestations peuvent donner lieu à un accès depuis
            des pays situés hors de l’Espace économique européen — notamment les
            États-Unis, le Canada et l’Inde, pour des opérations de maintenance,
            de support ou de sécurité du réseau. Ces transferts sont encadrés
            par les clauses contractuelles types de la Commission européenne,
            par le cadre de protection des données UE–États-Unis, ou par une
            décision d’adéquation selon le pays concerné.
          </p>
          <p>
            En dehors de ces prestataires, vos données ne sont communiquées à
            personne, sauf obligation légale à laquelle nous ne pourrions nous
            soustraire.
          </p>
        </Section>

        <Section titre="Combien de temps nous les conservons">
          <ul className="ml-5 list-disc space-y-2.5">
            <li>
              <Terme>Adresse de newsletter</Terme> : jusqu’à votre
              désinscription. Si vous n’interagissez plus avec nos emails —
              aucune ouverture, aucun clic, aucune réinscription — pendant trois
              ans, elle est supprimée. Cette durée correspond à la référence
              couramment retenue en matière de prospection. L’association
              procède à une revue annuelle de sa liste de diffusion pour
              appliquer cette règle.
            </li>
            <li>
              <Terme>Messages de contact</Terme> : douze mois après notre
              dernière réponse, sauf lorsque l’échange ouvre une relation suivie
              — adhésion, partenariat — auquel cas il rejoint le dossier
              correspondant.
            </li>
            <li>
              <Terme>Données d’adhésion</Terme> : pendant la durée de votre
              adhésion, puis trois ans après sa fin. Les pièces comptables
              afférentes sont conservées dix ans, comme la loi l’impose à toute
              association.
            </li>
            <li>
              <Terme>Fiches de la page « L’équipe »</Terme> : tant que vous
              faites partie de l’association et que vous n’avez pas demandé leur
              retrait.
            </li>
            <li>
              <Terme>Journaux techniques</Terme> : une durée courte, fixée par
              notre hébergeur, à des fins de sécurité et de diagnostic. Le
              compteur anti-abus de la newsletter, lui, s’efface au bout d’une
              minute.
            </li>
          </ul>
        </Section>

        <Section titre="Comment vos données sont protégées">
          <p>
            Le site est intégralement servi en HTTPS : les informations que vous
            saisissez circulent chiffrées. Les accès aux outils de gestion sont
            nominatifs et protégés par mot de passe, et limités aux membres du
            bureau qui en ont l’usage.
          </p>
        </Section>

        <Section titre="Vos droits">
          <p>Vous disposez à tout moment des droits suivants :</p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>
              <Terme>Accès</Terme> : savoir si nous détenons des données vous
              concernant et en obtenir une copie.
            </li>
            <li>
              <Terme>Rectification</Terme> : faire corriger une information
              erronée ou incomplète.
            </li>
            <li>
              <Terme>Effacement</Terme> : demander la suppression de vos
              données.
            </li>
            <li>
              <Terme>Opposition</Terme> : refuser un traitement fondé sur notre
              intérêt légitime, ou refuser de recevoir nos communications.
            </li>
            <li>
              <Terme>Limitation</Terme> : demander le gel d’un traitement le
              temps qu’une contestation soit examinée.
            </li>
            <li>
              <Terme>Portabilité</Terme> : récupérer vos données dans un format
              lisible par machine.
            </li>
            <li>
              <Terme>Retrait du consentement</Terme> : à tout moment, sans
              conséquence sur la licéité des traitements antérieurs.
            </li>
          </ul>
          <p>
            Pour exercer l’un de ces droits, écrivez-nous à{" "}
            <LienEmail email={emailContact} />. Nous vous répondrons dans un
            délai d’un mois. Pour une simple désinscription de la newsletter, le
            lien en bas de nos emails est immédiat et ne nécessite aucune
            démarche.
          </p>
        </Section>

        <Section titre="Réclamation">
          <p>
            Si vous estimez, après nous avoir contactées, que vos droits ne sont
            pas respectés, vous pouvez adresser une réclamation à la Commission
            nationale de l’informatique et des libertés (CNIL),{" "}
            <LienExterne href="https://www.cnil.fr/fr/plaintes">
              cnil.fr
            </LienExterne>
            .
          </p>
        </Section>

        <Section titre="Modification de cette page">
          <p>
            Cette page peut être amenée à évoluer, notamment si nous ajoutons de
            nouveaux services au site. La date de dernière mise à jour figure en
            haut de cette page.
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
