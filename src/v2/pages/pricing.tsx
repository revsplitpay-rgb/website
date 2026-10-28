import { APP_SIGNUP_URL } from "@/lib/links";
import {
  COMMISSION_FEE_BP,
  COMMISSION_FEE_LABEL,
  EXTRA_MEMBER_USD,
  PLANS,
  STARTING_PRICE_USD,
  TRIAL_DAYS,
  YEARLY_DISCOUNT_PCT,
  formatBp,
  formatUsd,
  recommendPlan,
} from "@/lib/pricing";
import { ArrowRight, CalendarClock, Check, CreditCard, MousePointerClick, ShieldCheck } from "lucide-react";
import { useId, useState } from "react";
import CtaBand from "../components/cta-band";
import Faq from "../components/faq";
import PageMeta from "../components/page-meta";
import { breadcrumbLd, faqLd, softwareLd } from "../seo/jsonld";
import PlanCards from "../components/plan-cards";
import PlanCompare, { EveryPlan } from "../components/plan-compare";
import PageHero from "../components/page-hero";
import { Reveal } from "../components/motion";
import { ButtonLink, Container, Grad, Panel, Section, SectionHeading } from "../components/ui";
import { billingPoints, enterpriseLine, faqs, priceLine, trial } from "../content/copy";
import { v2Path } from "../lib/paths";
import { formatCents, parseSaleInput } from "../lib/split";
import { providerPhrase } from "../content/providers";

const EXAMPLE_COMMISSION_CENTS = 500 * 100;
const exampleFeeCents = Math.round((EXAMPLE_COMMISSION_CENTS * COMMISSION_FEE_BP) / 10_000);
const MAX_MEMBERS = 200;

const TRIAL_ICONS = [CreditCard, MousePointerClick, CalendarClock, ShieldCheck];

/** How the free trial works: four promises from the app's trial rules. */
const TrialHow = () => (
  <Section tone="tint" labelledBy="trial-title">
    <Container>
      <SectionHeading id="trial-title" center eyebrow="Free trial" title="How the free trial works." support={trial.promise} />
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {trial.points.map((point, index) => {
          const Icon = TRIAL_ICONS[index];
          return (
            <li key={point.title}>
              <Reveal delay={index * 80} className="h-full">
                <div className="v2-card v2-card-hover h-full p-6">
                  <span className="v2-icon-tile h-10 w-10" aria-hidden="true">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{point.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{point.text}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
      <p className="mt-8 text-center text-sm text-muted-foreground">{trial.footnote}</p>
    </Container>
  </Section>
);

const FeeStrip = () => (
  <Section labelledBy="fees-title">
    <Container>
      <SectionHeading
        id="fees-title"
        eyebrow="Fees"
        title="Fees, in plain numbers."
        support="Your plan covers the software. A small fee comes out of each team member's payout, and your own share is never charged."
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        <Panel>
          <p className="v2-stat v2-gradient-text">{COMMISSION_FEE_LABEL}</p>
          <p className="mt-3 text-[0.9375rem] text-muted-foreground">
            Taken from each commission paid to a team member. The owner is fee-free.
          </p>
        </Panel>
        <Panel>
          <p className="v2-stat v2-gradient-text">{formatBp(0)}</p>
          <p className="mt-3 text-[0.9375rem] text-muted-foreground">
            On your own share, on invoices from team members and on paid awards. Payment processing fees from {providerPhrase()} still apply.
          </p>
        </Panel>
        <Panel raised className="v2-gradient-border">
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-[rgb(var(--v2-deep))]">Worked example</p>
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
              <dd className="v2-num v2-gradient-text text-lg font-semibold">{formatCents(EXAMPLE_COMMISSION_CENTS - exampleFeeCents)}</dd>
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
    <Section tone="tint" labelledBy="picker-title">
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <SectionHeading
          id="picker-title"
          eyebrow="Plan finder"
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
                className="v2-num mt-2 h-12 w-full rounded-[12px] border border-border bg-white px-4 text-foreground shadow-[0_1px_2px_rgb(11_26_51/0.05)] focus:border-primary"
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
                className="v2-num mt-2 h-12 w-full rounded-[12px] border border-border bg-white px-4 text-foreground shadow-[0_1px_2px_rgb(11_26_51/0.05)] focus:border-primary"
              />
            </div>
          </div>
          <div className="mt-6 border-t border-border pt-6" aria-live="polite">
            {rec?.kind === "plan" && plan && (
              <>
                <p className="text-sm text-muted-foreground">Best fit</p>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-3">
                  <span className="text-2xl font-semibold tracking-tight text-foreground">{plan.name}</span>
                  <span className="v2-num v2-gradient-text text-2xl font-semibold">{formatUsd(rec.monthlyTotalUsd)}</span>
                  <span className="text-muted-foreground">/month</span>
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

const Compare = () => (
  <Section labelledBy="compare-title">
    <Container>
      <SectionHeading
        id="compare-title"
        center
        eyebrow="Compare"
        title="The differences."
        support="Every plan has the full product. This is everything that changes as you grow."
      />
      <div className="mt-12">
        <PlanCompare />
      </div>
    </Container>
  </Section>
);

const Billing = () => (
  <Section tone="tint" labelledBy="billing-title">
    <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading
          id="billing-title"
          eyebrow="Billing"
          title="How billing works."
        />
      </div>
      <Reveal>
        <ul className="v2-card divide-y divide-border">
          {billingPoints.map((point) => (
            <li key={point} className="flex gap-3.5 px-6 py-4 text-[0.9375rem] text-foreground">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgb(0_114_228/0.1)] text-primary">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  </Section>
);

const Pricing = () => (
  <>
    <PageMeta
      title="Pricing | RevSplitPay"
      description={`${priceLine()}. Plans for teams of every size, with fees shown up front.`}
      path="/pricing"
      jsonLd={[softwareLd(), faqLd(faqs.filter((item) => item.group === "billing")), breadcrumbLd([{ name: "Pricing", path: "/pricing" }])]}
    />
    <PageHero
      eyebrow="Pricing"
      title={
        <>
          Try any plan <Grad>free for {TRIAL_DAYS} days.</Grad>
        </>
      }
      support={`${trial.promise} From ${formatUsd(STARTING_PRICE_USD)} a month, or save ${YEARLY_DISCOUNT_PCT}% yearly.`}
    >
      <ButtonLink href={APP_SIGNUP_URL}>
        Start free trial <ArrowRight aria-hidden="true" />
      </ButtonLink>
    </PageHero>
    <Section>
      <Container>
        <PlanCards />
        <EveryPlan />
      </Container>
    </Section>
    <TrialHow />
    <FeeStrip />
    <PlanPicker />
    <Compare />
    <Billing />
    <Faq groups={["billing"]} title="Billing questions." />
    <CtaBand />
  </>
);

export default Pricing;
