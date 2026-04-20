import { defineType, defineField } from "sanity";

export default defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titre",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug URL",
      description: "Identifiant unique pour l'URL (généré automatiquement depuis le titre)",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      type: "reference",
      title: "Auteur",
      description: "Sélectionnez un membre de l'association",
      to: [{ type: "member" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Date de publication",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Image principale",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Texte alternatif",
          description: "Description de l'image pour l'accessibilité",
          validation: (Rule) =>
            Rule.custom((alt, context) => {
              const parent = context.parent as { asset?: unknown } | undefined;
              if (parent?.asset && (!alt || !String(alt).trim())) {
                return "Texte alternatif requis lorsqu'une image est définie";
              }
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: "body",
      type: "blockContent",
      title: "Contenu de l'article",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      type: "array",
      title: "Catégories",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Recherche", value: "research" },
          { title: "Clinique", value: "clinical" },
          { title: "Actualités", value: "news" },
          { title: "Prévention", value: "prevention" },
        ],
      },
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "Référencement (SEO)",
    }),
  ],
  preview: {
    select: { title: "title", author: "author.firstName", date: "publishedAt" },
    prepare({ title, author, date }) {
      return {
        title,
        subtitle: `${author || "Inconnu"} • ${date ? new Date(date).toLocaleDateString("fr-FR") : ""}`,
      };
    },
  },
});
