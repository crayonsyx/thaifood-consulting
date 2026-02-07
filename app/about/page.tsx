import type { Metadata } from "next";
import Image from "next/image";
import { images } from "@/lib/images";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import JsonLd from "@/components/shared/JsonLd";
import CTA from "@/components/shared/CTA";
import { personSchema, organizationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the team behind ThaiFood Consulting. Michelin-starred F&B expertise helping restaurants launch and grow across Thailand and Southeast Asia.",
};

const milestones = [
  {
    year: "2009",
    title: "Culinary Beginnings",
    description:
      "Trained at Le Cordon Bleu and began working in Michelin-starred kitchens across Europe and Asia.",
  },
  {
    year: "2015",
    title: "First Consulting Engagement",
    description:
      "Advised on the launch of a fine-dining Thai restaurant in Singapore that earned a Michelin star within two years.",
  },
  {
    year: "2019",
    title: "ThaiFood Consulting Founded",
    description:
      "Established the firm in Bangkok to bring structured, data-driven consulting to the Thai F&B industry.",
  },
  {
    year: "2024",
    title: "50+ Projects Completed",
    description:
      "Expanded across five countries with a track record spanning menu engineering, cloud kitchens, and concept development.",
  },
];

const differentiators = [
  {
    title: "Michelin-Level Standards",
    description:
      "We bring fine-dining discipline and precision to every project, from street food concepts to luxury restaurants.",
  },
  {
    title: "Data-Driven Decisions",
    description:
      "Every recommendation is backed by market research, financial modeling, and real performance data — not gut feeling.",
  },
  {
    title: "End-to-End Support",
    description:
      "From concept to grand opening and beyond, we stay with you through implementation, not just strategy decks.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd data={organizationSchema()} />

      {/* Hero */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
            ]}
          />
          <h1 className="mt-8 font-heading text-4xl font-bold md:text-6xl">
            About Us
          </h1>
        </div>
      </section>

      {/* Founder Story */}
      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-bold">
              Built by Operators, Not Theorists
            </h2>
            <p className="mt-6 text-foreground-muted leading-relaxed">
              ThaiFood Consulting was founded by Penny, a culinary professional
              with over 15 years of experience across Michelin-starred kitchens,
              hotel F&B operations, and independent restaurant ventures in
              Thailand, Singapore, and beyond.
            </p>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              After years of watching talented restaurateurs struggle with the
              business side of food — pricing, operations, market positioning —
              Penny built a consulting practice that bridges the gap between
              culinary excellence and commercial success.
            </p>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              Every engagement is hands-on. We do not hand you a strategy deck
              and walk away. We work alongside your team, in your kitchen, until
              the results show up on your P&L.
            </p>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
            <Image
              src={images.about.portrait}
              alt={images.about.portraitAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Michelin Credentials */}
      <section className="bg-background-secondary py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-accent-gold">
            Credentials
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">
            Michelin-Starred Experience
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground-muted">
            Our team has worked in and consulted for restaurants that hold
            Michelin stars, Bib Gourmand awards, and Asia&apos;s 50 Best
            listings. We bring that standard to every project.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-background-card p-8">
              <p className="font-heading text-4xl font-bold text-accent-gold">
                15+
              </p>
              <p className="mt-2 text-foreground-muted">
                Years in professional kitchens and F&B consulting
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background-card p-8">
              <p className="font-heading text-4xl font-bold text-accent-gold">
                5
              </p>
              <p className="mt-2 text-foreground-muted">
                Countries across Southeast Asia and Europe
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background-card p-8">
              <p className="font-heading text-4xl font-bold text-accent-gold">
                92%
              </p>
              <p className="mt-2 text-foreground-muted">
                Client success rate — still operating after 3 years
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-heading text-3xl font-bold text-center md:text-4xl">
            Our Journey
          </h2>
          <div className="mt-12 space-y-12">
            {milestones.map((milestone) => (
              <div key={milestone.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <span className="font-heading text-lg font-bold text-accent-gold">
                    {milestone.year}
                  </span>
                  <div className="mt-2 h-full w-px bg-border" />
                </div>
                <div className="pb-4">
                  <h3 className="font-heading text-xl font-bold">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-foreground-muted">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="bg-background-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-heading text-3xl font-bold text-center md:text-4xl">
            Why Work With Us
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-background-card p-8"
              >
                <h3 className="font-heading text-xl font-bold">
                  {item.title}
                </h3>
                <p className="mt-3 text-foreground-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Let&apos;s Talk About Your Project
          </h2>
          <p className="mt-4 text-foreground-muted">
            Book a free 30-minute strategy call to discuss your restaurant or
            food business.
          </p>
          <div className="mt-8">
            <CTA href="/free-consultation">Book a Free Call</CTA>
          </div>
        </div>
      </section>
    </>
  );
}
