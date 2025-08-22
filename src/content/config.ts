import { defineCollection, z } from 'astro:content';

export const collections = {
  work: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()),
      img: z.string(),
      img_alt: z.string().optional(),
      githubUrl: z.string().optional(),
      liveUrl: z.string().optional(),
    }),
  }),
  blog: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()),
      img: z.string(),
      img_alt: z.string().optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      ogImage: z.string().optional(),
    }),
  }),
};
