import { client } from "./client";
import {
  siteSettingsQuery,
  articlesListQuery,
  articleBySlugQuery,
  recentArticlesQuery,
  eventsListQuery,
  upcomingEventsQuery,
  membersListQuery,
  pageBySlugQuery,
  testimonialsListQuery,
} from "./queries";
import type {
  Article,
  Event,
  Member,
  Page,
  Testimonial,
  SiteSettings,
} from "@/lib/types/sanity";

// ── Site Settings ───────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(siteSettingsQuery);
}

// ── Articles ────────────────────────────────────────────────────

export async function getArticles(): Promise<Article[]> {
  return client.fetch(articlesListQuery);
}

export async function getArticleBySlug(
  slug: string
): Promise<Article | null> {
  return client.fetch(articleBySlugQuery, { slug });
}

export async function getRecentArticles(): Promise<Article[]> {
  return client.fetch(recentArticlesQuery);
}

// ── Événements ──────────────────────────────────────────────────

export async function getEvents(): Promise<Event[]> {
  return client.fetch(eventsListQuery);
}

export async function getUpcomingEvents(): Promise<Event[]> {
  return client.fetch(upcomingEventsQuery);
}

// ── Membres ─────────────────────────────────────────────────────

export async function getMembers(): Promise<Member[]> {
  return client.fetch(membersListQuery);
}

// ── Pages ───────────────────────────────────────────────────────

export async function getPageBySlug(slug: string): Promise<Page | null> {
  return client.fetch(pageBySlugQuery, { slug });
}

// ── Témoignages ─────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(testimonialsListQuery);
}
