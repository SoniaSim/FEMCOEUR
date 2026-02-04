import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { LogoText } from '@/components/ui/logo-text';

const footerLinks = {
  association: [
    { href: '/about', label: 'À propos' },
    { href: '/members', label: 'Membres' },
    { href: '/join', label: 'Rejoindre' },
  ],
  ressources: [
    { href: '/resources', label: 'Ressources' },
    { href: '/blog', label: 'Blog' },
    { href: '/events', label: 'Événements' },
  ],
  contact: [
    { href: '/contact', label: 'Contact' },
    { href: '#', label: 'Newsletter' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg mb-4">
              <LogoText />
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Promouvoir la place de la femme dans le domaine de la cardiologie.
            </p>
            <div>
              <h4 className="font-semibold mb-2 text-sm">Newsletter</h4>
              <NewsletterForm />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Association</h4>
            <ul className="space-y-2">
              {footerLinks.association.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Ressources</h4>
            <ul className="space-y-2">
              {footerLinks.ressources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} <LogoText />. Tous droits réservés.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {footerLinks.contact.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
