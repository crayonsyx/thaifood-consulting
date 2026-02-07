"use client";

import { useState } from "react";
import { CheckCircle, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { trackFormSubmission, trackWhatsAppClick } from "@/lib/analytics";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const benefits = [
  "A clear assessment of your concept, market, or operational challenge",
  "Actionable recommendations you can implement immediately",
  "An honest evaluation of whether professional consulting is the right next step",
];

export default function FreeConsultationPage() {
  const [submitting, setSubmitting] = useState(false);
  const whatsappNumber = siteConfig.whatsapp.replace("+", "");

  return (
    <>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              {
                label: "Free Consultation",
                href: "/free-consultation",
              },
            ]}
          />
          <h1 className="mt-8 font-heading text-4xl font-bold md:text-5xl">
            Book Your Free 30-Minute
            <br />
            Strategy Call
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground-muted">
            No obligation, no sales pressure. Just 30 minutes of focused advice
            on your restaurant or food business.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2">
          {/* Form */}
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            onSubmit={() => {
              setSubmitting(true);
              trackFormSubmission("free_consultation");
            }}
          >
            <input
              type="hidden"
              name="access_key"
              value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ""}
            />
            <input
              type="hidden"
              name="subject"
              value="Free Consultation Request"
            />
            <input
              type="hidden"
              name="redirect"
              value={`${siteConfig.url}/thank-you`}
            />
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground-muted"
                >
                  Name <span className="text-accent-gold">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-2 w-full rounded-lg border border-border bg-background-card px-4 py-3 text-foreground placeholder-foreground-subtle focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground-muted"
                >
                  Email <span className="text-accent-gold">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-2 w-full rounded-lg border border-border bg-background-card px-4 py-3 text-foreground placeholder-foreground-subtle focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground-muted"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-2 w-full rounded-lg border border-border bg-background-card px-4 py-3 text-foreground placeholder-foreground-subtle focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
                  placeholder="+66 XX XXX XXXX"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground-muted"
                >
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="mt-2 w-full rounded-lg border border-border bg-background-card px-4 py-3 text-foreground placeholder-foreground-subtle focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold resize-none"
                  placeholder="What stage is your project at? What are your main challenges?"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-accent-gold px-6 py-3 font-medium text-background transition-colors hover:bg-accent-gold-light disabled:opacity-60"
              >
                {submitting
                  ? "Sending..."
                  : "Request My Free Consultation"}
              </button>

              <div className="text-center text-sm text-foreground-subtle">
                <p>We respond within 24 hours. No obligation.</p>
              </div>
            </div>
          </form>

          {/* Right column */}
          <div className="space-y-10">
            {/* WhatsApp CTA */}
            <div className="rounded-xl border border-border bg-background-card p-8">
              <h2 className="font-heading text-2xl font-bold">
                Prefer WhatsApp?
              </h2>
              <p className="mt-2 text-foreground-muted">
                Send us a message directly for the fastest response.
              </p>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick("free_consultation_page")
                }
                className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#25D366" }}
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>

            {/* What you'll get */}
            <div>
              <h2 className="font-heading text-2xl font-bold">
                What You&apos;ll Get
              </h2>
              <ul className="mt-6 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-gold" />
                    <span className="text-foreground-muted">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonial */}
            <div className="rounded-xl border border-border bg-background-card p-8">
              <span className="font-heading text-3xl text-accent-gold">
                &ldquo;
              </span>
              <p className="mt-1 font-heading text-lg italic leading-relaxed">
                The strategy call alone was worth it. Penny identified three
                things we were doing wrong that we had completely missed. We
                signed up for full consulting the same week.
              </p>
              <div className="mt-4">
                <p className="font-medium text-foreground">Sarah Chen</p>
                <p className="text-sm text-foreground-muted">
                  Founder, Bao House Bangkok
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
