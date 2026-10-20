import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { CONTACT_EMAIL } from "@/lib/links";
import { HOLD_DAYS } from "@/lib/pricing";

// Facts only, from product.md sections 2, 7, 9 and 10. No team photos, stats or logos.
const blocks = [
    {
        title: "Who it is for",
        text: "High-ticket sales agencies and teams that sell coaching, consulting, courses, programs, services or memberships, often through calls, with closers, setters, managers, partners and support staff on every deal.",
    },
    {
        title: "How money moves",
        text: `Your customer pays your own Stripe or Whop account. RevSplitPay works out every person's share, holds commissions for ${HOLD_DAYS} days to protect against refunds, then pays each person to their own payout account. RevSplitPay never holds your money and never stores card details.`,
    },
    {
        title: "Every split on record",
        text: "Each split is recorded at the time of sale and can't be rewritten later, so owners and reps always see the same numbers.",
    },
    {
        title: "Company",
        text: `RevSplitPay is registered in Ireland. Prices are in USD. Contact us at ${CONTACT_EMAIL}.`,
    },
];

const AboutFacts = () => {
    return (
        <section className="hero-padding-top pb-20 brand-ambient-bg">
            <Container>
                <StaggerContainer className="max-w-[760px]">
                    <AnimateOnView blur once>
                        <h1 className="h1 mb-5">Built for teams that sell on calls</h1>
                    </AnimateOnView>
                    <AnimateOnView blur once delay={0.1}>
                        <p className="text-lg text-muted-foreground mb-12">
                            RevSplitPay is the payment and commission platform for sales teams: your customer pays once, and every closer, setter, partner and manager is paid their exact share automatically.
                        </p>
                    </AnimateOnView>
                </StaggerContainer>
                <div className="grid gap-8 md:grid-cols-2 max-w-[1000px]">
                    {blocks.map((block) => (
                        <div key={block.title} className="border-t border-border pt-6">
                            <h2 className="h4 mb-3">{block.title}</h2>
                            <p className="text-muted-foreground">{block.text}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default AboutFacts;
