import { getIcon } from "@/lib/icons";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import type { ContactEmail } from "@/lib/types/sanity";

interface ContactInfoSectionProps {
  title?: string;
  contacts: ContactEmail[];
}

export function ContactInfoSection({ title, contacts }: ContactInfoSectionProps) {
  return (
    <section className="py-section md:py-section-md bg-muted/30">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
            {title ?? "Nos différents contacts"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {contacts.map((contact, index) => {
              const Icon = getIcon(contact.icon) ?? Mail;
              return (
                <Card
                  key={index}
                  className="p-6 md:p-8 flex flex-col items-center text-center space-y-4 border-2 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">
                    {contact.label}
                  </h3>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-primary hover:text-primary/80 font-semibold underline decoration-primary/30 hover:decoration-primary/60 transition-colors"
                  >
                    {contact.email}
                  </a>
                  {contact.description && (
                    <p className="text-sm text-muted-foreground">
                      {contact.description}
                    </p>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
