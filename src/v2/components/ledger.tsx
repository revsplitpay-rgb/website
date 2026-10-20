import { HOLD_DAYS } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { Plus, RotateCcw, X } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { providerPhrase } from "../content/providers";
import { MAX_PARTICIPANTS, formatCents, parsePercentInput, parseSaleInput, split } from "../lib/split";
import { RollingNumber } from "./motion";
import { ExampleLabel } from "./ui";

const ROLES = ["Closer", "Setter", "Partner", "Sales Manager"] as const;
type Role = (typeof ROLES)[number];
interface Row {
  id: number;
  role: Role;
  percent: string;
}

const DEFAULT_SALE = "5,000";
const DEFAULT_ROWS: Row[] = [
  { id: 1, role: "Closer", percent: "10" },
  { id: 2, role: "Setter", percent: "5" },
];

const money = (cents: number) => formatCents(cents);

const BAR_COLORS = ["bg-[rgb(var(--v2-deep))]", "bg-[rgb(var(--v2-highlight))]", "bg-[rgb(0_150_200)]", "bg-[rgb(90_110_220)]"];

/** Live proportion bar: each person's share, then the owner's. */
const SplitBar = ({ parts, total }: { parts: { key: string; cents: number }[]; total: number }) => (
  <div className="mt-4 flex h-2.5 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
    {total > 0 &&
      parts.map((part, index) => (
        <span
          key={`${part.key}-${index}`}
          className={cn(
            "h-full transition-[width] duration-500 ease-out",
            index === parts.length - 1 ? "bg-[linear-gradient(90deg,#0072e4,#5cc8ff)]" : BAR_COLORS[index % BAR_COLORS.length],
            index > 0 && "border-l-2 border-white",
          )}
          style={{ width: `${(part.cents / total) * 100}%` }}
        />
      ))}
  </div>
);

/**
 * The editable example ledger: one sale, each person's share, the 2.9% fee taken
 * from their payout, and the owner's fee-free share. Pure math lives in lib/split.
 */
const Ledger = ({ className }: { className?: string }) => {
  const uid = useId();
  const [sale, setSale] = useState(DEFAULT_SALE);
  const [rows, setRows] = useState<Row[]>(DEFAULT_ROWS);
  const [nextId, setNextId] = useState(3);

  const result = useMemo(() => {
    const saleResult = parseSaleInput(sale);
    const percents = rows.map((row) => parsePercentInput(row.percent));
    const badPercent = percents.findIndex((p) => !p.ok);
    if (!saleResult.ok) return { error: saleResult.error.message, field: "sale" as const };
    if (badPercent > -1) {
      const p = percents[badPercent];
      return { error: "error" in p ? p.error.message : "", field: `row-${rows[badPercent].id}` };
    }
    const outcome = split(
      saleResult.value,
      rows.map((row, i) => ({ role: row.role, bp: (percents[i] as { ok: true; value: number }).value })),
    );
    if (!outcome.ok) return { error: outcome.error.message, field: "team" as const };
    return { value: outcome.value };
  }, [sale, rows]);

  const labelFor = (row: Row) => {
    const same = rows.filter((r) => r.role === row.role);
    const index = same.findIndex((r) => r.id === row.id);
    return same.length > 1 && index > 0 ? `${row.role} ${index + 1}` : row.role;
  };

  const updateRow = (id: number, patch: Partial<Row>) =>
    setRows((current) => current.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  const addRow = () => {
    if (rows.length >= MAX_PARTICIPANTS) return;
    setRows((current) => [...current, { id: nextId, role: "Partner", percent: "" }]);
    setNextId((n) => n + 1);
  };

  const reset = () => {
    setSale(DEFAULT_SALE);
    setRows(DEFAULT_ROWS);
  };

  const errorId = `${uid}-error`;
  const shares = "value" in result && result.value ? result.value.participants : null;

  return (
    <div className={cn("v2-card v2-ledger-shadow overflow-hidden", className)}>
      <div className="flex items-center justify-between border-b border-border bg-[rgb(244_248_255)] px-5 py-3 sm:px-6">
        <p className="text-sm font-medium text-foreground">
          <ExampleLabel className="mr-2" />
          Change the numbers
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>

      <div className="px-5 py-5 sm:px-6">
        <label htmlFor={`${uid}-sale`} className="text-sm text-muted-foreground">
          Customer pays
        </label>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="v2-num text-[1.75rem] font-medium text-foreground">$</span>
          <input
            id={`${uid}-sale`}
            inputMode="decimal"
            autoComplete="off"
            value={sale}
            onChange={(event) => setSale(event.target.value)}
            aria-invalid={"field" in result && result.field === "sale"}
            aria-describedby={"field" in result && result.field === "sale" ? errorId : undefined}
            className="v2-num v2-editable w-full min-w-0 bg-transparent text-[1.75rem] font-medium text-foreground outline-none"
          />
        </div>
        <SplitBar
          parts={
            "value" in result && result.value
              ? [
                  ...result.value.participants.map((p) => ({ key: p.role, cents: p.commissionCents })),
                  { key: "You", cents: result.value.ownerCents },
                ]
              : []
          }
          total={"value" in result && result.value ? result.value.saleCents : 0}
        />
      </div>

      <ul className="divide-y divide-border border-t border-border" aria-label="Team shares">
        {rows.map((row, index) => {
          const share = shares?.[index];
          const rowError = "field" in result && result.field === `row-${row.id}`;
          const label = labelFor(row);
          return (
            <li key={row.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:px-6">
              <div className="flex items-center gap-2">
                <label className="sr-only" htmlFor={`${uid}-role-${row.id}`}>
                  Role
                </label>
                <select
                  id={`${uid}-role-${row.id}`}
                  value={row.role}
                  onChange={(event) => updateRow(row.id, { role: event.target.value as Role })}
                  className="min-h-11 min-w-0 flex-1 rounded-[10px] border border-border bg-background px-3 text-[0.9375rem] text-foreground shadow-[0_1px_2px_rgb(11_26_51/0.05)] sm:max-w-[160px]"
                >
                  {ROLES.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
                <label className="sr-only" htmlFor={`${uid}-pct-${row.id}`}>
                  {label} share in percent
                </label>
                <div className="flex w-[88px] shrink-0 items-center rounded-[10px] border border-border px-2 shadow-[0_1px_2px_rgb(11_26_51/0.05)] focus-within:border-primary">
                  <input
                    id={`${uid}-pct-${row.id}`}
                    inputMode="decimal"
                    autoComplete="off"
                    value={row.percent}
                    onChange={(event) => updateRow(row.id, { percent: event.target.value })}
                    aria-invalid={rowError}
                    aria-describedby={rowError ? errorId : undefined}
                    className="v2-num min-h-11 w-full min-w-0 bg-transparent text-right text-[0.9375rem] text-foreground outline-none"
                  />
                  <span className="pl-1 text-sm text-muted-foreground">%</span>
                </div>
                <button
                  type="button"
                  onClick={() => setRows((current) => current.filter((r) => r.id !== row.id))}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label={`Remove ${label}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="text-left sm:text-right">
                <p className="v2-num text-[1.25rem] font-medium leading-7 text-foreground">
                  {share ? <RollingNumber value={share.netCents} format={money} /> : "—"}
                </p>
                {share ? (
                  <p className="v2-num text-sm leading-5 text-muted-foreground">
                    <span className="block">{money(share.commissionCents)} gross</span>
                    <span className="block">−{money(share.feeCents)} fee</span>
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">—</p>
                )}
              </div>
            </li>
          );
        })}
        <li className="grid gap-1 bg-[linear-gradient(90deg,rgb(0_114_228/0.08),rgb(63_193_255/0.06))] px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:px-6">
          <div>
            <p className="font-medium text-foreground">You keep</p>
            <p className="text-sm text-muted-foreground">Owner share · No fee</p>
          </div>
          <p className="v2-num v2-gradient-text text-[1.75rem] font-semibold sm:text-right">
            {"value" in result && result.value ? <RollingNumber value={result.value.ownerCents} format={money} /> : "—"}
          </p>
        </li>
      </ul>

      <div className="space-y-3 px-5 py-4 sm:px-6">
        {"error" in result && result.error && (
          <p id={errorId} role="alert" className="text-sm font-medium text-destructive">
            {result.error}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={addRow}
            disabled={rows.length >= MAX_PARTICIPANTS}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-sm font-medium text-[rgb(var(--v2-link))] hover:bg-muted disabled:text-muted-foreground disabled:opacity-60"
          >
            <Plus className="h-4 w-4" /> Add person
          </button>
          <p className="flex items-center gap-2 text-sm text-foreground">
            <span className="h-2 w-2 rounded-full bg-[rgb(var(--v2-highlight))]" aria-hidden="true" />
            Paid after {HOLD_DAYS}-day hold
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Excludes {providerPhrase()} processing fees. Manager override not shown.
        </p>
        <p className="sr-only" aria-live="polite">
          {"value" in result && result.value
            ? `You keep ${money(result.value.ownerCents)}. ${result.value.participants
                .map((p, i) => `${labelFor(rows[i])} receives ${money(p.netCents)}`)
                .join(". ")}.`
            : ""}
        </p>
      </div>
    </div>
  );
};

export default Ledger;
