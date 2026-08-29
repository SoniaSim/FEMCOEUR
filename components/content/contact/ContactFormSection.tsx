import { ContactForm } from "@/components/forms/ContactForm";

interface ContactFormSectionProps {
  intro?: string | null;
}

export function ContactFormSection({ intro }: ContactFormSectionProps) {
  return (
    <section className="pt-14 md:pt-20 pb-8 md:pb-10 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-card border border-primary/15 shadow-sm">
            {/* Barre d'accent top */}
            <div className="absolute top-0 left-12 right-12 h-1 rounded-full bg-gradient-to-r from-primary to-accent" />

            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight">
                Envoyez-nous un message
              </h2>
              {intro && (
                <p className="text-base text-foreground/65 leading-relaxed mt-3 max-w-xl mx-auto">
                  {intro}
                </p>
              )}
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
