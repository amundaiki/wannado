import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {faqItemType} from './faqItemType'
import {homePageType} from './homePageType'
import {productType} from './productType'
import {postType} from './postType'
import {authorType} from './authorType'
import {categoryType} from './categoryType'
import {seoType} from './seoType'
import {serviceType} from './serviceType'
import {siteSettingsType} from './siteSettingsType'
import {teamMemberType} from './teamMemberType'
import {testimonialType} from './testimonialType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    seoType,
    homePageType,
    siteSettingsType,
    serviceType,
    faqItemType,
    teamMemberType,
    testimonialType,
    authorType,
    categoryType,
    postType,
    productType,
  ],
}
