import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { LogoText } from '@/components/ui/logo-text';
import type { SiteSettings } from '@/lib/types/sanity';

interface FooterProps {
  siteSettings: SiteSettings | null;
}

export function Footer({ siteSettings }: FooterProps) {
  const tagline = siteSettings?.tagline ?? "Promouvoir la place de la femme dans le domaine de la cardiologie.";
  const associationName = siteSettings?.associationName ?? "FEMCOEUR";
  const footerColumns = siteSettings?.footerColumns ?? [];

  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg mb-4">
              <LogoText />
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {tagline}
            </p>
            <div>
              <h4 className="font-semibold mb-2 text-sm">Newsletter</h4>
              <NewsletterForm />
            </div>
          </div>

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

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {associationName}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
