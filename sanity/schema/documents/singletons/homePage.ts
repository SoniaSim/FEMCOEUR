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
          description: "Ex : « Bienvenue au sein de l'association de »",
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
          name: "tagline",
          title: "Accroche (sous le titre)",
          type: "text",
          rows: 2,
          description:
            "Phrase d'accroche affichée sous « FEMCOEUR » dans le hero. Ex : « Faire entendre la voix des femmes en cardiologie, pour une médecine plus juste, inclusive et représentative. »",
          validation: (Rule) => Rule.max(180),
        }),
        defineField({
          name: "heroImage",
          title: "Photo du hero",
          type: "image",
          description:
            "Photo de couverture affichée à droite du titre. ⚠️ JPG ou PNG (pas de .HEIC). Privilégier une photo lumineuse de la communauté.",
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
        }),
        defineField({
          name: "subtitle",
          title: "Sous-titre",
          type: "blockContent",
        }),
      ],
    }),
    defineField({
      name: "keyStats",
      title: "Chiffres-clés (bande engagée)",
      description:
        "Bande de statistiques sur fond navy. Masquée s'il y a moins de 2 chiffres.",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Sur-titre (petit badge au-dessus)",
          type: "string",
          description: "Ex : « La réalité en chiffres »",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "title",
          title: "Titre de la bande",
          type: "string",
          description: "Ex : « Le cœur des femmes nous concerne toutes »",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "items",
          title: "Statistiques",
          description:
            "2 à 5 statistiques sourcées. La bande est masquée s'il y en a moins de 2.",
          type: "array",
          validation: (Rule) => Rule.min(2).max(5),
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "value",
                  title: "Valeur",
                  type: "string",
                  description: "Ex : « 1 sur 3 », « 56 % », « ×3 »",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "label",
                  title: "Libellé",
                  type: "string",
                  description:
                    "Ex : « des décès féminins sont d'origine cardiovasculaire »",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "sourceLabel",
                  title: "Source",
                  type: "string",
                  description: "Ex : « ESC, 2024 »",
                }),
                defineField({
                  name: "sourceUrl",
                  title: "Lien source (optionnel)",
                  type: "url",
                }),
              ],
              preview: {
                select: { title: "value", subtitle: "label" },
              },
            },
          ],
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
                defineField({ name: "title", title: "Titre (ex : Notre Combat)", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "text", title: "Description", type: "text", validation: (Rule) => Rule.required() }),
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
