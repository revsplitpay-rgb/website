
import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { Newsletter } from "@/components/ui/newsletter";

const AboutHero = () => {
    return (
        <section className="relative md:h-screen flex items-center justify-start overflow-hidden pt-32 pb-20 brand-ambient-bg">
            {/* Background Placeholder */}
            <div className="absolute inset-0 bg-black/35">
            </div>

            <Container className="w-full">
                <StaggerContainer className="max-w-[710px]">
                    {/* Headline */}
                    <AnimateOnView blur once>
                        <h1 className="h1 mb-4">
                            Smart Solutions Built for the Future of Finance
                        </h1>
                    </AnimateOnView>

                    {/* Subheadline */}
                    <AnimateOnView blur once delay={0.1}>
                        <p className="text-lg mb-[21px]">
                            Track the growth and engagement of your newsletter detailed analytics your reach.
                        </p>
                    </AnimateOnView>

                    {/* Newsletter Form */}
                    <AnimateOnView blur once delay={0.2}>
                        <Newsletter />
                    </AnimateOnView>
                </StaggerContainer>
            </Container>
        </section>
    );
};

export default AboutHero;
