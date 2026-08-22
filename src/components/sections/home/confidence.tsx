import lottieData from '@/assets/lottie/confidence.json'
import { Button } from '@/components/ui/button'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'
import Container from '../../container'
import { scrollToSection } from '@/lib/scroll-to-section'

const Confidence = () => {
  return (
    <section
      id="problem"
      className="scroll-mt-24 relative overflow-hidden bg-[#080a0f] lg:pt-[218px] lg:pb-[291px] md:pt-[60px] md:pb-[60px] pt-12 pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_52%_at_50%_20%,rgba(0,114,228,0.16),transparent_68%),linear-gradient(180deg,#080a0f_0%,rgba(8,10,15,0.92)_20%,rgba(8,10,15,0.96)_72%,#080a0f_100%)]" />
      {/* Lottie Background */}
      <div className="absolute inset-x-0 top-0 z-0 pointer-events-none md:block hidden opacity-70">
        <div className='max-w-[1440px] mx-auto aspect-[1200/650] w-full'>
          <Lottie
            animationData={lottieData}
            loop={true}
            className="w-full h-full brand-lottie-blue-strong"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <StaggerContainer className="text-center max-w-[600px] mx-auto">
          <AnimateOnView
            blur
          >
            <h2
              className="h2 md:mb-5 mb-3"
            >
              Right now, payday runs on a spreadsheet
            </h2>
          </AnimateOnView>
          <AnimateOnView
            blur
            delay={0.2}
          >
            <p
              className='text-muted-foreground md:mb-10 mb-5'
            >
              Someone exports the sales sheet. Someone works out the percentages. Someone sends the transfers one at a time, and then gets a message asking where the money is. Every month, the same hours. And every mistake costs trust you don't get back.
            </p>
          </AnimateOnView>
          <AnimateOnView>
            <Button asChild>
              <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')}>
                See how splits work
              </a>
            </Button>
          </AnimateOnView>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Confidence
