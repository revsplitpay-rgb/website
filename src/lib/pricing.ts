// Source: product.md section 8 ("Plans and pricing").
// A pricing change in the app requires a PR here; src/lib/pricing.test.ts pins these values.

export type PlanId = "starter" | "growth" | "scale";

export interface Plan {
  id: PlanId;
  name: string;
  priceUsd: number;
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
    salesLimitUsd: 500_000,
    salesLimitLabel: "$500K",
    includedMembers: 25,
    supportReplies: "1–2 business days",
    atLimit: "New deals pause until you upgrade",
    badge: "Most popular",
    summary: "Adds automatic bonuses, commission boosts and goal tracking.",
  },
  {
    id: "scale",
    name: "Scale",
    priceUsd: 997,
    salesLimitUsd: 2_000_000,
    salesLimitLabel: "$2M",
    includedMembers: 75,
    supportReplies: "Within 4 business hours",
    atLimit: "Never pauses: we talk Enterprise",
    summary: "Priority support, a private Slack channel and a setup call.",
  },
];

export const STARTING_PRICE_USD = PLANS[0].priceUsd;
export const EXTRA_MEMBER_USD = 25;
export const ENTERPRISE_THRESHOLD_USD = 2_000_000;
export const ENTERPRISE_THRESHOLD_LABEL = "$2M";
export const USAGE_WARNING_PCTS = [80, 90] as const;

// Platform fees, in basis points (1 bp = 0.01%).
export const COMMISSION_FEE_BP = 290; // 2.9% of each commission paid to a team member
export const INVOICE_FEE_BP = 50; // 0.5% on invoices and paid awards
export const BANK_TRANSFER_FEE_BP = 80; // Stripe bank transfer: 0.8%
export const BANK_TRANSFER_FEE_MAX_USD = 5;

export const HOLD_DAYS = 7;

// New-customer offer (owner, 2026-10-19). Shown without any countdown or deadline.
export const WELCOME_OFFER = {
  code: "WELCOME50",
  percentOff: 50,
  appliesTo: "your first month",
} as const;

export const formatBp = (bp: number) => `${(bp / 100).toString()}%`;

export const COMMISSION_FEE_LABEL = formatBp(COMMISSION_FEE_BP);
export const INVOICE_FEE_LABEL = formatBp(INVOICE_FEE_BP);
export const BANK_TRANSFER_FEE_LABEL = formatBp(BANK_TRANSFER_FEE_BP);

export const formatUsd = (usd: number) =>
  `$${usd.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export const welcomeOfferLine = () =>
  `${WELCOME_OFFER.percentOff}% off ${WELCOME_OFFER.appliesTo} with ${WELCOME_OFFER.code}`;

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
  { label: "Private Slack channel with our team", plans: { starter: false, growth: false, scale: true } },
  { label: "Personal setup call (one-time)", plans: { starter: false, growth: false, scale: true } },
  { label: "Priority support", plans: { starter: false, growth: false, scale: true } },
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
