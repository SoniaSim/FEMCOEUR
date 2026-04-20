import type { StructureBuilder } from "sanity/structure";

const SINGLETONS = [
  "siteSettings",
  "homePage",
  "aboutPage",
  "contactPage",
  "joinPage",
];

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("⚙️ Réglages du site")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Réglages du site")
        ),
      S.divider(),
      S.listItem()
        .title("🏠 Page d'accueil")
        .id("homePage")
        .child(
          S.document()
            .schemaType("homePage")
            .documentId("homePage")
            .title("Page d'accueil")
        ),
      S.listItem()
        .title("📖 Page À propos")
        .id("aboutPage")
        .child(
          S.document()
            .schemaType("aboutPage")
            .documentId("aboutPage")
            .title("Page À propos")
        ),
      S.listItem()
        .title("📬 Page Contact")
        .id("contactPage")
        .child(
          S.document()
            .schemaType("contactPage")
            .documentId("contactPage")
            .title("Page Contact")
        ),
      S.listItem()
        .title("🤝 Page Rejoindre")
        .id("joinPage")
        .child(
          S.document()
            .schemaType("joinPage")
            .documentId("joinPage")
            .title("Page Rejoindre")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() ?? "")
      ),
    ]);
