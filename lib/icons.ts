import {
  Heart,
  Megaphone,
  Users,
  Lightbulb,
  Network,
  BookOpen,
  FileText,
  Trophy,
  FileCheck,
  Euro,
  Mail,
  Briefcase,
  Target,
  UserPlus,
  Award,
  Star,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  heart: Heart,
  megaphone: Megaphone,
  users: Users,
  lightbulb: Lightbulb,
  network: Network,
  "book-open": BookOpen,
  "file-text": FileText,
  trophy: Trophy,
  "file-check": FileCheck,
  euro: Euro,
  mail: Mail,
  briefcase: Briefcase,
  target: Target,
  "user-plus": UserPlus,
  award: Award,
  star: Star,
};

export function getIcon(name?: string | null): LucideIcon | null {
  if (!name) return null;
  return ICON_MAP[name] ?? null;
}
