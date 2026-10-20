import { APP_SIGNUP_URL } from "@/lib/links";
import { ArrowRight, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import CtaBand from "../components/cta-band";
import { LeaderboardExample, PayoutExample } from "../components/examples";
import Faq from "../components/faq";
import Ledger from "../components/ledger";
import MoneyFlow from "../components/money-flow";
import { Reveal } from "../components/motion";
import PageMeta from "../components/page-meta";
import PlanCards from "../components/plan-cards";
import { ButtonLink, Container, Section, SectionHeading } from "../components/ui";
import VideoDialog from "../components/video-dialog";
import { home, offerLine, priceLine, problemRows, productRows, steps, trustPoints } from "../content/copy";
import { providersBadge, railsLine } from "../content/providers";
import { v2Path } from "../lib/paths";

const Hero = () => (
  <section className="border-b border-border bg-background pb-14 pt-10 md:pb-20 md:pt-16 lg:pb-24">
    <Container className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,480px)] lg:gap-16">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--v2-highlight))]" aria-hidden="true" />
          {providersBadge()}
        </p>
        <h1 className="v2-display mt-6 max-w-[14ch] text-foreground">{home.heroTitle}</h1>
        <p className="v2-lede mt-5 max-w-[52ch] text-muted-foreground">{home.heroSupport}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={APP_SIGNUP_URL}>
            Get started <ArrowRight aria-hidden="true" />
          </ButtonLink>
          <VideoDialog />
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          {priceLine()}
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          <span className="font-medium text-foreground">{offerLine()}</span>
        </p>
      </div>
      <Ledger />
    </Container>
  </section>
);

const Problem = () => (
  <Section surface labelledBy="problem-title">
    <Container>
      <SectionHeading id="problem-title" title={home.problemTitle} support={home.problemSupport} />
      <div className="mt-10 overflow-hidden rounded-lg border border-border bg-background">
        <div className="hidden grid-cols-2 border-b border-border text-sm font-medium text-muted-foreground md:grid">
          <p className="px-6 py-3">Paying a team by hand</p>
          <p className="border-l border-border px-6 py-3">With RevSplitPay</p>
        </div>
        <ul className="divide-y divide-border">
          {problemRows.map(([before, after]) => (
            <li key={before} className="grid md:grid-cols-2">
              <p className="flex gap-3 px-6 pt-4 text-[0.9375rem] text-muted-foreground md:py-4">
                <X className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  <span className="sr-only">Before: </span>
                  {before}
                </span>
              </p>
              <p className="flex gap-3 px-6 pb-4 pt-2 text-[0.9375rem] text-foreground md:border-l md:border-border md:py-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="sr-only">With RevSplitPay: </span>
                  {after}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  </Section>
);

const HowItWorks = () => (
  <Section labelledBy="how-title">
    <Container>
      <SectionHeading id="how-title" title={home.howTitle} support={home.howSupport} />
      <MoneyFlow />
      <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title}>
            <Reveal delay={(index % 3) * 60}>
              <p className="v2-num text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="v2-h3 mt-2 text-foreground">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted-foreground">{step.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
      <p className="mt-12 text-sm text-muted-foreground">
        {railsLine()}{" "}
        <Link to={v2Path("/integration")} className="font-medium text-[rgb(var(--v2-link))] underline-offset-4 hover:underline">
          See integrations
        </Link>
      </p>
    </Container>
  </Section>
);

const exampleFor = (kind?: "payouts" | "leaderboard") =>
  kind === "payouts" ? <PayoutExample /> : kind === "leaderboard" ? <LeaderboardExample /> : null;

const Product = () => (
  <Section surface labelledBy="product-title">
    <Container>
      <SectionHeading id="product-title" title={home.productTitle} support={home.productSupport} />
      <div className="mt-12 divide-y divide-border border-y border-border">
        {productRows.map((row) => {
          const example = exampleFor("example" in row ? row.example : undefined);
          return (
            <Reveal key={row.id}>
              <article className="grid gap-6 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12 lg:py-10">
                <div className={example ? "" : "md:col-span-2 md:grid md:grid-cols-2 md:gap-12"}>
                  <h3 className="v2-h3 text-foreground">{row.title}</h3>
                  <p className={`mt-2 max-w-[60ch] text-[0.9375rem] text-muted-foreground lg:text-base ${example ? "md:mt-3" : "md:mt-0"}`}>
                    {row.text}
                  </p>
                </div>
                {example}
              </article>
            </Reveal>
          );
        })}
      </div>
      <ButtonLink href={v2Path("/feature")} variant="secondary" className="mt-10">
        See every feature <ArrowRight aria-hidden="true" />
      </ButtonLink>
    </Container>
  </Section>
);

const PricingTeaser = () => (
  <Section labelledBy="pricing-title">
    <Container>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading id="pricing-title" title={home.pricingTitle} support={home.pricingSupport} />
        <ButtonLink href={v2Path("/pricing")} variant="ghost" className="self-start md:self-auto">
          Compare plans <ArrowRight aria-hidden="true" />
        </ButtonLink>
      </div>
      <div className="mt-10">
        <PlanCards compact />
      </div>
    </Container>
  </Section>
);

const Trust = () => (
  <Section surface labelledBy="trust-title">
    <Container>
      <SectionHeading id="trust-title" title={home.trustTitle} support={home.trustSupport} />
      <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {trustPoints.map((point) => (
          <li key={point.title} className="border-t border-border pt-5">
            <h3 className="text-base font-medium text-foreground">{point.title}</h3>
            <p className="mt-2 text-[0.9375rem] text-muted-foreground">{point.text}</p>
          </li>
        ))}
      </ul>
    </Container>
  </Section>
);

const Home = () => (
  <>
    <PageMeta title={home.title} description={home.description} path="/" />
    <Hero />
    <Problem />
    <HowItWorks />
    <Product />
    <PricingTeaser />
    <Trust />
    <Faq groups={["payouts", "providers"]} title={home.faqTitle} />
    <CtaBand />
  </>
);

export default Home;
