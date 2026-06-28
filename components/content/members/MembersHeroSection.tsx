import { SquiggleUnderline } from "@/components/ui/squiggle-underline";
import { PageHero } from "@/components/content/shared/PageHero";

export function MembersHeroSection() {
  return (
    <PageHero
      badge="Notre équipe"
      leftImage="/illustrations/members.svg"
      rightImage="/illustrations/missions.svg"
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight mb-6">
        L&apos;
        <span className="relative inline-block text-primary">
          équipe
          <SquiggleUnderline />
        </span>
      </h1>

      <p className="text-base md:text-lg text-foreground/65 leading-relaxed">
        Rencontrez les{" "}
        <strong className="text-primary font-bold">
          médecins et chirurgiennes en cardiologie et pathologies vasculaires
        </strong>{" "}
        qui font avancer la cardiologie au féminin en France.
      </p>
    </PageHero>
  );
}
