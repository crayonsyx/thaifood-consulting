"use client";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { Callout } from "@/components/mdx/Callout";
import { FAQ } from "@/components/mdx/FAQ";
import { CostBreakdown } from "@/components/mdx/CostBreakdown";

const components = {
  Callout: (props: { type?: "info" | "warning" | "tip"; children: TinaMarkdownContent }) => (
    <Callout type={props.type}>
      <TinaMarkdown content={props.children} />
    </Callout>
  ),
  FAQ: (props: { items?: { question?: string; answer?: string }[] }) => (
    <FAQ
      items={
        props.items
          ?.filter((item): item is { question: string; answer: string } =>
            Boolean(item?.question && item?.answer)
          ) ?? []
      }
    />
  ),
  CostBreakdown: (props: {
    items?: { category?: string; low?: string; high?: string; notes?: string }[];
  }) => (
    <CostBreakdown
      items={
        props.items
          ?.filter(
            (item): item is { category: string; low: string; high: string; notes?: string } =>
              Boolean(item?.category && item?.low && item?.high)
          ) ?? []
      }
    />
  ),
};

interface CaseStudyContentProps {
  content: TinaMarkdownContent;
}

export default function CaseStudyContent({ content }: CaseStudyContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <TinaMarkdown content={content} components={components} />
    </div>
  );
}
