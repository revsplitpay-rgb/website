import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { findIntegration } from "@/lib/integrations";
import { Navigate, useParams } from "react-router-dom";

const IntegrationDetails = () => {
    const { slug } = useParams<{ slug: string }>();
    const data = findIntegration(slug);

    // Only Stripe, Whop, Slack and Webhooks exist; anything else goes back to the list.
    if (!data) return <Navigate to="/integration" replace />;

    return (
        <div className="hero-padding-top pb-20 brand-ambient-bg">
            <Container className="md:space-y-20 space-y-12">
                <div className="text-center">
                    <AnimateOnView blur once>
                        <h1 className="h1 md:mb-5 mb-3">RevSplitPay + {data.name}</h1>
                        <p className="text-muted-foreground text-lg md:max-w-2xl max-w-sm mx-auto">
                            {data.summary}
                        </p>
                    </AnimateOnView>
                </div>

                <div className="md:space-y-16 space-y-8 max-w-[860px] mx-auto">
                    <AnimateOnView y={20} blur once delay={0.2}>
                        <section>
                            <h2 className="h3 md:mb-5 mb-3">Overview</h2>
                            <p className="text-muted-foreground">{data.overview}</p>
                        </section>
                    </AnimateOnView>

                    {data.needs && (
                        <AnimateOnView y={20} blur once delay={0.25}>
                            <section>
                                <h2 className="h3 md:mb-5 mb-3">What you need</h2>
                                <p className="text-muted-foreground">{data.needs}</p>
                            </section>
                        </AnimateOnView>
                    )}

                    <AnimateOnView y={20} blur once delay={0.3}>
                        <section>
                            <h2 className="h3 md:mb-5 mb-3">What's included</h2>
                            <ul className="space-y-4">
                                {data.points.map((point) => (
                                    <li key={point} className="flex items-start gap-3 text-muted-foreground">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-3 flex-shrink-0" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </AnimateOnView>

                    <AnimateOnView y={20} blur once delay={0.4}>
                        <section>
                            <h2 className="h3 md:mb-5 mb-3">Setup</h2>
                            <ol className="space-y-3 list-decimal pl-5 text-muted-foreground">
                                {data.setup.map((step) => (
                                    <li key={step}>{step}</li>
                                ))}
                            </ol>
                        </section>
                    </AnimateOnView>
                </div>
            </Container>
        </div>
    );
};

export default IntegrationDetails;
