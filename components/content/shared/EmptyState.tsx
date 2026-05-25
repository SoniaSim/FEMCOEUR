import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  message: string;
  hint?: string;
}

/**
 * Carte "état vide" affichée quand une liste est vide (articles, événements, membres...).
 * Border dashed + icône orange centrée + message + hint optionnel.
 */
export function EmptyState({ icon: Icon, message, hint }: EmptyStateProps) {
  return (
    <div className="max-w-2xl mx-auto p-12 text-center rounded-2xl border-2 border-dashed border-primary/20 bg-card">
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-7 h-7 text-primary/60" />
      </div>
      <p className="text-lg font-semibold text-foreground">{message}</p>
      {hint && <p className="text-sm text-foreground/60 mt-2">{hint}</p>}
    </div>
  );
}
