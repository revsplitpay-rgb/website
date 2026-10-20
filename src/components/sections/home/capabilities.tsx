import { Card, CardContent } from '@/components/ui/card'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import {
    Award,
    BarChart3,
    CheckCircle2,
    FileText,
    ListChecks,
    Medal,
    ReceiptText,
    Split,
    Trophy,
    Wallet,
} from 'lucide-react'
import Container from '../../container'
import { INVOICE_FEE_LABEL } from '@/lib/pricing'

const chip = 'rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-[11px] font-medium text-white/70'
const activeChip = 'rounded-full border border-[#3FC1FF]/30 bg-[#3FC1FF]/[0.11] px-3 py-1 text-[11px] font-semibold text-[#9BDAFF] shadow-[0_0_24px_rgba(63,193,255,0.14)]'

const capabilities = [
    {
        icon: Split,
        title: 'Automatic commission splits',
        body: "Set each person's percentage once. Every sale after that splits itself, pays out through Stripe, and lands in the ledger.",
        points: ['Recurring + installments', 'No exports', 'No calculator'],
        span: 'lg:col-span-3',
        visual: 'split' as const,
        featured: true,
    },
    {
        icon: Wallet,
        title: 'Direct Stripe payouts',
        body: 'Everyone connects their own account through Stripe Express. A 7-day hold clears refunds first, and admins can advance one deal early.',
        points: ['Stripe Express', '7-day hold', 'Early advance'],
        span: 'lg:col-span-3',
        visual: 'timeline' as const,
        featured: true,
    },
    {
        icon: ListChecks,
        title: 'A ledger both sides read',
        body: 'Reps watch their money move from locked to pending to paid. Owners see status, history, and failed transfers with retry.',
        points: ['Locked', 'Pending', 'Paid', 'Retry'],
        span: 'lg:col-span-3',
        visual: 'ledger' as const,
        featured: true,
    },
    {
        icon: FileText,
        title: 'Deals pipeline, with no data entry',
        body: 'Every paid checkout link becomes a tracked deal on its own, with status, amount, deal type and renewal cycle attached.',
        points: ['Open', 'Closed won', 'Refunded'],
        span: 'lg:col-span-3',
        visual: 'pipeline' as const,
    },
    {
        icon: Trophy,
        title: 'Leaderboard that credits the setter',
        body: 'Ranked by revenue over 7, 30 and 90 days. Both closer and setter get credit.',
        points: ['7 days', '30 days', '90 days'],
        span: 'lg:col-span-2',
        visual: 'bars' as const,
    },
    {
        icon: ReceiptText,
        title: 'Invoices from your team',
        body: `A rep invoices you for extra work or an agreed bonus. You approve it and pay in one click by card, bank transfer or your Whop balance, with a ${INVOICE_FEE_LABEL} fee.`,
        points: ['Approve', 'Pay in one click', `${INVOICE_FEE_LABEL} fee`],
        span: 'lg:col-span-2',
        visual: 'request' as const,
    },
    {
        icon: Award,
        title: 'Awards, with or without cash',
        body: `Give a rep a badge or a cash award. Cash awards come with a payment link and the money goes straight to the rep, with a ${INVOICE_FEE_LABEL} fee.`,
        points: ['Badge', 'Cash award', `${INVOICE_FEE_LABEL} fee`],
        span: 'lg:col-span-2',
        visual: 'award' as const,
    },
    {
        icon: Medal,
        title: 'Tiers, badges and verified cards',
        body: 'Eight tiers from First Deal to Legendary, earned on lifetime verified revenue. Every rep gets a public profile and downloadable card.',
        points: ['Verified revenue', 'Public profile', 'Downloadable card'],
        span: 'lg:col-span-4',
        visual: 'tiers' as const,
        featured: true,
    },
    {
        icon: BarChart3,
        title: 'Analytics that matter',
        body: 'Revenue, top performers, deal status and payout health, on one owner dashboard.',
        points: ['Revenue', 'Payout health', 'Top reps'],
        span: 'lg:col-span-2',
        visual: 'analytics' as const,
    },
]

type VisualKind = typeof capabilities[number]['visual']

const SplitVisual = () => (
    <div className="mt-6 space-y-4" aria-hidden="true">
        <div className="mx-auto w-fit rounded-2xl border border-[#3FC1FF]/25 bg-[#3FC1FF]/[0.08] px-5 py-3 text-center shadow-[0_0_34px_rgba(0,114,228,0.18)]">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9BDAFF]/70">Sale received</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums text-white">$2,000</p>
        </div>
        <div className="relative grid grid-cols-3 gap-2 pt-5 before:absolute before:left-1/2 before:top-0 before:h-5 before:w-px before:bg-[#3FC1FF]/50 after:absolute after:left-[17%] after:right-[17%] after:top-5 after:h-px after:bg-[#3FC1FF]/35">
            {[
                ['Owner', '$1,600'],
                ['Closer', '$300'],
                ['Setter', '$100'],
            ].map(([label, value]) => (
                <div key={label} className="relative rounded-2xl border border-white/10 bg-black/25 p-3 text-center backdrop-blur-sm before:absolute before:left-1/2 before:top-[-20px] before:h-5 before:w-px before:bg-[#3FC1FF]/35">
                    <p className="text-[11px] text-white/50">{label}</p>
                    <p className="mt-1 text-lg font-semibold tabular-nums text-white">{value}</p>
                </div>
            ))}
        </div>
    </div>
)

const TimelineVisual = () => (
    <div className="mt-6" aria-hidden="true">
        <div className="relative flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-black/20 p-3">
            {['Locked', '7-day hold', 'Pending', 'Paid'].map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                    <span className={index === 3 ? activeChip : chip}>{step}</span>
                    {index < 3 && <span className="text-[#3FC1FF]/45">→</span>}
                </div>
            ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
            <span className={chip}>Refund window clears first</span>
            <span className={chip}>Advance one deal early</span>
        </div>
    </div>
)

const LedgerVisual = () => (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/25" aria-hidden="true">
        {[
            ['Deal #1842', '$1,600', 'Paid'],
            ['Deal #1843', '$300', 'Pending'],
            ['Deal #1844', '$100', 'Retry'],
        ].map(([deal, amount, status]) => (
            <div key={deal} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-white/10 px-4 py-3 last:border-b-0">
                <span className="text-xs text-white/62">{deal}</span>
                <span className="text-xs font-medium tabular-nums text-white">{amount}</span>
                <span className={status === 'Paid' ? activeChip : chip}>{status}</span>
            </div>
        ))}
    </div>
)

const PipelineVisual = () => (
    <div className="mt-6 flex flex-wrap gap-2" aria-hidden="true">
        {['Open', 'Closed won', 'Expired', 'Refunded'].map((status, index) => (
            <span key={status} className={index === 1 ? activeChip : chip}>{status}</span>
        ))}
    </div>
)

const BarsVisual = () => (
    <div className="mt-6 flex h-16 items-end gap-1.5" aria-hidden="true">
        {[38, 62, 100, 47, 74, 29].map((height, index) => (
            <span
                key={index}
                style={{ height: `${height}%` }}
                className="w-full rounded-t-md bg-gradient-to-t from-[#0058B8]/35 to-[#3FC1FF]/80 shadow-[0_0_18px_rgba(63,193,255,0.14)]"
            />
        ))}
    </div>
)

const TiersVisual = () => (
    <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4" aria-hidden="true">
        {['First Deal', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Elite', 'Legendary'].map((tier, index) => (
            <span key={tier} className={index === 7 ? activeChip : chip}>{tier}</span>
        ))}
    </div>
)

const SmallVisual = ({ kind }: { kind: VisualKind }) => {
    if (kind === 'request') {
        return (
            <div className="mt-6 flex items-center gap-2" aria-hidden="true">
                <span className={chip}>Request</span><span className="text-[#3FC1FF]/45">→</span><span className={chip}>Approve</span><span className="text-[#3FC1FF]/45">→</span><span className={activeChip}>Paid</span>
            </div>
        )
    }
    if (kind === 'award') {
        return <div className="mt-6 flex flex-wrap gap-2" aria-hidden="true"><span className={activeChip}>{INVOICE_FEE_LABEL} fee on paid awards</span><span className={chip}>Cash optional</span></div>
    }
    if (kind === 'analytics') {
        return <BarsVisual />
    }
    return null
}

const Visual = ({ kind }: { kind: VisualKind }) => {
    if (kind === 'split') return <SplitVisual />
    if (kind === 'timeline') return <TimelineVisual />
    if (kind === 'ledger') return <LedgerVisual />
    if (kind === 'pipeline') return <PipelineVisual />
    if (kind === 'bars') return <BarsVisual />
    if (kind === 'tiers') return <TiersVisual />
    return <SmallVisual kind={kind} />
}

const Capabilities = () => {
    return (
        <section id="features" className="relative scroll-mt-24 overflow-hidden py-12 md:py-[72px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_36%_at_50%_0%,rgba(0,114,228,0.12),transparent_70%)]" />
            <Container className="relative space-y-8 md:space-y-16">
                <StaggerContainer className="mx-auto max-w-2xl text-center">
                    <AnimateOnView blur>
                        <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-[#3FC1FF]/20 bg-[#3FC1FF]/[0.07] px-4 py-2 text-sm font-medium text-[#9BDAFF]">
                            <span className="h-2 w-2 rounded-full bg-[#3FC1FF] shadow-[0_0_14px_rgba(63,193,255,0.9)]" />
                            Everything after checkout
                        </div>
                        <h2 className="h2 mb-5">One system, from checkout to payout</h2>
                    </AnimateOnView>
                    <AnimateOnView blur delay={0.2}>
                        <p className="text-muted-foreground">
                            Everything that used to live in a spreadsheet, a chat thread and a bank tab.
                        </p>
                    </AnimateOnView>
                </StaggerContainer>

                <StaggerContainer>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
                        {capabilities.map((item, index) => (
                            <AnimateOnView
                                key={item.title}
                                blur
                                delay={Math.min(index, 5) * 0.06}
                                className={`${item.span} sm:col-span-2`}
                            >
                                <Card className="group relative h-full overflow-hidden rounded-[28px] border border-primary/10 bg-[#0b0f16] transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:shadow-2xl hover:shadow-primary/10">
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(63,193,255,0.14),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.035),transparent_38%)] opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                                    <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#3FC1FF]/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                    <CardContent className="relative flex h-full flex-col p-6 md:p-7">
                                        <div className="mb-5 flex items-center justify-between gap-4">
                                            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3FC1FF]/20 bg-[#3FC1FF]/[0.075] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                                                <item.icon className="h-5 w-5 text-[#8FD3FF]" strokeWidth={1.5} />
                                            </span>
                                            {item.featured && (
                                                <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-[11px] font-medium text-white/55">
                                                    Core flow
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="h4 mb-3 text-foreground">{item.title}</h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">{item.body}</p>
                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {item.points.map((point) => (
                                                <span key={point} className={chip}>{point}</span>
                                            ))}
                                        </div>
                                        <div className="mt-auto">
                                            <Visual kind={item.visual} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimateOnView>
                        ))}
                    </div>
                </StaggerContainer>
            </Container>
        </section>
    )
}

export default Capabilities
