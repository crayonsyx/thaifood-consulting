// Content query helpers using TinaCMS database client
// Server-side only — do NOT import this from client components
// For client-safe utilities, use lib/utils.ts

import { cache } from "react";
import { databaseClient } from "@/tina/__generated__/databaseClient";

// Re-export client-safe utilities for convenience in server components
export { formatDate, estimateReadingTime } from "./utils";

// Simplified types matching what TinaCMS queries return
export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt?: string | null;
  category?: string | null;
  tags?: (string | null)[] | null;
  coverImage?: string | null;
  coverImageAlt?: string | null;
  author?: string | null;
  featured?: boolean | null;
  published?: boolean | null;
  seo?: {
    title?: string | null;
    description?: string | null;
  } | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}

export interface CaseStudyPost {
  title: string;
  slug: string;
  date: string;
  client?: string | null;
  industry: string;
  excerpt?: string | null;
  coverImage?: string | null;
  coverImageAlt?: string | null;
  metrics?: ({
    label?: string | null;
    before?: string | null;
    after?: string | null;
  } | null)[] | null;
  testimonial?: {
    quote?: string | null;
    author?: string | null;
    role?: string | null;
  } | null;
  seo?: {
    title?: string | null;
    description?: string | null;
  } | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}

// --- Blog Queries ---

export const getAllPosts = cache(async (): Promise<BlogPost[]> => {
  const result = await databaseClient.queries.blogConnection({
    sort: "date",
    last: 100,
  });

  const posts =
    result.data.blogConnection.edges
      ?.map((edge) => edge?.node)
      .filter((node) => node != null) ?? [];

  // Sort descending (TinaCMS sorts ascending)
  return (posts as BlogPost[]).reverse();
});

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.published !== false);
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter((p) => p.featured === true);
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  if (category === "all") return getPublishedPosts();
  const posts = await getPublishedPosts();
  return posts.filter((p) => p.category === category);
}

export const getPostBySlug = cache(async (
  slug: string
): Promise<BlogPost | undefined> => {
  try {
    const result = await databaseClient.queries.blog({
      relativePath: `${slug}.mdx`,
    });
    return result.data.blog as BlogPost;
  } catch {
    return undefined;
  }
});

export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3
): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}

// --- Case Study Queries ---

export const getAllCaseStudies = cache(async (): Promise<CaseStudyPost[]> => {
  const result = await databaseClient.queries.caseStudyConnection({
    sort: "date",
    last: 100,
  });

  const studies =
    result.data.caseStudyConnection.edges
      ?.map((edge) => edge?.node)
      .filter((node) => node != null) ?? [];

  return (studies as CaseStudyPost[]).reverse();
});

export const getCaseStudyBySlug = cache(async (
  slug: string
): Promise<CaseStudyPost | undefined> => {
  try {
    const result = await databaseClient.queries.caseStudy({
      relativePath: `${slug}.mdx`,
    });
    return result.data.caseStudy as CaseStudyPost;
  } catch {
    return undefined;
  }
});
