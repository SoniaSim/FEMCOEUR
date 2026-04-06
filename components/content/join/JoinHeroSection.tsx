import { UserPlus } from "lucide-react";

interface JoinHeroSectionProps {
  title: string;
  subtitle?: string;
}

export function JoinHeroSection({ title, subtitle }: JoinHeroSectionProps) {
  return (
    <section className="py-section-hero md:py-section-hero-md bg-linear-to-br from-primary/10 via-background to-accent/5">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
            <UserPlus className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
