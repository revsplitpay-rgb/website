import { INTEGRATIONS } from "@/lib/integrations";
import { COMMISSION_FEE_LABEL, HOLD_DAYS, PLANS, TRIAL_DAYS, formatUsd } from "@/lib/pricing";
import { describe, expect, it } from "vitest";
import { faqs } from "../content/copy";
import { breadcrumbLd, faqLd, graph, organizationLd, softwareLd } from "./jsonld";
import { buildLlmsFullTxt, buildLlmsTxt } from "./llms";
import { STATIC_ROUTES } from "./routes";
import { absoluteUrl } from "./site";

describe("structured data", () => {
  it("offers exactly the real plans at their real monthly and yearly prices", () => {
    const offers = softwareLd().offers;
    expect(offers.map((offer) => offer.name)).toEqual(PLANS.flatMap((plan) => [plan.name, `${plan.name}, yearly`]));
    expect(offers.map((offer) => Number(offer.price))).toEqual(PLANS.flatMap((plan) => [plan.priceUsd, plan.yearlyPriceUsd]));
    expect(offers.map((offer) => offer.priceSpecification.billingDuration)).toEqual(PLANS.flatMap(() => ["P1M", "P1Y"]));
    expect(offers.every((offer) => offer.priceCurrency === "USD")).toBe(true);
  });

  it("never claims ratings or reviews", () => {
    const json = JSON.stringify(graph(organizationLd(), softwareLd()));
    expect(json).not.toMatch(/aggregateRating|"Review"|ratingValue/i);
  });

  it("mirrors the FAQ copy word for word", () => {
    const ld = faqLd(faqs);
    expect(ld.mainEntity).toHaveLength(faqs.length);
    expect(ld.mainEntity[0].acceptedAnswer.text).toBe(faqs[0].a);
  });

  it("starts breadcrumbs at Home with absolute URLs", () => {
    const ld = breadcrumbLd([{ name: "Pricing", path: "/pricing" }]);
    expect(ld.itemListElement.map((item) => item.item)).toEqual([absoluteUrl("/"), absoluteUrl("/pricing")]);
    expect(ld.itemListElement.map((item) => item.position)).toEqual([1, 2]);
  });
});

describe("llms.txt", () => {
  it("states every plan price, the team fee, the hold and the trial", () => {
    const full = buildLlmsFullTxt();
    for (const plan of PLANS) expect(full).toContain(`${formatUsd(plan.priceUsd)}/month, or ${formatUsd(plan.yearlyPriceUsd)}/year`);
    expect(full).toContain(COMMISSION_FEE_LABEL);
    expect(full).toContain(`${HOLD_DAYS}-day`);
    expect(full).toContain(`free for ${TRIAL_DAYS} days`);
    expect(full).toContain("Start plan");
    expect(full).not.toMatch(/WELCOME50|0\.5%/);
  });

  it("links every public page by its final URL", () => {
    const short = buildLlmsTxt();
    for (const item of INTEGRATIONS) expect(short).toContain(absoluteUrl(`/integrations/${item.slug}`));
    expect(short).toContain(absoluteUrl("/pricing"));
    expect(short).not.toContain("/v2");
  });
});

describe("routes", () => {
  it("lists each public path once, with no preview prefix", () => {
    const paths = STATIC_ROUTES.map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths.some((p) => p.startsWith("/v2"))).toBe(false);
    expect(paths).toContain("/integrations/stripe");
  });
});
