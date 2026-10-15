import { defineType, defineField, defineArrayMember } from "sanity";

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
      name: "poster",
      type: "image",
      title: "Affiche",
      description:
        "Visuel de communication complet — logos partenaires, QR code, date limite. Affiché en entier et en grand sur la page de l'événement, jamais recadré. À ne pas confondre avec l'image de l'événement, qui illustre les vignettes et se recadre : une affiche y perdrait ses logos et son QR code deviendrait inscannable.",
      options: { hotspot: false },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Texte alternatif",
          description:
            "Décrivez ce que dit l'affiche : une personne qui ne la voit pas doit accéder à la même information.",
          validation: (Rule) =>
            Rule.custom((alt, context) => {
              const parent = context.parent as { asset?: unknown } | undefined;
              if (parent?.asset && (!alt || !String(alt).trim())) {
                return "Texte alternatif requis lorsqu'une affiche est définie";
              }
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Mettre en avant sur la page d'accueil",
      description:
        "Par défaut, la page d'accueil annonce l'événement à venir le plus proche. Cochez cette case pour lui préférer celui-ci. La mise en avant cesse d'elle-même une fois l'événement terminé — inutile de revenir la décocher.",
      initialValue: false,
    }),
    defineField({
      name: "gallery",
      type: "array",
      title: "Galerie photo (events passés)",
      description:
        "Photos affichées dans la section « Retour en images ». Visibles uniquement quand le statut de l'événement est « Passé ». ⚠️ Formats acceptés : JPG ou PNG. Les fichiers iPhone .HEIC ne s'affichent pas dans le navigateur — convertissez-les en JPG avant l'import (sur Mac : Aperçu → Fichier → Exporter en JPEG).",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Texte alternatif (optionnel)",
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: "registrationLink",
      type: "url",
      title: "Lien de participation",
      description:
        "URL vers le formulaire d'inscription, le questionnaire, l'enquête… (événement à venir)",
    }),
    defineField({
      name: "registrationCta",
      type: "object",
      title: "Encart d'appel à l'action",
      description:
        "Textes de l'encart affiché en bas de la page de l'événement, et libellé du bouton sur les cartes. Tout est facultatif : laissé vide, l'encart parle d'inscription. À personnaliser quand l'événement n'en est pas vraiment un — une enquête, un questionnaire, un appel à témoignages.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "heading",
          type: "string",
          title: "Titre",
          description:
            "Par défaut : « Inscrivez-vous à cet événement ». Par exemple : « Participez à l'enquête ».",
        }),
        defineField({
          name: "text",
          type: "text",
          rows: 2,
          title: "Texte",
          description:
            "Par défaut : « Les places sont limitées — réservez la vôtre dès maintenant. ». Par exemple : « 5 minutes suffisent, les réponses sont anonymes. »",
        }),
        defineField({
          name: "buttonLabel",
          type: "string",
          title: "Libellé du bouton",
          description:
            "Par défaut : « S'inscrire » (« Participer » sur la page d'accueil). Par exemple : « Répondre au questionnaire ».",
        }),
      ],
    }),
    defineField({
      name: "relatedArticle",
      type: "reference",
      title: "Article lié (compte-rendu)",
      description:
        "Article FEMCOEUR (Actualités) qui raconte l'événement. Affiché sur la carte des événements passés.",
      to: [{ type: "article" }],
    }),
    defineField({
      name: "recapLink",
      type: "url",
      title: "Lien externe (compte-rendu)",
      description:
        "URL externe vers un compte-rendu (presse, partenaire, PDF...). Utilisé si aucun article lié n'est défini.",
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
