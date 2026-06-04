import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Sideinnstillinger',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Sidetittel',
      type: 'string',
      initialValue: 'Wannado',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Kort beskrivelse',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(180),
    }),
    defineField({
      name: 'siteUrl',
      title: 'Nettadresse',
      type: 'url',
      initialValue: 'https://wannado.no',
      validation: (Rule) => Rule.required().uri({scheme: ['https']}),
    }),
    defineField({
      name: 'contact',
      title: 'Kontakt',
      type: 'object',
      fields: [
        defineField({name: 'email', title: 'E-post', type: 'string', validation: (Rule) => Rule.email()}),
        defineField({name: 'phone', title: 'Telefon', type: 'string'}),
        defineField({name: 'address', title: 'Adresse', type: 'string'}),
        defineField({name: 'postalCode', title: 'Postnummer', type: 'string'}),
        defineField({name: 'city', title: 'Sted', type: 'string'}),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Sosiale lenker',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Navn', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri({scheme: ['https']}),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Standard SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Sideinnstillinger',
      }
    },
  },
})
