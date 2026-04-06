import { groq } from "next-sanity";

// ── Fragments réutilisables ─────────────────────────────────────

const imageFields = groq`
  "url": asset->url,
  alt
`;

const seoFields = groq`
  seo {
    title,
    description,
    image { ${imageFields} }
  }
`;

// ── Site Settings ───────────────────────────────────────────────

export const siteSettingsQuery = groq`
  *[_id == "siteSettings"][0] {
    associationName,
    tagline,
    shortMission,
    "logo": logo { ${imageFields} },
    contactEmails[] {
      label,
      email,
      description,
      icon
    },
    socialLinks[] {
      platform,
      url
    },
    footerColumns[] {
      title,
      links[] {
        label,
        href
      }
    }
  }
`;

// ── Pages singletons ────────────────────────────────────────────

export const homePageQuery = groq`
  *[_id == "homePage"][0] {
    welcome {
      titlePrefix,
      titleHighlight,
      subtitle
    },
    whyFeminine {
      title,
      items[] { _key, text, icon }
    },
    whatWeDo {
      title,
      items[] { _key, title, description, icon }
    },
    callToAction {
      title,
      subtitle,
      items[] { _key, title, description, icon, buttonLabel, href, variant }
    },
    seo { title, description }
  }
`;

export const contactPageQuery = groq`
  *[_id == "contactPage"][0] {
    hero { title, subtitle },
    formIntro,
    contactInfoTitle,
    seo { title, description }
  }
`;

export const joinPageQuery = groq`
  *[_id == "joinPage"][0] {
    hero { title, subtitle },
    whyJoin {
      title,
      items[] { _key, text, icon }
    },
    modalities[] { _key, title, description, icon },
    membershipFee { amount, year },
    cta { title, body, button { label, href } },
    seo { title, description }
  }
`;

export const aboutPageQuery = groq`
  *[_id == "aboutPage"][0] {
    hero { title, subtitle },
    mission { title, body },
    history { title, body },
    values[] { _key, title, description, icon },
    keyActions[] { _key, title, description, icon },
    seo { title, description }
  }
`;

// ── Articles ────────────────────────────────────────────────────

export const articlesListQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    "author": author->firstName + " " + author->lastName,
    "date": publishedAt,
    "image": mainImage { ${imageFields} },
    categories
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    "author": author->firstName + " " + author->lastName,
    "date": publishedAt,
    "image": mainImage { ${imageFields} },
    body,
    categories,
    ${seoFields}
  }
`;

export const recentArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) [0...3] {
    "id": _id,
    title,
    "slug": slug.current,
    "author": author->firstName + " " + author->lastName,
    "date": publishedAt,
    "image": mainImage { ${imageFields} },
    categories
  }
`;

// ── Événements ──────────────────────────────────────────────────

export const eventsListQuery = groq`
  *[_type == "event"] | order(startDate desc) {
    "id": _id,
    title,
    "slug": slug.current,
    "date": startDate,
    endDate,
    location,
    description,
    "image": mainImage { ${imageFields} },
    registrationLink,
    status
  }
`;

export const upcomingEventsQuery = groq`
  *[_type == "event" && status == "upcoming"] | order(startDate asc) {
    "id": _id,
    title,
    "slug": slug.current,
    "date": startDate,
    location,
    description,
    "image": mainImage { ${imageFields} },
    registrationLink,
    status
  }
`;

// ── Membres ─────────────────────────────────────────────────────

export const membersListQuery = groq`
  *[_type == "member"] | order(
    select(
      role == "presidente" => 0,
      role == "vice-presidente" => 1,
      role == "tresoriere" => 2,
      role == "secretaire" => 3,
      4
    ) asc,
    lastName asc
  ) {
    "id": _id,
    firstName,
    lastName,
    role,
    specialty,
    biography,
    photo { ${imageFields} },
    email,
    phone,
    linkedin
  }
`;

// ── Pages ───────────────────────────────────────────────────────

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    content,
    ${seoFields}
  }
`;

// ── Témoignages ─────────────────────────────────────────────────

export const testimonialsListQuery = groq`
  *[_type == "testimonial"] {
    "id": _id,
    name,
    role,
    content,
    image { ${imageFields} }
  }
`;
