import {PinIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

function portableTextWordCount(value: unknown) {
  if (!Array.isArray(value)) return 0

  const text = value
    .map((block) => {
      if (
        !block ||
        typeof block !== 'object' ||
        !('children' in block) ||
        !Array.isArray(block.children)
      ) {
        return ''
      }

      return block.children
        .map((child: unknown) =>
          child && typeof child === 'object' && 'text' in child && typeof child.text === 'string'
            ? child.text
            : '',
        )
        .join(' ')
    })
    .join(' ')

  return text.match(/[A-Za-zÀ-ž0-9]+(?:[-’'][A-Za-zÀ-ž0-9]+)*/g)?.length ?? 0
}

export const serviceType = defineType({
  name: 'service',
  title: 'Tjeneste',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (!slug?.current) return 'Slug er påkrevd'
          return /^[a-z0-9-]+$/.test(slug.current)
            ? true
            : 'Bruk små bokstaver, tall og bindestrek'
        }),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'published',
      options: {
        list: [
          {title: 'Publisert', value: 'published'},
          {title: 'Utkast', value: 'draft'},
          {title: 'Arkivert', value: 'archived'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Kajakk', value: 'kajakk'},
          {title: 'Seiltur', value: 'seiltur'},
          {title: 'Teambuilding', value: 'teambuilding'},
          {title: 'Kurs', value: 'kurs'},
          {title: 'Foredrag', value: 'foredrag'},
          {title: 'Hest', value: 'hest'},
          {title: 'Utleie', value: 'utleie'},
          {title: 'Gavekort', value: 'gavekort'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Kort ingress',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(180),
    }),
    defineField({
      name: 'body',
      title: 'Beskrivelse',
      type: 'blockContent',
      validation: (Rule) =>
        Rule.required()
          .custom((value) => {
            const wordCount = portableTextWordCount(value)

            if (wordCount >= 180) return true

            return `Tjenesteteksten har ${wordCount} ord. Sikt på minst 180 ord for bedre søkedekning.`
          })
          .warning(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hovedbilde',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required().warning('Legg inn hovedbilde før publisering.'),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternativ tekst',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Bildegalleri',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternativ tekst',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'details',
      title: 'Praktiske detaljer',
      type: 'object',
      fields: [
        defineField({name: 'duration', title: 'Varighet', type: 'string'}),
        defineField({name: 'groupSize', title: 'Gruppestørrelse', type: 'string'}),
        defineField({name: 'location', title: 'Sted', type: 'string'}),
        defineField({name: 'meetingPoint', title: 'Oppmøtested', type: 'string'}),
        defineField({name: 'season', title: 'Sesong', type: 'string'}),
      ],
    }),
    defineField({
      name: 'pricing',
      title: 'Pris',
      type: 'object',
      fields: [
        defineField({
          name: 'priceFrom',
          title: 'Pris fra',
          type: 'number',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({name: 'priceText', title: 'Prisforklaring', type: 'string'}),
      ],
    }),
    defineField({
      name: 'booking',
      title: 'Booking',
      type: 'object',
      fields: [
        defineField({
          name: 'mode',
          title: 'Bookingmåte',
          type: 'string',
          initialValue: 'inquiry',
          options: {
            list: [
              {title: 'Checkin-kalender', value: 'checkin'},
              {title: 'Forespørselsskjema', value: 'inquiry'},
              {title: 'Telefon og e-post', value: 'contact'},
            ],
            layout: 'radio',
          },
        }),
        defineField({
          name: 'checkinTopicId',
          title: 'Checkin topic ID',
          type: 'string',
          hidden: ({parent}) => parent?.mode !== 'checkin',
        }),
        defineField({
          name: 'ctaLabel',
          title: 'Knappetekst',
          type: 'string',
          initialValue: 'Send forespørsel',
        }),
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'Relevante FAQ-er',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'faqItem'}]})],
    }),
    defineField({
      name: 'relatedServices',
      title: 'Relaterte tjenester',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
      category: 'category',
      status: 'status',
    },
    prepare({title, media, category, status}) {
      return {
        title,
        media,
        subtitle: [category, status !== 'published' ? status : undefined].filter(Boolean).join(' · '),
      }
    },
  },
})
