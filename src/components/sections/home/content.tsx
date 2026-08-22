import lottie1 from '@/assets/lottie/content-1.json';
import lottie2 from '@/assets/lottie/content-2.json';
import lottie3 from '@/assets/lottie/content-3.json';
import weeklyGrowthAnimation from '@/assets/lottie/19k-earning.json';
import { AnimateOnView } from '@/components/ui/motion/animate-on-view';
import { StaggerContainer } from '@/components/ui/motion/stagger';
import Lottie from 'lottie-react';
import Container from '../../container';

const streamlineFeatures = [
  {
    id: 1,
    title: "Every deal tracked automatically",
    description: "Every paid checkout link becomes a tracked deal. Open, won, lost, expired, churned, refunded, with no manual pipeline entry.",
    lottieData: lottie1,
  },
  {
    id: 2,
    title: "One-off payments, handled",
    description: "A rep requests a bonus or a reimbursement. You approve it, Stripe generates the link, the money arrives. No side transfers.",
    lottieData: weeklyGrowthAnimation,
  },
  {
    id: 3,
    title: "A leaderboard that credits the setter too",
    description: "Ranked by revenue over 7, 30 and 90 days. Both the closer and the setter on a deal get credit, not just whoever made the link. Revenue generated and commission earned, side by side.",
    lottieData: lottie3,
  },
];

const Content = () => {
  return (
    <section className="py-12 md:py-[60px]">
      <Container className="space-y-8 md:space-y-20">
        <StaggerContainer className="text-center">
          <AnimateOnView blur>
            <h2
              className="h2 md:mb-5 mb-3"
            >
              Everything that used to be admin
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p
              className="text-muted-foreground"
            >
              The parts of payday nobody wants to own.
            </p>
          </AnimateOnView>
        </StaggerContainer>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {streamlineFeatures.slice(0, 2).map((feature, index) => (
              <AnimateOnView
                key={feature.id}
                delay={index * 0.1}
              >
                <div className="group relative border border-primary/10 brand-panel-bg rounded-[32px] overflow-hidden shadow-2xl shadow-primary/5 transition-all duration-500 hover:border-primary/30 hover:shadow-primary/15">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(63,193,255,0.18),transparent_34%),linear-gradient(180deg,rgba(0,114,228,0.12),transparent_55%)]" />
                  <div className="relative w-full aspect-[519/317] flex items-center justify-center overflow-hidden">
                    <Lottie
                      animationData={feature.lottieData}
                      loop={true}
                      className="w-full h-full opacity-90 [filter:hue-rotate(190deg)_saturate(1.7)_brightness(1.08)] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0D12] via-transparent to-transparent" />
                  </div>
                  <div className="relative p-6 text-center md:text-left">
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
          <AnimateOnView delay={0.2}>
            <div className="group relative border border-primary/10 brand-panel-bg rounded-[32px] overflow-hidden shadow-2xl shadow-primary/5 transition-all duration-500 hover:border-primary/30 hover:shadow-primary/15">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_26%,rgba(63,193,255,0.2),transparent_36%),linear-gradient(180deg,rgba(0,114,228,0.14),transparent_60%)]" />
              <div className="relative w-full xl:h-[350px] flex items-center justify-center overflow-hidden">
                <Lottie
                  animationData={streamlineFeatures[2].lottieData}
                  loop={true}
                  className="w-full h-full opacity-90 [filter:hue-rotate(190deg)_saturate(1.7)_brightness(1.08)] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0D12] via-transparent to-transparent" />
              </div>
              <div className="relative p-6 text-center">
                <h3 className="h4 mb-[9px]">
                  {streamlineFeatures[2].title}
                </h3>
                <p className="text-muted-foreground">
                  {streamlineFeatures[2].description}
                </p>
              </div>
            </div>
          </AnimateOnView>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Content
