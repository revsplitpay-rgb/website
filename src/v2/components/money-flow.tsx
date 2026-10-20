import { HOLD_DAYS } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, CreditCard, ShieldCheck, Users } from "lucide-react";
import { providerAccountNode } from "../content/providers";
import { EASE } from "./motion";

const PULSE_SECONDS = 3.2;

/**
 * Customer → business account → hold → payout accounts. RevSplitPay never holds
 * the money. `onBlue` renders it for the saturated blue band.
 */
const MoneyFlow = ({ onBlue = false }: { onBlue?: boolean }) => {
  const reduced = useReducedMotion();
  const nodes = [
    { icon: CreditCard, title: "Customer pays", text: "Card, subscription or instalment" },
    { icon: Building2, title: providerAccountNode(), text: "The money lands with your business" },
    { icon: ShieldCheck, title: `${HOLD_DAYS}-day safety hold`, text: "Refunds and chargebacks handled first" },
    { icon: Users, title: "Each person's payout account", text: "Every share paid automatically" },
  ];
  const sentence = `${nodes.map((node) => node.title).join(", then ")}.`;

  return (
    <figure className="mt-14" aria-label={`How money moves: ${sentence}`}>
      <div className="relative">
        {/* Connector: drawn on scroll, then pulses keep travelling along it. */}
        <div className="absolute left-[12.5%] right-[12.5%] top-12 hidden h-px md:block" aria-hidden="true">
          <div className={cn("absolute inset-0", onBlue ? "bg-white/20" : "bg-[rgb(0_114_228/0.12)]")} />
          <motion.div
            className={cn("absolute inset-y-0 left-0", onBlue ? "bg-white/70" : "bg-[linear-gradient(90deg,#3fc1ff,#0072e4)]")}
            initial={reduced ? false : { width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          {!reduced &&
            [0, 1].map((n) => (
              <motion.span
                key={n}
                className="absolute -top-[3px] h-[7px] w-20 rounded-full bg-[linear-gradient(90deg,transparent,#9fe2ff,#ffffff)] blur-[1px]"
                initial={{ left: "-10%", opacity: 0 }}
                animate={{ left: ["-10%", "100%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: PULSE_SECONDS, repeat: Infinity, delay: 1.4 + n * (PULSE_SECONDS / 2), ease: "easeInOut" }}
              />
            ))}
        </div>

        <ol className="relative grid gap-5 md:grid-cols-4 md:gap-6" aria-hidden="true">
          {nodes.map((node, index) => (
            <motion.li
              key={node.title}
              className="flex items-start gap-4 md:flex-col md:items-center md:text-center"
              initial={reduced ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: index * 0.18, ease: EASE }}
            >
              <span
                className={cn(
                  "relative flex h-20 w-20 shrink-0 items-center justify-center rounded-[22px] md:h-24 md:w-24 md:rounded-[26px]",
                  onBlue
                    ? "bg-white shadow-[0_20px_40px_-16px_rgb(0_20_80/0.6)]"
                    : "bg-white shadow-[0_12px_30px_-14px_rgb(0_72_160/0.45)] ring-1 ring-[rgb(0_114_228/0.14)]",
                )}
              >
                <span className="v2-icon-tile h-12 w-12 md:h-14 md:w-14">
                  <node.icon className="h-5 w-5 md:h-6 md:w-6" />
                </span>
                <span
                  className={cn(
                    "v2-num absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full text-[0.75rem] font-semibold",
                    onBlue ? "bg-[rgb(10_40_120)] text-white" : "bg-foreground text-white",
                  )}
                >
                  {index + 1}
                </span>
              </span>
              <div>
                <p className={cn("text-base font-semibold", onBlue ? "text-white" : "text-foreground")}>{node.title}</p>
                <p className={cn("mt-1 text-sm", onBlue ? "text-white/90" : "text-muted-foreground")}>{node.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
      <figcaption className={cn("mx-auto mt-12 max-w-[60ch] text-center text-[0.9375rem] font-semibold", onBlue ? "text-white" : "text-foreground")}>
        RevSplitPay tells your payment provider who gets paid. It never holds your money.
      </figcaption>
    </figure>
  );
};

export default MoneyFlow;
