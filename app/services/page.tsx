import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/constants";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import JsonLd from "@/components/shared/JsonLd";
import { organizationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Restaurant Consulting Services Thailand",
  description:
    "F&B consulting services: menu engineering, restaurant concept development, cloud kitchen consulting, and feasibility studies across Thailand and Southeast Asia.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: `Services | ${siteConfig.name}`,
    description:
      "Menu engineering, concept development, cloud kitchens, and feasibility studies.",
    url: `${siteConfig.url}/services`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=${encodeURIComponent("Our Services")}&subtitle=${encodeURIComponent("F&B Consulting Thailand")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />

      {/* Hero */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
            ]}
          />
          <h1 className="mt-8 font-heading text-4xl font-bold md:text-6xl">
            Restaurant Consulting Services
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground-muted">
            Comprehensive F&B consulting for every stage of your restaurant
            journey — from first concept to operational excellence.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group overflow-hidden rounded-xl border border-border bg-background-card transition-colors hover:border-accent-gold"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h2 className="font-heading text-2xl font-bold">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-foreground-muted">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-accent-gold transition-colors group-hover:text-accent-gold-light">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
