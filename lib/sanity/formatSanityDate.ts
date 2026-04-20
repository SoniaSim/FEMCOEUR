import { format, isValid, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

/** Date ISO Sanity (article, événement, etc.) → libellé long FR ; repli « — » si invalide. */
export const formatSanityDateFr = (iso: string | null | undefined): string => {
  if (iso == null || String(iso).trim() === "") return "—";
  const d = parseISO(String(iso));
  return isValid(d) ? format(d, "d MMMM yyyy", { locale: fr }) : "—";
};
