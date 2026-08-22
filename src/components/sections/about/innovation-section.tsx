
import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { cn } from "@/lib/utils";
import { CreditCard, Gift, LineChart, Send, ShieldCheck, Wallet } from "lucide-react";

const features = [
    {
        title: "Smart Accounts",
        description: "High-yield accounts that make saving simple and give you more growth opportunities.",
        icon: Wallet,
    },
    {
        title: "Early Access Cards",
        description: "Unlock credit cards faster with industry-low deposits and tailored card benefits.",
        icon: CreditCard,
    },
    {
        title: "Cashback Rewards",
        description: "Earn unlimited 2% cashback on purchases, helping you save with every spend.",
        icon: Gift,
    },
    {
        title: "Seamless Payments",
        description: "Easily connect with PayPal, Amazon Pay, Stripe, and others for smooth transfers.",
        icon: Send,
    },
    {
        title: "Business Growth Tools",
        description: "Access working capital and insights designed to power and grow your business.",
        icon: LineChart,
        highlight: true,
    },
    {
        title: "Secure & Transparent",
        description: "Enjoy reliable banking with no hidden fees, built on trust and full clarity.",
        icon: ShieldCheck,
    },
];

const InnovationSection = () => {
    return (
        <section className="py-12 md:py-[60px]">
            <Container className="md:space-y-20 space-y-12">
                <StaggerContainer className="text-center md:max-w-none max-w-sm mx-auto">
                    <AnimateOnView blur once>
                        <h2 className="h2 md:mb-5 mb-3">
                            Confidence Backed by Innovation
                        </h2>
                    </AnimateOnView>

                    <AnimateOnView blur once delay={0.1}>
                        <p className="text-muted-foreground max-w-[660px] mx-auto">
                            Enjoy secure accounts, cashback rewards, and smart financial tools designed to help you grow, save, and invest with confidence.
                        </p>
                    </AnimateOnView>
                </StaggerContainer>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <AnimateOnView
                            key={index}
                            className={cn(
                                "relative md:p-8 p-6 rounded-[20px] bg-card border border-border flex flex-col gap-6 overflow-hidden transition-all duration-300 hover:border-white/10 group"
                            )}
                        >
                            {/* Highlight Glow Effect */}
                            {feature.highlight && (
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full -mr-16 -mt-16 pointer-events-none" />
                            )}

                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="h4">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        </AnimateOnView>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default InnovationSection;
