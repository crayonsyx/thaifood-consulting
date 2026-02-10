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
- **Images**: Local images in `public/images/`, centralized in `lib/images.ts`. Cover images use TinaCMS `image` type (Media Manager picker)
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
- Blog system with MDX rendering, **20 SEO blog posts** (3000-5000 words each, all published):
  Dates span Dec 15, 2025 to Feb 10, 2026 (~3 day cadence). All humanized + sentence flow pass applied.
  **Opening a Restaurant (10):**
  1. The Complete Guide to Opening a Restaurant in Thailand (2026) — *featured*
  2. How to Open a Fine Dining Restaurant in Bangkok
  3. How to Start a Cloud Kitchen in Bangkok
  4. How to Open a Cafe in Thailand
  5. How Much Does It Cost to Open a Restaurant in Bangkok?
  6. Can a Foreigner Own a Restaurant in Thailand?
  7. How to Find a Restaurant Location in Bangkok
  8. How to Open a Bar in Thailand as a Foreigner
  9. The Complete Restaurant Licensing Checklist for Thailand (2026)
  10. Beyond Bangkok: The 5 Best Cities to Open a Restaurant
  **Operations (4):**
  11. Restaurant Staffing in Thailand: Salaries, Labor Law, Retention
  12. Why Restaurants Fail in Thailand: 12 Reasons
  13. Thailand's New Alcohol Law: What Every Restaurant Owner Needs to Know
  14. How to Negotiate a Restaurant Lease in Bangkok
  **F&B Trends (3):**
  15. 7 Restaurant Concepts That Are Working in Bangkok Right Now (2026)
  16. What Thailand's 2026 Michelin Guide Tells Us
  17. Foodpanda Is Gone: What Thailand's Delivery Duopoly Means
  **Other (3):**
  18. Menu Engineering for Thai Restaurants (operations/menu-engineering)
  19. How to Start a Food Truck Business in Thailand
  20. Thailand Work Permit and Visa Guide for Restaurant Owners
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

## Vercel Deployment Status (2026-02-10)
- **LIVE**: Site deployed, admin API + auth working
- All public pages return 200 (blog, case studies, homepage, etc.)
- Blog listing shows all 20 posts (all published, dates Dec 2025 - Feb 2026), individual posts render fully
- `/api/tina/gql` returns 401 for unauthenticated requests (correct)
- `/api/tina/auth/csrf` returns CSRF token (auth working)
- **Admin login works** — `admin` / `changeme123` at `/admin/index.html`
- Listing pages use `force-dynamic` + `loading.tsx` skeletons
- Detail pages (`[slug]`) use ISR with `revalidate=60`
- Blog prose styling improved (heading sizes, spacing, blockquotes, code blocks, lists)
- **Images localized** — all Unsplash URLs downloaded to `public/images/`, `coverImage` switched to TinaCMS `image` type (enables Media Manager picker), `remotePatterns` removed from next.config.ts, OG images use absolute URLs

## Auth Fix Details (2026-02-09)
- Root cause: `tinacms-gitprovider-github` ships unbundled ESM (`import` statements) in `dist/index.js` despite `type: commonjs`
- Pages Router API routes run in CJS context, so the ESM package fails to load
- This caused `databaseClient` to be `undefined`, making `authenticate()` silently fail
- Fix: Added `transpilePackages: ["tinacms-gitprovider-github"]` in `next.config.ts`
- Also switched `databaseClient` import from `require().default` to lazy `import()` in `pages/api/tina/[...routes].ts`

## Content Authority Plan (50 Articles)
Target: 70 total blog posts (20 existing + 50 new) across 8 topical clusters, published at 4/month cadence over 12 months. Each article: 3,000-5,000 words, first-person Penny voice, Callout/CostBreakdown/FAQ components, 3-5 internal cross-links, CTA to relevant service page.

### Clusters
1. **Menu Engineering Deep Dive** (10 articles) — P1, fills empty category
2. **Marketing & Customer Acquisition** (8 articles) — P1, no competitor coverage
3. **Financial Management & Accounting** (7 articles) — P1, supports Feasibility Study service
4. **Technology & Systems** (6 articles) — P2, high search volume
5. **Supplier & Procurement** (4 articles) — P2, Thailand-specific advantage
6. **Scaling & Growth** (5 articles) — P2, targets high-value clients
7. **Crisis Management & Pivoting** (4 articles) — P2, trust-building
8. **Thailand-Specific Data & Intelligence** (6 articles) — P1, impossible for competitors to replicate

### Content Quality Pipeline
Each article goes through this pipeline:
1. **Research** — keyword/SERP analysis, competitive gaps
2. **Brief** — outline, target word count, internal links, FAQs
3. **Generate** — first draft via Claude (first-person Penny voice, Callout/CostBreakdown/FAQ components)
4. **Humanize** — run through Humanizer skill with project overrides (`~/.claude/skills/humanizer-overrides.md`)
5. **Sentence Flow Pass** — combine choppy 3+ short sentence sequences into flowing prose
6. **Copy-Edit** — apply marketingskills `copy-editing` Seven Sweeps (clarity, voice, so-what, prove-it, specificity, emotion, zero-risk)
7. **Review** — validate word count, internal links, frontmatter, duplicate content
8. **Publish** — commit MDX, deploy, flip `published: true` on schedule

### Writing Style Rules
- **KEEP bold+colon lists** (`**Term:** explanation`) — good for scannability, do NOT convert to prose
- **Sentence flow** — avoid 3+ short choppy sentences in a row. Combine middles with "while", "and", "which", commas, semicolons. Keep strong openers and punchy closers standalone.
- **Dashes** — avoid em dashes (`—`). In lists use normal dash (`-`), in prose use double dash (`--`). Em dashes only for rare high-impact asides (max 1-2 per article). Use discretion.
- **Never use** — "Let me show you", "Additionally", "landscape" (abstract), "delve", "foster", "enhance", "showcase", "crucial", "pivotal", "vital"
- **Voice** — first-person Penny, expert but approachable, opinions welcome, specific data > vague claims
- **Structure** — mix bold+colon lists with analytical paragraphs, anecdotes, and questions

Tools:
- **Humanizer**: `~/.claude/skills/humanizer` + **overrides**: `~/.claude/skills/humanizer-overrides.md`
- **marketingskills**: `~/.claude/skills/marketingskills` — key skills: `content-strategy`, `copywriting`, `copy-editing`, `seo-audit`, `programmatic-seo`, `schema-markup`

### Execution
- Write in batches of 8-10 using parallel agents
- Download Unsplash cover images per batch
- `npm run build` to verify after each batch
- Commit and push (Vercel auto-deploys)
- Flip `published: true` on schedule via TinaCMS admin

## What's Pending
- **50 new blog articles** (content authority plan — see clusters above)
- Replace placeholder images with real photography (via TinaCMS Media Manager or `lib/images.ts`)
- Set up GA4 measurement ID after business registration
- Domain purchase and Vercel configuration
- Google Business Profile setup
- Real case study content from Penny
- Real testimonials with client permission
- Programmatic location pages (`/consulting/[service]/[location]/`)
- Brand name decision (currently "ThaiFood Consulting" placeholder)

## Content Management
- **TinaCMS Admin**: Visual editor at `/admin/index.html` (production + local dev)
- **Notion workspace**: Sabaii Brain — project docs, SEO research, content database
- **Notion page**: https://www.notion.so/Sabaii-Brain-300b202475c180579b9ae74f426c9d75
- **GitHub repo**: https://github.com/crayonsyx/thaifood-consulting (main branch, feature/tinacms merged)

## Last Updated
2026-02-10
