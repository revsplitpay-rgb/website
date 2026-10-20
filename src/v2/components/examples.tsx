import { leaderboardExamples, payoutExamples } from "../content/examples";
import { ExampleLabel, StatusPill } from "./ui";

/** Illustrative payout list: role labels, round amounts, always labeled Example. */
export const PayoutExample = () => (
  <div className="rounded-lg border border-border bg-background">
    <div className="flex items-center justify-between border-b border-border px-5 py-3">
      <p className="text-sm font-medium text-foreground">My payouts</p>
      <ExampleLabel />
    </div>
    <ul className="divide-y divide-border">
      {payoutExamples.map((row, index) => (
        <li key={index} className="flex items-center justify-between gap-4 px-5 py-3">
          <div>
            <p className="text-[0.9375rem] text-foreground">{row.role} commission</p>
            <p className="text-sm text-muted-foreground">{row.when}</p>
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
export const LeaderboardExample = () => (
  <div className="rounded-lg border border-border bg-background">
    <div className="flex items-center justify-between border-b border-border px-5 py-3">
      <p className="text-sm font-medium text-foreground">Leaderboard · this month</p>
      <ExampleLabel />
    </div>
    <ul className="space-y-4 px-5 py-4">
      {leaderboardExamples.map((row) => (
        <li key={row.rank} className="grid grid-cols-[1.5rem_1fr_5rem] items-center gap-3">
          <span className="v2-num text-sm text-muted-foreground">{row.rank}</span>
          <div>
            <p className="text-[0.9375rem] text-foreground">{row.role}</p>
            <div className="mt-1.5 h-1.5 rounded-full bg-muted" aria-hidden="true">
              <div className="h-1.5 rounded-full bg-primary" style={{ width: `${row.value}%` }} />
            </div>
          </div>
          <span className="text-right text-sm font-medium text-foreground">{row.tier}</span>
        </li>
      ))}
    </ul>
  </div>
);
