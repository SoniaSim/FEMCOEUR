import { defineType, defineField } from "sanity";

export default defineType({
  name: "joinPage",
  title: "Page Rejoindre",
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
      name: "whyJoin",
      title: "Pourquoi nous rejoindre",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "body", title: "Contenu", type: "blockContent", description: "Utilisez les listes à puces natives pour énumérer les bénéfices." }),
      ],
    }),
    defineField({
      name: "modalities",
      title: "Modalités d'adhésion",
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
      name: "membershipFee",
      title: "Cotisation annuelle",
      type: "object",
      fields: [
        defineField({ name: "amount", title: "Montant (€)", type: "number", validation: (Rule) => Rule.required().min(0) }),
        defineField({ name: "year", title: "Année", type: "number", validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Appel à l'action final",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string" }),
        defineField({ name: "body", title: "Texte", type: "text" }),
        defineField({ name: "button", title: "Bouton", type: "ctaButton" }),
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
      return { title: "Page Rejoindre" };
    },
  },
});
