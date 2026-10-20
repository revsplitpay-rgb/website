import { APP_SIGNUP_URL } from "@/lib/links";
import { COMMISSION_FEE_LABEL, HOLD_DAYS } from "@/lib/pricing";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import CtaBand from "../components/cta-band";
import Faq from "../components/faq";
import { ActivityMarquee, HeroStrokes, HeroVisual } from "../components/hero-visual";
import Ledger from "../components/ledger";
import MoneyFlow from "../components/money-flow";
import { Reveal } from "../components/motion";
import PageMeta from "../components/page-meta";
import PlanCards from "../components/plan-cards";
import { BeforeAfter } from "../components/problem-visual";
import { MoneyPath, TrustList } from "../components/trust-visual";
import ProductBento from "../components/product-bento";
import { ButtonLink, Container, Grad, Section, SectionHeading } from "../components/ui";
import VideoShowcase from "../components/video-showcase";
import { home, offerLine, priceLine, problemRows, steps } from "../content/copy";
import { paymentProviderLogos } from "../content/logos";
import { providersBadge, railsLine } from "../content/providers";
import { v2Path } from "../lib/paths";

const [heroLead, heroRest] = home.heroTitle.split(", ");

const Hero = () => (
  <section className="v2-sky relative isolate -mt-16 overflow-hidden pb-10 pt-28 md:pb-16 md:pt-36 lg:pt-40">
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
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Payments run on</span>
          {paymentProviderLogos().map((mark) => (
            <img key={mark.name} src={mark.src} alt={mark.name} style={{ height: mark.height * 0.85 }} className="w-auto" />
          ))}
        </div>
      </Reveal>
      <HeroVisual />
    </Container>
    <ActivityMarquee />
  </section>
);

const VideoSection = () => (
  <Section id="overview" labelledBy="overview-title" className="pt-16 md:pt-20 lg:pt-24">
    <Container>
      <SectionHeading
        id="overview-title"
        center
        eyebrow="Watch the overview"
        title="See it work in under a minute."
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
      <Reveal>
        <ul className="mt-16 grid gap-x-10 gap-y-6 border-t border-border pt-10 md:grid-cols-2 lg:grid-cols-3">
          {problemRows.slice(0, 6).map(([before, after]) => (
            <li key={before} className="flex gap-3 text-[0.9375rem]">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgb(0_114_228/0.1)] text-primary">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
              <span>
                <span className="font-medium text-foreground">{after}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  Instead of: {before.charAt(0).toLowerCase() + before.slice(1)}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  </Section>
);

const HowItWorks = () => (
  <Section tone="blue" labelledBy="how-title" className="mx-4 rounded-[32px] sm:mx-6 xl:mx-auto xl:max-w-[1152px]">
    <div className="v2-grid-light absolute inset-0" aria-hidden="true" />
    <div className="v2-blob -left-24 -top-24 h-96 w-96 bg-[rgb(140_220_255/0.55)]" aria-hidden="true" />
    <Container className="relative">
      <SectionHeading id="how-title" center light eyebrow="How it works" title={home.howTitle} support={home.howSupport} />
      <MoneyFlow onBlue />
      <Reveal>
        <ol className="mx-auto mt-14 grid max-w-[1000px] gap-px overflow-hidden rounded-[24px] bg-white/15 ring-1 ring-white/20 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="bg-[rgb(5_35_120/0.35)] p-6">
              <p className="v2-num text-sm font-semibold text-[rgb(170_228_255)]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-base font-semibold text-white">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/90">{step.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
      <p className="mt-10 text-center text-sm text-white/90">
        {railsLine()}{" "}
        <Link to={v2Path("/integration")} className="font-semibold text-white underline underline-offset-4">
          See integrations
        </Link>
      </p>
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
          <ButtonLink href={v2Path("/feature")} variant="secondary" className="shrink-0">
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
    <PageMeta title={home.title} description={home.description} path="/" />
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
