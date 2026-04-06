import { defineType } from "sanity";

export default defineType({
  name: "iconPicker",
  title: "Icône",
  type: "string",
  options: {
    list: [
      { title: "Cœur", value: "heart" },
      { title: "Mégaphone", value: "megaphone" },
      { title: "Utilisateurs", value: "users" },
      { title: "Ampoule", value: "lightbulb" },
      { title: "Réseau", value: "network" },
      { title: "Livre", value: "book-open" },
      { title: "Document", value: "file-text" },
      { title: "Trophée", value: "trophy" },
      { title: "Case cochée", value: "file-check" },
      { title: "Euro", value: "euro" },
      { title: "Email", value: "mail" },
      { title: "Mallette", value: "briefcase" },
      { title: "Cible", value: "target" },
      { title: "Ajouter un utilisateur", value: "user-plus" },
      { title: "Récompense", value: "award" },
      { title: "Étoile", value: "star" },
      { title: "Diplôme", value: "graduation-cap" },
      { title: "Balance / Parité", value: "scale" },
      { title: "Calendrier", value: "calendar" },
      { title: "Alerte / Attention", value: "alert-circle" },
      { title: "Présentation", value: "presentation" },
      { title: "Flacon / Recherche", value: "flask-conical" },
    ],
  },
});
