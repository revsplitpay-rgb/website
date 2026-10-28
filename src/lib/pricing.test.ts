import { describe, expect, it } from "vitest";
import {
  BANK_TRANSFER_FEE_BP,
  BANK_TRANSFER_FEE_MAX_USD,
  COMMISSION_FEE_BP,
  COMMISSION_FEE_LABEL,
  EXTRA_MEMBER_USD,
  EXTRA_MEMBER_YEARLY_USD,
  HOLD_DAYS,
  PLANS,
  PLAN_FEATURES,
  TRIAL_DAYS,
  USAGE_WARNING_PCTS,
  YEARLY_DISCOUNT_PCT,
  formatUsdCents,
  planMultipleLine,
  recommendPlan,
  yearlyMonthlyUsd,
  yearlySavingsUsd,
} from "./pricing";

// These numbers come from product.md section 8. If this test fails after a
// pricing change, update product.md and the app first, then this file.
describe("pricing matches product.md", () => {
  it("has the three plans with their prices, limits and seats", () => {
    expect(PLANS.map((p) => [p.id, p.priceUsd, p.salesLimitUsd, p.includedMembers])).toEqual([
      ["starter", 97, 100_000, 5],
      ["growth", 299, 500_000, 20],
      ["scale", 997, 2_000_000, 50],
    ]);
  });

  it("has the fees, extras and labels", () => {
    expect(EXTRA_MEMBER_USD).toBe(20);
    expect(EXTRA_MEMBER_YEARLY_USD).toBe(192);
    expect(COMMISSION_FEE_BP).toBe(290);
    expect(BANK_TRANSFER_FEE_BP).toBe(80);
    expect(BANK_TRANSFER_FEE_MAX_USD).toBe(5);
    expect(HOLD_DAYS).toBe(7);
    expect(USAGE_WARNING_PCTS).toEqual([80, 90]);
    expect(COMMISSION_FEE_LABEL).toBe("2.9%");
  });

  it("describes each step up from the plan below", () => {
    expect(planMultipleLine(PLANS[1], PLANS[0])).toBe("5x the sales and 4x the team of Starter");
    expect(planMultipleLine(PLANS[2], PLANS[1])).toBe("4x the sales and 2.5x the team of Growth");
  });

  it("puts custom branding on Scale only", () => {
    expect(PLAN_FEATURES.find((row) => row.label === "Your logo and colours in the dashboard")?.plans).toEqual({ starter: false, growth: false, scale: true });
  });

  it("marks only Growth as most popular", () => {
    expect(PLANS.filter((p) => p.badge).map((p) => p.id)).toEqual(["growth"]);
  });

  it("has the free trial and the yearly prices", () => {
    expect(TRIAL_DAYS).toBe(14);
    expect(YEARLY_DISCOUNT_PCT).toBe(20);
    expect(PLANS.map((p) => [p.id, p.yearlyPriceUsd])).toEqual([
      ["starter", 930],
      ["growth", 2_870],
      ["scale", 9_570],
    ]);
  });

  it("prices each year at the discount, rounded down to the $10", () => {
    for (const plan of PLANS) {
      const discounted = (plan.priceUsd * 12 * (100 - YEARLY_DISCOUNT_PCT)) / 100;
      expect(plan.yearlyPriceUsd).toBe(Math.floor(discounted / 10) * 10);
    }
  });

  it("shows yearly prices per month with cents", () => {
    expect(PLANS.map((p) => formatUsdCents(yearlyMonthlyUsd(p)))).toEqual(["$77.50", "$239.17", "$797.50"]);
    expect(PLANS.map(yearlySavingsUsd)).toEqual([234, 718, 2_394]);
    expect(formatUsdCents(299)).toBe("$299");
  });
});

describe("recommendPlan", () => {
  it("picks Growth when its included seats beat Starter plus extras", () => {
    expect(recommendPlan(50_000, 20)).toEqual({ kind: "plan", planId: "growth", monthlyTotalUsd: 299, savingsUsd: 98 });
  });

  it("keeps a large team on low sales on Growth with extra seats, not Scale", () => {
    expect(recommendPlan(50_000, 80)).toEqual({ kind: "plan", planId: "growth", monthlyTotalUsd: 1499, savingsUsd: 98 });
  });

  it("picks Scale when sales need it", () => {
    expect(recommendPlan(600_000, 10)).toEqual({ kind: "plan", planId: "scale", monthlyTotalUsd: 997, savingsUsd: null });
  });

  it("returns Starter with no savings for zero members", () => {
    expect(recommendPlan(10_000, 0)).toEqual({ kind: "plan", planId: "starter", monthlyTotalUsd: 97, savingsUsd: null });
  });

  it.each([
    [100_000, "starter"],
    [100_001, "growth"],
    [500_000, "growth"],
    [500_001, "scale"],
    [2_000_000, "scale"],
  ])("sales of %i fit %s", (sales, planId) => {
    const result = recommendPlan(sales, 0);
    expect(result.kind === "plan" && result.planId).toBe(planId);
  });

  it("returns enterprise above $2M", () => {
    expect(recommendPlan(2_000_001, 5)).toEqual({ kind: "enterprise" });
  });

  it("rounds fractional and clamps negative member counts", () => {
    expect(recommendPlan(10_000, 6.9)).toEqual({ kind: "plan", planId: "starter", monthlyTotalUsd: 117, savingsUsd: null });
    expect(recommendPlan(10_000, -3)).toEqual({ kind: "plan", planId: "starter", monthlyTotalUsd: 97, savingsUsd: null });
  });
});
