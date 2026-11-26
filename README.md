# primavps

Marketing and self-service storefront for **primavps** — a Bangladeshi hosting brand selling US-routed **Cloud VPS** and **static residential ISP VPS** (AT&T, Comcast, Verizon), aimed at survey/RDP users, agencies, and resellers. The site is bilingual (English + Bangla/Banglish), prices in **BDT or USD**, and includes a streaming AI support assistant plus free network diagnostic tools.

> **Status: marketing front end / prototype.** Purchasing, authentication, order persistence, and payments are simulated in the browser. Only the AI chat and IP lookup have working backends. See [Review findings](#review-findings) before treating this as production-ready.

---

## Table of contents

- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Routes](#routes)
- [Feature overview](#feature-overview)
- [Architecture](#architecture)
- [Data layer](#data-layer)
- [Pricing logic](#pricing-logic)
- [API reference](#api-reference)
- [Design system](#design-system)
- [Currency and localization](#currency-and-localization)
- [Images and static assets](#images-and-static-assets)
- [Review findings](#review-findings)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Suggested next steps](#suggested-next-steps)

---

## Tech stack

| Layer              | Choice                                       | Version                           |
| ------------------ | -------------------------------------------- | --------------------------------- |
| Framework          | Next.js App Router (Turbopack)               | 16.4.6                            |
| UI runtime         | React / React DOM                            | 19.3.0                            |
| Language           | TypeScript (strict, `noEmit`)                | 5.x                               |
| Styling            | Tailwind CSS v4 via `@tailwindcss/turbopack` | 4.3.3                             |
| Component base     | shadcn config (`base-nova`) + Base UI        | `@base-ui/react` 1.9              |
| Animation          | Framer Motion                                | 14                                |
| Icons              | Lucide React, React Icons (social)           | 1.73 / 5.7                        |
| AI chat            | Groq SDK (OpenAI OSS models)                 | 1.6                               |
| Forms / validation | React Hook Form + Zod                        | installed, **not currently used** |
| Package manager    | pnpm (declared)                              | 11.17.0                           |

The project uses the `@/*` path alias to `src/*` and the Next.js App Router. Note the repository-specific rule in [`AGENTS.md`](./AGENTS.md): this Next.js version may differ from older conventions, so consult `node_modules/next/dist/docs/` before changing framework-level code.

---

## Quick start

```bash
# 1. Install dependencies
pnpm install

# 2. Create .env.local and add your Groq API key
#    (required only for the chat widget)
printf 'GROQ_API_KEY=%s\n' 'gsk_...' > .env.local

# 3. Start the dev server
pnpm dev
```

Open <http://localhost:3000>. The IP checker and chat widget work in dev; the chat returns a localized "busy" message when Groq is rate-limited and reports a missing key otherwise.

**Requirements:** Node.js 20+ (Next.js 16 baseline), pnpm 11 (npm/yarn/bun also work but the lockfile is pnpm).

---

## Environment variables

| Variable       | Required      | Used by                     | Notes                                                   |
| -------------- | ------------- | --------------------------- | ------------------------------------------------------- |
| `GROQ_API_KEY` | For chat only | `src/app/api/chat/route.ts` | Server-side Groq key. Never expose with `NEXT_PUBLIC_`. |

`.env*` files are git-ignored. There is no database, auth provider, payment gateway, or email service configured — the rest of the site runs without secrets.

---

## Scripts

| Command      | Description                                 |
| ------------ | ------------------------------------------- |
| `pnpm dev`   | Start the Turbopack dev server on port 3000 |
| `pnpm build` | Production build                            |
| `pnpm start` | Serve the production build                  |
| `pnpm lint`  | Run ESLint (`eslint-config-next`)           |

No test runner or test files are configured.

---

## Routes

### Pages

| Route                   | Rendering                                               | Purpose                                                                                                                         |
| ----------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `/`                     | Server page composing client sections                   | Landing page: hero + live IP proof, trust strip, survey plans, global network, trust cards, reviews, FAQ, cookie notice         |
| `/cloud-vps`            | Client                                                  | Interactive cloud configurator (region, OS, vCPU/RAM/NVMe sliders, optional residential IP) with live price and checkout drawer |
| `/survey-vps`           | Client                                                  | Three residential ISP tiers, carrier filter, clean-vs-virgin IP toggle, monthly/quarterly/annual billing, checkout drawer       |
| `/resellers`            | Client                                                  | Volume tiers (10–24 / 25–49 / 50+ servers) and a simulated quote-request form                                                   |
| `/hot-deals`            | Server                                                  | Flash-sale hero, copyable coupon cards, feature section, diagnostics promo, support banner, FAQ                                 |
| `/deals`                | Server                                                  | Permanent redirect to `/hot-deals`                                                                                              |
| `/status`               | Server                                                  | Static 90-day component uptime/latency table                                                                                    |
| `/blog`                 | Client                                                  | Searchable, category-filterable guide index with featured post                                                                  |
| `/blog/[slug]`          | Server, statically generated via `generateStaticParams` | Guide article with a hand-rolled Markdown-ish renderer, promo sidebar, related posts                                            |
| `/tools/ip-checker`     | Client                                                  | Calls `/api/ip-check`, shows fraud gauge, usage type, proxy/VPN/Tor flags, WebRTC check, timezone mismatch                      |
| `/tools/webrtc-test`    | Client                                                  | Browser STUN probe for WebRTC IP leaks                                                                                          |
| `/tools/looking-glass`  | Client                                                  | **Simulated** ping/traceroute/MTR terminal output                                                                               |
| `/contact`              | Client                                                  | Support channels and a simulated ticket form (fake `PV-xxxx` ID)                                                                |
| `/login`, `/register`   | Client                                                  | UI-only forms that redirect to `/cloud-vps`                                                                                     |
| `/legal/terms`          | Server                                                  | Terms of service                                                                                                                |
| `/legal/privacy`        | Server                                                  | Privacy policy                                                                                                                  |
| `/legal/ip-replacement` | Server                                                  | 7-day residential IP replacement guarantee                                                                                      |
| `not-found.tsx`         | Server                                                  | Styled 404                                                                                                                      |

### API routes

| Route           | Method | Purpose                                                           |
| --------------- | ------ | ----------------------------------------------------------------- |
| `/api/chat`     | `POST` | Streams the Groq-powered support assistant as SSE                 |
| `/api/ip-check` | `GET`  | IP geolocation, ASN/ISP, and a heuristic hosting/proxy assessment |

---

## Feature overview

- **Hero with live IP proof** — calls `/api/ip-check` on mount and shows the visitor's (or fallback) IP, city, ISP, and fraud score, alongside a hardcoded "local IP leak detected / account will be banned" risk panel; country selector for US/UK/DE/FR with sample IPs and latency.
- **Residential ISP plans** — three tiers (Starter/Pro/VIP), carrier availability, stock counts, "clean screened" vs "virgin" pricing, and 5%/15% multi-month discounts.
- **Cloud configurator** — four presets plus sliders; Windows selections force a 4 GB RAM minimum; a residential IP add-on costs ৳1,200.
- **Checkout drawer** — billing-cycle switch, `LAUNCH10` 10% coupon, due-today summary, and a simulated "connecting to gateway" → success state.
- **AI support chat** — floating widget with quick replies, token streaming, abort support, and explicit instructions to reply in English, Bangla, or Banglish depending on the user.
- **Free diagnostics** — IP fraud checker, WebRTC leak test, and (simulated) looking glass.
- **Deals** — four copy-to-clipboard coupon codes (`HOTVPS35`, `RESISP30`, `VIRGIN25`, `RESELL20`) and flash-sale pricing.
- **Content** — seven local blog posts, three legal pages, a static status page, bilingual marketing copy.
- **Global chrome** — announcement bar (`LAUNCH10`) that hides on scroll and returns only at the top, sticky navbar with dropdowns, currency toggle, footer with payment logos, floating social rail, cookie notice that auto-dismisses.
- **Motion and accessibility** — reveal-on-scroll, shimmer/marquee/drift animations, and a global `prefers-reduced-motion` override.

---

## Architecture

```text
.
├── public/                      # Payment logos, datacenter/blog imagery, world map
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts    # Groq streaming proxy
│   │   │   └── ip-check/route.ts# ip-api.com lookup + demo fallback
│   │   ├── blog/                # Index + [slug] article
│   │   ├── cloud-vps/           # Cloud configurator
│   │   ├── survey-vps/          # Residential ISP plans
│   │   ├── deals/               # redirect → /hot-deals
│   │   ├── hot-deals/           # Coupons and flash sale
│   │   ├── resellers/           # Volume tiers
│   │   ├── status/              # Static status board
│   │   ├── tools/               # ip-checker, webrtc-test, looking-glass
│   │   ├── legal/               # terms, privacy, ip-replacement
│   │   ├── contact/ login/ register/
│   │   ├── layout.tsx           # Metadata, providers, global chrome
│   │   ├── page.tsx             # Home composition
│   │   └── globals.css          # Tailwind import, tokens, component utilities
│   ├── components/
│   │   ├── layout/              # SiteHeader, AnnouncementBar, Navbar, Footer
│   │   ├── sections/home/       # Landing sections (some unused — see review)
│   │   ├── sections/isp/        # CheckoutDrawer
│   │   ├── deals/               # Hot-deals page sections
│   │   ├── ui/                  # Button, payment logos, cookie notice, social rail, reveal
│   │   └── ChatWidget.tsx       # Streaming AI chat
│   └── lib/
│       ├── currency.tsx         # BDT/USD context
│       ├── data/                # plans, deals, blog, status fixtures
│       ├── fonts.ts             # next/font definitions
│       └── utils.ts             # cn() helper
├── next.config.ts               # Unsplash remote images + Tailwind/Turbopack rule
├── components.json              # shadcn (base-nova, lucide)
├── tsconfig.json
└── package.json
```

Key conventions:

- **Server layout, client leaves.** `app/layout.tsx` is a server component that renders the global chrome inside `CurrencyProvider`. Interactive pages opt into `"use client"`.
- **No global state library.** Currency is the only cross-cutting client state (React context + `useSyncExternalStore`); everything else is local component state.
- **Fixtures, not a CMS.** Plans, deals, posts, and status components live in `src/lib/data/*.ts`. There is no database or API for content.
- **Shared CSS utilities.** Prefer `.shell`, `.section`, `.eyebrow`, `.section-title`, `.lede`, `.card`, `.btn*`, `.field`, `.label` from `globals.css` over re-declaring layout classes. (Several newer pages do not follow this yet.)

---

## Data layer

### `src/lib/data/plans.ts`

- `ISP_PLANS` — `starter` (2 vCPU / 4 GB / 45 GB, ৳2,999; virgin ৳3,499), `pro` (4 / 6 / 60 GB, ৳3,799; virgin ৳4,299), `vip` (4 / 8 / 80 GB, ৳4,999; virgin ৳4,999).
- `CARRIERS` — All, AT&T, Comcast, Verizon, Spectrum.
- `CLOUD_PRESETS` — 1/2/30, 2/4/80, 4/8/160, 8/32/320.
- `CLOUD_OS_LIST` — Ubuntu 24.04, Debian 12, AlmaLinux 9, Windows Server 2022, Windows 10 Pro.
- `CLOUD_REGIONS` — Dallas TX, Ashburn VA, Chicago IL.
- `calculateCloudPrice()` — see below.

### `src/lib/data/deals.ts`

- `HOT_DEALS_LIST` — four deals with coupon code, percent off, BDT prices, target URL, and specs.
- `FLASH_PREVIEW_ITEMS` — compact flash-sale tiles in USD/BDT.

### `src/lib/data/blog.ts`

Seven posts across `Guides`, `Cloud & DevOps`, and `IP Security`, each with a `content` string using `##`, `###`, `>`, and fenced code blocks. The article page splits on blank lines and renders those patterns manually; it does **not** use MDX.

### `src/lib/data/status.ts`

Seven components with `uptime90d`, status, and latency. The page always renders "All systems operational" and does not poll anything.

---

## Pricing logic

Cloud price (BDT per month) in `calculateCloudPrice()`:

```text
base                       = 950
+ (vCPU − 1) × 350          (when vCPU > 1)
+ (RAM − 2) × 160           (when RAM > 2 GB)
+ floor((NVMe − 30) / 10) × 45   (when NVMe > 30 GB)
+ 1200                      (optional US residential IP)
```

Residential ISP pricing multiplies the plan price by the billing cycle and discount:

```text
monthly   = listPrice × (1 − 0.00)   // also virgin list price when toggled
quarterly = listPrice × (1 − 0.05)
annual    = listPrice × (1 − 0.15)
total     = round(monthly × months)
```

The checkout drawer then applies an extra 10% for `LAUNCH10`.

> Prices are marketing fixtures. Any real billing system should move this arithmetic to the server and store quotes/orders where they cannot be tampered with.

---

## API reference

### `GET /api/ip-check`

Looks up an IP with [ip-api.com](http://ip-api.com) (free, no key) and maps the result to an `IpReport`.

**Query / headers**

- `?ip=1.1.1.1` — optional IPv4/IPv6. Without it, the route reads the first `x-forwarded-for` entry, then `x-real-ip`.
- Loopback/private addresses return a fixed, clearly labeled demo record (`103.114.98.42`, Dhaka, `isDemoSample: true`).

**Response (`200`)**

```json
{
  "ip": "8.8.8.8",
  "city": "Mountain View",
  "region": "California",
  "country": "United States",
  "countryCode": "US",
  "asn": "AS15169",
  "org": "Google LLC",
  "isp": "Google LLC",
  "usageType": "Data Center / Hosting",
  "fraudScore": 85,
  "riskBand": "high",
  "proxyDetected": true,
  "vpnDetected": true,
  "torDetected": false,
  "timezone": "America/Los_Angeles",
  "checkedAt": "2026-11-19T00:00:00.000Z",
  "isDemoSample": false
}
```

**Errors**

| Status | Meaning                                                          |
| ------ | ---------------------------------------------------------------- |
| `400`  | IP is invalid or unresolvable (`ip-api` returned `fail`)         |
| `502`  | Upstream lookup failed or timed out (error details are included) |

Classification is heuristic: organization/ISP/ASN strings are matched against a short list of hosting providers and the words "hosting"/"datacenter". Hosting IPs get `fraudScore: 85`; everything else gets `0`. This is **not** a real fraud database such as IPQS or MaxMind.

### `POST /api/chat`

Accepts `{ "messages": [{ "role": "user" | "assistant" | "system", "content": "..." }] }`. Only the last six messages are used.

- Model: `openai/gpt-oss-120b`, falling back to `openai/gpt-oss-20b` if the first request fails.
- Response: `Content-Type: text/event-stream`, one token per frame:

```text
data: "Hello"

data: " there"

data: [DONE]
```

- An in-stream failure emits `data: "[ERROR]"` and closes the stream.
- Request-level errors return JSON with `400` (missing `messages`), `401` (bad key), `429` (rate limit), or `500`.
- The system prompt restricts the assistant to published plans, locations, payment methods, guarantees, and support channels, and requires matching the user's language.

---

## Design system

### Tokens

`src/app/globals.css` defines Tailwind v4 `@theme` tokens:

| Token group       | Values                                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| Brand             | `--color-brand: #2563eb`, `--color-brand-dark: #1d4ed8`, ink `#0b1220` / `#131c2e`                         |
| Shadcn-compatible | background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring |
| Radii             | `sm 0.5rem` → `xl 1.25rem`                                                                                 |
| Fonts             | `--font-sans` Inter, `--font-display` Plus Jakarta Sans, `--font-mono` JetBrains Mono                      |
| Breakpoints       | Tailwind defaults; container is `.shell` at `max-w-7xl`                                                    |

### Utilities

`.shell`, `.section`, `.eyebrow`, `.section-title`, `.lede`, `.card`, `.btn`, `.btn-primary`, `.btn-outline`, `.btn-quiet`, `.field`, `.label`, plus `.scrollbar-none`.

### Animation

Keyframes/utilities: `pulse-dot`, `slow-zoom`, `drift`, `shimmer` (`text-shimmer`), `fade-up`, `marquee`, plus `Reveal` (Framer Motion, viewport-triggered). All animations are effectively disabled under `prefers-reduced-motion: reduce`.

### shadcn / Base UI

`components.json` selects the `base-nova` style, RSC, Tailwind CSS variables, and the Lucide icon library. Only `src/components/ui/button.tsx` is generated so far; it wraps `@base-ui/react/button` with `cva` variants. Add more primitives with the shadcn CLI using the configured aliases.

---

## Currency and localization

- `CurrencyProvider` (in `src/lib/currency.tsx`) exposes `currency`, `setCurrency`, `formatPrice()`, and `formatHourly()`.
- Conversion is fixed: `1 BDT = 0.0082 USD` (`BDT_TO_USD`). There is no live FX feed.
- Selection persists in `localStorage` under `primavps_currency`; server snapshot defaults to BDT to avoid hydration mismatches.
- Default prices render as `৳3,799`; USD as `$31.15`. Hourly figures assume a 720-hour month.
- Marketing copy mixes English and Bangla (notably the hero, network map, and chat quick replies). `layout.tsx` sets `<html lang="en">`; there is no i18n framework or route prefixing.

---

## Images and static assets

- `next.config.ts` allows remote images from `images.unsplash.com` only.
- Local assets in `public/`: payment marks (`bkash.png`, `nagad.png`, `visa-mastercard.png`, `sslcommerz.png`), datacenter photos, `promotion.webp`, world maps, and default Next.js SVGs.
- Some files are duplicated with and without spaces: `Hot deals bg.webp` is used via `/Hot%20deals%20bg.webp` (with `hot-deals-bg.webp` unused); `world-map.webp` is used while `world map.webp` is unused. Prefer hyphenated names — spaces are fragile across CDNs and case-sensitive filesystems.

---

## Review findings

### What is solid

- Clear App Router structure and consistent use of Server Components for static content.
- Strong visual system: coherent tokens, shared utility classes, thoughtful motion with a reduced-motion escape hatch.
- Working streaming UX in the chat widget (abort, typing state, error bubbles, SSE parsing).
- Thoughtful input guards: Windows forces ≥4 GB RAM, cloud presets, carrier filters, accessible labels on sliders, escape-to-close checkout.
- Localized customer support prompt that matches the brand's Bangla/English audience.

### High priority

1. **Checkout and payments are simulated.** `CheckoutDrawer.proceed()` waits 900 ms and displays success; no order is created, no gateway is called, and prices are computed client-side. There is no order API, database, or payment integration despite bKash/Nagad/card logos and Stripe mentions on the status page.
2. **Authentication is a facade.** `/login` and `/register` ignore credentials and hard-redirect to `/cloud-vps`. There is no session, customer area, or protected provisioning flow.
3. **Contact and reseller forms discard data.** They only flip local state and invent a ticket ID; nothing is emailed or stored.
4. **No rate limiting or abuse protection** on `/api/chat` or `/api/ip-check`. The chat endpoint can burn Groq credits and accepts arbitrarily long message content; the IP endpoint is an open proxy to ip-api.com and returns raw upstream error details.
5. **IP checker is not a real reputation service.** The "fraud score" is derived from a substring heuristic (`0` for everything not matched as hosting, `85` for hosting), yet the UI labels it "IPQS fraud score". The demo fallback marks a Dhaka residential IP as `82 / high risk`, which contradicts the site's "0/100 clean IP" promise if a visitor sees it during local development. Consider a proper provider or relabel the metric as "heuristic".
6. **Hero trust card has a real display bug and a hardcoded claim.** `HeroSection.tsx` renders the score with `userReport?.fraudScore ? … : "82 / 100 (High Risk)"`, so a legitimately clean score of `0` is falsy and displays as **82 / High Risk**. The WebRTC/DNS row and "US/UK survey approval" verdict are hardcoded negative text and are not derived from any check. A visitor with a clean connection can therefore be shown alarming, incorrect diagnostics.

### Medium priority

7. **Content and data contradictions.**
   - The AI prompt claims locations "USA (Dallas, New York, Los Angeles), UK, Singapore" and Cloud VPS from ৳499, while the site uses Dallas/Ashburn/Chicago, US-only carriers, and ৳950 cloud base / ৳2,999 ISP base.
   - The hero advertises US/UK/DE/FR residential IPs, but plans and the network map cover the US, Netherlands, and Dhaka only.
   - Hot-deals coupons (`HOTVPS35`, etc.) are only copyable; the checkout accepts only `LAUNCH10`.
   - The status page references "Stripe International Card Checkout" although no Stripe integration exists.
   - `DealsSupportBanner` links to placeholder WhatsApp number `8801700000000`, while other CTAs use `8801960677463` and the footer displays `+880 9606-PRIME`.
8. **Dead code and dependencies.** These components are never imported: `BentoGridArchitecture`, `DualOfferings`, `DhakaOperationsDesk`, `FounderNote`, `LiveDiagnosticsHook`, `MetricBar`, `ProofAndFaq` (all under `sections/home`), plus `ui/FloatingWhatsApp` and `ui/StickyConversionBar`. Several dependencies are likewise unused: `react-globe.gl`, `topojson-client`, `world-atlas`, `gray-matter`, `next-mdx-remote`, `react-hook-form`, `@hookform/resolvers`, `zod`, `shadcn`, and `cn`. Removing them will shrink installs and eliminate false signals in the codebase.
9. **Weak SEO coverage.** Only the root layout and `/hot-deals` export metadata. Most pages (especially `/cloud-vps`, `/survey-vps`, `/blog/[slug]`, and tools) are client components with inherited default titles/descriptions, and there is no `sitemap.ts`, `robots.ts`, or OG image. Add `generateMetadata` or server wrappers for indexable pages.
10. **Styling inconsistency.** Older pages use `.shell`/`.section` and theme tokens; newer pages (`/blog`, `/tools/*`, `/legal/*`, parts of deals) hardcode `max-w-7xl px-4…` and hex colors such as `#F8FAFC`, `#E2E8F0`, `#0B1120`. Centralizing these would prevent visual drift and ease theming.
11. **Dialog accessibility.** `CheckoutDrawer` sets `aria-modal` and closes on Escape but does not trap focus or restore focus to the trigger. The chat panel should similarly manage focus and announce streaming updates (`aria-live`).

### Lower priority

12. **Legal/compliance placeholders.** Legal pages are static text with "Last Updated: November 16, 2026"; the privacy policy does not mention the third parties actually in use (Groq, ip-api.com), cookies/localStorage keys, or data retention. Add real disclosure before launch.
13. **Status page is decorative.** It always reports operational status from a fixture; the navbar badge does the same. Either label it as an example or wire it to a monitor.
14. **Looking glass is simulated.** Output is generated with `setTimeout` and fixed latency numbers; label it as a demo to avoid misleading users.
15. **Minor code hygiene.** `src/next-env.d.ts` duplicates the generated root `next-env.d.ts`; the unused `cn` package shadows the local `cn` helper; the blog article renderer only understands `##`, `###`, `>` and fenced code blocks, so inline `**bold**`, bullet lists, and inline code in `blog.ts` are displayed literally rather than formatted.
16. **No automated checks.** There are no unit, integration, or end-to-end tests, and no CI workflow. At minimum, add lint + typecheck + build to CI once the prototype stabilizes.

---

## Deployment

The app is a standard Next.js Node deployment.

1. Set `GROQ_API_KEY` in the hosting provider's environment.
2. Build with `pnpm build`, then run `pnpm start` (or deploy to Vercel, which detects Next.js automatically).
3. Ensure outbound HTTPS to `api.groq.com` and HTTP to `ip-api.com` is allowed.
4. If deploying behind a proxy/CDN, confirm `x-forwarded-for` / `x-real-ip` are set so the IP checker identifies visitors correctly.
5. Review the security items in [Review findings](#review-findings) before exposing `/api/chat` publicly — add per-IP rate limiting, request-size limits, and a production-grade IP reputation provider.

---

## Troubleshooting

| Symptom                                               | Likely cause / fix                                                                       |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Chat replies with "API key is invalid or missing"     | `GROQ_API_KEY` is unset or wrong in `.env.local`; restart `pnpm dev` after editing       |
| Chat replies with "server ektu busy"                  | Groq rate limit (`429`); wait and retry or raise your quota                              |
| IP checker shows `103.114.98.42` / "Demo Sample Host" | You are on localhost or a private IP; expected fallback                                  |
| IP checker returns `502`                              | ip-api.com unreachable/blocked, or the deployment egress is restricted                   |
| Prices show `৳` when USD expected                     | Currency is stored per browser in `localStorage`; toggle it in the navbar                |
| Unsplash images fail                                  | Only `images.unsplash.com` is allow-listed in `next.config.ts`; add new hosts explicitly |
| Styling looks partially unstyled                      | Tailwind v4 scans only `src/**/*.{ts,tsx,mdx}` via `@source`; keep new UI inside `src`   |

---

## Suggested next steps

1. **Make commerce real** — server-side quote calculation, an orders table, and a bKash/Nagad/card gateway with webhook confirmation.
2. **Add authentication and a customer area** — real sessions, server inventory, IP replacement requests.
3. **Harden and meter the APIs** — rate limiting, input size caps, response caching, and a reputable IP-intelligence provider.
4. **Unify content sources** — one source of truth for locations, prices, support numbers, and coupons shared by marketing copy, the AI prompt, and checkout.
5. **Remove dead code and add CI** — delete unused sections/dependencies, then run lint, typecheck, and build on every PR.

---

© 2026 primavps. Internal project documentation.
