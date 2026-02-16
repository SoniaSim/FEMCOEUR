import { Users } from "lucide-react";

export function AboutHeroSection() {
  return (
    <section className="py-section-hero md:py-section-hero-md bg-linear-to-br from-primary/10 via-background to-accent/5">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
            <Users className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            À propos de FEMCOEUR
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Découvrez la mission, l&apos;histoire et les valeurs du premier
            réseau français de{" "}
            <strong className="text-primary">femmes cardiologues</strong> : une
            voix féministe, bienveillante et indépendante.
          </p>
        </div>
      </div>
    </section>
  );
}
