import { HOLD_DAYS } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowDownLeft,
  BadgeCheck,
  Bell,
  CircleDollarSign,
  FileText,
  RefreshCw,
  Repeat,
  Send,
  ShieldCheck,
  Trophy,
  Undo2,
} from "lucide-react";
import { formatCents, split } from "../lib/split";
import { EASE, RollingNumber } from "./motion";
import { ExampleLabel, StatusPill } from "./ui";

// Illustrative hero deal. Numbers are computed with the same split math as the
// calculator so the picture can never disagree with the product.
const SALE_CENTS = 5_000 * 100;
const deal = split(SALE_CENTS, [
  { role: "Closer", bp: 1_000 },
  { role: "Setter", bp: 500 },
]);
const shares = deal.ok ? deal.value.participants : [];
const ownerCents = deal.ok ? deal.value.ownerCents : SALE_CENTS;
const closer = shares[0];

const SEGMENTS = [
  { label: "Closer", bp: 1_000, className: "bg-[rgb(var(--v2-deep))]" },
  { label: "Setter", bp: 500, className: "bg-[rgb(var(--v2-highlight))]" },
  { label: "You", bp: 10_000 - 1_500, className: "bg-[linear-gradient(90deg,#0072e4,#5cc8ff)]" },
];

const HOLD_DONE_DAYS = HOLD_DAYS - 2;
const LOOP_MS = 7000;
const SETTER_PAID_MS = 3600;

/** Replays the deal every few seconds: count up, split fills, setter gets paid. */
const useDealLoop = (enabled: boolean) => {
  const [cycle, setCycle] = useState(0);
  const [setterPaid, setSetterPaid] = useState(!enabled);
  useEffect(() => {
    if (!enabled) return;
    const loop = window.setInterval(() => setCycle((n) => n + 1), LOOP_MS);
    return () => window.clearInterval(loop);
  }, [enabled]);
  useEffect(() => {
    if (!enabled) return;
    setSetterPaid(false);
    const paid = window.setTimeout(() => setSetterPaid(true), SETTER_PAID_MS);
    return () => window.clearTimeout(paid);
  }, [cycle, enabled]);
  return { cycle, setterPaid };
};

const DealCard = () => {
  const reduced = useReducedMotion();
  const { cycle, setterPaid } = useDealLoop(!reduced);
  return (
    <div className="v2-card v2-ledger-shadow overflow-hidden text-left">
      <div className="flex items-center justify-between border-b border-border bg-[rgb(244_248_255)] px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[rgb(255_95_87)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[rgb(254_188_46)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[rgb(40_200_64)]" />
          </span>
          <span className="text-sm font-medium text-foreground">Deal · Coaching program</span>
        </div>
        <ExampleLabel />
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Customer paid</p>
            <p className="v2-num mt-1 text-[2rem] font-medium leading-none tracking-tight text-foreground sm:text-[2.25rem]">
              <RollingNumber key={cycle} value={SALE_CENTS} format={formatCents} />
            </p>
          </div>
          <StatusPill status="Paid" />
        </div>

        <div className="mt-6">
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
            {SEGMENTS.map((segment, index) => (
              <motion.span
                key={`${segment.label}-${cycle}`}
                className={cn("h-full", segment.className, index > 0 && "border-l-2 border-white")}
                initial={reduced ? false : { width: 0 }}
                animate={{ width: `${segment.bp / 100}%` }}
                transition={{ duration: 1.1, delay: (cycle === 0 ? 0.7 : 0.3) + index * 0.28, ease: EASE }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Split automatically at checkout</span>
            <span className="v2-num">{shares.length + 1} people</span>
          </div>
        </div>

        <ul className="mt-5 divide-y divide-border rounded-2xl border border-border">
          {shares.map((share, index) => (
            <li key={share.role} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white",
                    index === 0 ? "bg-[rgb(var(--v2-deep))]" : "bg-[rgb(var(--v2-highlight))]",
                  )}
                  aria-hidden="true"
                >
                  {share.role[0]}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{share.role}</p>
                  <p className="v2-num whitespace-nowrap text-xs text-muted-foreground">{share.bp / 100}% · fee {formatCents(share.feeCents)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="v2-num text-sm font-medium text-foreground">{formatCents(share.netCents)}</span>
                <StatusPill status={index === 0 || setterPaid ? "Paid" : "Pending"} />
              </div>
            </li>
          ))}
          <li className="flex items-center justify-between gap-3 bg-[rgb(244_248_255)] px-4 py-3">
            <div>
              <p className="text-sm font-medium text-foreground">You keep</p>
              <p className="text-xs text-muted-foreground">Owner share · no fee</p>
            </div>
            <span className="v2-num text-base font-semibold text-foreground">{formatCents(ownerCents)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const FloatCard = ({ className, children, delay }: { className?: string; children: ReactNode; delay: number }) => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn("absolute z-20 hidden xl:block", className)}
      initial={reduced ? false : { opacity: 0, y: 24, scale: 0.94, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
};

/** Animated glow strokes either side of the hero, in the spirit of V1. */
const GlowStrokes = ({ side }: { side: "left" | "right" }) => {
  const reduced = useReducedMotion();
  const paths =
    side === "left"
      ? ["M0 60 H120 C160 60 170 110 210 110 H330", "M0 150 H90 C130 150 150 200 190 200 H330", "M0 250 H150 C190 250 200 210 240 210 H330"]
      : ["M330 70 H210 C170 70 160 120 120 120 H0", "M330 170 H240 C200 170 180 220 140 220 H0", "M330 260 H180 C140 260 130 220 90 220 H0"];
  const id = `v2-stroke-${side}`;
  return (
    <svg
      viewBox="0 0 330 300"
      className={cn("pointer-events-none absolute top-24 hidden w-[330px] lg:block", side === "left" ? "left-0" : "right-0")}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1={side === "left" ? "0" : "1"} x2={side === "left" ? "1" : "0"} y1="0" y2="0">
          <stop offset="0" stopColor="#3fc1ff" stopOpacity="0" />
          <stop offset="0.6" stopColor="#0072e4" stopOpacity="0.55" />
          <stop offset="1" stopColor="#3fc1ff" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {paths.map((d, index) => (
        <g key={d}>
          <path d={d} fill="none" stroke="rgb(0 88 184 / 0.08)" strokeWidth="1.5" />
          <motion.path
            d={d}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.4 + index * 0.25, ease: EASE }}
          />
          {!reduced && (
            <circle r="2.5" fill="#3fc1ff">
              <animateMotion dur={`${4 + index}s`} repeatCount="indefinite" path={d} begin={`${1.5 + index * 0.6}s`} />
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
};

export const HeroVisual = () => (
  <div className="relative mx-auto mt-16 w-full max-w-[1100px] md:mt-20">
    <div className="absolute inset-x-[15%] -top-10 bottom-0 -z-10 rounded-[48px] bg-[radial-gradient(closest-side,rgb(0_114_228/0.22),transparent)] blur-2xl" aria-hidden="true" />

    <FloatCard className="left-0 top-10 w-[224px]" delay={1.1}>
      <div className="v2-glass v2-float rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <span className="v2-icon-tile h-9 w-9">
            <Send className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Payout sent</p>
            <p className="v2-num text-base font-semibold text-foreground">+{closer ? formatCents(closer.netCents) : ""}</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">To the closer's own payout account</p>
      </div>
    </FloatCard>

    <FloatCard className="right-0 top-44 w-[224px]" delay={1.3}>
      <div className="v2-glass v2-float-slow rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-foreground">{HOLD_DAYS}-day safety hold</p>
          <ShieldCheck className="h-4 w-4 text-primary" />
        </div>
        <div className="mt-3 flex gap-1" aria-hidden="true">
          {Array.from({ length: HOLD_DAYS }, (_, day) => (
            <span
              key={day}
              className={cn("h-1.5 flex-1 rounded-full", day < HOLD_DONE_DAYS ? "bg-primary" : "bg-[rgb(0_114_228/0.15)]")}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Day {HOLD_DONE_DAYS} of {HOLD_DAYS} · refunds covered first
        </p>
      </div>
    </FloatCard>

    <FloatCard className="bottom-6 right-6 w-[200px]" delay={1.5}>
      <div className="v2-glass v2-float-slow flex items-center gap-3 rounded-2xl p-3.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(140deg,#ffd76a,#f5a524)] text-white shadow-[0_8px_18px_-8px_rgb(245_165_36/0.8)]">
          <Trophy className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs text-muted-foreground">Tier unlocked</p>
          <p className="text-sm font-semibold text-foreground">Gold · Closer</p>
        </div>
      </div>
    </FloatCard>

    <motion.div
      initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
      transition={{ duration: 1, delay: 0.45, ease: EASE }}
      className="mx-auto max-w-[600px]"
    >
      <DealCard />
    </motion.div>
  </div>
);

export const HeroStrokes = () => (
  <>
    <GlowStrokes side="left" />
    <GlowStrokes side="right" />
  </>
);

const ACTIVITY = [
  { icon: CircleDollarSign, title: "Sale recorded", text: "Checkout link paid in full" },
  { icon: BadgeCheck, title: "Commission split", text: "Closer, setter and partner" },
  { icon: Send, title: "Payout sent", text: "Straight to their own account" },
  { icon: Repeat, title: "Renewal paid", text: "The team is paid again" },
  { icon: Undo2, title: "Refund handled", text: "Commissions adjusted" },
  { icon: RefreshCw, title: "Payment retried", text: "Customer sent a link to pay" },
  { icon: FileText, title: "Invoice approved", text: "Paid in one click" },
  { icon: Trophy, title: "Award given", text: "Bonus for hitting the goal" },
  { icon: Bell, title: "Team notified", text: "Posted to your Slack channel" },
  { icon: ArrowDownLeft, title: "Deal closed", text: "Everyone on it is recorded" },
];

/** Endless strip of product events, like V1's ticker. Pauses on hover. */
export const ActivityMarquee = () => (
  <div className="v2-fade-x relative mt-16 overflow-hidden md:mt-24" aria-hidden="true">
    <div className="v2-marquee flex w-max gap-4 py-2">
      {[...ACTIVITY, ...ACTIVITY].map((item, index) => (
        <div key={index} className="v2-card flex w-[260px] shrink-0 items-center gap-3 rounded-2xl px-4 py-3.5">
          <span className="v2-icon-tile h-9 w-9 shrink-0">
            <item.icon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">{item.title}</p>
            <p className="truncate text-xs text-muted-foreground">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
