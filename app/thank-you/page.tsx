import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import CTA from "@/components/shared/CTA";

export const metadata: Metadata = {
  title: "Thank You",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `Thank You | ${siteConfig.name}`,
    description: "Thank you for contacting ThaiFood Consulting. We will be in touch soon.",
    images: [
      {
        url: `${siteConfig.url}/api/og?title=${encodeURIComponent("Thank You")}&subtitle=${encodeURIComponent("We will be in touch soon")}`,
        width: 1200,
        height: 630,
        alt: "Thank You - ThaiFood Consulting",
      },
    ],
  },
};

const steps = [
  {
    number: "1",
    title: "We received your message",
    description:
      "Your enquiry has been sent to our team and is being reviewed.",
  },
  {
    number: "2",
    title: "Expect a reply within 24 hours",
    description:
      "We will get back to you via email with next steps and any follow-up questions.",
  },
  {
    number: "3",
    title: "Schedule your strategy call",
    description:
      "We will set up a free 30-minute call to discuss your project in detail.",
  },
];

export default function ThankYouPage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-accent-gold" />
        <h1 className="mt-6 font-heading text-4xl font-bold md:text-5xl">
          Thank You!
        </h1>
        <p className="mt-4 text-lg text-foreground-muted">
          We have received your message and will be in touch soon.
        </p>

        <div className="mt-16 space-y-8 text-left">
          <h2 className="font-heading text-2xl font-bold text-center">
            What Happens Next
          </h2>
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-accent-gold">
                <span className="text-sm font-bold text-accent-gold">
                  {step.number}
                </span>
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold">
                  {step.title}
                </h3>
                <p className="mt-1 text-foreground-muted">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <CTA href="/">Back to Home</CTA>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-accent-gold transition-colors hover:text-accent-gold-light"
          >
            Read Our Blog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
