import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import Container from '../../container'
import { PricingCard } from '../../ui/pricing-card'

import { APP_SIGNUP_URL } from '@/lib/links'
import {
  COMMISSION_FEE_LABEL,
  ENTERPRISE_THRESHOLD_LABEL,
  EXTRA_MEMBER_USD,
  INVOICE_FEE_LABEL,
  PLANS,
  formatUsd,
} from '@/lib/pricing'

// Plans and fees come from src/lib/pricing.ts (product.md section 8).
const planFeatures: Record<string, string[]> = {
  starter: [
    "Checkout links, subscriptions, instalments and payment plans",
    "Automatic commission splits and payouts",
    "Invoices, awards, badges and leaderboard",
    "Slack, webhooks and CSV export",
  ],
  growth: [
    "Everything in Starter",
    "Award rules (automatic bonuses)",
    "Commission boosts",
    "Goal tracker for reps",
  ],
  scale: [
    "Everything in Growth",
    "Private Slack channel with our team",
    "Personal setup call",
    "Priority support, replies within 4 business hours",
  ],
}

const pricingPlans = [
  ...PLANS.map((plan) => ({
    id: plan.id,
    title: plan.name,
    description: `Up to ${plan.salesLimitLabel} in sales a month · ${plan.includedMembers} team members included`,
    price: formatUsd(plan.priceUsd),
    pricePeriod: "/month",
    features: planFeatures[plan.id],
    buttonText: "Get Started",
    buttonLink: APP_SIGNUP_URL,
    isHighlighted: Boolean(plan.badge),
  })),
  {
    id: "enterprise",
    title: "Enterprise",
    description: `For teams selling over ${ENTERPRISE_THRESHOLD_LABEL} a month.`,
    price: "Custom",
    pricePeriod: "",
    features: ["Everything in Scale", "Pricing agreed directly with our team"],
    buttonText: "Talk to us",
    buttonLink: "/contact",
    isHighlighted: false,
  },
]

const Pricing = ({ hideHeading = false }: { hideHeading?: boolean }) => {

  return (
    <section id="pricing" className="scroll-mt-24 py-12 md:py-[60px]">
      <Container className="space-y-8 md:space-y-20">
        {!hideHeading && (
        <StaggerContainer className="text-center">
          <AnimateOnView blur>
            <h2
              className="h2 mb-5"
            >
              Simple monthly pricing
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p
              className="text-muted-foreground"
            >
              Pick a plan by your monthly sales. Extra team members are {formatUsd(EXTRA_MEMBER_USD)} a month each, and you never count as one.
            </p>
          </AnimateOnView>
        </StaggerContainer>
        )}
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
              Platform fee: {COMMISSION_FEE_LABEL} of each commission paid to a team member, taken from their payout. Your own share has no fee. Invoices and paid awards: {INVOICE_FEE_LABEL}. Stripe or Whop processing fees apply as usual.
            </p>
          </AnimateOnView>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Pricing

