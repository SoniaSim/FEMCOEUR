import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { LogoText } from "@/components/ui/logo-text";
import type { SiteSettings } from "@/lib/types/sanity";

interface FooterProps {
  siteSettings: SiteSettings | null;
}

export function Footer({ siteSettings }: FooterProps) {
  const tagline =
    siteSettings?.tagline ??
    "Promouvoir la place de la femme dans le domaine de la cardiologie.";
  const associationName = siteSettings?.associationName ?? "FEMCOEUR";
  const footerColumns = siteSettings?.footerColumns ?? [];
  const newsletter = siteSettings?.newsletter ?? null;

  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg mb-4">
              <LogoText />
            </h3>
            <p className="text-sm text-muted-foreground mb-4">{tagline}</p>
            <div className="max-w-sm">
              <h4 className="font-semibold text-sm">
                {newsletter?.title ?? "Restons en contact"}
              </h4>
              <p className="mt-1 mb-3 text-sm text-muted-foreground leading-relaxed">
                {newsletter?.description ??
                  "Quelques mails par an : nos événements, nos publications et la vie du réseau."}
              </p>
              <Link
                href="/#restons-en-contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Recevoir notre newsletter
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8 md:contents">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h4 className="font-semibold mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {(column.links ?? []).map((link, index) =>
                    link.href ? (
                      <li key={`${column.title ?? "col"}-${index}`}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {link.label ?? ""}
                        </Link>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {associationName}. Tous droits
            réservés.
          </p>

          <nav aria-label="Liens légaux">
            <Link
              href="/confidentialite"
              className="transition-colors hover:text-primary"
            >
              Politique de confidentialité
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
