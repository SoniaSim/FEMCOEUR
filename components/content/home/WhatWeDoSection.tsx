import {
  Presentation,
  GraduationCap,
  FlaskConical,
  Megaphone,
} from "lucide-react";

export function WhatWeDoSection() {
  const actions = [
    {
      icon: Presentation,
      title: "Ateliers de prévention",
      description: "dans les hôpitaux et entreprises",
    },
    {
      icon: GraduationCap,
      title: "Formation des professionnels",
      description: "de santé à la cardiologie au féminin",
    },
    {
      icon: FlaskConical,
      title: "Recherche clinique",
      description: "et partage de données sexospécifiques",
    },
    {
      icon: Megaphone,
      title: "Sensibilisation grand public",
      description: "et plaidoyer auprès des institutions",
    },
  ];

  return (
    <section className="py-section md:py-section-md bg-muted/50">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Ce que nous faisons
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {actions.map((action, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-card border border-border hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                  <action.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground text-base md:text-lg">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
