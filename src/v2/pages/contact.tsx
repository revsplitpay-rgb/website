import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/links";
import { ENTERPRISE_THRESHOLD_LABEL, PLANS } from "@/lib/pricing";
import { ChevronDown, Mail } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import CopyButton from "../components/copy-button";
import PageMeta from "../components/page-meta";
import { breadcrumbLd } from "../seo/jsonld";
import { ButtonLink, Container, Grad, Panel, Section, SectionHeading, buttonClass } from "../components/ui";

// Bands follow the plan limits, so they move with pricing.ts.
const members = PLANS.map((plan) => plan.includedMembers);
const TEAM_SIZES = ["Just me", ...members.map((n, i) => `${i === 0 ? 2 : members[i - 1] + 1}–${n}`), `${members[members.length - 1] + 1}+`];
const limits = PLANS.map((plan) => plan.salesLimitLabel);
const SALES_BANDS = [
  `Under ${limits[0]}`,
  ...limits.slice(1).map((label, i) => `${limits[i]}–${label}`),
  `Over ${ENTERPRISE_THRESHOLD_LABEL}`,
];

const fieldClass =
  "mt-2 h-12 w-full rounded-[12px] border border-border bg-white px-4 text-foreground shadow-[0_1px_2px_rgb(11_26_51/0.05)] focus:border-primary";

/**
 * No form backend yet: submitting opens the visitor's email app with the
 * details filled in, so nothing is sent or stored by the site.
 */
const Contact = () => {
  const uid = useId();
  const [error, setError] = useState<string | null>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    if (!get("name") || !get("email") || !get("message")) {
      setError("Fill in your name, email and message.");
      return;
    }
    setError(null);
    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Team size: ${get("team") || "Not given"}`,
      `Monthly sales: ${get("sales") || "Not given"}`,
      "",
      get("message"),
    ].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("RevSplitPay enquiry")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <PageMeta
        title="Contact | RevSplitPay"
        description="Questions about RevSplitPay, pricing or Enterprise? Email the team."
        path="/contact"
        jsonLd={[breadcrumbLd([{ name: "Contact", path: "/contact" }])]}
      />
      <Section tone="sky" className="-mt-16 pt-36 md:pt-44 lg:pt-44">
        <div className="v2-grid-bg absolute inset-0" aria-hidden="true" />
        <div className="v2-blob -left-24 top-10 h-72 w-72 bg-[rgb(63_193_255/0.4)]" aria-hidden="true" />
        <Container className="relative grid items-start gap-12 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-16">
          <div className="lg:pt-6">
            <SectionHeading
              as="h1"
              eyebrow="Contact"
              title={
                <>
                  Talk <Grad>to us</Grad>.
                </>
              }
              support="Questions about plans, Enterprise or getting your team set up? We reply by email."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={`mailto:${CONTACT_EMAIL}`} variant="secondary">
                <Mail aria-hidden="true" /> {CONTACT_EMAIL}
              </ButtonLink>
              <CopyButton value={CONTACT_EMAIL} label="Copy email" showValue={false} />
            </div>
            <ol className="mt-10 space-y-5">
              {[
                { title: "Send us a message", text: "Tell us about your team and how you sell." },
                { title: "We reply by email", text: "A real person answers, as soon as we can." },
                { title: "Get set up", text: "We help you connect your payment account and invite your team." },
              ].map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="v2-num flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-[rgb(var(--v2-deep))] ring-1 ring-[rgb(0_114_228/0.2)]">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{step.title}</p>
                    <p className="mt-0.5 text-[0.9375rem] text-muted-foreground">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            {BOOKING_URL && (
              <ButtonLink href={BOOKING_URL} className="mt-4">
                Book a call
              </ButtonLink>
            )}
          </div>
          <Panel raised className="v2-gradient-border">
            <form onSubmit={submit} noValidate aria-describedby={error ? `${uid}-error` : undefined}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${uid}-name`} className="text-sm font-medium text-foreground">
                    Name
                  </label>
                  <input id={`${uid}-name`} name="name" autoComplete="name" required className={fieldClass} />
                </div>
                <div>
                  <label htmlFor={`${uid}-email`} className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input id={`${uid}-email`} name="email" type="email" autoComplete="email" required className={fieldClass} />
                </div>
                <div>
                  <label htmlFor={`${uid}-team`} className="text-sm font-medium text-foreground">
                    Team size <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <span className="relative block">
                    <select id={`${uid}-team`} name="team" className={`${fieldClass} appearance-none pr-10`} defaultValue="">
                    <option value="">Choose one</option>
                    {TEAM_SIZES.map((size) => (
                      <option key={size}>{size}</option>
                    ))}
                  </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  </span>
                </div>
                <div>
                  <label htmlFor={`${uid}-sales`} className="text-sm font-medium text-foreground">
                    Monthly sales <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <span className="relative block">
                    <select id={`${uid}-sales`} name="sales" className={`${fieldClass} appearance-none pr-10`} defaultValue="">
                    <option value="">Choose one</option>
                    {SALES_BANDS.map((band) => (
                      <option key={band}>{band}</option>
                    ))}
                  </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${uid}-message`} className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id={`${uid}-message`}
                    name="message"
                    required
                    rows={5}
                    className="mt-2 w-full rounded-[12px] border border-border bg-white px-4 py-3 text-foreground shadow-[0_1px_2px_rgb(11_26_51/0.05)] focus:border-primary"
                  />
                </div>
              </div>
              {error && (
                <p id={`${uid}-error`} role="alert" className="mt-4 text-sm text-destructive">
                  {error}
                </p>
              )}
              <button type="submit" className={buttonClass("primary", "mt-6 w-full sm:w-auto")}>
                Open in your email app
              </button>
              <p className="mt-3 text-sm text-muted-foreground">Nothing is sent until you press send in your email app.</p>
            </form>
          </Panel>
        </Container>
      </Section>
    </>
  );
};

export default Contact;
