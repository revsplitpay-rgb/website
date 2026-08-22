import feature3 from "@/assets/lottie/19k-earning.json"
import feature1 from "@/assets/lottie/growth-100.json"
import feature4 from "@/assets/lottie/integrations.json"
import feature2 from "@/assets/lottie/unlimited-cashback.json"

import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import Lottie from 'lottie-react'
import Container from '../../container'

const features = [
    {
        id: 1,
        title: "Grow Savings Faster Every Day",
        description: "Earn higher interest effortlessly on every single deposit.",
        lottieData: feature1,
    },
    {
        id: 2,
        title: "Earn Cashback Without Any Limits",
        description: "Get two percent back on every purchase made.",
        lottieData: feature2,
    },
    {
        id: 3,
        title: "Track Weekly Financial Growth Easily",
        description: "Spot spending patterns and plan smarter financial moves.",
        lottieData: feature3,
    },
    {
        id: 4,
        title: "Seamless App & Tool Integrations",
        description: "Sync Paymark with tools for smoother money management.",
        lottieData: feature4,
    }
]

const FeatureGrid = () => {

    return (
        <section className="md:py-[60px] py-12">
            <Container className="md:space-y-20 space-y-8">
                <StaggerContainer className="text-center md:max-w-xl max-w-sm mx-auto">
                    <AnimateOnView blur>
                        <h2 className="h2 md:mb-5 mb-3">
                            Bank Smarter, Earn More
                        </h2>
                    </AnimateOnView>
                    <AnimateOnView blur delay={0.2}>
                        <p className="text-muted-foreground">
                            High-yield accounts, cashback cards, and flexible capital designed to help you grow.
                        </p>
                    </AnimateOnView>
                </StaggerContainer>

                <StaggerContainer>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <AnimateOnView
                                key={feature.id}
                                delay={index * 0.1}
                                className={`h-full`}
                            >
                                <div className="border-0 bg-card rounded-[32px] overflow-hidden">
                                    <div className="w-full">
                                        <Lottie
                                            animationData={feature.lottieData}
                                            loop={true}
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="h4 mb-[9px]">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </AnimateOnView>
                        ))}
                    </div>
                </StaggerContainer>
            </Container>
        </section>
    )
}

export default FeatureGrid
