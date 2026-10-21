import { HOLD_DAYS } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Send, ShieldCheck, Trophy } from "lucide-react";
import { formatCents, split } from "../lib/split";
import { INTEGRATION_LOGOS, WEBHOOK_TOOL_LOGOS, paymentProviderLogos } from "../content/logos";
import { providerPhrase } from "../content/providers";
import { v2Path } from "../lib/paths";
import { EASE, Reveal, RollingNumber } from "./motion";
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
const LOOP_MS = 8000;
// Moments inside each loop, in ms from the start of the cycle.
const AT = { closerPaid: 2200, setterPaid: 3700, settled: 4500 } as const;

type Phase = { cycle: number; closerPaid: boolean; setterPaid: boolean; settled: boolean };

/** One deal, replayed every few seconds: count up, split, closer paid, setter paid, settled. */
const useDealLoop = (enabled: boolean): Phase => {
  const [cycle, setCycle] = useState(0);
  const [step, setStep] = useState(enabled ? 0 : 3);
  useEffect(() => {
    if (!enabled) return;
    const loop = window.setInterval(() => setCycle((n) => n + 1), LOOP_MS);
    return () => window.clearInterval(loop);
  }, [enabled]);
  useEffect(() => {
    if (!enabled) return;
    setStep(0);
    const timers = [AT.closerPaid, AT.setterPaid, AT.settled].map((ms, i) => window.setTimeout(() => setStep(i + 1), ms));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [cycle, enabled]);
  return { cycle, closerPaid: step >= 1, setterPaid: step >= 2, settled: step >= 3 };
};

/** Status pill that pops when its status changes. */
const LivePill = ({ status }: { status: "Paid" | "Pending" }) => {
  const reduced = useReducedMotion();
  return (
    <motion.span
      key={status}
      initial={reduced ? false : { scale: 0.6, opacity: 0 }}
      animate={{ scale: [0.6, 1.12, 1], opacity: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="inline-flex"
    >
      <StatusPill status={status} />
    </motion.span>
  );
};

const DealCard = ({ phase }: { phase: Phase }) => {
  const reduced = useReducedMotion();
  const { cycle } = phase;
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
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgb(16_160_110/0.1)] px-2 py-0.5 text-xs font-medium text-[rgb(4_120_87)]">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="v2-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[rgb(16_160_110)]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[rgb(16_160_110)]" />
            </span>
            Live
          </span>
          <ExampleLabel />
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Customer paid</p>
            <p className="v2-num mt-1 text-[2rem] font-medium leading-none tracking-tight text-foreground sm:text-[2.25rem]">
              <RollingNumber key={cycle} value={SALE_CENTS} format={formatCents} />
            </p>
          </div>
          <LivePill status="Paid" />
        </div>

        <div className="mt-6">
          <div className="relative flex h-3 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
            {SEGMENTS.map((segment, index) => (
              <motion.span
                key={`${segment.label}-${cycle}`}
                className={cn("h-full", segment.className, index > 0 && "border-l-2 border-white")}
                initial={reduced ? false : { width: 0 }}
                animate={{ width: `${segment.bp / 100}%` }}
                transition={{ duration: 1.1, delay: (cycle === 0 ? 0.7 : 0.3) + index * 0.28, ease: EASE }}
              />
            ))}
            {!reduced && (
              <motion.span
                key={`sweep-${cycle}`}
                className="absolute inset-y-0 w-1/4 bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.75),transparent)]"
                initial={{ left: "-30%" }}
                animate={{ left: "110%" }}
                transition={{ duration: 1.2, delay: 1.6, ease: "easeInOut" }}
              />
            )}
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Split automatically at checkout</span>
            <span className="v2-num">{shares.length + 1} people</span>
          </div>
        </div>

        <ul className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border">
          {shares.map((share, index) => {
            const paid = index === 0 ? phase.closerPaid : phase.setterPaid;
            return (
              <motion.li
                key={`${share.role}-${cycle}`}
                className={cn(
                  "flex items-center justify-between gap-3 px-4 py-3 transition-colors duration-500",
                  paid && "bg-[rgb(16_160_110/0.04)]",
                )}
                initial={reduced ? false : { opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.18, ease: EASE }}
              >
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
                    <p className="v2-num whitespace-nowrap text-xs text-muted-foreground">
                      {share.bp / 100}% · fee {formatCents(share.feeCents)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="v2-num text-sm font-medium text-foreground">
                    <RollingNumber key={cycle} value={share.netCents} format={formatCents} />
                  </span>
                  <LivePill status={paid ? "Paid" : "Pending"} />
                </div>
              </motion.li>
            );
          })}
          <li
            className={cn(
              "relative flex items-center justify-between gap-3 px-4 py-3 transition-colors duration-700",
              phase.settled ? "bg-[linear-gradient(90deg,rgb(0_114_228/0.1),rgb(63_193_255/0.08))]" : "bg-[rgb(244_248_255)]",
            )}
          >
            <div>
              <p className="text-sm font-medium text-foreground">You keep</p>
              <p className="text-xs text-muted-foreground">Owner share · no fee</p>
            </div>
            <span className={cn("v2-num text-base font-semibold", phase.settled ? "v2-gradient-text" : "text-foreground")}>
              <RollingNumber key={cycle} value={ownerCents} format={formatCents} />
            </span>
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

/** A small bounce each time `trigger` flips to true. */
const Bump = ({ trigger, children }: { trigger: boolean; children: ReactNode }) => {
  const reduced = useReducedMotion();
  return (
    <motion.div animate={trigger && !reduced ? { scale: [1, 1.06, 1] } : { scale: 1 }} transition={{ duration: 0.5, ease: EASE }}>
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

export const HeroVisual = () => {
  const reduced = useReducedMotion();
  const phase = useDealLoop(!reduced);
  const holdDays = phase.settled ? HOLD_DONE_DAYS : phase.setterPaid ? HOLD_DONE_DAYS - 1 : phase.closerPaid ? 2 : 1;
  return (
    <div className="relative mx-auto mt-16 w-full max-w-[1100px] md:mt-20">
      <div className="absolute inset-x-[15%] -top-10 bottom-0 -z-10 rounded-[48px] bg-[radial-gradient(closest-side,rgb(0_114_228/0.22),transparent)] blur-2xl" aria-hidden="true" />

      <FloatCard className="left-0 top-10 w-[224px]" delay={1.1}>
        <Bump trigger={phase.closerPaid}>
          <div className="v2-glass v2-float rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <span className="relative">
                {phase.closerPaid && !reduced && (
                  <span key={phase.cycle} className="v2-pulse-ring absolute inset-0 rounded-xl bg-[rgb(0_114_228/0.4)] [animation-iteration-count:1]" />
                )}
                <span className="v2-icon-tile relative h-9 w-9">
                  <Send className="h-4 w-4" />
                </span>
              </span>
              <div>
                <p className="text-xs text-muted-foreground">{phase.closerPaid ? "Payout sent" : "Payout queued"}</p>
                <p className="v2-num text-base font-semibold text-foreground">+{closer ? formatCents(closer.netCents) : ""}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">To the closer's own payout account</p>
          </div>
        </Bump>
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
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors duration-500",
                  day < holdDays ? "bg-primary" : "bg-[rgb(0_114_228/0.15)]",
                )}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Day <span className="v2-num">{holdDays}</span> of {HOLD_DAYS} · refunds covered first
          </p>
        </div>
      </FloatCard>

      <FloatCard className="bottom-6 right-6 w-[200px]" delay={1.5}>
        <Bump trigger={phase.settled}>
          <div className="v2-glass v2-float-slow flex items-center gap-3 rounded-2xl p-3.5">
            <motion.span
              key={phase.settled ? `on-${phase.cycle}` : "off"}
              initial={reduced ? false : { rotate: -20, scale: 0.7 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(140deg,#ffd76a,#f5a524)] text-white shadow-[0_8px_18px_-8px_rgb(245_165_36/0.8)]"
            >
              <Trophy className="h-4 w-4" />
            </motion.span>
            <div>
              <p className="text-xs text-muted-foreground">Tier unlocked</p>
              <p className="text-sm font-semibold text-foreground">Gold · Closer</p>
            </div>
          </div>
        </Bump>
      </FloatCard>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 48, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
        transition={{ duration: 1, delay: 0.45, ease: EASE }}
        className="mx-auto max-w-[600px]"
      >
        <DealCard phase={phase} />
      </motion.div>
    </div>
  );
};

export const HeroStrokes = () => (
  <>
    <GlowStrokes side="left" />
    <GlowStrokes side="right" />
  </>
);

const PROVIDER_CAPTIONS: Record<string, string> = {
  Stripe: "Card payments, and payouts to each rep's own account",
  Whop: "Payments and payouts for businesses selling on Whop",
};

/**
 * Under the hero: the payment providers first, large and in colour, then the
 * tools events reach (Slack natively, the rest through custom webhooks) as a
 * slow greyscale marquee that colours on hover.
 */
export const LogoStrip = () => {
  const providers = paymentProviderLogos();
  const tools = [INTEGRATION_LOGOS.slack!, ...WEBHOOK_TOOL_LOGOS];
  return (
    <div className="relative mt-16 md:mt-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--v2-deep))]">Payment providers</p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-foreground md:text-xl">
              Take payments and pay your team on {providerPhrase()}.
            </p>
          </div>
        </Reveal>
        <ul className={cn("mx-auto mt-6 grid gap-4", providers.length > 1 ? "max-w-[760px] sm:grid-cols-2" : "max-w-[380px]")}>
          {providers.map((mark, index) => (
            <li key={mark.name}>
              <Reveal delay={index * 100}>
                <Link
                  to={v2Path(`/integrations/${mark.name.toLowerCase()}`)}
                  className="v2-card v2-card-hover group flex h-32 flex-col items-center justify-center gap-3 px-6 text-center"
                >
                  <img src={mark.src} alt={mark.name} style={{ height: Math.round(mark.height * 1.45) }} className="w-auto" />
                  <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                    {PROVIDER_CAPTIONS[mark.name]}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal>
          <p className="mt-12 text-center text-sm text-muted-foreground">
            Events reach the tools your team already uses: Slack, or anything through webhooks.
          </p>
        </Reveal>
      </div>
      <div className="v2-fade-x mt-6 overflow-hidden" aria-label="Connected tools">
        <ul className="v2-marquee flex w-max items-center gap-6 py-2 [animation-duration:36s]">
          {[...tools, ...tools, ...tools, ...tools, ...tools, ...tools].map((mark, index) => (
            <li
              key={`${mark.name}-${index}`}
              aria-hidden={index >= tools.length ? true : undefined}
              className="group flex h-20 w-[200px] shrink-0 items-center justify-center rounded-2xl bg-white/70 ring-1 ring-[rgb(0_114_228/0.08)] transition-all duration-300 hover:bg-white hover:shadow-[0_16px_32px_-18px_rgb(0_72_160/0.45)]"
            >
              <img
                src={mark.src}
                alt={index < tools.length ? mark.name : ""}
                style={{ height: mark.height }}
                className="w-auto opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
