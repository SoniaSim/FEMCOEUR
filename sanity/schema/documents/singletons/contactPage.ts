import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Page Contact",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Section hero",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "subtitle", title: "Sous-titre", type: "text" }),
      ],
    }),
    defineField({
      name: "formIntro",
      title: "Introduction du formulaire",
      type: "text",
      description: "Texte affiché au-dessus du formulaire de contact.",
    }),
    defineField({
      name: "contactInfoTitle",
      title: "Titre de la section contacts",
      type: "string",
      initialValue: "Nos différents contacts",
    }),
    defineField({
      name: "seo",
      title: "Référencement (SEO)",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre SEO", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "description", title: "Description SEO", type: "text", validation: (Rule) => Rule.required() }),
        defineField({ name: "ogImage", title: "Image OG", type: "image" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Page Contact" };
    },
  },
});
