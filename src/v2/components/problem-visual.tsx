import { HOLD_DAYS } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageSquare, Sheet } from "lucide-react";
import { spreadsheetExample } from "../content/examples";
import { formatCents, split } from "../lib/split";
import { EASE } from "./motion";
import { ExampleLabel, StatusPill } from "./ui";

const FLAG_COL = { closer: 2, setter: 3, paid: 4 } as const;
// Columns dropped on phones so the rest are readable (Sale, Setter).
const PHONE_HIDDEN = new Set([1, 3]);

/** The "before": a messy commission spreadsheet with open questions. */
const SpreadsheetMock = () => {
  const reduced = useReducedMotion();
  return (
    <div className="relative rounded-[20px] border border-border bg-white shadow-[0_20px_40px_-28px_rgb(11_26_51/0.4)]">
      <div className="flex items-center justify-between border-b border-border px-4 py-4">
        <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Sheet className="h-4 w-4 text-[rgb(16_150_90)]" aria-hidden="true" />
          commissions_FINAL_v7.xlsx
        </p>
        <ExampleLabel />
      </div>
      <div className="overflow-hidden rounded-b-[20px]">
        <table className="w-full table-fixed text-left font-mono text-xs text-muted-foreground sm:text-[0.8125rem]">
          <colgroup>
            <col className="w-[31%]" />
            <col className="hidden w-[17%] sm:table-column" />
            <col className="w-[16%]" />
            <col className="hidden w-[16%] sm:table-column" />
            <col className="w-[20%]" />
          </colgroup>
          <thead className="bg-[rgb(246_248_250)]">
            <tr>
              {spreadsheetExample.columns.map((col, index) => (
                <th key={col} className={cn("truncate border-b border-r border-border px-3 py-3 font-medium last:border-r-0", PHONE_HIDDEN.has(index) && "hidden sm:table-cell")}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {spreadsheetExample.rows.map((row) => (
              <tr key={row.cells[0]}>
                {row.cells.map((cell, col) => {
                  const flagged = row.flag && FLAG_COL[row.flag] === col;
                  return (
                    <td
                      key={col}
                      className={cn(
                        "truncate border-b border-r border-border px-3 py-4 last:border-r-0",
                        flagged && "bg-[rgb(255_236_236)] text-destructive",
                        PHONE_HIDDEN.has(col) && "hidden sm:table-cell",
                        col === 0 && "text-foreground",
                      )}
                    >
                      <span className={cn(row.flag === "paid" && col === 4 && "line-through")}>{cell}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {spreadsheetExample.notes.map((note, index) => (
        <motion.p
          key={note}
          className={cn(
            "absolute flex items-center gap-1.5 rounded-lg bg-[rgb(255_243_196)] px-2.5 py-1.5 text-xs font-medium text-[rgb(120_80_0)] shadow-[0_8px_18px_-8px_rgb(120_80_0/0.5)]",
            index === 0 ? "-right-4 -top-4 rotate-[3deg]" : "-bottom-5 right-6 -rotate-[2deg]",
          )}
          initial={reduced ? false : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.3, ease: EASE }}
          aria-hidden="true"
        >
          <MessageSquare className="h-3 w-3" />
          {note}
        </motion.p>
      ))}
    </div>
  );
};

const SALE_CENTS = 5_000 * 100;
const deal = split(SALE_CENTS, [
  { role: "Closer", bp: 1_000 },
  { role: "Setter", bp: 500 },
]);

/** The "after": the same deal, split and paid with a clear record. */
const LedgerMock = () => (
  <div className="v2-card v2-gradient-border overflow-hidden">
    <div className="flex items-center justify-between border-b border-border bg-[rgb(244_248_255)] px-5 py-4">
      <p className="text-sm font-medium text-foreground">Coaching #1042 · {formatCents(SALE_CENTS)}</p>
      <ExampleLabel />
    </div>
    <ul className="divide-y divide-border">
      {deal.ok &&
        deal.value.participants.map((share) => (
          <li key={share.role} className="flex items-center justify-between gap-3 px-5 py-[1.125rem]">
            <span className="text-sm text-foreground">
              {share.role} <span className="v2-num text-muted-foreground">· {share.bp / 100}%</span>
            </span>
            <span className="flex items-center gap-2.5">
              <span className="v2-num text-sm font-medium text-foreground">{formatCents(share.netCents)}</span>
              <StatusPill status="Paid" />
            </span>
          </li>
        ))}
      <li className="flex items-center justify-between gap-3 bg-[linear-gradient(90deg,rgb(0_114_228/0.07),rgb(63_193_255/0.05))] px-5 py-[1.125rem]">
        <span className="text-sm font-medium text-foreground">You keep</span>
        <span className="v2-num text-sm font-semibold text-foreground">{deal.ok ? formatCents(deal.value.ownerCents) : ""}</span>
      </li>
    </ul>
    <p className="border-t border-border px-5 py-4 text-xs text-muted-foreground">
      Split at checkout · recorded for good · paid after the {HOLD_DAYS}-day hold
    </p>
  </div>
);

export const BeforeAfter = () => {
  const reduced = useReducedMotion();
  return (
    <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
      <div>
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">Before</p>
        <SpreadsheetMock />
      </div>
      <motion.span
        className="mx-auto flex h-12 w-12 rotate-90 items-center justify-center rounded-full bg-white text-primary shadow-[0_12px_28px_-12px_rgb(0_72_160/0.5)] ring-1 ring-[rgb(0_114_228/0.15)] lg:rotate-0"
        initial={reduced ? false : { opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
        aria-hidden="true"
      >
        <ArrowRight className="h-5 w-5" />
      </motion.span>
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 24, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
      >
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.12em] text-[rgb(var(--v2-deep))]">With RevSplitPay</p>
        <LedgerMock />
      </motion.div>
    </div>
  );
};
