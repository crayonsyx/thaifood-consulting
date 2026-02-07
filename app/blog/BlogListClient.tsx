"use client";

import { useState } from "react";
import { categories } from "@/lib/constants";
import PostGrid from "@/components/blog/PostGrid";

interface SerializedPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category: string;
  coverImage?: string;
  coverImageAlt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
}

interface BlogListClientProps {
  posts: SerializedPost[];
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-12 animate-fade-in-up animation-delay-100">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              activeCategory === cat.slug
                ? "bg-accent-gold text-background"
                : "border border-border text-foreground-muted hover:border-accent-gold hover:text-accent-gold"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="animate-fade-in-up animation-delay-200">
        <PostGrid posts={filtered} />
      </div>
    </>
  );
}
