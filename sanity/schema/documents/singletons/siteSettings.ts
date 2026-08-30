import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  fields: [
    defineField({
      name: "associationName",
      title: "Nom de l'association",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Baseline / Tagline",
      type: "string",
      description: "Phrase courte décrivant la mission. Utilisée dans le footer et le SEO.",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "shortMission",
      title: "Mission courte",
      type: "text",
      description: "Paragraphe court décrivant la mission. Utilisé dans le footer et les méta-données.",
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "contactEmails",
      title: "Emails de contact",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Intitulé", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "email", title: "Adresse email", type: "string", validation: (Rule) => Rule.required().email() }),
            defineField({ name: "description", title: "Description", type: "string" }),
            defineField({ name: "icon", title: "Icône", type: "iconPicker" }),
          ],
          preview: {
            select: { label: "label", email: "email" },
            prepare({ label, email }) {
              return { title: label, subtitle: email };
            },
          },
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Réseaux sociaux",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "newsletter",
      title: "Newsletter (section « Restons en contact »)",
      description:
        "Textes du bloc d'inscription. La mention légale (RGPD) et le lien vers la politique de confidentialité ne sont pas modifiables ici : ils engagent l'association et restent dans le code.",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Titre de la section",
          type: "string",
          description: "Ex : « Restons en contact »",
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: "description",
          title: "Promesse",
          type: "text",
          rows: 2,
          description:
            "Ce que la visiteuse recevra. Éviter d'annoncer une fréquence qui ne serait pas tenue. Ex : « Quelques mails par an : nos événements, nos publications et la vie du réseau. »",
          validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
          name: "buttonLabel",
          title: "Libellé du bouton",
          type: "string",
          description: "Ex : « S'inscrire ». Laisser vide pour utiliser « S'inscrire ».",
          validation: (Rule) => Rule.max(30),
        }),
      ],
    }),
    defineField({
      name: "footerColumns",
      title: "Colonnes du footer",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titre de la colonne", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "links",
              title: "Liens",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "label", title: "Texte", type: "string", validation: (Rule) => Rule.required() }),
                    defineField({ name: "href", title: "Lien", type: "string", validation: (Rule) => Rule.required() }),
                  ],
                  preview: {
                    select: { label: "label", href: "href" },
                    prepare({ label, href }) {
                      return { title: label, subtitle: href };
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "title" },
            prepare({ title }) {
              return { title };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Réglages du site" };
    },
  },
});
