import { defineType, defineField } from "sanity";

export default defineType({
  name: "seo",
  title: "Référencement (SEO)",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titre SEO",
      description:
        "Titre affiché dans les résultats Google (60 caractères max)",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description SEO",
      description:
        "Description affichée dans les résultats Google (160 caractères max)",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image de partage",
      description: "Image affichée lors du partage sur les réseaux sociaux",
    }),
  ],
});
