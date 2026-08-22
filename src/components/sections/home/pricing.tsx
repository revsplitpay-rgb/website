import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import Container from '../../container'
import { PricingCard } from '../../ui/pricing-card'

// One product, four revenue bands. The feature list is identical on purpose:
// nothing is gated by tier, only the monthly subscription changes with volume.
const includedInEveryPlan = [
  "Automatic commission splits on every sale",
  "Direct Stripe payouts to every team member",
  "Live ledger, deals pipeline and leaderboard",
  "Achievements, tiers and verified performance cards",
  "3.5% platform fee on team commissions",
]

const pricingPlans = [
  {
    id: 1,
    title: "Growth",
    description: "For businesses processing up to $100K a month.",
    price: "$300",
    pricePeriod: "/month",
    features: includedInEveryPlan,
    buttonText: "Get Started",
    buttonLink: "/contact",
    isHighlighted: true,
  },
  {
    id: 2,
    title: "Scale",
    description: "For $100K to $250K a month.",
    price: "$600",
    pricePeriod: "/month",
    features: includedInEveryPlan,
    buttonText: "Get Started",
    buttonLink: "/contact",
    isHighlighted: false,
  },
  {
    id: 3,
    title: "Pro",
    description: "For $250K to $500K a month.",
    price: "$900",
    pricePeriod: "/month",
    features: includedInEveryPlan,
    buttonText: "Get Started",
    buttonLink: "/contact",
    isHighlighted: false,
  },
  {
    id: 4,
    title: "Enterprise",
    description: "For businesses processing over $500K a month.",
    price: "$1,500",
    pricePeriod: "/month",
    features: includedInEveryPlan,
    buttonText: "Get Started",
    buttonLink: "/contact",
    isHighlighted: false,
  },
]

const Pricing = () => {

  return (
    <section id="pricing" className="scroll-mt-24 py-12 md:py-[60px]">
      <Container className="space-y-8 md:space-y-20">
        <StaggerContainer className="text-center">
          <AnimateOnView blur>
            <h2
              className="h2 mb-5"
            >
              Priced on what you process
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p
              className="text-muted-foreground"
            >
              One subscription that tracks your monthly revenue, plus 3.5% of each team member's commission. Your own share is exempt, and award bonuses carry no fee.
            </p>
          </AnimateOnView>
        </StaggerContainer>
        <StaggerContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-4">
            {pricingPlans.map((plan, index) => (
              <AnimateOnView
                key={plan.id}
                delay={index * 0.1}
              >
                <PricingCard
                  title={plan.title}
                  description={plan.description}
                  price={plan.price}
                  pricePeriod={plan.pricePeriod}
                  features={plan.features}
                  buttonText={plan.buttonText}
                  buttonLink={plan.buttonLink}
                  isHighlighted={plan.isHighlighted}
                  compact
                />
              </AnimateOnView>
            ))}
          </div>
          <AnimateOnView delay={0.3}>
            <p className="text-center text-sm text-muted-foreground/80 mt-8">
              Every plan includes every feature. Invoices and payment requests are 3%, award bonuses carry no platform fee, and Stripe&rsquo;s standard processing rates apply.
            </p>
          </AnimateOnView>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Pricing

