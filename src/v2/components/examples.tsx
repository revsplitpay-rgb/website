import { motion, useReducedMotion } from "framer-motion";
import { leaderboardExamples, payoutExamples } from "../content/examples";
import { EASE } from "./motion";
import { ExampleLabel, StatusPill } from "./ui";

/** Illustrative payout list: role labels, round amounts, always labeled Example. */
export const PayoutExample = ({ limit }: { limit?: number }) => (
  <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_10px_30px_-20px_rgb(0_58_130/0.35)]">
    <div className="flex items-center justify-between border-b border-border bg-[rgb(244_248_255)] px-5 py-3">
      <p className="text-sm font-medium text-foreground">My payouts</p>
      <ExampleLabel />
    </div>
    <ul className="divide-y divide-border">
      {payoutExamples.slice(0, limit).map((row, index) => (
        <li key={index} className="flex items-center justify-between gap-4 px-5 py-3">
          <div>
            <p className="text-[0.9375rem] text-foreground">{row.role} commission</p>
            <p className="whitespace-nowrap text-sm text-muted-foreground">{row.when}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="v2-num text-[0.9375rem] text-foreground">{row.amount}</span>
            <StatusPill status={row.status} />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

/** Illustrative leaderboard with tiers: role labels only, no names or ranks claimed. */
export const LeaderboardExample = () => {
  const reduced = useReducedMotion();
  return (
  <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_10px_30px_-20px_rgb(0_58_130/0.35)]">
    <div className="flex items-center justify-between border-b border-border bg-[rgb(244_248_255)] px-5 py-3">
      <p className="text-sm font-medium text-foreground">Leaderboard · this month</p>
      <ExampleLabel />
    </div>
    <ul className="space-y-3 px-5 py-4">
      {leaderboardExamples.map((row) => (
        <li key={row.rank} className="grid grid-cols-[1.5rem_1fr_5rem] items-center gap-3">
          <span className="v2-num text-sm text-muted-foreground">{row.rank}</span>
          <div>
            <p className="text-[0.9375rem] text-foreground">{row.role}</p>
            <div className="mt-1.5 h-1.5 rounded-full bg-muted" aria-hidden="true">
              <motion.div
                className="h-1.5 rounded-full bg-[linear-gradient(90deg,#0058b8,#3fc1ff)]"
                initial={reduced ? false : { width: 0 }}
                whileInView={{ width: `${row.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + row.rank * 0.12, ease: EASE }}
              />
            </div>
          </div>
          <span className="text-right text-sm font-medium text-foreground">{row.tier}</span>
        </li>
      ))}
    </ul>
  </div>
  );
};
