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
  return client.fetch(siteSettingsQuery);
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return client.fetch(aboutPageQuery);
}

export async function getJoinPage(): Promise<JoinPage | null> {
  return client.fetch(joinPageQuery);
}

export async function getContactPage(): Promise<ContactPage | null> {
  return client.fetch(contactPageQuery);
}

export async function getHomePage(): Promise<HomePage | null> {
  return client.fetch(homePageQuery);
}

// ── Articles ────────────────────────────────────────────────────

export async function getArticles(): Promise<Article[]> {
  return client.fetch(articlesListQuery);
}

export async function getArticleBySlug(
  slug: string
): Promise<ArticleDetail | null> {
  return client.fetch(articleBySlugQuery, { slug });
}

export async function getRecentArticles(): Promise<Article[]> {
  return client.fetch(recentArticlesQuery);
}

// ── Événements ──────────────────────────────────────────────────

export async function getEvents(): Promise<Event[]> {
  return client.fetch(eventsListQuery);
}

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  return client.fetch(upcomingEventsQuery);
}

// ── Membres ─────────────────────────────────────────────────────

export async function getMembers(): Promise<Member[]> {
  return client.fetch(membersListQuery);
}


// ── Témoignages ─────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(testimonialsListQuery);
}
