import { APP_SIGNUP_URL } from "@/lib/links";
import { EXTRA_MEMBER_USD, PLANS, PLAN_FEATURES, formatUsd, type PlanId } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { ArrowRight, Building, Check, Sparkles } from "lucide-react";
import { enterpriseLine } from "../content/copy";
import { v2Path } from "../lib/paths";
import { Reveal } from "./motion";
import { ButtonLink } from "./ui";

const previousPlan: Record<PlanId, PlanId | null> = { starter: null, growth: "starter", scale: "growth" };
const previousName: Record<PlanId, string> = { starter: "", growth: "Starter", scale: "Growth" };

// Each card lists what it adds over the plan below it.
const highlights = (id: PlanId) => {
  const prev = previousPlan[id];
  const rows = PLAN_FEATURES.filter((row) => row.plans[id] && (!prev || !row.plans[prev])).map((row) => row.label);
  return prev ? [`Everything in ${previousName[id]}`, ...rows] : rows;
};

const PlanCards = ({ compact = false }: { compact?: boolean }) => (
  <div>
    <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
      {PLANS.map((plan, index) => {
        const featured = Boolean(plan.badge);
        return (
          <Reveal key={plan.id} delay={index * 100} className={cn("h-full", plan.id === "scale" && "md:col-span-2 lg:col-span-1")}>
            <article
              className={cn(
                "flex h-full flex-col rounded-[24px] p-7 lg:p-8",
                featured
                  ? "v2-spin-border v2-spin-border-deep text-white lg:-my-4 lg:py-12"
                  : "v2-card v2-card-hover",
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
              <p className="mt-6 flex items-baseline gap-1.5">
                <span className={cn("v2-stat", featured ? "text-white" : "text-foreground")}>{formatUsd(plan.priceUsd)}</span>
                <span className={featured ? "text-white/85" : "text-muted-foreground"}>/month</span>
              </p>
              <ul className={cn("mt-6 space-y-2.5 border-t pt-6 text-[0.9375rem]", featured ? "border-white/20 text-white" : "border-border text-foreground")}>
                <li>
                  Up to <span className="font-semibold">{plan.salesLimitLabel}</span> in sales a month
                </li>
                <li>
                  <span className="font-semibold">{plan.includedMembers}</span> team members, then {formatUsd(EXTRA_MEMBER_USD)} each
                </li>
                <li className={featured ? "text-white/85" : "text-muted-foreground"}>Support replies {plan.supportReplies.toLowerCase()}</li>
              </ul>
              {!compact && (
                <ul className={cn("mt-6 space-y-3 text-[0.9375rem]", featured ? "text-white" : "text-foreground")}>
                  {highlights(plan.id).map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", featured ? "bg-white/20 text-white" : "bg-[rgb(0_114_228/0.1)] text-primary")}>
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto pt-8">
                <ButtonLink href={APP_SIGNUP_URL} variant={featured ? "white" : "secondary"} className="w-full">
                  Get started <ArrowRight aria-hidden="true" />
                </ButtonLink>
              </div>
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

export default PlanCards;
