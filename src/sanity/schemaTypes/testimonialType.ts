import {CommentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Referanse',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Sitat',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(420),
    }),
    defineField({
      name: 'person',
      title: 'Navn',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Firma eller gruppe',
      type: 'string',
    }),
    defineField({
      name: 'source',
      title: 'Kilde',
      type: 'string',
      initialValue: 'customer',
      options: {
        list: [
          {title: 'Kunde', value: 'customer'},
          {title: 'TripAdvisor', value: 'tripadvisor'},
          {title: 'Media', value: 'media'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'context',
      title: 'Kontekst eller utdrag',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(260),
    }),
    defineField({
      name: 'rating',
      title: 'Vurdering',
      type: 'string',
      description: 'For eksempel 4.5/5 når kilden har offentlig rating.',
    }),
    defineField({
      name: 'year',
      title: 'År',
      type: 'number',
      validation: (Rule) => Rule.integer().min(2005).max(2100),
    }),
    defineField({
      name: 'order',
      title: 'Sortering',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.integer(),
    }),
    defineField({
      name: 'service',
      title: 'Tilknyttet tjeneste',
      type: 'reference',
      to: [{type: 'service'}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Dato',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'company',
      person: 'person',
      source: 'source',
      quote: 'quote',
    },
    prepare({title, person, source, quote}) {
      return {
        title: title || person || 'Referanse',
        subtitle: [source, quote].filter(Boolean).join(' | '),
      }
    },
  },
})
