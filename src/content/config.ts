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
      role: z.string().optional(),
      timeline: z.string().optional(),
      team: z.string().optional(),
      projectType: z.string().optional(),
      techStack: z.array(z.string()).optional(),
      overview: z.string().optional(),
      problem: z.string().optional(),
      goals: z.union([z.string(), z.array(z.string())]).optional(),
      challenges: z
        .union([
          z.string(),
          z.array(z.string()),
          z.array(
            z.object({
              challenge: z.string().optional(),
              title: z.string().optional(),
              solution: z.string().optional(),
              description: z.string().optional(),
            })
          ),
        ])
        .optional(),
      results: z.union([z.string(), z.array(z.string())]).optional(),
      metrics: z
        .array(
          z.object({
            value: z.string(),
            label: z.string(),
          })
        )
        .optional(),
      learnings: z.union([z.string(), z.array(z.string())]).optional(),
      improvements: z.union([z.string(), z.array(z.string())]).optional(),
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
