import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

function isInternalPath(value: string | undefined) {
  if (!value) return 'Lenke er påkrevd'
  if (!value.startsWith('/')) return 'Bruk intern sti som starter med /'
  if (/[^a-zA-Z0-9\-_/#?=&]/.test(value)) return 'Lenken inneholder ugyldige tegn'
  return true
}

export const homePageType = defineType({
  name: 'homePage',
  title: 'Forside',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Intern tittel',
      type: 'string',
      initialValue: 'Forside',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Hovedoverskrift',
          type: 'string',
          validation: (Rule) => Rule.required().max(72),
        }),
        defineField({
          name: 'rotatingWords',
          title: 'Roterende ord',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
          validation: (Rule) => Rule.required().min(2).max(5).unique(),
        }),
        defineField({
          name: 'intro',
          title: 'Ingress',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required().min(80).max(220),
        }),
        defineField({
          name: 'primaryCtaLabel',
          title: 'Primærknapp tekst',
          type: 'string',
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: 'primaryCtaHref',
          title: 'Primærknapp lenke',
          type: 'string',
          validation: (Rule) => Rule.required().custom(isInternalPath),
        }),
        defineField({
          name: 'posterImage',
          title: 'Posterbilde',
          type: 'image',
          options: {hotspot: true},
          validation: (Rule) => Rule.required().warning('Legg inn posterbilde for god mobil og deling.'),
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
      name: 'featuredIntro',
      title: 'Opplevelsesintro',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Overlinje',
          type: 'string',
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: 'title',
          title: 'Tittel',
          type: 'string',
          validation: (Rule) => Rule.required().max(70),
        }),
      ],
    }),
    defineField({
      name: 'featuredServices',
      title: 'Fremhevede tjenester',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})],
      validation: (Rule) => Rule.required().min(4).max(6).unique(),
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
      subtitle: 'hero.heading',
      media: 'hero.posterImage',
    },
  },
})
