import Image from "next/image";

export function WelcomeSection() {
  return (
    <section className="relative py-section-hero md:py-section-hero-md bg-linear-to-br from-primary/10 via-background to-primary/5 overflow-hidden">
      <div
        className="hidden md:block absolute top-8 left-[8%] w-[min(22vw,220px)] pointer-events-none origin-center -rotate-[8deg] opacity-85"
        aria-hidden
      >
        <Image
          src="/illustrations/cardiologist-pana.svg"
          alt=""
          width={220}
          height={200}
          className="w-full h-auto object-contain"
        />
      </div>
      <div
        className="hidden md:block absolute bottom-8 right-[8%] w-[min(22vw,220px)] pointer-events-none origin-center rotate-6 opacity-85"
        aria-hidden
      >
        <Image
          src="/illustrations/home.svg"
          alt=""
          width={220}
          height={200}
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Bienvenue au sein du premier réseau français de{" "}
            <span className="text-primary">
              femmes médecins et chirurgiennes cardiovasculaires
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Une voix{" "}
            <strong className="text-foreground">
              féministe, bienveillante et indépendante
            </strong>{" "}
            dans le monde cardiovasculaire, mobilisée pour promouvoir
            l&apos;égalité femme-homme et améliorer la prise en charge des
            maladies cardiovasculaires.
          </p>
        </div>
      </div>
    </section>
  );
}
