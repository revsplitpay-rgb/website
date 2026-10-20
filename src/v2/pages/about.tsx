import { CONTACT_EMAIL } from "@/lib/links";
import { HOLD_DAYS } from "@/lib/pricing";
import { Building2, Lock, Target, Workflow } from "lucide-react";
import CtaBand from "../components/cta-band";
import { Reveal } from "../components/motion";
import PageHero from "../components/page-hero";
import PageMeta from "../components/page-meta";
import { Container, Grad, Section } from "../components/ui";
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

const About = () => (
  <>
    <PageMeta title="About | RevSplitPay" description={home.heroSupport} path="/about" />
    <PageHero
      eyebrow="About"
      title={
        <>
          Built for teams that <Grad>sell on calls</Grad>.
        </>
      }
      support="RevSplitPay is the payment and commission platform for sales teams. Your customer pays once, and every closer, setter, partner and manager is paid their exact share automatically."
    />
    <Section className="pt-12 md:pt-16">
      <Container>
        <div className="grid gap-5 md:grid-cols-2">
          {blocks.map((block, index) => (
            <Reveal key={block.title} delay={(index % 2) * 100} className="h-full">
              <div className="v2-card v2-card-hover h-full p-8">
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
    <CtaBand />
  </>
);

export default About;
