import { defineType, defineField } from "sanity";

export default defineType({
  name: "ctaButton",
  title: "Bouton d'action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Texte du bouton",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Lien",
      type: "string",
      description: "URL relative (ex: /join) ou absolue",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { label: "label", href: "href" },
    prepare({ label, href }) {
      return { title: label, subtitle: href };
    },
  },
});
