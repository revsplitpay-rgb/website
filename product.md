# RevSplitPay — Product Brief for Website Generation

> Purpose of this document: give an AI website builder complete, accurate context
> about RevSplitPay so it can generate marketing pages. Every fact here is drawn
> from the production codebase. Do NOT invent features, numbers, or testimonials
> beyond what this document states.

---

## 1. What RevSplitPay Is (one paragraph)

RevSplitPay is a commission and revenue-split platform for sales teams. A business
owner (agency, coaching company, high-ticket sales org) runs a team of closers,
setters, and partners. When a sale happens, RevSplitPay automatically splits the
revenue, pays each team member their commission directly through Stripe, and keeps
a verified ledger of every dollar. No spreadsheets, no manual transfers, no
"I'll pay you Friday."

**One-liner:** Automatic, verified commission payouts for sales teams.

**Tagline candidates:**
- "Close the deal. We split the money."
- "Commission payouts that run themselves."
- "Verified pay for every role that earns — closers, setters, partners."

---

## 2. The Problem It Solves

- Businesses with commissioned sales teams track splits in **spreadsheets** and pay
  reps by **manual bank transfers** — slow, error-prone, and a constant source of
  disputes ("you shorted me", "where's my payout?").
- Sales reps (closers/setters) have **no proof of their track record**. Anyone can
  claim "$50K months" on social media; none of it is verifiable.
- Owners waste hours every month reconciling who is owed what, and trust erodes
  every time a payment is late or wrong.

**Status quo competitor:** spreadsheets + Venmo/bank transfers + trust. Not another SaaS.

---

## 3. Who It's For (audiences for the website)

### Primary: Business owners
Agencies, coaching/consulting businesses, and high-ticket sales organizations with
3+ commissioned team members. They buy because it kills commission admin and
payment disputes.

### Secondary: The earning team — closers, setters & rev-share partners
Anyone who earns a cut of revenue: closers, setters, and revenue-share partners.
They join because pay becomes guaranteed, transparent, and on-time — and their
performance becomes a **verified public credential** they can show off. This is
never a closers-only story: setters and partners get the same ledger, profile,
tiers, and share cards.

### Roles supported in the product
- Business Owner, Business Admin, Sales Manager, Closer, Setter, Partner, Staff

---

## 4. Core Features (only these — do not invent others)

### 4.1 Automatic revenue splitting
- Owner creates products and checkout links with commission percentages per
  participant (e.g. closer 12%, setter 8%).
- Customer pays via a Stripe checkout link. The platform automatically calculates
  and records each participant's commission on every sale.
- Supports one-time, recurring (monthly/quarterly/annual), and installment deals.

### 4.2 Direct Stripe payouts
- Every team member connects their own Stripe account (Stripe Express onboarding).
- Commissions are paid by direct Stripe transfer — money goes straight to the rep.
- A 7-day settlement hold protects against refunds; after it, payouts can run
  automatically or with one click.
- Per-deal early payout: an admin can advance a single deal's commission early
  when a rep requests it.

### 4.3 Live ledger & transparency
- Every rep sees their own earnings ledger in real time: what's locked, what's
  pending, what's paid.
- Owners see team-wide payout status, history, and failed-transfer recovery
  (retry or pay by card).

### 4.3b Deals pipeline
- Every paid checkout link automatically becomes a tracked deal — no manual
  pipeline entry.
- Full lifecycle tracked: open → closed won / closed lost, plus expired,
  churned, and refunded.
- Deal record includes amount, deal type (one-time/recurring/installments),
  customer name, and renewal cycle number.

### 4.3c Team performance leaderboard
- Ranks the team by revenue generated over 7/30/90-day windows.
- Revenue credit is shared fairly — both the closer AND the setter on a deal
  get credited, not just whoever created the checkout link.
- Shows revenue generated and commission earned side by side per rep.

### 4.4 Invoices (payment requests)
- Team members can request one-off payments (e.g. a bonus, reimbursement, or
  direct client work). Owner approves; a Stripe payment link is generated; the
  member receives the money minus a small platform fee.

### 4.5 Achievements, tiers & verified share cards
- Reps climb an 8-tier ladder based on lifetime verified revenue:
  First Deal → Bronze → Silver → Gold → Platinum → Diamond → Elite → Legendary.
- Badges for milestones (streaks, deal counts, revenue clubs).
- Every rep gets a **public profile** and a downloadable **verified performance
  card** showing rank, tier, deals closed, and lifetime revenue — all backed by
  real payment data. This is the credential a closer can post on LinkedIn/X.
- Key phrase to use everywhere: **"Verified by real payment data."**

### 4.6 Awards & bonuses
- Owners can give public awards (title + optional cash bonus) to team members.
  Cash awards carry **zero platform fee** — the rep gets the full amount.

### 4.7 Analytics & reporting
- Owner dashboard: revenue, top performers, deal status, payout health.
- Platform-level analytics for administrators.

---

## 5. How It Works (3-step story for the website)

1. **Connect** — Owner connects the business Stripe account; team members join
   with an invite code and connect theirs.
2. **Sell** — Create a product, set the split percentages, share the checkout
   link. Customers pay as usual.
3. **Everyone gets paid** — The platform splits every sale automatically and
   transfers each person's cut to their own Stripe account. The ledger proves it.

---

## 6. Pricing (accurate — do not embellish)

| Component | Price |
|---|---|
| Monthly platform subscription (metered by business revenue/month) | $300 (up to $100K) · $600 ($100K–$250K) · $900 ($250K–$500K) · $1,500 ($500K+) |
| Platform fee on commissions | 3.5% of each team member's commission (owner's own share is exempt) |
| Invoice / payment-request fee | 3% of the invoice amount |
| Award bonuses | 0% platform fee |
| Stripe processing | Standard Stripe rates apply (~2.9% + $0.30) |

Positioning note: lead with the value (automation + trust + verified credential),
not the fee table. The sweet spot customer is a business doing $20K+/month with
3+ commissioned reps.

---

## 7. Key Benefits (use these as marketing pillars)

**For business owners**
1. Zero commission math — splits happen automatically on every sale.
2. No more payment disputes — reps see the same verified ledger you do.
3. Hours saved every month — no spreadsheets, no manual transfers.
4. Refund-safe — the settlement hold protects you before money goes out.
5. Retention — public achievements and awards keep top closers motivated.

**For the earning team (closers, setters, partners)**
1. Guaranteed, on-time pay — your cut can't be "forgotten," whatever your role.
2. Full transparency — a live personal ledger of every dollar earned.
3. A verified track record — rank, tier, and revenue backed by real Stripe
   payments, shareable as a public profile and performance card.
4. Your reputation travels with you — achievements live on your profile,
   whether you close, set, or hold a rev-share.

**The differentiator (the moat — emphasize this)**
Anyone can claim numbers. RevSplitPay earnings are **verified by real payment
data** — the only sales credential that can't be faked.

---

## 7.5 Why RevSplitPay (banner / hero copy pool)

Short, punchy lines for hero banners, feature strips, or rotating taglines.
Split by audience — pull whichever fit the section.

### For business owners
- Automatic Commission Splits
- No More Commission Math
- Every Deal, Auto-Tracked
- Recurring Commissions, Handled Automatically
- Refund-Safe Payouts
- Full Audit Trail on Every Dollar
- No More Payment Disputes
- Live Team Leaderboard
- One-Off Invoicing, Built In
- Zero-Fee Bonuses & Awards
- No Spreadsheets. No Guesswork.
- From Deal Closed to Money Paid — Automatic
- Same Ledger, Same Trust for Everyone
- Your Team Closes. We Handle the Money.
- Commission-Splitting, Solved

### For closers, setters & partners
- Real-Time Payout Ledger
- Paid Straight to Your Stripe Account
- Verified by Real Payment Data
- Verified Performance Cards
- Public Sales Credential
- Early Payout on Request
- Your Track Record, Verifiable
- Tier Ladder & Achievement Badges
- Your Reputation, Not Locked to One Job
- Nobody Chases Their Money Here
- Built for Closers, Setters & Partners
- Split the Revenue. Not the Trust.
- Real Payouts. Real Proof. Real Fast.
- Trust You Can Actually Prove
- One Sale, You Get Paid — No Asking

### The moat, in one line
"RevSplitPay turns 'trust me' into 'here's the receipt' — for every deal, every
payout, every person on the team."

### The bigger thesis (use sparingly — pitch decks, about page, not the hero)
"This isn't just infrastructure for one business — it's a portable reputation
system for an entire labor market. Remote sales and closing has never had a
standard, verifiable credential. If RevSplitPay becomes that standard, every
closer, setter, and partner's track record lives here — the way a Chess.com
rating or a verified LinkedIn does for other fields."

---

## 8. Brand Identity (the website MUST follow this)

- **Logo:** `/logo.png` — rounded-square app icon, blue gradient, white "R" with
  an angular cut. Lockup: logo 24–28px + "RevSplitPay" semibold.
- **Brand gradient (signature):**
  `linear-gradient(135deg, #003D82 0%, #0058B8 30%, #0072E4 60%, #3FC1FF 100%)`
  Navy → electric cyan. Use for hero surfaces and key accents only — not
  everywhere.
- **Palette:** deep navy `#003D82`, brand blue `#0058B8` / `#0072E4`, cyan
  `#3FC1FF`, page background `#f9fbfd`, white cards, dark text.
- **Type:** clean sans-serif (system/Inter-like), semibold headings with tight
  tracking; money always in tabular numerals.
- **Feel:** premium fintech — trustworthy, precise, confident. Think "financial
  credential," not "gamer graphics." Craft over decoration.
- **Voice:** direct, concrete, builder-to-builder. Short sentences. Real numbers.
  No hype words, no corporate filler.
- Signature phrase: **"Verified by real payment data."**

---

## 9. Website Structure Suggestion (for the AI builder)

1. **Hero** — one-liner + brand-gradient visual (e.g. the revenue card or a
   verified performance card mock) + primary CTA "Start splitting" / "Get started".
2. **Problem** — the spreadsheet-and-late-payment pain, told in one tight section.
3. **How it works** — the 3-step story (Connect → Sell → Everyone gets paid).
4. **Features** — the core six (splits, payouts, ledger, invoices, achievements,
   awards) with short benefit-led copy.
5. **For your team** — dedicated section on the verified credential / share card
   for every earning role: closers, setters, and rev-share partners (this is
   unique; competitors don't have it). Never frame it as closers-only.
6. **Pricing** — simple tier table from section 6.
7. **FAQ** — payouts timing (7-day hold), Stripe requirement, fees, refunds.
8. **Footer CTA** — "Your team closes. We handle the money."

Do NOT fabricate: customer logos, testimonials, user counts, revenue processed,
press mentions, or integrations beyond Stripe. If a section needs social proof,
use the verified-credential concept itself as the proof story.

---

## 10. Tech Facts (for accuracy, if mentioned)

- Payments infrastructure: **Stripe Connect** (checkout links, direct transfers,
  Express onboarding).
- Web app: Next.js; real-time backend: Convex.
- Money handling: all amounts tracked in cents; commissions computed per-deal;
  full audit trail.
