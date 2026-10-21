import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "./motion";

// v2 primitives. Cards 20px, buttons pill, inputs 10px. Colour comes from the
// section tones (white, tint, sky, deep) and the brand gradient utilities in v2.css.

export const Container = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6", className)}>{children}</div>
);

export type SectionTone = "white" | "tint" | "sky" | "deep" | "blue";

const toneClass: Record<SectionTone, string> = {
  white: "bg-background",
  tint: "v2-tint",
  sky: "v2-sky",
  deep: "v2-deep-band",
  blue: "v2-blue-band",
};

/** One spacing scale for every section (top and bottom): 48px phone, 64px tablet, 80px desktop. */
export const Section = ({
  id,
  className,
  tone = "white",
  surface = false,
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  tone?: SectionTone;
  /** @deprecated use tone="tint" */
  surface?: boolean;
  children: ReactNode;
  labelledBy?: string;
}) => (
  <section
    id={id}
    aria-labelledby={labelledBy}
    className={cn("relative scroll-mt-20 overflow-hidden py-12 md:py-16 lg:py-20", toneClass[surface ? "tint" : tone], className)}
  >
    {children}
  </section>
);

/**
 * Title accepts a node so a phrase can carry the brand gradient:
 * title={<>Plans that <Grad>grow with you</Grad>.</>}
 */
export const Grad = ({ children }: { children: ReactNode }) => <span className="v2-gradient-text">{children}</span>;

export const Eyebrow = ({ children, light = false }: { children: ReactNode; light?: boolean }) => (
  <p className={cn("v2-eyebrow", light && "v2-eyebrow-light")}>{children}</p>
);

export const SectionHeading = ({
  id,
  eyebrow,
  title,
  support,
  className,
  center = false,
  light = false,
  as: Tag = "h2",
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  support?: ReactNode;
  className?: string;
  center?: boolean;
  light?: boolean;
  as?: "h1" | "h2";
}) => (
  <div className={cn("max-w-[760px]", center && "mx-auto text-center", className)}>
    {eyebrow && (
      <Reveal>
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
      </Reveal>
    )}
    <Reveal delay={80}>
      <Tag
        id={id}
        className={cn(Tag === "h1" ? "v2-h1" : "v2-h2", eyebrow && "mt-4", light ? "text-white" : "text-foreground")}
      >
        {title}
      </Tag>
    </Reveal>
    {support && (
      <Reveal delay={160}>
        <p className={cn("v2-lede mt-5", center && "mx-auto", "max-w-[60ch]", light ? "text-white/90" : "text-muted-foreground")}>
          {support}
        </p>
      </Reveal>
    )}
  </div>
);

export const Panel = ({
  className,
  raised = false,
  hover = false,
  children,
}: {
  className?: string;
  raised?: boolean;
  hover?: boolean;
  children: ReactNode;
}) => (
  <div className={cn("v2-card p-6 lg:p-8", raised && "v2-ledger-shadow", hover && "v2-card-hover", className)}>{children}</div>
);

export type ButtonVariant = "primary" | "secondary" | "ghost" | "white";

export const buttonClass = (variant: ButtonVariant = "primary", className?: string) =>
  cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium",
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
    "[&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg:last-child]:translate-x-0.5",
    variant === "primary" && "v2-btn-primary text-white",
    variant === "secondary" && "v2-btn-secondary border border-border text-foreground",
    variant === "ghost" && "text-foreground transition-colors hover:bg-[rgb(0_114_228/0.06)]",
    variant === "white" && "bg-white text-[rgb(var(--v2-deep))] shadow-[0_10px_30px_-12px_rgb(0_20_60/0.6)] transition-transform hover:-translate-y-px",
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
  <span
    className={cn(
      "rounded-full border border-border bg-background px-2 py-0.5 font-mono text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground",
      className,
    )}
  >
    Example
  </span>
);

const statusStyles = {
  Paid: "bg-[rgb(16_160_110/0.12)] text-[rgb(4_120_87)]",
  Pending: "bg-[rgb(0_114_228/0.1)] text-[rgb(var(--v2-deep))]",
  Locked: "bg-muted text-muted-foreground",
  Failed: "bg-[rgb(var(--destructive)/0.1)] text-destructive",
} as const;

export const StatusPill = ({ status }: { status: keyof typeof statusStyles }) => (
  <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", statusStyles[status])}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
    {status}
  </span>
);
