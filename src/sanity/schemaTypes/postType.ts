import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

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

export const postType = defineType({
  name: 'post',
  title: 'Blogginnlegg',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{type: 'author'}],
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Utdrag',
      description: 'Kort oppsummering av innlegget (vises i lister og SEO)',
      rows: 3,
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternativ tekst',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      validation: (Rule) =>
        Rule.required()
          .custom((value) => {
            const wordCount = portableTextWordCount(value)

            if (wordCount >= 550) return true

            return `Blogginnlegget har ${wordCount} ord. Sikt på minst 550 ord for bedre søkedekning.`
          })
          .warning(),
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
      media: 'mainImage',
      author: 'author.name',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `Av ${author}`}
    },
  },
})
