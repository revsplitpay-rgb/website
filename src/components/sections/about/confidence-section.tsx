
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const ConfidenceSection = () => {
    const stats = [
        {
            label: "Automated financial growth",
            value: "150%",
            description: "of manual work eliminated",
            icon: "📈",
        },
        {
            label: "Transaction security",
            value: "99.9%",
            description: "fraud prevention accuracy across all payments",
            icon: "🔒",
        },
        {
            label: "Trusted by businesses",
            value: "10K+",
            description: "companies manage their finances with us",
            icon: "🏢",
        },
    ];

    return (
        <section className="py-12 md:py-[60px]">
            <Container className="md:space-y-20 space-y-12">
                <StaggerContainer className="text-center md:max-w-2xl max-w-sm mx-auto">
                    <AnimateOnView blur once>
                        <h2 className="h2 md:mb-5 mb-3">
                            Bank Complete Confidence
                        </h2>
                    </AnimateOnView>

                    <AnimateOnView blur once delay={0.1}>
                        <p className="text-muted-foreground md:mb-8 mb-5">
                            The revenue platform modern finance teams were waiting for
                        </p>
                    </AnimateOnView>

                    <AnimateOnView y={20} once delay={0.2} className="flex flex-col items-center gap-4">
                        <Button asChild>
                            <Link to="/contact">
                                Get started for free
                            </Link>
                        </Button>

                        <div className="mt-4 flex flex-col items-center gap-2">
                            <span className="text-xs text-muted-foreground">10 invoices trial, no credit card needed</span>
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-4 h-4 text-orange-500 fill-orange-500" />
                                    ))}
                                </div>
                                <span className="text-sm text-white font-medium">4.5 Reviews</span>
                            </div>
                        </div>
                    </AnimateOnView>
                </StaggerContainer>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {stats.map((stat, index) => (
                        <AnimateOnView
                            key={index}
                            className="py-6 pl-6 pr-3 rounded-[20px] bg-card border border-border flex flex-col gap-10"
                        >
                            <span className="text-sm text-accent">{stat.label}</span>
                            <div className="flex flex-col gap-2">
                                <h3 className="h3 flex items-center gap-3">
                                    {stat.icon} {stat.value}
                                </h3>
                                <p className="text-muted-foreground">
                                    {stat.description}
                                </p>
                            </div>
                        </AnimateOnView>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default ConfidenceSection;
