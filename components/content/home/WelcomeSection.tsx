"use client";

import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { BlockContent } from "@/sanity.types";
import { basePortableTextComponents } from "@/lib/portable-text-components";
import { Button } from "@/components/ui/button";

interface WelcomeSectionProps {
  titlePrefix: string;
  titleHighlight: string;
  subtitle?: BlockContent | null;
}

export function WelcomeSection({ titlePrefix, titleHighlight, subtitle }: WelcomeSectionProps) {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        {/* Blobs décoratifs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-accent/15 blur-2xl pointer-events-none" />

        <div className="container relative z-10 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-4">

            {/* Illustration gauche */}
            <div className="hidden md:flex justify-end pr-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/illustrations/cardiologist-pana.svg"
                alt=""
                width={300}
                height={300}
                className="w-full max-w-[260px] lg:max-w-[300px] h-auto object-contain drop-shadow-xl"
                style={{ transform: "rotate(-7deg)", transition: "transform 0.6s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(0deg) scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(-7deg)")}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Centre : badge + titre */}
            <div className="text-center max-w-xl mx-auto px-2">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-1.5 mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  Premier réseau français
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight mb-8">
                {titlePrefix}<span className="relative inline-block text-primary">
                  {titleHighlight}
                  <svg
                    className="absolute -bottom-2 left-0 w-full text-primary/50"
                    height="8"
                    viewBox="0 0 400 8"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path
                      d="M0,4 Q50,0 100,4 T200,4 T300,4 T400,4"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Illustration droite */}
            <div className="hidden md:flex justify-start pl-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/illustrations/home.svg"
                alt=""
                width={300}
                height={300}
                className="w-full max-w-[260px] lg:max-w-[300px] h-auto object-contain drop-shadow-xl"
                style={{ transform: "rotate(7deg)", transition: "transform 0.6s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(0deg) scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(7deg)")}
                loading="lazy"
                decoding="async"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ===== CORPS ÉDITORIAL ===== */}
      {subtitle && subtitle.length > 0 && (
        <section id="mission" className="py-4 md:py-6 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-3xl p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/[0.03] to-transparent border border-primary/15">
                <div className="absolute top-0 left-0 w-1 h-full rounded-l-3xl bg-gradient-to-b from-primary to-accent" />
                <div className="pl-2">
                  <PortableText value={subtitle} components={basePortableTextComponents} />

                  <div className="mt-8 pt-6 flex justify-center border-t border-primary/15">
                    <Button asChild size="lg" className="shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 font-bold px-8">
                      <Link href="/join">Rejoindre FEMCOEUR</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
