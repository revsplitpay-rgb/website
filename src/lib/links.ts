// Every link to the product app goes through these constants, so a URL change
// is one edit. scripts/check-content.mjs fails if the app URL appears anywhere else.
export const APP_URL = "https://app.revsplitpay.com/";
// The app's sign-up page. A referral cookie set by FirstPromoter on this site
// carries over, so the link needs no extra parameters.
export const APP_SIGNUP_URL = `${APP_URL}sign-up`;
export const CONTACT_EMAIL = "revsplitpay@gmail.com";
export const SITE_URL = "https://revsplitpay.com";

// Whop is live for new signups (owner, 2026-10-19). Copy that names payment
// providers reads this flag through src/v2/content/providers.ts.
export const WHOP_LIVE = true;

// Booking link for "Book a call" on the contact page; null hides the button
// until the owner supplies the link.
export const BOOKING_URL: string | null = null;
