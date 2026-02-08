import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/content";

export const revalidate = 60;
import { siteConfig } from "@/lib/constants";
import { breadcrumbSchema } from "@/lib/seo";
import JsonLd from "@/components/shared/JsonLd";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real results from real F&B projects across Thailand and Southeast Asia. See how we help restaurants, cloud kitchens, and food businesses grow.",
  openGraph: {
    title: `Case Studies | ${siteConfig.name}`,
    description:
      "Real results from real F&B projects across Thailand and Southeast Asia.",
    url: `${siteConfig.url}/case-studies`,
  },
};

export default async function CaseStudiesPage() {
  const sorted = await getAllCaseStudies();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Case Studies", url: `${siteConfig.url}/case-studies` },
        ])}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Case Studies", href: "/case-studies" },
            ]}
          />

          <div className="mt-8 mb-12 animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              Our Work
            </h1>
            <p className="text-foreground-muted text-lg max-w-2xl">
              Real results from real projects across Thailand and Southeast
              Asia.
            </p>
          </div>

          {sorted.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 animate-fade-in-up animation-delay-100">
              {sorted.map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 animate-fade-in-up animation-delay-100">
              <p className="text-foreground-muted text-lg">
                Case studies coming soon. We are documenting our latest
                projects.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
