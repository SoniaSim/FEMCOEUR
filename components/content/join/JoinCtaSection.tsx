import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

export function JoinCtaSection() {
  return (
    <section className="py-section md:py-section-md bg-linear-to-br from-secondary/5 via-background to-primary/5">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 md:p-12 border-2 border-primary/20 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Prêt(e) à nous rejoindre ?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Remplissez le formulaire de contact ou écrivez-nous à{" "}
                <a
                  href="mailto:adhesion@femcoeur.fr"
                  className="text-primary hover:text-primary/80 font-semibold underline decoration-primary/30 hover:decoration-primary/60 transition-colors"
                >
                  adhesion@femcoeur.fr
                </a>{" "}
                pour recevoir le kit d&apos;accueil.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">
                  <FileText className="w-5 h-5" />
                  Formulaire de contact
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <a href="mailto:adhesion@femcoeur.fr">
                  <Mail className="w-5 h-5" />
                  Envoyer un email
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
