import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { faqs, type FaqGroup } from "../content/copy";
import { Reveal } from "./motion";
import { Container, Section, SectionHeading } from "./ui";

const groupTitles: Record<FaqGroup, string> = {
  payouts: "Payouts and commissions",
  billing: "Plans and billing",
  providers: "Payment providers",
};

/** Grouped FAQ with headings, no tabs, so every question is scannable. */
const Faq = ({ groups, title = "Questions owners ask first." }: { groups: FaqGroup[]; title?: string }) => (
  <Section id="faq" tone="tint" labelledBy="faq-title">
    <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading id="faq-title" eyebrow="FAQ" title={title} />
      </div>
      <div className="space-y-10">
        {groups.map((group) => (
          <Reveal key={group}>
            <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">{groupTitles[group]}</h3>
            <Accordion.Root type="multiple" className="mt-4 space-y-3">
              {faqs
                .filter((item) => item.group === group)
                .map((item) => (
                  <Accordion.Item
                    key={item.q}
                    value={item.q}
                    className="v2-card overflow-hidden transition-shadow data-[state=open]:shadow-[0_20px_40px_-24px_rgb(0_72_160/0.35)]"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex min-h-16 w-full items-center justify-between gap-6 px-6 py-4 text-left text-[1.0625rem] font-medium text-foreground">
                        {item.q}
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgb(0_114_228/0.08)] text-primary transition-transform duration-300 group-data-[state=open]:rotate-45">
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <p className="max-w-[65ch] px-6 pb-6 text-muted-foreground">{item.a}</p>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
            </Accordion.Root>
          </Reveal>
        ))}
      </div>
    </Container>
  </Section>
);

export default Faq;
