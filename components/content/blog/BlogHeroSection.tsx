import { Newspaper } from "lucide-react";

export function BlogHeroSection() {
  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-primary/10 via-background to-accent/5">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
            <Newspaper className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            Blog & Actualités
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Analyses d&apos;expertes, témoignages de patientes et veille
            scientifique pour que la{" "}
            <strong className="text-primary">
              &quot;cardiologie des femmes&quot;
            </strong>{" "}
            soit au cœur des pratiques.
          </p>
        </div>
      </div>
    </section>
  );
}
