import blockContentSchema from './objects/blockContent'
import seoSchema from './objects/seo'
import iconPickerSchema from './objects/iconPicker'
import ctaButtonSchema from './objects/ctaButton'
import socialLinkSchema from './objects/socialLink'
import articleSchema from './documents/article'
import eventSchema from './documents/event'
import memberSchema from './documents/member'
import resourceSchema from './documents/resource'
import pageSchema from './documents/page'
import testimonialSchema from './documents/testimonial'
import siteSettingsSchema from './documents/singletons/siteSettings'
import homePageSchema from './documents/singletons/homePage'
import aboutPageSchema from './documents/singletons/aboutPage'
import contactPageSchema from './documents/singletons/contactPage'
import joinPageSchema from './documents/singletons/joinPage'

export const schemaTypes = [
  // Objects
  blockContentSchema,
  seoSchema,
  iconPickerSchema,
  ctaButtonSchema,
  socialLinkSchema,
  // Singletons
  siteSettingsSchema,
  homePageSchema,
  aboutPageSchema,
  contactPageSchema,
  joinPageSchema,
  // Documents
  articleSchema,
  eventSchema,
  memberSchema,
  resourceSchema,
  pageSchema,
  testimonialSchema,
]
