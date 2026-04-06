import type { PortableTextBlock } from "next-sanity";

export interface ContactEmail {
  label: string;
  email: string;
  description?: string;
  icon?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface IconItem {
  _key: string;
  title: string;
  description: string;
  icon?: string;
}

export interface AboutPage {
  hero?: { title: string; subtitle?: string };
  mission?: { title: string; body?: PortableTextBlock[] };
  history?: { title: string; body?: PortableTextBlock[] };
  values?: IconItem[];
  keyActions?: IconItem[];
  seo?: { title: string; description: string };
}

export interface SiteSettings {
  associationName: string;
  tagline: string;
  shortMission: string;
  logo?: Image;
  contactEmails?: ContactEmail[];
  socialLinks?: SocialLink[];
  footerColumns?: FooterColumn[];
}

export interface Image {
  url: string;
  alt?: string;
}

export interface SEO {
  title?: string;
  description?: string;
  image?: Image;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: PortableTextBlock[];
  seo?: SEO;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  body?: PortableTextBlock[];
  image?: Image;
  categories?: string[];
  seo?: SEO;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  date: string;
  endDate?: string;
  location: string;
  description: PortableTextBlock[];
  image?: Image;
  registrationLink?: string;
  status: "upcoming" | "past" | "cancelled";
  seo?: SEO;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  role?: string;
  specialty: string;
  biography: PortableTextBlock[];
  photo?: Image;
  email?: string;
  phone?: string;
  linkedin?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "link" | "video";
  category: string;
  file?: {
    url: string;
  };
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image?: Image;
}
