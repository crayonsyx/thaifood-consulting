import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with ThaiFood Consulting. Reach us by email, WhatsApp, or contact form for restaurant consulting in Thailand.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description:
      "Get in touch for F&B consulting in Thailand. We respond within 24 hours.",
    url: `${siteConfig.url}/contact`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=${encodeURIComponent("Contact Us")}&subtitle=${encodeURIComponent("F&B Consulting Thailand")}`,
        width: 1200,
        height: 630,
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
