import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogoText } from "@/components/ui/logo-text";

interface HeroSectionProps {
  title?: string;
  description?: string;
}

export function HeroSection({ title, description }: HeroSectionProps) {
  // Remplacer FEMCOEUR dans le titre par le composant coloré
  const renderTitle = () => {
    if (!title) return <LogoText />;

    if (title.includes("FEMCOEUR")) {
      const parts = title.split("FEMCOEUR");
      return (
        <>
          {parts[0]}
          <LogoText />
          {parts[1]}
        </>
      );
    }

    return title;
  };

  return (
    <section className="relative py-24 md:py-32 bg-linear-to-br from-primary/10 via-background to-primary/5">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {renderTitle()}
          </h1>
          <p className="text-xl text-muted-foreground">
            {description ||
              "Promouvoir la place de la femme dans le domaine de la cardiologie"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/about">Découvrir</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/join">Rejoindre</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
