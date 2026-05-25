import { Clock } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { basePortableTextComponents } from "@/lib/portable-text-components";
import type { BlockContent } from "@/sanity.types";

interface HistorySectionProps {
  title: string | null;
  body?: BlockContent | null;
}

export function HistorySection({ title, body }: HistorySectionProps) {
  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground leading-tight">
              {title}
            </h2>
          </div>

          {body && (
            <div className="card-base relative p-5 sm:p-7 md:p-9">
              <div className="absolute top-0 left-7 right-7 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent" />
              <div className="text-base text-foreground/75 leading-relaxed">
                <PortableText value={body} components={basePortableTextComponents} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
