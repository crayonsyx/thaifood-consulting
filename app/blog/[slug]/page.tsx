import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import {
  getPostBySlug,
  getRelatedPosts,
  formatDate,
  estimateReadingTime,
} from "@/lib/content";
import { siteConfig } from "@/lib/constants";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { images } from "@/lib/images";
import { MDXContent } from "@/components/mdx/MDXContent";
import AuthorCard from "@/components/blog/AuthorCard";
import ShareButtons from "@/components/blog/ShareButtons";
import PostGrid from "@/components/blog/PostGrid";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import JsonLd from "@/components/shared/JsonLd";
import CTA from "@/components/shared/CTA";
import LeadCaptureForm from "@/components/shared/LeadCaptureForm";

export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.excerpt || "";
  const ogImage = post.coverImage
    ? `${siteConfig.url}/${post.coverImage}`
    : `${siteConfig.url}/api/og?title=${encodeURIComponent(post.title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${post.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readTime = estimateReadingTime(post.body);
  const related = await getRelatedPosts(post.slug, post.category ?? "", 2);
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;
  const coverImage = post.coverImage || images.blog.defaultCover;
  const coverAlt = post.coverImageAlt || post.title;

  // Serialize related posts for PostGrid
  const relatedSerialized = related.map((p) => ({
    title: p.title,
    slug: p.slug,
    date: p.date,
    excerpt: p.excerpt ?? "",
    category: p.category ?? "",
    coverImage: p.coverImage ?? undefined,
    coverImageAlt: p.coverImageAlt ?? undefined,
    body: p.body,
  }));

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.seo?.description || post.excerpt || "",
          datePublished: post.date,
          url: postUrl,
          image: coverImage,
          authorName: "Penny",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
          { name: post.title, url: postUrl },
        ])}
      />

      <article className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />

          {/* Header */}
          <header className="mt-8 mb-10 animate-fade-in-up">
            <span className="text-accent-gold uppercase text-xs tracking-wider font-medium">
              {(post.category ?? "").replace(/-/g, " ")}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-foreground-subtle text-sm mb-6">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{readTime} min read</span>
            </div>
            <AuthorCard />
          </header>

          {/* Cover image */}
          <div className="aspect-video relative rounded-xl overflow-hidden mb-12 animate-fade-in-up animation-delay-100">
            <Image
              src={coverImage}
              alt={coverAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          {/* MDX content */}
          <div className="prose prose-lg max-w-none animate-fade-in-up animation-delay-200">
            <MDXContent content={post.body} />
          </div>

          {/* Lead capture CTA */}
          <LeadCaptureForm
            leadMagnet="Free Restaurant P&L Template"
            heading="Plan your restaurant finances"
            description="Get our free P&L template -- the same one Penny uses with her consulting clients across Southeast Asia."
            ctaText="Download Free Template"
            tags="penny_fnb,blog_cta,pnl_template"
            source={`blog_${post.slug}`}
            variant="inline"
          />

          {/* Share buttons */}
          <div className="mt-12 pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4">
            <ShareButtons url={postUrl} title={post.title} />
          </div>

          {/* CTA banner */}
          <div className="mt-12 bg-background-card rounded-xl p-8 border border-border text-center">
            <h2 className="font-heading text-2xl text-foreground mb-3">
              Need help with your restaurant?
            </h2>
            <p className="text-foreground-muted mb-6 max-w-lg mx-auto">
              Book a free strategy call with Penny and get personalized advice
              for your F&amp;B project in Thailand.
            </p>
            <CTA href="/free-consultation">Book a Free Strategy Call</CTA>
          </div>

          {/* Related posts */}
          {relatedSerialized.length > 0 && (
            <section className="mt-16">
              <h2 className="font-heading text-2xl text-foreground mb-8">
                Related Articles
              </h2>
              <PostGrid posts={relatedSerialized} />
            </section>
          )}
        </div>
      </article>
    </>
  );
}
