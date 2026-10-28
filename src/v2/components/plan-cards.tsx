import { APP_SIGNUP_URL } from "@/lib/links";
import {
  EXTRA_MEMBER_USD,
  EXTRA_MEMBER_YEARLY_USD,
  PLANS,
  PLAN_HIGHLIGHTS,
  YEARLY_DISCOUNT_PCT,
  formatUsd,
  formatUsdCents,
  planMultipleLine,
  yearlyMonthlyUsd,
  yearlySavingsUsd,
  type BillingPeriod,
  type Plan,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Building, Check, Sparkles } from "lucide-react";
import { useId, useRef, useState } from "react";
import { enterpriseLine } from "../content/copy";
import { v2Path } from "../lib/paths";
import { EASE, Reveal } from "./motion";
import { ButtonLink } from "./ui";

// Each card lists what it adds over the plan below it, starting with how far it scales up.
const highlights = (plan: Plan, index: number) => {
  const below = PLANS[index - 1];
  const items = PLAN_HIGHLIGHTS[plan.id].items;
  return below ? [planMultipleLine(plan, below), ...items] : items;
};

const PERIODS: { id: BillingPeriod; label: string }[] = [
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly" },
];

/** Monthly / Yearly switch with the yearly saving beside it. */
const PeriodToggle = ({ period, onChange }: { period: BillingPeriod; onChange: (next: BillingPeriod) => void }) => {
  const reduced = useReducedMotion();
  const pillId = useId();
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div role="group" aria-label="Billing period" className="relative inline-flex rounded-full bg-[rgb(0_114_228/0.07)] p-1 ring-1 ring-[rgb(0_114_228/0.12)]">
        {PERIODS.map((item) => {
          const active = item.id === period;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(item.id)}
              className={cn(
                "relative rounded-full px-5 py-2 text-[0.9375rem] font-medium transition-colors",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {active && (
                <motion.span
                  layoutId={reduced ? undefined : pillId}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute inset-0 -z-0 rounded-full bg-white shadow-[0_4px_14px_-6px_rgb(0_40_110/0.35)] ring-1 ring-[rgb(0_114_228/0.1)]"
                  aria-hidden="true"
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </div>
      <span className="rounded-full bg-[rgb(16_185_129/0.12)] px-3 py-1 text-sm font-semibold text-[rgb(4_120_87)]">
        Save {YEARLY_DISCOUNT_PCT}% yearly
      </span>
    </div>
  );
};

/** "$239.17" with the cents set smaller, so long prices still fit the card. */
const Price = ({ usd, className }: { usd: number; className?: string }) => {
  const [whole, cents] = formatUsdCents(usd).split(".");
  return (
    <span className={cn("v2-stat", className)}>
      {whole}
      {cents && <span className="text-[0.55em] tracking-[-0.02em]">.{cents}</span>}
    </span>
  );
};

const PriceBlock = ({ plan, period, featured }: { plan: Plan; period: BillingPeriod; featured: boolean }) => {
  const reduced = useReducedMotion();
  const yearly = period === "yearly";
  const muted = featured ? "text-white/85" : "text-muted-foreground";
  return (
    <motion.div
      key={period}
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="mt-6"
    >
      <p className="flex items-baseline gap-1.5">
        <Price usd={yearly ? yearlyMonthlyUsd(plan) : plan.priceUsd} className={featured ? "text-white" : "text-foreground"} />
        <span className={muted}>/month</span>
      </p>
      <p className={cn("mt-2 text-sm", muted)}>
        {yearly ? (
          <>
            {formatUsd(plan.yearlyPriceUsd)} billed yearly ·{" "}
            <span className={cn("font-semibold", featured ? "text-white" : "text-[rgb(4_120_87)]")}>save {formatUsd(yearlySavingsUsd(plan))}</span>
          </>
        ) : (
          "Billed monthly"
        )}
      </p>
    </motion.div>
  );
};

/** The three plans with a monthly / yearly switch, then the Enterprise row. */
const PlanCards = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.4 });
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  return (
    <div>
      <Reveal>
        <PeriodToggle period={period} onChange={setPeriod} />
      </Reveal>
      <div ref={gridRef} className="mt-10 grid items-stretch gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
        {PLANS.map((plan, index) => {
          const featured = Boolean(plan.badge);
          return (
            <Reveal key={plan.id} delay={index * 100} className={cn("h-full", plan.id === "scale" && "md:col-span-2 lg:col-span-1")}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-[24px] p-7 lg:p-8",
                  featured ? "v2-spin-border v2-spin-border-deep text-white lg:-my-4 lg:py-12" : "v2-card v2-card-hover",
                  featured && inView && "v2-spin-run",
                )}
                aria-labelledby={`plan-${plan.id}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 id={`plan-${plan.id}`} className={cn("text-xl font-semibold tracking-tight", featured ? "text-white" : "text-foreground")}>
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[rgb(var(--v2-deep))] shadow-[0_8px_18px_-8px_rgb(0_20_80/0.6)]">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className={cn("mt-2 min-h-[3rem] text-[0.9375rem]", featured ? "text-white/90" : "text-muted-foreground")}>{plan.summary}</p>
                <PriceBlock plan={plan} period={period} featured={featured} />
                <ButtonLink href={APP_SIGNUP_URL} variant={featured ? "white" : "secondary"} className="mt-6 w-full">
                  Start free trial <ArrowRight aria-hidden="true" />
                </ButtonLink>
                <ul className={cn("mt-6 space-y-2.5 border-t pt-6 text-[0.9375rem]", featured ? "border-white/20 text-white" : "border-border text-foreground")}>
                  <li>
                    Up to <span className="font-semibold">{plan.salesLimitLabel}</span> in sales a month
                  </li>
                  <li>
                    <span className="font-semibold">{plan.includedMembers}</span> team members, then{" "}
                    {period === "yearly" ? `${formatUsd(EXTRA_MEMBER_YEARLY_USD)}/year` : `${formatUsd(EXTRA_MEMBER_USD)}/month`} each
                  </li>
                  <li className={featured ? "text-white/85" : "text-muted-foreground"}>Support replies {plan.supportReplies.toLowerCase()}</li>
                </ul>
                <p className={cn("mt-6 text-sm font-semibold", featured ? "text-white" : "text-foreground")}>{PLAN_HIGHLIGHTS[plan.id].intro}:</p>
                <ul className={cn("mt-3 space-y-3 text-[0.9375rem]", featured ? "text-white" : "text-foreground")}>
                  {highlights(plan, index).map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", featured ? "bg-white/20 text-white" : "bg-[rgb(0_114_228/0.1)] text-primary")}>
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={150}>
        <div className="v2-card mt-8 flex flex-col gap-5 overflow-hidden p-6 sm:flex-row sm:items-center sm:justify-between lg:p-7">
          <div className="flex items-center gap-4">
            <span className="v2-icon-tile h-11 w-11 shrink-0">
              <Building className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">Enterprise</h3>
              <p className="mt-0.5 text-[0.9375rem] text-muted-foreground">{enterpriseLine()}</p>
            </div>
          </div>
          <ButtonLink href={v2Path("/contact")} variant="secondary">
            Talk to us <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
};

export default PlanCards;
