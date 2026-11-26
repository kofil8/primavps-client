## 1. Frontend Architecture (UI-First, API-Ready)

পুরো Next.js 16 App Router ফ্রন্টএন্ডটিকে ৪টি পরিষ্কার লেয়ারে ভাগ করলে UI এবং ফিউচার API একদম decoupled থাকবে:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ 1. PRESENTATION LAYER (src/app/* & src/components/*)                    │
│    ├─ Public Marketing Shell  : AnnouncementBar + Navbar + Footer       │
│    ├─ Focused Auth/Checkout   : Minimal Header (No Pre-Footer CTA)      │
│    └─ Client Portal Shell     : DashboardSidebar + Topbar (No Marketing)│
├─────────────────────────────────────────────────────────────────────────┤
│ 2. ROUTE GUARD & SESSION LAYER (src/proxy.ts + src/lib/auth/*)          │
│    ├─ Public Routes           : Direct Access                           │
│    ├─ Guest-Only (/login, /register): Redirect to /dashboard if logged  │
│    └─ Protected (/checkout, /dashboard/*): Redirect -> /login?next=...  │
├─────────────────────────────────────────────────────────────────────────┤
│ 3. SERVICE ADAPTER LAYER (src/lib/services/*)  ◄── API Switch Boundary  │
│    ├─ USE_LIVE_API = false -> returns typed mock data (lib/data/*)      │
│    └─ USE_LIVE_API = true  -> calls NestJS (/api/v1/*) via BFF          │
├─────────────────────────────────────────────────────────────────────────┤
│ 4. STATIC CONFIG & MOCK DATA (src/lib/config/company.ts + src/lib/data/)│
│    └─ Single source of truth: plans, deals, blog, status, client-demo   │
└─────────────────────────────────────────────────────────────────────────┘

```

**কেন এই প্যাটার্নটা জরুরি:**

- তোমার `src/lib/services/blog.ts`-এ যেমন `USE_LIVE_API = false` প্যাটার্নটা আছে, ঠিক একইভাবে `services/catalog.ts`, `services/checkout.ts`, এবং `services/dashboard.ts` বানিয়ে রাখলে এখন UI ১০০% ইন্টারঅ্যাক্টিভ থাকবে (মক ডাটা + `localStorage`/React state দিয়ে), আর পরে শুধু সার্ভিস ফাইলে `fetch()` বসালেই লাইভ হয়ে যাবে।
- **Single Source of Truth:** SLA (`99.98%`), ফোন/WhatsApp, অফিস ঠিকানা, আর ৭ দিন পর `৳৩৫০` IP Swap ফি—সব `src/lib/config/company.ts` থেকে আসবে, যাতে হোমপেজ, ফুটার আর লিগ্যাল পেজে তথ্যের কোনো অমিল না থাকে।

---

## 2. Route Map & UI Structures (Public vs. Auth vs. Protected)

### A. Public Routes (Marketing, Storefront, Tools & Legal)

**Layout Shell:** `SiteHeader` (`AnnouncementBar` + `Navbar`) + `Page Content` + `Footer` (Pre-footer CTA সহ) + `LazyChatWidget` + `CookieConsentNotice`।

| Route                                                               | Purpose                                 | Core UI Blocks / Sections                                                                                                                     | Current Status & UI Gaps                                                               |
| ------------------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `/`                                                                 | Main Conversion Landing                 | Hero (Country switcher + IP card) → HowItWorks → SurveyRdpPlans → GlobalNetworkMap → WhyTrustUs → Reviews → FAQ                               | Built — USDT, "Survey VPS" title, ও `w=3840` map `sizes` ফিক্স বাকি                    |
| `/isp-vps`                                                          | Primary Product Configurator            | Dark Hero → Sticky Filter Bar (Country, Clean/Virgin, Carrier) → Billing Cycle Switch → 3 Plan Cards → Trust Box → `CheckoutDrawer`           | Built — US State auto-assign নোট, Day 8+ ৳৩৫০ নোট, ও USDT রিমুভ বাকি                   |
| `/cloud-vps`                                                        | Custom NVMe Configurator                | Console Hero → 4-Step Builder (Region, OS, Presets + Sliders, Network/Residential IP Add-on) → Sticky Summary + Mobile Bar → `CheckoutDrawer` | Built — ফাইলটি ৩২ KB (সাব-কম্পোনেন্টে ভাগ করা দরকার) ও `/survey-vps` লিংক → `/isp-vps` |
| `/hot-deals`                                                        | Promo Codes & Offers                    | `DealsHero` (Countdown) → `CouponCard` Grid (Copy + Auto-Apply) → `DealsFeatures` → FAQ → `DealsSupportBanner`                                | Built — FAQ থেকে USDT/PayPal কপি সরাতে হবে                                             |
| `/resellers`                                                        | Bulk / Agency Tier                      | Volume Discount Tiers (10+, 25+, 50+ VMs) → Reseller Perks → Inquiry / WhatsApp CTA                                                           | Built — Ready                                                                          |
| `/tools/*`                                                          | Free Diagnostic Funnel                  | `/ip-checker` (IPQS score + risk breakdown), `/webrtc-test` (STUN leak check), `/looking-glass` (Node ping)                                   | Built — Hero ও Pricing থেকে ডিরেক্ট লিংক হাইলাইট করতে হবে                              |
| `/blog` & `/blog/[slug]`                                            | SEO & Buyer Guides                      | Server-rendered Index + Search/Category/Sort/Pagination (`?q=&category=&page=`) → Article + Auto TOC + Related Posts                          | Built — `[slug]` সাইডবারে ব্রোকেন JSX প্রপস আছে কি না ভেরিফাই করতে হবে                 |
| `/status`                                                           | Network Uptime & Nodes                  | Global Status Banner → Node Cards (US/UK/DE/FR ping & uptime) → Incident History                                                              | Built — Ready                                                                          |
| `/about`, `/contact`, `/terms`, `/privacy-policy`, `/refund-policy` | Merchant Compliance (DBID / SSLCommerz) | `LegalPageShell` (TOC + Structured Policy), Banani Office, Trade License, DBID, Contact Form                                                  | Built — সব জায়গায় `COMPANY_INFO` রিয়েল ডাটা ভেরিফাই করতে হবে                           |
| `/survey-vps`, `/deals`, `/legal/*`                                 | Legacy Redirects                        | Server-side redirect to `/isp-vps`, `/hot-deals`, `/terms`, `/privacy-policy`, `/refund-policy`                                               | Built — ইন্টারনাল সব লিংক সরাসরি নতুন রুটে পয়েন্ট করতে হবে                             |

|

---

### B. Auth Routes (Guest-Only Funnel)

**Layout Shell:** Minimal Focused Header (শুধু Logo + Back to Home/Support) — কোনো সেলস ব্যানার, কারেন্সি সুইচার বা Pre-Footer CTA থাকবে না।

| Route              | Purpose                | Core UI Blocks / States                                                                                      | Current Status & UI Gaps                                     |
| ------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `/login`           | Sign In                | Email/Password + Show/Hide Toggle + Remember Me + Turnstile + Inline Error/Loading State + `?next=` preserve | Built — `/register` লিংকে `?next=` ফরোয়ার্ড নিশ্চিত করতে হবে |
| `/register`        | Sign Up                | Name, Email, BD Phone/WhatsApp, Password + Strength Meter + Terms Checkbox + Turnstile + `?next=` preserve   | Built — ডেমো মোডে সাবমিট করলে মক সেশন সেট হয়ে `next`-এ যাবে  |
| `/forgot-password` | Password Reset Request | Email Input + Turnstile + "Check your inbox" Confirmation State                                              | **Missing (তৈরি করতে হবে)**                                  |
| `/reset-password`  | Set New Password       | Token param check (`?token=`) + New/Confirm Password + Success Redirect to `/login`                          | **Missing (তৈরি করতে হবে)**                                  |

|

---

### C. Protected Routes (Checkout & Client Portal)

**Guard Rule (`src/proxy.ts`):** `primavps_session` কুকি না থাকলে `/login?next=<encoded_full_path_and_query>`-এ রিডাইরেক্ট করবে। (UI-First ফেজে আমরা একটি ডেমো লগইন/সেশন কুকি দিয়ে সব প্রোটেক্টেড পেজ ফুল টেস্ট করতে পারব।)

**Layout Shell:**

- `/checkout/*`: Distraction-free Checkout Header (Logo + Step Indicator + 24/7 WhatsApp Help), কোনো Marketing Footer নেই।
- `/dashboard/*`: `DashboardSidebar` (Desktop Fixed Left + Mobile Drawer) + Top Portal Header (Breadcrumb, "Deploy New Server" CTA, User Profile/Logout)।

| Route                      | Purpose                    | Core UI Blocks / Interactive States                                                                                                                                                                                                                                    | Current Status & UI Gaps                                                              |
| -------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `/checkout`                | Order Review & Payment     | 2-Column Layout: Left (Config Summary, OS/Region/ISP, Billing Cycle, Coupon Input, Payment Method: bKash / Nagad / Rocket / SSLCommerz) · Right (Sticky Price Breakdown + Pay CTA)                                                                                     | Built — `?coupon=` রিড করে না এবং `/cloud-vps` অর্ডার সাপোর্ট করে না (ফিক্স করতে হবে) |
| `/checkout/success`        | Post-Payment Provisioning  | Live 3-Step Tracker (`Payment Verified ✓` → `Assigning Clean IP...` → `Windows RDP Ready`) + IP/User/Pass Reveal + 1-Click `.rdp` File Download + "Go to Dashboard"                                                                                                    | **Missing (তৈরি করতে হবে)**                                                           |
| `/checkout/failed`         | Payment Failed / Cancelled | Clear Reason Banner + "Retry Payment" CTA + Order Reference + WhatsApp Support                                                                                                                                                                                         | **Missing (তৈরি করতে হবে)**                                                           |
| `/dashboard`               | Client Overview            | 4 KPI Cards (Active VPS, Unpaid Invoices, Open Tickets, Next Renewal) + Quick Server Status List + Recent Activity                                                                                                                                                     | Built — `client-demo.ts` দিয়ে চলে                                                     |
| `/dashboard/services`      | My VPS Instances           | Filter Tabs (All / Running / Provisioning / Suspended) + Server Cards (Country Flag, IP, ISP/Carrier, Expiry, Status Pill)                                                                                                                                             | Built — ক্লিক করলে ডিটেইল ভিউতে যাওয়ার লিংক যোগ করতে হবে                              |
| `/dashboard/services/[id]` | Single VPS Control Panel   | **Tabs/Cards:** Connection Info (IP, Port, Username, Masked Password + Reveal Button, 1-Click `.rdp` Download) · Power Actions (Restart / Stop / Start) · **7-Day IP Swap Widget** (Free countdown badge অথবা Day 8+ `৳৩৫০` Paid Swap modal) · Billing/Auto-Renew info | **Missing (তৈরি করতে হবে — সবচেয়ে গুরুত্বপূর্ণ পোর্টাল পেজ)**                         |
| `/dashboard/invoices`      | Billing & Payments         | Filter (All / Unpaid / Paid) + Invoice Table (Invoice #, Item, Amount BDT, Due Date, Status) + "Pay Now" Action + Printable Receipt Modal                                                                                                                              | Built — Receipt Modal ও Pay Now ফ্লো যুক্ত করতে হবে                                   |
| `/dashboard/support`       | Support Tickets            | Ticket List (Subject, Category, Status, Last Updated) + "New Ticket" Modal (Select Related VPS, Priority, Message)                                                                                                                                                     | Built — Ticket Conversation Drawer/Detail (`/dashboard/support/[id]`) যোগ করতে হবে    |
| `/dashboard/settings`      | Account & Security         | Profile Form (Name, Email, WhatsApp/Phone) + Change Password Form + Active Sessions / Logout                                                                                                                                                                           | **Missing (তৈরি করতে হবে)**                                                           |

|

---

## 3. End-to-End Frontend User Flows

### Flow 1: Public Visitor → Checkout → Provisioning (Core Revenue Funnel)

```text
[ / (Home) or /hot-deals ]
         │  Clicks "প্ল্যান দেখুন" / "Apply Coupon"
         ▼
[ /isp-vps or /cloud-vps ] ──► Configures Country / Carrier / Specs
         │  Clicks "অর্ডার করুন" -> Opens CheckoutDrawer
         ▼
[ CheckoutDrawer ] ──► Validates Coupon Scope (ISP vs Cloud) -> Clicks "Proceed to Checkout"
         │  Navigates to /checkout?type=isp&plan=pro&country=us&carrier=AT&T&cycle=monthly&coupon=LAUNCH10
         ▼
   ┌───────────────────────────┐
   │ proxy.ts: Has Session?    │
   └──────┬─────────────┬──────┘
      NO  │             │ YES
          ▼             │
[ /login?next=... ]     │
   (or /register?next=) │
          │ Auth OK     │
          └──────┬──────┘
                 ▼
[ /checkout ] ──► Reviews Summary -> Picks bKash / Nagad / SSLCommerz -> Clicks Pay
                 │  (In UI-First Mock Mode: Simulates 1.5s gateway redirect)
         ┌───────┴────────┐
    Success            Failed/Cancel
         ▼                ▼
[ /checkout/success ]  [ /checkout/failed ]
 ├─ Step 1: Paid ✓      └─ Retry Payment -> /checkout
 ├─ Step 2: IP Assigned
 └─ Step 3: RDP Ready + 1-Click .rdp Download -> [ /dashboard/services/[id] ]

```

### Flow 2: Client Portal Management Flow (`/dashboard/*`)

```text
[ /dashboard (Overview) ]
   ├──► [ /dashboard/services ] ──► [ /dashboard/services/[id] ]
   │                                  ├─ Reveal Password (Masked -> Click -> Copy)
   │                                  ├─ Download .rdp File (Client-side Blob generator)
   │                                  ├─ Power Controls (Start / Stop / Reboot UI state)
   │                                  └─ Request IP Swap:
   │                                       ├─ Day 1–7 & swapsUsed === 0 -> Free Swap Modal
   │                                       └─ Day 8+ or swapsUsed >= 1 -> ৳350 Invoice Preview
   ├──► [ /dashboard/invoices ] ──► Pay Unpaid Invoice (/checkout?invoice=INV-xxx) / View Receipt
   ├──► [ /dashboard/support ]  ──► Create Ticket Modal / Reply Thread
   └──► [ /dashboard/settings ] ──► Update WhatsApp / Change Password / Sign Out

```

---

## 4. UI-First Execution Plan (কোন অর্ডারে শেষ করব)

API ধরার আগে আমরা ফ্রন্টএন্ডকে ৪টি ছোট স্প্রিন্টে লক করে ফেলতে পারি:

1. **Sprint 1 — Public Compliance & Broken-Link Cleanup:**

- `public/usdt.png` ডিলিট করা + Hero, ISP VPS, Cloud VPS, Hot Deals, CheckoutDrawer থেকে USDT/crypto রিমুভ করা।
- `Navbar.tsx` ফিক্স (`/isp-vps` অ্যাক্টিভ স্টেট ও লিংক), `company.ts`-এ SLA ও Day 8+ ৳৩৫০ কপি সেন্ট্রালাইজ করা, এবং `world-map.webp`-এ `sizes` ফিক্স করা।

2. **Sprint 2 — Complete Auth & Checkout Funnel UI:**

- `checkout/page.tsx` আপডেট (ISP + Cloud দুটোই সাপোর্ট + `?coupon=` সাপোর্ট)।
- নতুন ৩টি পেজ তৈরি: `/checkout/success` (লাইভ স্টেপার + `.rdp` ডাউনলোড), `/checkout/failed`, এবং `/forgot-password` + `/reset-password`।

3. **Sprint 3 — Complete Protected Dashboard UI:**

- `/dashboard/services/[id]` (RDP Reveal, `.rdp` ফাইল জেনারেটর, 7-Day Free vs ৳350 IP Swap UI, Power Controls)।
- `/dashboard/settings` + Invoices Receipt Modal + Support Ticket Detail Drawer।

4. **Sprint 4 — Service Layer Abstraction (`src/lib/services/*`):**

- সব মক ডাটা কলকে `lib/services/`-এর ভেতর নিয়ে আসা, যাতে পরের ধাপে NestJS API চালু করলেই শুধু `USE_LIVE_API = true` করে ইন্টিগ্রেট করা যায়।
