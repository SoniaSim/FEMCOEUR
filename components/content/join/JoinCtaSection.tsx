import Link from "next/link";
import { Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JoinCtaSectionProps {
  title?: string | null;
  body?: string | null;
  button?: { label: string; href: string } | null;
  adhesionEmail?: string | null;
}

export function JoinCtaSection({
  title,
  body,
  button,
  adhesionEmail,
}: JoinCtaSectionProps) {
  const email = adhesionEmail ?? "adhesion@femcoeur.fr";

  return (
    <section className="pt-16 md:pt-24 pb-8 md:pb-10 bg-gradient-to-b from-background to-primary/5">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-gradient-to-br from-primary/10 via-accent/[0.04] to-transparent border border-primary/20 shadow-sm">
            {/* Barre d'accent top */}
            <div className="absolute top-0 left-12 right-12 h-1 rounded-full bg-gradient-to-r from-primary to-accent" />

            <div className="text-center space-y-6">
              {title && (
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground leading-tight">
                  {title}
                </h2>
              )}

              {body && (
                <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-xl mx-auto">
                  {body}{" "}
                  <a
                    href={`mailto:${email}`}
                    className="font-semibold text-primary underline decoration-primary/30 hover:decoration-primary/70 transition-colors"
                  >
                    {email}
                  </a>
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                {button && (
                  <Button
                    asChild
                    size="lg"
                    className="gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 font-bold px-7"
                  >
                    <Link href={button.href}>
                      <FileText className="w-5 h-5" />
                      {button.label}
                    </Link>
                  </Button>
                )}
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="gap-2 font-bold px-7"
                >
                  <a href={`mailto:${email}`}>
                    <Mail className="w-5 h-5" />
                    Envoyer un email
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
