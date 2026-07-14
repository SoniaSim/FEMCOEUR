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
        defineField({
          name: "cta",
          title: "Bouton sous le texte d'introduction",
          description: "Si vide, le bouton par défaut « Devenir membre » pointe vers la section adhésion de la même page.",
          type: "ctaButton",
        }),
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
      name: "testimonials",
      title: "Témoignages affichés",
      description:
        "Sélectionnez et ordonnez 1 à 3 témoignages de membres. La section est masquée si aucun n'est sélectionné.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
      validation: (Rule) => Rule.max(3),
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
