import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { services, getServiceBySlug } from "@/lib/services";
import { siteConfig } from "@/lib/constants";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import JsonLd from "@/components/shared/JsonLd";
import CTA from "@/components/shared/CTA";
import FAQAccordion from "@/components/shared/FAQAccordion";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: `${siteConfig.url}/services/${slug}`,
    },
    openGraph: {
      title: `${service.shortTitle} | ${siteConfig.name}`,
      description: service.description,
      url: `${siteConfig.url}/services/${slug}`,
      images: [
        {
          url: `${siteConfig.url}/api/og?title=${encodeURIComponent(service.shortTitle)}&subtitle=${encodeURIComponent("F&B Consulting Service")}`,
          width: 1200,
          height: 630,
          alt: `${service.shortTitle} - ThaiFood Consulting`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.shortTitle} | ${siteConfig.name}`,
      description: service.description,
      images: [
        {
          url: `${siteConfig.url}/api/og?title=${encodeURIComponent(service.shortTitle)}&subtitle=${encodeURIComponent("F&B Consulting Service")}`,
          alt: `${service.shortTitle} - ThaiFood Consulting`,
        },
      ],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const serviceSchemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "Thailand",
    },
  };

  return (
    <>
      <JsonLd data={serviceSchemaData} />
      <JsonLd data={faqSchemaData} />

      {/* Hero */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              {
                label: service.shortTitle,
                href: `/services/${service.slug}`,
              },
            ]}
          />
          <h1 className="mt-8 font-heading text-4xl font-bold md:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-foreground-muted">
            {service.description}
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative aspect-[21/9] overflow-hidden rounded-xl">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-heading text-3xl font-bold">The Problem</h2>
          <p className="mt-6 text-lg text-foreground-muted leading-relaxed">
            {service.problem}
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-background-secondary py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-heading text-3xl font-bold">What You Get</h2>
          <ul className="mt-8 space-y-4">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex gap-3">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-accent-gold" />
                <span className="text-foreground-muted">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-heading text-3xl font-bold">Our Process</h2>
          <div className="mt-10 space-y-10">
            {service.process.map((step, index) => (
              <div key={step.step} className="flex gap-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-accent-gold">
                  <span className="font-heading text-lg font-bold text-accent-gold">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold">
                    {step.step}
                  </h3>
                  <p className="mt-2 text-foreground-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-background-secondary py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-heading text-3xl font-bold text-center">
            Results You Can Expect
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {service.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <p className="font-heading text-4xl font-bold text-accent-gold">
                  {metric.value}
                </p>
                <p className="mt-2 text-foreground-muted">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-heading text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="mt-8">
            <FAQAccordion faqs={service.faqs} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background-secondary py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-foreground-muted">
            Book a free 30-minute strategy call to discuss how we can help with{" "}
            {service.shortTitle.toLowerCase()}.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CTA href="/free-consultation">Book a Free Call</CTA>
            <CTA href="/contact" variant="secondary">
              Get in Touch
            </CTA>
          </div>
        </div>
      </section>
    </>
  );
}
