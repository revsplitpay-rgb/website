import Container from "@/components/container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import revSplitPayLogo from "../../../../LOGO BLUE.png";
import {
  COMMISSION_FEE_LABEL,
  EXTRA_MEMBER_USD,
  HOLD_DAYS,
  INVOICE_FEE_LABEL,
  PLANS,
  formatUsd,
} from "@/lib/pricing";

const lastPlan = PLANS[PLANS.length - 1];

// Answers follow product.md sections 8 and 12; numbers come from src/lib/pricing.ts.
const faqs = [
  {
    question: "What is RevSplitPay?",
    answer: "The payment and commission platform for sales teams: your customer pays once, and every closer, setter, partner and manager is paid their exact share automatically.",
  },
  {
    question: "When do reps get paid?",
    answer: `${HOLD_DAYS} days after the customer's payment clears, to protect against refunds. Early pay can be arranged on request.`,
  },
  {
    question: "What does it cost?",
    answer: `Plans run from ${formatUsd(PLANS[0].priceUsd)} to ${formatUsd(lastPlan.priceUsd)} a month by monthly sales, with extra team members at ${formatUsd(EXTRA_MEMBER_USD)} a month each. The platform fee is ${COMMISSION_FEE_LABEL} of each commission paid to a team member, taken from their payout; your own share has no fee. Invoices and paid awards are ${INVOICE_FEE_LABEL}. Stripe or Whop processing fees apply as usual.`,
  },
  {
    question: "Does RevSplitPay hold our money?",
    answer: "No. Payments go through Stripe or Whop to the business, and each person's share is paid out to their own account. RevSplitPay is not a bank.",
  }
];

const FAQ = () => {

  return (
    <section id="faq" className="scroll-mt-24 md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12">
      <Container>
        <AnimateOnView once blur>
          <div className="text-center mb-8 md:mb-24">
            <h2 className="h2">Frequently Asked Questions</h2>
          </div>
        </AnimateOnView>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-center justify-center">
          <AnimateOnView once className="max-w-[440px] w-full">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden brand-panel-bg border border-primary/20 shadow-2xl shadow-primary/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(63,193,255,0.28),transparent_42%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,61,130,0.5),transparent_45%,rgba(0,114,228,0.16))]" />
              <div className="relative flex h-full items-center justify-center p-12">
                <img
                  src={revSplitPayLogo}
                  alt="RevSplitPay logo"
                  className="w-full max-w-[220px] rounded-[28px] shadow-2xl shadow-primary/30"
                />
              </div>
            </div>
          </AnimateOnView>

          <div className="max-w-[500px] w-full">
            <AnimateOnView once y={40}>
              <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                {faqs.slice(0, 4).map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/40 px-0">
                    <AccordionTrigger className="text-left py-6 hover:no-underline [&>svg]:hidden">
                      <span className="h4 pr-8">{faq.question}</span>
                      <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                        <Minus className="absolute w-5 h-5 transition-transform duration-300 scale-0 rotate-90 group-data-[state=open]:scale-100 group-data-[state=open]:rotate-0" />
                        <Plus className="absolute w-5 h-5 transition-transform duration-300 scale-100 rotate-0 group-data-[state=open]:scale-0 group-data-[state=open]:rotate-90" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimateOnView>
          </div>
        </div>

        <AnimateOnView once y={20} delay={0.2} className="">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto md:mt-20 mt-8 md:py-2 md:pr-2 py-4 pr-4 pl-8 md:rounded-full rounded-md bg-card/50 border border-border/50 backdrop-blur-sm">
            <p className="text-lg font-medium text-center sm:text-left">
              Can't find the answer you're looking for?
            </p>
            <Button asChild className="rounded-full px-6 bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto">
              <Link to="/contact">
                Ask Something
              </Link>
            </Button>
          </div>
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default FAQ;
