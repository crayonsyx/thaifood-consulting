import { defineConfig, LocalAuthProvider } from "tinacms";
import {
  UsernamePasswordAuthJSProvider,
  TinaUserCollection,
} from "tinacms-authjs/dist/tinacms";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const calloutTemplate = {
  name: "Callout",
  label: "Callout",
  fields: [
    {
      name: "type",
      label: "Type",
      type: "string" as const,
      options: ["info", "warning", "tip"],
    },
    {
      name: "children",
      label: "Content",
      type: "rich-text" as const,
    },
  ],
};

const faqTemplate = {
  name: "FAQ",
  label: "FAQ",
  fields: [
    {
      name: "items",
      label: "Questions",
      type: "object" as const,
      list: true,
      fields: [
        { name: "question", label: "Question", type: "string" as const },
        {
          name: "answer",
          label: "Answer",
          type: "string" as const,
          ui: { component: "textarea" as const },
        },
      ],
    },
  ],
};

const costBreakdownTemplate = {
  name: "CostBreakdown",
  label: "Cost Breakdown",
  fields: [
    {
      name: "items",
      label: "Items",
      type: "object" as const,
      list: true,
      fields: [
        { name: "category", label: "Category", type: "string" as const },
        { name: "low", label: "Low Estimate", type: "string" as const },
        { name: "high", label: "High Estimate", type: "string" as const },
        { name: "notes", label: "Notes", type: "string" as const },
      ],
    },
  ],
};

const richTextTemplates = [calloutTemplate, faqTemplate, costBreakdownTemplate];

export default defineConfig({
  branch,
  // No clientId/token — self-hosted, not TinaCloud
  contentApiUrlOverride: "/api/tina/gql",
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    loadCustomStore: async () => {
      const mod = await import("../lib/github-media-store");
      return mod.GitHubMediaStore;
    },
  },
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog Posts",
        path: "content/blog",
        format: "mdx",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "slug",
            label: "Slug",
            type: "string",
            required: true,
            description: "URL-friendly identifier (must match filename)",
          },
          {
            name: "date",
            label: "Publish Date",
            type: "datetime",
            required: true,
          },
          {
            name: "excerpt",
            label: "Excerpt",
            type: "string",
            ui: { component: "textarea" },
            description: "Short summary for listings and SEO (max 300 chars)",
          },
          {
            name: "category",
            label: "Category",
            type: "string",
            options: [
              { value: "opening-a-restaurant", label: "Opening a Restaurant" },
              { value: "menu-engineering", label: "Menu Engineering" },
              { value: "fnb-trends", label: "F&B Trends" },
              { value: "operations", label: "Operations" },
              { value: "marketing", label: "Marketing" },
              { value: "financial-management", label: "Financial Management" },
              { value: "technology", label: "Technology" },
              { value: "scaling", label: "Scaling & Growth" },
            ],
          },
          {
            name: "tags",
            label: "Tags",
            type: "string",
            list: true,
          },
          {
            name: "coverImage",
            label: "Cover Image",
            type: "image",
          },
          {
            name: "coverImageAlt",
            label: "Cover Image Alt Text",
            type: "string",
          },
          {
            name: "author",
            label: "Author",
            type: "string",
          },
          {
            name: "featured",
            label: "Featured",
            type: "boolean",
          },
          {
            name: "published",
            label: "Published",
            type: "boolean",
          },
          {
            name: "seo",
            label: "SEO",
            type: "object",
            fields: [
              {
                name: "title",
                label: "SEO Title",
                type: "string",
                description: "Override page title for search engines",
              },
              {
                name: "description",
                label: "SEO Description",
                type: "string",
                ui: { component: "textarea" },
                description: "Meta description for search engines",
              },
            ],
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
            isBody: true,
            templates: richTextTemplates,
          },
        ],
      },
      {
        name: "caseStudy",
        label: "Case Studies",
        path: "content/case-studies",
        format: "mdx",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "slug",
            label: "Slug",
            type: "string",
            required: true,
          },
          {
            name: "date",
            label: "Date",
            type: "datetime",
            required: true,
          },
          {
            name: "client",
            label: "Client",
            type: "string",
          },
          {
            name: "industry",
            label: "Industry",
            type: "string",
            required: true,
          },
          {
            name: "excerpt",
            label: "Excerpt",
            type: "string",
            ui: { component: "textarea" },
          },
          {
            name: "coverImage",
            label: "Cover Image",
            type: "image",
          },
          {
            name: "coverImageAlt",
            label: "Cover Image Alt Text",
            type: "string",
          },
          {
            name: "metrics",
            label: "Metrics",
            type: "object",
            list: true,
            fields: [
              { name: "label", label: "Label", type: "string" },
              { name: "before", label: "Before", type: "string" },
              { name: "after", label: "After", type: "string" },
            ],
          },
          {
            name: "testimonial",
            label: "Testimonial",
            type: "object",
            fields: [
              {
                name: "quote",
                label: "Quote",
                type: "string",
                ui: { component: "textarea" },
              },
              { name: "author", label: "Author Name", type: "string" },
              { name: "role", label: "Role / Location", type: "string" },
            ],
          },
          {
            name: "seo",
            label: "SEO",
            type: "object",
            fields: [
              { name: "title", label: "SEO Title", type: "string" },
              {
                name: "description",
                label: "SEO Description",
                type: "string",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
            isBody: true,
            templates: richTextTemplates,
          },
        ],
      },
      TinaUserCollection,
    ],
  },
});
