import { CONTACT_EMAIL, SITE_URL } from "@/lib/links";
import { V2_BASE } from "../lib/paths";

/** v2 is a noindex preview until it replaces the live site (V2_BASE becomes ""). */
export const IS_PREVIEW = V2_BASE !== "";

/** Final public URL for a site path ("/" gives the bare domain with a slash). */
export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

export const SITE_NAME = "RevSplitPay";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const LOGO_URL = `${SITE_URL}/logo.png`;

/**
 * Facts about the company for structured data. Only what is confirmed today;
 * the owner still has to supply the items marked TODO (see TODOS.md).
 */
export const ORGANIZATION = {
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  email: CONTACT_EMAIL,
  country: "IE",
  // TODO(owner): legal company name, registered address and CRO number.
  // TODO(owner): official profile URLs (LinkedIn, X, YouTube...) for sameAs.
  sameAs: [] as string[],
};
