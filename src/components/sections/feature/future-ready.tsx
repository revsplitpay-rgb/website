import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { Bookmark, Building2, LayoutGrid, Zap } from 'lucide-react'
import Container from '../../container'
import FeatureVideo from './feature-video'
import explainVideo from '../../../../video-explain.mp4'

const FutureReadyFinance = () => {
    const features = [
        {
            icon: <Building2 className="w-5 h-5 text-sky-300" />,
            title: "Connect Stripe",
            description: "You connect the business Stripe account. Your team joins with an invite code and connects theirs. Money moves between real accounts, not an internal balance."
        },
        {
            icon: <Zap className="w-5 h-5 text-sky-300" />,
            title: "Set the split, share the link",
            description: "Create a product, set each participant's percentage, then send the checkout link. One-time, recurring, or installments."
        },
        {
            icon: <LayoutGrid className="w-5 h-5 text-sky-300" />,
            title: "Everyone gets paid",
            description: "Every payment splits automatically and transfers to each person's own Stripe account. A 7-day hold covers refunds first."
        },
        {
            icon: <Bookmark className="w-5 h-5 text-sky-300" />,
            title: "The ledger proves it",
            description: "Every deal, every split, every transfer is recorded. Owners and reps read the same ledger. There is no second version."
        }
    ]

    return (
        <section id="how-it-works" className="scroll-mt-24 md:py-[60px] py-12">
            <Container className="md:space-y-20 space-y-8">
                <StaggerContainer className="text-center md:max-w-2xl max-w-xs mx-auto">
                    <AnimateOnView blur>
                        <h2 className="h2 md:mb-5 mb-3">
                            Connect, sell, everyone gets paid
                        </h2>
                    </AnimateOnView>
                    <AnimateOnView blur delay={0.2}>
                        <p className="text-muted-foreground">
                            Three steps. After that it runs on its own.
                        </p>
                    </AnimateOnView>
                </StaggerContainer>

                <AnimateOnView delay={0.3} blur>
                    <FeatureVideo
                        thumbnail="/video thumbline.png"
                        videoUrl={explainVideo}
                    />
                </AnimateOnView>

                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-8">
                    {features.map((feature, index) => (
                        <AnimateOnView key={index} delay={0.4 + index * 0.1} blur>
                            <div className="space-y-6">
                                <div className="w-12 h-12 rounded-full bg-sky-500/10 border border-sky-300/15 flex items-center justify-center">
                                    {feature.icon}
                                </div>
                                <div className="space-y-3">
                                    <h3 className="h4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </AnimateOnView>
                    ))}
                </StaggerContainer>
            </Container>
        </section>
    )
}

export default FutureReadyFinance
