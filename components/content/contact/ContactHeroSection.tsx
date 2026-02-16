import { Mail } from "lucide-react";

export function ContactHeroSection() {
  return (
    <section className="py-section-hero md:py-section-hero-md bg-linear-to-br from-primary/10 via-background to-accent/5">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
            <Mail className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            Contactez-nous
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Une question sur la cardiologie des femmes, un projet ou un
            partenariat ? Écrivez-nous
          </p>
        </div>
      </div>
    </section>
  );
}
