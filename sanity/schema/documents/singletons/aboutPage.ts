import { defineType, defineField } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "Page À propos",
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
      name: "mission",
      title: "Section mission",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "body", title: "Contenu", type: "blockContent" }),
      ],
    }),
    defineField({
      name: "history",
      title: "Section histoire",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "body", title: "Contenu", type: "blockContent" }),
      ],
    }),
    defineField({
      name: "values",
      title: "Valeurs de l'association",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titre", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", validation: (Rule) => Rule.required() }),
            defineField({ name: "icon", title: "Icône", type: "iconPicker" }),
          ],
          preview: {
            select: { title: "title", icon: "icon" },
            prepare({ title, icon }) {
              return { title, subtitle: icon };
            },
          },
        },
      ],
    }),
    defineField({
      name: "keyActions",
      title: "Actions clés",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titre", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", validation: (Rule) => Rule.required() }),
            defineField({ name: "icon", title: "Icône", type: "iconPicker" }),
          ],
          preview: {
            select: { title: "title", icon: "icon" },
            prepare({ title, icon }) {
              return { title, subtitle: icon };
            },
          },
        },
      ],
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
      return { title: "Page À propos" };
    },
  },
});
