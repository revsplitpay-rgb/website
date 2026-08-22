import feature3 from "@/assets/lottie/512k new.json"
import feature2 from "@/assets/lottie/edward collins new new.json"
import feature1 from "@/assets/lottie/progress hours spent.json"
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { Link } from 'react-router-dom'
import Container from '../../container'
import { scrollToSection } from '@/lib/scroll-to-section'
import { Button } from '../../ui/button'
import {
  FeatureCard,
  FeatureCardAction,
  FeatureCardBenefitItem,
  FeatureCardBenefits,
  FeatureCardContent,
  FeatureCardDescription,
  FeatureCardImage,
  FeatureCardOverlay,
  FeatureCardTitle
} from '../../ui/feature-card'

const cards = [
  {
    id: 1,
    title: "Stop doing commission math",
    description: "Set each person's percentage once. Every sale after that splits itself, pays out through Stripe, and lands in the ledger. No export, no calculator, no paying people on Friday.",
    imageSrc: "/images/feature/feature-alt-1.png",
    imageAlt: "Business owner reviewing automatic commission splits",
    overlayData: {
      animationData: feature1,
      className: "aspect-[213/138] w-full max-w-[230px]"
    },
    overlayPosition: "top-left" as const,
    benefits: [
      "Splits calculated on every sale, including recurring and installments.",
      "A 7-day settlement hold clears refunds before money leaves.",
      "Failed transfers surface with a retry instead of going quiet."
    ],
    ctaText: "See how splits work",
    ctaHref: "how-it-works"
  },
  {
    id: 2,
    title: "Nobody has to ask where their money is",
    description: "Your cut goes to your own Stripe account. You watch it move from locked to pending to paid in your own ledger, without asking anyone.",
    imageSrc: "/images/feature/feature-alt-2.png",
    imageAlt: "Closer checking a live commission ledger",
    overlayData: {
      animationData: feature2,
      className: "aspect-[228/254] w-full max-w-[228px]"
    },
    overlayPosition: "top-right" as const,
    benefits: [
      "Paid by direct Stripe transfer, straight to your account.",
      "A live ledger of every dollar: locked, pending, paid.",
      "Need it sooner? Request an early payout on a single deal."
    ],
    ctaText: "See your ledger",
    ctaHref: "features"
  },
  {
    id: 3,
    title: "A track record you can prove",
    description: "Anyone can claim a $50K month. Your rank, tier and lifetime revenue here are built from settled Stripe payments, so the number is checkable. Closers, setters and partners all get one.",
    imageSrc: "/images/home/track-record-proof.png",
    imageAlt: "Verified performance card showing rank, tier and lifetime revenue",
    overlayData: {
      animationData: feature3,
      className: "aspect-[292/187] w-full max-w-[292px]"
    },
    overlayPosition: "bottom-left" as const,
    benefits: [
      "Eight tiers, from First Deal to Legendary, earned on verified revenue.",
      "A public profile and a downloadable performance card.",
      "It stays yours. Your record follows you to the next team."
    ],
    ctaText: "See a performance card",
    ctaHref: "proof"
  }
]

const Features = () => {

  return (
    <section id="for-teams" className="scroll-mt-24 py-12 md:py-[60px] bg-transparent">
      <Container className="space-y-8 md:space-y-20">
        <StaggerContainer className="text-center max-w-xl mx-auto">
          <AnimateOnView
            blur
          >
            <h2
              className="h2 mb-6"
            >
              Built for both sides of the deal
            </h2>
          </AnimateOnView>
          <AnimateOnView
            blur
            delay={0.2}
          >
            <p
              className='text-muted-foreground'
            >
              The person who owns the revenue and the people who earn a cut of it are looking at the same ledger. That is the whole idea.
            </p>
          </AnimateOnView>
        </StaggerContainer>
        <StaggerContainer
          className='max-w-[1062px] mx-auto md:space-y-[60px] space-y-8'
        >
          {cards.map((card, index) => (
            <AnimateOnView
              delay={index * 0.1}
              key={card.id}
              className="md:sticky md:top-24 z-10 md:rounded-[30px] rounded-lg [perspective:1400px]"
            >
              <FeatureCard
                imagePosition={index === 1 ? "left" : "right"}
                className="transition-all duration-500 hover:shadow-2xl hover:shadow-primary/15 hover:[transform:rotateX(1.5deg)_rotateY(-2deg)_translateY(-8px)]"
              >
                <FeatureCardContent>
                  <FeatureCardTitle>{card.title}</FeatureCardTitle>
                  <FeatureCardDescription className="mb-5">{card.description}</FeatureCardDescription>
                  <FeatureCardBenefits>
                    {card.benefits.map((benefit) => (
                      <FeatureCardBenefitItem key={benefit}>{benefit}</FeatureCardBenefitItem>
                    ))}
                  </FeatureCardBenefits>
                  <FeatureCardAction>
                    <Button asChild>
                      <a href={`#${card.ctaHref}`} onClick={(e) => scrollToSection(e, card.ctaHref)}>
                        {card.ctaText}
                      </a>
                    </Button>
                  </FeatureCardAction>
                </FeatureCardContent>
                <FeatureCardImage src={card.imageSrc} alt={card.imageAlt}>
                  <FeatureCardOverlay
                    animationData={card.overlayData.animationData}
                    src={"src" in card.overlayData && typeof card.overlayData.src === "string" ? card.overlayData.src : undefined}
                    alt={"alt" in card.overlayData && typeof card.overlayData.alt === "string" ? card.overlayData.alt : undefined}
                    position={card.overlayPosition}
                    className={card.overlayData.className}
                  />
                </FeatureCardImage>
              </FeatureCard>
            </AnimateOnView>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Features
