import { WHOP_LIVE } from "@/lib/links";

// Every mention of the payment providers in v2 copy comes from here, so a
// change to Whop availability is one flag (WHOP_LIVE in src/lib/links.ts).
export const whopAvailable = () => WHOP_LIVE;

/** "Stripe or Whop" while Whop is live, otherwise "Stripe". */
export const providerPhrase = () => (WHOP_LIVE ? "Stripe or Whop" : "Stripe");

export const providersBadge = () => `Runs on ${providerPhrase()}`;

export const providersAnswer = () =>
  WHOP_LIVE ? "Stripe and Whop. Each business uses one." : "Stripe.";

export const providerAccountNode = () => `Your ${providerPhrase()} account`;

export const whopBalanceLine = () => (WHOP_LIVE ? "or from your Whop balance" : null);

export const railsLine = () =>
  WHOP_LIVE ? "Works with Stripe, Whop, Slack and webhooks." : "Works with Stripe, Slack and webhooks.";

export const holdsMoneyAnswer = () =>
  `No. Payments go through ${providerPhrase()} to the business, and each person's share is paid out to their own account. RevSplitPay is not a bank.`;

export const trustProviderLine = () =>
  WHOP_LIVE
    ? "Payments, card security and payouts run on Stripe and Whop."
    : "Payments, card security and payouts run on Stripe.";
