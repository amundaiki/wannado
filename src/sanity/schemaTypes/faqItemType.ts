import {HelpCircleIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const faqItemType = defineType({
  name: 'faqItem',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Spørsmål',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Svar',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Generelt', value: 'generelt'},
          {title: 'Booking', value: 'booking'},
          {title: 'Kajakk', value: 'kajakk'},
          {title: 'Seiltur', value: 'seiltur'},
          {title: 'Bedrift', value: 'bedrift'},
          {title: 'Sikkerhet', value: 'sikkerhet'},
          {title: 'Praktisk informasjon', value: 'praktisk'},
        ],
      },
    }),
    defineField({
      name: 'relatedServices',
      title: 'Relaterte tjenester',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})],
    }),
    defineField({
      name: 'order',
      title: 'Sortering',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'question',
      category: 'category',
    },
    prepare({title, category}) {
      return {
        title,
        subtitle: category,
      }
    },
  },
})
