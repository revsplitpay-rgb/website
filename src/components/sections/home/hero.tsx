import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { scrollToSection } from "@/lib/scroll-to-section";
import heroSideImage from "../../../../hero-side.png";

const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    // No opaque background here on purpose: the page shell (brand-site-shell)
    // paints through, so the hero has no seam where it meets the section below.
    <section className="relative isolate overflow-hidden hero-padding-top pb-16 md:pb-24">
      {/* Ambient light. Every colour stop lands on `transparent` well inside the
          box, so nothing ever draws a hard edge against the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_58%_52%_at_74%_44%,rgba(0,114,228,0.26),transparent_68%),radial-gradient(ellipse_46%_42%_at_10%_14%,rgba(63,193,255,0.09),transparent_70%)]"
      />

      <Container>
        <div className="grid items-center gap-10 lg:min-h-[620px] lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:gap-0 xl:gap-4">
          <StaggerContainer className="max-w-[760px] text-center lg:text-left">
            <AnimateOnView blur>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium tracking-wide text-[#8FD3FF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3FC1FF] shadow-[0_0_10px_rgba(63,193,255,0.9)]" />
                Verified by real payment data
              </span>
            </AnimateOnView>

            <AnimateOnView blur delay={0.1}>
              <h1 className="h1 text-foreground mb-5">
                Automatic Commission Payouts, Verified by Real Revenue
              </h1>
            </AnimateOnView>

            <AnimateOnView blur delay={0.2}>
              <p className="text-body-md text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8">
                RevSplitPay connects to Stripe, tracks paid deals, and splits commissions automatically so owners, closers, setters, and partners always see the same truth.
              </p>
            </AnimateOnView>

            <AnimateOnView className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3" delay={0.3}>
              <Button asChild size="lg" className="px-7 w-full sm:w-auto">
                <Link to="/contact">
                  Get Started
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="px-6 w-full sm:w-auto text-muted-foreground hover:text-foreground">
                <a href="#pricing" onClick={(e) => scrollToSection(e, "pricing")}>See pricing</a>
              </Button>
            </AnimateOnView>

            <AnimateOnView delay={0.4}>
              <p className="mt-7 text-xs text-muted-foreground/70">
                Stripe Connect payouts &middot; 7-day settlement hold &middot; Every dollar on the ledger
              </p>
            </AnimateOnView>
          </StaggerContainer>

          {/* Image column.
              Deliberately NOT wrapped in AnimateOnView: that component animates
              `filter`, and any non-`none` filter turns the wrapper into an
              isolated backdrop root, which clips child glows to its box and
              hijacks blend modes. That isolation is what drew the rectangle. */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative w-full lg:-ml-10 lg:w-[114%] xl:-ml-16 xl:w-[118%]"
            style={{ perspective: 1200 }}
          >
            {/* Glow is a radial gradient, not a blur() filter, so it has no
                filter region to be clipped to and fades out to nothing. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[135%] w-[125%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(0,114,228,0.34),rgba(0,114,228,0.12)_52%,transparent_100%)]"
            />

            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              whileHover={reduceMotion ? undefined : { rotateX: 2.5, rotateY: -4, scale: 1.02 }}
              className="[transform-style:preserve-3d]"
            >
              <img
                src={heroSideImage}
                alt="A $2,000 sale splitting automatically into $1,600 for the business owner, $300 for the closer and $100 for the setter"
                width={1672}
                height={940}
                // lowercase on purpose: this React build does not map the
                // camelCase form and warns about an unknown DOM prop.
                {...({ fetchpriority: "high" } as Record<string, string>)}
                decoding="async"
                className="w-full h-auto object-contain"
                style={{
                  filter:
                    "drop-shadow(0 18px 38px rgba(0,0,0,0.55)) drop-shadow(0 44px 88px rgba(0,92,190,0.26))",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
