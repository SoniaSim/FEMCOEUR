import { SquiggleUnderline } from "@/components/ui/squiggle-underline";
import { PageHero } from "@/components/content/shared/PageHero";

export function EventsHeroSection() {
  return (
    <PageHero
      badge="Nos rendez-vous"
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
        Webinaires experts, ateliers patients, formations certifiantes{"\u202F"}:
        des rendez-vous pour faire avancer la cardiologie au féminin.
      </p>
    </PageHero>
  );
}
