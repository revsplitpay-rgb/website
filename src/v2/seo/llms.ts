import { INTEGRATIONS } from "@/lib/integrations";
import { APP_URL, CONTACT_EMAIL } from "@/lib/links";
import {
  COMMISSION_FEE_LABEL,
  ENTERPRISE_THRESHOLD_LABEL,
  EXTRA_MEMBER_USD,
  EXTRA_MEMBER_YEARLY_USD,
  HOLD_DAYS,
  PLANS,
  PLAN_FEATURES,
  TRIAL_DAYS,
  YEARLY_DISCOUNT_PCT,
  formatUsd,
} from "@/lib/pricing";
import { billingPoints, faqs, featureGroups, home, roles, steps, trial } from "../content/copy";
import { holdsMoneyAnswer, providerPhrase } from "../content/providers";
import { absoluteUrl } from "./site";

// llms.txt (https://llmstxt.org): a plain-Markdown map of the site for AI
// assistants and answer engines. Built from the same content files as the
// pages, so answers quoted from it match the site exactly.

const pages: { title: string; path: string; note: string }[] = [
  { title: "Home", path: "/", note: "What RevSplitPay does and how money moves" },
  { title: "Pricing", path: "/pricing", note: "Plans, fees, limits and billing rules" },
  { title: "Features", path: "/features", note: "Every feature, grouped, with the eight team roles" },
  { title: "Integrations", path: "/integrations", note: `${providerPhrase()}, Slack and webhooks` },
  { title: "About", path: "/about", note: "Who it is for and company facts" },
  { title: "Contact", path: "/contact", note: "How to reach the team" },
];

const summary = () =>
  `${home.heroSupport} RevSplitPay is a payment and commission platform for high-ticket sales teams (coaching, consulting, courses, agencies). Payments run on ${providerPhrase()}; RevSplitPay never holds the money.`;

const planLine = (plan: (typeof PLANS)[number]) =>
  `- **${plan.name}**: ${formatUsd(plan.priceUsd)}/month, or ${formatUsd(plan.yearlyPriceUsd)}/year. Up to ${plan.salesLimitLabel} in sales a month, ${plan.includedMembers} team members included, then ${formatUsd(EXTRA_MEMBER_USD)}/month (${formatUsd(EXTRA_MEMBER_YEARLY_USD)}/year on yearly billing) per extra member. Support replies: ${plan.supportReplies}.${plan.badge ? ` (${plan.badge})` : ""}`;

export const buildLlmsTxt = () =>
  [
    "# RevSplitPay",
    "",
    `> ${summary()}`,
    "",
    `Plans start at ${formatUsd(PLANS[0].priceUsd)}/month. A ${COMMISSION_FEE_LABEL} fee is taken from each team member's commission payout; the owner's own share has no fee. Commissions are paid after a ${HOLD_DAYS}-day safety hold. Every plan starts with a ${TRIAL_DAYS}-day free trial, never charged without the owner clicking Start plan, and paying yearly saves ${YEARLY_DISCOUNT_PCT}%.`,
    "",
    "## Pages",
    "",
    ...pages.map((page) => `- [${page.title}](${absoluteUrl(page.path)}): ${page.note}`),
    ...INTEGRATIONS.map((item) => `- [${item.name} integration](${absoluteUrl(`/integrations/${item.slug}`)}): ${item.summary}`),
    "",
    "## Optional",
    "",
    `- [Full details for AI assistants](${absoluteUrl("/llms-full.txt")}): product, pricing, fees, roles, billing rules and FAQ in one file`,
    "",
  ].join("\n");

export const buildLlmsFullTxt = () =>
  [
    "# RevSplitPay: full product facts",
    "",
    `> ${summary()}`,
    "",
    "## How money moves",
    "",
    ...steps.map((step, index) => `${index + 1}. **${step.title}.** ${step.text}`),
    "",
    holdsMoneyAnswer(),
    "",
    "## Plans and pricing (USD, billed monthly or yearly in advance)",
    "",
    ...PLANS.map(planLine),
    `- **Enterprise**: for teams selling over ${ENTERPRISE_THRESHOLD_LABEL} a month; pricing agreed directly.`,
    "",
    "### What changes between plans",
    "",
    ...PLAN_FEATURES.map((row) => `- ${row.label}: ${PLANS.filter((plan) => row.plans[plan.id]).map((plan) => plan.name).join(", ")}`),
    "",
    "### Fees",
    "",
    `- ${COMMISSION_FEE_LABEL} of each commission paid to a team member, deducted from that member's payout. The owner pays no fee on their own share.`,
    "- No RevSplitPay fee on invoices from team members or on paid awards.",
    `- Payment provider processing fees (${providerPhrase()}) are separate.`,
    "",
    "### Free trial and yearly billing",
    "",
    `- ${trial.title} ${trial.promise}`,
    ...trial.points.map((point) => `- ${point.title}: ${point.text}`),
    `- ${trial.footnote}`,
    `- Paying yearly saves ${YEARLY_DISCOUNT_PCT}% compared with twelve monthly payments. The sales limit stays monthly.`,
    "",
    "### Billing rules",
    "",
    ...billingPoints.map((point) => `- ${point}`),
    "",
    "## Features",
    "",
    ...featureGroups.flatMap((group) => [`### ${group.title}`, "", group.summary, "", ...group.points.map((point) => `- ${point}`), ""]),
    "## Team roles",
    "",
    ...roles.map((item) => `- **${item.role}**: ${item.text}`),
    "",
    "## Integrations",
    "",
    ...INTEGRATIONS.flatMap((item) => [`### ${item.name} (${item.kind})`, "", item.overview, ...(item.needs ? ["", `Needs: ${item.needs}`] : []), ""]),
    "## Frequently asked questions",
    "",
    ...faqs.flatMap((item) => [`### ${item.q}`, "", item.a, ""]),
    "## Company",
    "",
    `- Website: ${absoluteUrl("/")}`,
    `- Web app: ${APP_URL}`,
    "- Registered in Ireland. Prices in USD.",
    `- Contact: ${CONTACT_EMAIL}`,
    "",
  ].join("\n");
