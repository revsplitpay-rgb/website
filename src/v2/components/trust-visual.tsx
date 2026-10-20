import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, ArrowRight, Building2, CreditCard, Eye, KeyRound, Lock, ShieldCheck, Users } from "lucide-react";
import logo from "../../../LOGO BLUE.png";
import { trustPoints } from "../content/copy";
import { providerAccountNode } from "../content/providers";
import { EASE, Reveal } from "./motion";

const MONEY_NODES = [
  { icon: CreditCard, label: "Customer" },
  { icon: Building2, label: providerAccountNode() },
  { icon: Users, label: "Each payout account" },
];

/** Where money goes, and where RevSplitPay sits: instructions only, never funds. */
export const MoneyPath = () => {
  const reduced = useReducedMotion();
  return (
    <div className="v2-card relative overflow-hidden p-6 sm:p-10" role="img" aria-label={`Money moves from the customer to ${providerAccountNode()} to each payout account. RevSplitPay only sends the instructions.`}>
      <div className="v2-grid-bg absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative" aria-hidden="true">
        <div className="mx-auto flex w-fit items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_16px_36px_-18px_rgb(0_72_160/0.55)] ring-1 ring-[rgb(0_114_228/0.18)]">
          <img src={logo} alt="" className="h-8 w-8 rounded-lg" />
          <div>
            <p className="text-sm font-semibold text-foreground">RevSplitPay</p>
            <p className="text-xs text-muted-foreground">Works out every share and sends instructions</p>
          </div>
        </div>

        {/* Dashed instruction lines down to the provider. */}
        <div className="relative mx-auto h-14 w-px">
          <span className="absolute inset-0 border-l-2 border-dashed border-[rgb(0_114_228/0.35)]" />
          {!reduced && (
            <motion.span
              className="absolute -left-[4px] h-2.5 w-2.5 rounded-full bg-primary"
              animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
        <p className="mx-auto -mt-1 mb-3 w-fit rounded-full bg-[rgb(0_114_228/0.08)] px-3 py-1 font-mono text-[0.75rem] text-[rgb(var(--v2-deep))]">
          instructions only
        </p>

        <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {MONEY_NODES.map((node, index) => (
            <div key={node.label} className="contents">
              <motion.div
                className={cn(
                  "flex flex-col items-center gap-2.5 rounded-2xl bg-white px-3 py-4 text-center ring-1 ring-border",
                  index === 1 && "ring-2 ring-[rgb(0_114_228/0.35)]",
                )}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2, ease: EASE }}
              >
                <span className="v2-icon-tile h-9 w-9 shrink-0">
                  <node.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-foreground">{node.label}</span>
              </motion.div>
              {index < MONEY_NODES.length - 1 && (
                <span className="flex flex-col items-center justify-center text-[rgb(16_150_90)]">
                  <ArrowRight className="h-5 w-5 rotate-90 sm:rotate-0" />
                  <span className="font-mono text-[0.75rem] text-[rgb(4_120_87)]">money</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ICONS = [ShieldCheck, Lock, Eye, Activity, KeyRound];

export const TrustList = () => (
  <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
    {trustPoints.map((point, index) => {
      const Icon = ICONS[index % ICONS.length];
      return (
        <li key={point.title}>
          <Reveal delay={(index % 2) * 80} className="flex gap-4">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[rgb(0_114_228/0.08)] text-primary">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground">{point.title}</h3>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted-foreground">{point.text}</p>
            </div>
          </Reveal>
        </li>
      );
    })}
  </ul>
);
