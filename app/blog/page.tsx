import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/content";

export const dynamic = "force-dynamic";
import { siteConfig } from "@/lib/constants";
import { breadcrumbSchema } from "@/lib/seo";
import JsonLd from "@/components/shared/JsonLd";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blog | Insights & Guides",
  description:
    "Practical advice on opening and running restaurants in Thailand, from a consultant who has done it at the highest level.",
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description:
      "Practical advice on opening and running restaurants in Thailand.",
    url: `${siteConfig.url}/blog`,
  },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  // Serialize posts for client component (strip rich-text body, keep what's needed)
  const serializedPosts = posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    date: post.date,
    excerpt: post.excerpt ?? "",
    category: post.category ?? "",
    coverImage: post.coverImage ?? undefined,
    coverImageAlt: post.coverImageAlt ?? undefined,
    body: post.body,
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
        ])}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
            ]}
          />

          <div className="mt-8 mb-12 animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              Insights &amp; Guides
            </h1>
            <p className="text-foreground-muted text-lg max-w-2xl">
              Practical advice on opening and running restaurants in Thailand,
              from a consultant who has done it at the highest level.
            </p>
          </div>

          <BlogListClient posts={serializedPosts} />
        </div>
      </section>
    </>
  );
}
