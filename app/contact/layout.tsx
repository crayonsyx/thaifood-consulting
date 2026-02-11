import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with ThaiFood Consulting. Reach us via phone, email, or WhatsApp for expert F&B consulting in Thailand and Southeast Asia. We respond within 24 hours.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: `Contact Us | ${siteConfig.name}`,
    description:
      "Reach out for expert F&B consulting in Thailand. Phone, email, or WhatsApp — we respond within 24 hours.",
    url: `${siteConfig.url}/contact`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=${encodeURIComponent("Contact Us")}&subtitle=${encodeURIComponent("Get in touch with our team")}`,
        width: 1200,
        height: 630,
        alt: "Contact ThaiFood Consulting",
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
