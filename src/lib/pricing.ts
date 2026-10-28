// Source: product.md section 8 ("Plans and pricing"), updated from product_updates.md (2026-10-28).
// A pricing change in the app requires a PR here; src/lib/pricing.test.ts pins these values.

export type PlanId = "starter" | "growth" | "scale";

export interface Plan {
  id: PlanId;
  name: string;
  priceUsd: number;
  /** Price for a year paid up front (owner, 2026-10-27). */
  yearlyPriceUsd: number;
  salesLimitUsd: number;
  salesLimitLabel: string;
  includedMembers: number;
  supportReplies: string;
  atLimit: string;
  badge?: string;
  summary: string;
}

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    priceUsd: 97,
    yearlyPriceUsd: 930,
    salesLimitUsd: 100_000,
    salesLimitLabel: "$100K",
    includedMembers: 5,
    supportReplies: "1–2 business days",
    atLimit: "New deals pause until you upgrade",
    summary: "For small teams getting commissions off spreadsheets.",
  },
  {
    id: "growth",
    name: "Growth",
    priceUsd: 299,
    yearlyPriceUsd: 2_870,
    salesLimitUsd: 500_000,
    salesLimitLabel: "$500K",
    includedMembers: 20,
    supportReplies: "1–2 business days",
    atLimit: "New deals pause until you upgrade",
    badge: "Most popular",
    summary: "Adds automatic bonuses, commission boosts and goal tracking.",
  },
  {
    id: "scale",
    name: "Scale",
    priceUsd: 997,
    yearlyPriceUsd: 9_570,
    salesLimitUsd: 2_000_000,
    salesLimitLabel: "$2M",
    includedMembers: 50,
    supportReplies: "Within 4 business hours",
    atLimit: "Never pauses: we talk Enterprise",
    summary: "Priority support, a private Slack channel and a setup call.",
  },
];

export const STARTING_PRICE_USD = PLANS[0].priceUsd;
export const EXTRA_MEMBER_USD = 20;
export const EXTRA_MEMBER_YEARLY_USD = 192;
export const ENTERPRISE_THRESHOLD_USD = 2_000_000;
export const ENTERPRISE_THRESHOLD_LABEL = "$2M";
export const USAGE_WARNING_PCTS = [80, 90] as const;

// Platform fees, in basis points (1 bp = 0.01%). Invoices and paid awards
// carry no RevSplitPay fee (owner, 2026-10-27).
export const COMMISSION_FEE_BP = 290; // 2.9% of each commission paid to a team member
export const BANK_TRANSFER_FEE_BP = 80; // Stripe bank transfer: 0.8%
export const BANK_TRANSFER_FEE_MAX_USD = 5;

export const HOLD_DAYS = 7;

// Every plan starts with a free trial; no code needed (owner, 2026-10-27).
// It replaced the earlier first-month discount code.
export const TRIAL_DAYS = 14;

// Yearly billing: 20% off twelve monthly payments, rounded down to the $10.
export const YEARLY_DISCOUNT_PCT = 20;

export type BillingPeriod = "monthly" | "yearly";

export const formatBp = (bp: number) => `${(bp / 100).toString()}%`;

export const COMMISSION_FEE_LABEL = formatBp(COMMISSION_FEE_BP);
export const BANK_TRANSFER_FEE_LABEL = formatBp(BANK_TRANSFER_FEE_BP);

export const formatUsd = (usd: number) =>
  `$${usd.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

/** Dollars with cents when there are any: $77.50, $239.17, $299. */
export const formatUsdCents = (usd: number) =>
  Number.isInteger(usd)
    ? formatUsd(usd)
    : `$${usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** What a yearly plan works out to per month. */
export const yearlyMonthlyUsd = (plan: Plan) => plan.yearlyPriceUsd / 12;

/** What paying yearly saves over twelve monthly payments. */
export const yearlySavingsUsd = (plan: Plan) => plan.priceUsd * 12 - plan.yearlyPriceUsd;

export interface FeatureRow {
  label: string;
  plans: Record<PlanId, boolean | string>;
}

export const PLAN_FEATURES: FeatureRow[] = [
  { label: "Selling, checkout links, recurring, instalments and payment plans", plans: { starter: true, growth: true, scale: true } },
  { label: "Automatic commission splits and payouts", plans: { starter: true, growth: true, scale: true } },
  { label: "Invoices from team members", plans: { starter: true, growth: true, scale: true } },
  { label: "Achievements, badges, leaderboard, giving awards", plans: { starter: true, growth: true, scale: true } },
  { label: "Slack and webhooks, dashboard, CSV export", plans: { starter: true, growth: true, scale: true } },
  { label: "Award rules (automatic bonuses)", plans: { starter: false, growth: true, scale: true } },
  { label: "Commission boosts", plans: { starter: false, growth: true, scale: true } },
  { label: "Goal tracker for reps", plans: { starter: false, growth: true, scale: true } },
  { label: "Your logo and colours in the dashboard", plans: { starter: false, growth: false, scale: true } },
  { label: "Private Slack channel with our team", plans: { starter: false, growth: false, scale: true } },
  { label: "Personal setup call (one-time)", plans: { starter: false, growth: false, scale: true } },
  { label: "Priority support", plans: { starter: false, growth: false, scale: true } },
];

/** "5x the sales and 4x the team of Starter": how a plan scales up from the one below. */
export const planMultipleLine = (plan: Plan, below: Plan) => {
  const times = (n: number) => `${Number.isInteger(n) ? n : n.toFixed(1)}x`;
  return `${times(plan.salesLimitUsd / below.salesLimitUsd)} the sales and ${times(plan.includedMembers / below.includedMembers)} the team of ${below.name}`;
};

// What each plan card lists (product_updates.md, section 1). Growth and Scale
// open with planMultipleLine, which is worked out from the limits above.
export const PLAN_HIGHLIGHTS: Record<PlanId, { intro: string; items: string[] }> = {
  starter: {
    intro: "Everything to sell and pay your team",
    items: ["Checkout links, payment plans and subscriptions", "Automatic commission splits and payouts", "Leaderboard, badges and rewards for reps"],
  },
  growth: {
    intro: "Everything in Starter, plus",
    items: ["Automatic bonuses when goals are hit", "Higher commission when goals are hit", "Goal tracker for reps"],
  },
  scale: {
    intro: "Everything in Growth, plus",
    items: [
      "Your logo and colours in the dashboard",
      "Private Slack channel with our team",
      "Personal setup call (one-time)",
      "Priority support (replies within 4 business hours)",
    ],
  },
};

export const EVERY_PLAN_INCLUDES = [
  "Products and checkout links",
  "Payment plans and instalments",
  "Customer subscriptions",
  "Deals pipeline and sales tracking",
  "Refunds and failed-payment recovery",
  "Stripe or Whop",
  "Automatic commission splits and automatic payouts to your team",
  "Reps can send you invoices",
  "Leaderboard and badges; reward reps with cash or a badge",
  "Team roles and invites",
  "Slack and custom webhooks",
  "Dashboard and CSV export",
  "Guided setup and support inbox",
];

export const planMonthlyTotalUsd = (plan: Plan, members: number) =>
  plan.priceUsd + Math.max(0, members - plan.includedMembers) * EXTRA_MEMBER_USD;

export type PlanRecommendation =
  | { kind: "plan"; planId: PlanId; monthlyTotalUsd: number; savingsUsd: number | null }
  | { kind: "enterprise" };

/**
 * Cheapest plan whose monthly sales limit fits, counting extra team members
 * (the owner never counts as one). Ties go to the smaller plan. `savingsUsd`
 * compares against the smallest plan that fits, and is null when there is none.
 */
export function recommendPlan(salesUsd: number, members: number): PlanRecommendation {
  const fitting = PLANS.filter((plan) => plan.salesLimitUsd >= salesUsd);
  if (fitting.length === 0) return { kind: "enterprise" };
  const seats = Math.max(0, Math.floor(members));
  let best = fitting[0];
  for (const plan of fitting) {
    if (planMonthlyTotalUsd(plan, seats) < planMonthlyTotalUsd(best, seats)) best = plan;
  }
  const bestTotal = planMonthlyTotalUsd(best, seats);
  const savings = planMonthlyTotalUsd(fitting[0], seats) - bestTotal;
  return { kind: "plan", planId: best.id, monthlyTotalUsd: bestTotal, savingsUsd: savings > 0 ? savings : null };
}
