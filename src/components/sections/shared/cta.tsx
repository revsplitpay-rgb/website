import Container from "@/components/container";
import RevSplitPayMiniCard from "@/components/ui/revsplitpay-mini-card";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { APP_SIGNUP_URL } from "@/lib/links";

const CTA = () => {
    return (
        <section className="relative overflow-hidden pt-20 md:pt-32">
            {/* Background Gradient similar to design (dark with subtle glow) */}
            <div className="absolute inset-0 bg-[#060a12]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

            <Container className="relative z-10 space-y-10">
                <StaggerContainer className="text-center">
                    <AnimateOnView
                        blur
                    >
                        <h2
                            className="h2 md:mb-5 mb-3"
                        >
                            Your team closes. We handle the money.
                        </h2>
                    </AnimateOnView>
                    <AnimateOnView
                        blur
                        delay={0.2}
                    >
                        <p
                            className='text-muted-foreground md:mb-10 mb-5'
                        >
                            Connect Stripe or Whop, set your splits, and let the next sale pay everyone by itself.
                        </p>
                    </AnimateOnView>
                    <AnimateOnView>
                        <Button asChild>
                            <a href={APP_SIGNUP_URL}>
                                Get started
                            </a>
                        </Button>
                    </AnimateOnView>
                </StaggerContainer>
                <AnimateOnView delay={0.2} blur className="flex justify-center pb-16 md:pb-24">
                    <div className="relative flex w-full max-w-[760px] items-center justify-center rounded-[32px] border border-primary/15 bg-[#0A0D12]/70 px-6 py-14 shadow-2xl shadow-primary/10">
                        <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_50%_45%,rgba(0,114,228,0.22),transparent_42%)]" />
                        <RevSplitPayMiniCard className="max-w-[360px]" />
                    </div>
                </AnimateOnView>
            </Container>
        </section>
    );
};

export default CTA;
