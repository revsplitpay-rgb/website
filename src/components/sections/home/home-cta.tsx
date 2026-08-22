import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { ArrowRight, BadgeCheck, ShieldCheck, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const reassurance = [
    { icon: Wallet, text: "Payouts run on Stripe Connect" },
    { icon: ShieldCheck, text: "7-day hold clears refunds first" },
    { icon: BadgeCheck, text: "Everyone keeps their own account" },
];

const HomeCTA = () => {
    return (
        <section id="get-started" className="relative isolate scroll-mt-24 overflow-hidden py-20 md:py-28">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_50%_45%,rgba(0,114,228,0.22),transparent_70%)]"
            />
            <Container>
                <div className="relative mx-auto max-w-[1000px] px-6 py-10 md:px-16 md:py-14">
                    <StaggerContainer className="text-center">
                        <AnimateOnView blur>
                            <h2 className="h2 mb-5 mx-auto max-w-[16ch]">
                                Set the split once. Then stop thinking about payday.
                            </h2>
                        </AnimateOnView>

                        <AnimateOnView blur delay={0.15}>
                            <p className="text-body-md text-muted-foreground mx-auto mb-9 max-w-[52ch]">
                                Connect Stripe, invite your closers, setters and partners, and let the next sale pay everyone by itself. The ledger keeps the receipt.
                            </p>
                        </AnimateOnView>

                        <AnimateOnView delay={0.25} className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Button
                                asChild
                                size="default"
                                className="h-11 w-full border border-[#3FC1FF]/35 bg-gradient-to-r from-[#0058B8] via-[#0072E4] to-[#3FC1FF] px-5 text-[15px] text-white shadow-[0_14px_34px_rgba(0,114,228,0.26)] hover:scale-[1.02] hover:shadow-[0_18px_42px_rgba(63,193,255,0.24)] sm:w-auto"
                            >
                                <Link to="/contact">
                                    Get started
                                    <ArrowRight />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="default"
                                variant="ghost"
                                className="h-11 w-full border border-white/10 bg-white/[0.035] px-5 text-[15px] text-muted-foreground backdrop-blur-md hover:border-[#3FC1FF]/25 hover:bg-[#3FC1FF]/[0.07] hover:text-white sm:w-auto"
                            >
                                <Link to="/contact">Talk to us first</Link>
                            </Button>
                        </AnimateOnView>

                        <AnimateOnView delay={0.35}>
                            <ul className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-white/[0.07] pt-8 sm:flex-row sm:gap-8">
                                {reassurance.map((item) => (
                                    <li key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <item.icon className="h-4 w-4 text-[#8FD3FF]" strokeWidth={1.5} />
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                        </AnimateOnView>
                    </StaggerContainer>
                </div>
            </Container>
        </section>
    );
};

export default HomeCTA;
