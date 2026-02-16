export function ResourcesBottomSection() {
  return (
    <section className="py-section md:py-section-md bg-muted/50">
      <div className="container">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14">
          <div className="w-full max-w-sm shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/illustrations/resource.svg"
              alt="Ressources et documentation"
              width={320}
              height={240}
              className="w-full h-auto"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="text-lg text-muted-foreground text-center md:text-left">
            Des ressources validées par des cardiologues femmes pour accompagner
            votre pratique et la santé cardiovasculaire des femmes.
          </p>
        </div>
      </div>
    </section>
  );
}
