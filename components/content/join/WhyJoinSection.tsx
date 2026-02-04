import { Network, BookOpen, FileText, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

export function WhyJoinSection() {
  const benefits = [
    {
      icon: Network,
      text: "Intégrer un réseau national de cardiologues femmes engagé.",
    },
    {
      icon: BookOpen,
      text: "Accéder à des formations continues centrées sur la santé cardiovasculaire des femmes.",
    },
    {
      icon: FileText,
      text: "Publier et co-signer des études cliniques sur les spécificités féminines.",
    },
    {
      icon: Trophy,
      text: "Bénéficier de mentorat et d'une visibilité médiatique accrue.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-primary/10 via-background to-primary/5">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Pourquoi adhérer ?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="p-6 md:p-8 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex gap-4 md:gap-6">
                  <div className="shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex items-center">
                    {benefit.text}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
