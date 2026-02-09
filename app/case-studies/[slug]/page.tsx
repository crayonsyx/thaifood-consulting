import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, formatDate } from "@/lib/content";
import { siteConfig } from "@/lib/constants";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { images } from "@/lib/images";
import JsonLd from "@/components/shared/JsonLd";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTA from "@/components/shared/CTA";
import MetricsGrid from "@/components/case-studies/MetricsGrid";
import TestimonialBlock from "@/components/case-studies/TestimonialBlock";
import CaseStudyContent from "@/components/case-studies/CaseStudyContent";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    return { title: "Case Study Not Found" };
  }

  const title = study.seo?.title || study.title;
  const description = study.seo?.description || study.excerpt || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/case-studies/${study.slug}`,
      type: "article",
      publishedTime: study.date,
      images: study.coverImage
        ? [{ url: `${siteConfig.url}/${study.coverImage}`, alt: study.coverImageAlt || study.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  // Normalize metrics for MetricsGrid (filter nulls)
  const metrics =
    study.metrics
      ?.filter(
        (m): m is { label: string; before: string; after: string } =>
          Boolean(m?.label && m?.before && m?.after)
      ) ?? [];

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: study.title,
          description: study.seo?.description || study.excerpt || "",
          datePublished: study.date,
          url: `${siteConfig.url}/case-studies/${study.slug}`,
          image: study.coverImage ?? undefined,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Case Studies", url: `${siteConfig.url}/case-studies` },
          {
            name: study.title,
            url: `${siteConfig.url}/case-studies/${study.slug}`,
          },
        ])}
      />

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end">
        <Image
          src={study.coverImage || images.caseStudies.italianBistro}
          alt={study.coverImageAlt || study.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto px-6 pb-12">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Case Studies", href: "/case-studies" },
                { label: study.title, href: `/case-studies/${study.slug}` },
              ]}
            />
            <div className="mt-6">
              <span className="bg-background/80 backdrop-blur px-3 py-1 rounded-full text-xs uppercase tracking-wider text-accent-gold">
                {study.industry}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mt-4 leading-tight">
              {study.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-foreground-muted text-sm">
              <span>{study.client ?? "Confidential"}</span>
              <span aria-hidden="true">&middot;</span>
              <time dateTime={study.date}>{formatDate(study.date)}</time>
            </div>
          </div>
        </div>
      </section>

      {/* MDX Body */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <CaseStudyContent content={study.body} />
        </div>
      </section>

      {/* Results / Metrics */}
      {metrics.length > 0 && (
        <section className="py-16 bg-background-secondary">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-10 text-center">
              The Results
            </h2>
            <MetricsGrid metrics={metrics} />
          </div>
        </section>
      )}

      {/* Testimonial */}
      {study.testimonial && (
        <TestimonialBlock
          quote={study.testimonial.quote ?? ""}
          author={study.testimonial.author ?? ""}
          role={study.testimonial.role ?? ""}
        />
      )}

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Want results like these?
          </h2>
          <p className="mt-4 text-lg text-foreground-muted">
            Book your free strategy call and let us show you what is possible.
          </p>
          <div className="mt-10">
            <CTA href="/free-consultation">Book a Free Strategy Call</CTA>
          </div>
          <p className="mt-6 text-sm text-foreground-subtle">
            Free 30-minute consultation. No obligation.
          </p>
        </div>
      </section>
    </>
  );
}
