import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

export function HistorySection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Clock className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Notre histoire
            </h2>
          </div>
          <Card className="p-8 md:p-12 border-2">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-center">
              <strong className="text-primary">FEMCOEUR</strong> est une
              association fondée par et pour des femmes médecins et
              chirurgiennes impliquées dans la prise en charge des maladies
              cardiovasculaires en France. Elle est née de la volonté de{" "}
              <strong className="text-foreground">
                promouvoir l&apos;égalité femme-homme
              </strong>{" "}
              dans notre profession, de créer un réseau solidaire et de porter
              une voix forte,{" "}
              <strong className="text-foreground">
                féministe, bienveillante et indépendante
              </strong>{" "}
              dans le monde cardiovasculaire.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
