import { Clock } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { Card } from "@/components/ui/card";
import type { PortableTextBlock } from "next-sanity";

interface HistorySectionProps {
  title: string;
  body?: PortableTextBlock[];
}

export function HistorySection({ title, body }: HistorySectionProps) {
  return (
    <section className="py-section md:py-section-md bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Clock className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {title}
            </h2>
          </div>
          {body && (
            <Card className="p-8 md:p-12 border-2">
              <div className="text-base md:text-lg text-muted-foreground leading-relaxed text-center">
                <PortableText value={body} />
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
