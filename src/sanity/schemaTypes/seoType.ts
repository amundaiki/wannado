import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO-tittel',
      type: 'string',
      description: 'Overstyrer sidetittel i søkeresultater og delinger.',
      validation: (Rule) => Rule.max(60).warning('Hold tittelen under 60 tegn.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Kort tekst for søkeresultater og delinger.',
      validation: (Rule) => Rule.max(160).warning('Hold teksten under 160 tegn.'),
    }),
    defineField({
      name: 'image',
      title: 'Delingsbilde',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternativ tekst',
          type: 'string',
          validation: (Rule) => Rule.required().warning('Alt-tekst er viktig for SEO.'),
        }),
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'Skjul fra søkemotorer',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
