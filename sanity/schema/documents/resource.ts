import { defineType, defineField } from "sanity";

export default defineType({
  name: "resource",
  title: "Ressource",
  type: "document",
  validation: (Rule) =>
    Rule.custom((doc) => {
      if (!doc || typeof doc !== "object") return true;
      const d = doc as {
        type?: string;
        file?: { asset?: unknown } | null;
        link?: string | null;
      };
      if (d.type === "pdf") {
        if (!d.file?.asset) {
          return "Ajoutez un fichier PDF pour une ressource de type PDF";
        }
      }
      if (d.type === "link" || d.type === "video") {
        if (d.link == null || String(d.link).trim() === "") {
          return "Ajoutez une URL pour une ressource de type lien ou vidéo";
        }
      }
      return true;
    }),
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titre",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
    }),
    defineField({
      name: "type",
      type: "string",
      title: "Type de ressource",
      options: {
        list: [
          { title: "PDF", value: "pdf" },
          { title: "Lien externe", value: "link" },
          { title: "Vidéo", value: "video" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Catégorie",
      options: {
        list: [
          { title: "Guides cliniques", value: "guides-cliniques" },
          { title: "Recommandations", value: "recommandations" },
          { title: "Formation", value: "formation" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "file",
      type: "file",
      title: "Fichier PDF",
      description: "Uniquement pour les ressources de type PDF",
    }),
    defineField({
      name: "link",
      type: "url",
      title: "Lien externe",
      description: "Pour les liens et vidéos",
    }),
  ],
});
