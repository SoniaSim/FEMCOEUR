import { getMembers } from "@/lib/sanity/fetch";
import { toPlainText } from "@/lib/sanity/portable-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Mail, Users as UsersIcon } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/social-icons";
import { EmptyState } from "@/components/content/shared/EmptyState";
import type { Member } from "@/lib/types/sanity";

const ROLE_LABELS: Record<string, string> = {
  presidente: "Présidente",
  "vice-presidente": "Vice-Présidente",
  tresoriere: "Trésorière",
  "tresoriere-adjointe": "Trésorière adjointe",
  secretaire: "Secrétaire",
  "secretaire-adjointe": "Secrétaire adjointe",
  "membre-bureau": "Membre du bureau",
};

function formatRole(role: string | null | undefined): string | null {
  if (!role) return null;
  return ROLE_LABELS[role] ?? role;
}

function MemberCard({ member }: { member: Member }) {
  const fullName = [member.firstName, member.lastName].filter(Boolean).join(" ") || "Membre";
  const bio = toPlainText(member.biography);
  const hasContacts = Boolean(member.linkedin || member.email);

  return (
    <div className="card-base card-interactive group relative p-5 sm:p-6 md:p-7 flex flex-col items-center text-center h-full">
      {/* Accent top au hover */}
      <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary to-accent" />

      <Avatar className="w-24 h-24 mb-5 ring-4 ring-primary/15">
        <AvatarImage src={member.photo?.url ?? undefined} alt={fullName} />
        <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
          {member.firstName?.charAt(0) ?? "?"}
          {member.lastName?.charAt(0) ?? "?"}
        </AvatarFallback>
      </Avatar>

      <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight mb-3">
        Dre. {member.firstName} {member.lastName}
      </h3>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        {member.role && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
            {formatRole(member.role)}
          </span>
        )}
        {member.specialty && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            {member.specialty}
          </span>
        )}
      </div>

      {bio && (
        <p className="text-sm text-foreground/65 leading-relaxed line-clamp-4">
          {bio}
        </p>
      )}

      {hasContacts && (
        <div className="mt-auto pt-5 w-full">
          <div className="pt-4 border-t border-primary/10 flex items-center justify-center gap-3">
            {member.linkedin && (
              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn de ${fullName}`}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/10 text-primary transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
              >
                <LinkedInIcon className="w-4 h-4" />
              </Link>
            )}
            {member.email && (
              <Link
                href={`mailto:${member.email}`}
                aria-label={`Email de ${fullName}`}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/10 text-primary transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
              >
                <Mail className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface GroupProps {
  badge: string;
  title: string;
  members: Member[];
  variant?: "default" | "secondary";
}

function MembersGroup({ badge, title, members, variant = "default" }: GroupProps) {
  const isDark = variant === "secondary";
  return (
    <section
      className={`py-16 md:py-24 ${
        isDark
          ? "bg-secondary"
          : "bg-gradient-to-b from-background to-primary/5"
      }`}
    >
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 bg-primary/15 border border-primary/30">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                {badge}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-black leading-tight ${
                  isDark ? "text-secondary-foreground" : "text-foreground"
                }`}
              >
                {title}
              </h2>
              <span
                className={`inline-flex items-center justify-center min-w-7 h-7 sm:min-w-8 sm:h-8 px-2 sm:px-2.5 rounded-full text-xs sm:text-sm font-bold ${
                  isDark
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-primary/10 text-primary border border-primary/20"
                }`}
              >
                {members.length}
              </span>
            </div>
            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export async function MembersListSection() {
  const members = await getMembers();

  if (members.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <EmptyState
            icon={UsersIcon}
            message="Aucun membre disponible pour le moment."
            hint="Notre réseau se construit progressivement."
          />
        </div>
      </section>
    );
  }

  const boardMembers = members.filter((m) => m.role);
  const regularMembers = members.filter((m) => !m.role);

  return (
    <>
      {boardMembers.length > 0 && (
        <MembersGroup
          badge="Notre direction"
          title="Le Bureau Femcoeur"
          members={boardMembers}
        />
      )}
      {regularMembers.length > 0 && (
        <MembersGroup
          badge="Au quotidien"
          title="L'équipe communication"
          members={regularMembers}
          variant="secondary"
        />
      )}
    </>
  );
}
