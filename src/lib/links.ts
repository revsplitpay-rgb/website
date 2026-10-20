// Every link to the product app goes through these constants, so a URL change
// is one edit. scripts/check-content.mjs fails if the app URL appears anywhere else.
export const APP_URL = "https://app.revsplitpay.com/";
export const APP_SIGNUP_URL = APP_URL;
export const CONTACT_EMAIL = "revsplitpay@gmail.com";
export const SITE_URL = "https://revsplitpay.com";

// Whop is live for new signups (owner, 2026-10-19). Copy that names payment
// providers reads this flag through src/v2/content/providers.ts.
export const WHOP_LIVE = true;

// Booking link for "Book a call" on the contact page; null hides the button
// until the owner supplies the link.
export const BOOKING_URL: string | null = null;
