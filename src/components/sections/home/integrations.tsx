import { Button } from '@/components/ui/button'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { Link } from 'react-router-dom'
import Container from '../../container'
import revSplitPayLogo from '../../../../LOGO BLUE.png'

// Monogram tiles stand in for real brand marks. Drop an <img src> into `mark`
// when you have partner SVG logos; the layout does not need to change.
type Tool = { name: string; mark: string; color: string }

const rows: Tool[][] = [
    [
        { name: 'Slack', mark: 'SL', color: '#4A154B' },
        { name: 'HubSpot', mark: 'HS', color: '#FF7A59' },
    ],
    [
        { name: 'Zapier', mark: 'ZP', color: '#FF4F00' },
        { name: 'GoHighLevel', mark: 'GHL', color: '#188BF6' },
    ],
    [
        { name: 'Make', mark: 'MK', color: '#6D00CC' },
        { name: 'Any webhook', mark: '{ }', color: '#3FC1FF' },
    ],
]

const Tile = ({ tool }: { tool: Tool }) => (
    <div className="flex h-[104px] w-[104px] flex-col items-center justify-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-colors duration-300 hover:border-[#3FC1FF]/25 hover:bg-white/[0.04]">
        <span
            className="flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-semibold text-white"
            style={{ backgroundColor: tool.color }}
            aria-hidden="true"
        >
            {tool.mark}
        </span>
        <span className="text-[11px] leading-none text-muted-foreground">{tool.name}</span>
    </div>
)

const Integrations = () => {
    return (
        <section id="integrations" className="scroll-mt-24 py-12 md:py-[60px]">
            <Container>
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Tile cluster */}
                    <AnimateOnView blur className="flex justify-center lg:justify-start">
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex gap-3">
                                {rows[0].map((t) => (
                                    <Tile key={t.name} tool={t} />
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                <Tile tool={rows[1][0]} />
                                <div className="relative flex h-[104px] w-[104px] items-center justify-center rounded-2xl border border-[#3FC1FF]/25 bg-[#3FC1FF]/[0.06]">
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_50%,rgba(63,193,255,0.22),transparent_70%)]"
                                    />
                                    <img
                                        src={revSplitPayLogo}
                                        alt="RevSplitPay"
                                        className="relative h-12 w-12 rounded-xl"
                                    />
                                </div>
                                <Tile tool={rows[1][1]} />
                            </div>
                            <div className="flex gap-3">
                                {rows[2].map((t) => (
                                    <Tile key={t.name} tool={t} />
                                ))}
                            </div>
                        </div>
                    </AnimateOnView>

                    {/* Copy */}
                    <StaggerContainer className="text-center lg:text-left">
                        <AnimateOnView blur>
                            <h2 className="h2 mb-5">Integrate with your favorite tools</h2>
                        </AnimateOnView>
                        <AnimateOnView blur delay={0.2}>
                            <p className="text-muted-foreground mb-6 max-w-lg mx-auto lg:mx-0">
                                Every deal closed, commission split and payout sent can fire a webhook. Push those events into Slack, HubSpot, GoHighLevel, Zapier, Make, or anything else that accepts one, and your team finds out where they already work.
                            </p>
                        </AnimateOnView>
                        <AnimateOnView blur delay={0.3}>
                            <p className="text-sm text-muted-foreground/70 mb-8 max-w-lg mx-auto lg:mx-0">
                                Payments themselves always run through Stripe Connect. Webhooks carry the events, never the money.
                            </p>
                        </AnimateOnView>
                        <AnimateOnView delay={0.4} className="flex justify-center lg:justify-start">
                            <Button asChild>
                                <Link to="/contact">Get Started</Link>
                            </Button>
                        </AnimateOnView>
                    </StaggerContainer>
                </div>
            </Container>
        </section>
    )
}

export default Integrations
