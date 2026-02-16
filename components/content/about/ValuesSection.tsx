import { Megaphone, Heart, Users, Lightbulb } from "lucide-react";

export function ValuesSection() {
  const values = [
    {
      icon: Megaphone,
      title: "Féminisme et militantisme",
      description:
        "Défendre les droits des femmes dans notre profession, lutter contre les discriminations et les stéréotypes de genre.",
    },
    {
      icon: Heart,
      title: "Sororité, entraide et soutien",
      description:
        "Créer un espace sécurisant de solidarité, d'écoute et de partage.",
    },
    {
      icon: Users,
      title: "Diversité",
      description:
        "Accueillir toutes les femmes médecins, sans distinction d'origine, d'âge, de mode d'exercice ou de parcours.",
    },
    {
      icon: Lightbulb,
      title: "Indépendance et constructivité",
      description: "Porter une parole libre, étayée et tournée vers l'action.",
    },
  ];

  return (
    <section className="py-section md:py-section-md bg-linear-to-br from-secondary/5 via-background to-accent/5">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Nos valeurs
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 md:p-8 rounded-lg bg-card border-2 border-border hover:border-primary/40 transition-all duration-300"
              >
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-base md:text-lg text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
