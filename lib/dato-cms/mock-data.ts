import type {
  Page,
  Article,
  Event,
  Member,
  Resource,
  Testimonial,
} from "@/lib/types/dato-cms";
import { subDays, addDays, addMonths } from "date-fns";

// Données mockées pour le développement
export const mockPages: Page[] = [
  {
    id: "1",
    title: "Bienvenue à FEMCOEUR",
    slug: "home",
    content: `
      <p>FEMCOEUR est une organisation dédiée à la promotion de l'excellence en cardiologie et au soutien des femmes cardiologues à travers le monde.</p>
      <p>Notre mission est de créer un réseau solide de professionnelles, de partager les connaissances et les meilleures pratiques, et d'encourager les jeunes femmes à poursuivre une carrière en cardiologie.</p>
      <p>Rejoignez-nous pour faire partie d'une communauté dynamique qui façonne l'avenir de la cardiologie.</p>
    `,
    seo: {
      title: "FEMCOEUR - Accueil",
      description:
        "Promotion de l'excellence en cardiologie et soutien aux femmes cardiologues",
    },
  },
  {
    id: "2",
    title: "À propos de nous",
    slug: "about",
    content: `
      <p>FEMCOEUR a été fondée en 2015 avec pour objectif de créer un espace où les femmes cardiologues peuvent se connecter, partager leurs expériences et grandir professionnellement.</p>
      <p>Nous organisons régulièrement des conférences, des ateliers et des événements de réseautage pour nos membres.</p>
    `,
    seo: {
      title: "À propos - FEMCOEUR",
      description: "Découvrez notre histoire et notre mission",
    },
  },
];

export const mockArticles: Article[] = [
  {
    id: "0",
    title:
      "La 1ère Journée FemCœur : quand les femmes cardiologues prennent la parole",
    slug: "premiere-journee-femcoeur-retour",
    author: "Équipe FEMCOEUR",
    date: subDays(new Date(), 90).toISOString(),
    content: `
      <p>Plus de 150 femmes médecins et chirurgiennes cardiovasculaires réunies. Des témoignages forts. Des chiffres qui interpellent. Des solutions concrètes.</p>

      <p>Retour sur la première Journée FemCœur, un moment historique pour notre profession.</p>


      <h2>Des témoignages qui résonnent</h2>

      <h3>Briser le silence sur le sexisme médical</h3>

      <p>La journée s'ouvre sur des prises de parole courageuses. Cinq membres du bureau partagent leur vécu du sexisme médical.</p>

      <p>Mathilde évoque les remarques quotidiennes. Isabelle parle des doubles standards entre paternité et maternité. Céline raconte sa grossesse vécue comme un obstacle professionnel.</p>

      <p>Ces mots résonnent dans toute la salle. FEMCOEUR est née le 15 mars 2025 pour dire : ça suffit.</p>


      <h2>Les chiffres qui choquent</h2>

      <h3>Baromètre national du sexisme en médecine</h3>

      <p><strong>78% des femmes médecins ont subi des discriminations sexistes.</strong> Le baromètre national 2025 ne laisse aucun doute.</p>

      <p>39% retardent leur projet de grossesse à cause de leur carrière. 77% des hommes sont témoins sans réagir.</p>

      <h3>Où sont les femmes en cardiologie ?</h3>

      <p>En cardiologie : 33% de femmes, mais seulement 10% en interventionnel et 8% à la tête de services de CHU.</p>

      <p>En chirurgie cardiaque : 9% de femmes sur 387 chirurgiens. Zéro PUPH femme.</p>

      <p>La moitié des publications scientifiques majeures n'incluent pas de femmes dans leurs études.</p>


      <h2>Le syndrome de l'impostrice</h2>

      <h3>100% des participantes concernées</h3>

      <p>Un test est distribué dans la salle. Résultat sans appel : toutes les participantes sont concernées.</p>

      <p>Toutes, à des degrés divers, doutent de leur légitimité. Le milieu médical ultra-compétitif et la hiérarchie rigide créent un terreau fertile pour ce syndrome.</p>

      <p>La solution ? Le travail collectif, la sororité, le mentorat. Ensemble, nous déconstruisons ces mécanismes.</p>


      <h2>Cardiologie au féminin : des spécificités ignorées</h2>

      <h3>Des phénotypes cardiovasculaires différents</h3>

      <p>Les femmes présentent des spécificités : takotsubo, ICFEP, atteintes microvasculaires.</p>

      <p>Pourtant, elles sont sous-représentées dans les études cliniques. Les traitements ne sont pas adaptés. La mortalité post-infarctus reste plus élevée.</p>

      <p>Il est temps de changer la donne.</p>


      <h2>Ateliers pratiques pour se renforcer</h2>

      <h3>Prise de parole en public</h3>

      <p>Atelier Catalyse sur la prise de parole : comment s'affirmer en réunion et en congrès, poser sa voix et capter l'attention.</p>

      <h3>Équilibre vie pro/vie perso</h3>

      <p>Les participantes repartent avec des outils concrets pour gérer leur temps et déconstruire les injonctions toxiques : "Sois parfaite", "Fais plaisir".</p>


      <h2>Nos projets 2026</h2>

      <h3>Actions concrètes en cours</h3>

      <p>Enquête nationale sur les inégalités de genre en cardiologie et chirurgie cardiaque.</p>

      <p>Réseau de femmes expertes pour les congrès et les médias.</p>

      <p>2ème Journée FemCœur prévue le 21 novembre 2026 à Paris.</p>

      <p>Programmes de mentorat et formations pour notre communauté.</p>


      <h2>Rejoignez le mouvement</h2>

      <h3>Pourquoi adhérer à FEMCOEUR ?</h3>

      <p>FEMCOEUR, c'est un réseau solidaire qui refuse les discriminations et œuvre pour l'égalité.</p>

      <p>En adhérant, vous bénéficiez de mentorat, de formations spécialisées et d'un soutien concret. Vous participez à des projets de recherche et gagnez en visibilité dans votre spécialité.</p>

      <p><strong>Adhésion 2026 : 50 €</strong></p>

      <p>Prête à faire partie du changement ? <a href="/join">Rejoignez FEMCOEUR maintenant.</a></p>
    `,
    image: {
      url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
      alt: "1ère Journée FemCœur",
    },
    categories: ["Événements", "Réseau", "Témoignages"],
    seo: {
      title:
        "La 1ère Journée FemCœur : quand les femmes cardiologues prennent la parole",
      description:
        "Plus de 150 femmes médecins réunies pour une journée historique. Témoignages, chiffres chocs sur les inégalités de genre en cardiologie et ateliers pratiques.",
    },
  },
  {
    id: "1",
    title:
      "Infarctus au féminin : repérer les symptômes atypiques pour sauver des vies",
    slug: "infarctus-feminin-symptomes-atypiques",
    author: "Dre Thiziri Si Moussi",
    date: subDays(new Date(), 5).toISOString(),
    content: `
      <p>Contrairement aux idées reçues, l'infarctus du myocarde ne se manifeste pas toujours par la fameuse douleur thoracique irradiant dans le bras gauche. Chez les femmes, les symptômes sont souvent plus subtils et atypiques, ce qui retarde le diagnostic et augmente la mortalité.</p>
      
      <h2>Des signes d'alerte trop souvent méconnus</h2>
      <p>Les femmes victimes d'un infarctus présentent fréquemment des symptômes moins "classiques" :</p>
      <ul>
        <li><strong>Fatigue intense et inexpliquée</strong> pendant plusieurs jours avant l'événement</li>
        <li><strong>Douleurs dans la mâchoire, le dos ou l'estomac</strong> plutôt que dans la poitrine</li>
        <li><strong>Nausées, vomissements, vertiges</strong> qui peuvent faire penser à une grippe ou un problème digestif</li>
        <li><strong>Essoufflement inhabituel</strong> lors d'efforts habituellement bien tolérés</li>
        <li><strong>Anxiété ou sensation de malaise général</strong> difficile à définir</li>
      </ul>

      <h2>Pourquoi ces différences ?</h2>
      <p>Plusieurs facteurs expliquent cette présentation atypique chez les femmes :</p>
      <ul>
        <li>Les artères coronaires des femmes sont souvent plus petites que celles des hommes</li>
        <li>Les femmes développent davantage de <strong>microcirculation coronaire défaillante</strong> (syndrome X)</li>
        <li>Les variations hormonales (grossesse, ménopause) influencent la réponse cardiovasculaire</li>
        <li>Le stress chronique et la charge mentale peuvent masquer ou modifier les symptômes</li>
      </ul>

      <h2>Un délai de prise en charge dramatique</h2>
      <p>En moyenne, <strong>les femmes arrivent 30 à 45 minutes plus tard à l'hôpital</strong> que les hommes après le début des symptômes. Ce retard s'explique par :</p>
      <ul>
        <li>Une méconnaissance de la diversité des symptômes (patientes et professionnels de santé)</li>
        <li>Une tendance à minimiser les signaux ("ce n'est rien, ça va passer")</li>
        <li>Le fait que les femmes donnent souvent la priorité aux autres avant elles-mêmes</li>
      </ul>

      <h2>Les actions de FEMCOEUR pour changer la donne</h2>
      <p>Notre association agit à plusieurs niveaux pour améliorer le diagnostic et la prise en charge de l'infarctus chez les femmes :</p>
      <ul>
        <li><strong>Campagnes de sensibilisation</strong> auprès du grand public : "Mon cœur de femme, je l'écoute"</li>
        <li><strong>Formation des professionnels de santé</strong> (médecins généralistes, urgentistes, SAMU) aux symptômes atypiques</li>
        <li><strong>Recherche clinique</strong> : collecte de données sexospécifiques pour adapter les protocoles</li>
        <li><strong>Ateliers en entreprise et maternités</strong> pour informer les femmes sur leurs facteurs de risque</li>
      </ul>

      <h2>En cas de doute : agissez vite !</h2>
      <p>Si vous ressentez un ou plusieurs de ces symptômes de manière inhabituelle et prolongée, <strong>appelez le 15 immédiatement</strong>. Mieux vaut une fausse alerte qu'une prise en charge tardive.</p>
      <p>Rappelez-vous : en matière d'infarctus, <strong>"chaque minute compte"</strong>. Ne minimisez jamais vos symptômes, même s'ils vous semblent "pas assez graves". Votre vie peut en dépendre.</p>
      
      <p><em>Pour aller plus loin, consultez notre guide "Reconnaître l'infarctus au féminin" disponible dans la section Ressources.</em></p>
    `,
    image: {
      url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
      alt: "Santé cardiovasculaire des femmes",
    },
    categories: ["Prévention", "Santé des femmes", "Urgences"],
    seo: {
      title: "Infarctus au féminin : symptômes atypiques à connaître",
      description:
        "Les symptômes d'infarctus chez les femmes sont souvent atypiques. Apprenez à les reconnaître pour agir vite.",
    },
  },
  {
    id: "2",
    title: "Prévention des maladies cardiovasculaires chez les femmes",
    slug: "prevention-maladies-cardiovasculaires-femmes",
    author: "Dre Isabelle Corman",
    date: subDays(new Date(), 12).toISOString(),
    content: `
      <p>Les maladies cardiovasculaires sont la première cause de mortalité chez les femmes dans de nombreux pays. Pourtant, elles restent souvent sous-diagnostiquées et sous-traitées.</p>
      <p>Cet article examine les facteurs de risque spécifiques aux femmes et les stratégies de prévention les plus efficaces.</p>
      <h2>Facteurs de risque spécifiques</h2>
      <p>Certains facteurs de risque sont plus prévalents ou ont un impact différent chez les femmes, notamment les complications de la grossesse, la ménopause précoce, et certaines conditions auto-immunes.</p>
      <h2>Stratégies de prévention</h2>
      <p>Une approche personnalisée de la prévention, tenant compte des spécificités féminines, est essentielle pour réduire l'incidence des maladies cardiovasculaires.</p>
    `,
    image: {
      url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      alt: "Prévention cardiovasculaire",
    },
    categories: ["Prévention", "Santé des femmes"],
    seo: {
      title: "Prévention des maladies cardiovasculaires chez les femmes",
      description: "Stratégies de prévention adaptées aux femmes",
    },
  },
  {
    id: "3",
    title: "L'importance de l'exercice physique en cardiologie",
    slug: "importance-exercice-physique-cardiologie",
    author: "Dre Mathilde Baudet",
    date: subDays(new Date(), 20).toISOString(),
    content: `
      <p>L'exercice physique régulier est l'un des piliers de la prévention et du traitement des maladies cardiovasculaires.</p>
      <p>Dans cet article, nous explorons les recommandations actuelles en matière d'activité physique pour les patients cardiaques et les personnes à risque.</p>
      <h2>Recommandations générales</h2>
      <p>L'Organisation Mondiale de la Santé recommande au moins 150 minutes d'activité physique modérée par semaine pour maintenir une bonne santé cardiovasculaire.</p>
      <h2>Exercice et réadaptation cardiaque</h2>
      <p>Pour les patients ayant subi un événement cardiaque, la réadaptation cardiaque avec un programme d'exercice supervisé est essentielle pour la récupération.</p>
    `,
    image: {
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      alt: "Exercice physique",
    },
    categories: ["Prévention", "Bien-être"],
    seo: {
      title: "L'importance de l'exercice physique en cardiologie",
      description: "Comment l'exercice physique améliore la santé cardiaque",
    },
  },
  {
    id: "4",
    title: "Nouvelles perspectives sur l'insuffisance cardiaque",
    slug: "nouvelles-perspectives-insuffisance-cardiaque",
    author: "Dre Pauline Marchal",
    date: subDays(new Date(), 28).toISOString(),
    content: `
      <p>L'insuffisance cardiaque est une condition complexe qui affecte des millions de personnes dans le monde. Les recherches récentes ouvrent de nouvelles perspectives de traitement.</p>
      <h2>Nouveaux médicaments</h2>
      <p>Les inhibiteurs SGLT2 et les antagonistes des récepteurs de l'angiotensine-néprilysine ont révolutionné le traitement de l'insuffisance cardiaque avec fraction d'éjection réduite.</p>
      <h2>Thérapies personnalisées</h2>
      <p>L'approche personnalisée du traitement, basée sur le profil génétique et les biomarqueurs, devient de plus en plus importante.</p>
    `,
    image: {
      url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop",
      alt: "Insuffisance cardiaque",
    },
    categories: ["Recherche", "Traitement"],
    seo: {
      title: "Nouvelles perspectives sur l'insuffisance cardiaque",
      description:
        "Avancées récentes dans le traitement de l'insuffisance cardiaque",
    },
  },
];

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "2ème Journée FemCœur",
    slug: "2eme-journee-femcoeur-2026",
    date: new Date("2026-11-21").toISOString(),
    location: "Paris, France",
    description:
      "La deuxième édition de la Journée FemCœur réunira cardiologues, médecins vasculaires et chirurgiennes cardiovasculaires pour échanger sur les avancées en cardiologie au féminin. Au programme : conférences scientifiques, ateliers pratiques et moments de networking pour renforcer notre réseau national.",
    image: {
      url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
      alt: "2ème Journée FemCœur",
    },
    registrationLink: "https://example.com/register",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Conférence annuelle FEMCOEUR 2026",
    slug: "conference-annuelle-femcoeur-2026",
    date: addMonths(new Date(), 3).toISOString(),
    location: "Paris, France",
    description:
      "Notre conférence annuelle réunira des cardiologues femmes de toute la France pour partager les dernières recherches sur la cardiologie au féminin. Au programme : conférences plénières, sessions de posters, et ateliers pratiques.",
    image: {
      url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
      alt: "Conférence annuelle",
    },
    registrationLink: "https://example.com/register",
    status: "upcoming",
  },
  {
    id: "3",
    title: "Webinaire : Ménopause et risque cardiovasculaire",
    slug: "webinaire-menopause-risque-cardiovasculaire",
    date: addDays(new Date(), 15).toISOString(),
    location: "En ligne",
    description:
      "Webinaire expert animé par des cardiologues femmes sur la prise en charge du risque cardiovasculaire à la ménopause. Au programme : physiologie, dépistage, traitement hormonal et prévention. Session interactive avec questions-réponses.",
    image: {
      url: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop",
      alt: "Ménopause et cœur",
    },
    registrationLink: "https://example.com/register-menopause",
    status: "upcoming",
  },
  {
    id: "4",
    title: "Atelier patient : Cœur de Femme - Post-partum",
    slug: "atelier-coeur-de-femme-post-partum",
    date: addDays(new Date(), 30).toISOString(),
    location: "Marseille, France",
    description:
      "Atelier de prévention cardiovasculaire destiné aux jeunes mamans. Session animée par des cardiologues femmes pour sensibiliser sur les facteurs de risque spécifiques au post-partum et accompagner les patientes dans l'adoption d'un mode de vie cardioprotecteur.",
    image: {
      url: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop",
      alt: "Atelier post-partum",
    },
    status: "upcoming",
  },
  {
    id: "5",
    title: "1ère Journée FemCœur",
    slug: "1ere-journee-femcoeur",
    date: subDays(new Date(), 90).toISOString(),
    location: "Paris, France",
    description:
      "La première édition de la Journée FemCœur a marqué une étape importante dans le développement de l'association. Plus de 150 cardiologues femmes se sont réunies pour échanger sur les enjeux de la cardiologie au féminin et créer un réseau national solide.",
    image: {
      url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop",
      alt: "1ère Journée FemCœur",
    },
    status: "past",
  },
  {
    id: "6",
    title: "Formation certifiante : Spécificités cardiovasculaires des femmes",
    slug: "formation-specificites-cardiovasculaires-femmes",
    date: subDays(new Date(), 25).toISOString(),
    location: "Lyon, France",
    description:
      "Formation certifiante de deux jours destinée aux médecins généralistes, sages-femmes et infirmières. Programme complet sur les spécificités cardiovasculaires des femmes : facteurs de risque, symptômes atypiques, prévention et prise en charge. Formation très appréciée par les 80 participants.",
    image: {
      url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
      alt: "Formation FEMCOEUR",
    },
    status: "past",
  },
];

export const mockMembers: Member[] = [
  // Bureau de l'association
  {
    id: "1",
    firstName: "Thiziri",
    lastName: "Si Moussi",
    biography:
      "Présidente de FEMCOEUR, engagée pour la visibilité et la reconnaissance des femmes cardiologues en France. Porte la mission de l'association avec détermination et passion.",
    specialty: "Cardiologie",
    role: "Présidente",
    socialLinks: {
      email: "contact@femcoeur.fr",
    },
  },
  {
    id: "2",
    firstName: "Isabelle",
    lastName: "Corman",
    biography:
      "Vice-présidente de FEMCOEUR, impliquée dans les projets de recherche sur les inégalités de genre en cardiologie et chirurgie cardiaque.",
    specialty: "Cardiologie",
    role: "Vice-présidente",
    socialLinks: {
      email: "contact@femcoeur.fr",
    },
  },
  {
    id: "3",
    firstName: "Anne-Céline",
    lastName: "Martin",
    biography:
      "Secrétaire de FEMCOEUR, assure le bon fonctionnement administratif de l'association et la coordination des activités.",
    specialty: "Cardiologie",
    role: "Secrétaire",
    socialLinks: {
      email: "contact@femcoeur.fr",
    },
  },
  {
    id: "4",
    firstName: "Pauline",
    lastName: "Marchal",
    biography:
      "Secrétaire adjointe de FEMCOEUR, contribue activement à l'organisation des événements et à la vie associative.",
    specialty: "Cardiologie",
    role: "Secrétaire adjointe",
    socialLinks: {
      email: "contact@femcoeur.fr",
    },
  },
  {
    id: "5",
    firstName: "Mathilde",
    lastName: "Baudet",
    biography:
      "Trésorière de FEMCOEUR, pilote la commission enquête nationale sur les inégalités de genre en cardiologie et chirurgie cardiaque.",
    specialty: "Cardiologie",
    role: "Trésorière",
    socialLinks: {
      email: "contact@femcoeur.fr",
    },
  },
  {
    id: "6",
    firstName: "Sara",
    lastName: "Bouajila",
    biography:
      "Trésorière adjointe de FEMCOEUR, soutient la gestion financière de l'association et participe aux décisions budgétaires.",
    specialty: "Cardiologie",
    role: "Trésorière adjointe",
    socialLinks: {
      email: "contact@femcoeur.fr",
    },
  },
  {
    id: "7",
    firstName: "Marina",
    lastName: "Clement",
    biography:
      "Responsable communication de FEMCOEUR, développe la visibilité de l'association sur les réseaux sociaux et dans les médias.",
    specialty: "Cardiologie",
    role: "Responsable communication",
    socialLinks: {
      email: "communication@femcoeur.fr",
    },
  },
  {
    id: "8",
    firstName: "Céline",
    lastName: "Luc",
    biography:
      "Responsable communication de FEMCOEUR, co-pilote la stratégie digitale et la création de contenus pour l'association.",
    specialty: "Cardiologie",
    role: "Responsable communication",
    socialLinks: {
      email: "communication@femcoeur.fr",
    },
  },
  {
    id: "9",
    firstName: "Alizée",
    lastName: "Porto",
    biography:
      "Responsable communication de FEMCOEUR, contribue au rayonnement de l'association et à la diffusion de ses messages.",
    specialty: "Cardiologie",
    role: "Responsable communication",
    socialLinks: {
      email: "communication@femcoeur.fr",
    },
  },
  // Membres actives
  {
    id: "10",
    firstName: "Marion",
    lastName: "Kebler",
    biography:
      "Membre active de FEMCOEUR, participe aux initiatives de l'association pour promouvoir la cardiologie au féminin.",
    specialty: "Cardiologie",
  },
  {
    id: "11",
    firstName: "Caroline",
    lastName: "Ngyen",
    biography:
      "Membre active de FEMCOEUR, engagée pour l'amélioration de la prise en charge cardiovasculaire des femmes.",
    specialty: "Cardiologie",
  },
  {
    id: "12",
    firstName: "Clémence",
    lastName: "Marchal",
    biography:
      "Membre active de FEMCOEUR, contribue aux projets de recherche et de sensibilisation de l'association.",
    specialty: "Cardiologie",
  },
  {
    id: "13",
    firstName: "Caroline",
    lastName: "Karneis",
    biography:
      "Membre active de FEMCOEUR, participe aux événements et formations organisés par l'association.",
    specialty: "Cardiologie",
  },
  {
    id: "14",
    firstName: "Ilham",
    lastName: "Benzidia",
    biography:
      "Membre active de FEMCOEUR, impliquée dans la commission enquête nationale sur les inégalités de genre en cardiologie.",
    specialty: "Cardiologie",
  },
  {
    id: "15",
    firstName: "Florence",
    lastName: "Bauvais",
    biography:
      "Membre active de FEMCOEUR, contribue au développement du réseau et à la solidarité entre cardiologues femmes.",
    specialty: "Cardiologie",
  },
  {
    id: "16",
    firstName: "Marine",
    lastName: "Jungling",
    biography:
      "Membre active de FEMCOEUR, participe aux actions de prévention et de sensibilisation menées par l'association.",
    specialty: "Cardiologie",
  },
  {
    id: "17",
    firstName: "Tiffany",
    lastName: "Mathieu",
    biography:
      "Membre active de FEMCOEUR, engagée pour l'équité dans l'accès aux soins cardiovasculaires.",
    specialty: "Cardiologie",
  },
  {
    id: "18",
    firstName: "Laura",
    lastName: "Munte",
    biography:
      "Membre active de FEMCOEUR, impliquée dans la commission enquête nationale sur les inégalités de genre en cardiologie.",
    specialty: "Cardiologie",
  },
];

export const mockResources: Resource[] = [
  {
    id: "1",
    title: "Guide de prévention cardiovasculaire 2024",
    type: "pdf",
    description:
      "Guide complet sur les stratégies de prévention primaire et secondaire des maladies cardiovasculaires, avec des recommandations basées sur les dernières études.",
    category: "Guides cliniques",
    file: {
      url: "https://example.com/guides/prevention-2024.pdf",
    },
  },
  {
    id: "2",
    title: "Protocole de réadaptation cardiaque",
    type: "pdf",
    description:
      "Protocole standardisé pour les programmes de réadaptation cardiaque, incluant les exercices recommandés et le suivi des patients.",
    category: "Guides cliniques",
    file: {
      url: "https://example.com/guides/readaptation.pdf",
    },
  },
  {
    id: "3",
    title: "Recommandations ESC 2023 - Insuffisance cardiaque",
    type: "link",
    description:
      "Lien vers les dernières recommandations de la Société Européenne de Cardiologie sur la prise en charge de l'insuffisance cardiaque.",
    category: "Recommandations",
    link: "https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines",
  },
  {
    id: "4",
    title: "Webinaire : Échocardiographie avancée",
    type: "video",
    description:
      "Enregistrement d'un webinaire de 2 heures sur les techniques avancées d'échocardiographie, incluant des cas cliniques pratiques.",
    category: "Formation",
    link: "https://example.com/videos/echo-avance",
  },
  {
    id: "5",
    title: "Atlas d'électrocardiographie",
    type: "pdf",
    description:
      "Atlas complet avec plus de 200 tracés ECG commentés, couvrant les principales pathologies cardiaques.",
    category: "Guides cliniques",
    file: {
      url: "https://example.com/guides/atlas-ecg.pdf",
    },
  },
  {
    id: "6",
    title: "Cours en ligne : Cardiologie d'urgence",
    type: "video",
    description:
      "Formation en ligne de 10 heures sur la prise en charge des urgences cardiologiques, avec simulations et cas pratiques.",
    category: "Formation",
    link: "https://example.com/videos/urgence",
  },
  {
    id: "7",
    title: "Recommandations AHA - Hypertension artérielle",
    type: "link",
    description:
      "Lien vers les recommandations de l'American Heart Association sur le diagnostic et le traitement de l'hypertension artérielle.",
    category: "Recommandations",
    link: "https://www.heart.org/en/health-topics/high-blood-pressure",
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Patricia Rousseau",
    role: "Cardiologue, Hôpital de Paris",
    content:
      "Rejoindre cette association a été une décision transformatrice pour ma carrière. Le réseau de soutien et les opportunités de développement professionnel sont exceptionnels.",
    image: {
      url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop",
      alt: "Dr. Patricia Rousseau",
    },
  },
  {
    id: "2",
    name: "Dr. Camille Durand",
    role: "Cardiologue interventionnelle, Lyon",
    content:
      "Les conférences et ateliers organisés par l'association sont toujours de très haute qualité. J'ai appris énormément et rencontré des collègues formidables.",
    image: {
      url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop",
      alt: "Dr. Camille Durand",
    },
  },
  {
    id: "3",
    name: "Dr. Émilie Girard",
    role: "Cardiologue pédiatrique, Marseille",
    content:
      "En tant que jeune cardiologue, l'association m'a offert un mentorat précieux et m'a aidée à développer mes compétences cliniques et de recherche.",
    image: {
      url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
      alt: "Dr. Émilie Girard",
    },
  },
];
