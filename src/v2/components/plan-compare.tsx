import { APP_SIGNUP_URL } from "@/lib/links";
import { EXTRA_MEMBER_USD, PLANS, PLAN_FEATURES, formatUsd, type Plan, type PlanId } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { Check, Minus, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { goalExamples } from "../content/examples";
import { Reveal } from "./motion";
import { ButtonLink } from "./ui";

// "The differences" (owner, 2026-10-21): only what changes between plans, in
// plain words. Availability comes from PLAN_FEATURES so it can't drift.
const has = (label: string, id: PlanId) => Boolean(PLAN_FEATURES.find((row) => row.label === label)?.plans[id]);

type Cell = ReactNode;
interface Row {
  label: string;
  hint?: string;
  cell: (plan: Plan) => Cell;
}

const yes = (on: boolean) => (on ? "yes" : "no");

const GROUPS: { title: string; rows: Row[] }[] = [
  {
    title: "Limits",
    rows: [
      { label: "Sales a month", cell: (p) => <span className="v2-num">Up to {p.salesLimitLabel}</span> },
      { label: "Team members included", cell: (p) => <span className="v2-num">{p.includedMembers}</span> },
      { label: "Each extra member", cell: () => <span className="v2-num">{formatUsd(EXTRA_MEMBER_USD)}/mo</span> },
    ],
  },
  {
    title: "Motivation tools",
    rows: [
      { label: "Automatic bonuses when a rep hits a goal", hint: goalExamples.awardRule, cell: (p) => yes(has("Award rules (automatic bonuses)", p.id)) },
      { label: "Higher commission when a rep hits a goal", hint: goalExamples.boost, cell: (p) => yes(has("Commission boosts", p.id)) },
      { label: "Goal tracker reps can see", hint: "Progress toward those goals", cell: (p) => yes(has("Goal tracker for reps", p.id)) },
    ],
  },
  {
    title: "Support",
    rows: [
      { label: "Private Slack channel with our team", cell: (p) => yes(has("Private Slack channel with our team", p.id)) },
      { label: "One-time personal setup call", cell: (p) => yes(has("Personal setup call (one-time)", p.id)) },
      {
        label: "Support response time",
        cell: (p) =>
          has("Priority support", p.id) ? (
            <span className="font-medium text-[rgb(var(--v2-deep))]">Priority · {p.supportReplies.toLowerCase()}</span>
          ) : (
            p.supportReplies
          ),
      },
    ],
  },
  {
    title: "At your sales limit",
    rows: [
      {
        label: "When you hit the monthly sales limit",
        cell: (p) =>
          p.id === "scale" ? (
            <span className="font-medium text-[rgb(var(--v2-deep))]">Never pauses · we talk Enterprise</span>
          ) : (
            "New deals pause until you upgrade"
          ),
      },
    ],
  },
];

const EVERY_PLAN = PLAN_FEATURES.filter((row) => PLANS.every((plan) => row.plans[plan.id])).map((row) => row.label);

const Mark = ({ value }: { value: Cell }) => {
  if (value === "yes")
    return (
      <span
        className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-[linear-gradient(140deg,#3fc1ff,#0072e4)] text-white shadow-[0_6px_14px_-6px_rgb(0_114_228/0.7)]"
      >
        <Check className="h-4 w-4" aria-label="Included" />
      </span>
    );
  if (value === "no")
    return (
      <span className="mx-auto flex h-7 w-7 items-center justify-center text-[rgb(var(--input))]">
        <Minus className="h-4 w-4" aria-label="Not included" />
      </span>
    );
  return <span className="text-[0.9375rem] text-foreground">{value}</span>;
};

const featuredCol = "bg-[rgb(0_114_228/0.045)]";

/** Desktop: one table with a highlighted Growth column. */
const CompareTable = () => (
  <div className="v2-card hidden overflow-hidden md:block">
    <table className="w-full table-fixed text-left">
      <colgroup>
        <col className="w-[34%]" />
        {PLANS.map((plan) => (
          <col key={plan.id} />
        ))}
      </colgroup>
      <thead>
        <tr>
          <th scope="col" className="p-6 align-bottom">
            <span className="text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">Compare plans</span>
          </th>
          {PLANS.map((plan) => {
            const featured = Boolean(plan.badge);
            return (
              <th
                key={plan.id}
                scope="col"
                className={cn("relative px-5 pb-6 pt-8 text-center align-bottom", featured && featuredCol)}
              >
                {featured && (
                  <>
                    <span className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#3fc1ff,#0072e4)]" aria-hidden="true" />
                    <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-[linear-gradient(140deg,#3fc1ff,#0072e4)] px-2.5 py-0.5 text-xs font-medium text-white">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      {plan.badge}
                    </span>
                  </>
                )}
                <span className="block text-lg font-semibold tracking-tight text-foreground">{plan.name}</span>
                <span className="mt-1 block">
                  <span className={cn("v2-num text-3xl font-semibold tracking-tight", featured ? "v2-gradient-text" : "text-foreground")}>
                    {formatUsd(plan.priceUsd)}
                  </span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </span>
                <ButtonLink href={APP_SIGNUP_URL} variant={featured ? "primary" : "secondary"} className="mt-4 min-h-10 w-full px-4 text-sm">
                  Get started
                </ButtonLink>
              </th>
            );
          })}
        </tr>
      </thead>
      {GROUPS.map((group) => (
        <tbody key={group.title}>
          <tr>
            <th
              colSpan={PLANS.length + 1}
              scope="colgroup"
              className="border-t border-border bg-[rgb(248_251_255)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[rgb(var(--v2-deep))]"
            >
              {group.title}
            </th>
          </tr>
          {group.rows.map((row) => (
            <tr key={row.label} className="border-t border-border transition-colors hover:bg-[rgb(0_114_228/0.025)]">
              <th scope="row" className="px-6 py-4 align-middle font-normal">
                <span className="block text-[0.9375rem] font-medium text-foreground">{row.label}</span>
                {row.hint && <span className="mt-0.5 block font-mono text-xs text-muted-foreground">{row.hint}</span>}
              </th>
              {PLANS.map((plan) => (
                <td key={plan.id} className={cn("px-5 py-4 text-center align-middle", plan.badge && featuredCol)}>
                  <Mark value={row.cell(plan)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      ))}
    </table>
  </div>
);

/** Phone: one card per plan with the same rows. */
const CompareCards = () => (
  <div className="space-y-4 md:hidden">
    {PLANS.map((plan) => {
      const featured = Boolean(plan.badge);
      return (
        <div key={plan.id} className={cn("v2-card overflow-hidden", featured && "ring-2 ring-primary")}>
          <div className={cn("flex items-center justify-between px-5 py-4", featured ? "bg-[rgb(0_114_228/0.06)]" : "bg-[rgb(248_251_255)]")}>
            <p className="text-lg font-semibold text-foreground">
              {plan.name} <span className="v2-num text-base font-medium text-muted-foreground">{formatUsd(plan.priceUsd)}/mo</span>
            </p>
            {plan.badge && <span className="text-xs font-medium text-primary">{plan.badge}</span>}
          </div>
          <dl className="divide-y divide-border">
            {GROUPS.flatMap((group) => group.rows).map((row) => {
              const value = row.cell(plan);
              const isMark = value === "yes" || value === "no";
              return (
                <div
                  key={row.label}
                  className={cn("flex gap-4 px-5 py-3", isMark ? "items-center justify-between" : "flex-col items-start gap-1")}
                >
                  <dt className="text-sm text-foreground">{row.label}</dt>
                  <dd className={cn("text-sm", isMark ? "shrink-0 text-right" : "font-medium text-foreground")}>
                    {value === "yes" ? (
                      <Check className="h-4 w-4 text-primary" aria-label="Included" />
                    ) : value === "no" ? (
                      <Minus className="h-4 w-4 text-[rgb(var(--input))]" aria-label="Not included" />
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      );
    })}
  </div>
);

const PlanCompare = () => (
  <Reveal>
    <CompareTable />
    <CompareCards />
    <div className="v2-card mt-5 flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:gap-8">
      <p className="shrink-0 text-sm font-semibold uppercase tracking-[0.12em] text-[rgb(var(--v2-deep))]">On every plan</p>
      <ul className="flex flex-wrap gap-2">
        {EVERY_PLAN.map((label) => (
          <li key={label} className="inline-flex items-center gap-1.5 rounded-full bg-[rgb(0_114_228/0.06)] px-3 py-1.5 text-sm text-foreground">
            <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  </Reveal>
);

export default PlanCompare;
