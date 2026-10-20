import { animate, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Motion: blur-in reveals that rise 24px over 800ms, once, staggered by the
// caller's delay. Visitors who prefer reduced motion get everything static.
export const REVEAL_MS = 800;
export const ROLL_MS = 1200;
export const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/** `delay` is in milliseconds. `onLoad` animates immediately instead of on scroll. */
export const Reveal = ({
  children,
  className,
  delay = 0,
  y = 24,
  blur = true,
  onLoad = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  onLoad?: boolean;
}) => {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  const shown = { opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } };
  // Above-the-fold entrances are quicker so the hero is readable almost at once.
  const duration = onLoad ? 0.6 : REVEAL_MS / 1000;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: onLoad ? Math.min(y, 14) : y, filter: blur ? `blur(${onLoad ? 5 : 8}px)` : "blur(0px)" }}
      {...(onLoad ? { animate: shown } : { whileInView: shown, viewport: { once: true, margin: "-60px" } })}
      transition={{ duration, ease: EASE, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
};

/** Rolls up to `value` once when first shown; later changes update instantly. */
export const RollingNumber = ({ value, format }: { value: number; format: (n: number) => string }) => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const rolled = useRef(false);
  const [shown, setShown] = useState(() =>
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? value : 0,
  );

  useEffect(() => {
    if (rolled.current || reduced || typeof IntersectionObserver === "undefined") {
      setShown(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let stop: (() => void) | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        rolled.current = true;
        const controls = animate(0, value, {
          duration: ROLL_MS / 1000,
          ease: EASE,
          onUpdate: (latest) => setShown(Math.round(latest)),
        });
        stop = () => controls.stop();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      stop?.();
    };
  }, [value, reduced]);

  // Screen readers always get the final value, never the in-between frames.
  return (
    <span ref={ref}>
      <span aria-hidden="true">{format(shown)}</span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
};
