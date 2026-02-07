"use client";

import { useMemo } from "react";
import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "@/components/mdx";

interface CaseStudyContentProps {
  code: string;
}

export default function CaseStudyContent({ code }: CaseStudyContentProps) {
  const content = useMemo(() => {
    const fn = new Function(code);
    const mdxModule = fn({ ...runtime });
    const Component = mdxModule.default;
    return <Component components={mdxComponents} />;
  }, [code]);

  return <div className="prose prose-lg max-w-none">{content}</div>;
}
