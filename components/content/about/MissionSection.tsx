import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { BlockContent } from "@/sanity.types";

interface MissionSectionProps {
  title: string | null;
  body?: BlockContent | null;
}

const manifestoComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.15] tracking-tight">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-primary">{children}</strong>,
    em: ({ children }) => <em className="italic text-primary/90">{children}</em>,
  },
};

export function MissionSection({ title, body }: MissionSectionProps) {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden">
      {/* Blob décoratif */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.06] blur-3xl pointer-events-none" />

      <div className="container relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-10 bg-primary/15 border border-primary/30">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {title ?? "Notre mission"}
            </span>
          </div>

          {body && (
            <div className="relative inline-block max-w-4xl">
              {/* Guillemet décoratif gauche */}
              <span
                className="absolute -top-8 -left-4 md:-top-14 md:-left-10 text-8xl md:text-[10rem] font-serif leading-none select-none pointer-events-none text-primary/20"
                aria-hidden
              >
                &ldquo;
              </span>

              <div className="relative px-6 md:px-16 py-2">
                <PortableText value={body} components={manifestoComponents} />
              </div>

              {/* Guillemet décoratif droite */}
              <span
                className="absolute -bottom-20 -right-4 md:-bottom-24 md:-right-10 text-8xl md:text-[10rem] font-serif leading-none select-none pointer-events-none text-primary/20"
                aria-hidden
              >
                &rdquo;
              </span>
            </div>
          )}

          <div className="mx-auto mt-16 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>
      </div>
    </section>
  );
}
