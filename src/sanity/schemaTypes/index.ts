import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {productType} from './productType'
import {postType} from './postType'
import {authorType} from './authorType'
import {categoryType} from './categoryType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, authorType, categoryType, postType, productType],
}
