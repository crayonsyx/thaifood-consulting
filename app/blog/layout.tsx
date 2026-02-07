import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog",
  description: `Insights, guides, and expert advice on opening and running restaurants in Thailand. From ${siteConfig.name}.`,
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description:
      "Practical advice on opening and running restaurants in Thailand, from a Michelin-starred consultant.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
