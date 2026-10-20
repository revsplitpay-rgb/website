import { APP_SIGNUP_URL } from "@/lib/links";
import { home, offerLine, priceLine } from "../content/copy";
import { v2Path } from "../lib/paths";
import { ButtonLink, Container, Section } from "./ui";

const CtaBand = () => (
  <Section surface labelledBy="cta-title">
    <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-[640px]">
        <h2 id="cta-title" className="v2-h2 text-foreground">
          {home.ctaTitle}
        </h2>
        <p className="v2-lede mt-4 text-muted-foreground">
          {priceLine()}. {offerLine()}.
        </p>
      </div>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <ButtonLink href={APP_SIGNUP_URL} className="min-h-12">
          Get started
        </ButtonLink>
        <ButtonLink href={v2Path("/contact")} variant="secondary" className="min-h-12">
          Talk to us
        </ButtonLink>
      </div>
    </Container>
  </Section>
);

export default CtaBand;
