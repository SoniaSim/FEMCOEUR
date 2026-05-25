import { SquiggleUnderline } from "@/components/ui/squiggle-underline";
import { PageHero } from "@/components/content/shared/PageHero";

export function EventsHeroSection() {
  return (
    <PageHero
      badge="Notre agenda"
      leftImage="/illustrations/event.svg"
      rightImage="/illustrations/conference-speaker-bro.svg"
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight mb-6">
        Nos{" "}
        <span className="relative inline-block text-primary">
          événements
          <SquiggleUnderline />
        </span>
      </h1>

      <p className="text-base md:text-lg text-foreground/65 leading-relaxed">
        Découvrez nos rencontres{" "}
        <strong className="text-primary font-bold">
          &quot;cardiologies femmes&quot;
        </strong>{" "}
        : webinaires experts, ateliers patients et sessions de formation
        certifiante.
      </p>
    </PageHero>
  );
}
