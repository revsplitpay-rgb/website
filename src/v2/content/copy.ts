// v2 site copy. Product facts come from product.md; every number is rendered
// from src/lib/pricing.ts so prices and fees can never drift between pages.
import {
  COMMISSION_FEE_LABEL,
  ENTERPRISE_THRESHOLD_LABEL,
  EXTRA_MEMBER_USD,
  EXTRA_MEMBER_YEARLY_USD,
  HOLD_DAYS,
  PLANS,
  STARTING_PRICE_USD,
  TRIAL_DAYS,
  USAGE_WARNING_PCTS,
  YEARLY_DISCOUNT_PCT,
  formatUsd,
} from "@/lib/pricing";
import { holdsMoneyAnswer, providerPhrase, providersAnswer, trustProviderLine, whopBalanceLine } from "./providers";

const starting = formatUsd(STARTING_PRICE_USD);
const seat = formatUsd(EXTRA_MEMBER_USD);
const seatYearly = formatUsd(EXTRA_MEMBER_YEARLY_USD);
const counts = PLANS.map((plan) => String(plan.includedMembers));
const seatCounts = `${counts.slice(0, -1).join(", ")} or ${counts[counts.length - 1]}`;
const [warnLow, warnHigh] = USAGE_WARNING_PCTS;
const growth = PLANS.find((plan) => plan.id === "growth") ?? PLANS[0];

export const priceLine = () => `From ${starting} a month · Cancel any time`;

export const trialLine = () => `${TRIAL_DAYS}-day free trial`;

// The free trial (product_updates.md, section 2).
export const trial = {
  title: `Try any plan free for ${TRIAL_DAYS} days.`,
  promise: "We never charge without asking.",
  points: [
    { title: "A card to start", text: "A card is needed to start your trial, and it's saved so your plan can start in one click." },
    { title: "Nothing charged until you say so", text: "When the trial ends, nothing is charged unless you click Start plan." },
    { title: "Start early, keep your free days", text: "Start your plan during the trial and your first charge is on the day the trial would have ended." },
    { title: "Your data stays safe", text: "If you don't start, nothing is charged. New activity pauses, and your data and your team's earnings stay safe until you choose a plan." },
  ],
  footnote: "One free trial per card. Your dashboard shows how many trial days are left at the top of every page.",
};

// Custom branding on Scale (product_updates.md, section 3).
export const branding = {
  title: "Your brand, your dashboard.",
  support: "On Scale, your team works in a dashboard with your logo and your colours, not ours.",
};

export const home = {
  title: "RevSplitPay | One payment in, everyone paid out",
  description: `Your customer pays once, and every closer, setter, partner and manager is paid their exact share automatically. Runs on ${providerPhrase()}.`,
  heroTitle: "One payment in, everyone paid out.",
  heroSupport:
    "Your customer pays once, and every closer, setter, partner and manager is paid their exact share automatically.",
  problemTitle: "The end of commission spreadsheets.",
  problemSupport: "What paying a team by hand looks like, and what changes.",
  howTitle: "From checkout link to payout.",
  howSupport: `Your customer pays your ${providerPhrase()} account. RevSplitPay works out every share and pays each person after the ${HOLD_DAYS}-day safety hold.`,
  productTitle: "Everything between a sale and a paid team.",
  productSupport: "Checkout links, automatic splits, payouts, invoices and rewards in one place.",
  pricingTitle: "Plans that grow with your team.",
  pricingSupport: `From ${starting} a month, or save ${YEARLY_DISCOUNT_PCT}% yearly. Every plan starts with a ${TRIAL_DAYS}-day free trial.`,
  trustTitle: "Your money stays where it should.",
  trustSupport: `Payments run on ${providerPhrase()}. RevSplitPay never stores card details.`,
  faqTitle: "Questions owners ask first.",
  ctaTitle: "Get paid. Get your team paid. Automatically.",
};

export const problemRows = [
  ["Commissions tracked in spreadsheets, prone to mistakes", "Every split is calculated automatically from the sale"],
  ["Reps wait days or weeks to be paid by hand", "Payouts go automatically to each person's own account"],
  ["“Who closed this deal?” arguments", "Each deal records exactly who worked it and their share"],
  ["Refunds and chargebacks wreck the commission records", "Refunds are handled and commissions adjusted automatically"],
  ["Failed instalments and subscriptions go unnoticed", "Failed payments are flagged, retried, and the customer is sent a link to pay"],
  ["No visibility for reps", "Every rep sees their deals, earnings and payout dates"],
  ["Motivating a team takes manual effort", "Awards, automatic bonuses, badges, tiers and a leaderboard"],
] as const;

export const steps = [
  { title: "Create your workspace", text: `Choose a plan and connect your payment account on ${providerPhrase()}.` },
  { title: "Invite your team", text: "Give each person a role and their commission share. Each member connects their own payout account." },
  { title: "Create a checkout link", text: "Pick a product, the price and how the customer pays, and add who worked the deal." },
  { title: "Your customer pays", text: `The payment goes to your business through ${providerPhrase()}.` },
  { title: "Everyone gets their share", text: `RevSplitPay records the sale and works out each commission. After a ${HOLD_DAYS}-day safety hold, it pays each person automatically.` },
  { title: "Track everything", text: "Owners see sales, deals, payouts and team performance. Reps see their own deals, earnings and upcoming payouts." },
];

export const productRows = [
  {
    id: "commissions",
    title: "Commissions split themselves",
    text: "Every sale splits between the closer, setter, partner and manager on the deal, at each person's own rate. Managers can earn an override, and partners can earn a share of every sale.",
  },
  {
    id: "payouts",
    title: `Payouts after a ${HOLD_DAYS}-day hold`,
    text: `Commissions wait ${HOLD_DAYS} days so refunds and chargebacks are handled cleanly, then go straight to each person's own account. Every rep sees each commission and its payout date.`,
    example: "payouts" as const,
  },
  {
    id: "payment-types",
    title: "Every way your customers pay",
    text: "One-time payments, subscriptions from weekly to annual, equal instalments and custom payment plans. Every renewal and instalment pays the team again.",
  },
  {
    id: "recovery",
    title: "Refunds and failed payments, handled",
    text: "Refund a sale and the commissions adjust. Failed renewals and instalments are flagged and retried, and payment-plan customers get a link to pay.",
  },
  {
    id: "invoices",
    title: "Invoices from your team",
    text: `Team members invoice you for extra work or an agreed bonus. You approve and pay in one click by card, bank transfer ${whopBalanceLine() ?? ""}`.trim() + ". RevSplitPay adds no fee.",
  },
  {
    id: "rewards",
    title: "Rewards that run themselves",
    text: "Give badges and cash awards, set automatic bonuses for hitting goals, and let reps climb tiers from Bronze to Legendary on a leaderboard that updates itself.",
    example: "leaderboard" as const,
  },
];

export const trustPoints = [
  { title: "No card data stored", text: `Card details are handled entirely by ${providerPhrase()}. ${trustProviderLine()}` },
  { title: "Splits can't be rewritten", text: "Every split is recorded at the time of sale, giving a clear audit trail for every dollar." },
  { title: "No surprise charges", text: "The price is shown before every upgrade, and a plan change never charges without confirmation." },
  { title: "Money in motion keeps moving", text: "Even if a workspace is paused, existing payments, commissions and payouts continue, and pausing never deletes data." },
  { title: "Secure accounts", text: "Sign-in is handled by a dedicated authentication provider, and each role only sees what it should." },
];

export type FaqGroup = "payouts" | "billing" | "providers";

export const faqs: { group: FaqGroup; q: string; a: string }[] = [
  { group: "payouts", q: "Do my reps need to do anything to get paid?", a: `They connect their own ${providerPhrase()} payout account once. After that, every commission is paid to them automatically.` },
  { group: "payouts", q: "When do reps get paid?", a: `${HOLD_DAYS} days after the customer's payment clears, to protect against refunds. Early pay can be arranged on request.` },
  { group: "payouts", q: "What happens if a customer refunds?", a: "Refund from RevSplitPay and the commissions are adjusted automatically." },
  { group: "payouts", q: "What if a customer's card fails on an instalment or renewal?", a: "The deal is flagged and the payment is retried automatically. For payment plans, the customer is emailed a link to pay." },
  { group: "payouts", q: `Who pays the ${COMMISSION_FEE_LABEL} fee?`, a: "It comes out of each team member's commission when it's paid out. Your own share has no RevSplitPay fee." },
  { group: "billing", q: "Can I sell subscriptions and payment plans?", a: "Yes: recurring subscriptions from weekly to annual, equal instalments, and fully custom payment plans with your own amounts and dates." },
  { group: "billing", q: "Do I pay per team member?", a: `Each plan includes a number of team members (${seatCounts}). Extra members are ${seat} a month each, or ${seatYearly} a year on yearly billing. You never count as one.` },
  { group: "billing", q: "What happens if we sell more than our plan's limit?", a: `You're warned at ${warnLow}% and ${warnHigh}%. At the limit on Starter or Growth, new deals pause until you upgrade. Nothing already earned or in motion stops. Scale never pauses.` },
  { group: "billing", q: "Can I change or cancel my plan?", a: "Yes, any time from Billing. Upgrades are instant; downgrades apply at your next bill. Cancelling keeps everything working until the end of the period you paid for." },
  { group: "billing", q: "Can I pay yearly?", a: `Yes. Paying yearly saves ${YEARLY_DISCOUNT_PCT}% on any plan: Growth is ${formatUsd(growth.yearlyPriceUsd)} a year instead of ${formatUsd(growth.priceUsd * 12)} paid monthly. Your sales limit stays monthly.` },
  { group: "billing", q: "Is there a free trial?", a: `Yes. Every plan starts with ${TRIAL_DAYS} days free. A card is needed to start, but nothing is charged unless you click Start plan. Start early and you keep your free days.` },
  { group: "providers", q: "Does RevSplitPay hold our money?", a: holdsMoneyAnswer() },
  { group: "providers", q: "Which payment providers do you support?", a: providersAnswer() },
];

export const roles = [
  { role: "Owner", text: "Everything: products, checkout links, sales, deals, team, commissions, invoices, awards, billing and integrations. Does not earn commissions." },
  { role: "Admin", text: "Helps run the business: sales, deals, the whole team's payouts, invoices, team management and billing (view only). Can also earn commissions." },
  { role: "Sales Manager", text: "Manages their team: products, sales, deals, team management, awards and their own payouts, including override commission." },
  { role: "Closer", text: "Creates checkout links and closes deals; sees their deals, payouts, invoices, awards, achievements and public profile." },
  { role: "Setter", text: "Books the calls; sees the deals they set, their payouts, invoices, awards and achievements." },
  { role: "Partner", text: "Earns a share of sales, per deal or business-wide; sees their deals, payouts, invoices and awards." },
  { role: "Staff", text: "Support team members; see their payouts, invoices and awards." },
  { role: "Viewer", text: "Read-only access for accountants or observers." },
];

export const featureGroups = [
  {
    id: "selling",
    title: "Selling and checkout",
    summary: "Shareable checkout links for every way your customers pay, with every sale tracked as a deal.",
    points: [
      "Products: your offer catalogue, with prices",
      "One-time payments, subscriptions (weekly to annual, optional end date) and equal instalments",
      "Custom payment plans with your own amounts and dates",
      "Deals pipeline with status, customer, product, cycles paid and everyone involved",
      "Sales page: gross sales, paid to the team, pending and net to the business",
      "Verified customer name, email and payment reference on each sale",
      "Refunds adjust commissions automatically",
      "Failed renewals and instalments are flagged, retried and sent a payment link",
    ],
  },
  {
    id: "commissions",
    title: "Commissions",
    summary: "Every sale splits automatically between the people who worked it.",
    points: [
      "Split every sale between closer, setter, partner and manager",
      "Per-person rates set by the owner or a manager",
      "Override commission for sales managers on their team's deals",
      "Business-wide partner share on every sale",
      "Renewals and instalments pay the team again, automatically",
      "Splits recorded at the time of sale; later team changes never rewrite past deals",
    ],
  },
  {
    id: "payouts",
    title: "Payouts",
    summary: `Automatic payouts to each person's own account after a ${HOLD_DAYS}-day safety hold.`,
    points: [
      `Automatic payouts to each member's own ${providerPhrase()} account`,
      `${HOLD_DAYS}-day hold so refunds and chargebacks are handled cleanly`,
      "My Payouts: every commission with its status and payout date",
      "Owner and admin view of what the whole team has earned and been paid",
      "Early pay on request, arranged by the RevSplitPay team",
      "Failed payouts can be retried once the member fixes their account",
    ],
    example: "payouts" as const,
  },
  {
    id: "invoices",
    title: "Invoices",
    summary: "Team members invoice the business for work outside a normal deal.",
    points: [
      "Owners review and approve or reject each request",
      `Pay in one click by card, bank transfer ${whopBalanceLine() ?? ""}`.trim(),
      "No RevSplitPay fee on invoices or paid awards",
      "Invoices appear in the member's payouts and the business records",
    ],
  },
  {
    id: "rewards",
    title: "Rewards and motivation",
    summary: "Awards, automatic bonuses and a leaderboard that keep the team motivated.",
    points: [
      "Badge and cash awards; cash awards come with a payment link",
      "Award rules: automatic bonuses for hitting goals (Growth and Scale)",
      "Commission boosts for reps who hit a goal (Growth and Scale)",
      "Goal tracker for reps (Growth and Scale)",
      "Achievements and badges earned automatically",
      "Performance tiers from Bronze to Legendary, and a team leaderboard",
      "Public rep profile with verified results, rank and badges",
    ],
    example: "leaderboard" as const,
  },
  {
    id: "team",
    title: "Team management",
    summary: "Roles, rates and invites for everyone on the team.",
    points: [
      "Eight roles with the right access for each",
      "Invites and join codes with role and commission already set",
      "Change roles and rates, set override shares, remove members",
    ],
  },
  {
    id: "branding",
    title: "Custom branding",
    badge: "Scale",
    summary: "Make RevSplitPay look like your own, for everyone in your workspace.",
    points: [
      "Your logo at the top of the sidebar, in place of ours",
      "Your brand colour across buttons, links, highlights, charts and the active menu item",
      "Works in light and dark mode: a colour that would be hard to read is adjusted slightly so text stays readable",
      "Your name and logo in the browser tab",
      "Pick one of 8 preset colours or enter your own, upload a logo, and preview it before saving",
      "A small \"Powered by RevSplitPay\" credit stays at the bottom of the sidebar",
    ],
  },
  {
    id: "reporting",
    title: "Visibility and reporting",
    summary: "The numbers each person needs, as they happen.",
    points: [
      "Overview dashboard with the key numbers",
      "In-app alerts for sales, payouts, failed payments, awards and plan notices, plus email for important events",
      "CSV export of your data",
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    summary: "Connect the tools your team already uses.",
    points: [
      "Slack: post sales and payment events to your channels",
      "Custom webhooks: send events like deal closed or invoice paid to your tools",
      `${providerPhrase()} as your payment provider`,
    ],
  },
  {
    id: "onboarding",
    title: "Onboarding and support",
    summary: "Getting every role set up, and help when you need it.",
    points: ["Guided setup checklist for every role", "Support inbox to reach the RevSplitPay team from inside the app"],
  },
];

export const billingPoints = [
  "The owner never counts as a team member.",
  `Every plan starts with ${TRIAL_DAYS} days free. Nothing is charged unless you click Start plan.`,
  `Yearly billing saves ${YEARLY_DISCOUNT_PCT}%, and the sales limit stays monthly. Switch to yearly any time (charged now, with credit for the unused month); switching back to monthly happens at the end of the year.`,
  `An extra team member costs ${seat} a month (${seatYearly} a year on yearly billing), charged when they join. A paid seat stays paid until the next bill, so someone can be replaced at no extra cost.`,
  "Upgrades happen instantly and you pay only the difference for the rest of the month or year. Downgrades take effect at the next bill.",
  "The exact amount is shown before you confirm any change.",
  `Usage warnings arrive at ${warnLow}% and ${warnHigh}% of your plan's monthly sales limit.`,
  "At the limit on Starter and Growth, new deals and links pause until you upgrade. Your team keeps access to everything they've earned, existing links, subscriptions and instalments keep collecting, and payouts keep going out.",
  "You are never moved down a plan automatically.",
  "Discount codes can be applied at signup or later from Billing.",
  "Cancel any time: everything works until the end of the period you paid for, with no final bill.",
  "All prices are in USD, billed monthly or yearly in advance.",
];

export const enterpriseLine = () => `Selling over ${ENTERPRISE_THRESHOLD_LABEL} a month? We'll agree a price with you.`;
