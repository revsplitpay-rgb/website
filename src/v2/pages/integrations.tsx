import { INTEGRATIONS, findIntegration, type Integration } from "@/lib/integrations";
import { APP_SIGNUP_URL } from "@/lib/links";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Webhook } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import logo from "../../../LOGO BLUE.png";
import CtaBand from "../components/cta-band";
import { Reveal } from "../components/motion";
import PageHero from "../components/page-hero";
import PageMeta from "../components/page-meta";
import { ButtonLink, Container, Grad, Panel, Section } from "../components/ui";
import { INTEGRATION_LOGOS, WEBHOOK_TOOL_LOGOS, type Logo } from "../content/logos";
import { providerPhrase } from "../content/providers";
import { v2Path } from "../lib/paths";

const groups = [
  { title: "Payment providers", items: INTEGRATIONS.filter((i) => i.kind === "Payment provider") },
  { title: "Notifications and developer tools", items: INTEGRATIONS.filter((i) => i.kind !== "Payment provider") },
];

const LogoImg = ({ logo: mark, scale = 1, className }: { logo: Logo; scale?: number; className?: string }) => (
  <img src={mark.src} alt={mark.name} style={{ height: mark.height * scale }} className={cn("w-auto", className)} />
);

/** The partner's wordmark, or a webhook glyph for Webhooks. */
const IntegrationMark = ({ item, scale = 1 }: { item: Integration; scale?: number }) => {
  const mark = INTEGRATION_LOGOS[item.slug];
  if (mark) return <LogoImg logo={mark} scale={scale} />;
  return (
    <span className="inline-flex items-center gap-2 font-semibold text-foreground" style={{ fontSize: 18 * scale }}>
      <span className="v2-icon-tile h-9 w-9" style={{ height: 36 * scale, width: 36 * scale }}>
        <Webhook className="h-4 w-4" aria-hidden="true" />
      </span>
      Webhooks
    </span>
  );
};

const IntegrationCard = ({ item, index }: { item: Integration; index: number }) => (
  <Reveal delay={index * 90} className="h-full">
    <Link to={v2Path(`/integration/${item.slug}`)} className="v2-card v2-card-hover group flex h-full flex-col p-7">
      <div className="flex h-12 items-center justify-between gap-4">
        <IntegrationMark item={item} />
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{item.kind}</span>
      </div>
      <h3 className="sr-only">{item.name}</h3>
      <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted-foreground">{item.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-[rgb(var(--v2-link))]">
        How it works with {item.name}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  </Reveal>
);

/** Tools connected through custom webhooks (not native integrations). */
const WebhookTools = () => (
  <Reveal>
    <div className="v2-card v2-gradient-border mt-6 grid items-center gap-8 overflow-hidden p-7 lg:grid-cols-[1fr_auto] lg:p-9">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-[rgb(var(--v2-deep))]">Through custom webhooks</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">Connect the rest of your stack.</h3>
        <p className="mt-2 max-w-[56ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
          Send RevSplitPay events, like a deal closing or an invoice being paid, to automation and messaging tools such as
          these with a custom webhook.
        </p>
      </div>
      <ul className="flex flex-wrap items-center gap-3">
        {WEBHOOK_TOOL_LOGOS.map((mark) => (
          <li key={mark.name} className="flex h-16 items-center rounded-2xl bg-white px-5 ring-1 ring-border">
            <LogoImg logo={mark} />
          </li>
        ))}
      </ul>
    </div>
  </Reveal>
);

const HeroLogos = () => (
  <ul className="mx-auto flex max-w-[640px] flex-wrap items-center justify-center gap-3" aria-label="Integrations">
    {INTEGRATIONS.map((item) => (
      <li key={item.slug} className="v2-glass flex h-16 items-center rounded-2xl px-5">
        <IntegrationMark item={item} />
      </li>
    ))}
  </ul>
);

export const IntegrationsIndex = () => (
  <>
    <PageMeta
      title="Integrations | RevSplitPay"
      description={`RevSplitPay runs on ${providerPhrase()} and connects to Slack and your own tools with webhooks.`}
      path="/integration"
    />
    <PageHero
      eyebrow="Integrations"
      title={
        <>
          Works with the tools <Grad>you already use</Grad>.
        </>
      }
      support={`Take payments and pay your team on ${providerPhrase()}. Send sales events to Slack, or anywhere with webhooks.`}
    >
      <HeroLogos />
    </PageHero>
    <Section>
      <Container className="space-y-14">
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">{group.title}</h2>
            <ul className="mt-5 grid gap-5 md:grid-cols-2">
              {group.items.map((item, index) => (
                <li key={item.slug}>
                  <IntegrationCard item={item} index={index} />
                </li>
              ))}
            </ul>
            {group.items.some((item) => item.slug === "webhooks") && <WebhookTools />}
          </div>
        ))}
      </Container>
    </Section>
    <CtaBand />
  </>
);

/** RevSplitPay and the partner, with events travelling between them. */
const ConnectionVisual = ({ item }: { item: Integration }) => {
  const reduced = useReducedMotion();
  return (
    <div className="v2-card relative overflow-hidden p-8" aria-hidden="true">
      <div className="v2-grid-bg absolute inset-0 opacity-70" />
      <div className="relative flex items-center justify-between gap-4">
        <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[24px] bg-white shadow-[0_16px_36px_-18px_rgb(0_72_160/0.55)] ring-1 ring-[rgb(0_114_228/0.18)]">
          <img src={logo} alt="" className="h-12 w-12 rounded-xl" />
        </span>
        <div className="relative h-px flex-1 bg-[rgb(0_114_228/0.2)]">
          {!reduced &&
            [0, 1, 2].map((n) => (
              <motion.span
                key={n}
                className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-primary"
                animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: n * 0.8, ease: "easeInOut" }}
              />
            ))}
        </div>
        <span className="flex h-24 min-w-24 shrink-0 items-center justify-center rounded-[24px] bg-white px-5 shadow-[0_16px_36px_-18px_rgb(0_72_160/0.55)] ring-1 ring-border">
          <IntegrationMark item={item} />
        </span>
      </div>
      <ul className="relative mt-8 grid gap-2.5">
        {item.points.slice(0, 3).map((point) => (
          <li key={point} className="flex items-center gap-3 rounded-xl bg-white px-4 py-2.5 text-sm text-foreground ring-1 ring-border">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgb(16_160_110/0.12)] text-[rgb(4_120_87)]">
              <Check className="h-3 w-3" />
            </span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const IntegrationDetail = () => {
  const { slug = "" } = useParams();
  const item = findIntegration(slug);
  if (!item) return <Navigate to={v2Path("/integration")} replace />;

  return (
    <>
      <PageMeta title={`${item.name} integration | RevSplitPay`} description={item.summary} path={`/integration/${item.slug}`} />
      <PageHero eyebrow={item.kind} title={item.name} support={item.overview} center={false} aside={<ConnectionVisual item={item} />}>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href={APP_SIGNUP_URL}>
            Get started <ArrowRight aria-hidden="true" />
          </ButtonLink>
          <Link
            to={v2Path("/integration")}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All integrations
          </Link>
        </div>
      </PageHero>
      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal className="h-full">
              <Panel className="h-full">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">What you get</h2>
                <ul className="mt-6 space-y-3.5 text-[0.9375rem] text-foreground">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgb(0_114_228/0.1)] text-primary">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <Panel className="h-full">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">How to set it up</h2>
                <ol className="mt-6 space-y-4 text-[0.9375rem] text-foreground">
                  {item.setup.map((step, index) => (
                    <li key={step} className="flex gap-4">
                      <span className="v2-num v2-gradient-text text-lg font-semibold leading-6">{String(index + 1).padStart(2, "0")}</span>
                      {step}
                    </li>
                  ))}
                </ol>
                {item.needs && (
                  <p className="mt-7 rounded-2xl bg-[rgb(0_114_228/0.05)] p-4 text-sm text-muted-foreground ring-1 ring-[rgb(0_114_228/0.12)]">
                    <span className="font-medium text-foreground">You'll need: </span>
                    {item.needs}
                  </p>
                )}
              </Panel>
            </Reveal>
          </div>
          {item.slug === "webhooks" && <WebhookTools />}
        </Container>
      </Section>
      <CtaBand />
    </>
  );
};
