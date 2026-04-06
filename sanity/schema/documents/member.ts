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
          { title: "Secrétaire", value: "secretaire" },
        ],
      },
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
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
