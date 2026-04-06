import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { randomUUID } from "crypto";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-03-04",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

// Helper: generate a unique key for Portable Text blocks
function key() {
  return randomUUID().slice(0, 12);
}

// Helper: convert simple text to a Portable Text block
function textBlock(
  text: string,
  style: "normal" | "h2" | "h3" | "h4" | "blockquote" = "normal"
) {
  return {
    _type: "block" as const,
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span" as const, _key: key(), text, marks: [] }],
  };
}

// Helper: convert simple HTML-like content to Portable Text blocks
function htmlToBlocks(html: string) {
  const blocks: ReturnType<typeof textBlock>[] = [];
  const lines = html
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  for (const line of lines) {
    // Strip HTML tags and detect style
    if (line.startsWith("<h2>")) {
      blocks.push(textBlock(line.replace(/<\/?h2>/g, ""), "h2"));
    } else if (line.startsWith("<h3>")) {
      blocks.push(textBlock(line.replace(/<\/?h3>/g, ""), "h3"));
    } else if (line.startsWith("<li>")) {
      const text = line.replace(/<\/?li>/g, "").replace(/<\/?strong>/g, "").replace(/<\/?em>/g, "");
      blocks.push(textBlock(`• ${text}`));
    } else if (line.startsWith("<p>") || line.startsWith("<p><")) {
      const text = line
        .replace(/<\/?p>/g, "")
        .replace(/<\/?strong>/g, "")
        .replace(/<\/?em>/g, "")
        .replace(/<\/?a[^>]*>/g, "")
        .replace(/<\/?ul>/g, "")
        .trim();
      if (text) blocks.push(textBlock(text));
    } else if (!line.startsWith("<ul") && !line.startsWith("</ul") && !line.startsWith("</")) {
      const text = line.replace(/<[^>]*>/g, "").trim();
      if (text) blocks.push(textBlock(text));
    }
  }

  return blocks;
}

// ── Data to seed ──────────────────────────────────────────────

const articles = [
  {
    _type: "article",
    title: "La 1ère Journée FemCœur : quand les femmes cardiologues prennent la parole",
    slug: { _type: "slug", current: "premiere-journee-femcoeur-retour" },
    author: "Équipe FEMCOEUR",
    publishedAt: new Date(Date.now() - 90 * 86400000).toISOString(),
    body: htmlToBlocks(`
      <p>Plus de 150 femmes médecins et chirurgiennes cardiovasculaires réunies. Des témoignages forts. Des chiffres qui interpellent. Des solutions concrètes.</p>
      <p>Retour sur la première Journée FemCœur, un moment historique pour notre profession.</p>
      <h2>Des témoignages qui résonnent</h2>
      <p>La journée s'ouvre sur des prises de parole courageuses. Cinq membres du bureau partagent leur vécu du sexisme médical.</p>
      <p>Ces mots résonnent dans toute la salle. FEMCOEUR est née le 15 mars 2025 pour dire : ça suffit.</p>
      <h2>Les chiffres qui choquent</h2>
      <p>78% des femmes médecins ont subi des discriminations sexistes. Le baromètre national 2025 ne laisse aucun doute.</p>
      <p>En cardiologie : 33% de femmes, mais seulement 10% en interventionnel et 8% à la tête de services de CHU.</p>
      <h2>Rejoignez le mouvement</h2>
      <p>FEMCOEUR, c'est un réseau solidaire qui refuse les discriminations et œuvre pour l'égalité.</p>
      <p>Adhésion 2026 : 50 €</p>
    `),
    categories: ["news"],
  },
  {
    _type: "article",
    title: "Infarctus au féminin : repérer les symptômes atypiques pour sauver des vies",
    slug: { _type: "slug", current: "infarctus-feminin-symptomes-atypiques" },
    author: "Dre Thiziri Si Moussi",
    publishedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    body: htmlToBlocks(`
      <p>Contrairement aux idées reçues, l'infarctus du myocarde ne se manifeste pas toujours par la fameuse douleur thoracique irradiant dans le bras gauche. Chez les femmes, les symptômes sont souvent plus subtils et atypiques.</p>
      <h2>Des signes d'alerte trop souvent méconnus</h2>
      <p>Les femmes victimes d'un infarctus présentent fréquemment des symptômes moins classiques :</p>
      <li>Fatigue intense et inexpliquée pendant plusieurs jours</li>
      <li>Douleurs dans la mâchoire, le dos ou l'estomac</li>
      <li>Nausées, vomissements, vertiges</li>
      <li>Essoufflement inhabituel</li>
      <h2>Pourquoi ces différences ?</h2>
      <p>Les artères coronaires des femmes sont souvent plus petites. Les femmes développent davantage de microcirculation coronaire défaillante. Les variations hormonales influencent la réponse cardiovasculaire.</p>
      <h2>En cas de doute : agissez vite !</h2>
      <p>Si vous ressentez ces symptômes de manière inhabituelle, appelez le 15 immédiatement. Chaque minute compte.</p>
    `),
    categories: ["prevention"],
  },
];

const events = [
  {
    _type: "event",
    title: "2ème Journée FemCœur",
    slug: { _type: "slug", current: "2eme-journee-femcoeur-2026" },
    startDate: "2026-11-21T09:00:00.000Z",
    location: "Paris, France",
    description: htmlToBlocks(`
      <p>La deuxième édition de la Journée FemCœur réunira cardiologues, médecins vasculaires et chirurgiennes cardiovasculaires pour échanger sur les avancées en cardiologie au féminin.</p>
      <p>Au programme : conférences scientifiques, ateliers pratiques et moments de networking pour renforcer notre réseau national.</p>
    `),
    registrationLink: "https://example.com/register",
    status: "upcoming",
  },
  {
    _type: "event",
    title: "1ère Journée FemCœur",
    slug: { _type: "slug", current: "1ere-journee-femcoeur" },
    startDate: new Date(Date.now() - 90 * 86400000).toISOString(),
    location: "Paris, France",
    description: htmlToBlocks(`
      <p>La première édition de la Journée FemCœur a marqué une étape importante dans le développement de l'association.</p>
      <p>Plus de 150 cardiologues femmes se sont réunies pour échanger sur les enjeux de la cardiologie au féminin et créer un réseau national solide.</p>
    `),
    status: "past",
  },
];

const members = [
  {
    _type: "member",
    firstName: "Thiziri",
    lastName: "Si Moussi",
    specialty: "Cardiologie",
    biography: htmlToBlocks(
      "<p>Présidente de FEMCOEUR, engagée pour la visibilité et la reconnaissance des femmes cardiologues en France.</p>"
    ),
    role: "presidente",
    email: "contact@femcoeur.fr",
  },
  {
    _type: "member",
    firstName: "Isabelle",
    lastName: "Corman",
    specialty: "Cardiologie",
    biography: htmlToBlocks(
      "<p>Vice-présidente de FEMCOEUR, impliquée dans les projets de recherche sur les inégalités de genre en cardiologie.</p>"
    ),
    role: "vice-presidente",
    email: "contact@femcoeur.fr",
  },
  {
    _type: "member",
    firstName: "Anne-Céline",
    lastName: "Martin",
    specialty: "Cardiologie",
    biography: htmlToBlocks(
      "<p>Secrétaire de FEMCOEUR, assure le bon fonctionnement administratif de l'association.</p>"
    ),
    role: "secretaire",
    email: "contact@femcoeur.fr",
  },
  {
    _type: "member",
    firstName: "Mathilde",
    lastName: "Baudet",
    specialty: "Cardiologie",
    biography: htmlToBlocks(
      "<p>Trésorière de FEMCOEUR, pilote la commission enquête nationale sur les inégalités de genre en cardiologie.</p>"
    ),
    role: "tresoriere",
    email: "contact@femcoeur.fr",
  },
  {
    _type: "member",
    firstName: "Pauline",
    lastName: "Marchal",
    specialty: "Cardiologie",
    biography: htmlToBlocks(
      "<p>Secrétaire adjointe de FEMCOEUR, contribue activement à l'organisation des événements.</p>"
    ),
    email: "contact@femcoeur.fr",
  },
];

const pages = [
  {
    _type: "page",
    title: "Bienvenue à FEMCOEUR",
    slug: { _type: "slug", current: "home" },
    content: htmlToBlocks(`
      <p>FEMCOEUR est une organisation dédiée à la promotion de l'excellence en cardiologie et au soutien des femmes cardiologues à travers le monde.</p>
      <p>Notre mission est de créer un réseau solide de professionnelles, de partager les connaissances et les meilleures pratiques, et d'encourager les jeunes femmes à poursuivre une carrière en cardiologie.</p>
      <p>Rejoignez-nous pour faire partie d'une communauté dynamique qui façonne l'avenir de la cardiologie.</p>
    `),
  },
  {
    _type: "page",
    title: "À propos de nous",
    slug: { _type: "slug", current: "about" },
    content: htmlToBlocks(`
      <p>FEMCOEUR a été fondée en 2015 avec pour objectif de créer un espace où les femmes cardiologues peuvent se connecter, partager leurs expériences et grandir professionnellement.</p>
      <p>Nous organisons régulièrement des conférences, des ateliers et des événements de réseautage pour nos membres.</p>
    `),
  },
  {
    _type: "page",
    title: "Nous rejoindre",
    slug: { _type: "slug", current: "join" },
    content: htmlToBlocks(`
      <p>Rejoignez FEMCOEUR et faites partie du premier réseau français de cardiologues femmes.</p>
      <p>En adhérant, vous bénéficiez de mentorat, de formations spécialisées et d'un soutien concret. Vous participez à des projets de recherche et gagnez en visibilité dans votre spécialité.</p>
      <p>Adhésion 2026 : 50 €</p>
    `),
  },
];

const testimonials = [
  {
    _type: "testimonial",
    name: "Dr. Patricia Rousseau",
    role: "Cardiologue, Hôpital de Paris",
    content:
      "Rejoindre cette association a été une décision transformatrice pour ma carrière. Le réseau de soutien et les opportunités de développement professionnel sont exceptionnels.",
  },
  {
    _type: "testimonial",
    name: "Dr. Camille Durand",
    role: "Cardiologue interventionnelle, Lyon",
    content:
      "Les conférences et ateliers organisés par l'association sont toujours de très haute qualité. J'ai appris énormément et rencontré des collègues formidables.",
  },
];

// ── Seed function ──────────────────────────────────────────────

async function seed() {
  console.log("🌱 Seeding Sanity...\n");

  const transaction = client.transaction();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const doc of [...articles, ...events, ...members, ...pages, ...testimonials] as any[]) {
    transaction.create(doc);
  }

  const result = await transaction.commit();
  console.log(`✅ ${result.results.length} documents created!\n`);

  console.log("  📝 2 articles");
  console.log("  📅 2 events");
  console.log("  👤 5 members");
  console.log("  📄 3 pages");
  console.log("  💬 2 testimonials");
  console.log("\n🎉 Done! Check your Studio at http://localhost:3000/studio");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
