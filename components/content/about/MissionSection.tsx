import { Target } from "lucide-react";

export function MissionSection() {
  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-primary/10 via-background to-primary/5">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center">
              <Target className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Notre mission
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Promouvoir l&apos;
              <strong className="text-primary">
                équilibre femme-homme
              </strong>{" "}
              dans le champ des maladies cardiovasculaires, que ce soit en
              médecine, en chirurgie, dans la recherche ou l&apos;enseignement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
