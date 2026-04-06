import { client } from "./client";
import {
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
} from "@/lib/types/sanity";

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
