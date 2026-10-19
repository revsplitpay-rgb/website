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
