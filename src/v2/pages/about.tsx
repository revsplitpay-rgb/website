import { CONTACT_EMAIL } from "@/lib/links";
import { HOLD_DAYS } from "@/lib/pricing";
import { Building2, CreditCard, Globe2, Lock, ShieldCheck, Target, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";
import CtaBand from "../components/cta-band";
import { Reveal } from "../components/motion";
import PageHero from "../components/page-hero";
import PageMeta from "../components/page-meta";
import { breadcrumbLd } from "../seo/jsonld";
import { ProvidersHub } from "../components/hero-visual";
import { Container, Grad, Section, SectionHeading } from "../components/ui";
import { home } from "../content/copy";
import { providerPhrase } from "../content/providers";

// Facts only, from product.md. No team photos, stats or logos until the owner supplies them.
const blocks = [
  {
    icon: Target,
    title: "Who it's for",
    text: "High-ticket sales agencies and teams that sell coaching, consulting, courses, programs, services or memberships, often on calls, with closers, setters, managers, partners and support staff on every deal.",
  },
  {
    icon: Workflow,
    title: "How money moves",
    text: `Your customer pays your own ${providerPhrase()} account. RevSplitPay works out every person's share, holds commissions for ${HOLD_DAYS} days to protect against refunds, then pays each person to their own payout account. It never holds your money and never stores card details.`,
  },
  {
    icon: Lock,
    title: "Every split on record",
    text: "Each split is recorded at the time of sale and can't be rewritten later, so owners and reps always see the same numbers.",
  },
  {
    icon: Building2,
    title: "Company",
    text: `RevSplitPay is registered in Ireland. Prices are in USD. Reach us at ${CONTACT_EMAIL}.`,
  },
];

const facts = [
  { icon: Building2, label: "Company", value: "Registered in Ireland" },
  { icon: Globe2, label: "Pricing", value: "Prices in USD" },
  { icon: CreditCard, label: "Payments", value: `Runs on ${providerPhrase()}` },
  { icon: ShieldCheck, label: "Payouts", value: `${HOLD_DAYS}-day safety hold` },
];

const BLOCK_TINTS = [
  "bg-[linear-gradient(160deg,#eef5ff_0%,#ffffff_60%)]",
  "bg-[linear-gradient(160deg,#ebfaff_0%,#ffffff_60%)]",
  "bg-[linear-gradient(160deg,#f1f0ff_0%,#ffffff_60%)]",
  "bg-[linear-gradient(160deg,#ebfbf6_0%,#ffffff_60%)]",
];

const About = () => (
  <>
    <PageMeta
      title="About | RevSplitPay"
      description={home.heroSupport}
      path="/about"
      jsonLd={[breadcrumbLd([{ name: "About", path: "/about" }])]}
    />
    <PageHero
      eyebrow="About"
      title={
        <>
          Built for teams that <Grad>sell on calls</Grad>.
        </>
      }
      support="RevSplitPay is the payment and commission platform for sales teams. Your customer pays once, and every closer, setter, partner and manager is paid their exact share automatically."
    />
    <Section className="pt-0 md:pt-0 lg:pt-0">
      <Container>
        <Reveal>
          <ul className="v2-glass -mt-6 grid overflow-hidden rounded-[24px] sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact, index) => (
              <li
                key={fact.label}
                className={cn(
                  "flex items-center gap-4 p-6",
                  index > 0 && "border-t border-[rgb(0_114_228/0.1)] sm:border-t-0",
                  index % 2 === 1 && "sm:border-l sm:border-[rgb(0_114_228/0.1)]",
                  index >= 2 && "sm:border-t lg:border-t-0",
                  index === 2 && "lg:border-l lg:border-[rgb(0_114_228/0.1)]",
                )}
              >
                <span className="v2-icon-tile h-10 w-10 shrink-0">
                  <fact.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{fact.label}</p>
                  <p className="font-semibold text-foreground">{fact.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {blocks.map((block, index) => (
            <Reveal key={block.title} delay={(index % 2) * 100} className="h-full">
              <div className={cn("v2-card v2-card-hover h-full p-8", BLOCK_TINTS[index % BLOCK_TINTS.length])}>
                <span className="v2-icon-tile h-12 w-12">
                  <block.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-xl font-semibold tracking-tight text-foreground">{block.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{block.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
    <Section tone="tint" labelledBy="providers-title">
      <Container>
        <SectionHeading
          id="providers-title"
          center
          eyebrow="Payment providers"
          title="Runs on the payment provider you already use."
          support="Your money moves between your own accounts. RevSplitPay works out every share and tells the provider who gets paid."
        />
        <div className="mt-12">
          <ProvidersHub />
        </div>
      </Container>
    </Section>
    <CtaBand />
  </>
);

export default About;
