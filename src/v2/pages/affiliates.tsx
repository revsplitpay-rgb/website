import {
  AFFILIATE_COMMISSION_LABEL,
  AFFILIATE_JOIN_URL,
  MAX_REFERRED_TEAMS,
  MIN_REFERRED_TEAMS,
  clampTeams,
  commissionCents,
  monthlyCommissionCents,
} from "@/lib/affiliate";
import { PLANS, formatUsdCents, type Plan } from "@/lib/pricing";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Link2, MousePointerClick, UserPlus, Users, Wallet } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import CtaBand from "../components/cta-band";
import Faq from "../components/faq";
import { EASE, Reveal } from "../components/motion";
import PageHero from "../components/page-hero";
import PageMeta from "../components/page-meta";
import { ButtonLink, Container, ExampleLabel, Grad, Panel, Section, SectionHeading, Segmented, StatusPill, buttonClass } from "../components/ui";
import { affiliate, faqsIn, type FaqGroup } from "../content/copy";
import { affiliateDashboardExample, referralLinkExample } from "../content/examples";
import { v2Path } from "../lib/paths";
import { breadcrumbLd, faqLd } from "../seo/jsonld";

const FAQ_GROUPS: FaqGroup[] = ["affiliates"];

const growth = PLANS.find((plan) => plan.id === "growth") ?? PLANS[0];
const usd = (cents: number) => formatUsdCents(cents / 100);

// The FirstPromoter sign-up opens in a new tab so this page stays open; without it, people ask to join through the contact page.
const join = AFFILIATE_JOIN_URL
  ? { label: "Join the affiliate program", href: AFFILIATE_JOIN_URL, newTab: true }
  : { label: "Ask to join", href: v2Path("/contact"), newTab: false };

/** Fades and lifts in once, in sequence; reduced motion shows the final frame straight away. */
const Step = ({ delay, className, children }: { delay: number; className?: string; children: ReactNode }) => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={reduced ? { duration: 0 } : { duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};

/** A short gradient line that draws downwards between two steps of the hero story. */
const Connector = ({ delay }: { delay: number }) => {
  const reduced = useReducedMotion();
  return (
    <div className="flex justify-center py-1.5" aria-hidden="true">
      <motion.span
        className="block h-6 w-px origin-top bg-[linear-gradient(180deg,rgb(0_114_228/0.6),rgb(63_193_255/0.6))]"
        initial={reduced ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={reduced ? { duration: 0 } : { duration: 0.4, ease: EASE, delay }}
      />
    </div>
  );
};

const PAYOUT_MONTHS = [
  { label: "Month 1", status: "Paid" as const },
  { label: "Month 2", status: "Paid" as const },
  { label: "Month 3", status: "Pending" as const },
];

/** The hero story, played once: your link, a team signs up, then a commission every month. */
const ReferralVisual = () => {
  const perMonth = usd(commissionCents(growth));
  return (
    <div className="relative mx-auto w-full max-w-[440px] lg:mr-0">
      <div className="v2-blob -right-10 -top-10 -z-10 h-56 w-56 bg-[rgb(63_193_255/0.35)]" aria-hidden="true" />
      <p className="sr-only">{affiliate.visualSummary}</p>
      <div aria-hidden="true">
        <Step delay={0.35}>
          <div className="v2-card v2-ledger-shadow flex items-center gap-3 px-4 py-3 text-left">
            <span className="v2-icon-tile h-9 w-9 shrink-0">
              <Link2 className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Your referral link</p>
              <p className="truncate font-mono text-sm text-foreground">{referralLinkExample}</p>
            </div>
            <ExampleLabel className="shrink-0" />
          </div>
        </Step>
        <Connector delay={0.8} />
        <Step delay={1.05}>
          <div className="v2-card flex items-center gap-3 px-4 py-3 text-left">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgb(16_160_110/0.12)] text-[rgb(4_120_87)]">
              <UserPlus className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">New team signed up</p>
              <p className="text-xs text-muted-foreground">{growth.name} plan</p>
            </div>
            <span className="rounded-full bg-[rgb(16_160_110/0.12)] px-2.5 py-0.5 text-xs font-medium text-[rgb(4_120_87)]">Subscribed</span>
          </div>
        </Step>
        <Connector delay={1.5} />
        <Step delay={1.75}>
          <div className="v2-card v2-ledger-shadow overflow-hidden text-left">
            <div className="flex items-center justify-between border-b border-border bg-[rgb(244_248_255)] px-4 py-2.5">
              <p className="text-sm font-medium text-foreground">Your commission</p>
              <p className="text-xs font-semibold text-[rgb(var(--v2-deep))]">{AFFILIATE_COMMISSION_LABEL} recurring</p>
            </div>
            <ul className="divide-y divide-border">
              {PAYOUT_MONTHS.map((month, index) => (
                <li key={month.label}>
                  <Step delay={2 + index * 0.3} className="flex items-center justify-between gap-3 px-4 py-2.5">
                    <span className="text-sm text-muted-foreground">{month.label}</span>
                    <span className="flex items-center gap-3">
                      <StatusPill status={month.status} />
                      <span className="v2-num w-[4.5rem] text-right text-sm font-semibold text-foreground">+{perMonth}</span>
                    </span>
                  </Step>
                </li>
              ))}
            </ul>
          </div>
        </Step>
      </div>
    </div>
  );
};

const Hero = () => (
  <PageHero
    center={false}
    eyebrow="Affiliate program"
    title={
      <>
        {affiliate.heroLead}
        <Grad>{affiliate.heroGrad}</Grad>
        {affiliate.heroTail}
      </>
    }
    support={affiliate.heroSupport}
    aside={<ReferralVisual />}
  >
    <div className="flex flex-col gap-3 sm:flex-row">
      <ButtonLink href={join.href} newTab={join.newTab} className="w-full sm:w-auto">
        {join.label} <ArrowRight aria-hidden="true" />
      </ButtonLink>
      <a href="#how" className={buttonClass("secondary", "w-full sm:w-auto")}>
        See how it works
      </a>
    </div>
    <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem] text-muted-foreground">
      {affiliate.facts.map((fact) => (
        <li key={fact} className="inline-flex items-center gap-2">
          <Check className="h-4 w-4 text-primary" aria-hidden="true" />
          {fact}
        </li>
      ))}
    </ul>
  </PageHero>
);

const PLAN_ITEMS = PLANS.map((plan) => ({ id: plan.id, label: plan.name }));

const Calculator = () => {
  const uid = useId();
  const reduced = useReducedMotion();
  const [planId, setPlanId] = useState<Plan["id"]>(growth.id);
  const [teams, setTeams] = useState(5);
  // The first render (and the prerendered HTML) shows the real number; later changes fade in.
  const [changed, setChanged] = useState(false);
  const plan = PLANS.find((p) => p.id === planId) ?? growth;
  const monthly = monthlyCommissionCents(plan, teams);
  const update = (apply: () => void) => {
    apply();
    setChanged(true);
  };

  return (
    <Section labelledBy="calc-title">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <SectionHeading id="calc-title" eyebrow="Earnings" title={affiliate.calcTitle} support={affiliate.calcSupport} />
        <Reveal delay={120}>
          <Panel raised>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-foreground">Their plan</p>
              <ExampleLabel />
            </div>
            <Segmented
              items={PLAN_ITEMS}
              value={planId}
              onChange={(next) => update(() => setPlanId(next))}
              label="Plan of the teams you refer"
              fill
              className="mt-3"
            />
            <div className="mt-6 flex items-baseline justify-between gap-3">
              <label htmlFor={`${uid}-teams`} className="text-sm font-medium text-foreground">
                Teams you refer
              </label>
              <span className="v2-num text-lg font-semibold text-foreground" aria-hidden="true">
                {teams}
              </span>
            </div>
            <input
              id={`${uid}-teams`}
              type="range"
              min={MIN_REFERRED_TEAMS}
              max={MAX_REFERRED_TEAMS}
              step={1}
              value={teams}
              onChange={(e) => update(() => setTeams(clampTeams(Number(e.target.value))))}
              aria-valuetext={`${teams} ${teams === 1 ? "team" : "teams"}`}
              className="mt-2 h-11 w-full cursor-pointer accent-[rgb(var(--primary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary)/0.4)] rounded-full"
            />
            <div className="mt-6 border-t border-border pt-6" aria-live="polite">
              <p className="text-sm text-muted-foreground">You'd earn</p>
              <motion.p
                key={`${planId}-${teams}`}
                initial={changed && !reduced ? { opacity: 0.35, y: 4 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="mt-1 flex flex-wrap items-baseline gap-x-2"
              >
                <span className="v2-stat v2-gradient-text">{usd(monthly)}</span>
                <span className="text-muted-foreground">a month</span>
              </motion.p>
              <p className="mt-2 text-[0.9375rem] text-muted-foreground">
                <span className="v2-num font-semibold text-foreground">{usd(monthly * 12)}</span> a year from {teams}{" "}
                {teams === 1 ? "team" : "teams"} on {plan.name}
              </p>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{affiliate.calcFootnote}</p>
          </Panel>
        </Reveal>
      </Container>
    </Section>
  );
};

/** Three numbered steps on one gradient line: across on desktop, down on phones. */
const StepTrack = () => (
  <Section id="how" tone="tint" labelledBy="how-title">
    <Container>
      <SectionHeading id="how-title" center eyebrow="How it works" title={affiliate.stepsTitle} />
      <ol className="relative mt-12 grid gap-8 lg:mt-14 lg:grid-cols-3 lg:gap-10">
        <span
          className="absolute bottom-6 left-5 top-6 w-px bg-[linear-gradient(180deg,rgb(0_114_228/0.5),rgb(63_193_255/0.5))] lg:bottom-auto lg:left-[16.67%] lg:right-[16.67%] lg:top-5 lg:h-px lg:w-auto lg:bg-[linear-gradient(90deg,rgb(0_114_228/0.5),rgb(63_193_255/0.5))]"
          aria-hidden="true"
        />
        {affiliate.steps.map((step, index) => (
          <li key={step.title} className="relative">
            <Reveal delay={index * 120} className="flex gap-5 lg:flex-col lg:items-center lg:text-center">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgb(0_114_228),rgb(63_193_255))] font-mono text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgb(0_72_160/0.7)] ring-4 ring-[rgb(244_248_255)]">
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{step.title}</h3>
                <p className="mt-2 max-w-[38ch] text-[0.9375rem] leading-relaxed text-muted-foreground lg:mx-auto">{step.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Container>
  </Section>
);

const DASHBOARD_STATS = [
  { label: "Clicks", value: String(affiliateDashboardExample.clicks), Icon: MousePointerClick },
  { label: "Sign-ups", value: String(affiliateDashboardExample.signUps), Icon: UserPlus },
  { label: "Paying teams", value: String(affiliateDashboardExample.payingTeams), Icon: Users },
];

const exampleEarnings = usd(
  monthlyCommissionCents(PLANS.find((p) => p.id === affiliateDashboardExample.plan) ?? growth, affiliateDashboardExample.payingTeams),
);

/** Who the program is for, beside what an affiliate gets. */
const WhoAndWhat = () => (
  <Section labelledBy="who-title">
    <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <SectionHeading id="who-title" eyebrow="Who it's for" title={affiliate.whoTitle} />
        <ul className="mt-8 space-y-4">
          {affiliate.who.map((item, index) => (
            <li key={item}>
              <Reveal delay={index * 70} className="flex items-start gap-3 text-[1.0625rem] text-foreground">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(0_114_228/0.1)] text-primary">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {item}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      <Reveal delay={120}>
        <Panel raised className="v2-gradient-border">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground">Your affiliate dashboard</h3>
            <ExampleLabel />
          </div>
          <dl className="mt-5 grid grid-cols-3 gap-3">
            {DASHBOARD_STATS.map(({ label, value, Icon }) => (
              <div key={label} className="rounded-[14px] bg-[rgb(244_248_255)] p-3 sm:p-4">
                <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="v2-num mt-1 text-xl font-semibold text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 flex items-center justify-between gap-3 rounded-[14px] bg-[linear-gradient(135deg,rgb(0_114_228/0.08),rgb(63_193_255/0.12))] px-4 py-3">
            <span className="flex items-center gap-2 text-sm text-foreground">
              <Wallet className="h-4 w-4 text-primary" aria-hidden="true" />
              Earnings this month
            </span>
            <span className="v2-num text-lg font-semibold text-[rgb(var(--v2-deep))]">{exampleEarnings}</span>
          </div>
          <h3 className="mt-7 text-sm font-semibold text-foreground">{affiliate.getTitle}</h3>
          <ul className="mt-3 space-y-2.5 text-[0.9375rem] text-foreground">
            {affiliate.get.map((item) => (
              <li key={item} className="flex gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </Reveal>
    </Container>
  </Section>
);

const Affiliates = () => (
  <>
    <PageMeta
      title={affiliate.title}
      description={affiliate.description}
      path="/affiliates"
      jsonLd={[faqLd(faqsIn(FAQ_GROUPS)), breadcrumbLd([{ name: "Affiliate program", path: "/affiliates" }])]}
    />
    <Hero />
    <Calculator />
    <StepTrack />
    <WhoAndWhat />
    <Faq groups={FAQ_GROUPS} title="Affiliate questions." />
    <CtaBand
      title={affiliate.ctaTitle}
      support={affiliate.ctaSupport}
      pill={affiliate.ctaPill}
      primary={join}
      showSplit={false}
    />
  </>
);

export default Affiliates;
