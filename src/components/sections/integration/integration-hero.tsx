import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { INTEGRATIONS } from "@/lib/integrations";
import { Bell, CreditCard, Webhook, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const icons = {
    stripe: <CreditCard className="w-6 h-6 text-sky-300" />,
    whop: <Wallet className="w-6 h-6 text-sky-300" />,
    slack: <Bell className="w-6 h-6 text-sky-300" />,
    webhooks: <Webhook className="w-6 h-6 text-sky-300" />,
};

const IntegrationHero = () => {
    return (
        <section className="hero-padding-top pb-20 brand-ambient-bg">
            <Container className="md:space-y-20 space-y-8">
                <StaggerContainer className="max-w-[560px] mx-auto text-center">
                    <AnimateOnView blur>
                        <h1 className="h1 md:mb-5 mb-3">
                            Works with the tools you already use
                        </h1>
                    </AnimateOnView>
                    <AnimateOnView blur delay={0.2}>
                        <p className="text-lg">
                            Take payments through Stripe or Whop. Send events to Slack or your own tools.
                        </p>
                    </AnimateOnView>
                </StaggerContainer>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
                    {INTEGRATIONS.map((item, index) => (
                        <AnimateOnView key={item.slug} y={20} blur once delay={index * 0.1}>
                            <Link
                                to={`/integration/${item.slug}`}
                                className="group block bg-card border border-border md:rounded-[32px] rounded-lg md:p-10 p-6 hover:border-white/10 transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-8">
                                    {icons[item.slug]}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{item.kind}</p>
                                <h2 className="h3 mb-4">{item.name}</h2>
                                <p className="text-muted-foreground text-sm">{item.summary}</p>
                            </Link>
                        </AnimateOnView>
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default IntegrationHero;
