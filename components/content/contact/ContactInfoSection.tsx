import { Mail, Users, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ContactInfoSection() {
  const contacts = [
    {
      icon: Mail,
      title: "Contact général",
      email: "contact@femcoeur.fr",
      description: "Pour toute question ou information générale",
    },
    {
      icon: Users,
      title: "Adhésion",
      email: "adhesion@femcoeur.fr",
      description: "Pour rejoindre l'association FEMCOEUR",
    },
    {
      icon: Briefcase,
      title: "Partenariats",
      email: "partenariats@femcoeur.fr",
      description: "Pour les projets et collaborations",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
            Nos différents contacts
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {contacts.map((contact, index) => (
              <Card
                key={index}
                className="p-6 md:p-8 flex flex-col items-center text-center space-y-4 border-2 hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <contact.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground">
                  {contact.title}
                </h3>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-primary hover:text-primary/80 font-semibold underline decoration-primary/30 hover:decoration-primary/60 transition-colors"
                >
                  {contact.email}
                </a>
                <p className="text-sm text-muted-foreground">
                  {contact.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
