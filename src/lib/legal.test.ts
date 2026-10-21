import { describe, expect, it } from "vitest";
import { LEGAL_DOCS, legalToc, legalUpdated, parseLegal } from "./legal";

describe("legal markdown parser", () => {
  it("reads every document's title, date and section list", () => {
    expect(LEGAL_DOCS.terms.title).toBe("Terms and Conditions");
    expect(LEGAL_DOCS.privacy.title).toBe("Privacy Policy");
    expect(LEGAL_DOCS.cookies.title).toBe("Cookie Policy");
    expect(legalUpdated(LEGAL_DOCS.terms)).toBe("October 21, 2026");
    expect(legalToc(LEGAL_DOCS.terms)).toHaveLength(21);
    expect(legalToc(LEGAL_DOCS.privacy)).toHaveLength(15);
  });

  it("names the company without placeholders", () => {
    for (const doc of Object.values(LEGAL_DOCS)) {
      const text = JSON.stringify(doc.blocks);
      expect(text).toContain("RevSplitPay Limited");
      expect(text).not.toMatch(/\[(Legal company name|number|registered address)\]/);
    }
  });

  it("nests sub-lists and keeps indented paragraphs inside the list item", () => {
    const doc = parseLegal("privacy", "- **A:** first\n  - one\n  - two\n- **B:** second\n\n  Extra note.\n\nAfter.");
    const list = doc.blocks[0];
    expect(list.type).toBe("ul");
    if (list.type !== "ul") return;
    expect(list.items).toHaveLength(2);
    expect(list.items[0].children.map((c) => c.text)).toEqual(["one", "two"]);
    expect(list.items[1].paras).toEqual(["Extra note."]);
    expect(doc.blocks[1]).toEqual({ type: "p", lines: ["After."] });
  });

  it("parses tables and skips the separator row", () => {
    const doc = parseLegal("cookies", "| Name | Purpose |\n|---|---|\n| `theme` | Remembers your theme |");
    expect(doc.blocks[0]).toEqual({ type: "table", head: ["Name", "Purpose"], rows: [["`theme`", "Remembers your theme"]] });
  });
});

describe("legal text stays in step with pricing", () => {
  it("states the current fees, seat price and payout hold", async () => {
    const { COMMISSION_FEE_LABEL, INVOICE_FEE_LABEL, EXTRA_MEMBER_USD, HOLD_DAYS, USAGE_WARNING_PCTS } = await import("./pricing");
    const terms = JSON.stringify(LEGAL_DOCS.terms.blocks);
    expect(terms).toContain(`currently **${COMMISSION_FEE_LABEL}**`);
    expect(terms).toContain(`currently **${INVOICE_FEE_LABEL}**`);
    expect(terms).toContain(`currently **$${EXTRA_MEMBER_USD} per month**`);
    expect(terms).toContain(`held for **${HOLD_DAYS} days**`);
    expect(terms).toContain(`${USAGE_WARNING_PCTS[0]}% and ${USAGE_WARNING_PCTS[1]}%`);
  });
});
