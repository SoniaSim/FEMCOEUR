import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";

interface WelcomeSectionProps {
  titlePrefix: string;
  titleHighlight: string;
  subtitle?: PortableTextBlock[];
}

export function WelcomeSection({ titlePrefix, titleHighlight, subtitle }: WelcomeSectionProps) {
  return (
    <section className="relative py-section-hero md:py-section-hero-md bg-linear-to-br from-primary/10 via-background to-primary/5 overflow-hidden">
      <div
        className="hidden md:block absolute top-8 left-[8%] w-[min(22vw,220px)] pointer-events-none origin-center -rotate-[8deg] opacity-85"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/cardiologist-pana.svg"
          alt=""
          width={220}
          height={200}
          className="w-full h-auto object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div
        className="hidden md:block absolute bottom-8 right-[8%] w-[min(22vw,220px)] pointer-events-none origin-center rotate-6 opacity-85"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/home.svg"
          alt=""
          width={220}
          height={200}
          className="w-full h-auto object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            {titlePrefix}{" "}
            <span className="text-primary">{titleHighlight}</span>
          </h1>
          {subtitle && (
            <div className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <PortableText value={subtitle} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
