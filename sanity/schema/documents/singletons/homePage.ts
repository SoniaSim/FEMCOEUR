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
        defineField({ name: "body", title: "Contenu", type: "blockContent" }),
      ],
    }),
    defineField({
      name: "whatWeDo",
      title: "Section « Ce que nous faisons »",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "body", title: "Contenu", type: "blockContent" }),
      ],
    }),
    defineField({
      name: "callToAction",
      title: "Appel à l'action",
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
      return { title: "Page d'accueil" };
    },
  },
});
