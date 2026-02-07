"use client";

import { useState } from "react";
import { blogs } from "#site/content";
import { getSortedPosts, getPostsByCategory } from "@/lib/content";
import { categories } from "@/lib/constants";
import PostGrid from "@/components/blog/PostGrid";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const posts =
    activeCategory === "all"
      ? getSortedPosts(blogs)
      : getPostsByCategory(blogs, activeCategory);

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
            ]}
          />

          <div className="mt-8 mb-12 animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              Insights &amp; Guides
            </h1>
            <p className="text-foreground-muted text-lg max-w-2xl">
              Practical advice on opening and running restaurants in Thailand,
              from a consultant who has done it at the highest level.
            </p>
          </div>

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
            <PostGrid posts={posts} />
          </div>
        </div>
      </section>
    </>
  );
}
