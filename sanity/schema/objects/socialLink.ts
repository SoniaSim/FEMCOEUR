import { defineType, defineField } from "sanity";

export default defineType({
  name: "socialLink",
  title: "Lien réseau social",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Plateforme",
      type: "string",
      options: {
        list: [
          { title: "LinkedIn", value: "linkedin" },
          { title: "Twitter / X", value: "twitter" },
          { title: "Instagram", value: "instagram" },
          { title: "Facebook", value: "facebook" },
          { title: "YouTube", value: "youtube" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { platform: "platform", url: "url" },
    prepare({ platform, url }) {
      return { title: platform, subtitle: url };
    },
  },
});
