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
  content: string;
  seo?: SEO;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  content: string;
  image?: Image;
  categories?: string[];
  seo?: SEO;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  date: string;
  location: string;
  description: string;
  image?: Image;
  registrationLink?: string;
  status: 'upcoming' | 'past';
  seo?: SEO;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  role?: string;
  specialty: string;
  biography: string;
  photo?: Image;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'link' | 'video';
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

