import { defineConfig, defineCollection, s } from "velite";

const blogs = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      slug: s.slug("blog"),
      date: s.isodate(),
      excerpt: s.string().max(300),
      category: s.string(),
      tags: s.array(s.string()).optional(),
      coverImage: s.string().optional(),
      coverImageAlt: s.string().optional(),
      author: s.string().default("penny"),
      featured: s.boolean().default(false),
      published: s.boolean().default(true),
      seo: s
        .object({
          title: s.string().optional(),
          description: s.string().optional(),
        })
        .optional(),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/blog/${data.slug}`,
    })),
});

const caseStudies = defineCollection({
  name: "CaseStudy",
  pattern: "case-studies/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      slug: s.slug("case-studies"),
      date: s.isodate(),
      client: s.string().default("Confidential"),
      industry: s.string(),
      excerpt: s.string().max(300),
      coverImage: s.string().optional(),
      coverImageAlt: s.string().optional(),
      metrics: s
        .array(
          s.object({
            label: s.string(),
            before: s.string(),
            after: s.string(),
          })
        )
        .optional(),
      testimonial: s
        .object({
          quote: s.string(),
          author: s.string(),
          role: s.string(),
        })
        .optional(),
      seo: s
        .object({
          title: s.string().optional(),
          description: s.string().optional(),
        })
        .optional(),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/case-studies/${data.slug}`,
    })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { blogs, caseStudies },
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
