import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { ArrowLeftRight, BadgeCheck, ShieldCheck } from 'lucide-react'
import Container from '../../container'

// Sits where the template's fabricated logo ticker used to be. Everything here
// is checkable against the product: Stripe Connect, direct transfers between
// connected accounts, and the 7-day settlement hold.
const points = [
  {
    icon: ArrowLeftRight,
    title: 'Direct Stripe transfers',
    body: 'Commissions move between your own connected accounts. We are never holding your money.',
  },
  {
    icon: ShieldCheck,
    title: '7-day settlement hold',
    body: 'Every commission waits out the refund window before a single dollar leaves.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified by real payment data',
    body: 'Every figure on a rep profile traces back to a payment that actually settled.',
  },
]

const StripeTrust = () => {
  return (
    <section className="relative border-y border-white/[0.07] py-10 md:py-14">
      <Container>
        <StaggerContainer>
          <AnimateOnView blur>
            <p className="text-center text-xs uppercase tracking-[0.18em] text-muted-foreground/70 mb-8 md:mb-10">
              Payouts run on Stripe Connect
            </p>
          </AnimateOnView>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 md:gap-10">
            {points.map((point, index) => (
              <AnimateOnView
                key={point.title}
                blur
                delay={0.1 + index * 0.1}
                className="flex items-start gap-3.5 text-left"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#3FC1FF]/20 bg-[#3FC1FF]/[0.07]">
                  <point.icon className="h-[18px] w-[18px] text-[#8FD3FF]" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-foreground mb-1">
                    {point.title}
                  </span>
                  <span className="block text-sm leading-relaxed text-muted-foreground">
                    {point.body}
                  </span>
                </span>
              </AnimateOnView>
            ))}
          </div>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default StripeTrust
