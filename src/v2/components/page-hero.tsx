import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Reveal } from "./motion";
import { Container, Eyebrow } from "./ui";

/** Top of every inner page: sky gradient, blueprint grid, eyebrow, big title. */
const PageHero = ({
  eyebrow,
  title,
  support,
  children,
  center = true,
  aside,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  support?: ReactNode;
  children?: ReactNode;
  center?: boolean;
  /** Optional visual beside the copy on large screens (left-aligned heroes). */
  aside?: ReactNode;
  className?: string;
}) => (
  <section className={cn("v2-sky relative isolate -mt-16 overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40 lg:pb-20", className)}>
    <div className="v2-grid-bg absolute inset-0 -z-10" aria-hidden="true" />
    <div className="v2-blob -left-24 top-10 -z-10 h-72 w-72 bg-[rgb(63_193_255/0.4)]" aria-hidden="true" />
    <div className="v2-blob -right-24 top-24 -z-10 h-80 w-80 bg-[rgb(0_114_228/0.22)] [animation-delay:-8s]" aria-hidden="true" />
    <Container className={cn(center && "text-center", aside && "grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]")}>
      <div>
      <Reveal onLoad>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal onLoad delay={100}>
        <h1 className={cn("v2-h1 mt-5 max-w-[18ch] text-foreground", center && "mx-auto")}>{title}</h1>
      </Reveal>
      {support && (
        <Reveal onLoad delay={200}>
          <p className={cn("v2-lede mt-6 max-w-[58ch] text-muted-foreground", center && "mx-auto")}>{support}</p>
        </Reveal>
      )}
      {children && (
        <Reveal onLoad delay={300}>
          <div className="mt-9">{children}</div>
        </Reveal>
      )}
      </div>
      {aside && (
        <Reveal onLoad delay={250}>
          {aside}
        </Reveal>
      )}
    </Container>
  </section>
);

export default PageHero;
