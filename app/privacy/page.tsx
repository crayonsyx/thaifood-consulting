import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}. Learn how we collect, use, and protect your personal information.`,
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy", href: "/privacy" },
          ]}
        />

        <h1 className="mt-8 font-heading text-4xl font-bold md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-foreground-muted">
          Last updated: February 10, 2026
        </p>

        <div className="mt-12 space-y-10 text-foreground-muted leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Information We Collect
            </h2>
            <p className="mt-4">
              When you use our website or contact us, we may collect the
              following information:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Contact information</strong>{" "}
                you provide through our forms, including your name, email
                address, phone number, and message content.
              </li>
              <li>
                <strong className="text-foreground">Usage data</strong> collected
                automatically, such as pages visited, time spent on site, and
                referring URLs, via Google Analytics.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              How We Use Your Information
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>To respond to your inquiries and consultation requests</li>
              <li>To improve our website and services</li>
              <li>
                To send you information related to our services, only if you have
                opted in
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Third-Party Services
            </h2>
            <p className="mt-4">We use the following third-party services:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Google Analytics</strong> for
                website analytics and traffic measurement
              </li>
              <li>
                <strong className="text-foreground">Web3Forms</strong> for
                processing contact form submissions
              </li>
              <li>
                <strong className="text-foreground">Vercel</strong> for website
                hosting
              </li>
            </ul>
            <p className="mt-4">
              Each of these services has its own privacy policy governing how
              they handle data.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Cookies
            </h2>
            <p className="mt-4">
              Our website uses cookies for analytics purposes via Google
              Analytics. These cookies help us understand how visitors interact
              with our site. You can disable cookies through your browser
              settings.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Data Security
            </h2>
            <p className="mt-4">
              We take reasonable measures to protect your personal information.
              Our website is served over HTTPS, and we do not store sensitive
              personal data on our servers. Form submissions are processed
              through encrypted third-party services.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Your Rights
            </h2>
            <p className="mt-4">You have the right to:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction or deletion of your personal data</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Contact
            </h2>
            <p className="mt-4">
              If you have questions about this privacy policy or your personal
              data, contact us at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent-gold hover:text-accent-gold-light transition-colors"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
