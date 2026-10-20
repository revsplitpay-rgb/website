import { Check } from "lucide-react";
import CtaBand from "../components/cta-band";
import { LeaderboardExample, PayoutExample } from "../components/examples";
import { Reveal } from "../components/motion";
import PageMeta from "../components/page-meta";
import { Container, Section, SectionHeading } from "../components/ui";
import { featureGroups, roles } from "../content/copy";
import { providerPhrase } from "../content/providers";

const Feature = () => (
  <>
    <PageMeta
      title="Product | RevSplitPay"
      description="Checkout links, automatic commission splits, payouts, invoices, rewards and reporting for sales teams."
      path="/feature"
    />
    <Section className="pb-10 md:pb-14 lg:pb-16">
      <Container>
        <SectionHeading
          as="h1"
          title="Everything between a sale and a paid team."
          support={`Sell, split every commission, pay the team and keep them motivated, all on ${providerPhrase()}.`}
        />
      </Container>
    </Section>

    <section aria-label="Features" className="border-t border-border bg-background">
      <Container className="grid gap-10 py-14 md:py-20 lg:grid-cols-[220px_1fr] lg:gap-16 lg:py-24">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-24 space-y-1 text-[0.9375rem]">
            {featureGroups.map((group) => (
              <li key={group.id}>
                <a
                  href={`#${group.id}`}
                  className="block rounded-sm px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {group.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="divide-y divide-border">
          {featureGroups.map((group) => (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-title`}
              className="scroll-mt-24 py-10 first:pt-0 last:pb-0"
            >
              <Reveal>
                <h2 id={`${group.id}-title`} className="v2-h2 text-foreground">
                  {group.title}
                </h2>
                <p className="v2-lede mt-3 max-w-[60ch] text-muted-foreground">{group.summary}</p>
                <div className={group.example ? "mt-8 grid gap-8 xl:grid-cols-[1fr_minmax(0,380px)]" : "mt-8"}>
                  <ul className="grid gap-x-8 gap-y-3 text-[0.9375rem] text-foreground sm:grid-cols-2 xl:grid-cols-1">
                    {group.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  {group.example === "payouts" && <PayoutExample />}
                  {group.example === "leaderboard" && <LeaderboardExample />}
                </div>
              </Reveal>
            </section>
          ))}
        </div>
      </Container>
    </section>

    <Section surface labelledBy="roles-title">
      <Container>
        <SectionHeading
          id="roles-title"
          title="The right view for every role."
          support="Eight roles, each seeing exactly what it needs."
        />
        <dl className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((item) => (
            <div key={item.role} className="border-t border-border pt-5">
              <dt className="text-base font-medium text-foreground">{item.role}</dt>
              <dd className="mt-2 text-[0.9375rem] text-muted-foreground">{item.text}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
    <CtaBand />
  </>
);

export default Feature;
