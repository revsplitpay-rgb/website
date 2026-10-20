import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { faqs, type FaqGroup } from "../content/copy";
import { Container, Section, SectionHeading } from "./ui";

const groupTitles: Record<FaqGroup, string> = {
  payouts: "Payouts and commissions",
  billing: "Plans and billing",
  providers: "Payment providers",
};

/** Grouped FAQ with headings, no tabs, so every question is scannable. */
const Faq = ({ groups, title = "Questions owners ask first." }: { groups: FaqGroup[]; title?: string }) => (
  <Section id="faq" labelledBy="faq-title">
    <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
      <SectionHeading id="faq-title" title={title} />
      <div className="space-y-10">
        {groups.map((group) => (
          <div key={group}>
            <h3 className="v2-h3 text-foreground">{groupTitles[group]}</h3>
            <Accordion.Root type="multiple" className="mt-3 border-t border-border">
              {faqs
                .filter((item) => item.group === group)
                .map((item) => (
                  <Accordion.Item key={item.q} value={item.q} className="border-b border-border">
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between gap-6 py-4 text-left text-[1.0625rem] font-medium text-foreground">
                        {item.q}
                        <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <p className="max-w-[65ch] pb-5 text-muted-foreground">{item.a}</p>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
            </Accordion.Root>
          </div>
        ))}
      </div>
    </Container>
  </Section>
);

export default Faq;
