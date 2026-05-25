import { FemcoeurMark } from "@/components/ui/femcoeur-mark";

/**
 * Rend un titre en remplaçant le mot "FEMCOEUR" (insensible à la casse)
 * par le composant <FemcoeurMark /> (FEM navy + COEUR orange + squiggle).
 * Si le mot n'est pas trouvé, rend le titre tel quel.
 */
export function TitleWithFemcoeurMark({ title }: { title: string }) {
  const match = title.match(/(.*?)(FEMCOEUR)(.*)/i);
  if (!match) return <>{title}</>;
  const [, before, , after] = match;
  return (
    <>
      {before}
      <FemcoeurMark />
      {after}
    </>
  );
}
