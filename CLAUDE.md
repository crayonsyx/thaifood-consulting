# ThaiFood Consulting Website

## Overview
Professional F&B consulting website for Penny, a Michelin-starred consultant based in Bangkok. Built to capture organic search traffic from expats/international clients looking for F&B consulting in Thailand, and convert visitors into consultation leads.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 (dark theme)
- **Content**: TinaCMS (self-hosted, git-backed) with visual editor at `/admin`
- **Build**: `tinacms build && next build` (TinaCMS GraphQL codegen, then Next.js build)
- **Icons**: lucide-react
- **Forms**: Web3Forms (free tier, 250 submissions/month)
- **Analytics**: GA4 (placeholder ID — configure after business registration)
- **Hosting**: Vercel (free tier)
- **Images**: Unsplash placeholders, centralized in `lib/images.ts`
- **CMS Backend**: Upstash Redis (KV store for TinaCMS database adapter)
- **CMS Auth**: Auth.js (self-hosted, username/password)

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
  content.ts    # TinaCMS GraphQL query helpers (server-side only)
  analytics.ts  # GA4 event tracking functions

tina/
  config.ts       # TinaCMS schema, collections, auth config
  database.ts     # Database adapter (Redis prod, LevelDB dev)
  __generated__/  # Auto-generated GraphQL client & types (gitignored)

pages/
  api/tina/[...routes].ts  # TinaCMS GraphQL API endpoint
```

## Content Workflow

### Option 1: TinaCMS Admin (Recommended for Penny)
1. Visit `/admin` on the live site or local dev
2. Log in with admin credentials
3. Click "Blog Posts" or "Case Studies" in sidebar
4. Create new or edit existing content with rich-text editor
5. Click "Save" — commits directly to GitHub
6. Vercel auto-deploys; ISR revalidates pages within 5 minutes

### Option 2: Manual MDX Editing
1. Create new `.mdx` file in `content/blog/` or `content/case-studies/`
2. Add frontmatter (see `tina/config.ts` for schema)
3. Write content using MDX + custom components (Callout, FAQ, CostBreakdown)
4. Commit and push — Vercel auto-deploys
5. Sitemap and RSS auto-update (ISR revalidates every 5 minutes)

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
| `GITHUB_PERSONAL_ACCESS_TOKEN` | TinaCMS git provider (commits from admin) | Configured (Vercel) |
| `GITHUB_OWNER` | GitHub repo owner | Configured (Vercel) |
| `GITHUB_REPO` | GitHub repo name | Configured (Vercel) |
| `NEXTAUTH_SECRET` | Auth.js secret for admin auth | Configured (Vercel) |
| `KV_REST_API_URL` | Upstash Redis URL (TinaCMS database) | Configured (Vercel) |
| `KV_REST_API_TOKEN` | Upstash Redis token | Configured (Vercel) |

## Commands
```bash
npm run dev      # TINA_PUBLIC_IS_LOCAL=true tinacms dev -c "next dev"
npm run build    # tinacms build && next build (GraphQL codegen + Next.js SSG)
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
- **TinaCMS self-hosted CMS** — visual editor at `/admin`, git-backed, Auth.js authentication
- **Hybrid rendering** — listing pages use `force-dynamic` (ISR causes build timeout), detail pages use ISR (`revalidate=60`)
- **Loading skeletons** — `loading.tsx` files in blog/ and case-studies/ for instant perceived load
- **Query deduplication** — React `cache()` wraps TinaCMS queries in `lib/content.ts`
- **Velite fully removed** — replaced by TinaCMS GraphQL data layer
- **Admin auth seed** — `content/users/index.json` with admin user, TinaUserCollection in schema
- **API route inlined** — `pages/api/tina/[...routes].ts` uses next-auth directly with `require()` (static imports crash due to ESM/CJS interop in Pages API routes)
- **Admin assets committed** — 34 files in `public/admin/` (previously gitignored)

## Vercel Deployment Status (2026-02-09)
- **LIVE**: Site deployed, admin API + auth working
- All public pages return 200 (blog, case studies, homepage, etc.)
- Blog listing shows all 10 posts, individual posts render fully
- `/api/tina/gql` returns 401 for unauthenticated requests (correct)
- `/api/tina/auth/csrf` returns CSRF token (auth working)
- **Admin login works** — `admin` / `changeme123` at `/admin/index.html`
- Listing pages use `force-dynamic` + `loading.tsx` skeletons
- Detail pages (`[slug]`) use ISR with `revalidate=60`
- Blog prose styling improved (heading sizes, spacing, blockquotes, code blocks, lists)

## Auth Fix Details (2026-02-09)
- Root cause: `tinacms-gitprovider-github` ships unbundled ESM (`import` statements) in `dist/index.js` despite `type: commonjs`
- Pages Router API routes run in CJS context, so the ESM package fails to load
- This caused `databaseClient` to be `undefined`, making `authenticate()` silently fail
- Fix: Added `transpilePackages: ["tinacms-gitprovider-github"]` in `next.config.ts`
- Also switched `databaseClient` import from `require().default` to lazy `import()` in `pages/api/tina/[...routes].ts`

## What's Pending
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
- **TinaCMS Admin**: Visual editor at `/admin/index.html` (production + local dev)
- **Notion workspace**: Sabaii Brain — project docs, SEO research, content database
- **Notion page**: https://www.notion.so/Sabaii-Brain-300b202475c180579b9ae74f426c9d75
- **GitHub repo**: https://github.com/crayonsyx/thaifood-consulting (main branch, feature/tinacms merged)

## Last Updated
2026-02-09
