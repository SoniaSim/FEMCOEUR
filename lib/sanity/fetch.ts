import { client } from "./client";
import {
  siteSettingsQuery,
  homePageQuery,
  contactPageQuery,
  joinPageQuery,
  aboutPageQuery,
  articlesListQuery,
  articleBySlugQuery,
  eventsListQuery,
  eventBySlugQuery,
  membersListQuery,
} from "./queries";
import type {
  SiteSettingsQueryResult,
  HomePageQueryResult,
  ContactPageQueryResult,
  JoinPageQueryResult,
  AboutPageQueryResult,
  ArticlesListQueryResult,
  ArticleBySlugQueryResult,
  EventsListQueryResult,
  EventBySlugQueryResult,
  MembersListQueryResult,
} from "@/sanity.types";

// ── Site Settings ───────────────────────────────────────────────

export async function getSiteSettings() {
  return client.fetch<SiteSettingsQueryResult>(
    siteSettingsQuery,
    {},
    { next: { tags: ["siteSettings"] } }
  );
}

export async function getAboutPage() {
  return client.fetch<AboutPageQueryResult>(
    aboutPageQuery,
    {},
    { next: { tags: ["about"] } }
  );
}

export async function getJoinPage() {
  return client.fetch<JoinPageQueryResult>(
    joinPageQuery,
    {},
    // Double tag : "testimonials" pour que l'édition d'un témoignage référencé
    // rafraîchisse aussi /join (le layout est en revalidate = false).
    { next: { tags: ["join", "testimonials"] } }
  );
}

export async function getContactPage() {
  return client.fetch<ContactPageQueryResult>(
    contactPageQuery,
    {},
    { next: { tags: ["contact"] } }
  );
}

export async function getHomePage() {
  return client.fetch<HomePageQueryResult>(
    homePageQuery,
    {},
    { next: { tags: ["homepage", "siteSettings"] } }
  );
}

// ── Articles ────────────────────────────────────────────────────

export async function getArticles() {
  return client.fetch<ArticlesListQueryResult>(
    articlesListQuery,
    {},
    { next: { tags: ["articles"] } }
  );
}

export async function getArticleBySlug(slug: string) {
  return client.fetch<ArticleBySlugQueryResult>(
    articleBySlugQuery,
    { slug },
    { next: { tags: [`article:${slug}`, "articles"] } }
  );
}

// ── Événements ──────────────────────────────────────────────────

export async function getEvents() {
  return client.fetch<EventsListQueryResult>(
    eventsListQuery,
    {},
    { next: { tags: ["events"] } }
  );
}

export async function getEventBySlug(slug: string) {
  return client.fetch<EventBySlugQueryResult>(
    eventBySlugQuery,
    { slug },
    { next: { tags: [`event:${slug}`, "events"] } }
  );
}

// ── Membres ─────────────────────────────────────────────────────

export async function getMembers() {
  return client.fetch<MembersListQueryResult>(
    membersListQuery,
    {},
    { next: { tags: ["members"] } }
  );
}
