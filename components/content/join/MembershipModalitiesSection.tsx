import { Users, FileCheck, Euro } from "lucide-react";
import { Card } from "@/components/ui/card";

export function MembershipModalitiesSection() {
  const modalities = [
    {
      icon: Users,
      title: "À qui s'adresse FEMCOEUR ?",
      description:
        "Femmes médecins et chirurgiennes cardiovasculaires en exercice ou en formation, engagées dans les soins, l'enseignement, la recherche, l'encadrement ou toute activité liée aux pathologies cardio-vasculaires.",
    },
    {
      icon: FileCheck,
      title: "Dossier d'adhésion",
      description:
        "CV, courte lettre d'intention (300 mots) et présentation des projets souhaités.",
    },
    {
      icon: Euro,
      title: "Cotisation annuelle 2026",
      description: "50 € pour les membres actives.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Modalités d&apos;adhésion
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {modalities.map((modality, index) => (
              <Card
                key={index}
                className="p-6 md:p-8 flex flex-col items-center text-center space-y-4 border-2 hover:border-accent/50 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                  <modality.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-bold text-lg md:text-xl text-foreground">
                  {modality.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {modality.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
