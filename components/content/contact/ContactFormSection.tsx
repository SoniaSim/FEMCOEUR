import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/ContactForm";

interface ContactFormSectionProps {
  intro?: string;
}

export function ContactFormSection({ intro }: ContactFormSectionProps) {
  return (
    <section className="py-section md:py-section-md bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 md:p-12 border-2">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Envoyez-nous un message
                </h2>
                {intro && (
                  <p className="text-muted-foreground">{intro}</p>
                )}
              </div>
              <ContactForm />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
