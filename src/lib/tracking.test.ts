import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// index.html is the template for every prerendered page, so affiliate tracking
// lives in its <head>. This guards it against a head cleanup.
const html = readFileSync(new URL("../../index.html", import.meta.url), "utf8");
const head = html.slice(0, html.indexOf("</head>"));

describe("FirstPromoter tracking in index.html", () => {
  it("queues init with the campaign id and records the click", () => {
    expect(head).toContain('fpr("init", {cid:"hh05hbcg"});');
    expect(head).toContain('fpr("click");');
  });

  it("loads fpr.js asynchronously after the queue stub", () => {
    const stub = head.indexOf('id="fpr-init"');
    const loader = head.indexOf('<script src="https://cdn.firstpromoter.com/fpr.js" async></script>');
    expect(stub).toBeGreaterThan(-1);
    expect(loader).toBeGreaterThan(stub);
  });
});
