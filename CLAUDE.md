# ThaiFood Consulting Website

## Overview
Professional F&B consulting website for Penny, a Michelin-starred consultant based in Bangkok. Built to capture organic search traffic from expats/international clients looking for F&B consulting in Thailand, and convert visitors into consultation leads.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 (dark theme)
- **Content**: MDX via Velite (type-safe content at build time) — planned migration to TinaCMS
- **Build**: `velite build && next build` (Velite runs first to generate content data)
- **Icons**: lucide-react
- **Forms**: Web3Forms (free tier, 250 submissions/month)
- **Analytics**: GA4 (placeholder ID — configure after business registration)
- **Hosting**: Vercel (free tier)
- **Images**: Unsplash placeholders, centralized in `lib/images.ts`

## Design System
- Dark palette: `#0a0a0a` primary bg, `#1a1a1a` secondary, `#141414` cards
- Gold accent: `#c4956a` (CTAs, badges, borders, hover)
- Text: `#faf5f0` cream, `#a0998f` muted, `#6b6560` subtle
- Fonts: Playfair Display (headings), Inter (body)
- All design tokens in `app/globals.css` via CSS custom properties

## Project Structure
```
app/
  page.tsx                    # Homepage (7 sections)
  about/page.tsx              # About / Founder story
  services/page.tsx           # Services overview
  services/[slug]/page.tsx    # Individual service (4 services)
  case-studies/page.tsx       # Case studies listing
  case-studies/[slug]/page.tsx # Individual case study
  blog/page.tsx               # Blog listing with category filter
  blog/[slug]/page.tsx        # Individual blog post (MDX)
  contact/page.tsx            # Contact form (Web3Forms)
  free-consultation/page.tsx  # Lead capture page
  thank-you/page.tsx          # Form confirmation
  sitemap.ts                  # Auto-generated sitemap
  robots.ts                   # Robots.txt
  feed.xml/route.ts           # RSS feed
  api/og/route.tsx            # Dynamic OG image generation

components/
  shared/    # Header, Footer, WhatsApp button, CTA, Breadcrumbs, Analytics, JsonLd
  blog/      # PostCard, PostGrid, AuthorCard, ShareButtons
  case-studies/ # CaseStudyCard, MetricsGrid, TestimonialBlock, CaseStudyContent
  mdx/       # Callout, FAQ, CostBreakdown, MDXContent

content/
  blog/      # MDX blog posts
  case-studies/ # MDX case studies

lib/
  constants.ts  # Site config, nav links, stats, categories
  images.ts     # Centralized image registry (change here to swap placeholders)
  services.ts   # Services data (4 services with full content)
  seo.ts        # JSON-LD schema generators
  content.ts    # Content query helpers for Velite collections
  analytics.ts  # GA4 event tracking functions
```

## Content Workflow
1. Create new `.mdx` file in `content/blog/` or `content/case-studies/`
2. Add frontmatter (see existing posts for schema)
3. Write content using MDX + custom components (Callout, FAQ, CostBreakdown)
4. Commit and push — Vercel auto-deploys
5. Sitemap and RSS auto-update

## Key Files
- **Image swapping**: Edit `lib/images.ts` — all components reference this file
- **Services**: Edit `lib/services.ts` — add/modify service data here
- **Site config**: Edit `lib/constants.ts` — name, URLs, social links
- **Env vars**: `.env.local` — Web3Forms key, GA4 ID, WhatsApp number

## Environment Variables
| Variable | Purpose | Status |
|----------|---------|--------|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Contact form submission | Configured |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 | Placeholder (G-XXXXXXXXXX) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp CTA link | Configured |

## Commands
```bash
npm run dev      # Development server
npm run build    # velite build && next build (content generation + Next.js)
npm run start    # Production server
npm run lint     # ESLint
```

## SEO
- Every page has JSON-LD structured data (Organization, Person, Service, Article, FAQPage, BreadcrumbList, ContactPoint, LocalBusiness)
- Dynamic OG images via `/api/og?title=...&subtitle=...`
- Auto-generated sitemap.xml and robots.txt
- RSS feed at /feed.xml
- Canonical URLs on all pages
- Blog targets "how to open a restaurant in Thailand" keywords (Cluster 1 — highest priority)

## What's Done
- Full site scaffold with 18 routes, **deployed at https://thaifood-consulting.vercel.app/**
- Homepage with 7 sections
- About page with founder story
- 4 service pages (Menu Engineering, Concept Development, Cloud Kitchen, Feasibility Study)
- Blog system with MDX rendering, **10 SEO blog posts** (3000-5000 words each):
  1. The Complete Guide to Opening a Restaurant in Thailand (2026) — *featured*
  2. How to Open a Fine Dining Restaurant in Bangkok
  3. How to Start a Cloud Kitchen in Bangkok
  4. How to Open a Cafe in Thailand
  5. Why Restaurants Fail in Thailand: 12 Reasons
  6. Restaurant Staffing in Thailand: Salaries, Labor Law, Retention
  7. How Much Does It Cost to Open a Restaurant in Bangkok?
  8. Menu Engineering for Thai Restaurants
  9. Can a Foreigner Own a Restaurant in Thailand?
  10. How to Find a Restaurant Location in Bangkok
- Case studies system with 2 placeholder studies
- Contact + Free Consultation forms (Web3Forms)
- WhatsApp floating button
- All JSON-LD schemas
- Sitemap, robots.txt, RSS feed, OG image generation

## What's Pending
- **Blog prose styling** — improve h2/h3 sizing, code blocks, blockquotes, tables in `app/globals.css`
- **TinaCMS integration** — self-hosted on Vercel (free, git-backed), replaces Velite as content layer, adds `/admin` visual editor for Penny to edit content directly
- Replace Unsplash placeholders with real photography (via `lib/images.ts`)
- Set up GA4 measurement ID after business registration
- Domain purchase and Vercel configuration
- Google Business Profile setup
- Real case study content from Penny
- Real testimonials with client permission
- Programmatic location pages (`/consulting/[service]/[location]/`)
- Additional blog posts (content calendar: 2/month)
- Brand name decision (currently "ThaiFood Consulting" placeholder)

## Content Management
- **Notion content database**: All blog posts, website copy, and services documented in Notion for easy editing
- **Notion project page**: 300b2024-75c1-8183-ab5f-f17da1a419c4
- **Notion API key**: stored in .env.local (do not commit)

## Last Updated
2026-02-07
