import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

// v2 primitives. Radii by role: panels 12px (rounded-lg), buttons 10px
// (rounded-md), inputs 8px (rounded-sm); pills only for status.

export const Container = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6", className)}>{children}</div>
);

/** Section padding is top and bottom each: 56px phone, 80px tablet, 96px desktop. */
export const Section = ({
  id,
  className,
  surface = false,
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  surface?: boolean;
  children: ReactNode;
  labelledBy?: string;
}) => (
  <section
    id={id}
    aria-labelledby={labelledBy}
    className={cn("scroll-mt-20 py-14 md:py-20 lg:py-24", surface ? "bg-muted" : "bg-background", className)}
  >
    {children}
  </section>
);

export const SectionHeading = ({
  id,
  title,
  support,
  className,
  as: Tag = "h2",
}: {
  id?: string;
  title: string;
  support?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) => (
  <div className={cn("max-w-[680px]", className)}>
    <Tag id={id} className={Tag === "h1" ? "v2-display text-foreground" : "v2-h2 text-foreground"}>
      {title}
    </Tag>
    {support && <p className="v2-lede mt-4 text-muted-foreground">{support}</p>}
  </div>
);

export const Panel = ({
  className,
  raised = false,
  children,
}: {
  className?: string;
  raised?: boolean;
  children: ReactNode;
}) => (
  <div className={cn("rounded-lg border border-border bg-background p-6 lg:p-8", raised && "v2-raised", className)}>
    {children}
  </div>
);

export type ButtonVariant = "primary" | "secondary" | "ghost";

export const buttonClass = (variant: ButtonVariant = "primary", className?: string) =>
  cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-[0.9375rem] font-medium transition-colors duration-150",
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
    variant === "primary" && "bg-primary text-primary-foreground hover:bg-[rgb(var(--v2-deep))]",
    variant === "secondary" && "border border-input bg-background text-foreground hover:bg-muted",
    variant === "ghost" && "text-foreground hover:bg-muted",
    className,
  );

export const ButtonLink = ({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}) =>
  /^(https?:|mailto:)/.test(href) ? (
    <a href={href} className={buttonClass(variant, className)}>
      {children}
    </a>
  ) : (
    <Link to={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );

export const ExampleLabel = ({ className }: { className?: string }) => (
  <span className={cn("text-xs font-medium uppercase tracking-wide text-muted-foreground", className)}>Example</span>
);

const statusStyles = {
  Paid: "bg-[rgb(var(--v2-highlight)/0.14)] text-[rgb(var(--v2-deep))]",
  Pending: "bg-muted text-foreground",
  Locked: "bg-muted text-muted-foreground",
  Failed: "bg-[rgb(var(--destructive)/0.1)] text-destructive",
} as const;

export const StatusPill = ({ status }: { status: keyof typeof statusStyles }) => (
  <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", statusStyles[status])}>
    {status}
  </span>
);
