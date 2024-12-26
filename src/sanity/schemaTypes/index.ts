import { type SchemaTypeDefinition } from 'sanity'
import { post } from '../post'
import { author } from '../atuhor'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post,author],
}
