import { describe, expect, it } from "vitest";
import {
  BANK_TRANSFER_FEE_BP,
  BANK_TRANSFER_FEE_MAX_USD,
  COMMISSION_FEE_BP,
  COMMISSION_FEE_LABEL,
  EXTRA_MEMBER_USD,
  HOLD_DAYS,
  INVOICE_FEE_BP,
  INVOICE_FEE_LABEL,
  PLANS,
  USAGE_WARNING_PCTS,
  WELCOME_OFFER,
  recommendPlan,
  welcomeOfferLine,
} from "./pricing";

// These numbers come from product.md section 8. If this test fails after a
// pricing change, update product.md and the app first, then this file.
describe("pricing matches product.md", () => {
  it("has the three plans with their prices, limits and seats", () => {
    expect(PLANS.map((p) => [p.id, p.priceUsd, p.salesLimitUsd, p.includedMembers])).toEqual([
      ["starter", 97, 100_000, 5],
      ["growth", 299, 500_000, 25],
      ["scale", 997, 2_000_000, 75],
    ]);
  });

  it("has the fees, extras and labels", () => {
    expect(EXTRA_MEMBER_USD).toBe(25);
    expect(COMMISSION_FEE_BP).toBe(290);
    expect(INVOICE_FEE_BP).toBe(50);
    expect(BANK_TRANSFER_FEE_BP).toBe(80);
    expect(BANK_TRANSFER_FEE_MAX_USD).toBe(5);
    expect(HOLD_DAYS).toBe(7);
    expect(USAGE_WARNING_PCTS).toEqual([80, 90]);
    expect(COMMISSION_FEE_LABEL).toBe("2.9%");
    expect(INVOICE_FEE_LABEL).toBe("0.5%");
  });

  it("marks only Growth as most popular", () => {
    expect(PLANS.filter((p) => p.badge).map((p) => p.id)).toEqual(["growth"]);
  });

  it("states the welcome offer exactly", () => {
    expect(WELCOME_OFFER).toEqual({ code: "WELCOME50", percentOff: 50, appliesTo: "your first month" });
    expect(welcomeOfferLine()).toBe("50% off your first month with WELCOME50");
  });
});

describe("recommendPlan", () => {
  it("picks Growth when its included seats beat Starter plus extras", () => {
    expect(recommendPlan(50_000, 20)).toEqual({ kind: "plan", planId: "growth", monthlyTotalUsd: 299, savingsUsd: 173 });
  });

  it("picks Scale for a large team on low sales", () => {
    expect(recommendPlan(50_000, 80)).toEqual({ kind: "plan", planId: "scale", monthlyTotalUsd: 1122, savingsUsd: 850 });
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
    expect(recommendPlan(10_000, 6.9)).toEqual({ kind: "plan", planId: "starter", monthlyTotalUsd: 122, savingsUsd: null });
    expect(recommendPlan(10_000, -3)).toEqual({ kind: "plan", planId: "starter", monthlyTotalUsd: 97, savingsUsd: null });
  });
});
