"use client";

import { useState } from "react";
import { Mail, MessageCircle, Clock } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { trackFormSubmission, trackWhatsAppClick } from "@/lib/analytics";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import JsonLd from "@/components/shared/JsonLd";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const whatsappNumber = siteConfig.whatsapp.replace("+", "");

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    contactType: "customer service",
    availableLanguage: ["English"],
    areaServed: {
      "@type": "Country",
      name: "Thailand",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressCountry: "TH",
    },
  };

  return (
    <>
      <JsonLd data={contactSchema} />
      <JsonLd data={localBusinessSchema} />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Contact", href: "/contact" },
            ]}
          />
          <h1 className="mt-8 font-heading text-4xl font-bold md:text-6xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground-muted">
            Have a question or ready to start a project? Get in touch and we
            will respond within 24 hours.
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
              trackFormSubmission("contact");
            }}
          >
            <input
              type="hidden"
              name="access_key"
              value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ""}
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
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="mt-2 w-full rounded-lg border border-border bg-background-card px-4 py-3 text-foreground placeholder-foreground-subtle focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold resize-none"
                  placeholder="Tell us about your project..."
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

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold">
                Prefer a Direct Conversation?
              </h2>
              <p className="mt-2 text-foreground-muted">
                Reach out via WhatsApp for the fastest response.
              </p>
            </div>

            <div className="space-y-6">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("contact_page")}
                className="flex items-center gap-4 rounded-xl border border-border bg-background-card p-5 transition-colors hover:border-accent-gold"
              >
                <MessageCircle className="h-6 w-6 text-accent-gold" />
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-sm text-foreground-muted">
                    {siteConfig.whatsapp}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-background-card p-5 transition-colors hover:border-accent-gold"
              >
                <Mail className="h-6 w-6 text-accent-gold" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-foreground-muted">
                    {siteConfig.email}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-xl border border-border bg-background-card p-5">
                <Clock className="h-6 w-6 text-accent-gold" />
                <div>
                  <p className="font-medium">Office Hours</p>
                  <p className="text-sm text-foreground-muted">
                    Mon&ndash;Fri 9am&ndash;6pm (Bangkok time)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
