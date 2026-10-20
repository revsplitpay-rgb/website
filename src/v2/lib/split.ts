import { COMMISSION_FEE_BP } from "@/lib/pricing";

// Commission split math for the public calculator.
// Everything runs in integer cents and basis points so there is no float drift:
//   commission = round-half-up(saleCents * bp / 10000)
//   fee        = round-half-up(commission * 2.9%)   (deducted from that team member)
//   owner      = saleCents - sum(commissions)        (owner absorbs leftover cents, pays no fee)
// Invariant: owner + sum(commissions) === saleCents.

export const MAX_SALE_CENTS = 10_000_000 * 100;
export const MAX_PARTICIPANTS = 4;

export type SplitErrorCode =
  | "SALE_EMPTY"
  | "SALE_INVALID"
  | "SALE_TOO_MANY_DECIMALS"
  | "SALE_OUT_OF_RANGE"
  | "PERCENT_INVALID"
  | "TEAM_OVER_100";

export interface SplitError {
  code: SplitErrorCode;
  message: string;
  field: "sale" | "participants";
}

// `error`/`value` are spelled out on both arms so callers narrow without strictNullChecks.
export type ParseResult<T> = { ok: true; value: T; error?: undefined } | { ok: false; value?: undefined; error: SplitError };

const halfUp = (numerator: number, denominator: number) =>
  Math.floor((numerator * 2 + denominator) / (denominator * 2));

const saleError = (code: SplitErrorCode, message: string): ParseResult<number> => ({
  ok: false,
  error: { code, message, field: "sale" },
});

/** Parses "5000", "5,000.50" or "$5,000" into integer cents. */
export function parseSaleInput(raw: string): ParseResult<number> {
  const text = raw.trim().replace(/^\$/, "").replace(/,/g, "");
  if (text === "") return saleError("SALE_EMPTY", "Enter the sale amount.");
  if (!/^\d+(\.\d*)?$/.test(text)) return saleError("SALE_INVALID", "Use numbers only, like 5000 or 5,000.00.");
  const [whole, fraction = ""] = text.split(".");
  if (fraction.length > 2) return saleError("SALE_TOO_MANY_DECIMALS", "Use up to 2 decimal places.");
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, "0") || "0");
  if (cents <= 0 || cents > MAX_SALE_CENTS) {
    return saleError("SALE_OUT_OF_RANGE", `Enter an amount up to ${formatCents(MAX_SALE_CENTS).replace(/\.00$/, "")}.`);
  }
  return { ok: true, value: cents };
}

/** Parses a percent with up to 2 decimals into basis points (0-10000). Blank counts as 0. */
export function parsePercentInput(raw: string): ParseResult<number> {
  const text = raw.trim().replace(/%$/, "");
  if (text === "") return { ok: true, value: 0 };
  const invalid: ParseResult<number> = {
    ok: false,
    error: { code: "PERCENT_INVALID", message: "Use a number from 0 to 100.", field: "participants" },
  };
  if (!/^\d+(\.\d{0,2})?$/.test(text)) return invalid;
  const [whole, fraction = ""] = text.split(".");
  const bp = Number(whole) * 100 + Number(fraction.padEnd(2, "0") || "0");
  return bp > 10_000 ? invalid : { ok: true, value: bp };
}

export interface ParticipantInput {
  role: string;
  bp: number;
}

export interface ParticipantShare {
  role: string;
  bp: number;
  commissionCents: number;
  feeCents: number;
  netCents: number;
}

export interface SplitResult {
  saleCents: number;
  participants: ParticipantShare[];
  ownerCents: number;
  totalFeeCents: number;
}

export function split(saleCents: number, participants: ParticipantInput[]): ParseResult<SplitResult> {
  const totalBp = participants.reduce((sum, p) => sum + p.bp, 0);
  if (totalBp > 10_000) {
    return {
      ok: false,
      error: { code: "TEAM_OVER_100", message: "Team total is over 100%. Lower a percentage.", field: "participants" },
    };
  }
  const shares = participants.map((p) => {
    const commissionCents = halfUp(saleCents * p.bp, 10_000);
    const feeCents = halfUp(commissionCents * COMMISSION_FEE_BP, 10_000);
    return { role: p.role, bp: p.bp, commissionCents, feeCents, netCents: commissionCents - feeCents };
  });
  const teamCents = shares.reduce((sum, s) => sum + s.commissionCents, 0);
  return {
    ok: true,
    value: {
      saleCents,
      participants: shares,
      ownerCents: saleCents - teamCents,
      totalFeeCents: shares.reduce((sum, s) => sum + s.feeCents, 0),
    },
  };
}

export const formatCents = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
