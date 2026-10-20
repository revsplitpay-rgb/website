import { HOLD_DAYS } from "@/lib/pricing";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { providerAccountNode } from "../content/providers";

const FLOW_PASS_MS = 1600;
// Dot positions across the four nodes, as a share of the strip width.
const DOT_STOPS = [0, 33, 66, 97].map((n) => `${n}%`);

/** Customer → business account → hold → payout accounts. RevSplitPay never holds the money. */
const MoneyFlow = () => {
  const reduced = useReducedMotion();
  const nodes = ["Customer pays", providerAccountNode(), `${HOLD_DAYS}-day safety hold`, "Each person's payout account"];
  const sentence = `${nodes.join(", then ")}.`;

  return (
    <figure className="mt-12" aria-label={`How money moves: ${sentence}`}>
      <div className="relative">
        <ol className="grid gap-3 md:grid-cols-4 md:gap-4" aria-hidden="true">
          {nodes.map((node, index) => (
            <li key={node} className="flex items-center gap-3 md:block">
              <div className="flex min-h-14 flex-1 items-center rounded-lg border border-input bg-background px-4 text-[0.9375rem] font-medium text-foreground">
                {node}
              </div>
              {index < nodes.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground md:hidden" />}
            </li>
          ))}
        </ol>
        {!reduced && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -top-1.5 left-0 hidden h-3 w-3 rounded-full border-2 border-background bg-primary md:block"
            initial={{ left: DOT_STOPS[0], opacity: 0 }}
            whileInView={{ left: DOT_STOPS, opacity: [0, 1, 1, 1] }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: FLOW_PASS_MS / 1000, ease: "easeInOut" }}
          />
        )}
      </div>
      <figcaption className="mt-4 max-w-[65ch] text-[0.9375rem] text-muted-foreground">
        RevSplitPay works out every share and tells your payment provider who gets paid. It never holds your money.
      </figcaption>
    </figure>
  );
};

export default MoneyFlow;
