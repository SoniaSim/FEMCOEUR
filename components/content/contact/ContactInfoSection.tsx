import { getIcon } from "@/lib/icons";
import { Mail } from "lucide-react";
import type { ContactEmail } from "@/lib/types/sanity";

interface ContactInfoSectionProps {
  title?: string | null;
  contacts: ContactEmail[];
}

export function ContactInfoSection({ title, contacts }: ContactInfoSectionProps) {
  const count = contacts.length;
  const gridClass =
    count === 1
      ? "grid-cols-1 max-w-md mx-auto"
      : count === 2
      ? "sm:grid-cols-2 max-w-3xl mx-auto"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="py-14 md:py-20 bg-secondary">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 bg-primary/15 border border-primary/30">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Plusieurs adresses
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-secondary-foreground leading-tight">
              {title ?? "Nos différents contacts"}
            </h2>
            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>

          <div className={`grid gap-5 ${gridClass}`}>
            {contacts.map((contact) => {
              const Icon = getIcon(contact.icon) ?? Mail;
              return (
                <div
                  key={contact.email ?? contact.label}
                  className="card-base card-interactive group relative p-5 sm:p-7 flex flex-col items-center text-center"
                >
                  {/* Accent top au hover */}
                  <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary to-accent" />

                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-primary/10">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  <h3 className="font-bold text-lg text-foreground mb-3 leading-snug">
                    {contact.label}
                  </h3>

                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm md:text-base font-semibold text-primary underline decoration-primary/30 hover:decoration-primary/70 transition-colors break-all"
                  >
                    {contact.email}
                  </a>

                  {contact.description && (
                    <p className="text-sm text-foreground/65 leading-relaxed mt-4">
                      {contact.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
