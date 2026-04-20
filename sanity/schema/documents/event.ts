import { defineType, defineField } from "sanity";

export default defineType({
  name: "event",
  title: "Événement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titre",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug URL",
      description: "Identifiant unique pour l'URL",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDate",
      type: "datetime",
      title: "Date de début",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      type: "datetime",
      title: "Date de fin",
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const start = context.document?.startDate as string | undefined;
          if (!endDate || !start) return true;
          if (new Date(endDate) < new Date(start)) {
            return "La date de fin doit être postérieure ou égale à la date de début";
          }
          return true;
        }),
    }),
    defineField({
      name: "location",
      type: "string",
      title: "Lieu",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "blockContent",
      title: "Description",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Image de l'événement",
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
      name: "registrationLink",
      type: "url",
      title: "Lien d'inscription",
      description: "URL vers le formulaire d'inscription",
    }),
    defineField({
      name: "status",
      type: "string",
      title: "Statut",
      initialValue: "upcoming",
      options: {
        list: [
          { title: "À venir", value: "upcoming" },
          { title: "Passé", value: "past" },
          { title: "Annulé", value: "cancelled" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "Référencement (SEO)",
    }),
  ],
});
