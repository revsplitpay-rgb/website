import { APP_SIGNUP_URL } from "@/lib/links";
import { EXTRA_MEMBER_USD, PLANS, PLAN_FEATURES, formatUsd, type PlanId } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { enterpriseLine } from "../content/copy";
import { v2Path } from "../lib/paths";
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {PLANS.map((plan) => {
        const featured = Boolean(plan.badge);
        return (
          <article
            key={plan.id}
            className={cn(
              "flex flex-col rounded-lg border bg-background p-6 lg:p-8",
              featured ? "border-primary v2-raised" : "border-border",
              plan.id === "scale" && "md:col-span-2 lg:col-span-1",
            )}
            aria-labelledby={`plan-${plan.id}`}
          >
            <p className={cn("h-5 text-sm font-medium", featured ? "text-[rgb(var(--v2-link))]" : "text-transparent")}>
              {plan.badge ?? " "}
            </p>
            <h3 id={`plan-${plan.id}`} className="v2-h3 mt-2 text-foreground">
              {plan.name}
            </h3>
            <p className="mt-1 text-[0.9375rem] text-muted-foreground">{plan.summary}</p>
            <p className="mt-6 flex items-baseline gap-1">
              <span className="v2-num text-[2.5rem] font-medium leading-none text-foreground">{formatUsd(plan.priceUsd)}</span>
              <span className="text-muted-foreground">/month</span>
            </p>
            <ul className="mt-6 space-y-2 border-t border-border pt-6 text-[0.9375rem] text-foreground">
              <li>Up to {plan.salesLimitLabel} in sales a month</li>
              <li>
                {plan.includedMembers} team members included, then {formatUsd(EXTRA_MEMBER_USD)} each
              </li>
              <li>Support replies: {plan.supportReplies.toLowerCase()}</li>
            </ul>
            {!compact && (
              <ul className="mt-6 space-y-2.5 text-[0.9375rem] text-foreground">
                {highlights(plan.id).map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-auto pt-8">
              <ButtonLink href={APP_SIGNUP_URL} variant={featured ? "primary" : "secondary"} className="w-full">
                Get started
              </ButtonLink>
            </div>
          </article>
        );
      })}
    </div>
    <div className="mt-4 flex flex-col gap-4 rounded-lg border border-border bg-muted p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="v2-h3 text-foreground">Enterprise</h3>
        <p className="mt-1 text-[0.9375rem] text-muted-foreground">{enterpriseLine()}</p>
      </div>
      <ButtonLink href={v2Path("/contact")} variant="secondary">
        Talk to us
      </ButtonLink>
    </div>
  </div>
);

export default PlanCards;
