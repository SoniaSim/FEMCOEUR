import { SquiggleUnderline } from "@/components/ui/squiggle-underline";

export function FemcoeurMark() {
  return (
    <span className="relative inline-block">
      <span className="text-foreground">FEM</span>
      <span className="text-primary">COEUR</span>
      <SquiggleUnderline />
    </span>
  );
}
