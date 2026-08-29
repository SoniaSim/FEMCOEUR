import { SquiggleUnderline } from "@/components/ui/squiggle-underline";
import { PageHero } from "@/components/content/shared/PageHero";

export function BlogHeroSection() {
  return (
    <PageHero
      badge="Prise de parole"
      leftImage="/illustrations/oline-article-pana.svg"
      rightImage="/illustrations/resource.svg"
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight mb-6">
        Blog &amp;{" "}
        <span className="relative inline-block text-primary">
          Actualités
          <SquiggleUnderline />
        </span>
      </h1>

      <p className="text-base md:text-lg text-foreground/65 leading-relaxed">
        Analyses d&apos;expertes, témoignages de patientes et veille
        scientifique pour que la{" "}
        <strong className="text-primary font-bold">
          &quot;cardiologie des femmes&quot;
        </strong>{" "}
        soit au cœur des pratiques.
      </p>
    </PageHero>
  );
}
