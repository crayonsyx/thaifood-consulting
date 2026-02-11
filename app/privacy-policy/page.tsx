import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for ThaiFood Consulting. Learn how we collect, use, and protect your personal data in compliance with Thailand's PDPA.",
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description:
      "How ThaiFood Consulting collects, uses, and protects your personal data.",
    url: `${siteConfig.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Privacy Policy", href: "/privacy-policy" },
            ]}
          />
          <h1 className="mt-8 font-heading text-4xl font-bold md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-foreground-muted">
            Last updated: February 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {/* Introduction */}
            <div>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                Introduction
              </h2>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                ThaiFood Consulting (&quot;we,&quot; &quot;our,&quot; or
                &quot;us&quot;) respects your privacy and is committed to
                protecting your personal data. This privacy policy explains how
                we collect, use, and safeguard your information when you visit
                our website at{" "}
                <a
                  href={siteConfig.url}
                  className="text-accent-gold hover:underline"
                >
                  {siteConfig.url}
                </a>
                .
              </p>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                This policy is designed to comply with Thailand&apos;s Personal
                Data Protection Act (PDPA), B.E. 2562 (2019), which governs the
                collection, use, and disclosure of personal data.
              </p>
            </div>

            {/* What Data We Collect */}
            <div>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                What Data We Collect
              </h2>

              <h3 className="mt-6 font-heading text-xl font-bold">
                Contact Form Submissions
              </h3>
              <p className="mt-3 text-foreground-muted leading-relaxed">
                When you submit our contact or consultation request form, we
                collect the following information:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-2 text-foreground-muted">
                <li>Your name</li>
                <li>Your email address</li>
                <li>Your message or inquiry details</li>
                <li>
                  Any additional information you choose to provide in the form
                </li>
              </ul>

              <h3 className="mt-6 font-heading text-xl font-bold">
                Analytics Data
              </h3>
              <p className="mt-3 text-foreground-muted leading-relaxed">
                We use Google Analytics 4 to understand how visitors use our
                site. This service may collect:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-2 text-foreground-muted">
                <li>Pages viewed and time spent on each page</li>
                <li>Referring website or source</li>
                <li>Device type, browser, and operating system</li>
                <li>Approximate geographic location (country/city level)</li>
                <li>Anonymized IP address</li>
              </ul>
              <p className="mt-3 text-foreground-muted leading-relaxed">
                Google Analytics does not collect personally identifiable
                information. You can opt out of Google Analytics tracking by
                installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-gold hover:underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </p>

              <h3 className="mt-6 font-heading text-xl font-bold">
                Cookies and Essential Data
              </h3>
              <p className="mt-3 text-foreground-muted leading-relaxed">
                Our website uses only essential cookies required for the site to
                function properly. We do not use advertising cookies or
                third-party tracking cookies beyond what is described in this
                policy.
              </p>
            </div>

            {/* How We Use Your Data */}
            <div>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                How We Use Your Data
              </h2>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                We use the information we collect for the following purposes:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-2 text-foreground-muted">
                <li>
                  <strong className="text-foreground">
                    Responding to inquiries:
                  </strong>{" "}
                  We use your contact form submissions to reply to your
                  questions, schedule consultations, and provide the services you
                  request.
                </li>
                <li>
                  <strong className="text-foreground">
                    Improving our website:
                  </strong>{" "}
                  Analytics data helps us understand which content is most useful
                  and how to improve the user experience.
                </li>
                <li>
                  <strong className="text-foreground">
                    Business communication:
                  </strong>{" "}
                  If you contact us, we may follow up regarding our consulting
                  services. We will not send unsolicited marketing emails.
                </li>
              </ul>
            </div>

            {/* Third-Party Services */}
            <div>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                Third-Party Services
              </h2>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                We rely on the following third-party services to operate this
                website. Each has its own privacy policy governing how they
                handle data:
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-4 text-foreground-muted">
                <li>
                  <strong className="text-foreground">
                    Web3Forms
                  </strong>{" "}
                  -- Processes contact form submissions. Your name, email, and
                  message are transmitted to Web3Forms for delivery to us.{" "}
                  <a
                    href="https://web3forms.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-gold hover:underline"
                  >
                    Web3Forms Privacy Policy
                  </a>
                </li>
                <li>
                  <strong className="text-foreground">
                    Google Analytics 4
                  </strong>{" "}
                  -- Collects anonymized website usage data to help us improve
                  the site.{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-gold hover:underline"
                  >
                    Google Privacy Policy
                  </a>
                </li>
                <li>
                  <strong className="text-foreground">Vercel</strong> -- Hosts
                  our website. Vercel may collect server logs including IP
                  addresses and request metadata.{" "}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-gold hover:underline"
                  >
                    Vercel Privacy Policy
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                We do not sell, trade, or rent your personal data to any third
                party.
              </p>
            </div>

            {/* Data Retention */}
            <div>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                Data Retention
              </h2>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                We retain your personal data only for as long as necessary to
                fulfill the purposes described in this policy:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-2 text-foreground-muted">
                <li>
                  <strong className="text-foreground">
                    Contact form data:
                  </strong>{" "}
                  Retained for up to 24 months after your last communication
                  with us, or until you request deletion.
                </li>
                <li>
                  <strong className="text-foreground">Analytics data:</strong>{" "}
                  Retained according to Google Analytics default settings (14
                  months for user-level data).
                </li>
              </ul>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                Your Rights Under the PDPA
              </h2>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                Under Thailand&apos;s Personal Data Protection Act (PDPA), you
                have the following rights regarding your personal data:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-2 text-foreground-muted">
                <li>
                  <strong className="text-foreground">Right of access:</strong>{" "}
                  You may request a copy of the personal data we hold about you.
                </li>
                <li>
                  <strong className="text-foreground">
                    Right to rectification:
                  </strong>{" "}
                  You may request correction of inaccurate or incomplete data.
                </li>
                <li>
                  <strong className="text-foreground">
                    Right to erasure:
                  </strong>{" "}
                  You may request deletion of your personal data, subject to
                  legal obligations.
                </li>
                <li>
                  <strong className="text-foreground">
                    Right to restrict processing:
                  </strong>{" "}
                  You may request that we limit how we use your data.
                </li>
                <li>
                  <strong className="text-foreground">
                    Right to data portability:
                  </strong>{" "}
                  You may request your data in a structured, machine-readable
                  format.
                </li>
                <li>
                  <strong className="text-foreground">
                    Right to object:
                  </strong>{" "}
                  You may object to certain types of data processing.
                </li>
                <li>
                  <strong className="text-foreground">
                    Right to withdraw consent:
                  </strong>{" "}
                  Where processing is based on consent, you may withdraw it at
                  any time.
                </li>
              </ul>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                To exercise any of these rights, please contact us using the
                details below. We will respond to your request within 30 days.
              </p>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                Data Security
              </h2>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                We take reasonable technical and organizational measures to
                protect your personal data against unauthorized access,
                alteration, disclosure, or destruction. Our website is served
                over HTTPS, and we use trusted third-party services that
                maintain their own security standards.
              </p>
            </div>

            {/* Changes to This Policy */}
            <div>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                Changes to This Policy
              </h2>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                We may update this privacy policy from time to time to reflect
                changes in our practices or legal requirements. Any updates will
                be posted on this page with a revised &quot;last updated&quot;
                date. We encourage you to review this page periodically.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                Contact Us
              </h2>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                If you have any questions about this privacy policy or wish to
                exercise your data rights, please contact us:
              </p>
              <div className="mt-4 rounded-xl border border-border bg-background-secondary p-6">
                <p className="text-foreground font-medium">
                  {siteConfig.name}
                </p>
                <p className="mt-2 text-foreground-muted">
                  Email:{" "}
                  <a
                    href={`mailto:privacy@thaifoodconsulting.com`}
                    className="text-accent-gold hover:underline"
                  >
                    privacy@thaifoodconsulting.com
                  </a>
                </p>
                <p className="mt-1 text-foreground-muted">
                  Location: Bangkok, Thailand
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
