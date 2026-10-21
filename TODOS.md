# TODOS

## Legal

### Publish real Terms and Privacy Policy

**What:** Replace the interim legal pages with published Terms of Service, a GDPR privacy notice and (only if cookies are set) a cookie policy.

**Why:** The company is registered in Ireland, so the privacy notice must be published, not "available on request". Stripe and Whop also expect platforms to publish terms covering payout holds, refunds and fees.

**Context:** The 2026-10-19 site refresh replaces payment-gateway filler on `/legal/*` with factual interim pages (product.md sections 9-10). The site processes personal data through the contact form and blog-admin Supabase auth. Needs owner and counsel.

**Effort:** M (human) / S (CC drafting, counsel review required)
**Priority:** P1
**Depends on:** Owner decision Q-LEGAL

## Website

### Contact form backend

**What:** Store contact submissions in a Supabase table with an email notification, instead of opening the visitor's mail client.

**Why:** `mailto:` fails silently for visitors on webmail without a configured mail client, so Enterprise leads can be lost.

**Context:** The refresh ships a fallback (address plus copy button after submit). The repo already uses Supabase for the blog; a table with an insert-only RLS policy and an edge function for notification would close the gap.

**Effort:** M (human) / S (CC)
**Priority:** P2
**Depends on:** None

### Real product screenshots and walkthrough

**What:** Add 2-3 anonymised screenshots and a 60-90 second walkthrough recorded from app.revsplitpay.com.

**Why:** For a new payments product, seeing the real dashboard, checkout link and payout screen is the strongest honest proof available.

**Context:** The refresh removes all template imagery and uses labeled JSX "Example" visuals. The old `video-explain.mp4` (61.5 MB) was removed pending owner review (Q-VIDEO); any new video should be compressed and lazy-loaded.

**Effort:** S (human, owner records) / S (CC to integrate)
**Priority:** P2
**Depends on:** Owner assets

### Prerender public routes for SEO and link previews

**What:** Prerender the 14 public routes at build time so titles, descriptions and OG tags exist in static HTML.

**Why:** The site is a client-rendered SPA; Slack, WhatsApp, LinkedIn and some crawlers only see `index.html` defaults.

**Context:** Deferred as X7 in the 2026-10-19 review. Candidates: vite-react-ssg or a prerender plugin. Blog slugs come from Supabase and need build-time fetching.

**Effort:** L (human) / M (CC)
**Priority:** P2
**Depends on:** None

### Comparison page vs commission tools and spreadsheets

**What:** A factual page comparing RevSplitPay with spreadsheets plus manual transfers and with commission software (CaptivateIQ, Spiff, QuotaPath).

**Why:** Commission tools calculate but do not move money; that is the core difference buyers need spelled out.

**Context:** Deferred as X5. Every competitor claim needs a cited source.

**Effort:** M (human) / S (CC)
**Priority:** P3
**Depends on:** Sourced competitor facts

### Example public rep profile

**What:** Show what a public rep profile looks like, clearly synthetic.

**Why:** Rep profiles are a differentiator and a possible acquisition channel.

**Context:** Deferred as X6 because it can read as fabricated proof. Needs a design that cannot be mistaken for a real rep.

**Effort:** S (human) / S (CC)
**Priority:** P3
**Depends on:** None

### Rep-side referral path

**What:** A short section and link for closers and setters to send RevSplitPay to their agency owner.

**Why:** Reps feel late payouts most and move between agencies; they can pull owners in.

**Context:** Raised by the CEO voice in the 2026-10-19 review; owner remains the buyer.

**Effort:** S (human) / S (CC)
**Priority:** P3
**Depends on:** None

### Shared pricing source with the app

**What:** Feed plan prices and limits to the website from the app or a shared package.

**Why:** `src/lib/pricing.ts` duplicates billing facts; app pricing changes will drift.

**Context:** The refresh adds a source comment and unit tests that pin pricing.ts to product.md section 8.

**Effort:** M (human) / S (CC)
**Priority:** P3
**Depends on:** App exposing plan data

## SEO (added 2026-10-21)

Phase 1-3 groundwork is built: build-time prerender of every v2 page
(`scripts/prerender.mjs`, `src/entry-server.tsx`), per-page meta and JSON-LD
(`src/v2/components/page-meta.tsx`, `src/v2/seo/`), generated `sitemap.xml`,
`robots.txt` (AI crawlers allowed), `llms.txt` and `llms-full.txt`.

### Switchover steps (when v2 replaces the live site)

**What:**
1. Set `V2_BASE = ""` in `src/v2/lib/paths.ts`. This drops the preview noindex, advertises the sitemap in robots.txt and prerenders pages at the root.
2. Point the root routes in `src/app-tree.tsx` at v2, then remove the old site's pages, sections and Lottie (cuts about 2.5 MB of JS).
3. Add 301s in `vercel.json`: `/feature` to `/features`, `/integration` to `/integrations`, `/integration/:slug` to `/integrations/:slug`. (Legal URL redirects are already live.)
4. Restrict the catch-all rewrite to real app routes so unknown URLs return a real 404 instead of a soft 404.
5. Remove the index.html inline v2-theme script and the Inter Tight preload.
6. Compress `video-explain.mp4` (61 MB) to under 5 MB, and convert images to WebP.
7. Verify revsplitpay.com in Google Search Console and Bing Webmaster Tools (DNS), submit the sitemap, and add IndexNow on deploy.

**Priority:** P1 at switchover

### Owner inputs for trust and structured data

**What:** Legal company name, registered address and CRO number (footer and Organization JSON-LD); official social profile URLs (`ORGANIZATION.sameAs` in `src/v2/seo/site.ts`); a domain email with SPF, DKIM and DMARC; refund policy and DPA text (terms, privacy and cookie policies are live as of 2026-10-21); decide whether the privacy and cookie policies should also name Wistia (video) and Supabase (blog) for revsplitpay.com; founder story and photos for About; an analytics choice (Plausible, or GA4 with consent).

**Priority:** P1

### Blog rebuild hook

**What:** Trigger a Vercel deploy hook when a post is published, so new posts are prerendered and added to the sitemap. Until then, new posts render client-side and appear in the sitemap on the next deploy.

**Priority:** P2

### Phase 4 content and Phase 6 off-site

**What:** Keyword research, then use-case pages, the free commission calculator page, glossary, help centre and comparison pages; listings on G2, Capterra, Product Hunt and the Whop app store; YouTube copy of the explainer (then add VideoObject JSON-LD with its real upload date).

**Priority:** P2
