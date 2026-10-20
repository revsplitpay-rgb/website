import { CONTACT_EMAIL } from "@/lib/links";
import { HOLD_DAYS } from "@/lib/pricing";
import CtaBand from "../components/cta-band";
import PageMeta from "../components/page-meta";
import { Container, Section, SectionHeading } from "../components/ui";
import { home } from "../content/copy";
import { providerPhrase } from "../content/providers";

// Facts only, from product.md. No team photos, stats or logos until the owner supplies them.
const blocks = [
  {
    title: "Who it's for",
    text: "High-ticket sales agencies and teams that sell coaching, consulting, courses, programs, services or memberships, often on calls, with closers, setters, managers, partners and support staff on every deal.",
  },
  {
    title: "How money moves",
    text: `Your customer pays your own ${providerPhrase()} account. RevSplitPay works out every person's share, holds commissions for ${HOLD_DAYS} days to protect against refunds, then pays each person to their own payout account. It never holds your money and never stores card details.`,
  },
  {
    title: "Every split on record",
    text: "Each split is recorded at the time of sale and can't be rewritten later, so owners and reps always see the same numbers.",
  },
  {
    title: "Company",
    text: `RevSplitPay is registered in Ireland. Prices are in USD. Reach us at ${CONTACT_EMAIL}.`,
  },
];

const About = () => (
  <>
    <PageMeta title="About | RevSplitPay" description={home.heroSupport} path="/about" />
    <Section>
      <Container>
        <SectionHeading
          as="h1"
          title="Built for teams that sell on calls."
          support="RevSplitPay is the payment and commission platform for sales teams. Your customer pays once, and every closer, setter, partner and manager is paid their exact share automatically."
        />
        <div className="mt-14 grid max-w-[1000px] gap-x-10 gap-y-10 md:grid-cols-2">
          {blocks.map((block) => (
            <div key={block.title} className="border-t border-border pt-6">
              <h2 className="v2-h3 text-foreground">{block.title}</h2>
              <p className="mt-3 text-muted-foreground">{block.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
    <CtaBand />
  </>
);

export default About;
