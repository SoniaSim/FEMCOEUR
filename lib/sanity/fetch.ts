import { client } from "./client";
import {
  siteSettingsQuery,
  homePageQuery,
  contactPageQuery,
  joinPageQuery,
  aboutPageQuery,
  articlesListQuery,
  articleBySlugQuery,
  recentArticlesQuery,
  eventsListQuery,
  upcomingEventsQuery,
  membersListQuery,
  testimonialsListQuery,
} from "./queries";
import type {
  Article,
  ArticleDetail,
  Event,
  UpcomingEvent,
  Member,
  Testimonial,
  SiteSettings,
  HomePage,
  AboutPage,
  ContactPage,
  JoinPage,
} from "@/lib/types/sanity";

// ── Site Settings ───────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(siteSettingsQuery, {}, { next: { tags: ['siteSettings'] } });
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return client.fetch(aboutPageQuery, {}, { next: { tags: ['about'] } });
}

export async function getJoinPage(): Promise<JoinPage | null> {
  return client.fetch(joinPageQuery, {}, { next: { tags: ['join'] } });
}

export async function getContactPage(): Promise<ContactPage | null> {
  return client.fetch(contactPageQuery, {}, { next: { tags: ['contact'] } });
}

export async function getHomePage(): Promise<HomePage | null> {
  return client.fetch(homePageQuery, {}, { next: { tags: ['homepage', 'siteSettings'] } });
}

// ── Articles ────────────────────────────────────────────────────

export async function getArticles(): Promise<Article[]> {
  return client.fetch(articlesListQuery, {}, { next: { tags: ['articles'] } });
}

export async function getArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  return client.fetch(articleBySlugQuery, { slug }, { next: { tags: [`article:${slug}`, 'articles'] } });
}

export async function getRecentArticles(): Promise<Article[]> {
  return client.fetch(recentArticlesQuery, {}, { next: { tags: ['articles'] } });
}

// ── Événements ──────────────────────────────────────────────────

export async function getEvents(): Promise<Event[]> {
  return client.fetch(eventsListQuery, {}, { next: { tags: ['events'] } });
}

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  return client.fetch(upcomingEventsQuery, {}, { next: { tags: ['events'] } });
}

// ── Membres ─────────────────────────────────────────────────────

export async function getMembers(): Promise<Member[]> {
  return client.fetch(membersListQuery, {}, { next: { tags: ['members'] } });
}

// ── Témoignages ─────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(testimonialsListQuery, {}, { next: { tags: ['testimonials'] } });
}
