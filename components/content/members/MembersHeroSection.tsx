import { Users } from "lucide-react";

export function MembersHeroSection() {
  return (
    <section className="py-section-hero md:py-section-hero-md bg-linear-to-br from-primary/10 via-background to-accent/5">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
            <Users className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            Nos Membres
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Rencontrez les{" "}
            <strong className="text-primary">
              cardiologues femmes engagées
            </strong>{" "}
            qui font avancer la cardiologie au féminin en France.
          </p>
        </div>
      </div>
    </section>
  );
}
