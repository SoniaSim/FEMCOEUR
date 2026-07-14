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
        defineField({
          name: "images",
          title: "Photos (sous le manifeste)",
          description:
            "1 à 3 photos inclinées façon polaroïd, affichées sous le texte de mission. 2 ou 3 rendent le mieux. Section masquée si vide.",
          type: "array",
          validation: (Rule) => Rule.max(3),
          of: [
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  type: "string",
                  title: "Texte alternatif",
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
            },
          ],
        }),
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
