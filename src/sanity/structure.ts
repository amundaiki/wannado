import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Innhold')
    .items([
      S.listItem()
        .title('Sideinnstillinger')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Sideinnstillinger'),
        ),
      S.listItem()
        .title('Forside')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Forside'),
        ),
      S.divider(),
      S.documentTypeListItem('service').title('Tjenester'),
      S.documentTypeListItem('faqItem').title('FAQ'),
      S.documentTypeListItem('teamMember').title('Team'),
      S.documentTypeListItem('testimonial').title('Referanser'),
      S.divider(),
      S.listItem()
        .title('Blogg')
        .child(
          S.list()
            .title('Blogg')
            .items([
              S.documentTypeListItem('post').title('Innlegg'),
              S.documentTypeListItem('author').title('Forfattere'),
              S.documentTypeListItem('category').title('Kategorier'),
            ]),
        ),
      S.documentTypeListItem('product').title('Produkter'),
    ])
