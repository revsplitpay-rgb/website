import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { formatUsd, PLANS } from '@/lib/pricing'
import Container from '../../container'
import Pricing from '../home/pricing'

// Live /pricing header. Plans and fees render from src/lib/pricing.ts via the
// shared home pricing grid, so both pages always quote the same numbers.
const PricingBanner = () => {
    return (
        <section className="hero-padding-top brand-ambient-bg">
            <Container>
                <StaggerContainer className="text-center md:max-w-[640px] max-w-sm mx-auto">
                    <AnimateOnView blur>
                        <h1 className="h1 mb-5">Simple monthly pricing</h1>
                    </AnimateOnView>
                    <AnimateOnView blur delay={0.2}>
                        <p>
                            Plans from {formatUsd(PLANS[0].priceUsd)} a month. Your own share of every sale is never charged a fee.
                        </p>
                    </AnimateOnView>
                </StaggerContainer>
            </Container>
            <Pricing hideHeading />
        </section>
    )
}

export default PricingBanner
