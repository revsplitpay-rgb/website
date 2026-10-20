import {
  COMMISSION_FEE_BP,
  COMMISSION_FEE_LABEL,
  EXTRA_MEMBER_USD,
  INVOICE_FEE_LABEL,
  PLANS,
  PLAN_FEATURES,
  WELCOME_OFFER,
  formatUsd,
  recommendPlan,
  type PlanId,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";
import * as Accordion from "@radix-ui/react-accordion";
import { Check, ChevronDown, Minus } from "lucide-react";
import { useId, useState } from "react";
import CopyButton from "../components/copy-button";
import CtaBand from "../components/cta-band";
import Faq from "../components/faq";
import PageMeta from "../components/page-meta";
import PlanCards from "../components/plan-cards";
import { ButtonLink, Container, Panel, Section, SectionHeading } from "../components/ui";
import { billingPoints, enterpriseLine, priceLine } from "../content/copy";
import { v2Path } from "../lib/paths";
import { formatCents, parseSaleInput } from "../lib/split";

const EXAMPLE_COMMISSION_CENTS = 500 * 100;
const exampleFeeCents = Math.round((EXAMPLE_COMMISSION_CENTS * COMMISSION_FEE_BP) / 10_000);
const MAX_MEMBERS = 200;

const OfferCallout = () => (
  <div className="mt-8 flex flex-col gap-4 rounded-lg border border-primary bg-background p-5 sm:flex-row sm:items-center sm:justify-between">
    <p className="text-[0.9375rem] text-foreground">
      <span className="font-medium">
        {WELCOME_OFFER.percentOff}% off {WELCOME_OFFER.appliesTo}
      </span>{" "}
      on any plan. Use the code at signup.
    </p>
    <CopyButton value={WELCOME_OFFER.code} label="Copy code" />
  </div>
);

const FeeStrip = () => (
  <Section surface labelledBy="fees-title">
    <Container>
      <SectionHeading
        id="fees-title"
        title="Fees, in plain numbers."
        support="Your plan covers the software. A small fee comes out of each team member's payout, and your own share is never charged."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <Panel>
          <p className="v2-num text-[2rem] font-medium leading-none text-foreground">{COMMISSION_FEE_LABEL}</p>
          <p className="mt-3 text-[0.9375rem] text-muted-foreground">
            Taken from each commission paid to a team member. The owner is fee-free.
          </p>
        </Panel>
        <Panel>
          <p className="v2-num text-[2rem] font-medium leading-none text-foreground">{INVOICE_FEE_LABEL}</p>
          <p className="mt-3 text-[0.9375rem] text-muted-foreground">On invoices from team members and on paid awards.</p>
        </Panel>
        <Panel raised>
          <p className="text-sm font-medium text-muted-foreground">Worked example</p>
          <dl className="mt-3 space-y-2 text-[0.9375rem]">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Closer's commission</dt>
              <dd className="v2-num text-foreground">{formatCents(EXAMPLE_COMMISSION_CENTS)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{COMMISSION_FEE_LABEL} fee</dt>
              <dd className="v2-num text-foreground">−{formatCents(exampleFeeCents)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-border pt-2 font-medium">
              <dt className="text-foreground">Paid to the closer</dt>
              <dd className="v2-num text-foreground">{formatCents(EXAMPLE_COMMISSION_CENTS - exampleFeeCents)}</dd>
            </div>
          </dl>
        </Panel>
      </div>
    </Container>
  </Section>
);

const PlanPicker = () => {
  const uid = useId();
  const [sales, setSales] = useState("50,000");
  const [members, setMembers] = useState("8");

  const salesResult = parseSaleInput(sales);
  const memberCount = Math.min(MAX_MEMBERS, Math.max(0, Math.floor(Number(members) || 0)));
  const rec = salesResult.ok ? recommendPlan(salesResult.value / 100, memberCount) : null;
  const plan = rec?.kind === "plan" ? PLANS.find((p) => p.id === rec.planId) : undefined;

  return (
    <Section labelledBy="picker-title">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <SectionHeading
          id="picker-title"
          title="Find your plan."
          support={`Tell us your monthly sales and team size. Extra team members are ${formatUsd(EXTRA_MEMBER_USD)} a month each, and you never count as one.`}
        />
        <Panel raised>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${uid}-sales`} className="text-sm font-medium text-foreground">
                Monthly sales (USD)
              </label>
              <input
                id={`${uid}-sales`}
                inputMode="decimal"
                value={sales}
                onChange={(e) => setSales(e.target.value)}
                aria-invalid={!salesResult.ok}
                aria-describedby={!salesResult.ok ? `${uid}-sales-error` : undefined}
                className="v2-num mt-2 h-11 w-full rounded-sm border border-input bg-background px-3 text-foreground"
              />
              {!salesResult.ok && (
                <p id={`${uid}-sales-error`} className="mt-2 text-sm text-destructive">
                  {salesResult.error.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor={`${uid}-members`} className="text-sm font-medium text-foreground">
                Team members (not you)
              </label>
              <input
                id={`${uid}-members`}
                type="number"
                min={0}
                max={MAX_MEMBERS}
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                className="v2-num mt-2 h-11 w-full rounded-sm border border-input bg-background px-3 text-foreground"
              />
            </div>
          </div>
          <div className="mt-6 border-t border-border pt-6" aria-live="polite">
            {rec?.kind === "plan" && plan && (
              <>
                <p className="text-sm text-muted-foreground">Best fit</p>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-3">
                  <span className="v2-h3 text-foreground">{plan.name}</span>
                  <span className="v2-num text-foreground">{formatUsd(rec.monthlyTotalUsd)}/month</span>
                </p>
                <p className="mt-2 text-[0.9375rem] text-muted-foreground">
                  {memberCount > plan.includedMembers
                    ? `${plan.includedMembers} members included, plus ${memberCount - plan.includedMembers} extra.`
                    : `Up to ${plan.includedMembers} members included.`}
                  {rec.savingsUsd !== null && ` Saves ${formatUsd(rec.savingsUsd)} a month over a smaller plan with extra seats.`}
                </p>
              </>
            )}
            {rec?.kind === "enterprise" && (
              <>
                <p className="v2-h3 text-foreground">Enterprise</p>
                <p className="mt-2 text-[0.9375rem] text-muted-foreground">{enterpriseLine()}</p>
                <ButtonLink href={v2Path("/contact")} variant="secondary" className="mt-4">
                  Talk to us
                </ButtonLink>
              </>
            )}
            {!rec && <p className="text-[0.9375rem] text-muted-foreground">Enter your monthly sales to see a plan.</p>}
          </div>
        </Panel>
      </Container>
    </Section>
  );
};

const Mark = ({ value }: { value: boolean | string }) =>
  value === true ? (
    <Check className="mx-auto h-4 w-4 text-primary" aria-label="Included" />
  ) : value === false ? (
    <Minus className="mx-auto h-4 w-4 text-muted-foreground" aria-label="Not included" />
  ) : (
    <span>{value}</span>
  );

const Compare = () => (
  <Section surface labelledBy="compare-title">
    <Container>
      <SectionHeading id="compare-title" title="Compare plans." />
      <div className="mt-10 hidden overflow-hidden rounded-lg border border-border bg-background md:block">
        <table className="w-full text-left text-[0.9375rem]">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="px-6 py-4 font-medium text-muted-foreground">
                Feature
              </th>
              {PLANS.map((plan) => (
                <th key={plan.id} scope="col" className="w-40 px-4 py-4 text-center font-medium text-foreground">
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <th scope="row" className="px-6 py-3 font-normal text-foreground">
                Monthly sales limit
              </th>
              {PLANS.map((plan) => (
                <td key={plan.id} className="v2-num px-4 py-3 text-center text-foreground">
                  {plan.salesLimitLabel}
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="px-6 py-3 font-normal text-foreground">
                Team members included
              </th>
              {PLANS.map((plan) => (
                <td key={plan.id} className="v2-num px-4 py-3 text-center text-foreground">
                  {plan.includedMembers}
                </td>
              ))}
            </tr>
            {PLAN_FEATURES.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="px-6 py-3 font-normal text-foreground">
                  {row.label}
                </th>
                {PLANS.map((plan) => (
                  <td key={plan.id} className="px-4 py-3 text-center text-foreground">
                    <Mark value={row.plans[plan.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Accordion.Root type="multiple" defaultValue={["growth"]} className="mt-8 border-t border-border md:hidden">
        {PLANS.map((plan) => (
          <Accordion.Item key={plan.id} value={plan.id} className="border-b border-border">
            <Accordion.Header>
              <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between py-4 text-left font-medium text-foreground">
                {plan.name} · {formatUsd(plan.priceUsd)}/month
                <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <ul className="space-y-2.5 pb-5 text-[0.9375rem]">
                {PLAN_FEATURES.map((row) => {
                  const on = row.plans[plan.id as PlanId] !== false;
                  return (
                    <li key={row.label} className={cn("flex gap-2.5", on ? "text-foreground" : "text-muted-foreground line-through")}>
                      {on ? (
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      ) : (
                        <Minus className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      )}
                      <span>
                        {!on && <span className="sr-only">Not included: </span>}
                        {row.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Container>
  </Section>
);

const Billing = () => (
  <Section labelledBy="billing-title">
    <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
      <SectionHeading id="billing-title" title="How billing works." />
      <ul className="space-y-4">
        {billingPoints.map((point) => (
          <li key={point} className="flex gap-3 border-b border-border pb-4 text-[0.9375rem] text-foreground last:border-0">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
    </Container>
  </Section>
);

const Pricing = () => (
  <>
    <PageMeta
      title="Pricing | RevSplitPay"
      description={`${priceLine()}. Plans for teams of every size, with fees shown up front.`}
      path="/pricing"
    />
    <Section className="pb-10 md:pb-14 lg:pb-16">
      <Container>
        <SectionHeading as="h1" title="Simple plans. Fees shown up front." support={priceLine()} />
        <OfferCallout />
        <div className="mt-10">
          <PlanCards />
        </div>
      </Container>
    </Section>
    <FeeStrip />
    <PlanPicker />
    <Compare />
    <Billing />
    <Faq groups={["billing"]} title="Billing questions." />
    <CtaBand />
  </>
);

export default Pricing;
