import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/links";
import { ENTERPRISE_THRESHOLD_LABEL, PLANS } from "@/lib/pricing";
import { Mail } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import CopyButton from "../components/copy-button";
import PageMeta from "../components/page-meta";
import { ButtonLink, Container, Panel, Section, SectionHeading, buttonClass } from "../components/ui";

// Bands follow the plan limits, so they move with pricing.ts.
const members = PLANS.map((plan) => plan.includedMembers);
const TEAM_SIZES = ["Just me", ...members.map((n, i) => `${i === 0 ? 2 : members[i - 1] + 1}–${n}`), `${members[members.length - 1] + 1}+`];
const limits = PLANS.map((plan) => plan.salesLimitLabel);
const SALES_BANDS = [
  `Under ${limits[0]}`,
  ...limits.slice(1).map((label, i) => `${limits[i]}–${label}`),
  `Over ${ENTERPRISE_THRESHOLD_LABEL}`,
];

const fieldClass = "mt-2 h-11 w-full rounded-sm border border-input bg-background px-3 text-foreground";

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
      />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-16">
          <div>
            <SectionHeading
              as="h1"
              title="Talk to us."
              support="Questions about plans, Enterprise or getting your team set up? We reply by email."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={`mailto:${CONTACT_EMAIL}`} variant="secondary">
                <Mail aria-hidden="true" /> {CONTACT_EMAIL}
              </ButtonLink>
              <CopyButton value={CONTACT_EMAIL} label="Copy email" showValue={false} />
            </div>
            {BOOKING_URL && (
              <ButtonLink href={BOOKING_URL} className="mt-4">
                Book a call
              </ButtonLink>
            )}
          </div>
          <Panel raised>
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
                  <select id={`${uid}-team`} name="team" className={fieldClass} defaultValue="">
                    <option value="">Choose one</option>
                    {TEAM_SIZES.map((size) => (
                      <option key={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor={`${uid}-sales`} className="text-sm font-medium text-foreground">
                    Monthly sales <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <select id={`${uid}-sales`} name="sales" className={fieldClass} defaultValue="">
                    <option value="">Choose one</option>
                    {SALES_BANDS.map((band) => (
                      <option key={band}>{band}</option>
                    ))}
                  </select>
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
                    className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-foreground"
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
