import {
  Megaphone,
  GraduationCap,
  Briefcase,
  Users,
  Scale,
  Calendar,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export function KeyActionsSection() {
  const actions = [
    {
      icon: Megaphone,
      title: "Sensibilisation",
      description:
        "Enquêtes de terrain, publications, communication auprès des institutions (hôpitaux, universités, sociétés savantes, Ordre des médecins).",
    },
    {
      icon: GraduationCap,
      title: "Formation et mentorat",
      description:
        "Journées dédiées, webinaires, ateliers, création de ressources.",
    },
    {
      icon: Briefcase,
      title: "Amélioration de l'exercice professionnel",
      description:
        "Partage d'expériences, soutien autour des congés maternité, parentalité, charge mentale, carrière.",
    },
    {
      icon: Users,
      title: "Création d'un réseau",
      description:
        "Femmes expertes, référentes, inspirantes, disponibles pour conseiller et accompagner.",
    },
    {
      icon: Scale,
      title: "Veille à la parité",
      description:
        "Proposer des oratrices, chercheuses et expertes aux congrès, publications, instances.",
    },
    {
      icon: Calendar,
      title: "Sessions scientifiques et militantes",
      description:
        "Intégrer des temps dédiés aux femmes dans les congrès médicaux (thématiques de genre, empowerment, soft skills).",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Nos actions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {actions.map((action, index) => (
              <Card
                key={index}
                className="p-6 md:p-8 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <action.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg md:text-xl text-foreground">
                      {action.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
