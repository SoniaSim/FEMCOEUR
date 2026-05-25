import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icons";
import type { SocialLink } from "@/lib/types/sanity";

interface FollowUsSectionProps {
  socialLinks: SocialLink[];
}

const PLATFORM_LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  twitter: "Twitter / X",
  youtube: "YouTube",
};

export function FollowUsSection({ socialLinks }: FollowUsSectionProps) {
  if (socialLinks.length === 0) return null;

  const gridClass =
    socialLinks.length === 1
      ? "grid-cols-1 max-w-xs mx-auto"
      : socialLinks.length === 2
      ? "grid-cols-2 max-w-md sm:max-w-2xl mx-auto"
      : "grid-cols-3";

  return (
    <section className="pt-6 md:pt-8 pb-14 md:pb-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Divider "Suivez-nous" */}
          <div className="flex items-center gap-4 mb-6 max-w-3xl mx-auto">
            <div className="flex-1 h-px bg-primary/15" />
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Suivez-nous
            </p>
            <div className="flex-1 h-px bg-primary/15" />
          </div>

          <div className={`grid gap-4 ${gridClass}`}>
            {socialLinks.map((link, index) => {
              if (!link.platform || !link.url) return null;
              const Icon = getIcon(link.platform);
              const label = PLATFORM_LABELS[link.platform] ?? link.platform;
              const isExternal = link.url.startsWith("http");

              return (
                <Link
                  key={`${link.platform}-${index}`}
                  href={link.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={`Suivez-nous sur ${label}`}
                  className="card-base card-interactive-subtle group flex items-center justify-center sm:justify-start sm:gap-4 p-3 sm:px-5 sm:py-4"
                >
                  <span className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10">
                    {Icon && <Icon className="w-5 h-5 text-primary" />}
                  </span>

                  <p className="hidden sm:block flex-1 text-sm font-semibold text-foreground leading-tight">
                    {label}
                  </p>

                  <span
                    className="hidden sm:flex shrink-0 w-8 h-8 rounded-full items-center justify-center bg-primary/10 text-primary transition-all duration-200 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground"
                    aria-hidden
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
