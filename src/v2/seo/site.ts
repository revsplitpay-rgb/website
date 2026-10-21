import { CONTACT_EMAIL, SITE_URL } from "@/lib/links";
import { V2_BASE } from "../lib/paths";

/** True only if the site is served under a preview prefix again (pages go noindex). */
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
  // TODO(owner): official profile URLs (LinkedIn, X, YouTube...) for sameAs.
  sameAs: [] as string[],
};
