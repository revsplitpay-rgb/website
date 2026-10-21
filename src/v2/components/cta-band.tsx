import { APP_SIGNUP_URL } from "@/lib/links";
import { ArrowRight } from "lucide-react";
import { home, offerLine, priceLine } from "../content/copy";
import { v2Path } from "../lib/paths";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, Reveal } from "./motion";
import { ButtonLink, Container } from "./ui";

// Example split for the bar, matching the hero deal (closer 10%, setter 5%).
const SEGMENTS = [
  { label: "Closer", pct: 10, bar: "bg-[rgb(170_228_255)]", dot: "bg-[rgb(170_228_255)]" },
  { label: "Setter", pct: 5, bar: "bg-white/70", dot: "bg-white/70" },
  { label: "You keep", pct: 85, bar: "bg-[linear-gradient(90deg,#ffffff,#9fe2ff)]", dot: "bg-white" },
];

/** Closing call to action on a deep blue gradient panel. */
const CtaBand = () => {
  const reduced = useReducedMotion();
  return (
  <section aria-labelledby="cta-title" className="bg-background py-12 md:py-16 lg:py-20">
    <Container>
      <Reveal>
        <div className="v2-deep-band relative isolate overflow-hidden rounded-[32px] px-6 py-14 text-center shadow-[0_40px_80px_-40px_rgb(0_40_110/0.7)] sm:px-12 md:py-20">
          <div className="v2-blob -left-20 -top-24 -z-10 h-72 w-72 bg-[rgb(63_193_255/0.6)]" aria-hidden="true" />
          <div className="v2-blob -bottom-28 -right-10 -z-10 h-80 w-80 bg-[rgb(0_40_120/0.8)] [animation-delay:-6s]" aria-hidden="true" />
          <div
            className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgb(255_255_255/0.08)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.08)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,#000,transparent)]"
            aria-hidden="true"
          />
          <h2 id="cta-title" className="v2-h2 mx-auto text-white">
            {home.ctaTitle.split(/(?<=\.) /).map((sentence) => (
              <span key={sentence} className="block">
                {sentence}
              </span>
            ))}
          </h2>
          <p className="v2-lede mx-auto mt-5 max-w-[52ch] text-white/80">{priceLine()}.</p>
          <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/25">
            <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--v2-highlight))]" aria-hidden="true" />
            {offerLine()}
          </p>
          <div className="mx-auto mt-10 max-w-[440px]" aria-hidden="true">
            <div className="flex h-2 overflow-hidden rounded-full bg-white/15 ring-1 ring-white/20">
              {SEGMENTS.map((seg, i) =>
                reduced ? (
                  <span key={seg.label} className={`h-full ${seg.bar} ${i > 0 ? "border-l-2 border-[rgb(0_80_190)]" : ""}`} style={{ width: `${seg.pct}%` }} />
                ) : (
                  <motion.span
                    key={seg.label}
                    className={`h-full ${seg.bar} ${i > 0 ? "border-l-2 border-[rgb(0_80_190)]" : ""}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${seg.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.25, ease: EASE }}
                  />
                ),
              )}
            </div>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/90">
              {SEGMENTS.map((seg) => (
                <li key={seg.label} className="inline-flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${seg.dot}`} />
                  {seg.label} <span className="v2-num text-white">{seg.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={APP_SIGNUP_URL} variant="white">
              Get started <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink
              href={v2Path("/contact")}
              variant="ghost"
              className="text-white ring-1 ring-white/35 hover:bg-white/10"
            >
              Talk to us
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
);
};

export default CtaBand;
