import { Button } from '@/components/ui/button'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { Link } from 'react-router-dom'
import Container from '../../container'

// Replaces the template's fabricated testimonial slider. product.md forbids
// invented social proof, so the proof story is the verified credential itself.
const Trust = () => {
  return (
    <section id="proof" className="relative isolate scroll-mt-24 overflow-hidden py-12 md:py-[60px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgba(0,114,228,0.16),transparent_70%)]"
      />
      <Container>
        <StaggerContainer className="text-center max-w-[640px] mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-5 mb-3">
              The receipt is the proof
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground md:mb-10 mb-5">
              We have no logos to show you yet. What we have is a system where every number on it came from a payment that actually settled. That is the whole product: the claim and the receipt are the same object.
            </p>
          </AnimateOnView>
          <AnimateOnView delay={0.3}>
            <Button asChild>
              <Link to="/contact">
                Get started
              </Link>
            </Button>
          </AnimateOnView>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Trust
