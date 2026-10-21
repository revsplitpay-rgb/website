import type { IntegrationSlug } from "@/lib/integrations";
import { whopAvailable } from "./providers";

// Partner marks supplied by the owner (public/logos). Webhooks has no mark.
export interface Logo {
  name: string;
  src: string;
  /** Height in px that visually balances each wordmark. */
  height: number;
}

export const INTEGRATION_LOGOS: Partial<Record<IntegrationSlug, Logo>> = {
  stripe: { name: "Stripe", src: "/logos/stripe.svg", height: 30 },
  whop: { name: "Whop", src: "/logos/whop.svg", height: 22 },
  slack: { name: "Slack", src: "/logos/slack.svg", height: 28 },
};

/** Follows WHOP_LIVE, like every other provider mention. */
export const paymentProviderLogos = (): Logo[] =>
  whopAvailable() ? [INTEGRATION_LOGOS.stripe!, INTEGRATION_LOGOS.whop!] : [INTEGRATION_LOGOS.stripe!];

/**
 * Tools owners connect through custom webhooks (owner, 2026-10-21). These are
 * not native integrations, so copy must always say "through webhooks".
 */
export const WEBHOOK_TOOL_LOGOS: Logo[] = [
  { name: "Zapier", src: "/logos/zapier.svg", height: 26 },
  { name: "n8n", src: "/logos/n8n.svg", height: 24 },
  { name: "WhatsApp", src: "/logos/whatsapp.svg", height: 28 },
];
