import { animate, motion, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

// Motion rules (DESIGN.md): fade up 12px over 400ms, once. Anything already on
// screen at mount renders in its final state, so content never waits on timing.
// Everything is static for visitors who prefer reduced motion.
export const REVEAL_MS = 400;
export const ROLL_MS = 700;
const EASE = [0.22, 1, 0.36, 1] as const;

const useVisibleAtMount = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const rect = el.getBoundingClientRect();
    setVisible(rect.top < window.innerHeight && rect.bottom > 0);
  }, []);
  return { ref, visibleAtMount: visible };
};

/** `delay` is in milliseconds. */
export const Reveal = ({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const reduced = useReducedMotion();
  const { ref, visibleAtMount } = useVisibleAtMount();
  if (reduced || visibleAtMount) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: REVEAL_MS / 1000, ease: EASE, delay: delay / 1000 }}
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
