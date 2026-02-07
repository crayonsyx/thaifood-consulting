"use client";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { Callout } from "./Callout";
import { FAQ } from "./FAQ";
import { CostBreakdown } from "./CostBreakdown";

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

interface MDXContentProps {
  content: TinaMarkdownContent;
}

export function MDXContent({ content }: MDXContentProps) {
  return <TinaMarkdown content={content} components={components} />;
}
