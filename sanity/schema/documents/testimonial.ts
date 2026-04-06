import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Nom",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      title: "Fonction / Titre",
    }),
    defineField({
      name: "content",
      type: "text",
      title: "Texte du témoignage",
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Photo",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Texte alternatif",
        }),
      ],
    }),
  ],
});
