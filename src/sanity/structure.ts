import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Innhold')
    .items([
      S.documentTypeListItem('post').title('Blogg'),
      S.documentTypeListItem('product').title('Produkter'),
    ])
