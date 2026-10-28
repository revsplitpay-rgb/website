import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Check, FileText, Link2, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import { productRows } from "../content/copy";
import { invoiceExample } from "../content/examples";
import { LeaderboardExample, PayoutExample } from "./examples";
import { EASE, Reveal } from "./motion";
import { ExampleLabel, StatusPill } from "./ui";

const row = (id: string) => productRows.find((r) => r.id === id)!;

const ROLES = [
  { role: "Closer", share: 48, className: "bg-[rgb(var(--v2-deep))]" },
  { role: "Setter", share: 22, className: "bg-[rgb(var(--v2-highlight))]" },
  { role: "Partner", share: 16, className: "bg-[rgb(0_150_200)]" },
  { role: "Manager", share: 14, className: "bg-[rgb(90_110_220)]" },
];

/** Shares of the team's commission on one deal; illustrative proportions only. */
export const SplitVisual = () => {
  const reduced = useReducedMotion();
  return (
    <div className="rounded-2xl border border-border bg-[rgb(248_251_255)] p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">Team share of one sale</p>
        <ExampleLabel />
      </div>
      <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-muted" aria-hidden="true">
        {ROLES.map((item, index) => (
          <motion.span
            key={item.role}
            className={cn("h-full", item.className, index > 0 && "border-l-2 border-white")}
            initial={reduced ? false : { width: 0 }}
            whileInView={{ width: `${item.share}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 + index * 0.15, ease: EASE }}
          />
        ))}
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-2">
        {ROLES.map((item) => (
          <li key={item.role} className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2 ring-1 ring-border">
            <span className={cn("h-2.5 w-2.5 rounded-full", item.className)} aria-hidden="true" />
            <span className="text-sm text-foreground">{item.role}</span>
            <span className="v2-num ml-auto text-xs text-muted-foreground">{item.share}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PAY_TYPES = ["One-time", "Weekly", "Monthly", "Quarterly", "Annual", "Instalments", "Custom plan"];

const SCHEDULE = [
  { label: "Payment 1", when: "Paid Oct 1", status: "Paid" as const },
  { label: "Payment 2", when: "Due Nov 1", status: "Pending" as const },
  { label: "Payment 3", when: "Due Dec 1", status: "Pending" as const },
];

export const PayTypesVisual = () => (
  <div aria-hidden="true">
  <div className="flex flex-wrap gap-2">
    {PAY_TYPES.map((type, index) => (
      <span
        key={type}
        className={cn(
          "rounded-full border px-3.5 py-1.5 text-sm",
          index === 2
            ? "border-transparent bg-[linear-gradient(140deg,#3fc1ff,#0072e4)] text-white shadow-[0_8px_18px_-8px_rgb(0_114_228/0.7)]"
            : "border-border bg-white text-foreground",
        )}
      >
        {type}
      </span>
    ))}
  </div>
  <div className="mt-4 rounded-xl bg-white ring-1 ring-border">
    <p className="border-b border-border px-3.5 py-2 text-xs font-medium text-muted-foreground">Monthly plan · 3 payments</p>
    <ul className="divide-y divide-border">
      {SCHEDULE.map((row) => (
        <li key={row.label} className="flex items-center justify-between gap-3 px-3.5 py-2 text-sm">
          <span className="text-foreground">
            {row.label} <span className="whitespace-nowrap text-muted-foreground">· {row.when}</span>
          </span>
          <StatusPill status={row.status} />
        </li>
      ))}
    </ul>
  </div>
  </div>
);

const RECOVERY = [
  { icon: AlertTriangle, label: "Renewal failed", tone: "text-destructive bg-[rgb(var(--destructive)/0.1)]" },
  { icon: RefreshCw, label: "Retried automatically", tone: "text-[rgb(var(--v2-deep))] bg-[rgb(0_114_228/0.1)]" },
  { icon: Link2, label: "Customer sent a link", tone: "text-[rgb(var(--v2-deep))] bg-[rgb(0_114_228/0.1)]" },
  { icon: Check, label: "Paid, team paid again", tone: "text-[rgb(4_120_87)] bg-[rgb(16_160_110/0.12)]" },
];

export const RecoveryVisual = () => {
  const reduced = useReducedMotion();
  return (
    <ol className="space-y-2" aria-hidden="true">
      {RECOVERY.map((step, index) => (
        <motion.li
          key={step.label}
          className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 ring-1 ring-border"
          initial={reduced ? false : { opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 + index * 0.18, ease: EASE }}
        >
          <span className={cn("flex h-7 w-7 items-center justify-center rounded-lg", step.tone)}>
            <step.icon className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm text-foreground">{step.label}</span>
        </motion.li>
      ))}
    </ol>
  );
};

export const InvoiceVisual = () => (
  <div className="rounded-xl bg-white p-4 ring-1 ring-border" aria-hidden="true">
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgb(0_114_228/0.1)] text-primary">
        <FileText className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">Invoice from Setter</p>
        <p className="text-xs text-muted-foreground">Extra work · agreed bonus</p>
      </div>
      <span className="v2-num text-sm font-semibold text-foreground">{invoiceExample.amount}</span>
    </div>
    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[rgb(245_165_36/0.12)] px-2.5 py-0.5 text-xs font-medium text-[rgb(146_92_0)]">
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      Awaiting approval
    </p>
    <div className="mt-4 flex gap-2">
      <span className="flex-1 rounded-full bg-[linear-gradient(180deg,#1a86f0,#0063c7)] py-2 text-center text-xs font-medium text-white">Approve and pay</span>
      <span className="rounded-full px-3 py-2 text-xs font-medium text-muted-foreground ring-1 ring-border">Reject</span>
    </div>
    <p className="mt-3 text-xs text-muted-foreground">No RevSplitPay fee on invoices</p>
  </div>
);

type Fill = "white" | "blue" | "grid" | "mesh";

const FILL: Record<Fill, string> = {
  white: "",
  blue: "bg-[linear-gradient(160deg,#eef6ff_0%,#ffffff_60%)]",
  grid: "bg-[linear-gradient(rgb(0_88_184/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(0_88_184/0.05)_1px,transparent_1px)] [background-size:28px_28px]",
  mesh: "bg-[radial-gradient(ellipse_70%_60%_at_100%_0%,rgb(63_193_255/0.16),transparent_70%),radial-gradient(ellipse_60%_60%_at_0%_100%,rgb(0_114_228/0.1),transparent_70%)]",
};

const Card = ({
  title,
  text,
  visual,
  className,
  delay = 0,
  wide = false,
  fill = "white",
}: {
  title: string;
  text: string;
  visual: ReactNode;
  className?: string;
  delay?: number;
  wide?: boolean;
  fill?: Fill;
}) => (
  <Reveal delay={delay} className={className}>
    <article
      className={cn(
        "v2-card v2-card-hover flex h-full flex-col overflow-hidden p-6 lg:p-7",
        FILL[fill],
        wide && "lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-10 lg:p-8",
      )}
    >
      <div>
        <h3 className="text-[1.25rem] font-semibold leading-tight tracking-tight text-foreground">{title}</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{text}</p>
      </div>
      <div className={cn("mt-6 flex flex-col", wide && "lg:mt-0")}>{visual}</div>
    </article>
  </Reveal>
);

const ProductBento = () => (
  <div className="mt-12 grid gap-4 lg:grid-cols-6">
    <Card className="lg:col-span-3" fill="blue" title={row("commissions").title} text={row("commissions").text} visual={<SplitVisual />} />
    <Card className="lg:col-span-3" delay={80} title={row("payouts").title} text={row("payouts").text} visual={<PayoutExample limit={3} />} />
    <Card className="lg:col-span-2" delay={0} fill="grid" title={row("payment-types").title} text={row("payment-types").text} visual={<PayTypesVisual />} />
    <Card className="lg:col-span-2" delay={80} title={row("recovery").title} text={row("recovery").text} visual={<RecoveryVisual />} />
    <Card className="lg:col-span-2" delay={160} fill="mesh" title={row("invoices").title} text={row("invoices").text} visual={<InvoiceVisual />} />
    <Card className="lg:col-span-6" wide fill="blue" title={row("rewards").title} text={row("rewards").text} visual={<LeaderboardExample />} />
  </div>
);

export default ProductBento;
