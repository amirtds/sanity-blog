export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      group: 'seo',
      validation: Rule => [
        Rule.required().min(40).max(50).error('SEO titles between 40 and 50 characters with commonly searched words have the best click-through-rates'),
      ],
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      group: 'seo',
      validation: Rule => [
        Rule.required().min(50).max(156).error('Good SEO descriptions utilize keywords, summarize the story and are between 140-156 characters long.'),
      ],
      type: 'text',
    },
    {
      name: "ogTitle",
      title: "Open Graph Title",
      group: 'seo',
      validation: Rule => [
        Rule.required().min(40).max(50).error('SEO titles between 40 and 50 characters with commonly searched words have the best click-through-rates'),
      ],
      type: "string",
    },
    {
      name: "ogDescription",
      title: "Open Graph Description",
      group: 'seo',
      validation: Rule => [
        Rule.required().min(50).max(156).error('Good SEO descriptions utilize keywords, summarize the story and are between 140-156 characters long.'),
      ],
      type: "text",
    },
    {
      name: "ogImage",
      title: "Open Graph Image",
      group: 'seo',
      type: "image",
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}
