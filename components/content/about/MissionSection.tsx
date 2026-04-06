import { Target } from "lucide-react";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";

interface MissionSectionProps {
  title: string;
  body?: PortableTextBlock[];
}

export function MissionSection({ title, body }: MissionSectionProps) {
  return (
    <section className="py-section md:py-section-md bg-linear-to-br from-primary/10 via-background to-primary/5">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center">
              <Target className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {title}
            </h2>
            {body && (
              <div className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                <PortableText value={body} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
