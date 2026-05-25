import { defineType, defineField } from "sanity";

export default defineType({
  name: "member",
  title: "Membre",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      type: "string",
      title: "Prénom",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastName",
      type: "string",
      title: "Nom",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "specialty",
      type: "string",
      title: "Spécialité",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "biography",
      type: "blockContent",
      title: "Biographie",
    }),
    defineField({
      name: "photo",
      type: "image",
      title: "Photo",
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
                return "Texte alternatif requis lorsqu'une photo est définie";
              }
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: "role",
      type: "string",
      title: "Rôle au bureau",
      description: "Laisser vide si le membre ne fait pas partie du bureau",
      options: {
        list: [
          { title: "Présidente", value: "presidente" },
          { title: "Vice-Présidente", value: "vice-presidente" },
          { title: "Trésorière", value: "tresoriere" },
          { title: "Trésorière adjointe", value: "tresoriere-adjointe" },
          { title: "Secrétaire", value: "secretaire" },
          { title: "Secrétaire adjointe", value: "secretaire-adjointe" },
          { title: "Membre du bureau", value: "membre-bureau" },
        ],
      },
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (value == null || String(value).trim() === "") return true;
          const s = String(value).trim();
          const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
          return ok || "Adresse email invalide";
        }),
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Téléphone",
    }),
    defineField({
      name: "linkedin",
      type: "url",
      title: "LinkedIn",
    }),
  ],
  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      subtitle: "specialty",
    },
    prepare({ firstName, lastName, subtitle }) {
      return {
        title: `${firstName} ${lastName}`,
        subtitle,
      };
    },
  },
});
