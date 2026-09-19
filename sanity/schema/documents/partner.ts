import { defineType, defineField } from "sanity";

export const PARTNER_KINDS = [
  { title: "Marraine", value: "marraine" },
  { title: "Partenaire", value: "partenaire" },
  { title: "Soutien", value: "soutien" },
] as const;

export default defineType({
  name: "partner",
  title: "Partenaire",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      description:
        "« Marraine » : mise en avant sur la page À propos (section « Notre association marraine ») et dans le footer. Les autres types apparaissent uniquement dans le footer.",
      initialValue: "partenaire",
      options: { list: [...PARTNER_KINDS], layout: "radio" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Idéalement SVG ou PNG sur fond transparent.",
      options: { hotspot: false },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          type: "string",
          description: "Ex : « Logo Donner des ELLES à la Santé ».",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Phrase courte",
      type: "string",
      description:
        "Une ligne pour résumer qui elles sont. Ex : « Pour l'égalité femmes-hommes dans la santé ».",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "description",
      title: "Présentation",
      type: "blockContent",
      description:
        "Texte affiché sur la page À propos (marraine uniquement) : qui elles sont, ce que signifie ce lien pour FEMCOEUR.",
    }),
    defineField({
      name: "website",
      title: "Site web",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "featuredLink",
      title: "Lien mis en avant",
      type: "object",
      description:
        "Optionnel. Une page chez le partenaire qui parle de FEMCOEUR (ex : l'article sur le marrainage).",
      fields: [
        defineField({
          name: "label",
          title: "Texte du bouton",
          type: "string",
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: "url",
          title: "URL",
          type: "url",
          validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description:
        "Plus petit = affiché en premier. Les marraines passent toujours avant.",
      initialValue: 10,
    }),
    defineField({
      name: "active",
      title: "Affiché sur le site",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", kind: "kind", media: "logo", active: "active" },
    prepare({ title, kind, media, active }) {
      const kindLabel =
        PARTNER_KINDS.find((k) => k.value === kind)?.title ?? kind;
      return {
        title,
        subtitle: active === false ? `${kindLabel} · masqué` : kindLabel,
        media,
      };
    },
  },
});
