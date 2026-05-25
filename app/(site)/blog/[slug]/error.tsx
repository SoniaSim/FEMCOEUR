"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function ArticleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Article load error:", error);
  }, [error]);

  return (
    <section className="py-20 md:py-28 bg-linear-to-br from-primary/10 via-primary/5 to-background">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-foreground mb-3">
            Impossible de charger cet article
          </h1>
          <p className="text-base text-foreground/65 mb-8">
            Une erreur est survenue. Réessayez dans un instant ou revenez à la
            liste des articles.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={reset} size="lg" className="font-bold px-7">
              Réessayer
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 font-bold px-7 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
            >
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4" />
                Retour au blog
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
