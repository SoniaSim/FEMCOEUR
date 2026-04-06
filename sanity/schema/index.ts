import blockContentSchema from './objects/blockContent'
import seoSchema from './objects/seo'
import articleSchema from './documents/article'
import eventSchema from './documents/event'
import memberSchema from './documents/member'
import resourceSchema from './documents/resource'
import pageSchema from './documents/page'
import testimonialSchema from './documents/testimonial'

export const schemaTypes = [
  // Objects
  blockContentSchema,
  seoSchema,
  // Documents
  articleSchema,
  eventSchema,
  memberSchema,
  resourceSchema,
  pageSchema,
  testimonialSchema,
]
