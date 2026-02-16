import { Heart, AlertCircle, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export function WhyFeminineSection() {
  const reasons = [
    {
      icon: Heart,
      text: "Les maladies cardiovasculaires sont la première cause de mortalité chez les femmes en France.",
    },
    {
      icon: AlertCircle,
      text: "Les symptômes féminins sont souvent atypiques et sous-diagnostiqués.",
    },
    {
      icon: Users,
      text: 'Notre réseau "cardiologies femmes" rassemble des expertes pour adapter la prévention, le dépistage et les traitements.',
    },
  ];

  return (
    <section className="py-section md:py-section-md bg-background">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Pourquoi une cardiologie au féminin ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {reasons.map((reason, index) => (
              <Card
                key={index}
                className="p-6 md:p-8 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <reason.icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {reason.text}
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
