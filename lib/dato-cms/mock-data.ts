import type { Page, Article, Event, Member, Resource, Testimonial } from '@/lib/types/dato-cms';
import { subDays, addDays, addMonths } from 'date-fns';

// Données mockées pour le développement
export const mockPages: Page[] = [
  {
    id: '1',
    title: 'Bienvenue à FEMCOEUR',
    slug: 'home',
    content: `
      <p>FEMCOEUR est une organisation dédiée à la promotion de l'excellence en cardiologie et au soutien des femmes cardiologues à travers le monde.</p>
      <p>Notre mission est de créer un réseau solide de professionnelles, de partager les connaissances et les meilleures pratiques, et d'encourager les jeunes femmes à poursuivre une carrière en cardiologie.</p>
      <p>Rejoignez-nous pour faire partie d'une communauté dynamique qui façonne l'avenir de la cardiologie.</p>
    `,
    seo: {
      title: 'FEMCOEUR - Accueil',
      description: 'Promotion de l\'excellence en cardiologie et soutien aux femmes cardiologues',
    },
  },
  {
    id: '2',
    title: 'À propos de nous',
    slug: 'about',
    content: `
      <p>FEMCOEUR a été fondée en 2015 avec pour objectif de créer un espace où les femmes cardiologues peuvent se connecter, partager leurs expériences et grandir professionnellement.</p>
      <p>Nous organisons régulièrement des conférences, des ateliers et des événements de réseautage pour nos membres.</p>
    `,
    seo: {
      title: 'À propos - FEMCOEUR',
      description: 'Découvrez notre histoire et notre mission',
    },
  },
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Les dernières avancées en cardiologie interventionnelle',
    slug: 'avancees-cardiologie-interventionnelle',
    author: 'Dr. Marie Dubois',
    date: subDays(new Date(), 5).toISOString(),
    content: `
      <p>La cardiologie interventionnelle continue d'évoluer à un rythme rapide. Les nouvelles techniques de traitement des maladies coronariennes offrent des résultats prometteurs pour les patients.</p>
      <p>Dans cet article, nous explorons les dernières innovations en matière de stents biodégradables et de techniques de revascularisation percutanée.</p>
      <h2>Stents biodégradables</h2>
      <p>Les stents biodégradables représentent une avancée majeure dans le traitement des sténoses coronariennes. Contrairement aux stents métalliques traditionnels, ces dispositifs se dissolvent naturellement dans l'organisme après avoir rempli leur fonction.</p>
      <h2>Techniques de revascularisation</h2>
      <p>Les nouvelles techniques de revascularisation percutanée permettent des interventions moins invasives et des temps de récupération plus courts pour les patients.</p>
    `,
    image: {
      url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
      alt: 'Cardiologie interventionnelle',
    },
    categories: ['Recherche', 'Innovation'],
    seo: {
      title: 'Les dernières avancées en cardiologie interventionnelle',
      description: 'Découvrez les innovations récentes en cardiologie interventionnelle',
    },
  },
  {
    id: '2',
    title: 'Prévention des maladies cardiovasculaires chez les femmes',
    slug: 'prevention-maladies-cardiovasculaires-femmes',
    author: 'Dr. Sophie Martin',
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
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
      alt: 'Prévention cardiovasculaire',
    },
    categories: ['Prévention', 'Santé des femmes'],
    seo: {
      title: 'Prévention des maladies cardiovasculaires chez les femmes',
      description: 'Stratégies de prévention adaptées aux femmes',
    },
  },
  {
    id: '3',
    title: 'L\'importance de l\'exercice physique en cardiologie',
    slug: 'importance-exercice-physique-cardiologie',
    author: 'Dr. Claire Bernard',
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
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      alt: 'Exercice physique',
    },
    categories: ['Prévention', 'Bien-être'],
    seo: {
      title: 'L\'importance de l\'exercice physique en cardiologie',
      description: 'Comment l\'exercice physique améliore la santé cardiaque',
    },
  },
  {
    id: '4',
    title: 'Nouvelles perspectives sur l\'insuffisance cardiaque',
    slug: 'nouvelles-perspectives-insuffisance-cardiaque',
    author: 'Dr. Anne Lefebvre',
    date: subDays(new Date(), 28).toISOString(),
    content: `
      <p>L'insuffisance cardiaque est une condition complexe qui affecte des millions de personnes dans le monde. Les recherches récentes ouvrent de nouvelles perspectives de traitement.</p>
      <h2>Nouveaux médicaments</h2>
      <p>Les inhibiteurs SGLT2 et les antagonistes des récepteurs de l'angiotensine-néprilysine ont révolutionné le traitement de l'insuffisance cardiaque avec fraction d'éjection réduite.</p>
      <h2>Thérapies personnalisées</h2>
      <p>L'approche personnalisée du traitement, basée sur le profil génétique et les biomarqueurs, devient de plus en plus importante.</p>
    `,
    image: {
      url: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop',
      alt: 'Insuffisance cardiaque',
    },
    categories: ['Recherche', 'Traitement'],
    seo: {
      title: 'Nouvelles perspectives sur l\'insuffisance cardiaque',
      description: 'Avancées récentes dans le traitement de l\'insuffisance cardiaque',
    },
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Conférence annuelle 2024',
    date: addMonths(new Date(), 2).toISOString(),
    location: 'Paris, France',
    description: 'Notre conférence annuelle réunira des cardiologues du monde entier pour partager les dernières recherches et innovations en cardiologie. Au programme : conférences plénières, sessions de posters, et ateliers pratiques.',
    image: {
      url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop',
      alt: 'Conférence annuelle',
    },
    registrationLink: 'https://example.com/register',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Atelier sur l\'échocardiographie',
    date: addDays(new Date(), 15).toISOString(),
    location: 'Lyon, France',
    description: 'Atelier pratique d\'une journée sur les techniques avancées d\'échocardiographie. Formation destinée aux cardiologues en exercice souhaitant approfondir leurs compétences.',
    image: {
      url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop',
      alt: 'Échocardiographie',
    },
    registrationLink: 'https://example.com/register-echo',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Séminaire sur la cardiologie préventive',
    date: addDays(new Date(), 30).toISOString(),
    location: 'Marseille, France',
    description: 'Séminaire d\'une demi-journée axé sur les stratégies de prévention primaire et secondaire des maladies cardiovasculaires. Échanges avec des experts du domaine.',
    image: {
      url: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop',
      alt: 'Cardiologie préventive',
    },
    status: 'upcoming',
  },
  {
    id: '4',
    title: 'Symposium sur l\'hypertension artérielle',
    date: subDays(new Date(), 10).toISOString(),
    location: 'Toulouse, France',
    description: 'Symposium réussi sur les dernières avancées dans le diagnostic et le traitement de l\'hypertension artérielle. Plus de 200 participants ont assisté à cet événement.',
    image: {
      url: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop',
      alt: 'Hypertension artérielle',
    },
    status: 'past',
  },
  {
    id: '5',
    title: 'Formation ECG avancée',
    date: subDays(new Date(), 25).toISOString(),
    location: 'Bordeaux, France',
    description: 'Formation intensive de deux jours sur l\'interprétation avancée des électrocardiogrammes. Formation très appréciée par les participants.',
    image: {
      url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
      alt: 'ECG',
    },
    status: 'past',
  },
];

export const mockMembers: Member[] = [
  {
    id: '1',
    firstName: 'Marie',
    lastName: 'Dubois',
    biography: 'Cardiologue interventionnelle avec plus de 15 ans d\'expérience. Spécialisée dans les techniques de revascularisation percutanée et les stents coronariens.',
    specialty: 'Cardiologie interventionnelle',
    role: 'Présidente',
    photo: {
      url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
      alt: 'Dr. Marie Dubois',
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/marie-dubois',
      email: 'marie.dubois@example.com',
    },
  },
  {
    id: '2',
    firstName: 'Sophie',
    lastName: 'Martin',
    biography: 'Cardiologue spécialisée en prévention et santé cardiovasculaire des femmes. Auteure de plusieurs publications sur les facteurs de risque spécifiques aux femmes.',
    specialty: 'Cardiologie préventive',
    role: 'Vice-présidente',
    photo: {
      url: 'https://images.unsplash.com/photo-1594824476969-48dfc0e0e87b?w=400&h=400&fit=crop',
      alt: 'Dr. Sophie Martin',
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sophie-martin',
      twitter: 'https://twitter.com/sophiemartin',
      email: 'sophie.martin@example.com',
    },
  },
  {
    id: '3',
    firstName: 'Claire',
    lastName: 'Bernard',
    biography: 'Cardiologue spécialisée en réadaptation cardiaque et médecine du sport. Coordonne plusieurs programmes de réadaptation cardiaque dans la région.',
    specialty: 'Réadaptation cardiaque',
    photo: {
      url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
      alt: 'Dr. Claire Bernard',
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/claire-bernard',
      email: 'claire.bernard@example.com',
    },
  },
  {
    id: '4',
    firstName: 'Anne',
    lastName: 'Lefebvre',
    biography: 'Cardiologue spécialisée en insuffisance cardiaque et transplantation cardiaque. Membre du comité scientifique de plusieurs revues internationales.',
    specialty: 'Insuffisance cardiaque',
    photo: {
      url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop',
      alt: 'Dr. Anne Lefebvre',
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/anne-lefebvre',
      email: 'anne.lefebvre@example.com',
    },
  },
  {
    id: '5',
    firstName: 'Isabelle',
    lastName: 'Moreau',
    biography: 'Cardiologue pédiatrique avec une expertise particulière dans les cardiopathies congénitales. Enseigne à l\'université et supervise des recherches cliniques.',
    specialty: 'Cardiologie pédiatrique',
    photo: {
      url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop',
      alt: 'Dr. Isabelle Moreau',
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/isabelle-moreau',
      email: 'isabelle.moreau@example.com',
    },
  },
  {
    id: '6',
    firstName: 'Julie',
    lastName: 'Petit',
    biography: 'Cardiologue spécialisée en rythmologie et électrophysiologie. Expert en ablation des arythmies et implantation de dispositifs cardiaques.',
    specialty: 'Rythmologie',
    photo: {
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      alt: 'Dr. Julie Petit',
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/julie-petit',
      email: 'julie.petit@example.com',
    },
  },
];

export const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Guide de prévention cardiovasculaire 2024',
    type: 'pdf',
    description: 'Guide complet sur les stratégies de prévention primaire et secondaire des maladies cardiovasculaires, avec des recommandations basées sur les dernières études.',
    category: 'Guides cliniques',
    file: {
      url: 'https://example.com/guides/prevention-2024.pdf',
      filename: 'prevention-2024.pdf',
    },
  },
  {
    id: '2',
    title: 'Protocole de réadaptation cardiaque',
    type: 'pdf',
    description: 'Protocole standardisé pour les programmes de réadaptation cardiaque, incluant les exercices recommandés et le suivi des patients.',
    category: 'Guides cliniques',
    file: {
      url: 'https://example.com/guides/readaptation.pdf',
      filename: 'readaptation.pdf',
    },
  },
  {
    id: '3',
    title: 'Recommandations ESC 2023 - Insuffisance cardiaque',
    type: 'link',
    description: 'Lien vers les dernières recommandations de la Société Européenne de Cardiologie sur la prise en charge de l\'insuffisance cardiaque.',
    category: 'Recommandations',
    link: 'https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines',
  },
  {
    id: '4',
    title: 'Webinaire : Échocardiographie avancée',
    type: 'video',
    description: 'Enregistrement d\'un webinaire de 2 heures sur les techniques avancées d\'échocardiographie, incluant des cas cliniques pratiques.',
    category: 'Formation',
    link: 'https://example.com/videos/echo-avance',
  },
  {
    id: '5',
    title: 'Atlas d\'électrocardiographie',
    type: 'pdf',
    description: 'Atlas complet avec plus de 200 tracés ECG commentés, couvrant les principales pathologies cardiaques.',
    category: 'Guides cliniques',
    file: {
      url: 'https://example.com/guides/atlas-ecg.pdf',
      filename: 'atlas-ecg.pdf',
    },
  },
  {
    id: '6',
    title: 'Cours en ligne : Cardiologie d\'urgence',
    type: 'video',
    description: 'Formation en ligne de 10 heures sur la prise en charge des urgences cardiologiques, avec simulations et cas pratiques.',
    category: 'Formation',
    link: 'https://example.com/videos/urgence',
  },
  {
    id: '7',
    title: 'Recommandations AHA - Hypertension artérielle',
    type: 'link',
    description: 'Lien vers les recommandations de l\'American Heart Association sur le diagnostic et le traitement de l\'hypertension artérielle.',
    category: 'Recommandations',
    link: 'https://www.heart.org/en/health-topics/high-blood-pressure',
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    author: 'Dr. Patricia Rousseau',
    role: 'Cardiologue, Hôpital de Paris',
    content: 'Rejoindre cette association a été une décision transformatrice pour ma carrière. Le réseau de soutien et les opportunités de développement professionnel sont exceptionnels.',
    date: subDays(new Date(), 5).toISOString(),
    photo: {
      url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop',
      alt: 'Dr. Patricia Rousseau',
    },
  },
  {
    id: '2',
    author: 'Dr. Camille Durand',
    role: 'Cardiologue interventionnelle, Lyon',
    content: 'Les conférences et ateliers organisés par l\'association sont toujours de très haute qualité. J\'ai appris énormément et rencontré des collègues formidables.',
    date: subDays(new Date(), 15).toISOString(),
    photo: {
      url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop',
      alt: 'Dr. Camille Durand',
    },
  },
  {
    id: '3',
    author: 'Dr. Émilie Girard',
    role: 'Cardiologue pédiatrique, Marseille',
    content: 'En tant que jeune cardiologue, l\'association m\'a offert un mentorat précieux et m\'a aidée à développer mes compétences cliniques et de recherche.',
    date: subDays(new Date(), 30).toISOString(),
    photo: {
      url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop',
      alt: 'Dr. Émilie Girard',
    },
  },
];

