"use client";

import { useMemo } from "react";
import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "@/components/mdx";

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const content = useMemo(() => {
    const fn = new Function(code);
    const mdxModule = fn({ ...runtime });
    const Component = mdxModule.default;
    return <Component components={mdxComponents} />;
  }, [code]);

  return content;
}
