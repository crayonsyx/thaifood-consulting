import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free 30-Minute Strategy Call",
  description:
    "Book a free 30-minute strategy call with a Michelin-starred F&B consultant. Get actionable advice for your restaurant or food business in Thailand.",
  alternates: {
    canonical: `${siteConfig.url}/free-consultation`,
  },
  openGraph: {
    title: `Free Consultation | ${siteConfig.name}`,
    description:
      "Book a free 30-minute strategy call for your restaurant or food business.",
    url: `${siteConfig.url}/free-consultation`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=${encodeURIComponent("Free Strategy Call")}&subtitle=${encodeURIComponent("30 minutes. No obligation.")}`,
        width: 1200,
        height: 630,
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
