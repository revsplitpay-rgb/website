import { APP_SIGNUP_URL } from "@/lib/links";
import { COMMISSION_FEE_LABEL, HOLD_DAYS } from "@/lib/pricing";
import { ArrowRight, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import CtaBand from "../components/cta-band";
import Faq from "../components/faq";
import { HeroStrokes, HeroVisual, LogoStrip } from "../components/hero-visual";
import Ledger from "../components/ledger";
import MoneyFlow from "../components/money-flow";
import { Reveal } from "../components/motion";
import PageMeta from "../components/page-meta";
import { faqLd, softwareLd } from "../seo/jsonld";
import PlanCards from "../components/plan-cards";
import { BeforeAfter } from "../components/problem-visual";
import { MoneyPath, TrustList } from "../components/trust-visual";
import ProductBento from "../components/product-bento";
import { ButtonLink, Container, Grad, Section, SectionHeading } from "../components/ui";
import VideoShowcase from "../components/video-showcase";
import { faqs, home, offerLine, priceLine, problemRows, steps } from "../content/copy";
import { providersBadge, railsLine } from "../content/providers";
import { v2Path } from "../lib/paths";

const [heroLead, heroRest] = home.heroTitle.split(", ");

const Hero = () => (
  <section className="v2-sky relative isolate -mt-16 overflow-hidden pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40">
    <div className="v2-grid-bg absolute inset-0 -z-10" aria-hidden="true" />
    <div className="v2-blob -left-24 top-10 -z-10 h-80 w-80 bg-[rgb(63_193_255/0.45)]" aria-hidden="true" />
    <div className="v2-blob -right-24 top-40 -z-10 h-96 w-96 bg-[rgb(0_114_228/0.25)] [animation-delay:-8s]" aria-hidden="true" />
    <HeroStrokes />

    <Container className="relative text-center">
      <Reveal onLoad>
        <p className="v2-glass mx-auto inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm text-foreground">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="v2-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--v2-highlight))]" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[rgb(var(--v2-highlight))]" />
          </span>
          {providersBadge()}
          <span className="hidden h-1 w-1 rounded-full bg-[rgb(var(--input))] sm:block" aria-hidden="true" />
          <span className="hidden text-muted-foreground sm:inline">Money moves between your own accounts</span>
        </p>
      </Reveal>
      <Reveal onLoad delay={100}>
        <h1 className="v2-display mx-auto mt-7 max-w-[13ch] text-foreground">
          {heroLead},{" "}
          <Grad>{heroRest}</Grad>
        </h1>
      </Reveal>
      <Reveal onLoad delay={200}>
        <p className="v2-lede mx-auto mt-6 max-w-[56ch] text-muted-foreground">{home.heroSupport}</p>
      </Reveal>
      <Reveal onLoad delay={300}>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={APP_SIGNUP_URL} className="w-full sm:w-auto">
            Get started <ArrowRight aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="#overview" variant="secondary" className="w-full sm:w-auto">
            Watch the overview
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          {priceLine()}
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          <span className="font-medium text-[rgb(var(--v2-deep))]">{offerLine()}</span>
        </p>
      </Reveal>
      <HeroVisual />
    </Container>
    <LogoStrip />
  </section>
);

const VideoSection = () => (
  <Section id="overview" labelledBy="overview-title">
    <Container>
      <SectionHeading
        id="overview-title"
        center
        eyebrow="Watch the overview"
        title="See it work in one minute."
        support="From checkout link to every person paid, in one short walkthrough."
      />
      <div className="mx-auto mt-12 max-w-[1080px] md:mt-16">
        <VideoShowcase />
      </div>
    </Container>
  </Section>
);

const Problem = () => (
  <Section tone="tint" labelledBy="problem-title">
    <Container>
      <SectionHeading
        id="problem-title"
        eyebrow="Why teams switch"
        title={home.problemTitle}
        support={home.problemSupport}
      />
      <BeforeAfter />
      <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {problemRows.slice(0, 6).map(([before, after], index) => (
          <li key={before}>
            <Reveal delay={(index % 3) * 90} className="h-full">
              <div className="v2-card v2-card-hover flex h-full flex-col p-6">
                <p className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--destructive)/0.08)] text-destructive">
                    <X className="h-2.5 w-2.5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="sr-only">Before: </span>
                    <span className="line-through decoration-[rgb(var(--destructive)/0.45)] decoration-1">{before}</span>
                  </span>
                </p>
                <div className="my-4 h-px bg-[linear-gradient(90deg,rgb(0_114_228/0.25),transparent)]" aria-hidden="true" />
                <p className="flex items-start gap-3 text-[1.0625rem] font-semibold leading-snug text-foreground">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(140deg,#3fc1ff,#0072e4)] text-white shadow-[0_6px_14px_-6px_rgb(0_114_228/0.7)]">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="sr-only">With RevSplitPay: </span>
                    {after}
                  </span>
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Container>
  </Section>
);

const HowItWorks = () => (
  <Section labelledBy="how-title">
    <Container>
      <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,#f5f9ff_0%,#ffffff_70%)] px-5 py-16 ring-1 ring-[rgb(0_114_228/0.1)] sm:px-10 md:py-20">
        <div className="v2-grid-bg absolute inset-0" aria-hidden="true" />
        <div className="v2-blob -left-24 -top-24 h-80 w-80 bg-[rgb(63_193_255/0.3)]" aria-hidden="true" />
        <div className="v2-blob -bottom-32 -right-20 h-80 w-80 bg-[rgb(0_114_228/0.14)]" aria-hidden="true" />
        <div className="relative">
          <SectionHeading id="how-title" center eyebrow="How it works" title={home.howTitle} support={home.howSupport} />
          <MoneyFlow />
          <ol className="mx-auto mt-14 grid max-w-[1000px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={(index % 3) * 90} className="h-full">
                  <div className="v2-card v2-card-hover h-full p-6">
                    <p className="v2-num v2-gradient-text text-2xl font-semibold leading-none">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 text-base font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            {railsLine()}{" "}
            <Link to={v2Path("/integrations")} className="font-semibold text-[rgb(var(--v2-link))] underline-offset-4 hover:underline">
              See integrations
            </Link>
          </p>
        </div>
      </div>
    </Container>
  </Section>
);

const SplitSection = () => (
  <Section labelledBy="split-title">
    <Container className="relative grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,540px)] lg:gap-20">
      <div>
        <SectionHeading
          id="split-title"
          eyebrow="Try it"
          title={
            <>
              See your split <Grad>before you sign up</Grad>.
            </>
          }
          support="Enter a sale and each person's share. You see exactly what everyone is paid, and what you keep."
        />
        <Reveal delay={200}>
          <ul className="mt-8 space-y-3 text-[0.9375rem] text-foreground">
            {[
              `The ${COMMISSION_FEE_LABEL} fee comes out of each team member's payout`,
              "Your own share is never charged a fee",
              `Everyone is paid after the ${HOLD_DAYS}-day safety hold`,
            ].map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgb(0_114_228/0.12)] text-primary">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <Reveal delay={150} className="relative">
        <div
          className="absolute -inset-10 -z-10 rounded-[48px] bg-[radial-gradient(closest-side,rgb(0_114_228/0.28),rgb(63_193_255/0.12)_60%,transparent)] blur-2xl"
          aria-hidden="true"
        />
        <Ledger />
      </Reveal>
    </Container>
  </Section>
);

const Product = () => (
  <Section tone="tint" labelledBy="product-title">
    <Container>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading id="product-title" eyebrow="The product" title={home.productTitle} support={home.productSupport} />
        <Reveal>
          <ButtonLink href={v2Path("/features")} variant="secondary" className="shrink-0">
            See every feature <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </Reveal>
      </div>
      <ProductBento />
    </Container>
  </Section>
);

const PricingTeaser = () => (
  <Section labelledBy="pricing-title">
    <Container>
      <SectionHeading
        id="pricing-title"
        center
        eyebrow="Pricing"
        title={
          <>
            Plans that <Grad>grow with your team</Grad>.
          </>
        }
        support={home.pricingSupport}
      />
      <div className="mt-16">
        <PlanCards compact />
      </div>
      <Reveal>
        <div className="mt-10 flex justify-center">
          <ButtonLink href={v2Path("/pricing")} variant="ghost">
            Compare every plan <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>
      </Reveal>
    </Container>
  </Section>
);

const Trust = () => (
  <Section tone="tint" labelledBy="trust-title">
    <Container>
      <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading id="trust-title" eyebrow="Trust" title={home.trustTitle} support={home.trustSupport} />
        <Reveal delay={150}>
          <MoneyPath />
        </Reveal>
      </div>
      <div className="mt-16 border-t border-border pt-12">
        <TrustList />
      </div>
    </Container>
  </Section>
);

const Home = () => (
  <>
    <PageMeta
      title={home.title}
      description={home.description}
      path="/"
      jsonLd={[softwareLd(), faqLd(faqs.filter((item) => item.group !== "billing"))]}
    />
    <Hero />
    <VideoSection />
    <Problem />
    <HowItWorks />
    <SplitSection />
    <Product />
    <PricingTeaser />
    <Trust />
    <Faq groups={["payouts", "providers"]} title={home.faqTitle} />
    <CtaBand />
  </>
);

export default Home;
