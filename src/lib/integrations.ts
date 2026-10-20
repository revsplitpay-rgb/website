// Source: product.md sections 5.4, 5.8 and 7. Only integrations that exist today.
import { BANK_TRANSFER_FEE_LABEL, BANK_TRANSFER_FEE_MAX_USD, formatUsd } from "./pricing";

export type IntegrationSlug = "stripe" | "whop" | "slack" | "webhooks";

export interface Integration {
  slug: IntegrationSlug;
  name: string;
  kind: "Payment provider" | "Notifications" | "Developer";
  summary: string;
  overview: string;
  needs?: string;
  points: string[];
  setup: string[];
}

export const INTEGRATIONS: Integration[] = [
  {
    slug: "stripe",
    name: "Stripe",
    kind: "Payment provider",
    summary: "Take card payments and pay every team member to their own Stripe account.",
    overview:
      "Customers pay by card through Stripe. The business and each team member connect their own Stripe account, so every commission moves from the business to the person who earned it. RevSplitPay never stores card details.",
    needs:
      "A Stripe account for the business, and one for each team member in a supported country: the US, the UK, the EU/EEA, Canada or Switzerland.",
    points: [
      "Customers pay by card on your checkout links",
      "Each team member is paid to their own Stripe account",
      `Invoices can be paid by card or by bank transfer (${BANK_TRANSFER_FEE_LABEL}, at most ${formatUsd(BANK_TRANSFER_FEE_MAX_USD)})`,
    ],
    setup: [
      "Connect your business Stripe account when you create your workspace.",
      "Invite your team; each member connects their own Stripe account.",
      "Create a checkout link and send it to your customer.",
    ],
  },
  {
    slug: "whop",
    name: "Whop",
    kind: "Payment provider",
    summary: "For businesses that already sell through Whop. Payments and payouts run through Whop.",
    overview:
      "If you already sell through Whop, choose Whop as your payment provider. Customer payments and team payouts run through Whop, and RevSplitPay works out and records every split.",
    needs: "A Whop account for the business, and a Whop payout account for each team member.",
    points: [
      "Payments and payouts run through Whop",
      "Each team member connects their own Whop account to get paid",
      "Invoices can be paid from your Whop balance",
      "Card details are handled entirely by Whop",
    ],
    setup: [
      "Choose Whop when you create your workspace and connect your account.",
      "Invite your team; each member connects their Whop payout account.",
      "Create a checkout link and send it to your customer.",
    ],
  },
  {
    slug: "slack",
    name: "Slack",
    kind: "Notifications",
    summary: "Post sales and payment events to your Slack channels.",
    overview:
      "Send new sales and payment events to the Slack channels your team already watches, so wins and failed payments are seen as they happen.",
    points: [
      "Post sales and payment events to chosen channels",
      "Keep the whole team in the loop without logging in",
    ],
    setup: ["Open Integrations in your workspace.", "Connect Slack and choose the channels to post to."],
  },
  {
    slug: "webhooks",
    name: "Webhooks",
    kind: "Developer",
    summary: "Send events like deal closed or invoice paid to your own tools.",
    overview:
      "Custom webhooks send RevSplitPay events, such as a deal closing or an invoice being paid, to any URL you control, so you can update your CRM or internal tools automatically.",
    points: ["Events such as deal closed and invoice paid", "Send to any URL you control"],
    setup: ["Open Integrations in your workspace.", "Add your endpoint URL and choose the events to send."],
  },
];

export const findIntegration = (slug: string | undefined) => INTEGRATIONS.find((item) => item.slug === slug);
