import { defineType, defineField } from "sanity";

export default defineType({
  name: "resource",
  title: "Ressource",
  type: "document",
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
