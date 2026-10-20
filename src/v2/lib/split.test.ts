import { describe, expect, it } from "vitest";
import { parsePercentInput, parseSaleInput, split } from "./split";

describe("parseSaleInput", () => {
  it.each([
    ["5000", 500_000],
    ["5,000.50", 500_050],
    ["$5,000", 500_000],
    ["0.01", 1],
    ["10000000", 1_000_000_000],
    ["12.5", 1_250],
  ])("parses %s to %i cents", (raw, cents) => {
    expect(parseSaleInput(raw)).toEqual({ ok: true, value: cents });
  });

  it.each([
    ["", "SALE_EMPTY"],
    ["   ", "SALE_EMPTY"],
    ["abc", "SALE_INVALID"],
    ["-5", "SALE_INVALID"],
    ["1.005", "SALE_TOO_MANY_DECIMALS"],
    ["0", "SALE_OUT_OF_RANGE"],
    ["10000000.01", "SALE_OUT_OF_RANGE"],
  ])("rejects %j with %s", (raw, code) => {
    const result = parseSaleInput(raw);
    expect(result.ok).toBe(false);
    expect("error" in result && result.error.code).toBe(code);
  });
});

describe("parsePercentInput", () => {
  it("treats blank as 0 and parses decimals to basis points", () => {
    expect(parsePercentInput("")).toEqual({ ok: true, value: 0 });
    expect(parsePercentInput("10")).toEqual({ ok: true, value: 1_000 });
    expect(parsePercentInput("12.5%")).toEqual({ ok: true, value: 1_250 });
  });

  it("rejects over 100 and more than 2 decimals", () => {
    expect(parsePercentInput("100.01").ok).toBe(false);
    expect(parsePercentInput("10.125").ok).toBe(false);
  });
});

describe("split", () => {
  it("splits a $5,000 sale with a 10% closer and 5% setter", () => {
    const result = split(500_000, [
      { role: "Closer", bp: 1_000 },
      { role: "Setter", bp: 500 },
    ]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.participants.map((p) => [p.commissionCents, p.feeCents, p.netCents])).toEqual([
      [50_000, 1_450, 48_550],
      [25_000, 725, 24_275],
    ]);
    expect(result.value.ownerCents).toBe(425_000);
    expect(result.value.totalFeeCents).toBe(2_175);
  });

  it("rounds half-up to the cent and gives the owner the remainder", () => {
    const result = split(1_005, [{ role: "Closer", bp: 5_000 }]);
    if (!result.ok) throw new Error("expected ok");
    expect(result.value.participants[0].commissionCents).toBe(503);
    expect(result.value.ownerCents).toBe(502);
  });

  it("gives the owner 100% with no participants", () => {
    const result = split(500_000, []);
    if (!result.ok) throw new Error("expected ok");
    expect(result.value.ownerCents).toBe(500_000);
    expect(result.value.totalFeeCents).toBe(0);
  });

  it("allows exactly 100% and rejects anything above", () => {
    expect(split(3, Array.from({ length: 4 }, () => ({ role: "Closer", bp: 2_500 }))).ok).toBe(true);
    const over = split(500_000, [
      { role: "Closer", bp: 6_000 },
      { role: "Setter", bp: 4_001 },
    ]);
    expect(over.ok).toBe(false);
    expect("error" in over && over.error.code).toBe("TEAM_OVER_100");
  });

  it("keeps owner + commissions equal to the sale for random inputs", () => {
    let seed = 42;
    const next = () => (seed = (seed * 1_103_515_245 + 12_345) % 2_147_483_648);
    for (let i = 0; i < 1_000; i++) {
      const saleCents = (next() % 1_000_000_000) + 1;
      let remaining = 10_000;
      const participants = Array.from({ length: next() % 5 }, () => {
        const bp = next() % (remaining + 1);
        remaining -= bp;
        return { role: "Closer", bp };
      });
      const result = split(saleCents, participants);
      if (!result.ok) throw new Error("expected ok");
      const team = result.value.participants.reduce((sum, p) => sum + p.commissionCents, 0);
      expect(result.value.ownerCents + team).toBe(saleCents);
      expect(result.value.ownerCents).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("calculator messages", () => {
  it("uses the agreed copy for each error", () => {
    const message = (raw: string) => {
      const result = parseSaleInput(raw);
      return "error" in result ? result.error.message : null;
    };
    expect(message("")).toBe("Enter the sale amount.");
    expect(message("abc")).toBe("Use numbers only, like 5000 or 5,000.00.");
    expect(message("1.005")).toBe("Use up to 2 decimal places.");
    expect(message("0")).toBe("Enter an amount up to $10,000,000.");
    const over = split(100, [{ role: "Closer", bp: 10_001 }]);
    expect("error" in over && over.error.message).toBe("Team total is over 100%. Lower a percentage.");
  });
});
