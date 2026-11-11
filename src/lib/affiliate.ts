// The affiliate program: FirstPromoter campaign "Revsplitpay Affiliate Program"
// (owner, 2026-11-11). Every number on /affiliates is rendered from here, the
// same way plan prices come from ./pricing.
import type { Plan } from "./pricing";

export const AFFILIATE_COMMISSION_PCT = 30;
export const AFFILIATE_COMMISSION_LABEL = `${AFFILIATE_COMMISSION_PCT}%`;

/** Sign-ups within this many days of clicking an affiliate's link are credited (FirstPromoter cookie life). */
export const AFFILIATE_COOKIE_DAYS = 60;

/**
 * The FirstPromoter sign-up page for new affiliates (owner, 2026-11-11). If it
 * is ever set to null, join buttons read "Ask to join" and go to the contact page.
 */
export const AFFILIATE_JOIN_URL: string | null = "https://revsplitpay.firstpromoter.com/signup";

// Range of the earnings calculator on /affiliates.
export const MIN_REFERRED_TEAMS = 1;
export const MAX_REFERRED_TEAMS = 25;

/** Whole number of teams inside the calculator's range; anything unusable becomes the minimum. */
export const clampTeams = (teams: number) =>
  Number.isFinite(teams) ? Math.min(MAX_REFERRED_TEAMS, Math.max(MIN_REFERRED_TEAMS, Math.round(teams))) : MIN_REFERRED_TEAMS;

/** Commission on one team paying the plan's monthly price, in cents. */
export const commissionCents = (plan: Plan) => Math.round((plan.priceUsd * 100 * AFFILIATE_COMMISSION_PCT) / 100);

/** Monthly commission for a number of referred teams on one plan, in cents. */
export const monthlyCommissionCents = (plan: Plan, teams: number) => commissionCents(plan) * clampTeams(teams);
