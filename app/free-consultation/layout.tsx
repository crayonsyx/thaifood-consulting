import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free 30-Minute Strategy Call",
  description:
    "Book a free 30-minute consultation with a Michelin-starred F&B consultant. Get actionable advice on your restaurant or food business in Thailand — no obligation.",
  alternates: {
    canonical: `${siteConfig.url}/free-consultation`,
  },
  openGraph: {
    title: `Free Consultation | ${siteConfig.name}`,
    description:
      "Book a free 30-minute strategy call. Get actionable advice on your restaurant or food business in Thailand.",
    url: `${siteConfig.url}/free-consultation`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=${encodeURIComponent("Free Consultation")}&subtitle=${encodeURIComponent("30-minute strategy call")}`,
        width: 1200,
        height: 630,
        alt: "Free Consultation - ThaiFood Consulting",
      },
    ],
  },
};

export default function FreeConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
