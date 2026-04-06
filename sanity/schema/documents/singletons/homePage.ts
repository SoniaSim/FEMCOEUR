import { defineType, defineField } from "sanity";

export default defineType({
  name: "homePage",
  title: "Page d'accueil",
  type: "document",
  fields: [
    defineField({
      name: "welcome",
      title: "Section d'accueil",
      type: "object",
      fields: [
        defineField({
          name: "titlePrefix",
          title: "Début du titre (en noir)",
          type: "string",
          description: "Ex : « Bienvenue au sein du premier réseau français de »",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "titleHighlight",
          title: "Partie colorée du titre (en rose)",
          type: "string",
          description: "Ex : « femmes médecins et chirurgiennes cardiovasculaires »",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subtitle",
          title: "Sous-titre",
          type: "blockContent",
        }),
      ],
    }),
    defineField({
      name: "whyFeminine",
      title: "Section « Pourquoi féminin ? »",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string", validation: (Rule) => Rule.required() }),
        defineField({
          name: "items",
          title: "Raisons",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "text", title: "Texte", type: "text", validation: (Rule) => Rule.required() }),
                defineField({ name: "icon", title: "Icône", type: "iconPicker" }),
              ],
              preview: {
                select: { text: "text" },
                prepare({ text }) { return { title: text }; },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "whatWeDo",
      title: "Section « Ce que nous faisons »",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string", validation: (Rule) => Rule.required() }),
        defineField({
          name: "items",
          title: "Actions",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", title: "Titre", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "description", title: "Description", type: "string" }),
                defineField({ name: "icon", title: "Icône", type: "iconPicker" }),
              ],
              preview: {
                select: { title: "title" },
                prepare({ title }) { return { title }; },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "callToAction",
      title: "Section « Appel à l'action »",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string" }),
        defineField({ name: "subtitle", title: "Sous-titre", type: "string" }),
        defineField({
          name: "items",
          title: "CTAs",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", title: "Titre", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "description", title: "Description", type: "string" }),
                defineField({ name: "icon", title: "Icône", type: "iconPicker" }),
                defineField({ name: "buttonLabel", title: "Texte du bouton", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "href", title: "Lien", type: "string", validation: (Rule) => Rule.required() }),
                defineField({
                  name: "variant",
                  title: "Style du bouton",
                  type: "string",
                  options: { list: [{ title: "Plein", value: "default" }, { title: "Contour", value: "outline" }] },
                  initialValue: "default",
                }),
              ],
              preview: {
                select: { title: "title" },
                prepare({ title }) { return { title }; },
              },
            },
          ],
        }),
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
      return { title: "Page d'accueil" };
    },
  },
});
