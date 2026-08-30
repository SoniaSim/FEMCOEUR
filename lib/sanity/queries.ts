import { defineQuery } from "groq";

// ── Fragments réutilisables ─────────────────────────────────────
// Les fragments ne sont pas des queries autonomes → pas de defineQuery

const imageFields = `
  "url": asset->url,
  alt
`;

const seoFields = `
  seo {
    title,
    description,
    image { ${imageFields} }
  }
`;

// ── Site Settings ───────────────────────────────────────────────

export const siteSettingsQuery = defineQuery(`
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
    newsletter {
      title,
      description,
      buttonLabel
    },
    footerColumns[] {
      title,
      links[] {
        label,
        href
      }
    }
  }
`);

// ── Pages singletons ────────────────────────────────────────────

export const homePageQuery = defineQuery(`
  *[_id == "homePage"][0] {
    welcome {
      titlePrefix,
      titleHighlight,
      tagline,
      subtitle,
      "heroImage": heroImage { ${imageFields} }
    },
    keyStats {
      eyebrow,
      title,
      items[] { _key, value, label, sourceLabel, sourceUrl }
    },
    whyFeminine {
      title,
      items[] { _key, title, text, icon }
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
`);

export const contactPageQuery = defineQuery(`
  *[_id == "contactPage"][0] {
    hero { title, subtitle },
    formIntro,
    contactInfoTitle,
    seo { title, description }
  }
`);

export const joinPageQuery = defineQuery(`
  *[_id == "joinPage"][0] {
    hero { title, subtitle, cta { label, href } },
    modalities[] { _key, title, description, icon },
    membershipFee { amount, year },
    testimonials[]->{ _id, name, role, content, image { ${imageFields} } },
    cta { title, body, button { label, href } },
    seo { title, description }
  }
`);

export const aboutPageQuery = defineQuery(`
  *[_id == "aboutPage"][0] {
    hero { title, subtitle },
    mission {
      title,
      body,
      images[] {
        _key,
        "url": asset->url,
        alt,
        "hotspot": hotspot { x, y }
      }
    },
    history { title, body },
    values[] { _key, title, description, icon },
    keyActions[] { _key, title, description, icon },
    seo { title, description }
  }
`);

// ── Articles ────────────────────────────────────────────────────

export const articlesListQuery = defineQuery(`
  *[_type == "article"] | order(publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    "author": author->firstName + " " + author->lastName,
    "date": publishedAt,
    "image": mainImage { ${imageFields} },
    categories
  }
`);

export const articleBySlugQuery = defineQuery(`
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
`);

// ── Événements ──────────────────────────────────────────────────

export const eventsListQuery = defineQuery(`
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
    recapLink,
    "relatedArticleSlug": relatedArticle->slug.current,
    "relatedArticleTitle": relatedArticle->title,
    status
  }
`);

export const eventBySlugQuery = defineQuery(`
  *[_type == "event" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    "date": startDate,
    endDate,
    location,
    description,
    "image": mainImage { ${imageFields} },
    "gallery": gallery[defined(asset)]{
      _key,
      "url": asset->url,
      alt,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "lqip": asset->metadata.lqip
    },
    registrationLink,
    recapLink,
    "relatedArticleSlug": relatedArticle->slug.current,
    "relatedArticleTitle": relatedArticle->title,
    status,
    ${seoFields}
  }
`);

// ── Membres ─────────────────────────────────────────────────────

export const membersListQuery = defineQuery(`
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
`);

