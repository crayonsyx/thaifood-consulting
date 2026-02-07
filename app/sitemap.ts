import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { services } from "@/lib/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/free-consultation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic content pages will be added when Velite content is available
  let blogPages: MetadataRoute.Sitemap = [];
  let caseStudyPages: MetadataRoute.Sitemap = [];

  try {
    const { blogs, caseStudies } = await import("#site/content");
    blogPages = blogs
      .filter((p: { published: boolean }) => p.published)
      .map((post: { slug: string; date: string }) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    caseStudyPages = caseStudies.map((study: { slug: string; date: string }) => ({
      url: `${baseUrl}/case-studies/${study.slug}`,
      lastModified: new Date(study.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Content not yet built — return static pages only
  }

  return [...staticPages, ...servicePages, ...blogPages, ...caseStudyPages];
}
