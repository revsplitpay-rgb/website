import { INTEGRATIONS, findIntegration, type Integration } from "@/lib/integrations";
import { APP_SIGNUP_URL } from "@/lib/links";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import CtaBand from "../components/cta-band";
import PageMeta from "../components/page-meta";
import { ButtonLink, Container, Panel, Section, SectionHeading } from "../components/ui";
import { providerPhrase } from "../content/providers";
import { v2Path } from "../lib/paths";

const groups = [
  { title: "Payment providers", items: INTEGRATIONS.filter((i) => i.kind === "Payment provider") },
  { title: "Notifications and developer tools", items: INTEGRATIONS.filter((i) => i.kind !== "Payment provider") },
];

const IntegrationRow = ({ item }: { item: Integration }) => (
  <li>
    <Link
      to={v2Path(`/integration/${item.slug}`)}
      className="group flex items-center justify-between gap-6 rounded-lg border border-border bg-background px-6 py-5 transition-colors hover:border-input"
    >
      <div>
        <p className="flex flex-wrap items-baseline gap-x-3">
          <span className="v2-h3 text-foreground">{item.name}</span>
          <span className="text-sm text-muted-foreground">{item.kind}</span>
        </p>
        <p className="mt-1 text-[0.9375rem] text-muted-foreground">{item.summary}</p>
      </div>
      <ArrowRight
        className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  </li>
);

export const IntegrationsIndex = () => (
  <>
    <PageMeta
      title="Integrations | RevSplitPay"
      description={`RevSplitPay runs on ${providerPhrase()} and connects to Slack and your own tools with webhooks.`}
      path="/integration"
    />
    <Section>
      <Container>
        <SectionHeading
          as="h1"
          title="Works with the tools you already use."
          support={`Take payments and pay your team on ${providerPhrase()}. Send sales events to Slack or anywhere with webhooks.`}
        />
        <div className="mt-12 space-y-10">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-medium text-muted-foreground">{group.title}</h2>
              <ul className="mt-3 space-y-3">
                {group.items.map((item) => (
                  <IntegrationRow key={item.slug} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
    <CtaBand />
  </>
);

export const IntegrationDetail = () => {
  const { slug = "" } = useParams();
  const item = findIntegration(slug);
  if (!item) return <Navigate to={v2Path("/integration")} replace />;

  return (
    <>
      <PageMeta title={`${item.name} integration | RevSplitPay`} description={item.summary} path={`/integration/${item.slug}`} />
      <Section>
        <Container>
          <Link
            to={v2Path("/integration")}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All integrations
          </Link>
          <p className="mt-6 text-sm text-muted-foreground">{item.kind}</p>
          <SectionHeading as="h1" title={item.name} support={item.overview} className="mt-2" />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Panel>
              <h2 className="v2-h3 text-foreground">What you get</h2>
              <ul className="mt-4 space-y-3 text-[0.9375rem] text-foreground">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel>
              <h2 className="v2-h3 text-foreground">How to set it up</h2>
              <ol className="mt-4 space-y-3 text-[0.9375rem] text-foreground">
                {item.setup.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="v2-num text-muted-foreground">{index + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
              {item.needs && (
                <p className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">You'll need: </span>
                  {item.needs}
                </p>
              )}
            </Panel>
          </div>
          <ButtonLink href={APP_SIGNUP_URL} className="mt-10">
            Get started <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </Container>
      </Section>
    </>
  );
};
