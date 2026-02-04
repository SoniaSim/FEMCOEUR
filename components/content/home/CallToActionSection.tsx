import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, UserPlus, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";

export function CallToActionSection() {
  const ctas = [
    {
      icon: BookOpen,
      title: "Vous êtes patiente ?",
      description: "Découvrez nos ressources et nos événements.",
      buttonText: "Nos ressources",
      href: "/resources",
      variant: "default" as const,
    },
    {
      icon: UserPlus,
      title: "Vous êtes cardiologue ou interne ?",
      description: "Rejoignez l'association FEMCOEUR.",
      buttonText: "Rejoindre",
      href: "/join",
      variant: "default" as const,
    },
    {
      icon: Mail,
      title: "Journaliste ou partenaire ?",
      description: "Contactez-nous pour co-construire des actions.",
      buttonText: "Nous contacter",
      href: "/contact",
      variant: "outline" as const,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-secondary/5 via-background to-accent/5">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Rejoignez le mouvement
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Ensemble, faisons avancer la cardiologie au féminin
          </p>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {ctas.map((cta, index) => (
              <Card
                key={index}
                className="p-8 flex flex-col items-center text-center space-y-6 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <cta.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-3 grow">
                  <h3 className="font-bold text-lg md:text-xl text-foreground">
                    {cta.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {cta.description}
                  </p>
                </div>
                <Button
                  asChild
                  variant={cta.variant}
                  size="lg"
                  className="w-full"
                >
                  <Link href={cta.href}>{cta.buttonText}</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
