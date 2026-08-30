import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { getIcon } from "@/lib/icons";
import type { SocialLink } from "@/lib/types/sanity";

const PLATFORM_LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  twitter: "Twitter / X",
  youtube: "YouTube",
};

type Variant = "dark" | "light";

interface SocialLinkCardProps {
  link: SocialLink;
  variant: Variant;
  icon: LucideIcon | null;
}

function SocialLinkCard({ link, icon: Icon, variant }: SocialLinkCardProps) {
  const label = PLATFORM_LABELS[link.platform] ?? link.platform;
  const isExternal = link.url.startsWith("http");
  const isDark = variant === "dark";

  return (
    <Link
      href={link.url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={`Suivez-nous sur ${label}`}
      className={`group flex items-center justify-center sm:justify-start sm:gap-4 p-3 sm:px-5 sm:py-4 ${
        isDark
          ? "rounded-2xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
          : "card-base card-interactive-subtle"
      }`}
    >
      <span
        className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
          isDark ? "bg-primary/20" : "bg-primary/10"
        }`}
      >
        {Icon && <Icon className="w-5 h-5 text-primary" />}
      </span>

      <p
        className={`hidden sm:block flex-1 text-sm font-semibold leading-tight ${
          isDark ? "text-secondary-foreground" : "text-foreground"
        }`}
      >
        {label}
      </p>

      <span
        className={`hidden sm:flex shrink-0 w-8 h-8 rounded-full items-center justify-center text-primary transition-all duration-200 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground ${
          isDark ? "bg-primary/20" : "bg-primary/10"
        }`}
        aria-hidden
      >
        <ArrowRight className="w-3.5 h-3.5" />
      </span>
    </Link>
  );
}

/**
 * Séparateur « Suivez-nous » + grille de réseaux sociaux.
 * Partagé par `FollowUsSection` (page /join) et `StayInTouchSection` (accueil,
 * blog, événements) : la logique de grille selon le nombre de réseaux n'existe
 * qu'ici.
 */
export function SocialLinksRow({
  socialLinks,
  variant = "light",
}: {
  socialLinks: SocialLink[];
  /** "dark" sur section navy (StayInTouchSection), "light" ailleurs. */
  variant?: Variant;
}) {
  if (socialLinks.length === 0) return null;

  const isDark = variant === "dark";

  const gridClass =
    socialLinks.length === 1
      ? "grid-cols-1 max-w-xs mx-auto"
      : socialLinks.length === 2
        ? "grid-cols-2 max-w-md sm:max-w-2xl mx-auto"
        : "grid-cols-3";

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6 max-w-3xl mx-auto">
        <div
          className={`flex-1 h-px ${isDark ? "bg-white/15" : "bg-primary/15"}`}
        />
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Suivez-nous
        </p>
        <div
          className={`flex-1 h-px ${isDark ? "bg-white/15" : "bg-primary/15"}`}
        />
      </div>

      <div className={`grid gap-4 ${gridClass}`}>
        {socialLinks.map((link, index) => (
          <SocialLinkCard
            key={`${link.platform}-${index}`}
            link={link}
            icon={getIcon(link.platform)}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}
