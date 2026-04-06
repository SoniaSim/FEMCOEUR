"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Home,
  Info,
  UserPlus,
  Users,
  Calendar,
  FileText,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types/sanity";

const navigationItems = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/about", label: "À propos", icon: Info },
  { href: "/join", label: "Rejoindre", icon: UserPlus },
  { href: "/members", label: "Membres", icon: Users },
  { href: "/events", label: "Événements", icon: Calendar },
  // { href: "/resources", label: "Ressources", icon: BookOpen }, // Désactivé pour le lancement
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/contact", label: "Contact", icon: Mail },
];

interface HeaderProps {
  siteSettings: SiteSettings | null;
}

export function Header({ siteSettings }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const logoSrc = siteSettings?.logo?.url ?? "/simple-logo.png";
  const logoAlt = siteSettings?.logo?.alt ?? `${siteSettings?.associationName ?? "FEMCOEUR"} — Association des Cardiologues Femmes`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt={logoAlt}
            width={200}
            height={200}
            className="h-16 md:h-20 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild active={isActive(item.href)}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                        isActive(item.href) && "text-primary"
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile Navigation */}
        <Sheet key={pathname} open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg text-foreground hover:bg-muted/80 hover:text-primary"
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex w-[min(100vw-2rem,320px)] flex-col border-l border-border/80 bg-background p-0 shadow-xl"
          >
            <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-primary/6 to-transparent"
              aria-hidden
            />
            <nav
              className="relative flex-1 overflow-y-auto px-3 pt-12 pb-4"
              aria-label="Navigation principale"
            >
              <ul className="flex flex-col gap-0.5">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] font-medium transition-colors duration-200",
                          "hover:bg-muted/70 focus:bg-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background",
                          "border-l-2 border-transparent",
                          active
                            ? "border-primary bg-primary/10 text-primary"
                            : "text-foreground"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                            active
                              ? "bg-primary/15 text-primary"
                              : "bg-muted/80 text-muted-foreground"
                          )}
                        >
                          <Icon className="h-4 w-4" strokeWidth={2} />
                        </span>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
