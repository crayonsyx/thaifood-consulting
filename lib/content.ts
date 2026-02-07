// Content query helpers for Velite collections
// Velite outputs typed data to .velite/ at build time

import type { Post, CaseStudy } from "#site/content";

export function getSortedPosts(posts: Post[]): Post[] {
  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedPosts(posts: Post[]): Post[] {
  return getSortedPosts(posts).filter((p) => p.featured);
}

export function getPostsByCategory(posts: Post[], category: string): Post[] {
  if (category === "all") return getSortedPosts(posts);
  return getSortedPosts(posts).filter((p) => p.category === category);
}

export function getPostBySlug(
  posts: Post[],
  slug: string
): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(
  posts: Post[],
  currentSlug: string,
  category: string,
  limit = 3
): Post[] {
  return getSortedPosts(posts)
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}

export function getSortedCaseStudies(studies: CaseStudy[]): CaseStudy[] {
  return studies.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getCaseStudyBySlug(
  studies: CaseStudy[],
  slug: string
): CaseStudy | undefined {
  return studies.find((s) => s.slug === slug);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
