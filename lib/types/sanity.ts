/**
 * Types dérivés depuis sanity.types.ts
 * Ne pas modifier manuellement — schémas / queries puis `npm run sanity:types`
 */

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

// ── Pages singletons ───────────────────────────────────────────

export type SiteSettings = NonNullable<SiteSettingsQueryResult>;
export type HomePage = NonNullable<HomePageQueryResult>;
export type ContactPage = NonNullable<ContactPageQueryResult>;
export type JoinPage = NonNullable<JoinPageQueryResult>;
export type AboutPage = NonNullable<AboutPageQueryResult>;

// ── Listes ────────────────────────────────────────────────────

export type Article = ArticlesListQueryResult[number];
export type ArticleDetail = NonNullable<ArticleBySlugQueryResult>;
export type Event = EventsListQueryResult[number];
export type EventDetail = NonNullable<EventBySlugQueryResult>;
export type Member = MembersListQueryResult[number];

// ── Sous-types extraits pour les composants ───────────────────

// SiteSettings
export type ContactEmail = NonNullable<
  NonNullable<SiteSettingsQueryResult>["contactEmails"]
>[number];
export type SocialLink = NonNullable<
  NonNullable<SiteSettingsQueryResult>["socialLinks"]
>[number];
export type FooterColumn = NonNullable<
  NonNullable<SiteSettingsQueryResult>["footerColumns"]
>[number];
export type FooterLink = NonNullable<FooterColumn["links"]>[number];

// HomePage
export type HomeWhyItem = NonNullable<
  NonNullable<NonNullable<HomePageQueryResult>["whyFeminine"]>["items"]
>[number];
export type HomeWhatItem = NonNullable<
  NonNullable<NonNullable<HomePageQueryResult>["whatWeDo"]>["items"]
>[number];
export type HomeCtaItem = NonNullable<
  NonNullable<NonNullable<HomePageQueryResult>["callToAction"]>["items"]
>[number];

// Partagé entre AboutPage (values, keyActions) et JoinPage (modalities)
export type IconItem = NonNullable<
  NonNullable<AboutPageQueryResult>["values"]
>[number];
