import { describe, expect, it } from "vitest";
import {
  AFFILIATE_COMMISSION_PCT,
  AFFILIATE_COOKIE_DAYS,
  MAX_REFERRED_TEAMS,
  MIN_REFERRED_TEAMS,
  clampTeams,
  commissionCents,
  monthlyCommissionCents,
} from "./affiliate";
import { PLANS } from "./pricing";

// These numbers come from the FirstPromoter campaign settings (owner,
// 2026-11-11). Change them there first, then here.
describe("affiliate program terms", () => {
  it("pays 30% with a 60-day referral window", () => {
    expect(AFFILIATE_COMMISSION_PCT).toBe(30);
    expect(AFFILIATE_COOKIE_DAYS).toBe(60);
  });
});

describe("commission maths", () => {
  const plan = (id: string) => PLANS.find((p) => p.id === id)!;

  it("is 30% of each plan's monthly price, in cents", () => {
    expect(PLANS.map((p) => [p.id, commissionCents(p)])).toEqual([
      ["starter", 2_910],
      ["growth", 8_970],
      ["scale", 29_910],
    ]);
  });

  it.each([
    ["growth", 5, 44_850],
    ["growth", 1, 8_970],
    ["scale", 25, 747_750],
    ["starter", 3, 8_730],
  ])("%s x %i teams = %i cents a month", (id, teams, cents) => {
    expect(monthlyCommissionCents(plan(id), teams)).toBe(cents);
  });

  it.each([
    [0, MIN_REFERRED_TEAMS],
    [-4, MIN_REFERRED_TEAMS],
    [26, MAX_REFERRED_TEAMS],
    [Number.NaN, MIN_REFERRED_TEAMS],
    [4.6, 5],
  ])("clamps %d teams to %i", (teams, expected) => {
    expect(clampTeams(teams)).toBe(expected);
  });
});
